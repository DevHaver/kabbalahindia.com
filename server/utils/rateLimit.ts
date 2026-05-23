type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

const sweepEvery = 60_000;
let lastSweep = Date.now();

const sweep = (now: number) => {
  if (now - lastSweep < sweepEvery) return;
  lastSweep = now;
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }
};

/**
 * Per-key fixed-window limiter. Returns { allowed, retryAfterSec }.
 * In-memory only — fine for a single instance; swap to Redis if you ever
 * run more than one replica.
 */
export const consumeRateLimit = (
  key: string,
  limit: number,
  windowMs: number,
): { allowed: boolean; retryAfterSec: number } => {
  const now = Date.now();
  sweep(now);
  const bucket = buckets.get(key);
  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfterSec: 0 };
  }
  if (bucket.count >= limit) {
    return {
      allowed: false,
      retryAfterSec: Math.max(1, Math.ceil((bucket.resetAt - now) / 1000)),
    };
  }
  bucket.count += 1;
  return { allowed: true, retryAfterSec: 0 };
};
