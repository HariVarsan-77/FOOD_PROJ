"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ANALYSIS_LIST } from "@/data/analysisMeta";

/**
 * The horizontally scrollable row of the four analysis categories.
 * On phones the row can simply be swiped; on larger screens the arrow buttons
 * scroll it as well.
 */
export function AnalysisCategoryNav() {
  const pathname = usePathname();
  const scrollContainer = useRef<HTMLDivElement>(null);

  const scrollByAmount = (amount: number) => {
    scrollContainer.current?.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <section id="analyses" className="mx-auto max-w-6xl scroll-mt-20 px-4 pt-14 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl font-extrabold text-primary sm:text-3xl">
            Choose an analysis
          </h2>
          <p className="mt-1 text-sm text-brown-soft">
            Scroll sideways to see all four categories, then open the one you want.
          </p>
        </div>
        <div className="hidden gap-2 md:flex">
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-peach-deep bg-ivory text-brown transition hover:bg-peach"
            onClick={() => scrollByAmount(-300)}
            aria-label="Scroll categories left"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-peach-deep bg-ivory text-brown transition hover:bg-peach"
            onClick={() => scrollByAmount(300)}
            aria-label="Scroll categories right"
          >
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div
        ref={scrollContainer}
        className="no-scrollbar mt-5 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2"
      >
        {ANALYSIS_LIST.map((analysis) => {
          const Icon = analysis.icon;
          const isCurrent = pathname === analysis.href;

          return (
            <Link
              key={analysis.slug}
              href={analysis.href}
              aria-current={isCurrent ? "page" : undefined}
              className={`flex min-w-[230px] shrink-0 snap-start items-center gap-3 rounded-3xl border px-5 py-4 transition duration-200 hover:-translate-y-1 ${
                isCurrent
                  ? "border-primary bg-primary text-ivory"
                  : "border-peach-deep/70 bg-ivory text-brown hover:border-primary/50"
              }`}
              style={{ boxShadow: "var(--shadow-panel)" }}
            >
              <span
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${
                  isCurrent ? "bg-ivory/25 text-ivory" : analysis.iconClass
                }`}
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="text-left">
                <span className="block font-display text-sm font-bold">{analysis.shortTitle}</span>
                <span
                  className={`block text-xs ${isCurrent ? "text-ivory/85" : "text-brown-soft"}`}
                >
                  {isCurrent ? "Currently open" : "Open analysis"}
                </span>
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
