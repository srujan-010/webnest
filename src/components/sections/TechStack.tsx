"use client";

import { motion } from "framer-motion";
import { Section } from "../ui/Section";

import { FaReact, FaNodeJs, FaAws } from "react-icons/fa";
import { SiNextdotjs, SiTypescript, SiTailwindcss, SiMongodb, SiPostgresql, SiFramer, SiGreensock } from "react-icons/si";
import { useState, useEffect } from "react";
import { techStack as defaultTechStack } from "@/lib/fallbackData";
import { getTechStack } from "@/services/api";

const iconMap: Record<string, any> = { FaReact, FaNodeJs, FaAws, SiNextdotjs, SiTypescript, SiTailwindcss, SiMongodb, SiPostgresql, SiFramer, SiGreensock };

export function TechStack() {
  const [techStack, setTechStack] = useState(defaultTechStack);

  useEffect(() => {
    getTechStack().then(data => {
      if (data && data.length > 0) setTechStack(data);
    });
  }, []);

  const marqueeItems = [...techStack, ...techStack];

  return (
    <Section spacing="none" className="py-10 md:py-16 border-y border-gray-100 bg-surface-0 overflow-hidden flex flex-col items-center">
      <p className="text-sm font-bold uppercase tracking-wider text-ink-400 mb-8 text-center">
        Powered by modern technologies
      </p>
      
      <div className="relative w-full flex overflow-hidden">
        {/* Left/Right fading edges */}
        <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-surface-0 to-transparent z-10" />
        <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-surface-0 to-transparent z-10" />
        
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 30,
            ease: "linear",
            repeat: Infinity,
          }}
          className="flex whitespace-nowrap gap-12 px-6 items-center"
        >
          {marqueeItems.map((tech: any, i) => (
            <div 
              key={`${tech.name}-${i}`} 
              className="flex items-center gap-3 px-6 py-3 bg-white/50 backdrop-blur-md border border-gray-200/60 rounded-full shadow-sm hover:shadow-md hover:-translate-y-1 hover:border-brand-300 transition-all duration-300 cursor-default group"
            >
              {(() => {
                const IconComponent = typeof tech.Icon === 'string' ? iconMap[tech.Icon] : tech.Icon;
                return IconComponent ? <IconComponent className="w-6 h-6 text-ink-400 group-hover:text-brand-600 transition-colors" /> : null;
              })()}
              <span className="text-lg font-semibold text-ink-700 group-hover:text-brand-700 transition-colors">
                {tech.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}
