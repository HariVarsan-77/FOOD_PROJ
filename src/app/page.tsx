import type { Metadata } from "next";
import { AnalysisCategoryNav } from "@/components/home/AnalysisCategoryNav";
import { Hero } from "@/components/home/Hero";
import { InsightsDashboard } from "@/components/home/InsightsDashboard";

export const metadata: Metadata = {
  title: "Food Delivery Data Analysis | Home",
  description:
    "Explore revenue, popular food categories, delivery efficiency and customer satisfaction from food delivery order data.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <AnalysisCategoryNav />
      <InsightsDashboard />
    </>
  );
}
