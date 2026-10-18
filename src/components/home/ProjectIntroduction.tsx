"use client";

import {
  BarChart3,
  BookOpen,
  Code2,
  Database,
  Lightbulb,
  Search,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const METHODOLOGY_PILLARS = [
  {
    icon: Database,
    title: "1. Dataset Structure & Variables",
    description:
      "Examines granular transactional records containing food item nomenclature, standardized culinary categories (Biryani, Pizza, Fast Food, Desserts), monetary order value in INR, delivery latency in minutes, and verified 1–5 customer satisfaction ratings.",
    highlight: "Raw Order Records",
  },
  {
    icon: Code2,
    title: "2. Pandas Analytical Pipeline",
    description:
      "Employs vectorized Pandas workflows (`groupby()`, `sum()`, `mean()`, `value_counts()`), strict filtering of missing/non-positive values, and median/mean central tendency comparisons to eliminate skewed distortions.",
    highlight: "Python / Data Science",
  },
  {
    icon: TrendingUp,
    title: "3. Operational Decision Making",
    description:
      "Translates statistical patterns into practical operational strategies: pinpointing high-margin revenue drivers, investigating kitchen dispatch bottlenecks without premature driver blame, and optimizing customer retention.",
    highlight: "Actionable Insights",
  },
];

const LEARNING_OUTCOMES = [
  {
    icon: Search,
    title: "Identify Demand vs Revenue Disconnects",
    text: "Understand why the most frequently ordered food category is not necessarily the highest revenue generator, and how basket size shapes profitability.",
  },
  {
    icon: BarChart3,
    title: "Analyze Delivery Latency Distributions",
    text: "Examine how preparation complexity and transit times vary across categories compared to the overall dataset benchmark.",
  },
  {
    icon: Lightbulb,
    title: "Correlate Speed with Customer Sentiment",
    text: "Discover empirical evidence showing whether faster deliveries measurably correlate with higher customer satisfaction star ratings.",
  },
];

/**
 * Section 4.A — Comprehensive Project Introduction & Analytical Storytelling.
 * Communicates the academic foundation, practical value, and methodological integrity
 * of the Food Delivery Data Analysis platform.
 */
export function ProjectIntroduction() {
  return (
    <section className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
      <ScrollReveal direction="up">
        {/* Section header */}
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-peach-deep/60 bg-cream/80 px-3.5 py-1 text-xs font-extrabold uppercase tracking-widest text-primary shadow-sm">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            Project Methodology & Academic Context
          </div>
          <h2 className="mt-3.5 font-display text-3xl font-extrabold tracking-tight text-onyx sm:text-4xl lg:text-[2.6rem]">
            Why Food Delivery Analytics Matters
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-brown-soft sm:text-lg">
            Food delivery platforms handle thousands of dynamic transactions every minute.
            Analyzing this data bridges the gap between raw order tickets and strategic
            kitchen, dispatch, and pricing decisions.
          </p>
        </div>
      </ScrollReveal>

      {/* Main explanation narrative card with 2.5D elevation */}
      <ScrollReveal direction="up" delayMs={100} className="mt-10">
        <div
          className="relative overflow-hidden rounded-3xl p-6 sm:p-10"
          style={{
            background: "linear-gradient(155deg, #ffffff 0%, #fffcf5 50%, #fef3dc 100%)",
            border: "1.5px solid rgba(212, 160, 23, 0.40)",
            boxShadow:
              "0 4px 16px -2px rgba(13, 10, 6, 0.06), 0 16px 36px -8px rgba(13, 10, 6, 0.08), inset 0 1px 0 rgba(255, 255, 255, 1)",
          }}
        >
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div className="space-y-4 text-sm leading-relaxed text-brown sm:text-base">
              <h3 className="font-display text-xl font-extrabold text-onyx sm:text-2xl">
                Bridging Data Science and Restaurant Operations
              </h3>
              <p>
                In the quick-service restaurant (QSR) and on-demand delivery ecosystem, every order carries
                critical operational signals: what was ordered, how much it earned, how many minutes it
                took from kitchen order ticket (KOT) to doorstep, and how satisfied the customer felt.
              </p>
              <p>
                This project originated as a Python data science study using <strong>Pandas</strong> and{" "}
                <strong>Matplotlib</strong>. It translates raw CSV records into quantitative dimensions that
                answer fundamental business questions: Which dishes generate sustainable cash flow? Which
                categories suffer from chronic transit delays? Does shaving five minutes off delivery time
                genuinely improve customer reviews?
              </p>
              <p className="text-xs font-semibold text-brown-soft sm:text-sm">
                Every calculation running on this website is recomputed live in real-time from active records,
                ensuring that adding new entries immediately reflects in all statistical models and visualizations.
              </p>
            </div>

            {/* 3 Pillars right column */}
            <div className="space-y-3.5">
              {METHODOLOGY_PILLARS.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={pillar.title}
                    className="flex items-start gap-3.5 rounded-2xl p-4 transition-all duration-200"
                    style={{
                      background: "rgba(255, 251, 240, 0.85)",
                      border: "1px solid rgba(212, 160, 23, 0.30)",
                      boxShadow: "0 2px 6px -1px rgba(13, 10, 6, 0.04)",
                    }}
                  >
                    <span
                      className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-ivory"
                      style={{
                        background: "linear-gradient(135deg, #ff7c2a 0%, #e85d04 100%)",
                        boxShadow: "0 2px 8px -2px rgba(232, 93, 4, 0.6)",
                      }}
                    >
                      <Icon className="h-4.5 w-4.5" aria-hidden="true" />
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-display text-sm font-bold text-onyx">
                          {pillar.title}
                        </h4>
                        <span className="rounded-full bg-peach/50 px-2 py-0.5 text-[10px] font-extrabold text-primary">
                          {pillar.highlight}
                        </span>
                      </div>
                      <p className="mt-1 text-xs leading-relaxed text-brown-soft">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* What visitors learn section */}
      <div className="mt-10">
        <ScrollReveal direction="up" delayMs={150}>
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-primary" />
              <h3 className="font-display text-lg font-bold text-onyx sm:text-xl">
                What You Will Discover Across This Platform
              </h3>
            </div>
            <span className="text-xs font-semibold text-brown-soft hidden sm:inline">
              4 Core Analytical Dimensions
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {LEARNING_OUTCOMES.map((item, index) => {
              const Icon = item.icon;
              return (
                <ScrollReveal
                  key={item.title}
                  direction="up"
                  delayMs={200 + index * 60}
                >
                  <div
                    className="group relative flex h-full flex-col justify-between rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1.5"
                    style={{
                      background: "linear-gradient(155deg, #ffffff 0%, #fffcf5 100%)",
                      border: "1px solid rgba(212, 160, 23, 0.35)",
                      boxShadow:
                        "0 2px 8px -2px rgba(13, 10, 6, 0.05), 0 10px 22px -6px rgba(13, 10, 6, 0.06), inset 0 1px 0 rgba(255, 255, 255, 1)",
                    }}
                  >
                    <div>
                      <span
                        className="flex h-9 w-9 items-center justify-center rounded-xl text-primary transition-transform duration-300 group-hover:scale-110"
                        style={{
                          background: "rgba(232, 93, 4, 0.12)",
                          border: "1px solid rgba(232, 93, 4, 0.25)",
                        }}
                      >
                        <Icon className="h-4.5 w-4.5" aria-hidden="true" />
                      </span>
                      <h4 className="mt-3.5 font-display text-base font-bold leading-snug text-onyx">
                        {item.title}
                      </h4>
                      <p className="mt-2 text-xs leading-relaxed text-brown-soft">
                        {item.text}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
