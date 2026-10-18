"use client";

import Link from "next/link";
import { ArrowLeft, ChevronRight, Database, PlusCircle, ShieldCheck, Sparkles } from "lucide-react";
import { RecordForm } from "@/components/food-data/RecordForm";
import { RecordsTable } from "@/components/food-data/RecordsTable";
import { ErrorState, LoadingState } from "@/components/ui/StateBlocks";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
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
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:py-12">
      {/* Top Breadcrumb Nav */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-bold text-brown-soft border-b border-peach-deep/30 pb-4">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 transition hover:text-primary"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
          <span>Dashboard</span>
        </Link>
        <ChevronRight className="h-3.5 w-3.5 opacity-50" aria-hidden="true" />
        <span className="text-primary">Data Management</span>
      </nav>

      <ScrollReveal direction="up">
        <header className="mt-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-peach-deep/60 bg-cream/70 px-3 py-1 text-[11px] font-extrabold uppercase tracking-widest text-primary">
            <PlusCircle className="h-3 w-3" />
            Interactive Data Pipeline
          </div>
          <h1 className="mt-3 font-display text-3xl leading-tight font-extrabold text-onyx sm:text-4xl lg:text-[2.6rem]">
            Food Order Data Management
          </h1>
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-brown-soft sm:text-lg">
            Add new order transactions to the active dataset. Newly submitted records trigger instant
            recalculation across revenue distributions, category popularity, delivery efficiency, and
            customer satisfaction models.
          </p>
        </header>
      </ScrollReveal>

      {error ? (
        <div className="mt-6">
          <ErrorState message={error} onRetry={() => void refresh()} />
        </div>
      ) : null}

      {!error && isLoading ? (
        <div className="mt-6">
          <LoadingState label="Loading dataset records..." />
        </div>
      ) : null}

      {!error && !isLoading ? (
        <>
          {/* Unified 2.5D Data Pipeline Status Banner */}
          <ScrollReveal direction="up" delayMs={50}>
            <div
              className="mt-6 grid gap-4 sm:grid-cols-2 rounded-2xl p-4 sm:p-5"
              style={{
                background: "linear-gradient(155deg, #ffffff 0%, #fffcf5 60%, #fef4e2 100%)",
                border: "1.5px solid rgba(212, 160, 23, 0.35)",
                boxShadow:
                  "0 2px 8px -2px rgba(13, 10, 6, 0.05), 0 8px 18px -4px rgba(13, 10, 6, 0.06), inset 0 1px 0 rgba(255, 255, 255, 1)",
              }}
            >
              <div className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-peach text-primary">
                  <Database className="h-4.5 w-4.5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-bold text-onyx">
                    Dataset Scope: {formatNumber(sampleCount)} baseline + {formatNumber(userCount)} added
                  </p>
                  <p className="mt-0.5 text-xs text-brown-soft">
                    {status.description}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 border-t sm:border-t-0 sm:border-l border-peach-deep/30 pt-3 sm:pt-0 sm:pl-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-success-soft text-success">
                  <ShieldCheck className="h-4.5 w-4.5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-bold text-onyx">Continuous Data Preservation</p>
                  <p className="mt-0.5 text-xs text-brown-soft">
                    New rows are appended without overwriting existing data. Destructive actions are disabled.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <div className="mt-8 space-y-8">
            <ScrollReveal direction="up" delayMs={100}>
              <RecordForm onAdd={addRecord} />
            </ScrollReveal>

            <ScrollReveal direction="up" delayMs={150}>
              <RecordsTable
                records={records}
                isRefreshing={isRefreshing}
                onRefresh={() => void refresh()}
              />
            </ScrollReveal>
          </div>
        </>
      ) : null}
    </div>
  );
}
