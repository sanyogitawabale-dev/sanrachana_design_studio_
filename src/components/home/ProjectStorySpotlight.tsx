"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  MapPin,
  Sparkles,
  Layers,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  Calendar,
  Maximize2,
} from "lucide-react";
import { InstagramIcon } from "@/components/ui/Icons";

export function ProjectStorySpotlight() {
  const [selectedStory, setSelectedStory] = useState<number>(0);

  const stories = [
    {
      id: "story-monolith-villa",
      title: "The Monolith Villa: Cantilevers & Basalt Cladding",
      marathiTitle: "द मोनोलिथ विला - वास्तुशिल्प गाथा",
      category: "Residential Architecture & 3D Elevation",
      location: "Pune / Suburban Greens",
      year: "2024",
      scale: "4,800 sq. ft. Built-up",
      coverImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80",
      sketchImage: "/images/hero-concept-sketch.jpg",
      instagramUrl: "https://www.instagram.com/sanrachana_design_studio_/",
      intent:
        "To establish a bold architectural statement rooted in monolithic basalt stone textures and cantilevered upper decks while maximizing privacy and passive cross-ventilation.",
      materials: [
        "Basalt Dry-Stack Stone Cladding",
        "Raw Concrete Fluted Slabs",
        "Floor-to-Ceiling Thermal Glazing",
        "2700K Architectural Twilight Profile Lighting",
      ],
      processNarrative: [
        "Phase 1: Solar path and wind tunnel modeling to determine optimal roof overhang depths.",
        "Phase 2: Cantilever structural engineering and 3D twilight elevation simulation.",
        "Phase 3: Turnkey facade execution, bespoke landscape integration, and handover.",
      ],
    },
    {
      id: "story-cabin-interior",
      title: "Executive Cabin: Acoustic Wood & Bespoke Millwork",
      marathiTitle: "कार्यकारी केबिन - रचना व अनुभव",
      category: "Cabin & Commercial Interior",
      location: "Kalwa, Thane",
      year: "2024",
      scale: "450 sq. ft. Workspace",
      coverImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80",
      sketchImage: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1600&q=80",
      instagramUrl: "https://www.instagram.com/sanrachana_design_studio_/",
      intent:
        "Designing a focused executive sanctuary with acoustic paneling, concealed cable channels, and ergonomic custom millwork tailored for daily productivity and client hospitality in Kalwa, Thane.",
      materials: [
        "Acoustic Fluted Teak Paneling",
        "Brushed Bronze Hardware & Pulls",
        "Anti-Glare Recessed Task Lighting",
        "Matte Italian Leather Seating",
      ],
      processNarrative: [
        "Phase 1: Ergonomic workflow audit and acoustic noise abatement planning.",
        "Phase 2: Custom executive desk blueprints and precision millwork fabrication.",
        "Phase 3: Concealed profile lighting installation and final turnkey commissioning.",
      ],
    },
    {
      id: "story-serene-penthouse",
      title: "Serene Japandi Penthouse: Micro-Cement & Teak",
      marathiTitle: "शांत जॅपंडी पेंटहाउस - आंतरिक शांतता",
      category: "Luxury Residential Interior",
      location: "Skyline Heights, Thane",
      year: "2024",
      scale: "3,200 sq. ft. Penthouse",
      coverImage: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80",
      sketchImage: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1600&q=80",
      instagramUrl: "https://www.instagram.com/sanrachana_design_studio_/",
      intent:
        "Transforming a bare high-rise apartment into a serene sanctuary balancing raw micro-cement textures, natural teak warmth, and expansive panoramic city fenestrations.",
      materials: [
        "Seamless Micro-Cement Wall Surfaces",
        "Fluted Teak Wall Louvers",
        "Calacatta Gold Marble Island",
        "Custom Bronze-Framed Display Joinery",
      ],
      processNarrative: [
        "Phase 1: Complete bare shell spatial reconfiguration and MEP zoning.",
        "Phase 2: Custom joinery prototypes and micro-cement sample testing on site.",
        "Phase 3: Turnkey handover with integrated ambient automation.",
      ],
    },
  ];

  const story = stories[selectedStory];

  return (
    <section className="py-20 sm:py-28 bg-[#0e1014] text-[#f4f0e8] border-b border-stone-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          dark
          badge="Project Case Studies"
          devanagariSubtitle="प्रकल्पांची तपशीलवार कथा"
          title="Project Stories: The Process Behind the Beauty"
          description="A true space is more than an aesthetic photograph. Here is how our studio approaches design intent, sensory materials, and engineering rigor."
        />

        {/* Story Selector Buttons */}
        <div className="flex flex-wrap items-center gap-2 mb-8 pb-4 border-b border-stone-800">
          {stories.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelectedStory(idx)}
              className={`px-4 py-2 rounded-sm text-xs font-serif tracking-wide transition-all ${
                selectedStory === idx
                  ? "bg-[#C5A880] text-stone-950 font-semibold shadow-md"
                  : "bg-stone-900 text-stone-400 hover:text-stone-200 border border-stone-800"
              }`}
            >
              {item.title.split(":")[0]}
            </button>
          ))}
        </div>

        {/* Active Project Case Study Display */}
        <div className="bg-stone-950 border border-stone-800 rounded-sm overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left Media Collage (6 Cols) */}
            <div className="lg:col-span-6 relative aspect-[4/3] lg:aspect-auto min-h-[350px] lg:min-h-[550px] bg-stone-900 overflow-hidden" style={{ position: "relative" }}>
              <Image
                src={story.coverImage}
                alt={story.title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent pointer-events-none" />

              {/* Badges on Image */}
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                <Badge variant="gold" size="sm" className="bg-stone-950/85 backdrop-blur-md border-[#C5A880]/50">
                  <Sparkles className="w-3 h-3 text-[#C5A880]" />
                  <span>{story.category}</span>
                </Badge>
              </div>

              {/* Bottom Metadata Bar */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between p-3 bg-stone-950/85 backdrop-blur-md rounded-sm border border-stone-800 text-xs text-stone-300">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#C5A880]" />
                  {story.location}
                </span>
                <span className="font-mono text-stone-400">{story.scale}</span>
                <span className="flex items-center gap-1 text-stone-400">
                  <Calendar className="w-3 h-3 text-[#C5A880]" />
                  {story.year}
                </span>
              </div>
            </div>

            {/* Right Narrative & Process Breakdown (6 Cols) */}
            <div className="lg:col-span-6 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center justify-between text-xs text-stone-400 mb-2">
                  <span className="uppercase tracking-widest text-[#C5A880] font-semibold">
                    Editorial Case Study
                  </span>
                  <span className="font-serif italic text-stone-300">
                    {story.marathiTitle}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-serif text-white leading-tight">
                  {story.title}
                </h3>

                {/* Design Intent */}
                <div className="mt-4 pt-4 border-t border-stone-800/80">
                  <h4 className="text-xs uppercase tracking-wider text-stone-400 font-semibold mb-1.5">
                    Design Intent & Spatial Strategy
                  </h4>
                  <p className="text-sm text-stone-300 font-light leading-relaxed">
                    {story.intent}
                  </p>
                </div>

                {/* Material Palette */}
                <div className="mt-5 pt-4 border-t border-stone-800/80">
                  <h4 className="text-xs uppercase tracking-wider text-stone-400 font-semibold mb-2 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>Sensory Material Palette</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {story.materials.map((mat, i) => (
                      <div
                        key={i}
                        className="text-xs text-stone-300 font-light flex items-center gap-2 p-1.5 rounded-xs bg-stone-900 border border-stone-800"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
                        <span>{mat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Process Steps */}
                <div className="mt-5 pt-4 border-t border-stone-800/80">
                  <h4 className="text-xs uppercase tracking-wider text-stone-400 font-semibold mb-2">
                    Process Execution Narrative
                  </h4>
                  <ul className="space-y-1.5">
                    {story.processNarrative.map((step, i) => (
                      <li key={i} className="text-xs text-stone-300 font-light flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A880] shrink-0 mt-0.5" />
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Links */}
              <div className="pt-6 border-t border-stone-800 flex flex-wrap items-center justify-between gap-4">
                <a
                  href={story.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-[#E0C7A6] hover:text-white transition-colors"
                >
                  <InstagramIcon className="w-4 h-4 text-[#C5A880]" />
                  <span>View Post on Instagram</span>
                  <ExternalLink className="w-3 h-3 text-stone-500" />
                </a>

                <div className="flex items-center gap-2">
                  <Button variant="gold" size="sm" href="/contact">
                    <span>Start Similar Project</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
