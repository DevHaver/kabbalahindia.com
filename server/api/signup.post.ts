import * as v from "valibot";
import { sendTelegramSignup } from "../utils/telegram";

const signupSchema = v.object({
  name: v.pipe(v.string(), v.trim(), v.minLength(2), v.maxLength(120)),
  whatsapp: v.pipe(v.string(), v.trim(), v.regex(/^\d{10}$/)),
  email: v.pipe(v.string(), v.trim(), v.email(), v.maxLength(254)),
  // Honeypot — accept any string, but reject silently if non-empty.
  // The schema MUST NOT enforce empty here, otherwise we'd return 400 and
  // tip off the bot. We check the value below.
  website: v.optional(v.string(), ""),
});

const clientIp = (event: Parameters<typeof getRequestIP>[0]): string => {
  return getRequestIP(event, { xForwardedFor: true }) || "unknown";
};

export default defineEventHandler(async (event) => {
  const body = await readBody(event).catch(() => null);
  if (!body || typeof body !== "object") {
    throw createError({ statusCode: 400, statusMessage: "Invalid payload" });
  }

  const parsed = v.safeParse(signupSchema, body);
  if (!parsed.success) {
    throw createError({
      statusCode: 400,
      statusMessage: "Validation failed",
      data: {
        issues: parsed.issues.map((i) => ({
          path: i.path?.map((p) => p.key).join("."),
          message: i.message,
        })),
      },
    });
  }

  // Honeypot triggered — pretend success so the bot moves on.
  if (parsed.output.website && parsed.output.website.length > 0) {
    return { ok: true };
  }

  const submission = {
    name: parsed.output.name,
    whatsapp: `+91${parsed.output.whatsapp}`,
    email: parsed.output.email.toLowerCase(),
    receivedAt: new Date().toISOString(),
    ip: clientIp(event),
    userAgent: getRequestHeader(event, "user-agent") ?? null,
  };

  // Always log so the host captures it even if no webhook is configured.
  console.log("[signup]", JSON.stringify(submission));

  const {
    signupWebhookUrl,
    signupWebhookToken,
    telegramBotToken,
    telegramChatId,
  } = useRuntimeConfig(event);

  // Fire generic webhook + Telegram in parallel. Both are independent and
  // failures in either don't fail the user's submission — we already have
  // the lead in stdout.
  const deliveries: Promise<unknown>[] = [];

  if (signupWebhookUrl) {
    deliveries.push(
      $fetch(signupWebhookUrl, {
        method: "POST",
        body: submission,
        headers: signupWebhookToken
          ? { Authorization: `Bearer ${signupWebhookToken}` }
          : undefined,
        timeout: 5000,
      }).catch((err) => {
        console.error(
          "[signup] webhook delivery failed",
          err instanceof Error ? err.message : err,
        );
      }),
    );
  }

  if (telegramBotToken && telegramChatId) {
    deliveries.push(
      sendTelegramSignup(telegramBotToken, telegramChatId, submission).catch(
        (err) => {
          console.error(
            "[signup] telegram delivery failed",
            err instanceof Error ? err.message : err,
          );
        },
      ),
    );
  }

  await Promise.all(deliveries);

  return { ok: true };
});
