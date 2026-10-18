import type { Metadata } from "next";
import { AnalysisCategoryNav } from "@/components/home/AnalysisCategoryNav";
import { Hero } from "@/components/home/Hero";
import { InsightsDashboard } from "@/components/home/InsightsDashboard";
import { ProjectIntroduction } from "@/components/home/ProjectIntroduction";

export const metadata: Metadata = {
  title: "Food Delivery Data Analysis | Interactive Analytics Platform",
  description:
    "Explore revenue trends, popular food categories, delivery efficiency, and customer satisfaction from real-time food delivery order data.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProjectIntroduction />
      <AnalysisCategoryNav />
      <InsightsDashboard />
    </>
  );
}
