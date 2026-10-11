import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

export interface PageHeroProps {
  title: string;
  devanagariSubtitle?: string;
  badge?: string;
  description: string;
  breadcrumbs?: { label: string; href: string }[];
  className?: string;
}

export function PageHero({
  title,
  devanagariSubtitle,
  badge,
  description,
  breadcrumbs = [{ label: "Home", href: "/" }],
  className,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        "relative pt-32 pb-16 sm:pt-40 sm:pb-24 bg-stone-950 text-stone-100 overflow-hidden border-b border-stone-800",
        className
      )}
    >
      {/* Background Architectural Grid Accent */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]"
        aria-hidden="true"
      />
      <div
        className="absolute -top-32 right-10 w-96 h-96 bg-[#C5A880]/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-xs tracking-wider uppercase text-stone-400">
            {breadcrumbs.map((crumb, idx) => (
              <li key={crumb.href} className="flex items-center gap-2">
                <Link
                  href={crumb.href}
                  className="hover:text-[#C5A880] transition-colors"
                >
                  {crumb.label}
                </Link>
                {idx < breadcrumbs.length && (
                  <ChevronRight className="w-3.5 h-3.5 text-stone-600" />
                )}
              </li>
            ))}
            <li className="text-[#C5A880] font-medium" aria-current="page">
              {title}
            </li>
          </ol>
        </nav>

        {/* Badges & Devanagari touch */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          {badge && <Badge variant="gold">{badge}</Badge>}
          {devanagariSubtitle && (
            <span className="text-xs tracking-[0.25em] text-[#C5A880] font-medium uppercase font-serif">
              {devanagariSubtitle}
            </span>
          )}
        </div>

        {/* Main Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-normal tracking-tight text-white max-w-4xl leading-tight">
          {title}
        </h1>

        {/* Subtitle / Description */}
        <p className="mt-5 text-base sm:text-lg text-stone-300 max-w-2xl font-light leading-relaxed">
          {description}
        </p>
      </div>
    </section>
  );
}
