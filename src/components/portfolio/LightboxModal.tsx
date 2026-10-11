"use client";

import React, { useEffect, useCallback, useState } from "react";
import Image from "next/image";
import { Project } from "@/types";
import { X, ChevronLeft, ChevronRight, MapPin, Calendar, ExternalLink, Sparkles, SlidersHorizontal, Layers } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { siteConfig, hasWhatsApp, getWhatsAppUrl } from "@/config/site";
import { InstagramIcon } from "@/components/ui/Icons";
import { BeforeAfterSlider } from "./BeforeAfterSlider";

export interface LightboxModalProps {
  project: Project | null;
  activeImageIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onSelectImage: (index: number) => void;
}

export function LightboxModal({
  project,
  activeImageIndex,
  isOpen,
  onClose,
  onSelectImage,
}: LightboxModalProps) {
  const [viewMode, setViewMode] = useState<"gallery" | "beforeAfter">("gallery");

  // Reset view mode when project changes
  useEffect(() => {
    setViewMode("gallery");
  }, [project]);

  const images = project?.galleryImages || (project ? [project.coverImage] : []);

  const handleNext = useCallback(() => {
    if (images.length <= 1) return;
    onSelectImage((activeImageIndex + 1) % images.length);
  }, [activeImageIndex, images.length, onSelectImage]);

  const handlePrev = useCallback(() => {
    if (images.length <= 1) return;
    onSelectImage((activeImageIndex - 1 + images.length) % images.length);
  }, [activeImageIndex, images.length, onSelectImage]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && viewMode === "gallery") handleNext();
      if (e.key === "ArrowLeft" && viewMode === "gallery") handlePrev();
    };

    document.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose, handleNext, handlePrev, viewMode]);

  if (!isOpen || !project) return null;

  const currentImage = images[activeImageIndex] || project.coverImage;
  const whatsAppAvailable = hasWhatsApp();
  const instagramUrl = project.instagramPostUrl || siteConfig.instagram.url;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/95 backdrop-blur-md p-2 sm:p-4 md:p-6 transition-all duration-300 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label={`Project Lightbox - ${project.title}`}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="fixed top-4 right-4 z-50 p-2.5 rounded-full bg-stone-900/85 text-stone-300 hover:text-white hover:bg-stone-800 transition-colors border border-stone-700 shadow-xl"
        aria-label="Close lightbox"
      >
        <X className="w-6 h-6" />
      </button>

      <div className="relative w-full max-w-6xl max-h-[94vh] flex flex-col bg-stone-950 border border-stone-800 rounded-sm overflow-hidden shadow-2xl my-auto">
        {/* Mode Toggle Toolbar (Gallery vs Before/After) */}
        {project.beforeAfter && (
          <div className="bg-stone-900 px-6 py-2.5 border-b border-stone-800 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-stone-300">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
              <span className="font-medium">Interactive Transformation Available</span>
            </div>

            <div className="flex items-center gap-1 bg-stone-950 p-1 rounded-sm border border-stone-800">
              <button
                onClick={() => setViewMode("gallery")}
                className={`px-3 py-1 text-xs rounded-sm transition-all flex items-center gap-1.5 ${
                  viewMode === "gallery"
                    ? "bg-[#C5A880] text-stone-950 font-semibold"
                    : "text-stone-400 hover:text-stone-200"
                }`}
              >
                <Layers className="w-3 h-3" />
                <span>Gallery View ({images.length})</span>
              </button>
              <button
                onClick={() => setViewMode("beforeAfter")}
                className={`px-3 py-1 text-xs rounded-sm transition-all flex items-center gap-1.5 ${
                  viewMode === "beforeAfter"
                    ? "bg-[#C5A880] text-stone-950 font-semibold"
                    : "text-stone-400 hover:text-stone-200"
                }`}
              >
                <SlidersHorizontal className="w-3 h-3" />
                <span>Before & After Slider</span>
              </button>
            </div>
          </div>
        )}

        {/* Main Display Area */}
        <div className="relative flex-1 min-h-[380px] sm:min-h-[500px] bg-black flex items-center justify-center overflow-hidden" style={{ position: "relative" }}>
          {viewMode === "beforeAfter" && project.beforeAfter ? (
            <div className="w-full h-full p-4 sm:p-8 flex items-center justify-center">
              <BeforeAfterSlider
                beforeImage={project.beforeAfter.beforeImage}
                afterImage={project.beforeAfter.afterImage}
                beforeLabel={project.beforeAfter.beforeLabel}
                afterLabel={project.beforeAfter.afterLabel}
                title={project.beforeAfter.title}
                aspectRatio="16/10"
                className="max-w-4xl mx-auto"
              />
            </div>
          ) : (
            <>
              <Image
                src={currentImage}
                alt={`${project.title} - View ${activeImageIndex + 1}`}
                fill
                sizes="(max-width: 1280px) 100vw, 1200px"
                className="object-contain"
                priority
              />

              {/* Nav Arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={handlePrev}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-stone-900/80 text-white hover:bg-[#C5A880] hover:text-stone-950 transition-colors border border-stone-700 shadow-lg"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>

                  <button
                    onClick={handleNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-stone-900/80 text-white hover:bg-[#C5A880] hover:text-stone-950 transition-colors border border-stone-700 shadow-lg"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}

              {/* Image counter */}
              <div className="absolute bottom-4 left-4 px-3 py-1 bg-black/70 backdrop-blur-sm rounded-sm text-xs font-mono text-stone-300 border border-stone-800">
                {activeImageIndex + 1} / {images.length}
              </div>
            </>
          )}
        </div>

        {/* Project Details Footer */}
        <div className="p-6 sm:p-7 bg-stone-900/95 border-t border-stone-800">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
            <div className="space-y-2 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="gold" size="sm">
                  {project.categoryLabel}
                </Badge>
                {project.hindiTitle && (
                  <span className="text-xs text-[#E0C7A6] font-serif px-2 py-0.5 bg-stone-950 rounded-sm border border-stone-800">
                    {project.hindiTitle}
                  </span>
                )}
                {project.area && (
                  <span className="text-xs font-mono text-stone-400">
                    {project.area}
                  </span>
                )}
              </div>

              <h2 className="text-xl sm:text-2xl font-serif text-white">
                {project.title}
              </h2>
              <p className="text-xs uppercase tracking-wider text-[#C5A880] font-medium">
                {project.tagline}
              </p>
              <p className="text-xs sm:text-sm text-stone-300 font-light max-w-3xl leading-relaxed">
                {project.description}
              </p>

              {/* Architectural Highlights if present */}
              {project.architecturalHighlights && project.architecturalHighlights.length > 0 && (
                <div className="pt-2">
                  <div className="text-xs font-semibold text-stone-200 uppercase tracking-wider mb-1">
                    Design Highlights:
                  </div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-xs text-stone-300 font-light">
                    {project.architecturalHighlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-[#C5A880]">•</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-stone-400 pt-2 font-light">
                {project.location && (
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#C5A880]" />
                    {project.location}
                  </span>
                )}
                {project.year && (
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#C5A880]" />
                    {project.year}
                  </span>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 shrink-0">
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-900/60 to-pink-900/60 hover:from-purple-800 hover:to-pink-800 text-stone-100 border border-purple-500/40 rounded-sm text-xs font-medium tracking-wide transition-all shadow-md"
              >
                <InstagramIcon className="w-3.5 h-3.5 text-pink-300" />
                <span>View on Instagram</span>
                <ExternalLink className="w-3 h-3 text-stone-400 ml-0.5" />
              </a>

              {whatsAppAvailable && (
                <Button
                  variant="outline"
                  size="sm"
                  href={getWhatsAppUrl(`Hello Sanrachana Design Studio, I am interested in discussing a project similar to ${project.title}.`)}
                  className="text-stone-200 border-stone-700"
                >
                  Inquire on WhatsApp
                </Button>
              )}

              <Button variant="gold" size="sm" href="/contact">
                Book Consultation
              </Button>
            </div>
          </div>

          {/* Thumbnails strip */}
          {viewMode === "gallery" && images.length > 1 && (
            <div className="flex items-center gap-2.5 mt-5 pt-4 border-t border-stone-800 overflow-x-auto pb-1">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => onSelectImage(i)}
                  className={`relative w-16 h-12 rounded-sm overflow-hidden border transition-all shrink-0 ${
                    i === activeImageIndex
                      ? "border-[#C5A880] ring-2 ring-[#C5A880]/40 scale-105"
                      : "border-stone-800 opacity-60 hover:opacity-100"
                  }`}
                  aria-label={`Thumbnail ${i + 1}`}
                >
                  <Image src={img} alt="" fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
