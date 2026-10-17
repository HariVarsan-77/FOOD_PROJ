import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

/** One headline number on the home page dashboard. */
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
  icon: LucideIcon;
  emptyMessage: string;
}) {
  return (
    <div className="panel-tight flex items-start gap-3 transition-all duration-200 hover:shadow-[var(--shadow-lift)]">
      <span
        className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl text-ivory"
        style={{
          background: "linear-gradient(135deg, #ff7c2a 0%, #e85d04 100%)",
          boxShadow: "0 4px 12px -6px rgba(232,93,4,0.60)",
        }}
      >
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <p className="text-xs font-bold tracking-wide uppercase" style={{ color: "#a07040" }}>
          {label}
        </p>
        {value === null ? (
          <p className="mt-1 text-sm" style={{ color: "#a07040" }}>
            {emptyMessage}
          </p>
        ) : (
          <p className="mt-0.5 font-display text-2xl leading-tight font-extrabold text-onyx">
            {value}
          </p>
        )}
        {hint && value !== null ? (
          <p className="mt-1 text-xs" style={{ color: "#a07040" }}>
            {hint}
          </p>
        ) : null}
      </div>
    </div>
  );
}

/**
 * The "what this means" box used on every analysis page.
 * It always holds a sentence that is built from the actual calculated numbers.
 */
export function InsightPanel({
  title = "What this means",
  children,
  tone = "primary",
}: {
  title?: string;
  children: ReactNode;
  tone?: "primary" | "neutral";
}) {
  return (
    <div
      className="rounded-2xl p-5"
      style={
        tone === "primary"
          ? {
              background: "linear-gradient(145deg, #2e2010 0%, #1a1108 100%)",
              border: "1px solid rgba(212,160,23,0.40)",
            }
          : {
              background: "linear-gradient(145deg, #fffbf0 0%, #fef3dc 100%)",
              border: "1px solid rgba(212,160,23,0.35)",
            }
      }
    >
      <p
        className="font-display text-base font-bold"
        style={{ color: tone === "primary" ? "#f0c842" : "#e85d04" }}
      >
        {title}
      </p>
      <div
        className="mt-2 space-y-2 text-sm leading-relaxed"
        style={{ color: tone === "primary" ? "rgba(252,233,160,0.85)" : "#0d0a06" }}
      >
        {children}
      </div>
    </div>
  );
}

/** Small grey note for caveats (e.g. "association, not causation"). */
export function CaveatNote({ children }: { children: ReactNode }) {
  return (
    <p
      className="rounded-2xl px-4 py-3 text-xs leading-relaxed"
      style={{
        background: "rgba(212,160,23,0.08)",
        border: "1px solid rgba(212,160,23,0.25)",
        color: "#a07040",
      }}
    >
      {children}
    </p>
  );
}

