import React from "react";
import { Sparkles, ShieldCheck, PenTool, Award } from "lucide-react";

export function StatsOverview() {
  const stats = [
    {
      icon: <PenTool className="w-5 h-5 text-[#C5A880]" />,
      value: "100%",
      label: "Custom Architecture",
      description: "Tailored to site topography & lifestyle",
    },
    {
      icon: <Sparkles className="w-5 h-5 text-[#C5A880]" />,
      value: "4K UHD",
      label: "Photorealistic 3D",
      description: "Hyper-accurate material & lighting simulation",
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-[#C5A880]" />,
      value: "Millimeter",
      label: "Drawing Precision",
      description: "Complete GFC drawings & itemized BOQ",
    },
    {
      icon: <Award className="w-5 h-5 text-[#C5A880]" />,
      value: "Turnkey",
      label: "Execution Support",
      description: "Single-window accountability from raw shell to handover",
    },
  ];

  return (
    <section className="py-12 bg-stone-900 border-b border-stone-800 text-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center sm:items-start text-center sm:text-left p-4 rounded-sm border border-stone-800/60 bg-stone-950/40 hover:border-[#C5A880]/40 transition-colors"
            >
              <div className="p-2 rounded-full bg-stone-900 border border-stone-800 mb-3">
                {stat.icon}
              </div>
              <div className="text-2xl sm:text-3xl font-serif font-normal text-white">
                {stat.value}
              </div>
              <div className="text-xs uppercase tracking-wider font-semibold text-[#C5A880] mt-1">
                {stat.label}
              </div>
              <div className="text-xs text-stone-400 font-light mt-1">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
