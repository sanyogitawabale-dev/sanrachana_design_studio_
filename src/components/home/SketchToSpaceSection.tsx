"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  DraftingCompass,
  Layers,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  SlidersHorizontal,
} from "lucide-react";

export function SketchToSpaceSection() {
  const [activeStage, setActiveStage] = useState<number>(0);

  const stages = [
    {
      id: "sketch",
      stageNumber: "01",
      title: "Conceptual Hand-Drafting & Blueprints",
      marathiTitle: "संकल्पना व रेखाटन",
      badge: "Stage 01: The Blueprint",
      description:
        "Every project begins with raw spatial thinking: studying sun paths, natural ventilation channels, Vastu directional geometry, and structural column grids to optimize every square foot before a single brick is laid.",
      image: "/images/hero-concept-sketch.jpg",
      altText: "Architectural Hand-Drafted Concept Sketch by Sanrachana Design Studio",
      deliverables: [
        "Site Topography & Climate Analysis",
        "Vastu-Harmonized Floor Plans",
        "Structural Zoning & Circulation Diagrams",
      ],
      caption: "Graphite and fine-line perspective layout exploring volumetric proportions and fenestration placement.",
    },
    {
      id: "render",
      stageNumber: "02",
      title: "3D Photorealistic & Twilight Simulation",
      marathiTitle: "3D दृश्य सिमुलेशन",
      badge: "Stage 02: 3D Visualization",
      description:
        "Translating blueprints into hyper-realistic 3D elevations and interior renderings. Clients experience material textures, artificial lighting temperatures (2700K–3000K warm profiles), and spatial depths with absolute fidelity.",
      image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=80",
      altText: "3D Elevation and Twilight Visualization by Sanrachana Design Studio",
      deliverables: [
        "Daylight & Golden-Hour Lighting Renders",
        "Material Moodboarding & Stone Sampling",
        "360-Degree Spatial Walkthrough Studies",
      ],
      caption: "Twilight illumination simulation testing facade cantilever shadows, warm cove lighting, and stone cladding.",
    },
    {
      id: "execution",
      stageNumber: "03",
      title: "Turnkey Craft & Realized Dream Space",
      marathiTitle: "प्रत्यक्ष साकारलेली जागा",
      badge: "Stage 03: Completed Space",
      description:
        "On-site architectural supervision, millimeter-precise custom millwork, Italian marble installation, and turnkey delivery. What was once an empty shell transforms into a warm, sensory reality tailored to your story.",
      image: "/images/hero-finished-space.jpg",
      altText: "Completed Luxury Architectural Living Space by Sanrachana Design Studio",
      deliverables: [
        "Turnkey Site Execution & BOQ Management",
        "Acoustic & Fluted Millwork Installation",
        "Sensory Handover & Quality Assurance",
      ],
      caption: "Completed modern living pavilion with travertine stone, fluted walnut millwork, and glass doors.",
    },
  ];

  const currentStage = stages[activeStage];

  return (
    <section className="py-20 sm:py-28 bg-stone-950 text-[#f4f0e8] border-b border-stone-800 relative overflow-hidden">
      {/* Background Architectural Grid Accent */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#c5a880_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          dark
          badge="The Design Journey"
          devanagariSubtitle="रेखाटनापासून स्वप्नातील जागेपर्यंत"
          title="From Sketch to Space: The Creative Evolution"
          description="Architecture is not just the finished structure—it is the disciplined journey of listening, conceptual drafting, 3D simulation, and turnkey execution."
        />

        {/* Stage Selector Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 mb-10">
          {stages.map((stage, idx) => (
            <button
              key={stage.id}
              type="button"
              onClick={() => setActiveStage(idx)}
              className={`text-left p-4 sm:p-5 rounded-sm border transition-all duration-300 flex flex-col justify-between ${
                activeStage === idx
                  ? "bg-stone-900 border-[#C5A880] shadow-[0_0_20px_rgba(197,168,128,0.15)] ring-1 ring-[#C5A880]/50"
                  : "bg-stone-950/80 border-stone-800 hover:border-stone-700 text-stone-400 hover:text-stone-200"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span
                  className={`text-2xl font-serif font-light ${
                    activeStage === idx ? "text-[#C5A880]" : "text-stone-600"
                  }`}
                >
                  {stage.stageNumber}
                </span>
                <span
                  className={`text-[11px] font-mono tracking-wider uppercase px-2 py-0.5 rounded-xs border ${
                    activeStage === idx
                      ? "bg-[#C5A880]/20 text-[#E0C7A6] border-[#C5A880]/40"
                      : "bg-stone-900 text-stone-500 border-stone-800"
                  }`}
                >
                  {stage.marathiTitle}
                </span>
              </div>
              <div>
                <h3
                  className={`text-base font-serif font-normal ${
                    activeStage === idx ? "text-white" : "text-stone-300"
                  }`}
                >
                  {stage.title}
                </h3>
              </div>
            </button>
          ))}
        </div>

        {/* Active Stage Showcase Panel */}
        <div className="bg-stone-900/90 border border-stone-800 rounded-sm p-6 sm:p-8 lg:p-10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Visual Media Column (7 Cols) */}
            <div className="lg:col-span-7">
              <div className="relative aspect-[16/10] w-full rounded-sm overflow-hidden border border-stone-800 shadow-xl bg-stone-950 group" style={{ position: "relative" }}>
                <Image
                  src={currentStage.image}
                  alt={currentStage.altText}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover transition-all duration-700 group-hover:scale-103"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent pointer-events-none" />

                {/* Stage Badge on Image */}
                <div className="absolute top-4 left-4">
                  <Badge variant="gold" size="sm" className="bg-stone-950/85 backdrop-blur-md border-[#C5A880]/50">
                    <Sparkles className="w-3 h-3 text-[#C5A880]" />
                    <span>{currentStage.badge}</span>
                  </Badge>
                </div>

                {/* Caption Bar */}
                <div className="absolute bottom-3 left-4 right-4 text-xs text-stone-300 font-light bg-stone-950/80 backdrop-blur-md p-2.5 rounded-sm border border-stone-800">
                  {currentStage.caption}
                </div>
              </div>
            </div>

            {/* Stage Narrative Column (5 Cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <div className="flex items-center gap-2 text-[#C5A880] mb-1.5">
                  <DraftingCompass className="w-4 h-4" />
                  <span className="text-xs uppercase tracking-widest font-semibold">
                    Studio Methodology
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif text-white leading-tight">
                  {currentStage.title}
                </h3>
                <p className="text-xs font-serif text-[#E0C7A6] tracking-wide mt-1">
                  {currentStage.marathiTitle}
                </p>
              </div>

              <p className="text-sm text-stone-300 font-light leading-relaxed">
                {currentStage.description}
              </p>

              {/* Key Deliverables */}
              <div className="pt-2 border-t border-stone-800/80">
                <h4 className="text-xs uppercase tracking-wider text-stone-400 font-semibold mb-3">
                  Key Studio Deliverables
                </h4>
                <ul className="space-y-2">
                  {currentStage.deliverables.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-stone-300 font-light">
                      <CheckCircle2 className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Action */}
              <div className="pt-4 flex flex-wrap items-center gap-3">
                <Button variant="gold" size="sm" href="/process">
                  <span>Explore Full Process</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
                <Button variant="outline" size="sm" href="/portfolio" className="text-stone-300 border-stone-700">
                  <span>View Projects</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
