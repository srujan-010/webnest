import type { Metadata } from "next";
import { 
  getWhyUsPage, 
  getSiteSettings,
  getTeam,
  getProjects,
  getTestimonials,
  getFAQs,
  getPainPoints,
  getEngineeringStandards,
  getWhyUsReasons,
  getProcessSteps,
  getComparisonRows
} from "@/services/api";
import WhyUsClient from "./WhyUsClient";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getWhyUsPage();
  const seo = data?.seo || {};

  return {
    title: seo.metaTitle || "Why WebNest | Engineering Excellence",
    description: seo.metaDescription || "Discover why top companies trust WebNest with their digital infrastructure.",
  };
}

export default async function WhyUsPage() {
  const [
    whyUsData,
    siteSettings,
    teamMembers,
    projects,
    testimonials,
    faqs,
    painPoints,
    engineeringStandards,
    whyUsReasons,
    processSteps,
    comparisonRows
  ] = await Promise.all([
    getWhyUsPage(),
    getSiteSettings(),
    getTeam(),
    getProjects(),
    getTestimonials(),
    getFAQs(),
    getPainPoints(),
    getEngineeringStandards(),
    getWhyUsReasons(),
    getProcessSteps(),
    getComparisonRows()
  ]);

  const aggregatedData = {
    ...whyUsData,
    siteSettings,
    teamMembers,
    projects,
    testimonials,
    faqs,
    painPoints,
    engineeringStandards,
    whyUsReasons,
    processSteps,
    comparisonRows
  };

  return <WhyUsClient data={aggregatedData} />;
}
