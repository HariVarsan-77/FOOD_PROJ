import Link from "next/link";

/** Footer with the project note and the technology used. */
export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-peach-deep/70 bg-ivory">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 text-sm text-brown-soft sm:px-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-display text-base font-bold text-brown">
            Food Delivery Data Analysis
          </p>
          <p className="mt-1 max-w-xl">
            Revenue, popular categories, delivery efficiency and customer satisfaction, calculated
            from the active dataset with Next.js, TypeScript, Tailwind CSS and Recharts.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Link href="/" className="btn-ghost">
            Home
          </Link>
          <Link href="/food-data" className="btn-secondary">
            Add a record
          </Link>
        </div>
      </div>
      <p className="border-t border-peach-deep/50 px-4 py-4 text-center text-xs text-brown-soft sm:px-6">
        The demo dataset is sample data for demonstration, not real delivery records.
      </p>
    </footer>
  );
}
