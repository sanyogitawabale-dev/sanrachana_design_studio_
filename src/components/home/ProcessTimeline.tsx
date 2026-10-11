import React from "react";
import Link from "next/link";
import { designProcessSteps } from "@/data/process";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { CheckCircle2, ArrowRight } from "lucide-react";

export function ProcessTimeline() {
  return (
    <section className="py-20 sm:py-28 bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100 border-b border-stone-200 dark:border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Structured Methodology"
          devanagariSubtitle="चरणबद्ध वास्तुशिल्प प्रक्रिया"
          title="From Initial Spark to Turnkey Handover"
          description="A transparent, four-phase architectural journey designed to keep you informed, confident, and excited at every milestone."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {designProcessSteps.map((step) => (
            <div
              key={step.stepNumber}
              className="relative flex flex-col justify-between p-6 sm:p-7 bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-sm hover:border-[#C5A880] transition-all duration-300 hover:shadow-lg"
            >
              <div>
                {/* Step Number Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl sm:text-4xl font-serif font-light text-[#C5A880]">
                    {step.stepNumber}
                  </span>
                  {step.durationEstimate && (
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-stone-100 dark:bg-stone-900 text-stone-600 dark:text-stone-400 border border-stone-200 dark:border-stone-800">
                      {step.durationEstimate}
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-serif font-normal text-stone-900 dark:text-stone-100 mb-1">
                  {step.title}
                </h3>

                <p className="text-xs uppercase tracking-wider text-[#C5A880] font-medium mb-3">
                  {step.tagline}
                </p>

                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 font-light leading-relaxed mb-4">
                  {step.description}
                </p>

                <ul className="space-y-1.5 pt-3 border-t border-stone-100 dark:border-stone-800/80">
                  {step.details.slice(0, 2).map((detail, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-1.5 text-xs text-stone-600 dark:text-stone-300 font-light"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A880] shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-3 border-t border-stone-100 dark:border-stone-900">
                <Link
                  href="/process"
                  className="text-xs uppercase tracking-wider font-semibold text-[#C5A880] hover:underline inline-flex items-center gap-1"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button variant="outline" size="md" href="/process">
            Explore Detailed Phase Deliverables
          </Button>
        </div>
      </div>
    </section>
  );
}
