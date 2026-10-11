import React from "react";
import { siteConfig, hasWhatsApp, getWhatsAppUrl, hasPhone, getPhoneUrl, hasEmail, getMailtoUrl } from "@/config/site";
import { MessageCircle, Phone, Mail, Clock, MapPin, ArrowUpRight } from "lucide-react";
import { InstagramIcon } from "@/components/ui/Icons";

export function ContactInfoCards() {
  const whatsAppAvailable = hasWhatsApp();
  const phoneAvailable = hasPhone();
  const emailAvailable = hasEmail();

  return (
    <div className="space-y-6">
      {/* 1. Official Instagram Card */}
      <a
        href={siteConfig.instagram.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group block p-6 rounded-sm bg-stone-900 border border-stone-800 hover:border-[#C5A880] transition-all duration-300 shadow-md"
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-full bg-gradient-to-tr from-amber-500/20 to-purple-500/20 text-[#C5A880] border border-stone-700">
              <InstagramIcon className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest text-[#C5A880] font-semibold">
                Official Social Destination
              </div>
              <div className="text-base font-serif text-white group-hover:text-[#C5A880] transition-colors mt-0.5">
                {siteConfig.instagram.handle}
              </div>
            </div>
          </div>
          <ArrowUpRight className="w-4 h-4 text-stone-500 group-hover:text-stone-300 transition-colors" />
        </div>
        <p className="mt-3 text-xs text-stone-400 font-light leading-relaxed">
          Explore ongoing construction sites, reel walkthroughs, material palettes, and 3D elevation releases.
        </p>
      </a>

      {/* 2. Direct WhatsApp Click-to-Chat */}
      {whatsAppAvailable ? (
        <a
          href={getWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="group block p-6 rounded-sm bg-stone-900 border border-stone-800 hover:border-emerald-500/60 transition-all duration-300 shadow-md"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3.5">
              <div className="p-3 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-widest text-emerald-400 font-semibold">
                  WhatsApp Direct Chat
                </div>
                <div className="text-base font-serif text-white group-hover:text-emerald-300 transition-colors mt-0.5">
                  Instant Design Inquiry
                </div>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-stone-500 group-hover:text-stone-300 transition-colors" />
          </div>
          <p className="mt-3 text-xs text-stone-400 font-light leading-relaxed">
            Fastest way to share floor plans, plot sketches, or initiate an architectural consultation.
          </p>
        </a>
      ) : (
        <div className="p-6 rounded-sm bg-stone-900/60 border border-stone-800 text-stone-400">
          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-full bg-stone-950 text-stone-500 border border-stone-800">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest text-stone-400 font-semibold">
                WhatsApp Chat
              </div>
              <div className="text-xs text-stone-400 mt-0.5 font-light">
                WhatsApp connectivity is active via inquiry form &amp; Instagram. (Direct number can be configured anytime via environment variables).
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. Direct Phone Call */}
      {phoneAvailable ? (
        <a
          href={getPhoneUrl()}
          className="group block p-6 rounded-sm bg-stone-900 border border-stone-800 hover:border-[#C5A880] transition-all duration-300 shadow-md"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3.5">
              <div className="p-3 rounded-full bg-stone-950 text-[#C5A880] border border-stone-800">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-widest text-[#C5A880] font-semibold">
                  Direct Phone Call
                </div>
                <div className="text-base font-mono text-white group-hover:text-[#C5A880] transition-colors mt-0.5">
                  {siteConfig.contact.phone}
                </div>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-stone-500 group-hover:text-stone-300 transition-colors" />
          </div>
        </a>
      ) : null}

      {/* 4. Direct Email */}
      {emailAvailable ? (
        <a
          href={getMailtoUrl("Project Inquiry - Sanrachana Design Studio")}
          className="group block p-6 rounded-sm bg-stone-900 border border-stone-800 hover:border-[#C5A880] transition-all duration-300 shadow-md"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3.5">
              <div className="p-3 rounded-full bg-stone-950 text-[#C5A880] border border-stone-800">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-widest text-[#C5A880] font-semibold">
                  Electronic Mail
                </div>
                <div className="text-base font-serif text-white group-hover:text-[#C5A880] transition-colors mt-0.5 break-all">
                  {siteConfig.contact.email}
                </div>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-stone-500 group-hover:text-stone-300 transition-colors" />
          </div>
        </a>
      ) : null}

      {/* 5. Business Working Hours */}
      <div className="p-6 rounded-sm bg-stone-900 border border-stone-800 shadow-md space-y-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-full bg-stone-950 text-[#C5A880] border border-stone-800">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-[#C5A880] font-semibold">
              Consultation Hours
            </div>
            <div className="text-xs text-stone-300 font-light mt-0.5">
              {siteConfig.workingHours.weekdays}
            </div>
            <div className="text-xs text-stone-400 font-light">
              {siteConfig.workingHours.sunday}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
