import { siteConfig } from "@/config/site";
import { CostEstimatorInput, CostEstimatorResult } from "@/types";
import { formatINR, formatSqFt } from "./utils";

/**
 * Normalizes phone number into digits only for wa.me link
 */
export function normalizeWhatsAppNumber(numberStr?: string): string {
  const num = (numberStr || siteConfig.contact.whatsappNumber || "").replace(/[^0-9]/g, "");
  return num;
}

/**
 * Validates if the given or configured WhatsApp number is ready to use
 */
export function isWhatsAppAvailable(numberStr?: string): boolean {
  const num = normalizeWhatsAppNumber(numberStr);
  return num.length >= 8;
}

/**
 * Builds standard click-to-chat URL
 */
export function createWhatsAppChatUrl(customText?: string): string {
  const number = normalizeWhatsAppNumber();
  if (!number) return "";
  const text = customText || siteConfig.defaultWhatsAppMessage;
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}

/**
 * Generates an architectural enquiry message pre-filled with project estimator specifics
 */
export function buildEstimatorWhatsAppMessage(
  input: CostEstimatorInput,
  result?: CostEstimatorResult
): string {
  const propMap: Record<string, string> = {
    "1bhk": "1 BHK Apartment",
    "2bhk": "2 BHK Apartment",
    "3bhk": "3 BHK Apartment / Floor",
    "4bhk-plus": "4+ BHK Penthouse / Luxury Suite",
    villa: "Private Bungalow / Villa",
    office: "Commercial Workspace / Office",
    retail: "Boutique Retail / Studio",
    other: "Custom Architecture Project",
  };

  const serviceMap: Record<string, string> = {
    architectural: "Architectural Planning & Facade Design",
    interior: "Luxury Interior Architecture & Styling",
    "3d-only": "3D Elevation & Photorealistic Visualization",
    "turnkey-full": "Complete Turnkey Design & Site Execution",
  };

  const tierMap: Record<string, string> = {
    standard: "Essential Contemporary",
    premium: "Premium Architectural",
    luxury: "Bespoke Luxury Signature",
  };

  let msg = `*Sanrachana Design Studio (संरचना) - Project Inquiry*\n\n`;
  msg += `Hello, I explored your website estimator and would like to discuss my project:\n\n`;
  msg += `• *Property Type:* ${propMap[input.propertyType] || input.propertyType}\n`;
  msg += `• *Approx. Area:* ${formatSqFt(input.carpetAreaSqFt)}\n`;
  msg += `• *Service Required:* ${serviceMap[input.serviceCategory] || input.serviceCategory}\n`;
  msg += `• *Finish / Scope Level:* ${tierMap[input.finishTier] || input.finishTier}\n`;

  const addons: string[] = [];
  if (input.include3dWalkthrough) addons.push("3D VR Walkthrough");
  if (input.includeVastuPlanning) addons.push("Vastu Alignment");
  if (input.includeSiteSupervision) addons.push("Site Supervision & BOQ");

  if (addons.length > 0) {
    msg += `• *Add-on Scope:* ${addons.join(", ")}\n`;
  }

  if (result) {
    msg += `\n*Indicative Ballpark Range:* ${formatINR(result.estimatedMinTotal)} – ${formatINR(
      result.estimatedMaxTotal
    )}\n`;
  }

  msg += `\nPlease let me know when we can schedule an introductory consultation.\nThank you!`;

  return msg;
}
