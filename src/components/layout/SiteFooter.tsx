import Link from "next/link";

/** Footer with the project note and the technology used. */
export function SiteFooter() {
  return (
    <footer
      className="mt-16"
      style={{
        background: "linear-gradient(180deg, #1a1108 0%, #0d0a06 100%)",
        borderTop: "1px solid rgba(212,160,23,0.35)",
      }}
    >
      <div
        className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 text-sm sm:px-6 md:flex-row md:items-center md:justify-between"
        style={{ color: "rgba(252,233,160,0.65)" }}
      >
        <div>
          <p className="font-display text-base font-bold" style={{ color: "#f0c842" }}>
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
      <p
        className="px-4 py-4 text-center text-xs sm:px-6"
        style={{
          borderTop: "1px solid rgba(212,160,23,0.20)",
          color: "rgba(252,233,160,0.40)",
        }}
      >
        The demo dataset is sample data for demonstration, not real delivery records.
      </p>
    </footer>
  );
}

