import { describe, it, expect } from "vitest";
import { POST } from "@/app/api/contact/route";
import { NextRequest } from "next/server";

describe("Contact Form API Endpoint (/api/contact)", () => {
  it("should reject submissions with missing name or invalid email", async () => {
    const invalidBody = {
      name: "",
      email: "not-an-email",
      message: "Short",
      privacyConsent: false,
    };

    const req = new NextRequest("http://localhost:3000/api/contact", {
      method: "POST",
      body: JSON.stringify(invalidBody),
      headers: {
        "Content-Type": "application/json",
        "x-forwarded-for": `test_ip_${Date.now()}_val`,
      },
    });

    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(400);
    expect(data.success).toBe(false);
    expect(data.errors).toBeDefined();
    expect(data.errors.name).toBeDefined();
    expect(data.errors.email).toBeDefined();
    expect(data.errors.message).toBeDefined();
    expect(data.errors.privacyConsent).toBeDefined();
  });

  it("should silently handle bot submissions when honeypot field is filled", async () => {
    const botBody = {
      name: "Spam Bot",
      email: "bot@spam.com",
      message: "This is a spam promotion link",
      honeypot: "I am a bot",
      privacyConsent: true,
    };

    const req = new NextRequest("http://localhost:3000/api/contact", {
      method: "POST",
      body: JSON.stringify(botBody),
      headers: {
        "Content-Type": "application/json",
        "x-forwarded-for": `test_ip_${Date.now()}_bot`,
      },
    });

    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.success).toBe(true);
  });

  it("should successfully process a valid inquiry in development mock mode", async () => {
    const validBody = {
      name: "Aarav Deshmukh",
      email: "aarav@example.com",
      phone: "+91 98765 43210",
      serviceCategory: "Architectural Design",
      propertyType: "Private Villa",
      carpetArea: "3,200 sq. ft.",
      budgetRange: "₹ 50 - 75 Lakhs",
      message: "We have acquired a 4,000 sq ft corner plot and are looking for modern cantilevered bungalow architecture.",
      privacyConsent: true,
    };

    const req = new NextRequest("http://localhost:3000/api/contact", {
      method: "POST",
      body: JSON.stringify(validBody),
      headers: {
        "Content-Type": "application/json",
        "x-forwarded-for": `test_ip_${Date.now()}_success`,
      },
    });

    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.message).toContain("received");
  });
});
