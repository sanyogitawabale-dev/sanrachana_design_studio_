"use client";

import React, { useState } from "react";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { InstagramIcon } from "@/components/ui/Icons";
import { Play, ArrowUpRight, Film, Sparkles, X, ExternalLink } from "lucide-react";

export interface InstagramReelItem {
  id: string;
  title: string;
  category: string;
  coverImage: string;
  videoUrl?: string;
  reelUrl: string;
  viewsCount?: string;
  duration?: string;
  description: string;
}

const studioReels: InstagramReelItem[] = [
  {
    id: "reel-1",
    title: "Contemporary Villa Facade Walkthrough",
    category: "Architecture Reel",
    coverImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    reelUrl: "https://www.instagram.com/sanrachana_design_studio_/",
    viewsCount: "1.8k Views",
    duration: "0:45",
    description: "Full exterior elevation pan, stone cladding details, cantilevered pergolas, and twilight ambient lighting.",
  },
  {
    id: "reel-2",
    title: "Luxury Penthouse Living & Gourmet Island",
    category: "Interior Walkthrough",
    coverImage: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80",
    reelUrl: "https://www.instagram.com/sanrachana_design_studio_/",
    viewsCount: "2.4k Views",
    duration: "0:52",
    description: "Calacatta marble island, concealed LED cove transitions, and custom walnut fluted wall paneling.",
  },
  {
    id: "reel-3",
    title: "Site Transformation: Raw Demolition to Finish",
    category: "Transformation Reel",
    coverImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
    reelUrl: "https://www.instagram.com/sanrachana_design_studio_/",
    viewsCount: "3.1k Views",
    duration: "0:38",
    description: "Step-by-step on-site execution recap from bare RCC framework to bespoke residential handover.",
  },
  {
    id: "reel-4",
    title: "Master Suite & Fluted Glass Partition",
    category: "Spatial Detail",
    coverImage: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80",
    reelUrl: "https://www.instagram.com/sanrachana_design_studio_/",
    viewsCount: "1.5k Views",
    duration: "0:30",
    description: "Acoustic spatial zoning, brass detailing, and moodboard alignment for private sanctuary living.",
  },
];

export function InstagramReelsSection() {
  const [activeVideo, setActiveVideo] = useState<InstagramReelItem | null>(null);

  return (
    <section className="py-20 sm:py-28 bg-stone-950 text-stone-100 border-b border-stone-800 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <SectionHeader
              dark
              align="left"
              badge="Instagram Reels & Video Walkthroughs"
              devanagariSubtitle="वीडियो और रील्स के माध्यम से हमारी कला देखें"
              title="Cinematic Site Walkthroughs & Design Reels"
              description="Explore real video reels, on-site construction updates, material finishes, and 3D architectural walk-throughs directly from our official Instagram profile."
              className="mb-0"
            />
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <Button
              variant="gold"
              size="md"
              href={siteConfig.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              leftIcon={<InstagramIcon className="w-4 h-4" />}
              rightIcon={<ArrowUpRight className="w-4 h-4" />}
            >
              Watch on Instagram {siteConfig.instagram.handle}
            </Button>
          </div>
        </div>

        {/* Reels Video Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {studioReels.map((reel) => (
            <div
              key={reel.id}
              className="group relative flex flex-col bg-stone-900 border border-stone-800 rounded-sm overflow-hidden hover:border-[#C5A880] transition-all duration-300 hover:shadow-2xl"
            >
              {/* Video Thumbnail with 9:16 vertical Reel Aspect Ratio */}
              <div className="relative aspect-[9/14] w-full overflow-hidden bg-stone-950" style={{ position: "relative" }}>
                <Image
                  src={reel.coverImage}
                  alt={reel.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-90 group-hover:brightness-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                {/* Top Badges */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                  <Badge variant="dark" size="sm" className="bg-black/75 backdrop-blur-sm border-stone-700 text-[10px]">
                    <Film className="w-3 h-3 text-[#C5A880] mr-1" />
                    {reel.category}
                  </Badge>
                  {reel.duration && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-sm bg-black/80 text-stone-300 border border-stone-800 backdrop-blur-sm">
                      {reel.duration}
                    </span>
                  )}
                </div>

                {/* Center Play Button Overlay */}
                <a
                  href={reel.reelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 z-20 flex flex-col items-center justify-center cursor-pointer"
                  aria-label={`Watch ${reel.title} on Instagram`}
                >
                  <div className="w-14 h-14 rounded-full bg-[#C5A880]/90 text-stone-950 flex items-center justify-center shadow-[0_0_25px_rgba(197,168,128,0.5)] group-hover:scale-115 group-hover:bg-[#E0C7A6] transition-all duration-300">
                    <Play className="w-6 h-6 fill-stone-950 translate-x-0.5" />
                  </div>
                  <span className="mt-3 text-xs font-semibold uppercase tracking-wider text-white drop-shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
                    Play Reel on IG →
                  </span>
                </a>

                {/* Bottom View Count */}
                {reel.viewsCount && (
                  <div className="absolute bottom-3 left-3 z-10 text-[11px] font-mono text-stone-300 bg-black/70 px-2 py-0.5 rounded-sm backdrop-blur-sm border border-stone-800">
                    {reel.viewsCount}
                  </div>
                )}
              </div>

              {/* Reel Information */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between bg-stone-900/90">
                <div>
                  <h4 className="text-base font-serif font-normal text-white group-hover:text-[#C5A880] transition-colors leading-snug">
                    {reel.title}
                  </h4>
                  <p className="mt-2 text-xs text-stone-400 font-light leading-relaxed line-clamp-2">
                    {reel.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-800/80 flex items-center justify-between">
                  <a
                    href={reel.reelUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-[#C5A880] hover:text-[#E0C7A6] font-medium transition-colors"
                  >
                    <InstagramIcon className="w-3.5 h-3.5" />
                    <span>Open in Instagram</span>
                    <ExternalLink className="w-3 h-3 opacity-60" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Video Upload / IG Link Integration Banner */}
        <div className="p-6 rounded-sm bg-stone-900/70 border border-stone-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-300">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-sm bg-stone-950 border border-stone-800 text-[#C5A880]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="font-medium text-white">Live Instagram Reels Synchronized</span>
              <p className="text-stone-400 font-light mt-0.5">
                All video walkthroughs and transformation reels link directly to the studio's official posts on{" "}
                <strong className="text-[#E0C7A6] font-mono">{siteConfig.instagram.handle}</strong>.
              </p>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            href={siteConfig.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            rightIcon={<ArrowUpRight className="w-3.5 h-3.5" />}
            className="text-stone-200 border-stone-700 shrink-0"
          >
            Visit Official Profile
          </Button>
        </div>
      </div>
    </section>
  );
}
