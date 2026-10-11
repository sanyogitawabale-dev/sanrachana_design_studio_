import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/rate-limit";
import { sendInquiryEmail } from "@/lib/email";
import { sanitizeText } from "@/lib/utils";
import { ContactFormData } from "@/types";

export async function POST(req: NextRequest) {
  try {
    // 1. Extract IP for rate limiting
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "127.0.0.1";

    const rateLimit = checkRateLimit(ip, { intervalMs: 60 * 1000, maxRequests: 5 });

    if (!rateLimit.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Too many inquiries submitted recently. Please wait a minute before trying again or message us directly on WhatsApp.",
        },
        {
          status: 429,
          headers: {
            "Retry-After": "60",
          },
        }
      );
    }

    // 2. Parse request JSON body safely
    let body: Partial<ContactFormData>;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, message: "Invalid JSON request payload." },
        { status: 400 }
      );
    }

    // 3. Spam Honeypot check
    if (body.honeypot && body.honeypot.trim() !== "") {
      // Bot detected, return simulated success without sending email
      return NextResponse.json({
        success: true,
        message: "Thank you for reaching out. We will get back to you shortly.",
      });
    }

    // 4. Validate Required Fields
    const errors: Record<string, string> = {};

    const name = sanitizeText(body.name || "");
    const email = (body.email || "").trim().toLowerCase();
    const phone = sanitizeText(body.phone || "");
    const serviceCategory = sanitizeText(body.serviceCategory || "General Inquiry");
    const propertyType = sanitizeText(body.propertyType || "");
    const carpetArea = sanitizeText(body.carpetArea || "");
    const budgetRange = sanitizeText(body.budgetRange || "");
    const message = sanitizeText(body.message || "");
    const privacyConsent = Boolean(body.privacyConsent);

    if (!name || name.length < 2) {
      errors.name = "Please provide your full name (minimum 2 characters).";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      errors.email = "Please provide a valid email address.";
    }

    if (!message || message.length < 10) {
      errors.message = "Please describe your project requirements (minimum 10 characters).";
    }

    if (!privacyConsent) {
      errors.privacyConsent = "Please accept the privacy terms to submit your inquiry.";
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Please correct the highlighted errors in the form.",
          errors,
        },
        { status: 400 }
      );
    }

    // 5. Send notification email
    const cleanFormData: ContactFormData = {
      name,
      email,
      phone,
      serviceCategory,
      propertyType,
      carpetArea,
      budgetRange,
      message,
      privacyConsent,
    };

    const dispatchResult = await sendInquiryEmail(cleanFormData);

    if (!dispatchResult.success) {
      return NextResponse.json(
        {
          success: false,
          message: "We encountered an issue dispatching your message. Please reach out via WhatsApp or direct phone.",
          error: dispatchResult.error,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message:
          "Thank you! Your project inquiry has been received by Sanrachana Design Studio. We will contact you within 24 business hours.",
        data: {
          isMock: dispatchResult.isMock,
          referenceId: dispatchResult.messageId,
        },
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : "Internal server error";
    console.error("[Contact Route Error]", errorMsg);
    return NextResponse.json(
      { success: false, message: "An unexpected error occurred. Please try again or WhatsApp us." },
      { status: 500 }
    );
  }
}
