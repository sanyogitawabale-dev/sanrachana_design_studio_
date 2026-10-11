import React from "react";
import { siteConfig, hasWhatsApp, getWhatsAppUrl } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { ArrowRight, MessageCircle, Calculator } from "lucide-react";

export function ConsultationCTA() {
  const whatsAppAvailable = hasWhatsApp();
  const whatsAppUrl = getWhatsAppUrl();

  return (
    <section className="relative py-20 sm:py-28 bg-gradient-to-b from-stone-950 via-stone-900 to-stone-950 text-stone-100 overflow-hidden">
      {/* Subtle Background Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#C5A880]/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="text-xs uppercase tracking-[0.3em] text-[#C5A880] font-semibold mb-3 inline-block">
          {siteConfig.devanagariName} • Let&apos;s Build Together
        </span>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal text-white leading-tight mb-6 max-w-3xl mx-auto">
          Ready to Bring Your Architectural Vision to Life?
        </h2>

        <p className="text-base sm:text-lg text-stone-300 font-light leading-relaxed max-w-2xl mx-auto mb-10">
          Whether you have a raw plot ready for design, a high-rise apartment ready for interior transformation, or require high-end 3D elevation renders, our team is ready to assist.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto sm:max-w-none">
          <Button
            variant="gold"
            size="lg"
            href="/contact"
            rightIcon={<ArrowRight className="w-4 h-4" />}
            className="w-full sm:w-auto"
          >
            Schedule Consultation
          </Button>

          <Button
            variant="outline"
            size="lg"
            href="/estimator"
            leftIcon={<Calculator className="w-4 h-4 text-[#C5A880]" />}
            className="w-full sm:w-auto text-stone-200 border-stone-700 hover:bg-stone-900"
          >
            Calculate Project Estimate
          </Button>

          {whatsAppAvailable && (
            <Button
              variant="outline"
              size="lg"
              href={whatsAppUrl}
              leftIcon={<MessageCircle className="w-4 h-4 text-emerald-400" />}
              className="w-full sm:w-auto text-stone-200 border-stone-700 hover:border-emerald-500/50 hover:bg-stone-900"
            >
              WhatsApp Us
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
