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
    <div className="panel-tight flex items-start gap-3 transition hover:shadow-[var(--shadow-lift)]">
      <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-peach text-primary">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <p className="text-xs font-bold tracking-wide text-brown-soft uppercase">{label}</p>
        {value === null ? (
          <p className="mt-1 text-sm text-brown-soft">{emptyMessage}</p>
        ) : (
          <p className="mt-0.5 font-display text-2xl leading-tight font-extrabold text-brown">
            {value}
          </p>
        )}
        {hint && value !== null ? (
          <p className="mt-1 text-xs text-brown-soft">{hint}</p>
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
      className={`rounded-2xl border p-5 ${
        tone === "primary" ? "border-peach-deep bg-peach/45" : "border-peach-deep/70 bg-ivory"
      }`}
    >
      <p className="font-display text-base font-bold text-primary">{title}</p>
      <div className="mt-2 space-y-2 text-sm leading-relaxed text-brown">{children}</div>
    </div>
  );
}

/** Small grey note for caveats (e.g. "association, not causation"). */
export function CaveatNote({ children }: { children: ReactNode }) {
  return (
    <p className="rounded-2xl border border-brown-soft/25 bg-cream px-4 py-3 text-xs leading-relaxed text-brown-soft">
      {children}
    </p>
  );
}
