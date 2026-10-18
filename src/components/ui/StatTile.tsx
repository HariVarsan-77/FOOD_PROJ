import type { LucideIcon } from "lucide-react";
import type { ComponentType, ReactNode } from "react";
import { Info, Sparkles } from "lucide-react";

/**
 * 2.5D Elevated KPI Statistic Tile.
 * Features directional lighting, specular edge highlights, and tactile micro-elevation.
 */
export function StatTile({
  label,
  value,
  hint,
  icon: Icon,
  emptyMessage,
}: {
  label: string;
  /** null shows the empty state instead of a misleading 0. */
  value: string | null;
  hint?: string;
  icon: LucideIcon | ComponentType<{ className?: string }>;
  emptyMessage: string;
}) {
  return (
    <div
      className="group relative flex items-start gap-3.5 rounded-2xl p-4.5 transition-all duration-300 hover:-translate-y-1"
      style={{
        background: "linear-gradient(155deg, #ffffff 0%, #fffcf5 50%, #fef4df 100%)",
        border: "1px solid rgba(212, 160, 23, 0.35)",
        boxShadow:
          "0 2px 4px rgba(13, 10, 6, 0.04), 0 8px 18px -4px rgba(13, 10, 6, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.95)",
      }}
    >
      <span
        className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl text-ivory transition-transform duration-300 group-hover:scale-105"
        style={{
          background: "linear-gradient(135deg, #ff7c2a 0%, #e85d04 55%, #c44b02 100%)",
          boxShadow:
            "0 4px 12px -3px rgba(232, 93, 4, 0.55), inset 0 1px 0 rgba(255, 255, 255, 0.35)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
        }}
      >
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <div className="min-w-0 flex-1">
        <p
          className="text-[11px] font-extrabold uppercase tracking-wider"
          style={{ color: "#8c6239" }}
        >
          {label}
        </p>
        {value === null ? (
          <p className="mt-1 text-sm font-medium" style={{ color: "#a07040" }}>
            {emptyMessage}
          </p>
        ) : (
          <p className="mt-0.5 font-display text-2xl leading-none font-extrabold tracking-tight text-onyx sm:text-[1.7rem]">
            {value}
          </p>
        )}
        {hint && value !== null ? (
          <p className="mt-1.5 text-xs font-semibold leading-tight text-brown-soft/80">
            {hint}
          </p>
        ) : null}
      </div>
    </div>
  );
}

/**
 * 2.5D Elevated Executive Insight Panel.
 * Translates statistical calculations into clear, actionable business interpretations.
 */
export function InsightPanel({
  title = "Business Interpretation & Analytical Takeaway",
  children,
  tone = "primary",
}: {
  title?: string;
  children: ReactNode;
  tone?: "primary" | "neutral";
}) {
  return (
    <div
      className="relative overflow-hidden rounded-3xl p-6 transition-all duration-300"
      style={
        tone === "primary"
          ? {
              background:
                "linear-gradient(155deg, #2a1c0d 0%, #1a1108 55%, #0f0a05 100%)",
              border: "1.5px solid rgba(212, 160, 23, 0.45)",
              boxShadow:
                "0 6px 18px -4px rgba(0, 0, 0, 0.5), 0 18px 36px -8px rgba(13, 10, 6, 0.45), inset 0 1px 0 rgba(240, 200, 66, 0.25)",
            }
          : {
              background:
                "linear-gradient(155deg, #fffef9 0%, #fff7e8 60%, #feeed0 100%)",
              border: "1.5px solid rgba(212, 160, 23, 0.40)",
              boxShadow:
                "0 4px 14px -3px rgba(13, 10, 6, 0.08), 0 14px 28px -6px rgba(13, 10, 6, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.95)",
            }
      }
    >
      <div className="flex items-center gap-2.5">
        <span
          className="flex h-7 w-7 items-center justify-center rounded-xl"
          style={{
            background:
              tone === "primary"
                ? "rgba(240, 200, 66, 0.18)"
                : "rgba(232, 93, 4, 0.12)",
            color: tone === "primary" ? "#f0c842" : "#e85d04",
          }}
        >
          <Sparkles className="h-4 w-4" aria-hidden="true" />
        </span>
        <h3
          className="font-display text-base font-extrabold sm:text-lg"
          style={{ color: tone === "primary" ? "#f0c842" : "#c44b02" }}
        >
          {title}
        </h3>
      </div>
      <div
        className="mt-3.5 space-y-2.5 text-sm leading-relaxed"
        style={{
          color: tone === "primary" ? "rgba(252, 233, 160, 0.90)" : "#2e2010",
        }}
      >
        {children}
      </div>
    </div>
  );
}

/**
 * Methodological integrity footnote explaining statistical scope and caveats.
 */
export function CaveatNote({ children }: { children: ReactNode }) {
  return (
    <div
      className="flex items-start gap-3 rounded-2xl px-4.5 py-3.5 text-xs leading-relaxed"
      style={{
        background: "rgba(212, 160, 23, 0.09)",
        border: "1px solid rgba(212, 160, 23, 0.30)",
        color: "#7a552e",
      }}
    >
      <Info className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
      <div>
        <span className="font-bold text-onyx">Methodological Scope: </span>
        <span>{children}</span>
      </div>
    </div>
  );
}

