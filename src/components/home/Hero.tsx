"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { siteConfig, hasWhatsApp, getWhatsAppUrl } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  ArrowRight,
  MessageCircle,
  Sparkles,
  SlidersHorizontal,
  Compass,
  Layers,
  DraftingCompass,
  CheckCircle2,
  RefreshCw,
} from "lucide-react";
import { easeArchitectural } from "@/components/ui/Motion";

export function Hero() {
  const whatsAppAvailable = hasWhatsApp();
  const whatsAppUrl = getWhatsAppUrl();
  const shouldReduceMotion = useReducedMotion();

  // Interactive Reveal Slider State
  const [sliderPosition, setSliderPosition] = useState<number>(45);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"interactive" | "sketch" | "finished">("interactive");
  const containerRef = useRef<HTMLDivElement>(null);

  // Drag interaction handler
  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isDragging) return;
      handleMove(e.touches[0].clientX);
    },
    [isDragging, handleMove]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;
      handleMove(e.clientX);
    },
    [isDragging, handleMove]
  );

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handlePointerUp);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("touchend", handlePointerUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handlePointerUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handlePointerUp);
    };
  }, [isDragging, handleMouseMove, handleTouchMove, handlePointerUp]);

  // Keyboard navigation for accessibility
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setSliderPosition((prev) => Math.max(5, prev - 5));
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setSliderPosition((prev) => Math.min(95, prev + 5));
    } else if (e.key === "Home") {
      e.preventDefault();
      setSliderPosition(10);
    } else if (e.key === "End") {
      e.preventDefault();
      setSliderPosition(90);
    }
  };

  const heroContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: easeArchitectural },
    },
  };

  return (
    <section className="relative min-h-[96vh] flex flex-col justify-between pt-28 pb-16 bg-[#0a0b0d] text-[#f4f0e8] overflow-hidden border-b border-stone-800">
      {/* Subtle Architectural Atmosphere Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none" style={{ position: "absolute" }}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(197,168,128,0.08)_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(10,11,13,0.3)_0%,rgba(10,11,13,0.95)_100%)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-center">
        <motion.div
          variants={heroContainerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center w-full text-center mb-10"
        >
          {/* Marathi Emotional Expression & Brand Tag */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-5">
            <Badge variant="gold" size="md" className="bg-[#C5A880]/15 border-[#C5A880]/40 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-[#E0C7A6]" />
              <span className="font-medium tracking-wide">Architecture & Interior Practice</span>
            </Badge>
            <span className="text-xs tracking-[0.25em] text-[#E0C7A6] font-serif font-normal px-2.5 py-1 rounded-sm bg-stone-900/60 border border-stone-800">
              {siteConfig.marathiExpression}
            </span>
          </motion.div>

          {/* Major Hero Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-normal tracking-tight text-stone-50 max-w-5xl leading-[1.14] mb-4"
          >
            From Empty Space to <br className="hidden sm:inline" />
            <span className="italic font-serif text-[#E0C7A6]">
              Dream Space.
            </span>
          </motion.h1>

          {/* Bilingual Supporting Narrative */}
          <motion.div variants={itemVariants} className="max-w-3xl mb-8 space-y-1.5">
            <p className="text-base sm:text-lg md:text-xl text-stone-200 font-light leading-relaxed">
              &ldquo;{siteConfig.heroConceptLine}&rdquo;{" "}
              <span className="text-[#E0C7A6] font-serif italic text-base sm:text-lg">
                &mdash; {siteConfig.heroMarathiLine}
              </span>
            </p>
            <p className="text-xs sm:text-sm text-stone-400 font-light max-w-2xl mx-auto">
              Every space has a story. We transform bare architectural layouts and structural shells into sensory, bespoke residential and commercial environments crafted for life.
            </p>
          </motion.div>

          {/* Primary Action Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md sm:max-w-none mb-10"
          >
            <Button
              variant="gold"
              size="lg"
              href="/portfolio"
              rightIcon={<ArrowRight className="w-4 h-4" />}
              className="w-full sm:w-auto shadow-[0_0_20px_rgba(197,168,128,0.25)] hover:shadow-[0_0_25px_rgba(197,168,128,0.4)]"
            >
              Explore Our Work
            </Button>

            <Button
              variant="outline"
              size="lg"
              href="/contact"
              className="w-full sm:w-auto text-stone-200 border-stone-700 hover:bg-stone-900 hover:text-white"
            >
              Start a Project
            </Button>

            {whatsAppAvailable && (
              <Button
                variant="outline"
                size="lg"
                href={whatsAppUrl}
                leftIcon={<MessageCircle className="w-4 h-4 text-emerald-400" />}
                className="w-full sm:w-auto text-stone-200 border-stone-700 hover:border-emerald-500/60 hover:bg-stone-900"
              >
                WhatsApp
              </Button>
            )}
          </motion.div>

          {/* Interactive Sketch-to-Finished Space Reveal Component */}
          <motion.div variants={itemVariants} className="w-full max-w-5xl mx-auto">
            {/* Reveal Toolbar / Controls */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-3 px-1 text-left">
              <div className="flex items-center gap-2">
                <DraftingCompass className="w-4 h-4 text-[#C5A880]" />
                <span className="text-xs uppercase tracking-widest font-semibold text-stone-300">
                  Interactive Reveal: Concept Sketch to Living Pavilion
                </span>
              </div>

              {/* View Selector / Mobile Buttons */}
              <div className="flex items-center gap-1.5 text-xs bg-stone-900/90 p-1 rounded-sm border border-stone-800">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab("interactive");
                    setSliderPosition(50);
                  }}
                  className={`px-2.5 py-1 rounded-xs transition-colors ${
                    activeTab === "interactive"
                      ? "bg-[#C5A880] text-stone-950 font-semibold shadow-xs"
                      : "text-stone-400 hover:text-stone-200"
                  }`}
                >
                  Draggable Reveal
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab("sketch");
                    setSliderPosition(95);
                  }}
                  className={`px-2.5 py-1 rounded-xs transition-colors ${
                    activeTab === "sketch"
                      ? "bg-[#C5A880] text-stone-950 font-semibold shadow-xs"
                      : "text-stone-400 hover:text-stone-200"
                  }`}
                >
                  Sketch Only
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab("finished");
                    setSliderPosition(5);
                  }}
                  className={`px-2.5 py-1 rounded-xs transition-colors ${
                    activeTab === "finished"
                      ? "bg-[#C5A880] text-stone-950 font-semibold shadow-xs"
                      : "text-stone-400 hover:text-stone-200"
                  }`}
                >
                  Finished Space
                </button>
              </div>
            </div>

            {/* Main Interactive Reveal Frame */}
            <div
              ref={containerRef}
              role="slider"
              aria-valuenow={Math.round(sliderPosition)}
              aria-valuemin={5}
              aria-valuemax={95}
              aria-label="Interactive comparison: Architectural Concept Sketch to Finished Dream Space"
              tabIndex={0}
              onKeyDown={handleKeyDown}
              onMouseDown={(e) => {
                setActiveTab("interactive");
                setIsDragging(true);
                handleMove(e.clientX);
              }}
              onTouchStart={(e) => {
                setActiveTab("interactive");
                setIsDragging(true);
                handleMove(e.touches[0].clientX);
              }}
              className="relative w-full aspect-[16/9] sm:aspect-[16/9] md:aspect-[21/10] overflow-hidden rounded-sm border border-stone-800 bg-stone-950 select-none cursor-ew-resize focus:outline-none focus:ring-2 focus:ring-[#C5A880] shadow-2xl"
              style={{ position: "relative" }}
            >
              {/* FINISHED SPACE (Background Layer - Full Width) */}
              <div className="absolute inset-0 w-full h-full" style={{ position: "absolute" }}>
                <Image
                  src="/images/hero-finished-space.jpg"
                  alt="Finished Architectural Living Pavilion by Sanrachana Design Studio"
                  fill
                  priority
                  sizes="(max-width: 1280px) 100vw, 1200px"
                  className="object-cover pointer-events-none"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-transparent pointer-events-none" />

                {/* Right Badge: Finished Space */}
                <div className="absolute bottom-4 right-4 z-10 pointer-events-none">
                  <span className="text-[11px] sm:text-xs font-semibold px-3 py-1.5 bg-stone-950/85 backdrop-blur-md text-[#E0C7A6] border border-[#C5A880]/50 rounded-sm shadow-xl flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>Finished Dream Space</span>
                  </span>
                </div>
              </div>

              {/* ARCHITECTURAL SKETCH / BLUEPRINT (Foreground Layer - Clipped) */}
              <div
                className="absolute inset-0 h-full overflow-hidden"
                style={{
                  position: "absolute",
                  width: `${sliderPosition}%`,
                  borderRight: "2px solid #C5A880",
                }}
              >
                <div
                  className="absolute inset-0 h-full"
                  style={{
                    position: "absolute",
                    width: containerRef.current ? `${containerRef.current.clientWidth}px` : "100vw",
                  }}
                >
                  <Image
                    src="/images/hero-concept-sketch.jpg"
                    alt="Architectural Blueprint Concept Sketch - Modern Living Pavilion"
                    fill
                    priority
                    sizes="(max-width: 1280px) 100vw, 1200px"
                    className="object-cover pointer-events-none"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/40 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Left Badge: Concept Sketch */}
                <div className="absolute bottom-4 left-4 z-10 pointer-events-none">
                  <span className="text-[11px] sm:text-xs font-medium px-3 py-1.5 bg-stone-950/90 backdrop-blur-md text-stone-200 border border-stone-700 rounded-sm shadow-xl flex items-center gap-1.5">
                    <DraftingCompass className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>Concept Sketch & Layout</span>
                  </span>
                </div>
              </div>

              {/* DRAG HANDLE BAR */}
              <div
                className="absolute top-0 bottom-0 z-20 pointer-events-none flex items-center justify-center -translate-x-1/2"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-stone-950 border-2 border-[#C5A880] text-[#C5A880] flex items-center justify-center shadow-[0_0_20px_rgba(197,168,128,0.6)] backdrop-blur-md">
                  <SlidersHorizontal className="w-4 h-4" />
                </div>
              </div>

              {/* Instructions Prompt Overlay */}
              <div className="absolute top-3 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
                <span className="text-[10px] sm:text-xs tracking-wider uppercase px-3 py-1 bg-stone-950/80 backdrop-blur-md text-stone-300 border border-stone-800 rounded-full flex items-center gap-1.5">
                  <RefreshCw className="w-3 h-3 text-[#C5A880]" />
                  <span>Drag or use arrow keys to reveal</span>
                </span>
              </div>
            </div>

            {/* Caption Note */}
            <p className="text-[11px] text-stone-400 font-light mt-2.5 text-center">
              Concept illustration & matching completed living pavilion crafted to demonstrate Sanrachana&apos;s spatial journey.
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Disciplines Bar at Bottom */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-6 border-t border-stone-800/80">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 text-left">
          <div className="flex items-center gap-3 p-2 text-stone-300 rounded-sm hover:bg-stone-900/40 transition-colors">
            <div className="p-2 rounded-sm bg-stone-900/80 border border-stone-800 text-[#C5A880]">
              <DraftingCompass className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-semibold text-stone-200 uppercase tracking-wider">
                Villas & Bungalows
              </div>
              <div className="text-[11px] text-stone-400 font-light">
                Architectural Planning
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2 text-stone-300 rounded-sm hover:bg-stone-900/40 transition-colors">
            <div className="p-2 rounded-sm bg-stone-900/80 border border-stone-800 text-[#C5A880]">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-semibold text-stone-200 uppercase tracking-wider">
                Luxury Interiors
              </div>
              <div className="text-[11px] text-stone-400 font-light">
                Bespoke Living Spaces
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2 text-stone-300 rounded-sm hover:bg-stone-900/40 transition-colors">
            <div className="p-2 rounded-sm bg-stone-900/80 border border-stone-800 text-[#C5A880]">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-semibold text-stone-200 uppercase tracking-wider">
                3D Elevation
              </div>
              <div className="text-[11px] text-stone-400 font-light">
                Photorealistic Renders
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2 text-stone-300 rounded-sm hover:bg-stone-900/40 transition-colors">
            <div className="p-2 rounded-sm bg-stone-900/80 border border-stone-800 text-[#C5A880]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-semibold text-stone-200 uppercase tracking-wider">
                Turnkey Execution
              </div>
              <div className="text-[11px] text-stone-400 font-light">
                Site Supervision & BOQ
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
