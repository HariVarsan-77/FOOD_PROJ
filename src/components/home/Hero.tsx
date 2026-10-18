"use client";

import Link from "next/link";
import { ArrowDown, Plus, Sparkles, TrendingUp, ShieldCheck, Zap } from "lucide-react";
import {
  BurgerIllustration,
  DessertIllustration,
  DrinkIllustration,
  FriesIllustration,
  NoodlesIllustration,
  PizzaIllustration,
} from "@/components/illustrations/FoodIllustrations";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const HERO_TILES = [
  { Component: PizzaIllustration, label: "Pizza", tag: "Revenue Anchor" },
  { Component: BurgerIllustration, label: "Burgers", tag: "Top Volume" },
  { Component: NoodlesIllustration, label: "Noodles", tag: "Fast Transit" },
  { Component: FriesIllustration, label: "Sides", tag: "Add-on Margin" },
  { Component: DrinkIllustration, label: "Drinks", tag: "Instant Dispatch" },
  { Component: DessertIllustration, label: "Desserts", tag: "Rating Leader" },
];

/**
 * 2.5D Elevated Hero Section.
 * Sets a distinctive visual identity with layered perspective,
 * clear focal hierarchy, and authentic analytical narrative.
 */
export function Hero() {
  return (
    <section
      className="relative overflow-hidden border-b"
      style={{
        background:
          "radial-gradient(ellipse 90% 80% at 50% -20%, #2f1d0a 0%, #150e06 50%, #0d0a06 100%)",
        borderColor: "rgba(212, 160, 23, 0.35)",
      }}
    >
      {/* 2.5D ambient lighting and layered specular glows */}
      <span
        className="pointer-events-none absolute -top-32 -left-20 h-96 w-96 rounded-full opacity-40 blur-3xl"
        style={{
          background: "radial-gradient(circle, #e85d04 0%, transparent 70%)",
        }}
      />
      <span
        className="pointer-events-none absolute -right-24 -bottom-24 h-96 w-96 rounded-full opacity-30 blur-3xl"
        style={{
          background: "radial-gradient(circle, #d4a017 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:py-24">
        {/* Left Column: Headline and Call-to-actions */}
        <div>
          <ScrollReveal direction="up" delayMs={50}>
            <div
              className="mb-5 inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-xs font-extrabold tracking-wide"
              style={{
                background: "rgba(212, 160, 23, 0.15)",
                border: "1px solid rgba(212, 160, 23, 0.45)",
                color: "#f0c842",
                boxShadow: "0 2px 8px -1px rgba(0,0,0,0.4)",
              }}
            >
              <Sparkles className="h-3.5 w-3.5 text-gold-light" />
              <span>Interactive Data Science & Analytics Platform</span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delayMs={100}>
            <h1
              className="font-display text-4xl leading-[1.08] font-extrabold tracking-tight sm:text-5xl lg:text-[3.5rem]"
              style={{
                background:
                  "linear-gradient(135deg, #ffffff 0%, #fef3dc 35%, #f0c842 70%, #ff7c2a 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                filter: "drop-shadow(0 2px 10px rgba(0,0,0,0.5))",
              }}
            >
              FOOD DELIVERY DATA ANALYSIS
            </h1>
          </ScrollReveal>

          <ScrollReveal direction="up" delayMs={150}>
            <p
              className="mt-6 max-w-2xl text-base leading-relaxed sm:text-lg"
              style={{ color: "rgba(252, 233, 160, 0.88)" }}
            >
              Uncover the operational reality behind food delivery orders. Examine revenue
              distributions, identify volume leaders, benchmark category transit latencies,
              and evaluate how delivery speed directly impacts customer star ratings.
            </p>
          </ScrollReveal>

          {/* 3 Telemetry Feature Badges */}
          <ScrollReveal direction="up" delayMs={200}>
            <div className="mt-6 flex flex-wrap items-center gap-2.5">
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold"
                style={{
                  background: "rgba(255, 255, 255, 0.08)",
                  border: "1px solid rgba(212, 160, 23, 0.35)",
                  color: "#fce9a0",
                }}
              >
                <Zap className="h-3.5 w-3.5 text-primary-soft" />
                Vectorized Pandas Logic
              </span>
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold"
                style={{
                  background: "rgba(255, 255, 255, 0.08)",
                  border: "1px solid rgba(212, 160, 23, 0.35)",
                  color: "#fce9a0",
                }}
              >
                <TrendingUp className="h-3.5 w-3.5 text-gold-light" />
                Live Dynamic Recalculations
              </span>
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold"
                style={{
                  background: "rgba(255, 255, 255, 0.08)",
                  border: "1px solid rgba(212, 160, 23, 0.35)",
                  color: "#fce9a0",
                }}
              >
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                Clean Analytics Integrity
              </span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delayMs={250}>
            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <a href="#analyses" className="btn-primary">
                <span>Explore Analytical Dimensions</span>
                <ArrowDown className="h-4 w-4" aria-hidden="true" />
              </a>
              <Link href="/food-data" className="btn-secondary">
                <Plus className="h-4 w-4" aria-hidden="true" />
                <span>Add Record & Recalculate</span>
              </Link>
            </div>
          </ScrollReveal>
        </div>

        {/* Right Column: 2.5D Layered Food Isometric Display */}
        <ScrollReveal direction="up" delayMs={200}>
          <div
            className="relative rounded-3xl p-5 sm:p-6"
            style={{
              background:
                "linear-gradient(150deg, rgba(42, 28, 13, 0.7) 0%, rgba(20, 14, 7, 0.9) 100%)",
              border: "1.5px solid rgba(212, 160, 23, 0.35)",
              boxShadow:
                "0 20px 50px -15px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(240, 200, 66, 0.25)",
            }}
          >
            <div className="mb-4 flex items-center justify-between border-b border-peach-deep/20 pb-3">
              <span className="text-xs font-extrabold uppercase tracking-wider text-gold">
                Analyzed Food Spectrum
              </span>
              <span className="text-[11px] font-semibold text-gold-soft/70">
                Categorical Segments
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3.5">
              {HERO_TILES.map(({ Component, label, tag }, index) => (
                <div
                  key={index}
                  className="group relative flex flex-col items-center justify-center rounded-2xl p-3 transition-all duration-300 hover:-translate-y-1.5"
                  style={{
                    background:
                      "linear-gradient(145deg, #2d1d0c 0%, #170f07 100%)",
                    border: "1px solid rgba(212, 160, 23, 0.30)",
                    boxShadow:
                      "0 6px 16px -4px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.08)",
                  }}
                >
                  <div className="flex aspect-square w-full items-center justify-center p-1.5 transition-transform duration-300 group-hover:scale-110">
                    <Component className="h-full w-full" />
                  </div>
                  <span className="mt-1 font-display text-xs font-bold text-ivory">
                    {label}
                  </span>
                  <span className="mt-0.5 text-[9px] font-extrabold tracking-wide uppercase text-gold/80">
                    {tag}
                  </span>
                </div>
              ))}
            </div>

            {/* Bottom mini telemetry footer */}
            <div className="mt-4 flex items-center justify-between rounded-xl bg-black/40 px-3.5 py-2 text-[11px] text-gold-soft/80 border border-gold/15">
              <span>Dynamic Pipeline</span>
              <span className="font-bold text-gold">Ready for Simulation</span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
