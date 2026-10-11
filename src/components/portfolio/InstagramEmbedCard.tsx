"use client";

import React, { useState } from "react";
import Image from "next/image";
import { InstagramIcon } from "@/components/ui/Icons";
import { ExternalLink, Film, Play, Sparkles, MessageSquare } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

export interface InstagramEmbedCardProps {
  postUrl: string;
  title: string;
  caption: string;
  coverImage: string;
  categoryLabel: string;
  mediaType?: "image" | "carousel" | "reel" | "video";
  area?: string;
  location?: string;
  className?: string;
}

export function InstagramEmbedCard({
  postUrl,
  title,
  caption,
  coverImage,
  categoryLabel,
  mediaType = "image",
  area,
  location,
  className = "",
}: InstagramEmbedCardProps) {
  const [showEmbed, setShowEmbed] = useState(false);

  // Derive Instagram embed URL if specific post ID is provided
  const getEmbedUrl = (url: string) => {
    if (url.includes("/p/") || url.includes("/reel/")) {
      const clean = url.split("?")[0].replace(/\/$/, "");
      return `${clean}/embed`;
    }
    return "";
  };

  const embedUrl = getEmbedUrl(postUrl);

  return (
    <div
      className={`group flex flex-col bg-stone-900 border border-stone-800 rounded-sm overflow-hidden hover:border-[#C5A880] transition-all duration-300 hover:shadow-2xl ${className}`}
    >
      {/* Media Box */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-950" style={{ position: "relative" }}>
        {showEmbed && embedUrl ? (
          <iframe
            src={embedUrl}
            className="w-full h-full border-0"
            title={`Instagram Post: ${title}`}
            allowTransparency={true}
            allow="encrypted-media"
          />
        ) : (
          <>
            <Image
              src={coverImage}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
              <Badge variant="dark" size="sm" className="bg-black/80 backdrop-blur-sm border-stone-700 text-[10px]">
                {mediaType === "reel" ? <Film className="w-3 h-3 text-[#C5A880] mr-1" /> : null}
                {categoryLabel}
              </Badge>
              <Badge variant="gold" size="sm" className="bg-black/60 backdrop-blur-sm border-[#C5A880]/50 text-[10px]">
                Verified Studio Post
              </Badge>
            </div>

            {/* Quick Instagram Icon Badge */}
            <div className="absolute top-3 right-3 z-10">
              <a
                href={postUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-sm bg-black/70 backdrop-blur-sm border border-stone-700 text-stone-200 hover:text-pink-400 transition-colors inline-block"
                aria-label="View on Instagram"
              >
                <InstagramIcon className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Bottom Meta */}
            {(area || location) && (
              <div className="absolute bottom-3 left-3 z-10 flex items-center gap-2 text-[11px] font-mono text-stone-300">
                {location && (
                  <span className="px-2 py-0.5 bg-black/80 rounded-sm backdrop-blur-sm border border-stone-800">
                    {location}
                  </span>
                )}
                {area && (
                  <span className="px-2 py-0.5 bg-black/80 rounded-sm backdrop-blur-sm border border-stone-800">
                    {area}
                  </span>
                )}
              </div>
            )}
          </>
        )}
      </div>

      {/* Content & Caption */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-serif font-normal text-white group-hover:text-[#C5A880] transition-colors mb-2">
            {title}
          </h3>

          <p className="text-xs text-stone-300 font-light leading-relaxed line-clamp-3">
            {caption}
          </p>
        </div>

        <div className="mt-5 pt-3 border-t border-stone-800/80 flex items-center justify-between">
          <a
            href={postUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-[#C5A880] hover:text-[#E0C7A6] font-medium transition-colors"
          >
            <InstagramIcon className="w-3.5 h-3.5" />
            <span>View on Instagram</span>
            <ExternalLink className="w-3 h-3 opacity-60" />
          </a>

          {embedUrl && (
            <button
              onClick={() => setShowEmbed(!showEmbed)}
              className="text-[11px] font-mono text-stone-400 hover:text-stone-200 underline"
            >
              {showEmbed ? "Hide Embed" : "Load Live Embed"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
