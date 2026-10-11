import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "stone" | "gold" | "dark" | "outline" | "accent";
  size?: "sm" | "md";
}

export function Badge({
  className,
  variant = "stone",
  size = "md",
  children,
  ...props
}: BadgeProps) {
  const variantStyles = {
    stone: "bg-stone-100 dark:bg-stone-800/80 text-stone-800 dark:text-stone-200 border-stone-200 dark:border-stone-700",
    gold: "bg-[#C5A880]/15 text-[#8f6d3f] dark:text-[#E0C7A6] border-[#C5A880]/30",
    dark: "bg-stone-900 text-stone-100 border-stone-800",
    outline: "bg-transparent text-stone-700 dark:text-stone-300 border-stone-300 dark:border-stone-700",
    accent: "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/20",
  };

  const sizeStyles = {
    sm: "px-2.5 py-0.5 text-[11px] font-medium tracking-wider",
    md: "px-3.5 py-1 text-xs font-medium tracking-wide",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border uppercase select-none transition-colors",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
