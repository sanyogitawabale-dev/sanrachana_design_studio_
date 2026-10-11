import { describe, it, expect } from "vitest";
import { calculateProjectEstimate } from "@/lib/estimator";
import { CostEstimatorInput } from "@/types";

describe("Cost Estimator Calculation Engine", () => {
  it("should calculate valid architectural range for standard 2BHK", () => {
    const input: CostEstimatorInput = {
      propertyType: "2bhk",
      carpetAreaSqFt: 1000,
      serviceCategory: "architectural",
      finishTier: "standard",
      include3dWalkthrough: false,
      includeVastuPlanning: false,
      includeSiteSupervision: false,
    };

    const result = calculateProjectEstimate(input);

    expect(result.estimatedMinTotal).toBeGreaterThan(0);
    expect(result.estimatedMaxTotal).toBeGreaterThan(result.estimatedMinTotal);
    expect(result.perSqFtRateMin).toBeGreaterThan(0);
    expect(result.perSqFtRateMax).toBeGreaterThan(result.perSqFtRateMin);
    expect(result.currency).toBe("INR");
    expect(result.breakdown.area).toBe(1000);
  });

  it("should increase estimate when higher finish tier and add-ons are selected", () => {
    const baseInput: CostEstimatorInput = {
      propertyType: "3bhk",
      carpetAreaSqFt: 1800,
      serviceCategory: "interior",
      finishTier: "standard",
      include3dWalkthrough: false,
      includeVastuPlanning: false,
      includeSiteSupervision: false,
    };

    const luxuryInputWithAddons: CostEstimatorInput = {
      ...baseInput,
      finishTier: "luxury",
      include3dWalkthrough: true,
      includeVastuPlanning: true,
      includeSiteSupervision: true,
    };

    const baseResult = calculateProjectEstimate(baseInput);
    const luxuryResult = calculateProjectEstimate(luxuryInputWithAddons);

    expect(luxuryResult.estimatedMinTotal).toBeGreaterThan(baseResult.estimatedMinTotal);
    expect(luxuryResult.estimatedMaxTotal).toBeGreaterThan(baseResult.estimatedMaxTotal);
    expect(luxuryResult.breakdown.addons.length).toBe(3);
  });

  it("should calculate turnkey rates appropriately for entire fitout", () => {
    const turnkeyInput: CostEstimatorInput = {
      propertyType: "villa",
      carpetAreaSqFt: 3000,
      serviceCategory: "turnkey-full",
      finishTier: "premium",
      include3dWalkthrough: true,
      includeVastuPlanning: true,
    };

    const result = calculateProjectEstimate(turnkeyInput);

    // Turnkey rates are in thousands per sq ft
    expect(result.perSqFtRateMin).toBeGreaterThanOrEqual(1500);
    expect(result.estimatedMinTotal).toBeGreaterThan(4500000);
  });
});
