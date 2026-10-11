/**
 * Lightweight in-memory rate limiter for serverless API routes
 * Limits requests per IP within a sliding time window.
 */

interface RateLimitRecord {
  count: number;
  resetAt: number;
}

const ipRequestMap = new Map<string, RateLimitRecord>();

export interface RateLimitOptions {
  intervalMs?: number; // Time window in ms (default 60 seconds)
  maxRequests?: number; // Max requests allowed per window (default 5 requests)
}

export function checkRateLimit(
  identifier: string,
  options: RateLimitOptions = {}
): { success: boolean; remaining: number; resetAt: number } {
  const { intervalMs = 60 * 1000, maxRequests = 5 } = options;
  const now = Date.now();

  // Clean stale keys periodically if map grows
  if (ipRequestMap.size > 1000) {
    for (const [key, record] of ipRequestMap.entries()) {
      if (now > record.resetAt) {
        ipRequestMap.delete(key);
      }
    }
  }

  const existing = ipRequestMap.get(identifier);

  if (!existing || now > existing.resetAt) {
    // New window
    const newRecord: RateLimitRecord = {
      count: 1,
      resetAt: now + intervalMs,
    };
    ipRequestMap.set(identifier, newRecord);
    return {
      success: true,
      remaining: maxRequests - 1,
      resetAt: newRecord.resetAt,
    };
  }

  if (existing.count >= maxRequests) {
    // Rate limit exceeded
    return {
      success: false,
      remaining: 0,
      resetAt: existing.resetAt,
    };
  }

  // Increment within window
  existing.count += 1;
  return {
    success: true,
    remaining: maxRequests - existing.count,
    resetAt: existing.resetAt,
  };
}
