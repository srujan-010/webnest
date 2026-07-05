"use client";

import * as React from "react";
import { useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowRight, ExternalLink, Code2, Monitor, Smartphone, Layers } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export type ProjectData = {
  name: string;
  category: string;
  description: string;
  features?: string[];
  tech?: string[];
  desktopImage?: string;
  mobileImage?: string;
  domain?: string;
  caseStudyUrl?: string;
  liveDemoUrl?: string;
  color?: string;
  accent?: string;
};

export type BrowserShowcaseProps = {
  projects: ProjectData[];
  title?: React.ReactNode;
  subtitle?: string;
  badge?: string;
  className?: string;
};

const getIconForCategory = (category: string) => {
  const cat = category.toLowerCase();
  if (cat.includes("web") || cat.includes("platform")) return <Monitor className="w-5 h-5" />;
  if (cat.includes("app") || cat.includes("mobile")) return <Smartphone className="w-5 h-5" />;
  if (cat.includes("design") || cat.includes("ui")) return <Layers className="w-5 h-5" />;
  return <Code2 className="w-5 h-5" />;
};

export function BrowserShowcase({
  projects,
  title = "Selected Work",
  subtitle = "Digital products that set the standard.",
  badge = "Featured Projects",
  className,
}: BrowserShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // We map the total scrollable height based on the number of projects.
  // We'll give 120vh of scrolling space per project for a smooth, relaxed pace.
  const scrollHeight = `${projects.length * 120}vh`;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth the scroll progress to prevent jitter during fast scrolling
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // activeIdx is derived directly from the smoothed scroll progress.
  const [activeIdx, setActiveIdx] = React.useState(0);
  
  React.useEffect(() => {
    return smoothProgress.on("change", (latest) => {
      // Calculate which project should be active based on the scroll fraction.
      // E.g., if there are 4 projects, 0-0.25 is index 0, 0.25-0.50 is index 1, etc.
      let idx = Math.floor(latest * projects.length);
      // Clamp to valid bounds
      idx = Math.max(0, Math.min(idx, projects.length - 1));
      setActiveIdx(idx);
    });
  }, [smoothProgress, projects.length]);

  // We want to add a subtle continuous perspective shift as the user scrolls
  const rotateX = useTransform(smoothProgress, [0, 1], [5, -5]);
  const rotateY = useTransform(smoothProgress, [0, 1], [-5, 5]);

  if (!projects || projects.length === 0) return null;

  return (
    <div ref={containerRef} className={cn("relative bg-ink-900", className)} style={{ height: scrollHeight }}>
      {/* Sticky viewport wrapper */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col lg:flex-row items-center pt-24 lg:pt-0">
        
        {/* Left Side: Content (Full width on mobile, half on desktop) */}
        <div className="w-full lg:w-1/2 h-[45vh] lg:h-full flex flex-col justify-center px-6 md:px-12 lg:px-20 xl:px-24 relative z-20 shrink-0">
          
          <div className="flex items-center gap-2 mb-6">
            <div className="w-2 h-2 rounded-full bg-brand-500" />
            <span className="text-xs font-bold uppercase tracking-wider text-brand-400">{badge}</span>
          </div>

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-3 lg:mb-4 tracking-tight leading-[1.1] font-display">
            {title}
          </h2>
          <p className="text-zinc-400 text-lg lg:text-xl max-w-md mb-8 lg:mb-16">
            {subtitle}
          </p>

          {/* Crossfading Project Content */}
          <div className="relative h-[250px] lg:h-[320px] w-full max-w-lg">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIdx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="absolute inset-0 flex flex-col"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-brand-400">
                    {getIconForCategory(projects[activeIdx].category)}
                  </div>
                  <div>
                    <h3 className="text-2xl lg:text-3xl font-bold text-white font-display">
                      {projects[activeIdx].name}
                    </h3>
                    <p className="text-sm text-brand-400 uppercase tracking-widest font-bold mt-1">
                      {projects[activeIdx].category}
                    </p>
                  </div>
                </div>

                <p className="text-zinc-400 leading-relaxed mb-6">
                  {projects[activeIdx].description}
                </p>

                {projects[activeIdx].features && (
                  <ul className="grid grid-cols-2 gap-x-4 gap-y-2 mb-6">
                    {projects[activeIdx].features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-zinc-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-500/50 shrink-0" />
                        <span className="truncate">{feature}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <div className="mt-auto flex items-center gap-4 pt-4 border-t border-white/10">
                  {projects[activeIdx].caseStudyUrl && (
                    <Link 
                      href={projects[activeIdx].caseStudyUrl}
                      className="group flex items-center justify-center gap-2 px-6 py-3 bg-white text-ink-900 rounded-full font-medium hover:bg-brand-50 transition-colors text-sm"
                    >
                      Case Study
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  )}
                  {projects[activeIdx].liveDemoUrl && (
                    <Link 
                      href={projects[activeIdx].liveDemoUrl}
                      target="_blank"
                      className="flex items-center justify-center gap-2 px-6 py-3 bg-white/5 text-white border border-white/10 rounded-full font-medium hover:bg-white/10 transition-colors text-sm"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Live Site
                    </Link>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Progress Indicators */}
          <div className="absolute bottom-12 lg:bottom-24 left-6 md:left-12 lg:left-20 flex gap-2">
            {projects.map((_, idx) => (
              <div 
                key={idx} 
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  idx === activeIdx ? "w-8 bg-brand-500" : "w-2 bg-white/20"
                )} 
              />
            ))}
          </div>
        </div>

        {/* Right Side: 3D Browser Stack */}
        <div 
          className="w-full lg:w-1/2 h-[55vh] lg:h-full relative flex items-center justify-center pointer-events-none"
          style={{ perspective: "2000px" }}
        >
          {/* Subtle ambient lighting behind the browsers */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-500/10 via-transparent to-transparent opacity-50 blur-3xl" />

          <motion.div 
            className="w-full h-full flex items-center justify-center relative"
            style={{ 
              rotateX, 
              rotateY,
              transformStyle: "preserve-3d"
            }}
          >
            {projects.map((project, idx) => {
              const isActive = activeIdx === idx;
              const isPrev = idx < activeIdx;
              
              // We only render items close to the active index to save GPU performance
              if (Math.abs(activeIdx - idx) > 2) return null;

              return (
                <motion.div
                  key={idx}
                  className="absolute w-[85%] max-w-[600px] xl:max-w-[700px] flex items-center justify-center"
                  initial={false}
                  animate={{
                    opacity: isActive ? 1 : isPrev ? 0 : 0,
                    scale: isActive ? 1 : isPrev ? 1.05 : 0.95,
                    z: isActive ? 0 : isPrev ? 150 : -150,
                    rotateX: isActive ? 0 : isPrev ? -10 : 10,
                    rotateY: isActive ? 0 : isPrev ? 5 : -5,
                    x: isActive ? 0 : isPrev ? "-10%" : "10%",
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 70,
                    damping: 20,
                    mass: 1,
                  }}
                  style={{
                    transformOrigin: "center center",
                  }}
                >
                  <div className="w-full aspect-[4/3] md:aspect-[16/10] bg-white rounded-xl md:rounded-2xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5),_0_0_0_1px_rgba(255,255,255,0.1)] overflow-hidden flex flex-col pointer-events-auto">
                    
                    {/* Browser Chrome */}
                    <div className="h-8 md:h-10 bg-[#f5f5f7] border-b border-black/5 flex items-center px-3 md:px-4 shrink-0 relative">
                      <div className="flex items-center gap-1.5 md:gap-2">
                        <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-[#ff5f56]" />
                        <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-[#ffbd2e]" />
                        <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-[#27c93f]" />
                      </div>
                      
                      {project.domain && (
                        <div className="absolute left-1/2 -translate-x-1/2 bg-white border border-black/5 rounded-md px-2 md:px-3 py-1 text-[9px] md:text-xs text-zinc-500 flex items-center gap-1.5 shadow-sm max-w-[50%] md:max-w-[60%] justify-center">
                          <svg className="w-2.5 h-2.5 md:w-3 md:h-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                          <span className="truncate">{project.domain}</span>
                        </div>
                      )}
                    </div>
                    
                    {/* Browser Content */}
                    <div className="flex-1 relative bg-zinc-100 overflow-hidden">
                      {project.desktopImage || project.mobileImage ? (
                        <img 
                          src={project.desktopImage || project.mobileImage || ""} 
                          alt={project.name} 
                          className="w-full h-full object-cover object-top"
                          loading="lazy"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-zinc-100 text-zinc-400 font-mono text-sm">
                          No preview available
                        </div>
                      )}
                    </div>

                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

      </div>
    </div>
  );
}
