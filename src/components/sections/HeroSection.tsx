"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui/Button";
import { ArrowRight, ChevronRight, ChevronLeft, PlayCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { heroProjects } from "@/lib/fallbackData";
import { getProjects, getSiteSettings, getHeroes, getShowcaseSettings, getShowcaseItems } from "@/services/api";
import { usePreview } from "@/components/providers/PreviewProvider";
import { CheckCircle2 } from "lucide-react";
import { Hero3DShowcase } from "@/components/ui/hero-3d-showcase";

export function HeroSection() {
  const [projects, setProjects] = useState<any[]>(heroProjects);
  const [fetchedHero, setFetchedHero] = useState<any>(null);

  useEffect(() => {
    Promise.all([getProjects(), getHeroes(), getShowcaseItems()])
      .then(([projectsData, heroesData, showcaseItemsData]) => {
        if (heroesData && heroesData.length > 0) {
          const liveHero = heroesData.find((h: any) => h.isPublished) || heroesData[0];
          setFetchedHero(liveHero);
        }

        if (showcaseItemsData && Array.isArray(showcaseItemsData) && showcaseItemsData.length > 0) {
          const enabledItems = showcaseItemsData.filter((item: any) => item.isEnabled);
          if (enabledItems.length > 0) {
            const sortedItems = [...enabledItems].sort((a: any, b: any) => (a.order || 0) - (b.order || 0));
            const mapped = sortedItems.map((item: any) => {
              const fp = item.project;
              return {
                id: fp?._id || fp?.id,
                name: fp?.title || fp?.name || "Project",
                category: fp?.category || "Featured",
                description: item.descriptionOverride || fp?.shortDescription || "",
                desktopImage: item.overrideBannerImage || fp?.desktopScreenshot || fp?.coverImage || "/placeholder.png",
                domain: fp?.domain,
              };
            });
            setProjects(mapped);
          } else if (projectsData && projectsData.length > 0) {
            setProjects(projectsData.map((fp: any) => ({
              id: fp?._id || fp?.id,
              name: fp?.title || fp?.name,
              category: fp?.category,
              description: fp?.shortDescription,
              desktopImage: fp?.desktopScreenshot || fp?.coverImage || "/placeholder.png",
              domain: fp?.domain,
            })));
          }
        }
      })
      .catch((err) => {
        console.error("❌ [HeroSection API] Error fetching content:", err);
      });
  }, []);

  const hero = usePreview(fetchedHero, "hero");

  const servicesList = [
    "Web Applications",
    "SaaS Platforms",
    "Ecommerce",
    "AI Solutions"
  ];

  return (
    <section className="relative w-full bg-white overflow-hidden min-h-screen flex items-center pt-24 pb-12 lg:pt-0 lg:pb-0">
      {/* Subtle background gradient for Light Theme */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_var(--tw-gradient-stops))] from-blue-50/50 via-white to-white pointer-events-none" />
      
      <div className="max-w-[1920px] mx-auto w-full px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
          
          {/* Left Column (40%) */}
          <div className="w-full lg:w-[40%] flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <div className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-[11px] font-bold text-brand-600 ring-1 ring-inset ring-brand-600/10 mb-6 uppercase tracking-wider backdrop-blur-sm shadow-sm">
                {hero?.badge || "Premium Software Agency"}
              </div>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
              className="text-[40px] sm:text-5xl lg:text-[56px] xl:text-[64px] font-semibold tracking-[-0.01em] text-ink-950 leading-[1.1] mb-6 font-display"
            >
              {(() => {
                const heading = hero?.headline || "Crafting Digital Experiences That Drive Business Growth";
                const highlight = hero?.headlineHighlight;
                if (highlight) {
                  const parts = heading.split(highlight);
                  if (parts.length > 1) {
                    return (
                      <>
                        {parts[0]}
                        <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-600 via-blue-500 to-[#6D5EF5]">
                          {highlight}
                        </span>
                        {parts[1]}
                      </>
                    );
                  }
                }
                const words = heading.split(" ");
                if (words.length <= 2) return heading;
                const mainText = words.slice(0, -2).join(" ");
                const highlightText = words.slice(-2).join(" ");
                return (
                  <>
                    {mainText}{" "}
                    <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-600 via-blue-500 to-[#6D5EF5]">
                      {highlightText}
                    </span>
                  </>
                );
              })()}
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
              className="text-lg text-ink-600/90 mb-8 max-w-[500px] leading-[1.7] font-normal"
            >
              {hero?.subheadline || "We build premium websites, web applications, dashboards, e-commerce platforms, and digital products that help businesses grow."}
            </motion.p>
            
            {/* Animated Services Checklist */}
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } }
              }}
              className="flex flex-col gap-3 mb-10"
            >
              {servicesList.map((service, idx) => (
                <motion.div 
                  key={idx}
                  variants={{
                    hidden: { opacity: 0, x: -10 },
                    visible: { opacity: 1, x: 0 }
                  }}
                  className="flex items-center gap-3"
                >
                  <div className="flex items-center justify-center w-5 h-5 rounded-full bg-brand-100 text-brand-600 shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5" strokeWidth={3} />
                  </div>
                  <span className="text-ink-800 font-semibold text-[15px]">{service}</span>
                </motion.div>
              ))}
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
              className="flex flex-col sm:flex-row items-center gap-4"
            >
              <Link href={hero?.primaryCta?.link || "/contact"} className="w-full sm:w-auto">
                <Button size="lg" variant="primary" className="w-full h-[54px] px-8 text-base shadow-lg shadow-brand-500/25 hover:shadow-xl hover:shadow-brand-500/40 hover:-translate-y-0.5 transition-all duration-300 group rounded-xl">
                  {hero?.primaryCta?.label || "Start Your Project"}
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href={hero?.secondaryCta?.link || "/portfolio"} className="w-full sm:w-auto">
                <Button size="lg" variant="ghost" className="w-full h-[54px] px-8 text-base border border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 rounded-xl text-ink-700 font-semibold">
                  {hero?.secondaryCta?.label || "View Our Work"}
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Right Column (60%) - 3D Orbital Showcase */}
          <div className="w-full lg:w-[60%] relative z-10">
            <Hero3DShowcase projects={projects} />
          </div>

        </div>
      </div>
    </section>
  );
}
