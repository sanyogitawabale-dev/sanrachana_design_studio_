import { Metadata } from "next";
import { Suspense } from "react";
import { PageHero } from "@/components/common/PageHero";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactInfoCards } from "@/components/contact/ContactInfoCards";
import { InteractiveMap } from "@/components/contact/InteractiveMap";
import { siteConfig } from "@/config/site";
import { Loader2 } from "lucide-react";

export const metadata: Metadata = {
  title: `Contact & Consultation | ${siteConfig.name}`,
  description:
    "Get in touch with Sanrachana Design Studio (संरचना). Request an architectural or interior design consultation via website form, WhatsApp, or phone.",
};

export default function ContactPage() {
  return (
    <main className="flex-1">
      <PageHero
        title="Contact & Consultation"
        devanagariSubtitle="हमसे संपर्क करें और परियोजना पर चर्चा करें"
        badge="Direct Communication"
        description="Share your plot size, floor plans, or spatial requirements. Let's explore how we can design and execute your space."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Contact", href: "/contact" },
        ]}
      />

      <section className="py-16 sm:py-24 bg-stone-950 text-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Form Column (7 cols) */}
            <div className="lg:col-span-7">
              <Suspense
                fallback={
                  <div className="p-12 text-center bg-stone-900 border border-stone-800 rounded-sm">
                    <Loader2 className="w-8 h-8 animate-spin text-[#C5A880] mx-auto mb-2" />
                    <span className="text-xs text-stone-400">Loading consultation form...</span>
                  </div>
                }
              >
                <ContactForm />
              </Suspense>
            </div>

            {/* Info & Map Column (5 cols) */}
            <div className="lg:col-span-5 space-y-8">
              <ContactInfoCards />
              <InteractiveMap />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
