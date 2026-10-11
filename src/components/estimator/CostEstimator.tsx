"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { CostEstimatorInput } from "@/types";
import { calculateProjectEstimate } from "@/lib/estimator";
import { formatINR, formatSqFt } from "@/lib/utils";
import { buildEstimatorWhatsAppMessage, isWhatsAppAvailable } from "@/lib/whatsapp";
import { siteConfig, getWhatsAppUrl } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  Calculator,
  MessageCircle,
  ArrowRight,
  Info,
  CheckCircle2,
  Sparkles,
  Sliders,
} from "lucide-react";

export function CostEstimator() {
  const [propertyType, setPropertyType] =
    useState<CostEstimatorInput["propertyType"]>("3bhk");
  const [carpetAreaSqFt, setCarpetAreaSqFt] = useState<number>(1800);
  const [serviceCategory, setServiceCategory] =
    useState<CostEstimatorInput["serviceCategory"]>("interior");
  const [finishTier, setFinishTier] =
    useState<CostEstimatorInput["finishTier"]>("premium");
  const [include3dWalkthrough, setInclude3dWalkthrough] = useState<boolean>(true);
  const [includeVastuPlanning, setIncludeVastuPlanning] = useState<boolean>(true);
  const [includeSiteSupervision, setIncludeSiteSupervision] = useState<boolean>(false);

  const input: CostEstimatorInput = useMemo(
    () => ({
      propertyType,
      carpetAreaSqFt,
      serviceCategory,
      finishTier,
      include3dWalkthrough,
      includeVastuPlanning,
      includeSiteSupervision,
    }),
    [
      propertyType,
      carpetAreaSqFt,
      serviceCategory,
      finishTier,
      include3dWalkthrough,
      includeVastuPlanning,
      includeSiteSupervision,
    ]
  );

  const result = useMemo(() => calculateProjectEstimate(input), [input]);

  const whatsAppAvailable = isWhatsAppAvailable();
  const whatsAppMessage = useMemo(
    () => buildEstimatorWhatsAppMessage(input, result),
    [input, result]
  );
  const whatsAppUrl = whatsAppAvailable ? getWhatsAppUrl(whatsAppMessage) : "";

  // Contact form pre-fill query URL
  const contactFormUrl = `/contact?service=${encodeURIComponent(
    result.breakdown.baseService
  )}&propertyType=${encodeURIComponent(propertyType)}&area=${encodeURIComponent(
    carpetAreaSqFt
  )}&budget=${encodeURIComponent(
    `${formatINR(result.estimatedMinTotal)} - ${formatINR(result.estimatedMaxTotal)}`
  )}`;

  return (
    <section className="py-12 sm:py-16 bg-stone-950 text-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Interactive Controls (7 Cols) */}
          <div className="lg:col-span-7 bg-stone-900 border border-stone-800 rounded-sm p-6 sm:p-8 space-y-8 shadow-xl">
            <div className="flex items-center justify-between pb-4 border-b border-stone-800">
              <div className="flex items-center gap-2">
                <Sliders className="w-5 h-5 text-[#C5A880]" />
                <h2 className="text-xl font-serif text-white">Project Scope Parameters</h2>
              </div>
              <Badge variant="gold" size="sm">
                Interactive Calculator
              </Badge>
            </div>

            {/* 1. Property Type */}
            <div className="space-y-3">
              <label className="block text-xs uppercase tracking-wider font-semibold text-stone-300">
                1. Property / Structure Type
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: "1bhk", label: "1 BHK Flat" },
                  { id: "2bhk", label: "2 BHK Flat" },
                  { id: "3bhk", label: "3 BHK Flat / Floor" },
                  { id: "4bhk-plus", label: "4+ BHK Penthouse" },
                  { id: "villa", label: "Private Villa" },
                  { id: "office", label: "Office Studio" },
                  { id: "retail", label: "Retail / Boutique" },
                  { id: "other", label: "Custom Architecture" },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() =>
                      setPropertyType(item.id as CostEstimatorInput["propertyType"])
                    }
                    className={`px-3 py-2.5 rounded-sm text-xs font-medium tracking-wide border transition-all text-center ${
                      propertyType === item.id
                        ? "bg-[#C5A880] text-stone-950 border-[#C5A880] font-semibold"
                        : "bg-stone-950 text-stone-300 border-stone-800 hover:border-stone-700"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Carpet Area */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs uppercase tracking-wider font-semibold text-stone-300">
                  2. Approximate Carpet Area
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min={200}
                    max={20000}
                    step={50}
                    value={carpetAreaSqFt}
                    onChange={(e) =>
                      setCarpetAreaSqFt(Math.max(100, Number(e.target.value) || 100))
                    }
                    className="w-24 px-2 py-1 bg-stone-950 border border-stone-800 rounded-sm text-sm text-center font-mono text-[#E0C7A6] focus:outline-none focus:border-[#C5A880]"
                  />
                  <span className="text-xs text-stone-400">sq. ft.</span>
                </div>
              </div>

              <input
                type="range"
                min={300}
                max={6000}
                step={50}
                value={carpetAreaSqFt}
                onChange={(e) => setCarpetAreaSqFt(Number(e.target.value))}
                className="w-full accent-[#C5A880] cursor-pointer h-2 bg-stone-800 rounded-lg appearance-none"
              />

              <div className="flex justify-between text-[11px] text-stone-500 font-mono">
                <span>300 sq.ft</span>
                <span>1,500 sq.ft</span>
                <span>3,000 sq.ft</span>
                <span>6,000+ sq.ft</span>
              </div>
            </div>

            {/* 3. Service Category */}
            <div className="space-y-3">
              <label className="block text-xs uppercase tracking-wider font-semibold text-stone-300">
                3. Primary Service Discipline
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  {
                    id: "architectural",
                    title: "Architectural Planning & Facade",
                    desc: "2D Layouts, Massing, Elevation & GFC Drawings",
                  },
                  {
                    id: "interior",
                    title: "Interior Architecture & Styling",
                    desc: "Material Specifications, 3D Renders & Millwork BOQ",
                  },
                  {
                    id: "3d-only",
                    title: "3D Elevation & Visualization",
                    desc: "4K Photorealistic exterior/interior render sets",
                  },
                  {
                    id: "turnkey-full",
                    title: "Turnkey Design & Execution",
                    desc: "End-to-end civil, carpentry, electrical & finishes",
                  },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() =>
                      setServiceCategory(
                        item.id as CostEstimatorInput["serviceCategory"]
                      )
                    }
                    className={`p-3.5 rounded-sm text-left border transition-all ${
                      serviceCategory === item.id
                        ? "bg-stone-950 border-[#C5A880] ring-1 ring-[#C5A880]"
                        : "bg-stone-950/60 border-stone-800 hover:border-stone-700"
                    }`}
                  >
                    <div
                      className={`text-xs font-semibold ${
                        serviceCategory === item.id
                          ? "text-[#C5A880]"
                          : "text-stone-200"
                      }`}
                    >
                      {item.title}
                    </div>
                    <div className="text-[11px] text-stone-400 font-light mt-1">
                      {item.desc}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Finish & Craftsmanship Tier */}
            <div className="space-y-3">
              <label className="block text-xs uppercase tracking-wider font-semibold text-stone-300">
                4. Material Specification Tier
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {[
                  {
                    id: "standard",
                    title: "Essential",
                    desc: "Clean contemporary laminates & standard fittings",
                  },
                  {
                    id: "premium",
                    title: "Premium",
                    desc: "Fluted veneers, quartz countertops & architectural lighting",
                  },
                  {
                    id: "luxury",
                    title: "Bespoke Luxury",
                    desc: "Italian marble, brass trims, acoustic acoustics & automation",
                  },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() =>
                      setFinishTier(item.id as CostEstimatorInput["finishTier"])
                    }
                    className={`p-3 rounded-sm text-left border transition-all ${
                      finishTier === item.id
                        ? "bg-stone-950 border-[#C5A880] ring-1 ring-[#C5A880]"
                        : "bg-stone-950/60 border-stone-800 hover:border-stone-700"
                    }`}
                  >
                    <div
                      className={`text-xs font-semibold ${
                        finishTier === item.id ? "text-[#C5A880]" : "text-stone-200"
                      }`}
                    >
                      {item.title}
                    </div>
                    <div className="text-[11px] text-stone-400 font-light mt-0.5">
                      {item.desc}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 5. Add-on Options */}
            <div className="space-y-3">
              <label className="block text-xs uppercase tracking-wider font-semibold text-stone-300">
                5. Scope Enhancements (Optional)
              </label>
              <div className="space-y-2">
                <label className="flex items-center gap-3 p-3 bg-stone-950/60 border border-stone-800 rounded-sm cursor-pointer hover:border-stone-700">
                  <input
                    type="checkbox"
                    checked={include3dWalkthrough}
                    onChange={(e) => setInclude3dWalkthrough(e.target.checked)}
                    className="w-4 h-4 accent-[#C5A880] rounded"
                  />
                  <div className="text-xs text-stone-300">
                    <span className="font-semibold text-white">
                      Photorealistic 3D VR Walkthrough
                    </span>{" "}
                    (Cinematic camera animation & lighting mood studies)
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 bg-stone-950/60 border border-stone-800 rounded-sm cursor-pointer hover:border-stone-700">
                  <input
                    type="checkbox"
                    checked={includeVastuPlanning}
                    onChange={(e) => setIncludeVastuPlanning(e.target.checked)}
                    className="w-4 h-4 accent-[#C5A880] rounded"
                  />
                  <div className="text-xs text-stone-300">
                    <span className="font-semibold text-white">
                      Vastu Shastra Directional Audit
                    </span>{" "}
                    (Directional harmony for master layout & utilities)
                  </div>
                </label>

                {serviceCategory !== "turnkey-full" && (
                  <label className="flex items-center gap-3 p-3 bg-stone-950/60 border border-stone-800 rounded-sm cursor-pointer hover:border-stone-700">
                    <input
                      type="checkbox"
                      checked={includeSiteSupervision}
                      onChange={(e) => setIncludeSiteSupervision(e.target.checked)}
                      className="w-4 h-4 accent-[#C5A880] rounded"
                    />
                    <div className="text-xs text-stone-300">
                      <span className="font-semibold text-white">
                        Periodic Site Supervision & BOQ Audits
                      </span>{" "}
                      (On-site verification of contractor drawing compliance)
                    </div>
                  </label>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Ballpark Quote Summary (5 Cols) */}
          <div className="lg:col-span-5 sticky top-28 space-y-6">
            <div className="bg-stone-900 border-2 border-[#C5A880]/60 rounded-sm p-6 sm:p-8 space-y-6 shadow-2xl">
              <div className="flex items-center justify-between pb-4 border-b border-stone-800">
                <div className="flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-[#C5A880]" />
                  <h3 className="text-lg font-serif text-white">Estimated Investment Range</h3>
                </div>
                <Sparkles className="w-4 h-4 text-[#C5A880]" />
              </div>

              {/* Min - Max Total Range */}
              <div className="p-5 bg-stone-950 rounded-sm border border-stone-800 text-center">
                <div className="text-[11px] uppercase tracking-widest text-[#C5A880] font-semibold mb-1">
                  Indicative Ballpark Estimate
                </div>
                <div className="text-2xl sm:text-3xl font-serif text-white font-normal">
                  {formatINR(result.estimatedMinTotal)}{" "}
                  <span className="text-stone-500 font-sans text-lg">–</span>{" "}
                  {formatINR(result.estimatedMaxTotal)}
                </div>
                <div className="mt-2 text-xs text-stone-400 font-light">
                  Effective approx. rate:{" "}
                  <span className="font-mono text-[#E0C7A6]">
                    ₹{result.perSqFtRateMin} – ₹{result.perSqFtRateMax}
                  </span>{" "}
                  / sq. ft.
                </div>
              </div>

              {/* Itemized Summary */}
              <div className="space-y-2.5 text-xs text-stone-300">
                <div className="flex justify-between py-1.5 border-b border-stone-800">
                  <span className="text-stone-400">Target Area:</span>
                  <span className="font-mono text-white font-medium">
                    {formatSqFt(result.breakdown.area)}
                  </span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-stone-800">
                  <span className="text-stone-400">Discipline:</span>
                  <span className="text-right text-stone-200 max-w-[200px]">
                    {result.breakdown.baseService}
                  </span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-stone-800">
                  <span className="text-stone-400">Finish Level:</span>
                  <span className="text-stone-200">{result.breakdown.finishLevel}</span>
                </div>
                {result.breakdown.addons.length > 0 && (
                  <div className="py-1.5 border-b border-stone-800 space-y-1">
                    <span className="text-stone-400 block">Add-ons Included:</span>
                    {result.breakdown.addons.map((a, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-stone-300 pl-2">
                        <CheckCircle2 className="w-3 h-3 text-[#C5A880]" />
                        <span>{a}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                {whatsAppAvailable && (
                  <Button
                    variant="gold"
                    size="md"
                    href={whatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    leftIcon={<MessageCircle className="w-4 h-4" />}
                    className="w-full"
                  >
                    Send Estimate to WhatsApp
                  </Button>
                )}

                <Button
                  variant={whatsAppAvailable ? "outline" : "gold"}
                  size="md"
                  href={contactFormUrl}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                  className="w-full text-stone-200 border-stone-700 hover:bg-stone-800"
                >
                  Request Tailored Project Quote
                </Button>
              </div>

              {/* Notes and Disclaimers */}
              <div className="p-3.5 bg-stone-950/70 border border-stone-800/80 rounded-sm text-[11px] text-stone-400 font-light leading-relaxed space-y-1.5">
                <div className="flex items-center gap-1.5 text-[#C5A880] font-semibold">
                  <Info className="w-3.5 h-3.5 shrink-0" />
                  <span>Transparent Estimation Policy</span>
                </div>
                {result.notes.map((note, idx) => (
                  <p key={idx}>• {note}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
