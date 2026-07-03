import { PortfolioContent } from "@/components/sections/PortfolioContent";
import { getProjects } from "@/services/api";

export default async function PortfolioPage() {
  const projects = await getProjects() || [];
  
  // Extract unique categories for the filter
  const categoriesSet = new Set<string>();
  categoriesSet.add("All");
  
  projects.forEach((p: any) => {
    if (p.category) {
      categoriesSet.add(p.category);
    }
  });
  
  const projectCategories = Array.from(categoriesSet);

  return (
    <PortfolioContent projects={projects} categories={projectCategories} />
  );
}
