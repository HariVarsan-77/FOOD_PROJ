import Link from "next/link";
import { ArrowLeft, ChevronRight, BarChart3, TrendingUp, Timer, Star, Layers } from "lucide-react";
import type { ReactNode } from "react";
import type { DataSourceStatus } from "@/types/records";

const ANALYSIS_QUICK_LINKS = [
  { href: "/analyses/revenue", label: "Revenue", icon: TrendingUp },
  { href: "/analyses/popular-categories", label: "Popular Categories", icon: BarChart3 },
  { href: "/analyses/delivery-efficiency", label: "Delivery Efficiency", icon: Timer },
  { href: "/analyses/customer-satisfaction", label: "Customer Satisfaction", icon: Star },
  { href: "/final-analysis", label: "Synthesis", icon: Layers },
];

/**
 * The frame shared by all analysis pages: breadcrumb, cross-module tabs,
 * polished 2.5D typography header, and structured layout.
 * Redundant database badges have been removed from the title in accordance with
 * clean analytics UI design.
 */
export function AnalysisPageFrame({
  title,
  intro,
  categoryTag = "Analytical Module",
  children,
}: {
  title: string;
  /** Plain-language explanation of what the analysis does, shown under the title. */
  intro: string;
  status?: DataSourceStatus;
  categoryTag?: string;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:py-12">
      {/* Top navigation row: Breadcrumbs + Cross-Analysis Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-peach-deep/30 pb-4">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-bold text-brown-soft">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 transition hover:text-primary"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Dashboard</span>
          </Link>
          <ChevronRight className="h-3.5 w-3.5 opacity-50" aria-hidden="true" />
          <span className="text-primary">{title}</span>
        </nav>

        {/* Quick analysis switcher tabs */}
        <div className="flex flex-wrap items-center gap-1.5">
          {ANALYSIS_QUICK_LINKS.map((link) => {
            const Icon = link.icon;
            const isCurrent = link.label === title || (link.label === "Synthesis" && title === "Final Analysis");
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold transition-all duration-200 ${
                  isCurrent
                    ? "bg-primary text-ivory shadow-sm"
                    : "border border-peach-deep/40 bg-ivory/80 text-brown-soft hover:bg-cream hover:text-primary"
                }`}
              >
                <Icon className="h-3 w-3" aria-hidden="true" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </div>
      </div>

      <header className="mt-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-peach-deep/60 bg-cream/70 px-3 py-1 text-[11px] font-extrabold uppercase tracking-widest text-primary">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          {categoryTag}
        </div>
        <h1 className="mt-3 font-display text-3xl leading-tight font-extrabold text-onyx sm:text-4xl lg:text-[2.6rem]">
          {title}
        </h1>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-brown-soft sm:text-lg">
          {intro}
        </p>
      </header>

      <div className="mt-8 space-y-8">{children}</div>
    </div>
  );
}

/**
 * A labelled 2.5D card block used for the calculation methods, charts,
 * and interpretation sections of an analysis page.
 */
export function AnalysisSection({
  title,
  subtitle,
  children,
  badge,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
  badge?: string;
}) {
  return (
    <section className="panel">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-xl font-extrabold text-brown sm:text-2xl">{title}</h2>
          {subtitle ? (
            <p className="mt-0.5 text-xs text-brown-soft">{subtitle}</p>
          ) : null}
        </div>
        {badge ? (
          <span className="rounded-full border border-peach-deep/50 bg-cream px-3 py-1 text-xs font-bold text-brown-soft">
            {badge}
          </span>
        ) : null}
      </div>
      <div className="mt-5">{children}</div>
    </section>
  );
}
