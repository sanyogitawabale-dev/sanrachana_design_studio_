import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines Tailwind class names safely with conflict resolution
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Format currency in Indian Rupees (INR) format (e.g. ₹ 1,50,000)
 */
export function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format area with unit (e.g. 2,500 sq. ft.)
 */
export function formatSqFt(area: number): string {
  return `${new Intl.NumberFormat("en-IN").format(area)} sq. ft.`;
}

/**
 * Strip dangerous characters to prevent HTML/XSS injection in text
 */
export function sanitizeText(text: string): string {
  return text
    .replace(/[<>]/g, "")
    .trim()
    .slice(0, 2000);
}
