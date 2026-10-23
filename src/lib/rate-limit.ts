import "server-only";

export type RateLimitResult = { success: boolean; retryAfter: number };

/**
 * Minimal limiter interface, shaped like @upstash/ratelimit's `limit()` so the
 * in-memory version can be swapped for a shared store without touching callers.
 */
export interface RateLimiter {
  limit(key: string): Promise<RateLimitResult>;
}

/**
 * Sliding-window limiter kept in memory. Good enough for a portfolio, but each
 * serverless instance has its own memory: use Upstash/Redis for a hard limit.
 */
export function createMemoryRateLimiter({ max, windowMs }: { max: number; windowMs: number }): RateLimiter {
  const hits = new Map<string, number[]>();

  return {
    async limit(key) {
      const now = Date.now();
      const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);

      if (recent.length >= max) {
        hits.set(key, recent);
        return { success: false, retryAfter: Math.ceil((recent[0] + windowMs - now) / 1000) };
      }

      recent.push(now);
      hits.set(key, recent);
      // Keep the map from growing forever on a long-lived instance.
      if (hits.size > 5_000) {
        for (const [k, times] of hits) if (times.every((t) => now - t >= windowMs)) hits.delete(k);
      }
      return { success: true, retryAfter: 0 };
    },
  };
}
