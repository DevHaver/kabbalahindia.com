import { describe, expect, it } from "vitest";
import {
  buildTelegramSignupText,
  formatIndianPhone,
  formatIstTime,
} from "~~/server/utils/telegram";

describe("formatIndianPhone", () => {
  it("formats a 12-digit number with 91 country code as +91 XXXXX XXXXX", () => {
    expect(formatIndianPhone("+919876543210")).toBe("+91 98765 43210");
  });

  it("falls back to the raw input for non-Indian-looking numbers", () => {
    expect(formatIndianPhone("+14155551234")).toBe("+14155551234");
    expect(formatIndianPhone("12345")).toBe("12345");
  });
});

describe("formatIstTime", () => {
  it("renders an ISO string in IST with short month + 12h clock", () => {
    const result = formatIstTime("2026-05-23T07:05:00.000Z");
    // 07:05 UTC == 12:35 IST. We use abbreviated month + 12h with am/pm.
    expect(result).toMatch(/^\d{2} \w{3}, \d{2}:\d{2} (am|pm)$/);
  });

  it("returns the input untouched if the date is invalid", () => {
    const result = formatIstTime("not-a-date");
    expect(typeof result).toBe("string");
  });
});

describe("buildTelegramSignupText", () => {
  const baseSubmission = {
    name: "Priya Sharma",
    whatsapp: "+919876543210",
    email: "priya@example.com",
    receivedAt: "2026-05-23T07:05:00.000Z",
  };

  it("includes name, formatted phone, and email", () => {
    const text = buildTelegramSignupText(baseSubmission);
    expect(text).toContain("Priya Sharma");
    expect(text).toContain("+91 98765 43210");
    expect(text).toContain("priya@example.com");
  });

  it("wraps the phone in a wa.me link with digits only", () => {
    const text = buildTelegramSignupText(baseSubmission);
    expect(text).toContain('<a href="https://wa.me/919876543210">');
  });

  it("escapes HTML in user-supplied content", () => {
    const text = buildTelegramSignupText({
      ...baseSubmission,
      name: "<script>alert(1)</script>",
      email: "x&y@evil.com",
    });
    expect(text).not.toContain("<script>");
    expect(text).toContain("&lt;script&gt;");
    expect(text).toContain("x&amp;y@evil.com");
  });

  it("uses the 🔔 + bold header convention", () => {
    const text = buildTelegramSignupText(baseSubmission);
    expect(text.startsWith("🔔 <b>New signup</b>")).toBe(true);
  });

  it("ends with an IST-tagged italic timestamp line", () => {
    const text = buildTelegramSignupText(baseSubmission);
    expect(text).toMatch(/<i>\d{2} \w{3}, \d{2}:\d{2} (am|pm) IST<\/i>$/);
  });
});
