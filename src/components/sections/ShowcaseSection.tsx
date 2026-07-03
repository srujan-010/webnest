"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { Button } from "../ui/Button";
import { Container, Section } from "../ui/Section";
import { Card } from "../ui/Card";
import { useState, useEffect } from "react";
import { projects as defaultProjects } from "@/lib/fallbackData";
import { getProjects } from "@/services/api";

export function ShowcaseSection() {
  const [projects, setProjects] = useState(defaultProjects);

  useEffect(() => {
    getProjects().then(data => {
      console.log('📡 [ShowcaseSection API] API response projects:', data);
      if (data && data.length > 0) setProjects(data);
    });
  }, []);
  return (
    <Section id="work" className="bg-surface-0 overflow-hidden">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-10 gap-6">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 mb-4"
            >
              <div className="w-2 h-2 rounded-full bg-brand-600" />
              <span className="text-sm font-bold uppercase tracking-wider text-brand-600">Selected Work</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-ink-900 leading-[1.1]"
            >
              Digital products that <br className="hidden md:block" />
              <span className="text-ink-400">set the standard.</span>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Button variant="outline" size="lg" className="rounded-full">
              View All Projects <ArrowUpRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        </div>

        <div className="flex flex-col gap-24 md:gap-32">
          {projects.map((project: any, index) => {
            const mainImage = project.desktopImage || project.image || project.coverImage || null;
            const mobImage = project.mobileImage || project.image || project.coverImage || null;

            console.log("🔍 [Featured Projects Audit] Project ID:", project._id || project.id);
            console.log("  ↳ Title:", project.title || project.name);
            console.log("  ↳ desktopImage (API):", project.desktopImage);
            console.log("  ↳ image (API):", project.image);
            console.log("  ↳ coverImage (API):", project.coverImage);
            console.log("  ↳ Rendered Main Image:", mainImage);
            console.log("  ↳ Rendered Mobile Image:", mobImage);

            return (
            <motion.div 
              key={project.name || project.title || index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 lg:gap-20 items-center group`}
            >
              {/* Image Composition */}
              <div className="w-full lg:w-3/5 relative">
                {/* Ambient Shadow echoing accent color */}
                <div className={`absolute inset-10 opacity-30 blur-[60px] rounded-full transition-opacity duration-500 group-hover:opacity-60 ${project.accent}`} />
                
                {/* Desktop Browser Frame */}
                <div className="relative w-full aspect-[4/3] rounded-2xl bg-white border border-gray-200/60 overflow-hidden shadow-xl flex flex-col transform group-hover:-translate-y-2 group-hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]">
                  <div className="h-10 border-b border-gray-100 flex items-center px-4 gap-2 bg-gray-50/80 backdrop-blur-md shrink-0">
                    <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                    <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                    <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
                    <div className="flex-1 mx-4 h-6 bg-white rounded-md border border-gray-200/80 flex items-center justify-center">
                       <span className="text-[10px] text-gray-400 font-medium font-sans tracking-wide">
                         {project.name.toLowerCase().replace(/\s+/g, '')}.com
                       </span>
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col bg-white overflow-hidden relative">
                     {mainImage && (
                       <img 
                         src={mainImage as string} 
                         alt={project.title || project.name} 
                         className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                       />
                     )}
                  </div>
                </div>

                {/* Mobile Frame overlay */}
                <div className="absolute -bottom-8 -right-8 w-[28%] aspect-[1/2.15] bg-white rounded-[28px] border-[6px] border-gray-900 shadow-2xl transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 delay-100 ease-[cubic-bezier(0.22,1,0.36,1)] z-10 overflow-hidden flex flex-col bg-gray-50">
                   {mobImage && (
                     <img 
                       src={mobImage as string} 
                       alt="Mobile View" 
                       className="w-full h-full object-cover object-top"
                     />
                   )}
                </div>
              </div>

              {/* Content */}
              <div className="w-full lg:w-2/5 flex flex-col">
                <span className="text-brand-600 font-medium mb-4">{project.category}</span>
                <h3 className="text-3xl md:text-4xl font-bold font-display text-ink-900 mb-6 tracking-tight group-hover:text-brand-600 transition-colors">
                  {project.name}
                </h3>
                <p className="text-lg text-ink-600 mb-8 leading-relaxed">
                  {project.description}
                </p>

                <div className="mb-8">
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-ink-900 mb-4">Key Features</h4>
                  <ul className="space-y-3">
                    {project.features.map(feature => (
                      <li key={feature} className="flex items-center gap-3 text-ink-600">
                        <div className={`w-1.5 h-1.5 rounded-full ${project.accent}`} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-2 mb-10">
                  {project.tech.map(tech => (
                    <span key={tech} className="px-3 py-1 bg-surface-1 text-ink-600 rounded-full text-sm font-medium border border-gray-200/60">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4">
                  <Button variant="primary">
                    View Case Study
                  </Button>
                  <Button variant="ghost" className="rounded-full w-12 h-12 p-0 flex items-center justify-center">
                    <ExternalLink className="w-5 h-5 text-ink-900" />
                  </Button>
                </div>
              </div>
            </motion.div>
          );
          })}
        </div>
      </Container>
    </Section>
  );
}
