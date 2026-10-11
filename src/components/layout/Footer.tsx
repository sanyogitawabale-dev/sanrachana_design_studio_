import React from "react";
import Link from "next/link";
import { siteConfig, hasWhatsApp, getWhatsAppUrl, hasPhone, getPhoneUrl, hasEmail, getMailtoUrl } from "@/config/site";
import { footerLinks } from "@/config/navigation";
import { MessageCircle, Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";
import { InstagramIcon } from "@/components/ui/Icons";
import { StudioLogo } from "@/components/common/StudioLogo";

export function Footer() {
  const whatsAppAvailable = hasWhatsApp();
  const phoneAvailable = hasPhone();
  const emailAvailable = hasEmail();

  return (
    <footer className="bg-stone-950 text-stone-300 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-stone-800/80">
          {/* Column 1: Studio Brand & Narrative */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-flex group" aria-label="Sanrachana Design Studio Home">
              <StudioLogo variant="compact" size="md" />
            </Link>

            <p className="text-sm text-stone-400 font-light leading-relaxed max-w-sm">
              {siteConfig.description}
            </p>

            {/* Official Instagram Badge */}
            <div className="pt-2">
              <a
                href={siteConfig.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-sm bg-stone-900 border border-stone-800 hover:border-[#C5A880]/60 text-xs text-stone-200 hover:text-white transition-colors group"
              >
                <InstagramIcon className="w-4 h-4 text-[#C5A880]" />
                <span>Follow on Instagram:</span>
                <span className="font-mono text-[#C5A880] group-hover:underline">
                  {siteConfig.instagram.handle}
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 text-stone-500 group-hover:text-stone-300" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h3 className="text-xs uppercase tracking-widest text-[#C5A880] font-semibold">
              Explore
            </h3>
            <ul className="space-y-2 text-sm font-light">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-white transition-colors hover:translate-x-0.5 inline-block"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Core Disciplines */}
          <div className="space-y-3">
            <h3 className="text-xs uppercase tracking-widest text-[#C5A880] font-semibold">
              Disciplines
            </h3>
            <ul className="space-y-2 text-sm font-light">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-white transition-colors hover:translate-x-0.5 inline-block"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Inquiries */}
          <div className="space-y-3">
            <h3 className="text-xs uppercase tracking-widest text-[#C5A880] font-semibold">
              Get in Touch
            </h3>
            <ul className="space-y-3 text-sm font-light">
              {whatsAppAvailable && (
                <li>
                  <a
                    href={getWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 hover:text-emerald-400 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>WhatsApp Chat</span>
                  </a>
                </li>
              )}

              {phoneAvailable && (
                <li>
                  <a
                    href={getPhoneUrl()}
                    className="inline-flex items-center gap-2 hover:text-white transition-colors"
                  >
                    <Phone className="w-4 h-4 text-[#C5A880] shrink-0" />
                    <span>{siteConfig.contact.phone}</span>
                  </a>
                </li>
              )}

              {emailAvailable && (
                <li>
                  <a
                    href={getMailtoUrl()}
                    className="inline-flex items-center gap-2 hover:text-white transition-colors break-all"
                  >
                    <Mail className="w-4 h-4 text-[#C5A880] shrink-0" />
                    <span>{siteConfig.contact.email}</span>
                  </a>
                </li>
              )}

              <li>
                <div className="inline-flex items-start gap-2 text-stone-400">
                  <MapPin className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                  <span>
                    {siteConfig.contact.address || "Architecture & Interior Studio • India"}
                  </span>
                </div>
              </li>

              <li className="pt-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1 text-xs text-[#C5A880] font-medium hover:underline uppercase tracking-wider"
                >
                  <span>Send Website Inquiry</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar & Legal Disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500 font-light">
          <p>
            © {new Date().getFullYear()} {siteConfig.name} ({siteConfig.devanagariName}). All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-stone-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/contact" className="hover:text-stone-300 transition-colors">
              Consultation
            </Link>
            <a
              href={siteConfig.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-stone-300 transition-colors"
            >
              Instagram Profile
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
