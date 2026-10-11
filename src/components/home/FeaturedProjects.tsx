"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { portfolioProjects } from "@/data/portfolio";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { VerifiedNotice } from "@/components/common/VerifiedNotice";
import { BeforeAfterSlider } from "@/components/portfolio/BeforeAfterSlider";
import { ArrowRight, MapPin, Maximize2, Sparkles, SlidersHorizontal } from "lucide-react";

export function FeaturedProjects() {
  const featured = portfolioProjects.filter((p) => p.featured).slice(0, 4);
  const featuredTransformation = portfolioProjects.find((p) => p.beforeAfter);

  return (
    <section className="py-20 sm:py-28 bg-stone-900 text-stone-100 border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          dark
          badge="Featured Works"
          devanagariSubtitle="चयनित वास्तुशिल्प परियोजनाएं"
          title="Architectural Forms & Sensory Living Spaces"
          description="A curated preview of contemporary bungalows, luxury apartments, and photorealistic 3D visualization concepts."
        />

        {/* Demonstration Notice */}
        <div className="mb-10">
          <VerifiedNotice variant="compact" />
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {featured.map((project) => (
            <div
              key={project.id}
              className="group relative flex flex-col bg-stone-950 border border-stone-800 rounded-sm overflow-hidden hover:border-[#C5A880]/70 transition-all duration-300 hover:shadow-2xl"
            >
              {/* Image Container */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-900" style={{ position: "relative" }}>
                <Image
                  src={project.coverImage}
                  alt={`${project.title} - ${project.categoryLabel}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/30 to-transparent" />

                {/* Badges on Image */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  <Badge variant="dark" size="sm" className="bg-black/70 backdrop-blur-sm border-stone-700">
                    {project.categoryLabel}
                  </Badge>
                  {project.beforeAfter && (
                    <Badge variant="gold" size="sm" className="bg-[#C5A880]/20 text-[#E0C7A6] backdrop-blur-sm border-[#C5A880]/50 flex items-center gap-1">
                      <SlidersHorizontal className="w-3 h-3" />
                      <span>Transformation</span>
                    </Badge>
                  )}
                </div>

                {/* Area Tag */}
                {project.area && (
                  <div className="absolute bottom-4 right-4 text-xs font-mono px-2.5 py-1 bg-black/80 backdrop-blur-sm rounded-sm text-stone-300 border border-stone-800">
                    {project.area}
                  </div>
                )}
              </div>

              {/* Card Details */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-stone-400 mb-2">
                    <span className="flex items-center gap-1 font-light">
                      <MapPin className="w-3.5 h-3.5 text-[#C5A880]" />
                      {project.location || "Custom Site"}
                    </span>
                    <span className="font-mono text-stone-500">{project.year}</span>
                  </div>

                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="text-xl sm:text-2xl font-serif font-normal text-white group-hover:text-[#C5A880] transition-colors">
                      {project.title}
                    </h3>
                    {project.hindiTitle && (
                      <span className="text-xs text-[#E0C7A6] font-serif font-light shrink-0">
                        {project.hindiTitle}
                      </span>
                    )}
                  </div>

                  <p className="text-xs uppercase tracking-wider text-[#C5A880] font-medium mt-1">
                    {project.tagline}
                  </p>

                  <p className="mt-3 text-sm text-stone-300 font-light leading-relaxed">
                    {project.description}
                  </p>

                  {/* Scope Badges */}
                  {project.scope && (
                    <div className="mt-4 flex flex-wrap gap-1.5 pt-3 border-t border-stone-800/80">
                      {project.scope.map((s, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] px-2 py-0.5 rounded-sm bg-stone-900 text-stone-300 border border-stone-800"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-4 border-t border-stone-800/80 flex items-center justify-between">
                  <Link
                    href={`/portfolio`}
                    className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-[#C5A880] hover:text-[#E0C7A6] transition-colors group-hover:translate-x-1"
                  >
                    <span>View in Gallery</span>
                    <Maximize2 className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Before & After Spotlight on Home */}
        {featuredTransformation && featuredTransformation.beforeAfter && (
          <div className="mb-14 p-6 sm:p-10 bg-stone-950 border border-stone-800 rounded-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-stone-800/80">
              <div>
                <div className="flex items-center gap-2 text-[#C5A880] mb-1">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-xs uppercase tracking-widest font-semibold">Interactive Studio Craft</span>
                </div>
                <h3 className="text-2xl font-serif text-white">
                  Site Transformation: {featuredTransformation.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-400 font-light mt-0.5">
                  Drag the interactive slider to compare the raw site shell with our finished execution.
                </p>
              </div>

              <Button
                variant="outline"
                size="sm"
                href="/portfolio"
                className="text-stone-300 border-stone-700 self-start md:self-auto"
              >
                All Transformations →
              </Button>
            </div>

            <BeforeAfterSlider
              beforeImage={featuredTransformation.beforeAfter.beforeImage}
              afterImage={featuredTransformation.beforeAfter.afterImage}
              beforeLabel={featuredTransformation.beforeAfter.beforeLabel}
              afterLabel={featuredTransformation.beforeAfter.afterLabel}
              title={featuredTransformation.beforeAfter.title}
              aspectRatio="16/10"
              className="max-w-4xl mx-auto shadow-2xl"
            />
          </div>
        )}

        {/* Callout Button */}
        <div className="text-center">
          <Button
            variant="gold"
            size="lg"
            href="/portfolio"
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Explore Complete Portfolio Gallery
          </Button>
        </div>
      </div>
    </section>
  );
}
