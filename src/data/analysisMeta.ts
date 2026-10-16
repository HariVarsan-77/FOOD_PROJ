import { IndianRupee, Star, Timer, UtensilsCrossed, type LucideIcon } from "lucide-react";

/**
 * One place describing the four analyses, used by the home page cards,
 * the category row and the individual analysis pages.
 */
export interface AnalysisMeta {
  /** Used in the URL, e.g. /analyses/revenue */
  slug: string;
  href: string;
  /** Heading shown on the analysis page. */
  title: string;
  /** Short label used in the scrollable category row. */
  shortTitle: string;
  icon: LucideIcon;
  /** One sentence explaining what the analysis does. */
  summary: string;
  /** Tailwind classes for the round icon bubble. */
  iconClass: string;
  /** Which mini chart preview to draw on the home page card. */
  previewVariant: "revenue" | "popularity" | "delivery" | "satisfaction";
}

export const ANALYSIS_LIST: AnalysisMeta[] = [
  {
    slug: "revenue",
    href: "/analyses/revenue",
    title: "Revenue Analysis",
    shortTitle: "Revenue",
    icon: IndianRupee,
    summary:
      "See how much money each food category brings in and which category earns the most.",
    iconClass: "bg-peach text-primary",
    previewVariant: "revenue",
  },
  {
    slug: "popular-categories",
    href: "/analyses/popular-categories",
    title: "Popular Food Categories",
    shortTitle: "Popular Categories",
    icon: UtensilsCrossed,
    summary:
      "Find out which food categories customers order most often and their share of all orders.",
    iconClass: "bg-success-soft text-success",
    previewVariant: "popularity",
  },
  {
    slug: "delivery-efficiency",
    href: "/analyses/delivery-efficiency",
    title: "Delivery Efficiency Analysis",
    shortTitle: "Delivery Efficiency",
    icon: Timer,
    summary:
      "Compare average delivery times between categories against the overall average.",
    iconClass: "bg-peach text-primary-soft",
    previewVariant: "delivery",
  },
  {
    slug: "customer-satisfaction",
    href: "/analyses/customer-satisfaction",
    title: "Customer Satisfaction Analysis",
    shortTitle: "Customer Satisfaction",
    icon: Star,
    summary:
      "Check whether orders that arrive faster are rated higher by customers.",
    iconClass: "bg-danger-soft text-danger",
    previewVariant: "satisfaction",
  },
];

/** Looks up one analysis by its slug. */
export function getAnalysisMeta(slug: string): AnalysisMeta | undefined {
  return ANALYSIS_LIST.find((analysis) => analysis.slug === slug);
}
