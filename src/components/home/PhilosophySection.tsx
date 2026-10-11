import React from "react";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Compass, Sun, Shield, Layers, ArrowRight } from "lucide-react";

export function PhilosophySection() {
  const pillars = [
    {
      icon: <Sun className="w-5 h-5 text-[#C5A880]" />,
      title: "Context & Climate Responsiveness",
      desc: "Harnessing natural cross-ventilation, daylighting, and orientation to craft spaces that breathe effortlessly.",
    },
    {
      icon: <Compass className="w-5 h-5 text-[#C5A880]" />,
      title: "Vastu Harmony & Ergonomic Flow",
      desc: "Balancing timeless directional geometry with modern minimalist aesthetics and zero wasted square footage.",
    },
    {
      icon: <Layers className="w-5 h-5 text-[#C5A880]" />,
      title: "Sensory Material Honesty",
      desc: "Celebrating genuine textures: fluted natural woods, tactile natural stones, muted micro-cements, and brushed brass.",
    },
    {
      icon: <Shield className="w-5 h-5 text-[#C5A880]" />,
      title: "Structural Integrity & Precision",
      desc: "Good design is only as strong as its technical drawings and execution rigor. We eliminate on-site ambiguity.",
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-stone-950 text-stone-100 border-b border-stone-800 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column: Architectural Imagery Collage */}
          <div className="relative">
            <div className="relative aspect-[4/5] w-full rounded-sm overflow-hidden border border-stone-800 shadow-2xl" style={{ position: "relative" }}>
              <Image
                src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80"
                alt="Sanrachana Design Philosophy - Structural Harmony"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 p-4 bg-stone-900/90 backdrop-blur-md border border-stone-800 rounded-sm">
                <div className="text-xs uppercase tracking-[0.25em] text-[#C5A880] font-semibold">
                  संरचना का मूल सिद्धांत
                </div>
                <div className="text-sm font-serif text-stone-200 mt-1 italic">
                  “Architecture is the thoughtful making of space, where structure meets the human soul.”
                </div>
              </div>
            </div>

            {/* Decorative Floating Frame */}
            <div
              className="hidden sm:block absolute -bottom-6 -right-6 w-48 h-48 border-2 border-[#C5A880]/30 -z-0 pointer-events-none rounded-sm"
              aria-hidden="true"
            />
          </div>

          {/* Right Column: Studio Narrative */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Badge variant="gold">Our Design Philosophy</Badge>
              <span className="text-xs uppercase tracking-[0.2em] text-[#C5A880] font-serif">
                {siteConfig.devanagariName}
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-white leading-tight">
              Spaces Designed with Purpose, <br />
              <span className="italic text-[#E0C7A6]">Formed for Generations.</span>
            </h2>

            <p className="text-base text-stone-300 font-light leading-relaxed">
              At <strong>{siteConfig.name}</strong>, we believe every structure tells a story. We bridge the critical intersection between architectural vision, engineering discipline, and interior intimacy.
            </p>

            {/* 4 Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-4">
              {pillars.map((pillar, i) => (
                <div
                  key={i}
                  className="p-4 rounded-sm bg-stone-900/70 border border-stone-800/80 hover:border-[#C5A880]/50 transition-colors"
                >
                  <div className="mb-2.5 p-1.5 rounded-sm bg-stone-950 inline-block border border-stone-800">
                    {pillar.icon}
                  </div>
                  <h4 className="text-sm font-serif font-medium text-white mb-1">
                    {pillar.title}
                  </h4>
                  <p className="text-xs text-stone-400 font-light leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Button variant="gold" size="md" href="/about">
                Read About Our Studio
              </Button>
              <Button
                variant="outline"
                size="md"
                href="/process"
                rightIcon={<ArrowRight className="w-4 h-4" />}
                className="text-stone-300 border-stone-700 hover:bg-stone-900"
              >
                Our 4-Step Process
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
