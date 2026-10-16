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
      className={`badge ${
        isLive ? "bg-success-soft text-success" : "bg-peach text-primary"
      } ${className}`}
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
    <div className="rounded-2xl border border-peach-deep/70 bg-peach/50 p-4">
      <div className="flex flex-wrap items-center gap-3">
        <DataSourceBadge status={status} />
        <p className="text-sm text-brown">{status.description}</p>
      </div>
      {!status.isLive ? (
        <p className="mt-2 text-xs text-brown-soft">
          Records you add are saved in this browser only (demo mode). They are not sent to a cloud
          database yet, and they are kept separate from the built-in sample dataset.
        </p>
      ) : null}
    </div>
  );
}
