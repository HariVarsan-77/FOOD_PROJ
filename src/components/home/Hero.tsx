import Link from "next/link";
import { ArrowDown, Plus } from "lucide-react";
import {
  BurgerIllustration,
  DessertIllustration,
  DrinkIllustration,
  FriesIllustration,
  NoodlesIllustration,
  PizzaIllustration,
} from "@/components/illustrations/FoodIllustrations";

/** Decorative food illustrations shown next to the hero text. */
const HERO_ILLUSTRATIONS = [
  { Component: BurgerIllustration, background: "bg-ivory" },
  { Component: PizzaIllustration, background: "bg-ivory" },
  { Component: DrinkIllustration, background: "bg-cream" },
  { Component: NoodlesIllustration, background: "bg-cream" },
  { Component: FriesIllustration, background: "bg-ivory" },
  { Component: DessertIllustration, background: "bg-ivory" },
];

/** The landing hero: project title, one paragraph and the main call to action. */
export function Hero() {
  return (
    <section
      className="relative overflow-hidden border-b"
      style={{
        background: "linear-gradient(135deg, #0d0a06 0%, #1a1108 40%, #2e1a06 80%, #0d0a06 100%)",
        borderColor: "rgba(212,160,23,0.35)",
      }}
    >
      {/* Gold radial glow decorations */}
      <span
        className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(212,160,23,0.20) 0%, transparent 70%)",
        }}
      />
      <span
        className="pointer-events-none absolute -right-16 -bottom-16 h-64 w-64 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(232,93,4,0.18) 0%, transparent 70%)",
        }}
      />
      <span
        className="pointer-events-none absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(212,160,23,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:py-20">
        <div>
          {/* Gold accent line above heading */}
          <div
            className="mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold"
            style={{
              background: "rgba(212,160,23,0.15)",
              border: "1px solid rgba(212,160,23,0.40)",
              color: "#f0c842",
            }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: "#f0c842" }}
            />
            Interactive Data Dashboard
          </div>

          <h1
            className="font-display text-4xl leading-[1.05] font-extrabold sm:text-5xl lg:text-[3.4rem]"
            style={{
              background: "linear-gradient(135deg, #f0c842 0%, #fce9a0 40%, #e85d04 75%, #ff7c2a 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            FOOD DELIVERY DATA ANALYSIS
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-relaxed sm:text-lg" style={{ color: "rgba(252,233,160,0.80)" }}>
            Turn food delivery data into meaningful business insights. Explore revenue trends,
            discover popular food categories, evaluate delivery efficiency, and understand customer
            satisfaction through simple calculations and interactive visualizations.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#analyses" className="btn-primary">
              Explore Analyses
              <ArrowDown className="h-4 w-4" aria-hidden="true" />
            </a>
            <Link href="/food-data" className="btn-secondary">
              <Plus className="h-4 w-4" aria-hidden="true" />
              Add a food record
            </Link>
          </div>
        </div>

        {/* Cartoon food illustrations on dark cards */}
        <div className="grid grid-cols-3 gap-4" aria-hidden="true">
          {HERO_ILLUSTRATIONS.map(({ Component }, index) => (
            <div
              key={index}
              className="flex aspect-square items-center justify-center rounded-3xl p-3 transition duration-200 hover:-translate-y-1"
              style={{
                background: "linear-gradient(145deg, #2e2010 0%, #1a1108 100%)",
                border: "1px solid rgba(212,160,23,0.30)",
                boxShadow: "0 8px 24px -12px rgba(13,10,6,0.80), inset 0 1px 0 rgba(212,160,23,0.15)",
              }}
            >
              <Component className="h-full w-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

