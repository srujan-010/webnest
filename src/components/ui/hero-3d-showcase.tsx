"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Project = {
  id: string;
  name: string;
  category: string;
  description: string;
  desktopImage: string;
  domain?: string;
};

export function Hero3DShowcase({ projects }: { projects: Project[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-cycle every 8 seconds
  useEffect(() => {
    if (projects.length <= 1) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % projects.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [projects.length]);

  // Parallax based on mouse movement
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - top) / height - 0.5; // -0.5 to 0.5
    setMousePos({ x, y });
  };

  if (!projects || projects.length === 0) return null;

  // We need to determine the active, left, and right projects
  const leftIndex = (activeIndex - 1 + projects.length) % projects.length;
  const rightIndex = (activeIndex + 1) % projects.length;

  // We will render all projects but only the active, left, and right will be visible
  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[600px] lg:h-[700px] xl:h-[800px] flex items-center justify-center overflow-visible perspective-[2000px]"
      onMouseMove={handleMouseMove}
    >
      {/* Circular Stage / Glowing Platform */}
      <motion.div 
        className="absolute bottom-10 lg:bottom-20 w-[600px] lg:w-[800px] h-[200px] lg:h-[300px] rounded-[100%] bg-blue-500/10 blur-[60px]"
        animate={{
          rotateX: 75,
          x: mousePos.x * -20,
          y: mousePos.y * -20,
        }}
        transition={{ type: "spring", stiffness: 50, damping: 20 }}
        style={{ transformOrigin: "center center" }}
      >
        <div className="absolute inset-0 rounded-[100%] border border-blue-400/20" />
      </motion.div>

      {/* Main Orbital Container */}
      <motion.div
        className="relative w-full h-full flex items-center justify-center preserve-3d"
        animate={{
          rotateY: mousePos.x * 12,
          rotateX: mousePos.y * -8,
        }}
        transition={{ type: "spring", stiffness: 40, damping: 20 }}
      >
        <AnimatePresence initial={false}>
          {projects.map((project, idx) => {
            const isActive = idx === activeIndex;
            const isLeft = idx === leftIndex && projects.length > 1;
            const isRight = idx === rightIndex && projects.length > 2;

            if (!isActive && !isLeft && !isRight) return null;

            return (
              <motion.div
                key={project.id || idx}
                layoutId={`browser-${project.id}`}
                className="absolute w-[90%] max-w-[900px] aspect-[16/10]"
                initial={false}
                animate={{
                  scale: isActive ? 1 : 0.82,
                  opacity: isActive ? 1 : 0.55,
                  z: isActive ? 0 : -200,
                  x: isActive ? "0%" : isLeft ? "-35%" : "35%",
                  rotateY: isActive ? 0 : isLeft ? 18 : -18,
                  filter: isActive ? "blur(0px)" : "blur(2px)",
                  zIndex: isActive ? 30 : 10,
                }}
                transition={{
                  type: "spring",
                  stiffness: 60,
                  damping: 15,
                  mass: 1,
                }}
              >
                {/* Continuous Floating Motion */}
                <motion.div
                  className="w-full h-full"
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 4,
                    ease: "easeInOut",
                    repeat: Infinity,
                    delay: isActive ? 0 : isLeft ? 0.5 : 1, // Staggered delays
                  }}
                >
                  {/* Browser Window */}
                  <div className="w-full h-full rounded-[24px] overflow-hidden bg-white shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] border border-white/50 ring-1 ring-black/5 flex flex-col backdrop-blur-xl relative">
                    
                    {/* Glass Browser Header */}
                    <div className="h-12 bg-white/80 backdrop-blur-md border-b border-black/5 flex items-center px-4 relative z-20">
                      {/* Traffic Lights */}
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-black/10" />
                        <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-black/10" />
                        <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-black/10" />
                      </div>

                      {/* Address Bar */}
                      <div className="absolute left-1/2 -translate-x-1/2 w-1/2 max-w-[300px] h-7 bg-black/5 rounded-md flex items-center justify-center border border-black/5">
                        <span className="text-xs text-black/60 font-medium font-sans flex items-center gap-1.5">
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                          {project.domain || `${project.name.toLowerCase().replace(/\s+/g, '')}.com`}
                        </span>
                      </div>
                    </div>

                    {/* Browser Content (Screenshot) */}
                    <div className="flex-1 relative bg-zinc-50 overflow-hidden">
                      <img 
                        src={project.desktopImage} 
                        alt={project.name} 
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
