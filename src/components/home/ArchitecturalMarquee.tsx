"use client";

import React from "react";
import { Sparkles, Compass } from "lucide-react";
import { siteConfig } from "@/config/site";

const marqueeItems = [
  "संरचना Design Studio",
  "Bespoke Residential Architecture",
  "Luxury Interior Planning",
  "3D Elevation & Twilight Simulation",
  "Vastu Spatial Harmonization",
  "Turnkey Execution & BOQ",
  "Italian Travertine & Microcement",
  "Fluted Timber Louvers & Bronze Detailing",
  "@sanrachana_design_studio_",
];

export function ArchitecturalMarquee() {
  return (
    <div className="w-full bg-stone-950 border-y border-stone-800/80 py-4 overflow-hidden select-none">
      <div className="flex w-max animate-marquee">
        {/* First track */}
        <div className="flex items-center gap-8 px-4">
          {marqueeItems.map((item, idx) => (
            <div key={`track1-${idx}`} className="flex items-center gap-4 text-xs tracking-[0.25em] uppercase font-light text-stone-400 whitespace-nowrap">
              <span className={item.includes("संरचना") || item.includes("@") ? "text-[#E0C7A6] font-medium" : "text-stone-300"}>
                {item}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]/60 inline-block" />
            </div>
          ))}
        </div>

        {/* Duplicate track for seamless infinite scroll */}
        <div className="flex items-center gap-8 px-4" aria-hidden="true">
          {marqueeItems.map((item, idx) => (
            <div key={`track2-${idx}`} className="flex items-center gap-4 text-xs tracking-[0.25em] uppercase font-light text-stone-400 whitespace-nowrap">
              <span className={item.includes("संरचना") || item.includes("@") ? "text-[#E0C7A6] font-medium" : "text-stone-300"}>
                {item}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]/60 inline-block" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
