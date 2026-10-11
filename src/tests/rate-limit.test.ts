import { describe, it, expect } from "vitest";
import { checkRateLimit } from "@/lib/rate-limit";

describe("In-Memory Rate Limiter", () => {
  it("should allow requests under the limit", () => {
    const ip = `test_ip_${Date.now()}_1`;
    const res1 = checkRateLimit(ip, { intervalMs: 10000, maxRequests: 3 });
    expect(res1.success).toBe(true);
    expect(res1.remaining).toBe(2);

    const res2 = checkRateLimit(ip, { intervalMs: 10000, maxRequests: 3 });
    expect(res2.success).toBe(true);
    expect(res2.remaining).toBe(1);

    const res3 = checkRateLimit(ip, { intervalMs: 10000, maxRequests: 3 });
    expect(res3.success).toBe(true);
    expect(res3.remaining).toBe(0);
  });

  it("should block requests exceeding the limit", () => {
    const ip = `test_ip_${Date.now()}_2`;
    // Consume 2 allowed requests
    checkRateLimit(ip, { intervalMs: 10000, maxRequests: 2 });
    checkRateLimit(ip, { intervalMs: 10000, maxRequests: 2 });

    // 3rd request should be blocked
    const blocked = checkRateLimit(ip, { intervalMs: 10000, maxRequests: 2 });
    expect(blocked.success).toBe(false);
    expect(blocked.remaining).toBe(0);
  });
});
