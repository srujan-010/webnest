"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui/Button";
import { ArrowRight, ChevronRight, ChevronLeft, PlayCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { heroProjects } from "@/lib/fallbackData";
import { getProjects, getSiteSettings, getHeroes, getShowcaseSettings, getShowcaseItems } from "@/services/api";

export function HeroSection() {
  const [projects, setProjects] = useState<any[]>(heroProjects);
  const [settings, setSettings] = useState<any>(null);
  const [hero, setHero] = useState<any>(null);
  const [showcase, setShowcase] = useState<any>(null);

  useEffect(() => {
    Promise.all([getProjects(), getSiteSettings(), getHeroes(), getShowcaseSettings(), getShowcaseItems()])
      .then(([projectsData, settingsData, heroesData, showcaseSettingsData, showcaseItemsData]) => {
        console.log("📡 [HeroSection API] Raw API responses received.");
        if (settingsData) setSettings(settingsData);
        
        let liveHero = null;
        if (heroesData && heroesData.length > 0) {
          liveHero = heroesData.find((h: any) => h.isPublished) || heroesData[0];
          setHero(liveHero);
        }

        let liveShowcase = null;
        if (showcaseSettingsData && showcaseSettingsData.length > 0) {
          liveShowcase = showcaseSettingsData.find((s: any) => s.isPublished) || showcaseSettingsData[0];
          setShowcase(liveShowcase);
        }

        if (showcaseItemsData && Array.isArray(showcaseItemsData) && showcaseItemsData.length > 0) {
          const enabledItems = showcaseItemsData.filter((item: any) => item.isEnabled);
          if (enabledItems.length > 0) {
            const sortedItems = [...enabledItems].sort((a: any, b: any) => (a.order || 0) - (b.order || 0));
            const mapped = sortedItems.map((item: any) => {
              const fp = item.project;
              
              // 🔍 [Hero Image Audit]
              const desktopImage = item.overrideBannerImage || fp?.desktopScreenshot || fp?.coverImage || "/placeholder.png";
              const mobileImage = item.overrideMobileImage || fp?.mobileScreenshot || fp?.coverImage || "/placeholder.png";
              const thumbnailImage = fp?.coverImage || "/placeholder.png";

              console.log("🔍 [Hero Image Audit] Item ID:", item._id);
              console.log("  ↳ Project ID:", fp?._id);
              console.log("  ↳ Desktop Image URL:", desktopImage);
              console.log("  ↳ Mobile Image URL:", mobileImage);
              console.log("  ↳ Thumbnail URL:", thumbnailImage);

              return {
                id: fp?._id || fp?.id,
                name: fp?.title || fp?.name,
                category: fp?.category || fp?.categories?.[0] || "Featured",
                description: item.descriptionOverride || fp?.shortDescription || fp?.description,
                desktopImage,
                mobileImage,
                thumbnailImage,
                tech: fp?.techStack || fp?.tech || [],
                caseStudyUrl: item.customCtaLink || fp?.caseStudyUrl || `/portfolio/${fp?.slug}`,
                ctaLabel: item.customCtaLabel || "View Case Study",
                slug: fp?.slug,
                isFeaturedItem: item.isFeatured
              };
            });
            setProjects(mapped);

            const featuredIndex = mapped.findIndex((p: any) => p.isFeaturedItem);
            if (featuredIndex !== -1) {
              setActiveIndex(featuredIndex);
            }
          } else if (projectsData && projectsData.length > 0) {
            setProjects(projectsData.map((fp: any) => ({
              ...fp,
              desktopImage: fp?.desktopScreenshot || fp?.coverImage || "/placeholder.png",
              mobileImage: fp?.mobileScreenshot || fp?.coverImage || "/placeholder.png",
              thumbnailImage: fp?.coverImage || "/placeholder.png"
            })));
          }
        } else if (projectsData && projectsData.length > 0) {
          setProjects(projectsData.map((fp: any) => ({
            ...fp,
            desktopImage: fp?.desktopScreenshot || fp?.coverImage || "/placeholder.png",
            mobileImage: fp?.mobileScreenshot || fp?.coverImage || "/placeholder.png",
            thumbnailImage: fp?.coverImage || "/placeholder.png"
          })));
        }
      })
      .catch((err) => {
        console.error("❌ [HeroSection API] Error fetching content:", err);
      });
  }, []);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const activeProject = projects[activeIndex] || heroProjects[0];
  if (activeProject) {
    console.log(`🖼️ [HeroSection React State] Active Project name: "${activeProject.name}" | desktopImage: "${activeProject.desktopImage}"`);
  }

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    
    const autoPlay = showcase?.autoPlay ?? true;
    const interval = showcase?.autoPlayInterval ?? 4500;

    if (autoPlay && !isHovered && projects.length > 1) {
      timerRef.current = setInterval(() => {
        setActiveIndex((prev) => {
          const isLast = prev === projects.length - 1;
          const infinite = showcase?.infiniteLoop ?? true;
          if (isLast && !infinite) {
            clearInterval(timerRef.current!);
            return prev;
          }
          return (prev + 1) % projects.length;
        });
      }, interval);
    }
  };

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [activeIndex, isHovered, projects.length]);

  const handleThumbnailClick = (idx: number) => {
    setActiveIndex(idx);
    resetTimer();
  };

  return (
    <section className="relative w-full bg-white overflow-hidden pt-28 pb-12 lg:pt-36 lg:pb-16 xl:min-h-screen xl:flex xl:items-center">
      {/* Subtle background gradient - No random abstract blobs */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#F8FBFF] via-white to-white pointer-events-none" />
      
      <div className="max-w-[1920px] mx-auto w-full px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 xl:gap-24">
          
          {/* Left Column (45%) */}
          <div className="w-full lg:w-[45%] flex flex-col justify-center max-w-2xl lg:max-w-none mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <div className="inline-flex items-center rounded-full bg-blue-50/80 px-3 py-1 text-xs font-semibold text-brand-600 ring-1 ring-inset ring-brand-600/10 mb-6 uppercase tracking-wider backdrop-blur-sm">
                {hero?.badge || "Premium Software Agency"}
              </div>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
              className="text-[36px] sm:text-5xl lg:text-[54px] xl:text-[64px] font-bold tracking-[-0.02em] text-ink-900 leading-[0.98] mb-6 font-display"
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
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-600 to-[#6D5EF5]">
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
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-600 to-[#6D5EF5]">
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
              className="text-lg md:text-[19px] text-ink-600 mb-10 max-w-[480px] leading-[1.6]"
            >
              {hero?.subheadline || "We build premium websites, web applications, dashboards, e-commerce platforms, and digital products that help businesses grow."}
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
              className="flex flex-col sm:flex-row items-center gap-4 animate-ctas"
            >
              <Link href={hero?.primaryCta?.link || "/contact"} className="w-full sm:w-auto">
                <Button size="lg" variant="primary" className="w-full h-[52px] px-6 text-[15px] shadow-sm hover:shadow-md group">
                  {hero?.primaryCta?.label || "Start Your Project"}
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href={hero?.secondaryCta?.link || "/portfolio"} className="w-full sm:w-auto">
                <Button size="lg" variant="ghost" className="w-full h-[52px] px-6 text-[15px] border border-gray-200/60 bg-white hover:bg-gray-50 hover:border-gray-300">
                  {hero?.secondaryCta?.label || "View Our Work"}
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Right Column (55%) - Interactive Project Showcase */}
          <div 
            className={`w-full lg:w-[55%] relative perspective-[2000px] ${showcase?.mobileLayout === "hidden" ? "hidden lg:block" : ""}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.4, type: "spring", bounce: 0.2 }}
              className="w-[95%] lg:w-[92%] ml-auto"
            >
              {/* Main Browser Showcase */}
              <div 
                style={{
                  width: showcase?.desktopWidth || "100%",
                  height: showcase?.desktopHeight || "auto"
                }}
                className="bg-white rounded-2xl shadow-[0_16px_40px_-10px_rgba(0,0,0,0.06)] border border-gray-200/60 overflow-hidden group/browser relative z-10 mx-auto"
              >
                {/* Browser Chrome */}
                {showcase?.browserWindowStyle !== "minimal" && (
                  <div className="h-10 border-b border-gray-100 bg-[#FBFBFB] flex items-center px-4 gap-2 relative">
                    {showcase?.browserWindowStyle === "generic" ? (
                      <div className="flex gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-gray-300" />
                        <div className="w-2 h-2 rounded-full bg-gray-300" />
                        <div className="w-2 h-2 rounded-full bg-gray-300" />
                      </div>
                    ) : (
                      <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] border border-[#E0443E]" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] border border-[#DEA123]" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F] border border-[#1AAB29]" />
                      </div>
                    )}
                    <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center w-64 h-6 bg-white border border-gray-200/80 rounded-md text-[10px] text-gray-400 font-medium">
                      webnest.agency/projects/{activeProject.slug || activeProject.id}
                    </div>
                  </div>
                )}

                {/* Browser Content / Screenshot preview */}
                <div className="relative aspect-[16/10] bg-gray-50 overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeIndex}
                      initial={showcase?.transitionType === "slide" ? { opacity: 0, x: 200 } : { opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={showcase?.transitionType === "slide" ? { opacity: 0, x: -200 } : { opacity: 0, scale: 1.02 }}
                      transition={{ duration: (showcase?.transitionSpeed ?? 400) / 1000, ease: [0.23, 1, 0.32, 1] }}
                      className="absolute inset-0 w-full h-full"
                    >
                      <img 
                        src={activeProject.desktopImage} 
                        alt={activeProject.name} 
                        className="object-cover object-top w-full h-full group-hover/browser:scale-[1.02] transition-transform duration-700 ease-out"
                      />
                    </motion.div>
                  </AnimatePresence>

                  {/* Navigation Arrows */}
                  {showcase?.showNavigation !== false && projects.length > 1 && (
                    <>
                      <button
                        suppressHydrationWarning
                        onClick={() => setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length)}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-sm opacity-0 group-hover/browser:opacity-100 transition-opacity z-20"
                      >
                        <ChevronLeft className="w-5 h-5 -translate-x-0.5" />
                      </button>
                      <button
                        suppressHydrationWarning
                        onClick={() => setActiveIndex((prev) => (prev + 1) % projects.length)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-sm opacity-0 group-hover/browser:opacity-100 transition-opacity z-20"
                      >
                        <ChevronRight className="w-5 h-5 translate-x-0.5" />
                      </button>
                    </>
                  )}

                  {/* Gradient Overlay for Text */}
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-900/90 via-ink-900/30 to-transparent opacity-90" />

                  {/* Project Info Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="flex-1">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={`text-${activeIndex}`}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-white/80 text-[11px] font-semibold uppercase tracking-widest">{activeProject.category}</span>
                            <span className="w-8 h-px bg-white/30" />
                          </div>
                          <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 font-display">{activeProject.name}</h3>
                          <p className="text-white/70 text-sm md:text-base max-w-lg mb-4">{activeProject.description}</p>
                          
                          <div className="flex flex-wrap items-center gap-2">
                            {activeProject.tech.map((tag) => (
                              <span key={tag} className="px-2.5 py-1 rounded bg-white/10 backdrop-blur border border-white/10 text-white/90 text-xs font-medium">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    <Link href={activeProject.caseStudyUrl || `/portfolio/${activeProject.slug || activeProject.id || ""}`} className="shrink-0">
                      <Button variant="primary" className="bg-white text-ink-900 hover:bg-gray-50 h-11 px-5 shadow-xl text-sm font-semibold rounded-xl flex items-center">
                        {activeProject.ctaLabel || "View Case Study"} <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Indicators Dots */}
              {showcase?.showIndicators !== false && projects.length > 1 && (
                <div className="mt-4 flex justify-center gap-1.5">
                  {projects.map((_, idx) => (
                    <button
                      suppressHydrationWarning
                      key={idx}
                      onClick={() => handleThumbnailClick(idx)}
                      className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${idx === activeIndex ? "bg-brand-600 w-3" : "bg-gray-300 hover:bg-gray-400"}`}
                    />
                  ))}
                </div>
              )}

              {/* Thumbnails Strip */}
              {projects.length > 1 && (
                <div className="mt-6 flex flex-nowrap items-center gap-3 overflow-x-auto pb-2 scrollbar-hide snap-x">
                  {projects.map((project, idx) => {
                    const isActive = idx === activeIndex;
                    return (
                      <button
                        suppressHydrationWarning
                        key={project._id || project.id || idx}
                        onClick={() => handleThumbnailClick(idx)}
                        className={`relative flex-shrink-0 text-left transition-all duration-400 rounded-xl overflow-hidden snap-start ${
                          isActive 
                            ? "w-[240px] shadow-sm ring-1 ring-brand-500/50 bg-white" 
                            : "w-[180px] hover:w-[200px] opacity-70 hover:opacity-100 hover:bg-gray-50 bg-transparent"
                        }`}
                      >
                        <div className="flex items-center p-2 gap-3">
                          <div className={`relative rounded-lg overflow-hidden shrink-0 transition-all duration-400 ${isActive ? "w-[60px] h-[60px] shadow-sm" : "w-10 h-10"}`}>
                            <img 
                              src={project.thumbnailImage} 
                              alt={project.name}
                              className="w-full h-full object-cover object-top"
                            />
                          </div>
                          <div className="flex-1 min-w-0 pr-2">
                            <p className={`text-sm font-bold text-ink-900 truncate transition-all duration-300 ${isActive ? "mb-0.5" : "text-[13px]"}`}>
                              {project.name}
                            </p>
                            <p className="text-[11px] text-ink-400 truncate">
                              {project.category}
                            </p>
                          </div>
                        </div>
                        
                        {/* Active Underline */}
                        {isActive && (
                          <motion.div 
                            layoutId="activeTab"
                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-600" 
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
