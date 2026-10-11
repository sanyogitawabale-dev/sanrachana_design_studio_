import { describe, it, expect } from "vitest";
import {
  normalizeWhatsAppNumber,
  isWhatsAppAvailable,
  buildEstimatorWhatsAppMessage,
} from "@/lib/whatsapp";
import { CostEstimatorInput, CostEstimatorResult } from "@/types";

describe("WhatsApp Utilities & Message Builder", () => {
  it("should normalize raw phone numbers correctly", () => {
    expect(normalizeWhatsAppNumber("+91 98765-43210")).toBe("919876543210");
    expect(normalizeWhatsAppNumber("(+91) 987 654 3210")).toBe("919876543210");
    expect(normalizeWhatsAppNumber("")).toBe("");
  });

  it("should accurately determine WhatsApp availability", () => {
    expect(isWhatsAppAvailable("919876543210")).toBe(true);
    expect(isWhatsAppAvailable("1234")).toBe(false);
    expect(isWhatsAppAvailable("")).toBe(false);
  });

  it("should generate a rich formatted estimator message", () => {
    const input: CostEstimatorInput = {
      propertyType: "villa",
      carpetAreaSqFt: 3500,
      serviceCategory: "architectural",
      finishTier: "luxury",
      include3dWalkthrough: true,
      includeVastuPlanning: true,
      includeSiteSupervision: false,
    };

    const mockResult: CostEstimatorResult = {
      estimatedMinTotal: 300000,
      estimatedMaxTotal: 550000,
      currency: "INR",
      perSqFtRateMin: 85,
      perSqFtRateMax: 155,
      breakdown: {
        baseService: "Architectural Planning",
        finishLevel: "Bespoke Luxury Signature",
        area: 3500,
        addons: ["3D VR Walkthrough", "Vastu Alignment"],
      },
      notes: [],
    };

    const message = buildEstimatorWhatsAppMessage(input, mockResult);

    expect(message).toContain("Sanrachana Design Studio");
    expect(message).toContain("Private Bungalow / Villa");
    expect(message).toContain("3,500 sq. ft.");
    expect(message).toContain("Architectural Planning & Facade Design");
    expect(message).toContain("3D VR Walkthrough");
    expect(message).toContain("Vastu Alignment");
    expect(message).toContain("Indicative Ballpark Range");
  });
});
