import { describe, it, expect } from "vitest";
import {
  hasWhatsApp,
  getWhatsAppUrl,
  hasPhone,
  getPhoneUrl,
  hasEmail,
  getMailtoUrl,
  hasAddress,
  getDirectionsUrl,
  siteConfig,
} from "@/config/site";

describe("Site Configuration & Contact Helpers", () => {
  it("should have official studio brand and Instagram information", () => {
    expect(siteConfig.name).toBe("Sanrachana Design Studio");
    expect(siteConfig.devanagariName).toBe("संरचना Design Studio");
    expect(siteConfig.brandTheme).toBe("From Empty Space to Dream Space");
    expect(siteConfig.brandExpression).toBe("Every space has a story.");
    expect(siteConfig.marathiExpression).toBe("प्रत्येक जागेला एक कथा असते.");
    expect(siteConfig.heroConceptLine).toBe("First, there is a space.");
    expect(siteConfig.heroMarathiLine).toBe("मग सुरू होतं एक स्वप्न.");
    expect(siteConfig.emotionalStatementMarathi).toBe("जागा सुंदर असण्यापलीकडे, ती आपलीशी वाटली पाहिजे.");
    expect(siteConfig.instagram.handle).toBe("@sanrachana_design_studio_");
    expect(siteConfig.instagram.url).toBe(
      "https://www.instagram.com/sanrachana_design_studio_/"
    );
  });

  it("should handle WhatsApp URL generation safely", () => {
    // If empty in env, hasWhatsApp should be false and getWhatsAppUrl return empty string
    if (!siteConfig.contact.whatsappNumber) {
      expect(hasWhatsApp()).toBe(false);
      expect(getWhatsAppUrl()).toBe("");
    } else {
      expect(hasWhatsApp()).toBe(true);
      const url = getWhatsAppUrl("Custom architectural inquiry");
      expect(url).toContain("https://wa.me/");
      expect(url).toContain("text=Custom%20architectural%20inquiry");
    }
  });

  it("should handle Phone and Tel link safely", () => {
    if (!siteConfig.contact.phone) {
      expect(hasPhone()).toBe(false);
      expect(getPhoneUrl()).toBe("");
    } else {
      expect(hasPhone()).toBe(true);
      expect(getPhoneUrl()).toMatch(/^tel:/);
    }
  });

  it("should handle Email and Mailto link safely", () => {
    if (!siteConfig.contact.email) {
      expect(hasEmail()).toBe(false);
      expect(getMailtoUrl()).toBe("");
    } else {
      expect(hasEmail()).toBe(true);
      const mailto = getMailtoUrl("Test Subject", "Test Body");
      expect(mailto).toContain("mailto:");
      expect(mailto).toContain("subject=Test%20Subject");
    }
  });

  it("should handle Address and Directions gracefully", () => {
    if (!siteConfig.contact.address && !siteConfig.contact.googleMapsDirectionsUrl) {
      expect(hasAddress()).toBe(false);
      expect(getDirectionsUrl()).toBe("");
    } else {
      expect(getDirectionsUrl().length).toBeGreaterThan(0);
    }
  });
});
