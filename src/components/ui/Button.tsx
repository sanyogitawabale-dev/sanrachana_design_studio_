import React, { ButtonHTMLAttributes, forwardRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "gold" | "ghost" | "dark";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  href?: string;
  target?: string;
  rel?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      href,
      target,
      rel,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all duration-200 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none tracking-wide text-sm";

    const sizeStyles = {
      sm: "px-3.5 py-1.5 text-xs gap-1.5",
      md: "px-5 py-2.5 text-sm gap-2",
      lg: "px-7 py-3.5 text-base gap-2.5",
    };

    const variantStyles = {
      primary:
        "bg-stone-900 text-stone-100 hover:bg-stone-800 active:bg-stone-950 focus-visible:ring-stone-500 shadow-sm border border-stone-800",
      secondary:
        "bg-stone-100 text-stone-900 hover:bg-stone-200 active:bg-stone-300 focus-visible:ring-stone-400 border border-stone-200",
      outline:
        "bg-transparent text-stone-900 dark:text-stone-100 border border-stone-300 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 focus-visible:ring-stone-400",
      gold: "bg-[#C5A880] text-stone-950 hover:bg-[#b5966c] active:bg-[#a6865d] focus-visible:ring-[#C5A880] shadow-sm font-semibold",
      ghost:
        "bg-transparent text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 focus-visible:ring-stone-400",
      dark: "bg-black text-white hover:bg-stone-900 border border-stone-800 focus-visible:ring-stone-600",
    };

    const combinedClasses = cn(
      baseStyles,
      sizeStyles[size],
      variantStyles[variant],
      isLoading && "pointer-events-none opacity-80",
      className
    );

    if (href) {
      const isExternal = href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:");
      return (
        <Link
          href={href}
          target={target || (isExternal && href.startsWith("http") ? "_blank" : undefined)}
          rel={rel || (isExternal && href.startsWith("http") ? "noopener noreferrer" : undefined)}
          className={combinedClasses}
        >
          {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
          {!isLoading && leftIcon && <span className="inline-flex">{leftIcon}</span>}
          <span>{children}</span>
          {!isLoading && rightIcon && <span className="inline-flex">{rightIcon}</span>}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={combinedClasses}
        {...props}
      >
        {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
        {!isLoading && leftIcon && <span className="inline-flex">{leftIcon}</span>}
        <span>{children}</span>
        {!isLoading && rightIcon && <span className="inline-flex">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = "Button";
