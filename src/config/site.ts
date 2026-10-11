/**
 * Centralized Site Configuration for संरचना Design Studio (Sanrachana Design Studio)
 * All environment variables are safely accessed with sensible defaults and fallback behavior.
 */

export const siteConfig = {
  name: "Sanrachana Design Studio",
  devanagariName: "संरचना Design Studio",
  tagline: "Architecture • Interior Design • 3D Elevation • Space Planning",
  brandTheme: "From Empty Space to Dream Space",
  brandExpression: "Every space has a story.",
  marathiExpression: "प्रत्येक जागेला एक कथा असते.",
  heroConceptLine: "First, there is a space.",
  heroMarathiLine: "मग सुरू होतं एक स्वप्न.",
  emotionalStatement: "A space should do more than look beautiful. It should feel like yours.",
  emotionalStatementMarathi: "जागा सुंदर असण्यापलीकडे, ती आपलीशी वाटली पाहिजे.",
  description:
    "Sanrachana Design Studio (संरचना) is an architectural and interior design practice dedicated to creating sustainable, functional, and visually striking residential, commercial, and turnkey spaces.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://sanrachanadesign.com",
  ogImage: "/images/og-image.jpg",
  
  // Official Social Profiles
  instagram: {
    handle: "@sanrachana_design_studio_",
    url: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://www.instagram.com/sanrachana_design_studio_/",
    displayUrl: "instagram.com/sanrachana_design_studio_",
  },

  // Contact Information (Configurable via Environment Variables or directly here)
  contact: {
    // International format without '+', spaces, or hyphens (e.g., '919876543210')
    whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "",
    // Display phone number for click-to-call (e.g., '+91 98765 43210')
    phone: process.env.NEXT_PUBLIC_PHONE_NUMBER || "",
    // Inquiry Email Address
    email: process.env.NEXT_PUBLIC_EMAIL || "",
    // Physical Studio Location
    address: process.env.NEXT_PUBLIC_STUDIO_ADDRESS || "Kalwa, Thane, Maharashtra, India",
    // Google Maps Embed and Directions URLs
    googleMapsEmbedUrl: process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL || "",
    googleMapsDirectionsUrl: process.env.NEXT_PUBLIC_GOOGLE_MAPS_DIRECTIONS_URL || "https://www.google.com/maps/search/?api=1&query=Sanrachana+Design+Studio+Kalwa+Thane",
  },

  // Default pre-filled WhatsApp message
  defaultWhatsAppMessage:
    "Hello Sanrachana Design Studio (संरचना), I am interested in your architecture & interior design services and would like to discuss my project.",

  // Business Hours (Indicative)
  workingHours: {
    weekdays: "Monday – Saturday: 10:00 AM – 7:00 PM IST",
    sunday: "Sunday: By Prior Appointment",
  },

  // SEO Keywords
  keywords: [
    "Sanrachana Design Studio",
    "संरचना Design Studio",
    "Architectural Design",
    "Interior Design Studio",
    "3D Elevation Renders",
    "Space Planning & Vastu",
    "Residential Architecture",
    "Commercial Interiors",
    "Turnkey Execution",
    "Luxury Villa Design",
  ],

  // Notice for Demonstration Showcase Imagery
  demonstrationNotice:
    "Project images shown in this portfolio preview represent architectural design inspirations and 3D visual concepts crafted to illustrate our spatial expertise. Studio work is continuously updated via our official Instagram @sanrachana_design_studio_.",
};

// ==============================================================================
// Safe Helper Utilities for Contact Links
// ==============================================================================

/**
 * Checks whether a valid WhatsApp number is configured
 */
export function hasWhatsApp(): boolean {
  const num = siteConfig.contact.whatsappNumber.replace(/[^0-9]/g, "");
  return num.length >= 8;
}

/**
 * Generates an accessible, URL-encoded WhatsApp Click-to-Chat link.
 * Returns empty string if number is not configured.
 */
export function getWhatsAppUrl(customMessage?: string): string {
  const rawNumber = siteConfig.contact.whatsappNumber.replace(/[^0-9]/g, "");
  if (!rawNumber || rawNumber.length < 8) {
    return "";
  }
  const message = customMessage || siteConfig.defaultWhatsAppMessage;
  return `https://wa.me/${rawNumber}?text=${encodeURIComponent(message)}`;
}

/**
 * Checks whether a valid direct phone number is configured
 */
export function hasPhone(): boolean {
  const phone = siteConfig.contact.phone.trim();
  return phone.length >= 6;
}

/**
 * Generates a clean tel: link. Returns empty string if phone is not configured.
 */
export function getPhoneUrl(): string {
  const cleanPhone = siteConfig.contact.phone.replace(/[^0-9+]/g, "");
  return cleanPhone ? `tel:${cleanPhone}` : "";
}

/**
 * Checks whether a valid email is configured
 */
export function hasEmail(): boolean {
  const email = siteConfig.contact.email.trim();
  return email.length > 5 && email.includes("@") && email.includes(".");
}

/**
 * Generates a mailto: link with optional subject and pre-filled body.
 */
export function getMailtoUrl(subject?: string, body?: string): string {
  if (!hasEmail()) return "";
  const params: string[] = [];
  if (subject) params.push(`subject=${encodeURIComponent(subject)}`);
  if (body) params.push(`body=${encodeURIComponent(body)}`);
  const query = params.length > 0 ? `?${params.join("&")}` : "";
  return `mailto:${siteConfig.contact.email}${query}`;
}

/**
 * Checks whether physical address is configured
 */
export function hasAddress(): boolean {
  return siteConfig.contact.address.trim().length > 0;
}

/**
 * Returns Google Maps directions URL or fallback Google Search query
 */
export function getDirectionsUrl(): string {
  if (siteConfig.contact.googleMapsDirectionsUrl) {
    return siteConfig.contact.googleMapsDirectionsUrl;
  }
  if (hasAddress()) {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      siteConfig.contact.address
    )}`;
  }
  return "";
}
