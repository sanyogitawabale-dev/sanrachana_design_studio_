import React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "elevated" | "flat" | "glass" | "bordered";
  hoverEffect?: boolean;
}

export function Card({
  className,
  variant = "bordered",
  hoverEffect = true,
  children,
  ...props
}: CardProps) {
  const variantStyles = {
    bordered: "bg-white dark:bg-stone-900/90 border border-stone-200 dark:border-stone-800",
    elevated: "bg-white dark:bg-stone-900 shadow-md border border-stone-100 dark:border-stone-800",
    flat: "bg-stone-50 dark:bg-stone-900/60 border border-transparent",
    glass:
      "bg-white/80 dark:bg-stone-900/80 backdrop-blur-md border border-white/20 dark:border-stone-800/80 shadow-sm",
  };

  return (
    <div
      className={cn(
        "rounded-sm overflow-hidden transition-all duration-300",
        variantStyles[variant],
        hoverEffect && "hover:border-[#C5A880]/60 hover:shadow-lg dark:hover:border-[#C5A880]/40",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
