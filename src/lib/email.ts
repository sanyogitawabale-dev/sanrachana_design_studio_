import { ContactFormData } from "@/types";
import { siteConfig } from "@/config/site";

export interface EmailSendResult {
  success: boolean;
  messageId?: string;
  isMock?: boolean;
  error?: string;
}

/**
 * Sends notification email for new studio inquiry.
 * Uses Resend API if RESEND_API_KEY is configured, or logs in mock mode.
 */
export async function sendInquiryEmail(formData: ContactFormData): Promise<EmailSendResult> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const recipientEmail =
    process.env.CONTACT_EMAIL_RECIPIENT?.trim() || siteConfig.contact.email || "info@sanrachanadesign.com";
  const fromEmail = process.env.EMAIL_FROM?.trim() || "Sanrachana Studio <onboarding@resend.dev>";

  // Header injection protection
  const cleanSubject = `New Project Inquiry from ${formData.name.replace(/[\r\n]/g, "")}`;

  const htmlBody = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f7f6f2; color: #1a1a1a; margin: 0; padding: 30px; }
          .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; border: 1px solid #e5e0d8; overflow: hidden; }
          .header { background: #121417; color: #ffffff; padding: 25px 30px; border-bottom: 3px solid #c5a880; }
          .header h1 { margin: 0; font-size: 20px; font-weight: 600; letter-spacing: 0.5px; }
          .header p { margin: 5px 0 0; color: #c5a880; font-size: 13px; }
          .content { padding: 30px; }
          .field-group { margin-bottom: 18px; }
          .label { font-size: 12px; text-transform: uppercase; color: #767676; letter-spacing: 0.5px; margin-bottom: 4px; font-weight: 600; }
          .value { font-size: 15px; color: #1a1a1a; line-height: 1.5; }
          .message-box { background: #faf9f6; padding: 16px; border-radius: 6px; border-left: 4px solid #c5a880; margin-top: 8px; }
          .footer { background: #faf9f6; padding: 18px 30px; font-size: 12px; color: #888; border-top: 1px solid #eee; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>संरचना Design Studio</h1>
            <p>New Client Project Inquiry</p>
          </div>
          <div class="content">
            <div class="field-group">
              <div class="label">Client Name</div>
              <div class="value"><strong>${escapeHtml(formData.name)}</strong></div>
            </div>
            <div class="field-group">
              <div class="label">Email Address</div>
              <div class="value"><a href="mailto:${escapeHtml(formData.email)}">${escapeHtml(formData.email)}</a></div>
            </div>
            ${
              formData.phone
                ? `
            <div class="field-group">
              <div class="label">Phone / WhatsApp</div>
              <div class="value">${escapeHtml(formData.phone)}</div>
            </div>`
                : ""
            }
            <div class="field-group">
              <div class="label">Service Category</div>
              <div class="value">${escapeHtml(formData.serviceCategory)}</div>
            </div>
            ${
              formData.propertyType
                ? `
            <div class="field-group">
              <div class="label">Property Type</div>
              <div class="value">${escapeHtml(formData.propertyType)}</div>
            </div>`
                : ""
            }
            ${
              formData.carpetArea
                ? `
            <div class="field-group">
              <div class="label">Approx. Carpet Area</div>
              <div class="value">${escapeHtml(formData.carpetArea)}</div>
            </div>`
                : ""
            }
            ${
              formData.budgetRange
                ? `
            <div class="field-group">
              <div class="label">Budget Range</div>
              <div class="value">${escapeHtml(formData.budgetRange)}</div>
            </div>`
                : ""
            }
            <div class="field-group">
              <div class="label">Project Requirements & Notes</div>
              <div class="message-box">${escapeHtml(formData.message).replace(/\n/g, "<br/>")}</div>
            </div>
          </div>
          <div class="footer">
            Submitted via Sanrachana Design Studio Website • ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST
          </div>
        </div>
      </body>
    </html>
  `;

  const plainText = `
Sanrachana Design Studio - New Website Inquiry
--------------------------------------------------
Client Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone || "Not provided"}
Service Category: ${formData.serviceCategory}
Property Type: ${formData.propertyType || "Not provided"}
Carpet Area: ${formData.carpetArea || "Not provided"}
Budget Range: ${formData.budgetRange || "Not provided"}

Project Message:
${formData.message}
--------------------------------------------------
Submitted on ${new Date().toISOString()}
  `.trim();

  // If no Resend API key is configured, operate in development mock mode
  if (!apiKey) {
    console.log("----------------------------------------------------------------");
    console.log("[MOCK EMAIL DISPATCH] RESEND_API_KEY is not set. Simulating delivery:");
    console.log(`To: ${recipientEmail}`);
    console.log(`Subject: ${cleanSubject}`);
    console.log(`From: ${fromEmail}`);
    console.log(`Sender: ${formData.name} <${formData.email}>`);
    console.log("----------------------------------------------------------------");
    return {
      success: true,
      messageId: `mock_${Date.now()}`,
      isMock: true,
    };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [recipientEmail],
        reply_to: formData.email,
        subject: cleanSubject,
        html: htmlBody,
        text: plainText,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("[Email Dispatch Error]", data);
      return {
        success: false,
        error: data.message || "Email provider returned an error.",
      };
    }

    return {
      success: true,
      messageId: data.id,
      isMock: false,
    };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Network failure during email dispatch";
    console.error("[Email Dispatch Exception]", errorMsg);
    return {
      success: false,
      error: errorMsg,
    };
  }
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
