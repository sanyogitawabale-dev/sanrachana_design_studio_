"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavItem } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { X, MessageCircle, ArrowRight } from "lucide-react";
import { InstagramIcon } from "@/components/ui/Icons";
import { StudioLogo } from "@/components/common/StudioLogo";
import { cn } from "@/lib/utils";

export interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: NavItem[];
  whatsAppAvailable: boolean;
  whatsAppUrl: string;
}

export function MobileNav({
  isOpen,
  onClose,
  navItems,
  whatsAppAvailable,
  whatsAppUrl,
}: MobileNavProps) {
  const pathname = usePathname();

  // Close on route change
  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  // Lock body scroll when mobile nav is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 lg:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation Menu"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 w-full max-w-xs sm:max-w-sm bg-stone-950 border-l border-stone-800 p-6 flex flex-col justify-between shadow-2xl overflow-y-auto animate-in slide-in-from-right duration-300">
        <div>
          {/* Header in Drawer */}
          <div className="flex items-center justify-between pb-6 border-b border-stone-800">
            <StudioLogo variant="compact" size="sm" />
            <button
              onClick={onClose}
              className="p-2 text-stone-400 hover:text-white rounded-sm hover:bg-stone-800 transition-colors"
              aria-label="Close navigation drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="py-6 space-y-1" aria-label="Mobile Navigation Links">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center justify-between px-3 py-3 rounded-sm text-sm tracking-wide uppercase font-medium transition-colors",
                    isActive
                      ? "text-[#C5A880] bg-stone-900 font-semibold"
                      : "text-stone-300 hover:text-white hover:bg-stone-900/60"
                  )}
                >
                  <span className="flex items-center gap-2">
                    {item.title}
                    {item.badge && (
                      <span className="px-2 py-0.5 text-[9px] bg-[#C5A880]/20 text-[#E0C7A6] rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </span>
                  <ArrowRight className="w-4 h-4 opacity-40" />
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Actions */}
        <div className="pt-6 border-t border-stone-800 space-y-3">
          <Button
            variant="gold"
            size="md"
            href="/contact"
            className="w-full"
          >
            Book Free Consultation
          </Button>

          {whatsAppAvailable && (
            <Button
              variant="outline"
              size="md"
              href={whatsAppUrl}
              leftIcon={<MessageCircle className="w-4 h-4 text-emerald-400" />}
              className="w-full text-stone-200 border-stone-700 hover:bg-stone-900"
            >
              Chat on WhatsApp
            </Button>
          )}

          <div className="pt-4 flex items-center justify-between text-xs text-stone-400">
            <a
              href={siteConfig.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-stone-300 hover:text-[#C5A880]"
            >
              <InstagramIcon className="w-4 h-4" />
              <span>{siteConfig.instagram.handle}</span>
            </a>
            <span className="text-[10px] text-stone-500 font-mono">संरचना Studio</span>
          </div>
        </div>
      </div>
    </div>
  );
}
