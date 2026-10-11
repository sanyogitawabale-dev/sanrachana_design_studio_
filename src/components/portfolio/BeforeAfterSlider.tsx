"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { Sparkles, SlidersHorizontal, Eye } from "lucide-react";

export interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  title?: string;
  subtitle?: string;
  aspectRatio?: "16/9" | "16/10" | "4/3" | "1/1";
  initialPosition?: number;
  className?: string;
}

export function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = "Before / Raw Site",
  afterLabel = "After / Finished Execution",
  title,
  subtitle,
  aspectRatio = "16/10",
  initialPosition = 50,
  className = "",
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState<number>(initialPosition);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      setSliderPosition((prev) => Math.max(0, prev - 5));
    } else if (e.key === "ArrowRight") {
      setSliderPosition((prev) => Math.min(100, prev + 5));
    }
  };

  const aspectClass =
    aspectRatio === "16/9"
      ? "aspect-video"
      : aspectRatio === "16/10"
      ? "aspect-[16/10]"
      : aspectRatio === "4/3"
      ? "aspect-[4/3]"
      : "aspect-square";

  return (
    <div className={`w-full flex flex-col ${className}`}>
      {(title || subtitle) && (
        <div className="mb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          {title && (
            <div>
              <h4 className="text-lg sm:text-xl font-serif text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#C5A880]" />
                {title}
              </h4>
              {subtitle && <p className="text-xs text-stone-400 font-light mt-0.5">{subtitle}</p>}
            </div>
          )}
          <div className="flex items-center gap-2 text-[11px] text-stone-400 font-mono">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>Drag handle or click to compare</span>
          </div>
        </div>
      )}

      {/* Main Container */}
      <div
        ref={containerRef}
        role="slider"
        aria-valuenow={Math.round(sliderPosition)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Before and After visual comparison"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onMouseDown={(e) => {
          setIsDragging(true);
          handleMove(e.clientX);
        }}
        onTouchStart={(e) => {
          setIsDragging(true);
          handleMove(e.touches[0].clientX);
        }}
        className={`relative w-full ${aspectClass} overflow-hidden rounded-sm border border-stone-800 bg-stone-950 select-none cursor-ew-resize focus:outline-none focus:ring-2 focus:ring-[#C5A880]/60`}
        style={{ position: "relative" }}
      >
        {/* AFTER IMAGE (Background - Full width) */}
        <div className="absolute inset-0 w-full h-full" style={{ position: "absolute" }}>
          <Image
            src={afterImage}
            alt="Completed architectural renovation"
            fill
            sizes="(max-width: 1024px) 100vw, 1200px"
            className="object-cover pointer-events-none"
          />
          {/* Label After */}
          <div className="absolute bottom-4 right-4 z-10 pointer-events-none">
            <span className="text-xs font-semibold px-3 py-1 bg-stone-950/80 backdrop-blur-md text-[#E0C7A6] border border-[#C5A880]/40 rounded-sm shadow-lg flex items-center gap-1.5">
              <Eye className="w-3 h-3 text-[#C5A880]" />
              {afterLabel}
            </span>
          </div>
        </div>

        {/* BEFORE IMAGE (Foreground - Clipped width) */}
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
              src={beforeImage}
              alt="Raw site / Before renovation"
              fill
              sizes="(max-width: 1024px) 100vw, 1200px"
              className="object-cover pointer-events-none filter grayscale contrast-110"
            />
          </div>

          {/* Label Before */}
          <div className="absolute bottom-4 left-4 z-10 pointer-events-none">
            <span className="text-xs font-medium px-3 py-1 bg-stone-950/85 backdrop-blur-md text-stone-300 border border-stone-700 rounded-sm shadow-lg">
              {beforeLabel}
            </span>
          </div>
        </div>

        {/* DRAG HANDLE BAR */}
        <div
          className="absolute top-0 bottom-0 z-20 pointer-events-none flex items-center justify-center -translate-x-1/2"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="w-8 h-8 rounded-full bg-stone-950 border-2 border-[#C5A880] text-[#C5A880] flex items-center justify-center shadow-[0_0_15px_rgba(197,168,128,0.4)] backdrop-blur-md">
            <SlidersHorizontal className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </div>
  );
}
