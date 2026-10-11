import React from "react";
import Image from "next/image";
import Link from "next/link";
import { servicesData } from "@/data/services";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export function ServicesPreview() {
  return (
    <section className="py-20 sm:py-28 bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 border-b border-stone-200 dark:border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Our Core Disciplines"
          devanagariSubtitle="वास्तुशिल्प और आंतरिक डिज़ाइन सेवाएँ"
          title="Holistic Spatial & Architectural Solutions"
          description="From initial site topography analysis to bespoke interior millwork and photorealistic 3D visualization, we deliver end-to-end design excellence."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-14">
          {servicesData.slice(0, 3).map((service) => (
            <div
              key={service.id}
              className="group flex flex-col bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-sm overflow-hidden hover:border-[#C5A880] transition-all duration-300 hover:shadow-xl"
            >
              {/* Image Preview with Aspect Ratio */}
              <div className="relative h-56 w-full overflow-hidden bg-stone-800" style={{ position: "relative" }}>
                <Image
                  src={service.image}
                  alt={`${service.title} - Sanrachana Design Studio`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 right-4">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#E0C7A6]">
                    {service.hindiTitle}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-serif font-normal text-stone-900 dark:text-stone-100 group-hover:text-[#C5A880] transition-colors">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm text-stone-600 dark:text-stone-400 font-light leading-relaxed">
                    {service.shortDescription}
                  </p>

                  <ul className="mt-5 space-y-2 border-t border-stone-100 dark:border-stone-800/80 pt-4">
                    {service.features.slice(0, 3).map((feat, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-xs text-stone-600 dark:text-stone-300 font-light"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A880] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
                  <Link
                    href={`/services#${service.id}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#C5A880] hover:text-[#99794e] dark:hover:text-[#E0C7A6] transition-colors group-hover:translate-x-1"
                  >
                    <span>Explore Discipline</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Services Callout */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 sm:p-8 bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-sm">
          <div>
            <h4 className="text-lg font-serif font-normal text-stone-900 dark:text-stone-100">
              Need a Custom Scope or 3D Elevation Consultation?
            </h4>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 font-light mt-1">
              We also provide standalone Space Planning, Vastu Audits, and Turnkey Site Execution.
            </p>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Button variant="gold" size="sm" href="/services" className="w-full sm:w-auto">
              View All Services
            </Button>
            <Button variant="outline" size="sm" href="/estimator" className="w-full sm:w-auto">
              Cost Estimator
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
