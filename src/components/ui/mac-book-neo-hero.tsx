"use client";

import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export type FrameSequenceStep = {
  from: number;
  to: number;
  color: string;
  num: string;
  total: string;
  icon?: React.ReactNode;
  title: string;
  description: string;
  label: string;
  desktopPreview?: string;
  tabletPreview?: string;
  mobilePreview?: string;
  domain?: string;
};

export type FrameSequenceHeroProps = {
  frameCount?: number; // deprecated
  framePath?: (i: number) => string; // deprecated
  eagerCount?: number; // deprecated
  scrollHeight?: string;
  brand?: React.ReactNode;
  navLinks?: { label: string; href: string }[];
  ctaLabel?: string;
  ctaHref?: string;
  title: React.ReactNode;
  subtitle?: string;
  steps: FrameSequenceStep[];
  className?: string;
};

const cx = (...c: (string | false | null | undefined)[]) =>
  c.filter(Boolean).join(" ");

export function FrameSequenceHero({
  scrollHeight = "600vh",
  brand,
  navLinks = [],
  ctaLabel,
  ctaHref = "#",
  title,
  subtitle,
  steps,
  className,
}: FrameSequenceHeroProps) {
  const spacerRef = useRef<HTMLDivElement | null>(null);

  const [navScrolled, setNavScrolled] = useState(false);
  const [subHidden, setSubHidden] = useState(false);
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [progress, setProgress] = useState(0);
  const [stepLocal, setStepLocal] = useState(0);

  const onScroll = () => {
    const spacer = spacerRef.current;
    if (!spacer) return;
    
    // We want the scroll fraction inside the spacer.
    const rect = spacer.getBoundingClientRect();
    const scrollDistance = spacer.offsetHeight - window.innerHeight;
    const scrolledAmount = Math.max(0, -rect.top);
    
    const p = Math.max(0, Math.min(1, scrolledAmount / Math.max(1, scrollDistance)));
    setProgress(p);
    setNavScrolled(scrolledAmount > 4);
    setSubHidden(scrolledAmount > 8);
    
    let idx = -1;
    let local = 0;
    for (let i = 0; i < steps.length; i++) {
      const s = steps[i];
      if (p >= s.from && p < s.to) {
        idx = i;
        local = (p - s.from) / (s.to - s.from);
        break;
      }
    }
    
    // If not in a specific step, we can default to the closest one.
    if (idx === -1) {
      if (p < steps[0]?.from) idx = 0;
      else idx = steps.length - 1;
    }
    
    setActiveIdx(idx);
    setStepLocal(Math.max(0, Math.min(1, local)));
  };

  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [steps]);

  // Map overall progress to global camera rotation to simulate 3D scrolling
  const cameraRotateX = 15 - (progress * 30); // 15deg to -15deg
  const cameraRotateY = (progress * 20) - 10; // -10deg to 10deg
  const cameraTranslateY = (progress * 40) - 20; // Float up and down

  return (
    <div className={cx("fsh-root bg-[#fbfbfd] text-zinc-900 relative", className)}>
      {brand}

      {/* Pinned stage — always full viewport */}
      <div className="fsh-stage sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* 3D Browser Stack Container */}
        <div 
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ perspective: "2000px" }}
        >
          <div 
            className="w-full h-full flex items-center justify-center transition-transform duration-75 ease-out"
            style={{
              transform: `rotateX(${cameraRotateX}deg) rotateY(${cameraRotateY}deg) translateY(${cameraTranslateY}px)`,
              transformStyle: "preserve-3d"
            }}
          >
            <AnimatePresence mode="popLayout">
              {steps.map((s, i) => {
                const isActive = activeIdx === i;
                const isPrev = i < activeIdx;
                const isNext = i > activeIdx;

                // Only render browsers that are close to active to improve performance
                if (Math.abs(i - activeIdx) > 2) return null;

                return (
                  <motion.div
                    key={i}
                    className="absolute flex items-center justify-center w-[90%] max-w-4xl"
                    initial={false}
                    animate={{
                      opacity: isActive ? 1 : isPrev ? 0 : 0,
                      scale: isActive ? 1 : isPrev ? 1.05 : 0.95,
                      z: isActive ? 0 : isPrev ? 150 : -150,
                      rotateX: isActive ? 0 : isPrev ? -10 : 10,
                      rotateY: isActive ? 0 : isPrev ? 5 : -5,
                      y: isActive ? 0 : isPrev ? -40 : 40,
                    }}
                    transition={{ 
                      duration: 0.8, 
                      ease: [0.16, 1, 0.3, 1] 
                    }}
                    style={{
                      transformOrigin: "center center",
                    }}
                  >
                    {/* Browser Window UI */}
                    <div className="w-full aspect-[4/3] md:aspect-[16/10] bg-white rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1),_0_0_0_1px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col pointer-events-auto">
                      
                      {/* Browser Chrome */}
                      <div className="h-10 md:h-12 bg-[#f5f5f7] border-b border-black/5 flex items-center px-4 shrink-0 relative">
                        {/* Traffic Lights */}
                        <div className="flex items-center gap-1.5 md:gap-2">
                          <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#ff5f56]" />
                          <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#ffbd2e]" />
                          <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#27c93f]" />
                        </div>
                        {/* Address Bar */}
                        {s.domain && (
                          <div className="absolute left-1/2 -translate-x-1/2 bg-white/60 border border-black/5 rounded-md px-3 py-1 md:py-1.5 text-[10px] md:text-xs text-zinc-500 flex items-center gap-2 max-w-[50%] md:max-w-md w-full justify-center truncate shadow-sm">
                            <svg className="w-3 h-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                            <span className="truncate">{s.domain}</span>
                          </div>
                        )}
                      </div>
                      
                      {/* Browser Content */}
                      <div className="flex-1 relative bg-zinc-100">
                        {s.desktopPreview || s.mobilePreview ? (
                          <img 
                            src={s.desktopPreview || s.mobilePreview || ""} 
                            alt={s.title} 
                            className="absolute inset-0 w-full h-full object-cover object-top"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center text-zinc-400 font-mono text-sm">
                            Loading preview...
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        <div className="fsh-copy absolute inset-x-0 top-12 md:top-24 text-center pointer-events-none z-10 px-4">
          <h1 className="fsh-title text-4xl md:text-6xl font-bold font-display tracking-tight">{title}</h1>
          {subtitle && (
            <p className={cx("fsh-sub text-lg text-zinc-500 mt-2 transition-opacity duration-300", subHidden && "opacity-0")}>{subtitle}</p>
          )}
        </div>

        <div className="fsh-cards absolute inset-0 max-w-7xl mx-auto flex flex-col justify-end md:justify-center px-4 md:px-12 pointer-events-none z-20 pb-20 md:pb-0">
          {steps.map((s, i) => {
            const isActive = activeIdx === i;
            const isPrev = i < activeIdx;
            return (
              <article
                key={i}
                style={{ "--c": s.color } as React.CSSProperties}
                className={cx(
                  "fsh-card pointer-events-auto absolute max-w-sm w-full transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
                  isActive ? "opacity-100 translate-y-0" : isPrev ? "opacity-0 -translate-y-24" : "opacity-0 translate-y-24"
                )}
              >
                <div className="fsh-card-inner bg-white/70 backdrop-blur-2xl border border-black/10 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
                  <span aria-hidden className="fsh-card-glow absolute inset-0 bg-gradient-to-tr from-[var(--c)] to-transparent opacity-10 mix-blend-overlay" />
                  <div className="fsh-card-head flex items-center justify-between mb-4 md:mb-6 text-sm">
                    <span className="fsh-card-num text-zinc-500 font-mono">
                      <strong className="text-zinc-900">{s.num}</strong> / {s.total}
                    </span>
                    <span aria-hidden className="fsh-card-icon text-[var(--c)] w-8 h-8 flex items-center justify-center bg-black/5 rounded-full border border-black/10">
                      {s.icon ?? "✦"}
                    </span>
                  </div>
                  <h3 className="fsh-card-title text-xl md:text-2xl font-bold text-zinc-900 mb-2 md:mb-3 font-display leading-tight">{s.title}</h3>
                  <p className="fsh-card-desc text-zinc-600 text-xs md:text-sm leading-relaxed mb-6 md:mb-8">{s.description}</p>
                  <div className="fsh-card-foot flex flex-col gap-4">
                    <div className="fsh-ticks flex items-center gap-1">
                      {steps.map((_, j) => {
                        const done = j < activeIdx;
                        const cur = j === activeIdx;
                        return (
                          <i key={j} className="fsh-tick flex-1 h-1 bg-black/10 rounded-full overflow-hidden">
                            <span
                              className="block h-full bg-[var(--c)] rounded-full origin-left"
                              style={{
                                transform: `scaleX(${done ? 1 : cur ? stepLocal : 0})`,
                                transition: done ? "none" : "transform 160ms linear",
                              }}
                            />
                          </i>
                        );
                      })}
                    </div>
                    <span className="fsh-card-label text-[10px] uppercase tracking-widest text-[var(--c)] font-bold">{s.label}</span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="fsh-progress absolute bottom-0 left-0 w-full h-1 bg-black/5 z-50">
          <span className="fsh-progress-fill block h-full bg-black/20 origin-left" style={{ width: `${progress * 100}%` }} />
        </div>
      </div>

      {/* Empty scroll spacer: gives the page its scroll distance */}
      <div ref={spacerRef} className="fsh-spacer" style={{ height: scrollHeight }} />
    </div>
  );
}
