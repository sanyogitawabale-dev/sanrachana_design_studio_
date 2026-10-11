import { Metadata } from "next";
import { PageHero } from "@/components/common/PageHero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { designProcessSteps } from "@/data/process";
import { faqsData } from "@/data/faqs";
import { ConsultationCTA } from "@/components/home/ConsultationCTA";
import { siteConfig } from "@/config/site";
import { CheckCircle2, ArrowRight, HelpCircle } from "lucide-react";

export const metadata: Metadata = {
  title: `Design Process & Workflow | ${siteConfig.name}`,
  description:
    "Discover how Sanrachana Design Studio takes your vision from initial site survey to 3D visualization, detailed drawing sets, and turnkey handover.",
};

export default function ProcessPage() {
  return (
    <main className="flex-1">
      <PageHero
        title="Our Design Process"
        devanagariSubtitle="चरणबद्ध वास्तुशिल्प और निष्पादन प्रक्रिया"
        badge="From Concept to Handover"
        description="A clear, collaborative, four-phase architectural journey designed for predictability, transparent milestones, and immaculate craft."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Process", href: "/process" },
        ]}
      />

      {/* Detailed Process Breakdown */}
      <section className="py-20 bg-stone-950 text-stone-100 border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <SectionHeader
            dark
            badge="Phase-by-Phase Roadmap"
            devanagariSubtitle="स्पष्ट मील के पत्थर और समय सीमा"
            title="How We Deliver Your Dream Space"
            description="Every successful architectural endeavor rests on thorough discovery, photorealistic visualization, and precise documentation."
          />

          <div className="space-y-12">
            {designProcessSteps.map((step) => (
              <div
                key={step.stepNumber}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-8 sm:p-10 bg-stone-900 border border-stone-800 rounded-sm shadow-xl"
              >
                {/* Phase Number & Timeline */}
                <div className="lg:col-span-3 space-y-3 border-b lg:border-b-0 lg:border-r border-stone-800 pb-6 lg:pb-0 lg:pr-8">
                  <div className="text-4xl sm:text-5xl font-serif text-[#C5A880]">
                    Phase {step.stepNumber}
                  </div>
                  {step.durationEstimate && (
                    <div className="inline-block text-xs font-mono px-3 py-1 bg-stone-950 rounded-full text-[#E0C7A6] border border-stone-800">
                      Estimated Duration: {step.durationEstimate}
                    </div>
                  )}
                  <p className="text-xs text-stone-400 font-light mt-2">
                    Client collaborative checkpoints and milestone sign-offs.
                  </p>
                </div>

                {/* Phase Content */}
                <div className="lg:col-span-9 space-y-4">
                  <div>
                    <h3 className="text-2xl font-serif text-white">{step.title}</h3>
                    <p className="text-xs uppercase tracking-wider text-[#C5A880] font-semibold mt-1">
                      {step.tagline}
                    </p>
                  </div>

                  <p className="text-sm text-stone-300 font-light leading-relaxed">
                    {step.description}
                  </p>

                  <div className="pt-3">
                    <h4 className="text-xs uppercase tracking-widest text-[#E0C7A6] font-semibold mb-3">
                      Activities & Specific Deliverables in Phase {step.stepNumber}:
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {step.details.map((detail, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2.5 p-3 rounded-sm bg-stone-950/80 border border-stone-800/80 text-xs text-stone-300"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="py-20 bg-stone-900 text-stone-100 border-b border-stone-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            dark
            badge="Frequently Asked Questions"
            devanagariSubtitle="सामान्य प्रश्न और उत्तर"
            title="Design & Consultation Queries"
            description="Clear answers regarding design timelines, revisions, 3D visualization, and fee structures."
          />

          <div className="space-y-4">
            {faqsData.map((faq, i) => (
              <div
                key={i}
                className="p-6 rounded-sm bg-stone-950 border border-stone-800 space-y-2"
              >
                <div className="flex items-start gap-3">
                  <HelpCircle className="w-5 h-5 text-[#C5A880] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-base font-serif text-white font-medium">
                      {faq.question}
                    </h4>
                    <p className="mt-2 text-xs sm:text-sm text-stone-400 font-light leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button variant="gold" size="md" href="/contact" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Have a Specific Question? Contact Our Architects
            </Button>
          </div>
        </div>
      </section>

      <ConsultationCTA />
    </main>
  );
}
