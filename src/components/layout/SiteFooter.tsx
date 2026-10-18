import Link from "next/link";
import { BarChart3, Database, Layers, Sparkles } from "lucide-react";

/** 2.5D Professional Footer for the Food Delivery Analytics Platform. */
export function SiteFooter() {
  return (
    <footer
      className="mt-20 border-t"
      style={{
        background: "linear-gradient(180deg, #1b1208 0%, #0d0a06 100%)",
        borderColor: "rgba(212, 160, 23, 0.35)",
        boxShadow: "0 -4px 20px -5px rgba(0,0,0,0.4)",
      }}
    >
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 md:grid-cols-[1.5fr_1fr_1fr]">
          {/* Brand & Project Mission */}
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-peach/20 text-gold-light border border-gold/30">
                <Sparkles className="h-4 w-4" />
              </span>
              <p className="font-display text-lg font-bold" style={{ color: "#f0c842" }}>
                Food Delivery Data Analysis
              </p>
            </div>
            <p className="mt-3 max-w-md text-sm leading-relaxed" style={{ color: "rgba(252, 233, 160, 0.75)" }}>
              An interactive data science platform evaluating transactional order metrics, revenue distributions,
              fulfillment velocity, and customer sentiment through Pandas-aligned algorithms and real-time visualization.
            </p>
          </div>

          {/* Quick Analytical Modules */}
          <div>
            <p className="font-display text-xs font-extrabold uppercase tracking-widest text-gold-light">
              Analytical Modules
            </p>
            <ul className="mt-3 space-y-2 text-xs font-semibold" style={{ color: "rgba(252, 233, 160, 0.70)" }}>
              <li>
                <Link href="/analyses/revenue" className="transition hover:text-gold-light">
                  01. Revenue Analysis
                </Link>
              </li>
              <li>
                <Link href="/analyses/popular-categories" className="transition hover:text-gold-light">
                  02. Popular Food Categories
                </Link>
              </li>
              <li>
                <Link href="/analyses/delivery-efficiency" className="transition hover:text-gold-light">
                  03. Delivery Efficiency
                </Link>
              </li>
              <li>
                <Link href="/analyses/customer-satisfaction" className="transition hover:text-gold-light">
                  04. Customer Satisfaction
                </Link>
              </li>
            </ul>
          </div>

          {/* Platform Navigation */}
          <div>
            <p className="font-display text-xs font-extrabold uppercase tracking-widest text-gold-light">
              Platform & Data
            </p>
            <ul className="mt-3 space-y-2 text-xs font-semibold" style={{ color: "rgba(252, 233, 160, 0.70)" }}>
              <li>
                <Link href="/" className="transition hover:text-gold-light">
                  Overview Dashboard
                </Link>
              </li>
              <li>
                <Link href="/final-analysis" className="transition hover:text-gold-light">
                  Executive Synthesis
                </Link>
              </li>
              <li>
                <Link href="/food-data" className="transition hover:text-gold-light">
                  Order Data Management
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div
          className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t pt-6 text-xs"
          style={{
            borderColor: "rgba(212, 160, 23, 0.20)",
            color: "rgba(252, 233, 160, 0.50)",
          }}
        >
          <p>Food Delivery Data Analysis • Academic Data Science & UI/UX Project</p>
          <p className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span>Built with Next.js, TypeScript, Tailwind CSS, Recharts & Firebase</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
