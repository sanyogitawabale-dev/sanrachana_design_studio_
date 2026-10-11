import React from "react";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { ArrowUpRight } from "lucide-react";
import { InstagramIcon } from "@/components/ui/Icons";

export function InstagramShowcase() {
  const instagramGrid = [
    {
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80",
      caption: "Executive Cabin Interior • Acoustic Fluted Oak & Lighting (Kalwa, Thane)",
      category: "Cabin Interior",
    },
    {
      image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=600&q=80",
      caption: "Boutique Jewellery Showroom • Glass Showcases & Spotlighting",
      category: "Jewellery Retail",
    },
    {
      image: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=600&q=80",
      caption: "Open Dining Suite • Statuario Marble & Brass-framed Partition",
      category: "Dining Interior",
    },
    {
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80",
      caption: "The Monolith Villa • 3D Facade Elevation & Landscape",
      category: "Villa Facade",
    },
    {
      image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=600&q=80",
      caption: "Penthouse Living Lounge • Neutral Micro-cement & Fluted Teak",
      category: "Luxury Living",
    },
    {
      image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=600&q=80",
      caption: "Master Bedroom Suite • Ambient Pendants & Acoustic Bedhead",
      category: "Master Suite",
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-stone-950 text-stone-100 border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <SectionHeader
              dark
              align="left"
              badge="Studio Instagram Post Highlights"
              devanagariSubtitle="इंस्टाग्राम पर हमारे प्रोजेक्ट्स देखें"
              title="Actual Project Posts & Spatial Highlights"
              description="Curated highlights of executive cabin interiors, boutique jewellery showrooms, residential dining suites, and architectural facade studies from our official profile."
              className="mb-0"
            />
          </div>

          <div className="shrink-0">
            <Button
              variant="gold"
              size="md"
              href={siteConfig.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              leftIcon={<InstagramIcon className="w-4 h-4" />}
              rightIcon={<ArrowUpRight className="w-4 h-4" />}
            >
              Follow {siteConfig.instagram.handle}
            </Button>
          </div>
        </div>

        {/* Instagram Photo Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-8">
          {instagramGrid.map((item, index) => (
            <a
              key={index}
              href={siteConfig.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-sm overflow-hidden bg-stone-900 border border-stone-800 hover:border-[#C5A880] transition-all duration-300 block"
              style={{ position: "relative" }}
              aria-label={`View post on Instagram: ${item.caption}`}
            >
              <Image
                src={item.image}
                alt={item.caption}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-stone-950/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-3 text-center">
                <InstagramIcon className="w-6 h-6 text-[#C5A880] mb-2" />
                <span className="text-[10px] text-[#E0C7A6] font-semibold uppercase tracking-wider mb-1">
                  {item.category}
                </span>
                <span className="text-[10px] text-stone-200 line-clamp-3 leading-tight font-light">
                  {item.caption}
                </span>
                <span className="mt-2 text-[9px] uppercase tracking-wider text-[#C5A880] font-mono font-semibold">
                  Open Post →
                </span>
              </div>
            </a>
          ))}
        </div>

        <div className="p-4 rounded-sm bg-stone-900/60 border border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-400">
          <div className="flex items-center gap-2">
            <InstagramIcon className="w-4 h-4 text-[#C5A880]" />
            <span>
              Official Instagram Feed:{" "}
              <strong className="text-white font-mono">{siteConfig.instagram.handle}</strong>
            </span>
          </div>
          <span className="font-light text-stone-400">
            Specializing in Cabin Interiors, Jewellery Showrooms, Dining Spaces & 3D Elevations
          </span>
        </div>
      </div>
    </section>
  );
}
