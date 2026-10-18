import { Database, ShieldCheck } from "lucide-react";
import type { DataSourceStatus } from "@/types/records";

/**
 * A subtle, restrained data-source indicator.
 * Provides accurate transparency without visually dominating the UI.
 */
export function DataSourceBadge({
  status,
  className = "",
}: {
  status: DataSourceStatus;
  className?: string;
}) {
  const isLive = status.isLive;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${className}`}
      style={
        isLive
          ? {
              background: "rgba(45, 122, 75, 0.12)",
              border: "1px solid rgba(45, 122, 75, 0.35)",
              color: "#22633c",
            }
          : {
              background: "rgba(212, 160, 23, 0.12)",
              border: "1px solid rgba(212, 160, 23, 0.35)",
              color: "#996b00",
            }
      }
      title={status.description}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          isLive ? "bg-emerald-600" : "bg-amber-500"
        }`}
      />
      <span>{status.label}</span>
    </span>
  );
}

/**
 * A compact, tasteful technical footnote shown at the bottom of data-heavy views.
 */
export function DataSourceNotice({ status }: { status: DataSourceStatus }) {
  return (
    <div
      className="panel-tight flex flex-wrap items-center justify-between gap-3 text-xs"
      style={{
        background: "linear-gradient(145deg, #fffcf5 0%, #fff7eb 100%)",
        border: "1px solid rgba(212, 160, 23, 0.25)",
      }}
    >
      <div className="flex items-center gap-2.5">
        <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-peach/40 text-primary">
          <Database className="h-3.5 w-3.5" aria-hidden="true" />
        </span>
        <div>
          <span className="font-bold text-onyx">Data Pipeline Status: </span>
          <span className="text-brown-soft">{status.description}</span>
        </div>
      </div>
      <div className="flex items-center gap-1 text-[11px] text-brown-soft">
        <ShieldCheck className="h-3.5 w-3.5 text-success" aria-hidden="true" />
        <span>Synchronized live</span>
      </div>
    </div>
  );
}

