"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Container, Section } from "../ui/Section";
import { Button } from "../ui/Button";
import { ArrowRight, Eye, Calendar, Briefcase, Award, Sparkles, Code } from "lucide-react";

interface Project {
  _id: string;
  name: string;
  slug: string;
  category: string;
  categories?: string[];
  shortDescription?: string;
  description: string;
  techStack?: string[];
  tech?: string[];
  coverImage?: string;
  desktopImage?: string;
  image: string;
  clientName?: string;
  completionYear?: string;
  isFeatured?: boolean;
}

export function PortfolioContent({ projects }: { projects: Project[], categories?: string[] }) {
  const categoriesList = [
    "All",
    "Web Applications",
    "E-Commerce",
    "Corporate",
    "Healthcare",
    "Education",
    "AI",
    "FinTech",
    "Mobile"
  ];

  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = projects.filter((project) => {
    if (activeCategory === "All") return true;
    const catLower = activeCategory.toLowerCase();
    const projCatLower = (project.category || "").toLowerCase();
    const matchesCategory = projCatLower === catLower || projCatLower.includes(catLower);
    const matchesCategories = (project.categories || []).some(
      (c) => c.toLowerCase() === catLower || c.toLowerCase().includes(catLower)
    );
    return matchesCategory || matchesCategories;
  });

  return (
    <main className="min-h-screen bg-slate-50/30">
      {/* 1. Premium Portfolio Hero */}
      <Section spacing="none" className="pt-32 pb-20 bg-slate-950 text-white relative overflow-hidden select-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(37,99,235,0.08),_transparent_45%)]" />
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-slate-950/20 to-transparent pointer-events-none" />

        <Container className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-8 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-brand-400 border border-blue-500/20 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" /> Premium Agency Portfolio
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.1] font-display">
                Crafting Digital <br />
                <span className="text-gradient">Masterpieces.</span>
              </h1>
              <p className="text-slate-400 text-lg md:text-xl max-w-2xl leading-relaxed">
                Explore our curated gallery of premium web applications, bespoke e-commerce engines, and high-performance digital products engineered for ambitious brands worldwide.
              </p>
              <div className="pt-4 flex flex-wrap gap-4">
                <Link href="/contact">
                  <Button variant="primary" className="h-12 px-6 rounded-full font-bold shadow-lg hover:scale-[1.02] transition-transform">
                    Start Your Project
                  </Button>
                </Link>
              </div>
            </div>

            {/* Quick Stats Panel */}
            <div className="lg:col-span-4 bg-white/[0.02] border border-white/5 rounded-3xl p-8 backdrop-blur-md space-y-6">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest border-b border-white/10 pb-3">Metrics</h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <span className="block text-2xl md:text-3xl font-extrabold text-brand-400 font-display">30+</span>
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mt-1 block">Projects Done</span>
                </div>
                <div>
                  <span className="block text-2xl md:text-3xl font-extrabold text-brand-400 font-display">99%</span>
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mt-1 block">Client Rate</span>
                </div>
                <div>
                  <span className="block text-2xl md:text-3xl font-extrabold text-brand-400 font-display">8+</span>
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mt-1 block">Industries</span>
                </div>
                <div>
                  <span className="block text-2xl md:text-3xl font-extrabold text-brand-400 font-display">100%</span>
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mt-1 block">Production Uptime</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 2. Interactive Category Filters */}
      <Section className="py-8 bg-white border-y border-slate-100 sticky top-20 z-40 shadow-sm shadow-slate-100/30">
        <Container>
          <div className="flex flex-wrap gap-2 items-center justify-center">
            {categoriesList.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`relative px-4 py-2 text-xs sm:text-sm font-bold rounded-full transition-all duration-300 ${
                    isActive 
                      ? "text-white bg-slate-950 shadow-md" 
                      : "text-slate-500 hover:text-slate-950 bg-slate-50 hover:bg-slate-100"
                  }`}
                >
                  {category}
                  {isActive && (
                    <motion.span
                      layoutId="activeCategoryIndicator"
                      className="absolute inset-0 bg-slate-950 rounded-full -z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* 3. Redesigned Projects Grid */}
      <Section className="py-20">
        <Container>
          {filteredProjects.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">
              <p className="text-slate-500 mb-4 text-base font-semibold">No case studies found in this category.</p>
              <Button onClick={() => setActiveCategory("All")} variant="outline" className="text-xs">
                Reset Filter
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project, idx) => {
                  const coverImg = project.coverImage || project.desktopImage || project.image;
                  const techList = project.techStack || project.tech || [];
                  
                  return (
                    <motion.div
                      key={project.slug}
                      layout
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.5, delay: idx * 0.05 }}
                      className="flex flex-col bg-white rounded-3xl border border-slate-200/50 shadow-sm hover:shadow-[0_30px_60px_rgba(0,0,0,0.06)] hover:-translate-y-1.5 transition-all duration-500 group overflow-hidden"
                    >
                      {/* Image Frame with hover zoom */}
                      <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                        <img 
                          src={coverImg} 
                          alt={project.name} 
                          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-black/10 opacity-70" />
                        
                        {/* Featured Badge */}
                        {project.isFeatured && (
                          <div className="absolute top-4 left-4">
                            <span className="px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-widest bg-yellow-400 text-slate-950 flex items-center gap-1 shadow-md">
                              <Award className="w-3.5 h-3.5 fill-current" /> Featured
                            </span>
                          </div>
                        )}

                        <div className="absolute top-4 right-4">
                          <span className="px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-widest bg-slate-950/80 text-white backdrop-blur-sm shadow-md border border-white/10">
                            {project.category}
                          </span>
                        </div>

                        {/* View overlay icon */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-slate-950/40">
                          <div className="w-12 h-12 rounded-full bg-white text-slate-950 flex items-center justify-center shadow-lg transition-transform scale-75 group-hover:scale-100 duration-300">
                            <Eye className="w-5 h-5" />
                          </div>
                        </div>
                      </div>

                      {/* Content block */}
                      <div className="p-6 flex-1 flex flex-col justify-between">
                        <div>
                          {/* Metadata row */}
                          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold mb-3">
                            <span className="flex items-center gap-1">
                              <Briefcase className="w-3.5 h-3.5" /> {project.clientName || "WebNest Internal"}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5" /> {project.completionYear || "2024"}
                            </span>
                          </div>

                          <h3 className="text-xl font-bold text-slate-950 mb-2 group-hover:text-brand-600 transition-colors duration-300 font-display">
                            {project.name}
                          </h3>
                          <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-2">
                            {project.shortDescription || project.description}
                          </p>
                        </div>

                        <div>
                          {/* Technology Stack Chips */}
                          <div className="flex flex-wrap gap-1.5 mb-6 pt-4 border-t border-slate-100">
                            {techList.slice(0, 4).map((tech) => (
                              <span key={tech} className="px-2 py-0.5 bg-slate-50 border border-slate-200/50 rounded-md text-[10px] font-bold text-slate-500 uppercase tracking-wide flex items-center gap-1">
                                <Code className="w-2.5 h-2.5" /> {tech}
                              </span>
                            ))}
                            {techList.length > 4 && (
                              <span className="px-2 py-0.5 bg-slate-50 border border-slate-200/50 rounded-md text-[10px] font-bold text-slate-400">
                                +{techList.length - 4}
                              </span>
                            )}
                          </div>

                          {/* CTA View Button */}
                          <Link href={`/portfolio/${project.slug}`}>
                            <Button variant="primary" className="w-full h-11 text-xs rounded-xl flex items-center justify-center gap-1.5 group/btn">
                              View Case Study <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </Container>
      </Section>
    </main>
  );
}
