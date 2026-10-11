"use client";

import React, { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { hasWhatsApp, getWhatsAppUrl, siteConfig } from "@/config/site";
import Link from "next/link";

export function FloatingWhatsApp() {
  const [showTooltip, setShowTooltip] = useState(false);
  const whatsAppAvailable = hasWhatsApp();
  const whatsAppUrl = getWhatsAppUrl();

  return (
    <aside
      aria-label="Quick Communication"
      className="fixed bottom-6 right-6 z-40 flex flex-col items-end pointer-events-auto"
    >
      {/* Floating Tooltip Bubble */}
      {showTooltip && (
        <div className="mb-3 max-w-xs p-3.5 bg-stone-900 text-stone-100 rounded-lg shadow-2xl border border-stone-700 text-xs font-light animate-in fade-in slide-in-from-bottom-2 duration-200 relative">
          <button
            onClick={() => setShowTooltip(false)}
            className="absolute top-1.5 right-1.5 text-stone-400 hover:text-white p-0.5 rounded-full"
            aria-label="Dismiss quick help"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          <div className="font-medium text-[#C5A880] mb-1 font-serif text-sm">
            {siteConfig.name}
          </div>
          <p className="leading-relaxed">
            {whatsAppAvailable
              ? "Chat directly with our architects for project inquiries and estimations."
              : "Have a design in mind? Submit your requirements for a free architectural consultation."}
          </p>
        </div>
      )}

      {/* Floating Action Button */}
      {whatsAppAvailable ? (
        <a
          href={whatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setShowTooltip(true)}
          className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl hover:shadow-emerald-900/40 hover:scale-105 active:scale-95 transition-all duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-400/50"
          aria-label="Chat with Sanrachana Design Studio on WhatsApp"
        >
          <MessageCircle className="w-7 h-7" />
          {/* Notification Ping Badge */}
          <span className="absolute top-0 right-0 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-white border-2 border-emerald-600"></span>
          </span>
        </a>
      ) : (
        <Link
          href="/contact"
          onMouseEnter={() => setShowTooltip(true)}
          className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-[#C5A880] hover:bg-[#b5966c] text-stone-950 shadow-xl hover:shadow-[#C5A880]/30 hover:scale-105 active:scale-95 transition-all duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#C5A880]/50"
          aria-label="Contact Sanrachana Design Studio"
        >
          <MessageCircle className="w-7 h-7" />
          <span className="absolute top-0 right-0 flex h-3.5 w-3.5">
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-stone-950"></span>
          </span>
        </Link>
      )}
    </aside>
  );
}
