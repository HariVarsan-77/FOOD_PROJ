"use client";

import { Database, ShieldCheck } from "lucide-react";
import { RecordForm } from "@/components/food-data/RecordForm";
import { RecordsTable } from "@/components/food-data/RecordsTable";
import { DataSourceNotice } from "@/components/ui/DataSourceBadge";
import { ErrorState, LoadingState } from "@/components/ui/StateBlocks";
import { useFoodRecords } from "@/hooks/useFoodRecords";
import { formatNumber } from "@/utils/format";

export default function FoodDataPage() {
  const {
    records,
    status,
    isLoading,
    isRefreshing,
    error,
    refresh,
    addRecord,
    sampleCount,
    userCount,
  } = useFoodRecords();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:py-14">
      <header>
        <h1 className="font-display text-3xl leading-tight font-extrabold text-primary sm:text-4xl">
          Food Data
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-brown">
          Add your own food delivery records here. Each saved record joins the dataset immediately and
          is included in the revenue, popularity, delivery efficiency and customer satisfaction
          calculations. Records you add are stored separately from the built-in sample data and are
          never overwritten or deleted by the app.
        </p>
      </header>

      <div className="mt-6">
        <DataSourceNotice status={status} />
      </div>

      {error ? (
        <div className="mt-6">
          <ErrorState message={error} onRetry={() => void refresh()} />
        </div>
      ) : null}

      {!error && isLoading ? (
        <div className="mt-6">
          <LoadingState label="Loading records..." />
        </div>
      ) : null}

      {!error && !isLoading ? (
        <>
          {/* Small honesty banner: where the records actually live */}
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="panel-tight flex items-start gap-3">
              <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-peach text-primary">
                <ShieldCheck className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-bold text-brown">Your records are safe</p>
                <p className="mt-1 text-xs text-brown-soft">
                  Saving always adds one new record. Nothing is replaced, and there is no
                  &quot;delete everything&quot; action anywhere in the app.
                </p>
              </div>
            </div>
            <div className="panel-tight flex items-start gap-3">
              <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-peach text-primary">
                <Database className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-bold text-brown">
                  {formatNumber(sampleCount)} sample + {formatNumber(userCount)} of yours
                </p>
                <p className="mt-1 text-xs text-brown-soft">
                  {status.isLive
                    ? "Both groups are read from the database."
                    : "Sample rows are read-only demo data; your rows are kept in this browser."}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            <RecordForm onAdd={addRecord} />
            <RecordsTable
              records={records}
              isRefreshing={isRefreshing}
              onRefresh={() => void refresh()}
            />
          </div>
        </>
      ) : null}
    </div>
  );
}
