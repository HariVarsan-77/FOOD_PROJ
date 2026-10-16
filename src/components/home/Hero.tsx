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
    <section className="relative overflow-hidden border-b border-peach-deep/60 bg-peach/45">
      {/* Soft decorative circles, purely visual */}
      <span className="pointer-events-none absolute -top-16 -left-16 h-56 w-56 rounded-full bg-ivory/50" />
      <span className="pointer-events-none absolute -right-10 -bottom-10 h-44 w-44 rounded-full bg-ivory/40" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:py-20">
        <div>
          <h1 className="font-display text-4xl leading-[1.05] font-extrabold text-primary sm:text-5xl lg:text-[3.4rem]">
            FOOD DELIVERY DATA ANALYSIS
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-relaxed text-brown sm:text-lg">
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

        {/* Cartoon food illustrations */}
        <div className="grid grid-cols-3 gap-4" aria-hidden="true">
          {HERO_ILLUSTRATIONS.map(({ Component, background }, index) => (
            <div
              key={index}
              className={`flex aspect-square items-center justify-center rounded-3xl border border-peach-deep/60 ${background} p-3 transition duration-200 hover:-translate-y-1`}
              style={{ boxShadow: "var(--shadow-panel)" }}
            >
              <Component className="h-full w-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
