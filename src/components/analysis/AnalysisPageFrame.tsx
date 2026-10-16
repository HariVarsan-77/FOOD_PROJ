import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";
import { DataSourceBadge } from "@/components/ui/DataSourceBadge";
import type { DataSourceStatus } from "@/types/records";

/**
 * The frame shared by all four analysis pages: breadcrumb, page heading,
 * explanation text and the demo / live dataset badge.
 *
 * The page-specific numbers, chart and interpretation are passed as children,
 * so every analysis page keeps exactly the same structure.
 */
export function AnalysisPageFrame({
  title,
  intro,
  status,
  children,
}: {
  title: string;
  /** Plain-language explanation of what the analysis does, shown under the title. */
  intro: string;
  status: DataSourceStatus;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:py-14">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm font-bold text-brown-soft transition hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Back to dashboard
      </Link>

      <header className="mt-5">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="font-display text-3xl leading-tight font-extrabold text-primary sm:text-4xl">
            {title}
          </h1>
          <DataSourceBadge status={status} />
        </div>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-brown">{intro}</p>
      </header>

      <div className="mt-8 space-y-6">{children}</div>
    </div>
  );
}

/**
 * A labelled block used for the "How this is calculated" and
 * "Interpretation" sections of an analysis page.
 */
export function AnalysisSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="panel">
      <h2 className="font-display text-xl font-extrabold text-brown">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}
