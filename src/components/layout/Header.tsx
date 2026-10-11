"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { mainNavItems } from "@/config/navigation";
import { siteConfig, hasWhatsApp, getWhatsAppUrl } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { MessageCircle, Menu, X } from "lucide-react";
import { InstagramIcon } from "@/components/ui/Icons";
import { StudioLogo } from "@/components/common/StudioLogo";
import { MobileNav } from "./MobileNav";
import { cn } from "@/lib/utils";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const whatsAppAvailable = hasWhatsApp();
  const whatsAppUrl = getWhatsAppUrl();

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
          isScrolled
            ? "bg-stone-950/90 backdrop-blur-md border-b border-stone-800/80 py-3.5 shadow-lg shadow-black/20"
            : "bg-gradient-to-b from-stone-950/90 via-stone-950/50 to-transparent py-5"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo & Name */}
          <Link
            href="/"
            className="group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] rounded-sm"
            aria-label="Sanrachana Design Studio Home"
          >
            <StudioLogo variant="compact" size="md" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Main Navigation">
            {mainNavItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "px-3.5 py-2 text-xs xl:text-sm tracking-wider uppercase transition-colors relative rounded-sm font-medium",
                    isActive
                      ? "text-[#C5A880]"
                      : "text-stone-300 hover:text-white hover:bg-stone-800/50"
                  )}
                >
                  {item.title}
                  {item.badge && (
                    <span className="ml-1.5 px-1.5 py-0.2 text-[9px] bg-[#C5A880]/20 text-[#E0C7A6] rounded-full uppercase tracking-tighter">
                      {item.badge}
                    </span>
                  )}
                  {isActive && (
                    <span
                      className="absolute bottom-0 left-3.5 right-3.5 h-[2px] bg-[#C5A880]"
                      aria-hidden="true"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={siteConfig.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-stone-300 hover:text-[#C5A880] hover:bg-stone-800/60 rounded-full transition-colors"
              aria-label="Visit Sanrachana Design Studio on Instagram"
              title="Instagram @sanrachana_design_studio_"
            >
              <InstagramIcon className="w-4 h-4" />
            </a>

            {whatsAppAvailable && (
              <Button
                variant="outline"
                size="sm"
                href={whatsAppUrl}
                leftIcon={<MessageCircle className="w-3.5 h-3.5 text-emerald-400" />}
                className="text-stone-200 border-stone-700 hover:border-emerald-500/50 hover:bg-stone-900"
              >
                WhatsApp
              </Button>
            )}

            <Button
              variant="gold"
              size="sm"
              href="/contact"
            >
              Book Consultation
            </Button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <Button
              variant="gold"
              size="sm"
              href="/contact"
              className="text-xs px-3 py-1.5"
            >
              Consult
            </Button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-stone-300 hover:text-white rounded-sm hover:bg-stone-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880]"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Slide-Out Drawer Navigation */}
      <MobileNav
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navItems={mainNavItems}
        whatsAppAvailable={whatsAppAvailable}
        whatsAppUrl={whatsAppUrl}
      />
    </>
  );
}
