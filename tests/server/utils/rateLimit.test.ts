import { describe, expect, it } from "vitest";
import { consumeRateLimit } from "~~/server/utils/rateLimit";

// Each test uses a unique key so module-level bucket state doesn't bleed
// across cases.
const uniqueKey = (label: string) =>
  `ratelimit-test:${label}:${Math.random().toString(36).slice(2, 10)}`;

describe("consumeRateLimit", () => {
  it("allows requests up to the limit", () => {
    const key = uniqueKey("under-limit");
    for (let i = 0; i < 5; i++) {
      const result = consumeRateLimit(key, 5, 60_000);
      expect(result.allowed).toBe(true);
      expect(result.retryAfterSec).toBe(0);
    }
  });

  it("blocks the request immediately after the limit is reached", () => {
    const key = uniqueKey("at-limit");
    for (let i = 0; i < 5; i++) consumeRateLimit(key, 5, 60_000);

    const sixth = consumeRateLimit(key, 5, 60_000);
    expect(sixth.allowed).toBe(false);
    expect(sixth.retryAfterSec).toBeGreaterThan(0);
    expect(sixth.retryAfterSec).toBeLessThanOrEqual(60);
  });

  it("returns retryAfterSec close to the remaining window", () => {
    const key = uniqueKey("retry-after");
    for (let i = 0; i < 3; i++) consumeRateLimit(key, 3, 10_000);

    const blocked = consumeRateLimit(key, 3, 10_000);
    expect(blocked.allowed).toBe(false);
    // Window is 10s, we should get something in [1, 10].
    expect(blocked.retryAfterSec).toBeGreaterThanOrEqual(1);
    expect(blocked.retryAfterSec).toBeLessThanOrEqual(10);
  });

  it("treats different keys as independent buckets", () => {
    const a = uniqueKey("isolation-a");
    const b = uniqueKey("isolation-b");
    for (let i = 0; i < 5; i++) consumeRateLimit(a, 5, 60_000);

    // a is at limit, but b should still be allowed.
    expect(consumeRateLimit(a, 5, 60_000).allowed).toBe(false);
    expect(consumeRateLimit(b, 5, 60_000).allowed).toBe(true);
  });

  it("resets the bucket after the window expires", async () => {
    const key = uniqueKey("window-reset");
    // Tiny window so the test stays fast.
    for (let i = 0; i < 2; i++) consumeRateLimit(key, 2, 50);
    expect(consumeRateLimit(key, 2, 50).allowed).toBe(false);

    await new Promise((r) => setTimeout(r, 80));
    expect(consumeRateLimit(key, 2, 50).allowed).toBe(true);
  });
});
