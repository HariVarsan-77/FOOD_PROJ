"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delayMs?: number;
  durationMs?: number;
  /** Direction from which the element slides into position */
  direction?: "up" | "down" | "left" | "right" | "none";
  /** Optional custom inline styles */
  style?: CSSProperties;
  /** If true, the animation re-triggers if the element leaves and re-enters the viewport */
  repeat?: boolean;
}

/**
 * Performant, IntersectionObserver-based reveal animation container.
 * Smoothly animates cards, charts, and sections into view as the user scrolls.
 * Gracefully respects user's `prefers-reduced-motion` settings.
 */
export function ScrollReveal({
  children,
  className = "",
  delayMs = 0,
  durationMs = 650,
  direction = "up",
  style = {},
  repeat = false,
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Immediately show if user prefers reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (!repeat) {
              observer.unobserve(entry.target);
            }
          } else if (repeat) {
            setIsVisible(false);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [repeat]);

  const getTransform = () => {
    if (isVisible) return "translate3d(0, 0, 0)";
    switch (direction) {
      case "up":
        return "translate3d(0, 20px, 0)";
      case "down":
        return "translate3d(0, -20px, 0)";
      case "left":
        return "translate3d(20px, 0, 0)";
      case "right":
        return "translate3d(-20px, 0, 0)";
      case "none":
        return "translate3d(0, 0, 0)";
    }
  };

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        ...style,
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        transitionProperty: "opacity, transform",
        transitionDuration: `${durationMs}ms`,
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        transitionDelay: `${delayMs}ms`,
        willChange: isVisible ? "auto" : "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}
