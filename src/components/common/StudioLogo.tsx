"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";

export interface StudioLogoProps {
  variant?: "full" | "mark" | "compact" | "stacked" | "watermark";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  showTagline?: boolean;
}

/**
 * Bespoke Architectural Logo for संरचना Design Studio
 * Inspired by architectural spatial composition, drafting grids, and Devanagari calligraphy.
 */
export function StudioLogo({
  variant = "compact",
  size = "md",
  className = "",
  showTagline = true,
}: StudioLogoProps) {
  // Mark Sizing
  const markSize =
    size === "sm"
      ? "w-8 h-8"
      : size === "md"
      ? "w-10 h-10"
      : size === "lg"
      ? "w-16 h-16"
      : "w-24 h-24";

  // Text sizes
  const titleSize =
    size === "sm"
      ? "text-base"
      : size === "md"
      ? "text-lg sm:text-xl"
      : size === "lg"
      ? "text-2xl sm:text-3xl"
      : "text-4xl sm:text-5xl";

  const devanagariSize =
    size === "sm"
      ? "text-[10px]"
      : size === "md"
      ? "text-xs"
      : size === "lg"
      ? "text-sm"
      : "text-base";

  // The SVG Architectural Emblem (Architectural drafting grid + Devanagari spatial composition)
  const LogoMark = (
    <div
      className={cn(
        "relative rounded-sm flex items-center justify-center bg-stone-950 border border-[#C5A880]/60 p-1.5 shadow-md group-hover:border-[#E0C7A6] transition-colors shrink-0",
        markSize
      )}
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full text-[#C5A880]"
      >
        {/* Outer Architectural Framing Grid */}
        <rect
          x="6"
          y="6"
          width="88"
          height="88"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="4 4"
          className="opacity-40"
        />
        {/* Cantilevered Spatial Planes */}
        <rect
          x="18"
          y="18"
          width="64"
          height="64"
          stroke="#E0C7A6"
          strokeWidth="2.5"
          className="opacity-80"
        />
        <line x1="18" y1="50" x2="82" y2="50" stroke="#C5A880" strokeWidth="1.5" className="opacity-50" />
        <line x1="50" y1="18" x2="50" y2="82" stroke="#C5A880" strokeWidth="1.5" className="opacity-50" />

        {/* Central Devanagari Monogram Craft: 'सं' */}
        <text
          x="50"
          y="59"
          textAnchor="middle"
          dominantBaseline="central"
          fill="#F4EFE6"
          fontSize="36"
          fontFamily="Cinzel, Georgia, serif"
          fontWeight="bold"
          letterSpacing="1"
        >
          सं
        </text>

        {/* Golden Ratio Dot Marker */}
        <circle cx="50" cy="27" r="3.5" fill="#E0C7A6" />
      </svg>
    </div>
  );

  if (variant === "mark") {
    return <div className={cn("inline-flex", className)}>{LogoMark}</div>;
  }

  if (variant === "stacked") {
    return (
      <div className={cn("flex flex-col items-center text-center gap-3", className)}>
        {LogoMark}
        <div className="flex flex-col items-center">
          <span className="text-xl sm:text-2xl font-serif text-[#E0C7A6] font-medium tracking-wide">
            {siteConfig.devanagariName}
          </span>
          <span className="text-xs uppercase tracking-[0.3em] text-stone-300 font-light mt-1">
            Architecture & Interior Design
          </span>
        </div>
      </div>
    );
  }

  // Default / Compact navbar layout
  return (
    <div className={cn("flex items-center gap-3", className)}>
      {LogoMark}
      <div className="flex flex-col leading-tight">
        <div className="flex items-baseline gap-1.5">
          <span className={cn("font-serif font-normal tracking-wide text-white group-hover:text-[#E0C7A6] transition-colors", titleSize)}>
            Sanrachana
          </span>
          <span className="text-xs uppercase tracking-widest text-[#C5A880] font-light hidden sm:inline">
            Studio
          </span>
        </div>
        <span className={cn("tracking-[0.2em] text-[#E0C7A6] uppercase font-serif font-light", devanagariSize)}>
          {siteConfig.devanagariName}
        </span>
      </div>
    </div>
  );
}
