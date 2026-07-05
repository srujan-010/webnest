"use client";

import { useState, useEffect } from "react";
import { projects as defaultProjects } from "@/lib/fallbackData";
import { getProjects, getFeaturedProjectSection } from "@/services/api";
import { BrowserShowcase } from "@/components/ui/browser-showcase";

export function ShowcaseSection() {
  const [projects, setProjects] = useState<any[]>(defaultProjects);
  const [sectionData, setSectionData] = useState<any>({
    badge: "Featured Projects",
    title: "Selected Work",
    subtitle: "Digital products that set the standard.",
    selectedProjectIds: []
  });

  useEffect(() => {
    Promise.all([getProjects(), getFeaturedProjectSection()]).then(([allProjects, sectionSettings]) => {
      let finalProjects = allProjects && allProjects.length > 0 ? allProjects : defaultProjects;
      
      if (sectionSettings) {
        setSectionData({
          badge: sectionSettings.badge || "Featured Projects",
          title: sectionSettings.title || "Selected Work",
          subtitle: sectionSettings.subtitle || "Digital products that set the standard.",
          selectedProjectIds: sectionSettings.selectedProjectIds || []
        });

        // Filter and reorder projects if specific ones are selected
        if (sectionSettings.selectedProjectIds && sectionSettings.selectedProjectIds.length > 0) {
          const orderedProjects = sectionSettings.selectedProjectIds
            .map((id: string) => finalProjects.find((p: any) => p._id === id))
            .filter(Boolean);
          if (orderedProjects.length > 0) {
            finalProjects = orderedProjects;
          }
        }
      }
      
      setProjects(finalProjects);
    });
  }, []);

  if (!projects || projects.length === 0) return null;

  return (
    <section id="work" className="bg-ink-900 relative">
      <BrowserShowcase 
        projects={projects}
        title={sectionData.title}
        subtitle={sectionData.subtitle}
        badge={sectionData.badge}
      />
    </section>
  );
}
