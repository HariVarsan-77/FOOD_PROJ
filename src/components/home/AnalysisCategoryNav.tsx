"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { ChevronLeft, ChevronRight, Compass } from "lucide-react";
import { ANALYSIS_LIST } from "@/data/analysisMeta";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

/**
 * 2.5D Interactive Category Carousel / Navigation.
 * Allows quick exploration of the four analytical dimensions.
 */
export function AnalysisCategoryNav() {
  const pathname = usePathname();
  const scrollContainer = useRef<HTMLDivElement>(null);

  const scrollByAmount = (amount: number) => {
    scrollContainer.current?.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <section id="analyses" className="mx-auto max-w-6xl scroll-mt-20 px-4 pt-14 sm:px-6">
      <ScrollReveal direction="up">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-primary">
              <Compass className="h-3.5 w-3.5" />
              <span>Interactive Navigation</span>
            </div>
            <h2 className="mt-1 font-display text-2xl font-extrabold text-onyx sm:text-3xl">
              Choose an Analytical Dimension
            </h2>
            <p className="mt-1 text-sm text-brown-soft">
              Explore the four analytical perspectives below, or scroll across on mobile.
            </p>
          </div>
          <div className="hidden gap-2 md:flex">
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-peach-deep/60 bg-ivory text-brown transition-all duration-200 hover:bg-peach hover:scale-105 active:scale-95 shadow-sm"
              onClick={() => scrollByAmount(-300)}
              aria-label="Scroll categories left"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-peach-deep/60 bg-ivory text-brown transition-all duration-200 hover:bg-peach hover:scale-105 active:scale-95 shadow-sm"
              onClick={() => scrollByAmount(300)}
              aria-label="Scroll categories right"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal direction="up" delayMs={100}>
        <div
          ref={scrollContainer}
          className="no-scrollbar mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 pt-1"
        >
          {ANALYSIS_LIST.map((analysis) => {
            const Icon = analysis.icon;
            const isCurrent = pathname === analysis.href;

            return (
              <Link
                key={analysis.slug}
                href={analysis.href}
                aria-current={isCurrent ? "page" : undefined}
                className={`group flex min-w-[250px] shrink-0 snap-start items-center gap-3.5 rounded-3xl border p-4.5 transition-all duration-300 hover:-translate-y-1.5 ${
                  isCurrent
                    ? "border-primary bg-primary text-ivory shadow-lg"
                    : "border-peach-deep/50 bg-white/95 text-brown hover:border-primary/60 hover:shadow-md"
                }`}
                style={{
                  boxShadow: isCurrent
                    ? "0 10px 25px -5px rgba(232, 93, 4, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.4)"
                    : "0 4px 12px -2px rgba(13, 10, 6, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.9)",
                }}
              >
                <span
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-105 ${
                    isCurrent ? "bg-ivory/20 text-ivory" : analysis.iconClass
                  }`}
                  style={{
                    boxShadow: isCurrent ? "none" : "0 2px 6px -1px rgba(0,0,0,0.08)",
                  }}
                >
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <span className="text-left min-w-0">
                  <span className="block font-display text-base font-extrabold leading-tight">
                    {analysis.shortTitle}
                  </span>
                  <span
                    className={`block text-xs font-semibold mt-1 ${
                      isCurrent ? "text-ivory/85" : "text-brown-soft"
                    }`}
                  >
                    {isCurrent ? "Currently active" : "Open deep dive →"}
                  </span>
                </span>
              </Link>
            );
          })}
        </div>
      </ScrollReveal>
    </section>
  );
}
