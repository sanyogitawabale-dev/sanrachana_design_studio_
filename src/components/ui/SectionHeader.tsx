import React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "./Badge";

export interface SectionHeaderProps {
  badge?: string;
  devanagariSubtitle?: string;
  title: string;
  description?: string;
  align?: "left" | "center" | "right";
  className?: string;
  dark?: boolean;
}

export function SectionHeader({
  badge,
  devanagariSubtitle,
  title,
  description,
  align = "center",
  className,
  dark = false,
}: SectionHeaderProps) {
  const alignmentStyles = {
    left: "text-left items-start",
    center: "text-center items-center mx-auto",
    right: "text-right items-end ml-auto",
  };

  return (
    <div
      className={cn(
        "flex flex-col max-w-3xl mb-12 sm:mb-16",
        alignmentStyles[align],
        className
      )}
    >
      {badge && (
        <Badge
          variant={dark ? "gold" : "stone"}
          className="mb-3.5"
        >
          {badge}
        </Badge>
      )}

      {devanagariSubtitle && (
        <span className="text-xs uppercase tracking-[0.25em] text-[#C5A880] font-semibold mb-2">
          {devanagariSubtitle}
        </span>
      )}

      <h2
        className={cn(
          "text-2xl sm:text-3xl md:text-4xl font-serif font-normal tracking-tight leading-tight",
          dark ? "text-stone-50" : "text-stone-900 dark:text-stone-50"
        )}
      >
        {title}
      </h2>

      {description && (
        <p
          className={cn(
            "mt-4 text-base sm:text-lg leading-relaxed font-light",
            dark ? "text-stone-300" : "text-stone-600 dark:text-stone-300"
          )}
        >
          {description}
        </p>
      )}

      <div
        className={cn(
          "w-12 h-[2px] bg-[#C5A880] mt-6",
          align === "center" && "mx-auto",
          align === "right" && "ml-auto"
        )}
        aria-hidden="true"
      />
    </div>
  );
}
