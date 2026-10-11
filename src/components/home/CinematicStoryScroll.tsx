"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Sparkles,
  DraftingCompass,
  Layers,
  CheckCircle2,
  ArrowDown,
  ArrowRight,
  Compass,
  DoorOpen,
} from "lucide-react";

export function CinematicStoryScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [activeStageIndex, setActiveStageIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Push-in Camera Zoom (#1) for Stage 1
  const opacity1 = useTransform(scrollYProgress, [0, 0.2, 0.28], [1, 1, 0]);
  const scale1 = useTransform(scrollYProgress, [0, 0.28], [1, 1.15]);

  // Stage 2 Porch & Threshold Transitions
  const opacity2 = useTransform(scrollYProgress, [0.22, 0.3, 0.48, 0.55], [0, 1, 1, 0]);
  const scale2 = useTransform(scrollYProgress, [0.22, 0.55], [1, 1.1]);

  // Physical 3D Door Opening Reveal (#2) & Warm Light Spill (#3)
  const doorRotateY = useTransform(scrollYProgress, [0.26, 0.46], [0, -68]);
  const doorTranslateX = useTransform(scrollYProgress, [0.26, 0.46], [0, -12]);
  const lightSpillOpacity = useTransform(scrollYProgress, [0.26, 0.36, 0.48, 0.54], [0, 0.25, 0.28, 0]);
  const lightSpillScale = useTransform(scrollYProgress, [0.26, 0.46], [0.8, 1.25]);
  const lightSpillWidth = useTransform(scrollYProgress, [0.26, 0.46], ["2px", "14px"]);

  // Stage 3 Foyer Transitions
  const opacity3 = useTransform(scrollYProgress, [0.49, 0.57, 0.73, 0.8], [0, 1, 1, 0]);
  const scale3 = useTransform(scrollYProgress, [0.49, 0.8], [1, 1.08]);

  // Stage 4 Sunken Living Sanctuary Transitions
  const opacity4 = useTransform(scrollYProgress, [0.74, 0.82, 1], [0, 1, 1]);
  const scale4 = useTransform(scrollYProgress, [0.74, 1], [1, 1.06]);

  // Frameless Foreground Text Transitions (No Card Box)
  const textOpacity1 = useTransform(scrollYProgress, [0, 0.18, 0.26], [1, 1, 0]);
  const textY1 = useTransform(scrollYProgress, [0, 0.26], [0, -25]);

  const textOpacity2 = useTransform(scrollYProgress, [0.24, 0.32, 0.46, 0.53], [0, 1, 1, 0]);
  const textY2 = useTransform(scrollYProgress, [0.24, 0.32, 0.53], [25, 0, -25]);

  const textOpacity3 = useTransform(scrollYProgress, [0.51, 0.59, 0.71, 0.78], [0, 1, 1, 0]);
  const textY3 = useTransform(scrollYProgress, [0.51, 0.59, 0.78], [25, 0, -25]);

  const textOpacity4 = useTransform(scrollYProgress, [0.76, 0.84, 1], [0, 1, 1]);
  const textY4 = useTransform(scrollYProgress, [0.76, 0.84], [25, 0]);

  // Track active stage for UI indicators
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (latest < 0.26) setActiveStageIndex(0);
      else if (latest < 0.52) setActiveStageIndex(1);
      else if (latest < 0.77) setActiveStageIndex(2);
      else setActiveStageIndex(3);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  const stages = [
    {
      step: "01",
      tag: "THE ARCHITECTURAL ELEVATION",
      marathiTag: "भव्य वास्तू",
      headline: "Every space begins with a structure of distinction.",
      marathiHeadline: "सुरुवातीला दिसते एक भव्य आणि देखणी भारतीय वास्तू...",
      narrative:
        "A contemporary Indian villa elevation harmonizing basalt stone, terracotta jali screens, and lush tropical greenery with natural daylighting.",
      deliverable: "4,800 sq. ft. Villa Facade • Thane / Maharashtra",
      icon: <Compass className="w-4 h-4 text-[#C5A880]" />,
    },
    {
      step: "02",
      tag: "THE THRESHOLD & PIVOT PORTAL",
      marathiTag: "उंबरठा आणि प्रवेश",
      headline: "Step across the threshold into light and intention.",
      marathiHeadline: "आणि जेव्हा आपण उंबरठा ओलांडून आत प्रवेश करतो...",
      narrative:
        "Approaching the stone porch as the grand Burma teakwood pivot door physically swings open, welcoming you with a radiant 2700K golden light spill.",
      deliverable: "2.8m Burma Teak Pivot Portal • Handcrafted Brass Hardware",
      icon: <DoorOpen className="w-4 h-4 text-[#C5A880]" />,
    },
    {
      step: "03",
      tag: "THE FOYER & SPATIAL VOLUME",
      marathiTag: "प्रवेश दालन",
      headline: "Where spatial volume, courtyard light, and heritage harmonize.",
      marathiHeadline: "तेव्हा उलगडतो अंगणातील प्रकाश, मोकळेपणा आणि संस्कृतीचा संगम...",
      narrative:
        "Stepping inside the double-height foyer, where intricate terracotta jali lattice shadows dance across polished marble floors and floating wood treads.",
      deliverable: "Double-Height Foyer • Terracotta Jali & Sunlight Play",
      icon: <Sparkles className="w-4 h-4 text-[#C5A880]" />,
    },
    {
      step: "04",
      tag: "THE REALIZED DREAM SPACE",
      marathiTag: "साक्षात्कार",
      headline: "A living sanctuary crafted to feel entirely yours.",
      marathiHeadline: "आणि शेवटी साकार होते मनाला आपलीशी वाटणारी स्वप्नातील जागा.",
      narrative:
        "Arriving inside the sunken conversation pavilion with custom teakwood millwork, ambient cove lighting, and panoramic glass opening to the courtyard water garden.",
      deliverable: "Sunken Living Pavilion • Courtyard Reflection Pool",
      icon: <CheckCircle2 className="w-4 h-4 text-[#C5A880]" />,
    },
  ];

  return (
    <section
      ref={containerRef}
      className="relative h-[390vh] bg-[#0a0b0d] text-[#f4f0e8] select-none"
      id="story-scroll"
    >
      {/* Sticky Fullscreen Canvas Window */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* ========================================================================= */}
        {/* BACKGROUND IMAGE STAGES: INDIAN ARCHITECTURAL WALKTHROUGH                 */}
        {/* ========================================================================= */}

        {/* Stage 1 Image: Indian Villa Exterior Facade (Push-In Camera Zoom #1) */}
        <motion.div
          style={{
            opacity: shouldReduceMotion ? (activeStageIndex === 0 ? 1 : 0) : opacity1,
            scale: shouldReduceMotion ? 1 : scale1,
            position: "absolute",
          }}
          className="absolute inset-0 w-full h-full pointer-events-none"
        >
          <Image
            src="/images/story-stage-1-indian-exterior.jpg"
            alt="Stage 1: Contemporary Luxury Indian Villa Facade with Terracotta Jali and Basalt Stone"
            fill
            sizes="100vw"
            priority
            className="object-cover object-center"
          />
          {/* Subtle cinematic gradient scrim ensuring background stays visible */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b0d]/55 via-black/10 to-[#0a0b0d]/30" />
        </motion.div>

        {/* Stage 2 Image: Porch, 3D Pivot Door Swing (#2) & 2700K Light Spill (#3) */}
        <motion.div
          style={{
            opacity: shouldReduceMotion ? (activeStageIndex === 1 ? 1 : 0) : opacity2,
            scale: shouldReduceMotion ? 1 : scale2,
            position: "absolute",
          }}
          className="absolute inset-0 w-full h-full pointer-events-none"
        >
          <Image
            src="/images/story-stage-2-indian-door.jpg"
            alt="Stage 2: Approaching the Burma Teakwood Pivot Door Opening with Warm Light"
            fill
            sizes="100vw"
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b0d]/50 via-black/15 to-[#0a0b0d]/30" />

          {/* ========================================================================= */}
          {/* PHYSICAL 3D DOOR OPENING REVEAL & WARM LIGHT SPILL (#2 & #3)             */}
          {/* ========================================================================= */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
            {/* Aspect-Locked Geometry Matching story-stage-2-indian-door.jpg (1376x768 = 1.7916:1) */}
            <div
              className="relative pointer-events-none"
              style={{
                width: "max(100vw, calc(100vh * 1.791666))",
                height: "max(100vh, calc(100vw / 1.791666))",
              }}
            >
              {/* Minimized 2700K Ambient Light Spill Halo */}
              <motion.div
                style={{
                  opacity: shouldReduceMotion ? 0.12 : lightSpillOpacity,
                  scale: shouldReduceMotion ? 1 : lightSpillScale,
                  left: "51.34%",
                  top: "48.57%",
                  transform: "translate(-50%, -50%)",
                }}
                className="absolute w-[36%] h-[48%] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,200,120,0.20)_0%,rgba(235,160,50,0.08)_35%,transparent_60%)] mix-blend-screen pointer-events-none"
              />

              {/* Architectural Entrance Portal: Snapped to Side Walls, Ceiling Soffit & Floor Steps */}
              <div
                className="absolute [perspective:1400px]"
                style={{
                  left: "43.24%",
                  top: "18.88%",
                  width: "16.21%",
                  height: "59.38%",
                }}
              >
                {/* Interior Foyer visible through the opening doorway */}
                <div className="absolute inset-0 overflow-hidden border-y border-[#3a2518]/60 shadow-inner">
                  <Image
                    src="/images/story-stage-3-indian-foyer.jpg"
                    alt="Interior Foyer Visible Through Opening Door"
                    fill
                    sizes="(max-width: 1024px) 300px, 450px"
                    className="object-cover object-center scale-110 filter brightness-105"
                  />
                  {/* Soft natural interior ambient tint */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,220,150,0.15)_0%,transparent_70%)]" />
                </div>

                {/* The Physical Burma Teakwood Pivot Door Leaf (Rotates Inward in 3D) */}
                {/* Perfectly matches the flanking terracotta jali and basalt stone column */}
                <motion.div
                  style={{
                    transformOrigin: "6% center",
                    transformStyle: "preserve-3d",
                    rotateY: shouldReduceMotion ? -35 : doorRotateY,
                    x: shouldReduceMotion ? -6 : doorTranslateX,
                  }}
                  className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#2c170a] via-[#4a2b15] to-[#251307] border-y border-l border-[#694223]/60 shadow-[-14px_0_36px_rgba(0,0,0,0.85)] flex items-center justify-end pr-3 sm:pr-4 overflow-hidden"
                >
                  {/* Teak Wood Slats & Texture Pattern */}
                  <div className="absolute inset-0 opacity-40 bg-[repeating-linear-gradient(0deg,transparent,transparent_28px,rgba(0,0,0,0.4)_28px,rgba(0,0,0,0.4)_30px)] pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/40 pointer-events-none" />
                  
                  {/* Handcrafted Brushed Brass Pull Handle - Scaled to Full Door Height */}
                  <div className="relative z-10 w-1 sm:w-1.5 md:w-2 h-[45%] rounded-full bg-gradient-to-b from-[#E0C7A6] via-[#C5A880] to-[#8C6D3F] shadow-[0_2px_12px_rgba(0,0,0,0.8)] border border-[#F5E5C9]/40 flex flex-col justify-between py-2 items-center">
                    <div className="w-2 sm:w-2.5 h-1 rounded-full bg-[#E0C7A6]/80 shadow-xs" />
                    <div className="w-2 sm:w-2.5 h-1 rounded-full bg-[#E0C7A6]/80 shadow-xs" />
                  </div>

                  {/* Dynamic Shadow on Door Surface as Light Strikes It - from right to left */}
                  <motion.div
                    style={{
                      opacity: shouldReduceMotion ? 0.2 : lightSpillOpacity,
                    }}
                    className="absolute inset-0 bg-gradient-to-l from-black/40 to-transparent pointer-events-none"
                  />
                </motion.div>

                {/* Gentle Soft Light Leak from Door Hinge Gap */}
                <motion.div
                  style={{
                    opacity: shouldReduceMotion ? 0.2 : lightSpillOpacity,
                    width: shouldReduceMotion ? "8px" : lightSpillWidth,
                  }}
                  className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-[#FFF0D4]/70 via-[#FFB84D]/40 to-transparent filter blur-[1px] pointer-events-none"
                />
              </div>

              {/* Minimized Floor Porch Light Reflection on Granite Steps */}
              <motion.div
                style={{
                  opacity: shouldReduceMotion ? 0.15 : lightSpillOpacity,
                  left: "51.34%",
                  top: "78.26%",
                  transform: "translateX(-50%)",
                }}
                className="absolute w-[22%] h-[8%] bg-[radial-gradient(ellipse_at_center,rgba(255,190,90,0.18)_0%,rgba(220,130,40,0.06)_40%,transparent_70%)] filter blur-md pointer-events-none"
              />
            </div>
          </div>
        </motion.div>

        {/* Stage 3 Image: Stepping Inside Double-Height Foyer */}
        <motion.div
          style={{
            opacity: shouldReduceMotion ? (activeStageIndex === 2 ? 1 : 0) : opacity3,
            scale: shouldReduceMotion ? 1 : scale3,
            position: "absolute",
          }}
          className="absolute inset-0 w-full h-full pointer-events-none"
        >
          <Image
            src="/images/story-stage-3-indian-foyer.jpg"
            alt="Stage 3: Stepping Inside the Indian Home Foyer with Terracotta Jali and Sunken Lounge Sightline"
            fill
            sizes="100vw"
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b0d]/50 via-black/15 to-[#0a0b0d]/30" />
        </motion.div>

        {/* Stage 4 Image: Luxury Sunken Living Pavilion & Courtyard */}
        <motion.div
          style={{
            opacity: shouldReduceMotion ? (activeStageIndex === 3 ? 1 : 0) : opacity4,
            scale: shouldReduceMotion ? 1 : scale4,
            position: "absolute",
          }}
          className="absolute inset-0 w-full h-full pointer-events-none"
        >
          <Image
            src="/images/story-stage-4-indian-living.jpg"
            alt="Stage 4: Luxury Contemporary Indian Sunken Living Pavilion with Teak Paneling and Courtyard Water Feature"
            fill
            sizes="100vw"
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b0d]/50 via-black/15 to-[#0a0b0d]/30" />
        </motion.div>

        {/* ========================================================================= */}
        {/* FOREGROUND FRAMELESS STORY TEXT (NO CARDS, PURE HARMONIZED TYPOGRAPHY)     */}
        {/* ========================================================================= */}

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center justify-center">
          
          {/* Header Title Accent */}
          <div className="mb-6 text-center">
            <Badge variant="gold" size="sm" className="bg-black/35 border-[#C5A880]/40 backdrop-blur-xs">
              <Sparkles className="w-3 h-3 text-[#E0C7A6]" />
              <span className="font-medium tracking-wide">The Architectural Walkthrough • वास्तू प्रवास</span>
            </Badge>
          </div>

          {/* Stage 1: Exterior Elevation (Frameless Floating Typography) */}
          <motion.div
            style={{
              opacity: shouldReduceMotion ? (activeStageIndex === 0 ? 1 : 0) : textOpacity1,
              y: shouldReduceMotion ? 0 : textY1,
              pointerEvents: activeStageIndex === 0 ? "auto" : "none",
            }}
            className={`w-full max-w-3xl text-center px-4 sm:px-6 py-2 flex flex-col items-center justify-center ${
              activeStageIndex === 0 ? "block" : shouldReduceMotion ? "hidden" : "block"
            }`}
          >
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="text-xs font-mono font-semibold tracking-[0.25em] text-[#E0C7A6] uppercase [text-shadow:_0_1px_4px_rgba(0,0,0,0.95),_0_2px_12px_rgba(0,0,0,0.9)]">
                {stages[0].step} // {stages[0].tag}
              </span>
              <span className="text-xs font-serif text-[#F0DCBE] tracking-widest px-3 py-0.5 rounded-full border border-[#C5A880]/40 bg-black/35 backdrop-blur-xs [text-shadow:_0_1px_4px_rgba(0,0,0,0.95)]">
                {stages[0].marathiTag}
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-normal text-[#FAF7F2] leading-[1.18] mb-4 [text-shadow:_0_2px_8px_rgba(0,0,0,0.95),_0_4px_24px_rgba(0,0,0,0.95),_0_0_40px_rgba(0,0,0,0.85)]">
              &ldquo;{stages[0].headline}&rdquo;
            </h2>

            <p className="text-xl sm:text-2xl md:text-3xl font-serif font-normal text-[#F0DCBE] tracking-wide mb-4 [text-shadow:_0_2px_6px_rgba(0,0,0,0.95),_0_4px_18px_rgba(0,0,0,0.9)]">
              &ldquo;{stages[0].marathiHeadline}&rdquo;
            </p>

            <p className="text-sm sm:text-base text-[#E8E3DA] font-normal max-w-xl mx-auto leading-relaxed mb-6 [text-shadow:_0_1px_4px_rgba(0,0,0,0.95),_0_2px_12px_rgba(0,0,0,0.85)]">
              {stages[0].narrative}
            </p>

            <div className="inline-flex items-center gap-2 text-xs text-[#D8C9B4] font-mono [text-shadow:_0_1px_4px_rgba(0,0,0,0.95)]">
              <ArrowDown className="w-3.5 h-3.5 text-[#E0C7A6] animate-bounce" />
              <span className="tracking-wider">Scroll down to step toward the entrance</span>
            </div>
          </motion.div>

          {/* Stage 2: Threshold & Door Opening (Frameless Floating Typography) */}
          <motion.div
            style={{
              opacity: shouldReduceMotion ? (activeStageIndex === 1 ? 1 : 0) : textOpacity2,
              y: shouldReduceMotion ? 0 : textY2,
              pointerEvents: activeStageIndex === 1 ? "auto" : "none",
              position: shouldReduceMotion ? "static" : "absolute",
            }}
            className={`w-full max-w-3xl text-center px-4 sm:px-6 py-2 flex flex-col items-center justify-center ${
              activeStageIndex === 1 ? "block" : shouldReduceMotion ? "hidden" : "block"
            }`}
          >
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="text-xs font-mono font-semibold tracking-[0.25em] text-[#E0C7A6] uppercase [text-shadow:_0_1px_4px_rgba(0,0,0,0.95),_0_2px_12px_rgba(0,0,0,0.9)]">
                {stages[1].step} // {stages[1].tag}
              </span>
              <span className="text-xs font-serif text-[#F0DCBE] tracking-widest px-3 py-0.5 rounded-full border border-[#C5A880]/40 bg-black/35 backdrop-blur-xs [text-shadow:_0_1px_4px_rgba(0,0,0,0.95)]">
                {stages[1].marathiTag}
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-normal text-[#FAF7F2] leading-[1.18] mb-4 [text-shadow:_0_2px_8px_rgba(0,0,0,0.95),_0_4px_24px_rgba(0,0,0,0.95),_0_0_40px_rgba(0,0,0,0.85)]">
              &ldquo;{stages[1].headline}&rdquo;
            </h2>

            <p className="text-xl sm:text-2xl md:text-3xl font-serif font-normal text-[#F0DCBE] tracking-wide mb-4 [text-shadow:_0_2px_6px_rgba(0,0,0,0.95),_0_4px_18px_rgba(0,0,0,0.9)]">
              &ldquo;{stages[1].marathiHeadline}&rdquo;
            </p>

            <p className="text-sm sm:text-base text-[#E8E3DA] font-normal max-w-xl mx-auto leading-relaxed mb-6 [text-shadow:_0_1px_4px_rgba(0,0,0,0.95),_0_2px_12px_rgba(0,0,0,0.85)]">
              {stages[1].narrative}
            </p>

            <div className="inline-flex items-center gap-2 text-xs text-[#D8C9B4] font-mono [text-shadow:_0_1px_4px_rgba(0,0,0,0.95)]">
              <DoorOpen className="w-3.5 h-3.5 text-[#E0C7A6]" />
              <span className="tracking-wider">Detail: {stages[1].deliverable}</span>
            </div>
          </motion.div>

          {/* Stage 3: Entering the Foyer (Frameless Floating Typography) */}
          <motion.div
            style={{
              opacity: shouldReduceMotion ? (activeStageIndex === 2 ? 1 : 0) : textOpacity3,
              y: shouldReduceMotion ? 0 : textY3,
              pointerEvents: activeStageIndex === 2 ? "auto" : "none",
              position: shouldReduceMotion ? "static" : "absolute",
            }}
            className={`w-full max-w-3xl text-center px-4 sm:px-6 py-2 flex flex-col items-center justify-center ${
              activeStageIndex === 2 ? "block" : shouldReduceMotion ? "hidden" : "block"
            }`}
          >
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="text-xs font-mono font-semibold tracking-[0.25em] text-[#E0C7A6] uppercase [text-shadow:_0_1px_4px_rgba(0,0,0,0.95),_0_2px_12px_rgba(0,0,0,0.9)]">
                {stages[2].step} // {stages[2].tag}
              </span>
              <span className="text-xs font-serif text-[#F0DCBE] tracking-widest px-3 py-0.5 rounded-full border border-[#C5A880]/40 bg-black/35 backdrop-blur-xs [text-shadow:_0_1px_4px_rgba(0,0,0,0.95)]">
                {stages[2].marathiTag}
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-normal text-[#FAF7F2] leading-[1.18] mb-4 [text-shadow:_0_2px_8px_rgba(0,0,0,0.95),_0_4px_24px_rgba(0,0,0,0.95),_0_0_40px_rgba(0,0,0,0.85)]">
              &ldquo;{stages[2].headline}&rdquo;
            </h2>

            <p className="text-xl sm:text-2xl md:text-3xl font-serif font-normal text-[#F0DCBE] tracking-wide mb-4 [text-shadow:_0_2px_6px_rgba(0,0,0,0.95),_0_4px_18px_rgba(0,0,0,0.9)]">
              &ldquo;{stages[2].marathiHeadline}&rdquo;
            </p>

            <p className="text-sm sm:text-base text-[#E8E3DA] font-normal max-w-xl mx-auto leading-relaxed mb-6 [text-shadow:_0_1px_4px_rgba(0,0,0,0.95),_0_2px_12px_rgba(0,0,0,0.85)]">
              {stages[2].narrative}
            </p>

            <div className="inline-flex items-center gap-2 text-xs text-[#D8C9B4] font-mono [text-shadow:_0_1px_4px_rgba(0,0,0,0.95)]">
              <Sparkles className="w-3.5 h-3.5 text-[#E0C7A6]" />
              <span className="tracking-wider">Detail: {stages[2].deliverable}</span>
            </div>
          </motion.div>

          {/* Stage 4: Full Luxury Sunken Living Pavilion (Frameless Floating Typography) */}
          <motion.div
            style={{
              opacity: shouldReduceMotion ? (activeStageIndex === 3 ? 1 : 0) : textOpacity4,
              y: shouldReduceMotion ? 0 : textY4,
              pointerEvents: activeStageIndex === 3 ? "auto" : "none",
              position: shouldReduceMotion ? "static" : "absolute",
            }}
            className={`w-full max-w-3xl text-center px-4 sm:px-6 py-2 flex flex-col items-center justify-center ${
              activeStageIndex === 3 ? "block" : shouldReduceMotion ? "hidden" : "block"
            }`}
          >
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="text-xs font-mono font-semibold tracking-[0.25em] text-[#E0C7A6] uppercase [text-shadow:_0_1px_4px_rgba(0,0,0,0.95),_0_2px_12px_rgba(0,0,0,0.9)]">
                {stages[3].step} // {stages[3].tag}
              </span>
              <span className="text-xs font-serif text-[#F0DCBE] tracking-widest px-3 py-0.5 rounded-full border border-[#C5A880]/40 bg-black/35 backdrop-blur-xs [text-shadow:_0_1px_4px_rgba(0,0,0,0.95)]">
                {stages[3].marathiTag}
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-normal text-[#FAF7F2] leading-[1.18] mb-4 [text-shadow:_0_2px_8px_rgba(0,0,0,0.95),_0_4px_24px_rgba(0,0,0,0.95),_0_0_40px_rgba(0,0,0,0.85)]">
              &ldquo;{stages[3].headline}&rdquo;
            </h2>

            <p className="text-xl sm:text-2xl md:text-3xl font-serif font-normal text-[#F0DCBE] tracking-wide mb-4 [text-shadow:_0_2px_6px_rgba(0,0,0,0.95),_0_4px_18px_rgba(0,0,0,0.9)]">
              &ldquo;{stages[3].marathiHeadline}&rdquo;
            </p>

            <p className="text-sm sm:text-base text-[#E8E3DA] font-normal max-w-xl mx-auto leading-relaxed mb-6 [text-shadow:_0_1px_4px_rgba(0,0,0,0.95),_0_2px_12px_rgba(0,0,0,0.85)]">
              {stages[3].narrative}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button variant="gold" size="sm" href="/contact" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Start Your Dream Space
              </Button>
              <Button variant="outline" size="sm" href="/portfolio" className="text-[#FAF7F2] border-[#C5A880]/50 bg-black/40 backdrop-blur-xs hover:bg-black/60">
                Explore Studio Works
              </Button>
            </div>
          </motion.div>
        </div>

        {/* ========================================================================= */}
        {/* SIDE ARCHITECTURAL STAGE INDICATOR (01 → 04)                             */}
        {/* ========================================================================= */}

        <div className="hidden lg:flex fixed right-8 top-1/2 -translate-y-1/2 z-20 flex-col gap-4 pointer-events-none">
          {stages.map((st, idx) => (
            <div
              key={st.step}
              className={`flex items-center gap-3 transition-all duration-300 ${
                activeStageIndex === idx ? "opacity-100 translate-x-0" : "opacity-40 translate-x-2"
              }`}
            >
              <span
                className={`text-[11px] font-mono tracking-widest ${
                  activeStageIndex === idx ? "text-[#C5A880] font-bold" : "text-stone-400"
                }`}
              >
                {st.step}
              </span>
              <div
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  activeStageIndex === idx
                    ? "bg-[#C5A880] ring-4 ring-[#C5A880]/20 scale-125"
                    : "bg-stone-700"
                }`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
