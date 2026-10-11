import React from "react";
import { testimonialsData } from "@/data/testimonials";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Star, Quote } from "lucide-react";

export function TestimonialsSection() {
  return (
    <section className="py-20 sm:py-28 bg-stone-900 text-stone-100 border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          dark
          badge="Client Trust"
          devanagariSubtitle="हमारे ग्राहकों के अनुभव"
          title="Words of Appreciation"
          description="Reflections on our spatial design precision, communication clarity, and seamless project execution."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonialsData.map((item) => (
            <div
              key={item.id}
              className="relative flex flex-col justify-between p-7 sm:p-8 bg-stone-950 border border-stone-800 rounded-sm hover:border-[#C5A880]/50 transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#C5A880] text-[#C5A880]" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-stone-700" />
                </div>

                <p className="text-sm sm:text-base text-stone-300 font-light italic leading-relaxed mb-6">
                  “{item.quote}”
                </p>
              </div>

              <div className="pt-4 border-t border-stone-800/80">
                <div className="font-serif text-base text-white font-medium">
                  {item.clientName}
                </div>
                <div className="text-xs text-[#C5A880] font-medium mt-0.5">
                  {item.projectType}
                </div>
                {item.isDemonstrationSample && (
                  <span className="inline-block mt-2 text-[10px] text-stone-500 uppercase tracking-widest font-mono">
                    Client Experience Sample
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
