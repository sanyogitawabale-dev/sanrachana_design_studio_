import { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/common/PageHero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { VerifiedNotice } from "@/components/common/VerifiedNotice";
import { ConsultationCTA } from "@/components/home/ConsultationCTA";
import { siteConfig } from "@/config/site";
import { Compass, Layers, Sun, ShieldCheck, PenTool, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: `About Us | ${siteConfig.name}`,
  description:
    "Learn about Sanrachana Design Studio (संरचना) — our architectural philosophy, structural rigor, and commitment to crafting timeless residential and commercial spaces.",
};

export default function AboutPage() {
  const values = [
    {
      icon: <Compass className="w-6 h-6 text-[#C5A880]" />,
      title: "Context-Driven Design",
      desc: "Every site has its own rhythm—topography, sun angles, wind currents, and municipal parameters. We never copy templates; every blueprint is conceived from the ground up.",
    },
    {
      icon: <Layers className="w-6 h-6 text-[#C5A880]" />,
      title: "Tactile Materiality",
      desc: "We balance the warmth of natural timbers with the honesty of concrete, fluted glass, and honed stones to create spaces that feel emotionally grounded and sensory.",
    },
    {
      icon: <Sun className="w-6 h-6 text-[#C5A880]" />,
      title: "Vastu & Environmental Flow",
      desc: "Harmonizing ancient spatial orientation principles with modernist ergonomics to optimize daylight, cross-ventilation, and positive spatial energy.",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#C5A880]" />,
      title: "Millimeter Technical Rigor",
      desc: "From Good-For-Construction drawings to detailed Bill of Quantities (BOQ), we provide contractors with zero-ambiguity documentation.",
    },
  ];

  return (
    <main className="flex-1">
      <PageHero
        title="About Sanrachana Design Studio"
        devanagariSubtitle="संरचना • वास्तुकला और अंतरिक्ष रचना"
        badge="Our Studio Story"
        description="Crafting enduring architectural landmarks, bespoke interior environments, and photorealistic 3D spatial visions."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
        ]}
      />

      {/* Philosophy & Narrative Section */}
      <section className="py-20 bg-stone-950 text-stone-100 border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Narrative */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2">
                <Badge variant="gold">The Meaning of संरचना</Badge>
                <span className="text-xs uppercase tracking-[0.2em] text-[#C5A880] font-serif">
                  Structure • Form • Space
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-serif text-white leading-tight">
                Where Structural Logic Meets <br />
                <span className="italic text-[#E0C7A6]">Architectural Soul.</span>
              </h2>

              <p className="text-base text-stone-300 font-light leading-relaxed">
                The Sanskrit word <strong>संरचना (Sanrachana)</strong> translates to <em>structure, intentional composition, and the art of creation</em>. At Sanrachana Design Studio, this principle guides every pencil stroke, 3D render, and physical brick laid.
              </p>

              <p className="text-sm sm:text-base text-stone-400 font-light leading-relaxed">
                Whether designing a multi-story private bungalow, curating an ultra-luxury penthouse interior, or preparing 3D exterior elevations, our goal is to deliver spaces that enhance the daily rituals of the people who inhabit them.
              </p>

              <div className="pt-2">
                <VerifiedNotice variant="card" />
              </div>
            </div>

            {/* Right Collage */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[4/5] rounded-sm overflow-hidden border border-stone-800 shadow-2xl bg-stone-900" style={{ position: "relative" }}>
                <Image
                  src="/images/studio-brand-editorial.jpg"
                  alt="Architectural Composition and Material Moodboard by Sanrachana Design Studio"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 p-4 bg-stone-900/90 backdrop-blur-md rounded-sm border border-stone-800 text-xs text-stone-300">
                  <div className="font-serif text-[#C5A880] text-sm">
                    Design Integrity & Craft
                  </div>
                  <div className="text-[11px] text-stone-400 mt-1 font-light">
                    Every project is treated as an individual piece of sculptural architecture.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Architectural Values Grid */}
      <section className="py-20 bg-stone-900 text-stone-100 border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            dark
            badge="Foundational Principles"
            devanagariSubtitle="हमारे वास्तुशिल्प मूल्य"
            title="The Pillars of Our Practice"
            description="Our approach unites creative intuition with disciplined architectural execution."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <div
                key={i}
                className="p-6 sm:p-7 rounded-sm bg-stone-950 border border-stone-800 hover:border-[#C5A880] transition-colors"
              >
                <div className="mb-4 p-2.5 rounded-sm bg-stone-900 inline-block border border-stone-800">
                  {v.icon}
                </div>
                <h3 className="text-lg font-serif text-white mb-2">{v.title}</h3>
                <p className="text-xs sm:text-sm text-stone-400 font-light leading-relaxed">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Verification & Transparency Section */}
      <section className="py-16 bg-stone-950 text-stone-100 border-b border-stone-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <Badge variant="gold">Official Profile & Direct Collaboration</Badge>
          <h3 className="text-2xl font-serif text-white">
            Connect with Our Studio Today
          </h3>
          <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed">
            Sanrachana Design Studio welcomes clients seeking high-touch architectural design, residential transformations, and 3D visualization. Explore our official social portfolio on Instagram <a href={siteConfig.instagram.url} target="_blank" rel="noopener noreferrer" className="text-[#C5A880] underline font-medium">{siteConfig.instagram.handle}</a> or schedule a discovery meeting.
          </p>
          <div className="pt-4 flex justify-center gap-4">
            <Button variant="gold" size="md" href="/contact">
              Schedule Studio Consultation
            </Button>
            <Button variant="outline" size="md" href="/portfolio" className="border-stone-700 text-stone-300">
              View Portfolio
            </Button>
          </div>
        </div>
      </section>

      <ConsultationCTA />
    </main>
  );
}
