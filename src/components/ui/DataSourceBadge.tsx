import { Database, FlaskConical } from "lucide-react";
import type { DataSourceStatus } from "@/types/records";

/**
 * The badge that tells the user whether the numbers on screen come from the
 * built-in demo dataset or from a live database. Keeping this visible
 * everywhere prevents demo results from being mistaken for real ones.
 */
export function DataSourceBadge({
  status,
  className = "",
}: {
  status: DataSourceStatus;
  className?: string;
}) {
  const isLive = status.isLive;
  const Icon = isLive ? Database : FlaskConical;

  return (
    <span
      className={`badge ${className}`}
      style={
        isLive
          ? { background: "#d6edd9", color: "#2d7a4b" }
          : {
              background: "rgba(212,160,23,0.20)",
              border: "1px solid rgba(212,160,23,0.45)",
              color: "#d4a017",
            }
      }
      title={status.description}
    >
      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
      {status.label}
    </span>
  );
}

/**
 * The larger explanation shown on the Food Data page and the home page:
 * it states the current mode and, in demo mode, that records are stored only
 * in this browser.
 */
export function DataSourceNotice({ status }: { status: DataSourceStatus }) {
  return (
    <div
      className="rounded-2xl p-4"
      style={{
        background: "linear-gradient(145deg, #2e2010 0%, #1a1108 100%)",
        border: "1px solid rgba(212,160,23,0.35)",
      }}
    >
      <div className="flex flex-wrap items-center gap-3">
        <DataSourceBadge status={status} />
        <p className="text-sm" style={{ color: "rgba(252,233,160,0.80)" }}>
          {status.description}
        </p>
      </div>
      {!status.isLive ? (
        <p className="mt-2 text-xs" style={{ color: "rgba(252,233,160,0.50)" }}>
          Records you add are saved in this browser only (demo mode). They are not sent to a cloud
          database yet, and they are kept separate from the built-in sample dataset.
        </p>
      ) : null}
    </div>
  );
}

