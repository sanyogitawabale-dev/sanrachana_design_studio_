import { CostEstimatorInput, CostEstimatorResult } from "@/types";

export function calculateProjectEstimate(input: CostEstimatorInput): CostEstimatorResult {
  const area = Math.max(100, Math.min(input.carpetAreaSqFt || 1000, 50000));

  // Base per sq. ft. rates (in INR)
  let baseMinRate = 40;
  let baseMaxRate = 75;
  let serviceName = "Architectural Design";

  switch (input.serviceCategory) {
    case "architectural":
      baseMinRate = 45;
      baseMaxRate = 85;
      serviceName = "Architectural Planning & Facade Design";
      break;
    case "interior":
      baseMinRate = 120;
      baseMaxRate = 260;
      serviceName = "Interior Architecture & Detailed Specifications";
      break;
    case "3d-only":
      baseMinRate = 20;
      baseMaxRate = 45;
      serviceName = "3D Elevation & Photorealistic Visualization";
      break;
    case "turnkey-full":
      baseMinRate = 1600;
      baseMaxRate = 3200;
      serviceName = "Complete Turnkey Design & Fitout Execution";
      break;
  }

  // Tier multiplier
  let tierMultiplier = 1.0;
  let tierLabel = "Standard Contemporary";
  if (input.finishTier === "premium") {
    tierMultiplier = 1.35;
    tierLabel = "Premium Architectural";
  } else if (input.finishTier === "luxury") {
    tierMultiplier = 1.8;
    tierLabel = "Bespoke Luxury Signature";
  }

  // Property Type multiplier
  let propertyMultiplier = 1.0;
  if (input.propertyType === "villa") propertyMultiplier = 1.15;
  if (input.propertyType === "4bhk-plus") propertyMultiplier = 1.1;
  if (input.propertyType === "retail") propertyMultiplier = 1.2;
  if (input.propertyType === "office") propertyMultiplier = 0.95;

  const effectiveMinRate = Math.round(baseMinRate * tierMultiplier * propertyMultiplier);
  const effectiveMaxRate = Math.round(baseMaxRate * tierMultiplier * propertyMultiplier);

  let totalMin = effectiveMinRate * area;
  let totalMax = effectiveMaxRate * area;

  const addons: string[] = [];

  // Add-ons
  if (input.include3dWalkthrough) {
    const addonMin = 15000;
    const addonMax = 35000;
    totalMin += addonMin;
    totalMax += addonMax;
    addons.push("3D Photorealistic Walkthrough");
  }

  if (input.includeVastuPlanning) {
    const addonMin = 12000;
    const addonMax = 25000;
    totalMin += addonMin;
    totalMax += addonMax;
    addons.push("Vastu Grid Analysis & Orientation");
  }

  if (input.includeSiteSupervision && input.serviceCategory !== "turnkey-full") {
    const addonMin = 30000;
    const addonMax = 65000;
    totalMin += addonMin;
    totalMax += addonMax;
    addons.push("Periodic Site Supervision & BOQ Audits");
  }

  // Round totals to nearest thousand
  totalMin = Math.round(totalMin / 1000) * 1000;
  totalMax = Math.round(totalMax / 1000) * 1000;

  return {
    estimatedMinTotal: totalMin,
    estimatedMaxTotal: totalMax,
    currency: "INR",
    perSqFtRateMin: effectiveMinRate,
    perSqFtRateMax: effectiveMaxRate,
    breakdown: {
      baseService: serviceName,
      finishLevel: tierLabel,
      area: area,
      addons: addons,
    },
    notes: [
      "This estimate is indicative and intended for preliminary budgetary planning.",
      "Final commercials are structured following in-person site measurements, structural complexity review, and finalized material schedules.",
      "Turnkey rates include civil, carpentry, electrical, plumbing, and surface finishes.",
    ],
  };
}
