import React from "react";
import Image from "next/image";
import { servicesData } from "@/data/services";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { hasWhatsApp, getWhatsAppUrl } from "@/config/site";
import { CheckCircle2, FileText, ArrowRight, MessageCircle } from "lucide-react";

export function ServiceDetailSection() {
  const whatsAppAvailable = hasWhatsApp();

  return (
    <section className="py-16 sm:py-24 bg-stone-950 text-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        {servicesData.map((service, index) => {
          const isEven = index % 2 === 0;

          return (
            <div
              key={service.id}
              id={service.id}
              className="scroll-mt-32 pt-8 border-t border-stone-800/80 first:border-0 first:pt-0"
            >
              <div
                className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center ${
                  isEven ? "" : "lg:flex-row-reverse"
                }`}
              >
                {/* Visual Showcase (5 cols) */}
                <div
                  className={`lg:col-span-5 ${
                    isEven ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <div className="relative aspect-[4/3] rounded-sm overflow-hidden bg-stone-900 border border-stone-800 shadow-xl group" style={{ position: "relative" }}>
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
                    
                    <div className="absolute bottom-4 left-4 right-4 p-3 bg-stone-900/90 backdrop-blur-md rounded-sm border border-stone-800 text-xs text-stone-300 flex items-center justify-between">
                      <span className="font-mono text-[#C5A880] uppercase">
                        {service.hindiTitle}
                      </span>
                      <span className="text-[10px] text-stone-400">Milestone Deliverable</span>
                    </div>
                  </div>
                </div>

                {/* Content & Deliverables (7 cols) */}
                <div
                  className={`lg:col-span-7 space-y-6 ${
                    isEven ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="gold" size="sm">
                        Discipline 0{index + 1}
                      </Badge>
                      <span className="text-xs font-serif text-[#C5A880] tracking-widest uppercase">
                        {service.hindiTitle}
                      </span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-normal text-white">
                      {service.title}
                    </h2>

                    <p className="text-xs uppercase tracking-wider text-[#C5A880] font-medium mt-1">
                      {service.tagline}
                    </p>
                  </div>

                  <p className="text-sm sm:text-base text-stone-300 font-light leading-relaxed">
                    {service.fullDescription}
                  </p>

                  {/* Features Grid */}
                  <div>
                    <h3 className="text-xs uppercase tracking-widest text-[#E0C7A6] font-semibold mb-3">
                      Scope of Services & Expertise:
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {service.features.map((feat, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-2 text-xs sm:text-sm text-stone-300 font-light"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Milestone Deliverables Box */}
                  <div className="p-5 rounded-sm bg-stone-900/80 border border-stone-800">
                    <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#C5A880] font-semibold mb-2.5">
                      <FileText className="w-4 h-4" />
                      <span>Key Tangible Deliverables:</span>
                    </div>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-300 font-light">
                      {service.deliverables.map((deliv, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
                          <span>{deliv}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <Button
                      variant="gold"
                      size="md"
                      href={`/contact?service=${encodeURIComponent(service.title)}`}
                      rightIcon={<ArrowRight className="w-4 h-4" />}
                    >
                      Inquire for {service.title}
                    </Button>

                    <Button
                      variant="outline"
                      size="md"
                      href="/estimator"
                      className="text-stone-300 border-stone-700 hover:bg-stone-900"
                    >
                      Estimate Scope Cost
                    </Button>

                    {whatsAppAvailable && (
                      <Button
                        variant="outline"
                        size="md"
                        href={getWhatsAppUrl(`Hello Sanrachana Design Studio, I would like to inquire about your ${service.title} service.`)}
                        leftIcon={<MessageCircle className="w-4 h-4 text-emerald-400" />}
                        className="text-stone-300 border-stone-700 hover:border-emerald-500/50 hover:bg-stone-900"
                      >
                        WhatsApp
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
