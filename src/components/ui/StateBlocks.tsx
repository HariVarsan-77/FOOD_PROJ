import { AlertTriangle, Inbox, Loader2, RefreshCw } from "lucide-react";
import type { ReactNode } from "react";

/**
 * The three states every page needs: loading, error and "no data yet".
 * Showing them clearly is better than showing a wrong or empty chart.
 */

/** Shown while the data source is being read. */
export function LoadingState({ label = "Loading records..." }: { label?: string }) {
  return (
    <div
      role="status"
      className="flex items-center justify-center gap-3 rounded-3xl border border-peach-deep/70 bg-ivory px-6 py-12 text-brown-soft"
    >
      <Loader2 className="h-5 w-5 animate-spin text-primary" aria-hidden="true" />
      <span className="text-sm font-bold">{label}</span>
    </div>
  );
}

/** Shown when reading the records failed. Never falls back to sample data. */
export function ErrorState({
  message,
  onRetry,
}: {
  message: string;
  onRetry?: () => void;
}) {
  return (
    <div
      role="alert"
      className="rounded-3xl border border-danger/40 bg-danger-soft px-6 py-8 text-center"
    >
      <AlertTriangle className="mx-auto h-7 w-7 text-danger" aria-hidden="true" />
      <p className="mt-3 font-display text-lg font-bold text-danger">We could not load the data</p>
      <p className="mx-auto mt-2 max-w-xl text-sm text-brown">{message}</p>
      {onRetry ? (
        <button type="button" className="btn-primary mt-5" onClick={onRetry}>
          <RefreshCw className="h-4 w-4" aria-hidden="true" />
          Try again
        </button>
      ) : null}
    </div>
  );
}

/** Shown when the current dataset has no records to analyse. */
export function EmptyState({
  title,
  message,
  action,
}: {
  title: string;
  message: string;
  action?: ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-dashed border-peach-deep bg-ivory px-6 py-12 text-center">
      <Inbox className="mx-auto h-7 w-7 text-brown-soft" aria-hidden="true" />
      <p className="mt-3 font-display text-lg font-bold text-brown">{title}</p>
      <p className="mx-auto mt-2 max-w-xl text-sm text-brown-soft">{message}</p>
      {action ? <div className="mt-5 flex justify-center">{action}</div> : null}
    </div>
  );
}
