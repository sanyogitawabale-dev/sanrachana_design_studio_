import { Metadata } from "next";
import { PageHero } from "@/components/common/PageHero";
import { siteConfig } from "@/config/site";
import { ShieldCheck, Lock, Eye, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: `Privacy Policy | ${siteConfig.name}`,
  description:
    "Privacy Policy for Sanrachana Design Studio. Learn how we respect and protect your project inquiry and contact data.",
};

export default function PrivacyPage() {
  return (
    <main className="flex-1">
      <PageHero
        title="Privacy Policy"
        devanagariSubtitle="गोपनीयता नीति"
        badge="Legal & Data Protection"
        description="Our commitment to safeguarding the personal information and architectural design requirements you share with us."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Privacy Policy", href: "/privacy" },
        ]}
      />

      <section className="py-16 sm:py-24 bg-stone-950 text-stone-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Summary Callout */}
          <div className="p-6 bg-stone-900 border border-stone-800 rounded-sm flex items-start gap-4">
            <ShieldCheck className="w-6 h-6 text-[#C5A880] shrink-0 mt-1" />
            <div className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed">
              <strong>Sanrachana Design Studio (संरचना)</strong> respects your privacy. We collect only the contact information necessary to provide architectural design consultations, prepare project cost estimates, and respond to your direct inquiries. We do not sell, rent, or trade your personal data to third parties.
            </div>
          </div>

          <div className="space-y-8 text-stone-300 font-light text-sm leading-relaxed">
            {/* Section 1 */}
            <div className="space-y-3">
              <h2 className="text-xl font-serif text-white flex items-center gap-2">
                <Eye className="w-5 h-5 text-[#C5A880]" />
                1. Information We Collect
              </h2>
              <p>
                When you submit a project inquiry or contact us via our website form, email, or WhatsApp, we may collect:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-stone-400">
                <li>Your full name and email address</li>
                <li>Contact phone number or WhatsApp handle</li>
                <li>Project parameters (property type, approximate square footage, desired budget, site location)</li>
                <li>Any architectural sketches, blueprints, or notes you submit voluntarily</li>
              </ul>
            </div>

            {/* Section 2 */}
            <div className="space-y-3">
              <h2 className="text-xl font-serif text-white flex items-center gap-2">
                <Lock className="w-5 h-5 text-[#C5A880]" />
                2. How We Use Your Information
              </h2>
              <p>
                We use the information you provide solely to:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-stone-400">
                <li>Review site context, spatial feasibility, and scope</li>
                <li>Prepare preliminary architectural estimations and design proposals</li>
                <li>Contact you regarding meeting schedules, site visits, and consultation follow-ups</li>
                <li>Deliver milestone drawings, 3D renderings, and project updates if you engage our studio</li>
              </ul>
            </div>

            {/* Section 3 */}
            <div className="space-y-3">
              <h2 className="text-xl font-serif text-white flex items-center gap-2">
                <Mail className="w-5 h-5 text-[#C5A880]" />
                3. Third-Party Integrations & Security
              </h2>
              <p>
                Our website utilizes trusted providers (such as Resend for transactional email dispatch and WhatsApp click-to-chat). We implement industry-standard server-side validation, rate limiting, and spam filtering to protect form submissions against unauthorized access and abuse.
              </p>
            </div>

            {/* Section 4 */}
            <div className="space-y-3">
              <h2 className="text-xl font-serif text-white">
                4. Contacting Us Regarding Your Data
              </h2>
              <p>
                If you have questions about this privacy policy or wish to update or delete your contact records from our inquiry logs, please email us directly at{" "}
                <strong className="text-[#C5A880]">{siteConfig.contact.email || "contact@sanrachanadesign.com"}</strong> or reach out via our official Instagram handle{" "}
                <a href={siteConfig.instagram.url} target="_blank" rel="noopener noreferrer" className="text-[#C5A880] underline">
                  {siteConfig.instagram.handle}
                </a>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
