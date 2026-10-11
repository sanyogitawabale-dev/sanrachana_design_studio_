import React from "react";
import { Info, ExternalLink } from "lucide-react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export interface VerifiedNoticeProps {
  className?: string;
  variant?: "banner" | "compact" | "card";
}

export function VerifiedNotice({ className, variant = "banner" }: VerifiedNoticeProps) {
  if (variant === "compact") {
    return (
      <div
        className={cn(
          "inline-flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400 bg-stone-100 dark:bg-stone-800/80 px-3 py-1.5 rounded-full border border-stone-200 dark:border-stone-700",
          className
        )}
      >
        <Info className="w-3.5 h-3.5 text-[#C5A880] shrink-0" />
        <span>Portfolio demonstration concepts • Genuine client work featured on</span>
        <a
          href={siteConfig.instagram.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#C5A880] hover:underline font-medium inline-flex items-center gap-1"
        >
          {siteConfig.instagram.handle}
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "p-4 sm:p-5 bg-stone-100/90 dark:bg-stone-900/90 border border-stone-200 dark:border-stone-800 rounded-sm text-sm text-stone-600 dark:text-stone-300 flex items-start gap-3.5 shadow-sm",
        className
      )}
    >
      <div className="p-1.5 rounded-full bg-[#C5A880]/15 text-[#C5A880] shrink-0 mt-0.5">
        <Info className="w-4 h-4" />
      </div>
      <div className="flex-1 space-y-1">
        <div className="font-medium text-stone-900 dark:text-stone-100 flex flex-wrap items-center gap-2">
          <span>Studio Portfolio Transparency & Live Feed</span>
          <span className="text-xs bg-[#C5A880]/20 text-[#8f6d3f] dark:text-[#E0C7A6] px-2 py-0.5 rounded-full font-mono uppercase">
            Official Reference
          </span>
        </div>
        <p className="text-xs sm:text-sm leading-relaxed text-stone-600 dark:text-stone-400">
          {siteConfig.demonstrationNotice} For ongoing project blueprints and live on-site reels, visit our official Instagram profile at{" "}
          <a
            href={siteConfig.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#C5A880] font-semibold hover:underline inline-flex items-center gap-1"
          >
            {siteConfig.instagram.handle}
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          .
        </p>
      </div>
    </div>
  );
}
