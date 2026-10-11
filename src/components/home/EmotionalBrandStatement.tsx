import React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { StudioLogo } from "@/components/common/StudioLogo";
import { Button } from "@/components/ui/Button";
import { Sparkles, ArrowRight, Heart } from "lucide-react";

export function EmotionalBrandStatement() {
  return (
    <section className="py-24 sm:py-32 bg-[#14161a] text-[#f4f0e8] border-b border-stone-800 relative overflow-hidden">
      {/* Subtle Background Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(197,168,128,0.06)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 flex flex-col items-center">
        {/* Studio Emblem / Logo Mark */}
        <div className="mb-8 p-3 rounded-full bg-stone-900 border border-stone-800 shadow-xl flex items-center justify-center">
          <StudioLogo variant="mark" size="lg" />
        </div>

        {/* Marathi Emotional Expression Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-900/90 border border-stone-800 text-[#E0C7A6] mb-8">
          <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
          <span className="text-xs font-serif tracking-widest uppercase">
            संरचना भावना • Studio Creed
          </span>
        </div>

        {/* Primary English Quote */}
        <blockquote className="text-2xl sm:text-4xl md:text-5xl font-serif font-normal text-white max-w-4xl leading-[1.2] mb-6">
          &ldquo;{siteConfig.emotionalStatement}&rdquo;
        </blockquote>

        {/* Major Marathi Callout */}
        <p className="text-lg sm:text-2xl md:text-3xl font-serif font-light text-[#E0C7A6] tracking-wide mb-10 max-w-3xl leading-relaxed">
          &ldquo;{siteConfig.emotionalStatementMarathi}&rdquo;
        </p>

        {/* Architectural Narrative */}
        <p className="text-sm sm:text-base text-stone-300 font-light max-w-2xl leading-relaxed mb-10">
          Architecture is the physical canvas of your everyday life. From the first morning light streaming through your courtyard to the evening quiet in your study, our practice crafts spaces that honor who you are.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md">
          <Button
            variant="gold"
            size="lg"
            href="/contact"
            rightIcon={<ArrowRight className="w-4 h-4" />}
            className="w-full sm:w-auto shadow-[0_0_20px_rgba(197,168,128,0.25)]"
          >
            Start a Conversation
          </Button>

          <Button
            variant="outline"
            size="lg"
            href="/about"
            className="w-full sm:w-auto text-stone-200 border-stone-700 hover:bg-stone-900"
          >
            About Sanrachana
          </Button>
        </div>
      </div>
    </section>
  );
}
