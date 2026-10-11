"use client";

import React from "react";
import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

// Standard Architectural Easing Curves
export const easeArchitectural = [0.22, 1, 0.36, 1] as const; // Smooth cubic-bezier
export const easeOutExpo = [0.16, 1, 0.3, 1] as const;

export interface FadeInProps extends HTMLMotionProps<"div"> {
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  className?: string;
  viewportOnce?: boolean;
}

export function FadeIn({
  children,
  delay = 0,
  duration = 0.6,
  direction = "up",
  distance = 24,
  className,
  viewportOnce = true,
  ...props
}: FadeInProps) {
  const shouldReduceMotion = useReducedMotion();

  const getInitialPosition = () => {
    if (shouldReduceMotion || direction === "none") return { x: 0, y: 0 };
    switch (direction) {
      case "up":
        return { y: distance, x: 0 };
      case "down":
        return { y: -distance, x: 0 };
      case "left":
        return { x: distance, y: 0 };
      case "right":
        return { x: -distance, y: 0 };
      default:
        return { x: 0, y: 0 };
    }
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        ...getInitialPosition(),
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
      }}
      viewport={{ once: viewportOnce, margin: "-40px" }}
      transition={{
        duration: shouldReduceMotion ? 0.2 : duration,
        delay,
        ease: easeArchitectural,
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export interface StaggerContainerProps extends HTMLMotionProps<"div"> {
  staggerDelay?: number;
  delayChildren?: number;
  className?: string;
  viewportOnce?: boolean;
}

export function StaggerContainer({
  children,
  staggerDelay = 0.12,
  delayChildren = 0,
  className,
  viewportOnce = true,
  ...props
}: StaggerContainerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: viewportOnce, margin: "-50px" }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
            delayChildren,
          },
        },
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeArchitectural },
  },
};
