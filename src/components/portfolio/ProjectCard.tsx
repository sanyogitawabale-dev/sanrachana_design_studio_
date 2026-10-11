"use client";

import React from "react";
import Image from "next/image";
import { Project } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { MapPin, Maximize2, SlidersHorizontal, Sparkles } from "lucide-react";
import { InstagramIcon } from "@/components/ui/Icons";

export interface ProjectCardProps {
  project: Project;
  onOpenLightbox: (project: Project) => void;
}

export function ProjectCard({ project, onOpenLightbox }: ProjectCardProps) {
  return (
    <div
      onClick={() => onOpenLightbox(project)}
      className="group cursor-pointer flex flex-col bg-stone-900/90 border border-stone-800 rounded-sm overflow-hidden hover:border-[#C5A880] transition-all duration-300 hover:shadow-2xl text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880]"
      tabIndex={0}
      role="button"
      aria-label={`View project details for ${project.title}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpenLightbox(project);
        }
      }}
    >
      {/* Cover Image Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-950" style={{ position: "relative" }}>
        <Image
          src={project.coverImage}
          alt={`${project.title} - ${project.categoryLabel}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-transparent to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

        {/* Category Badges & Indicators */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          <Badge variant="dark" size="sm" className="bg-black/75 backdrop-blur-sm border-stone-700">
            {project.categoryLabel}
          </Badge>
          {project.beforeAfter && (
            <Badge variant="gold" size="sm" className="bg-[#C5A880]/20 text-[#E0C7A6] backdrop-blur-sm border-[#C5A880]/50 flex items-center gap-1">
              <SlidersHorizontal className="w-3 h-3" />
              <span>Before/After</span>
            </Badge>
          )}
        </div>

        {/* Instagram Indicator & Expand */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
          {project.instagramPostUrl && (
            <span className="p-1 rounded-sm bg-black/60 backdrop-blur-sm border border-stone-700 text-stone-300">
              <InstagramIcon className="w-3.5 h-3.5 text-pink-400" />
            </span>
          )}
        </div>

        {/* Bottom Tag */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1.5 z-10">
          {project.area && (
            <span className="text-[11px] font-mono px-2 py-0.5 bg-black/80 backdrop-blur-sm rounded-sm text-stone-300 border border-stone-800">
              {project.area}
            </span>
          )}
          <span className="p-1 rounded-sm bg-[#C5A880] text-stone-950 group-hover:scale-110 transition-transform shadow-md">
            <Maximize2 className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs text-stone-400 mb-2">
            <span className="flex items-center gap-1 font-light">
              <MapPin className="w-3.5 h-3.5 text-[#C5A880]" />
              {project.location || "Custom Site"}
            </span>
            <span className="font-mono text-stone-500">{project.year}</span>
          </div>

          <div className="flex items-baseline justify-between gap-2">
            <h3 className="text-lg sm:text-xl font-serif font-normal text-white group-hover:text-[#C5A880] transition-colors">
              {project.title}
            </h3>
            {project.hindiTitle && (
              <span className="text-xs text-stone-400 font-serif font-light shrink-0">
                {project.hindiTitle}
              </span>
            )}
          </div>

          <p className="text-xs uppercase tracking-wider text-[#C5A880] font-medium mt-1">
            {project.tagline}
          </p>

          <p className="mt-2.5 text-xs sm:text-sm text-stone-300 font-light leading-relaxed line-clamp-2">
            {project.description}
          </p>
        </div>

        {/* Scope tags */}
        {project.scope && (
          <div className="mt-4 pt-3 border-t border-stone-800/80 flex flex-wrap gap-1">
            {project.scope.slice(0, 3).map((item, i) => (
              <span
                key={i}
                className="text-[10px] px-2 py-0.5 rounded-sm bg-stone-950 text-stone-400 border border-stone-800"
              >
                {item}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
