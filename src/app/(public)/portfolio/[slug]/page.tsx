import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjectBySlug, getProjects } from "@/services/api";
import { CaseStudyClient } from "./CaseStudyClient";

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const projects = await getProjects() || [];
  return projects.map((project: any) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Project Not Found" };
  
  // Custom SEO from CMS if available
  const metaTitle = project.seo?.metaTitle || `${project.name} | WebNest Case Study`;
  const metaDesc = project.seo?.metaDescription || project.shortDescription || project.description;
  const keywords = project.seo?.keywords ? project.seo.keywords.split(',') : [];

  return {
    title: metaTitle,
    description: metaDesc,
    keywords: keywords,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  // Fetch all projects for the related projects section
  const allProjects = await getProjects() || [];
  const relatedProjects = allProjects
    .filter((p: any) => p.slug !== slug && p.status === 'published')
    .filter((p: any) => p.category === project.category || p.categories?.includes(project.category))
    .slice(0, 3);

  // Fallback to any published projects if we don't have 3 matching category ones
  if (relatedProjects.length < 3) {
    const existingSlugs = new Set(relatedProjects.map((p: any) => p.slug));
    const fallbacks = allProjects.filter(
      (p: any) => p.slug !== slug && p.status === 'published' && !existingSlugs.has(p.slug)
    );
    relatedProjects.push(...fallbacks.slice(0, 3 - relatedProjects.length));
  }

  return <CaseStudyClient project={project} relatedProjects={relatedProjects} />;
}
