export type TelegramSubmission = {
  name: string;
  whatsapp: string; // "+919876543210"
  email: string;
  receivedAt: string; // ISO
};

const escapeHtml = (s: string): string =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export const formatIndianPhone = (waWithPlus: string): string => {
  // "+919876543210" → "+91 98765 43210"
  const digits = waWithPlus.replace(/^\+/, "");
  if (digits.length === 12 && digits.startsWith("91")) {
    return `+91 ${digits.slice(2, 7)} ${digits.slice(7)}`;
  }
  return waWithPlus;
};

export const formatIstTime = (iso: string): string => {
  try {
    return new Date(iso).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  } catch {
    return iso;
  }
};

/**
 * Build the Telegram HTML message body for a signup. Pure — easy to unit-test.
 */
export const buildTelegramSignupText = (
  submission: TelegramSubmission,
): string => {
  const digits = submission.whatsapp.replace(/^\+/, "");
  const waLink = `https://wa.me/${digits}`;
  return [
    `🔔 <b>New signup</b>`,
    ``,
    `<b>Name:</b> ${escapeHtml(submission.name)}`,
    `<b>WhatsApp:</b> <a href="${waLink}">${escapeHtml(formatIndianPhone(submission.whatsapp))}</a>`,
    `<b>Email:</b> ${escapeHtml(submission.email)}`,
    ``,
    `<i>${escapeHtml(formatIstTime(submission.receivedAt))} IST</i>`,
  ].join("\n");
};

export const sendTelegramSignup = async (
  token: string,
  chatId: string,
  submission: TelegramSubmission,
): Promise<void> => {
  await $fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    body: {
      chat_id: chatId,
      text: buildTelegramSignupText(submission),
      parse_mode: "HTML",
      disable_web_page_preview: true,
    },
    timeout: 5000,
  });
};
