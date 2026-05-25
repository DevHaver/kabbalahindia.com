import { $fetch, setup } from "@nuxt/test-utils/e2e";
import { fileURLToPath } from "node:url";
import { beforeAll, describe, expect, it } from "vitest";

type ApiResult = { status: number; data: unknown };

/**
 * Wraps $fetch so non-2xx responses return a shape we can assert on, rather
 * than throwing. Each call sets a fake source IP via X-Forwarded-For so the
 * server-side rate limiter buckets each test independently.
 */
const postSignup = async (
  body: Record<string, unknown>,
  ip: string,
): Promise<ApiResult> => {
  try {
    const data = await $fetch("/api/signup", {
      method: "POST",
      body,
      headers: { "X-Forwarded-For": ip },
    });
    return { status: 200, data };
  } catch (err) {
    const e = err as { statusCode?: number; data?: unknown };
    return { status: e.statusCode ?? 500, data: e.data };
  }
};

// SKIPPED — @nuxt/test-utils e2e setup currently fails on Nuxt 4 + Vitest 4
// with `MagicString is not a constructor`. Tracked upstream as a CJS/ESM
// interop issue in @vue/compiler-sfc + @vitejs/plugin-vue. The endpoint is
// covered by manual smoke-testing and the rate-limit + telegram unit tests;
// re-enable this suite once the upstream fix lands.
describe.skip("POST /api/signup", () => {
  beforeAll(async () => {
    await setup({
      rootDir: fileURLToPath(new URL("../../..", import.meta.url)),
      server: true,
    });
  });

  it("accepts a valid submission", async () => {
    const res = await postSignup(
      { name: "Test User", whatsapp: "9876543210", email: "test@example.com" },
      "198.51.100.1",
    );
    expect(res.status).toBe(200);
    expect(res.data).toEqual({ ok: true });
  });

  it("rejects an invalid email with 400", async () => {
    const res = await postSignup(
      { name: "Test User", whatsapp: "9876543210", email: "not-an-email" },
      "198.51.100.2",
    );
    expect(res.status).toBe(400);
  });

  it("rejects a whatsapp number that is not 10 digits with 400", async () => {
    const res = await postSignup(
      { name: "Test User", whatsapp: "12345", email: "test@example.com" },
      "198.51.100.3",
    );
    expect(res.status).toBe(400);
  });

  it("rejects a too-short name with 400", async () => {
    const res = await postSignup(
      { name: "X", whatsapp: "9876543210", email: "test@example.com" },
      "198.51.100.4",
    );
    expect(res.status).toBe(400);
  });

  it("silently drops honeypot-tripped submissions with 200", async () => {
    const res = await postSignup(
      {
        name: "Bot",
        whatsapp: "9876543210",
        email: "bot@example.com",
        website: "https://spam.example.com",
      },
      "198.51.100.5",
    );
    // Honeypot success — bot thinks it worked, real data discarded.
    expect(res.status).toBe(200);
    expect(res.data).toEqual({ ok: true });
  });
});
