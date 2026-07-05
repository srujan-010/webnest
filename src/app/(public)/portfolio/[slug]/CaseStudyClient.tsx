"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Container, Section } from "@/components/ui/Section";
import { ArrowLeft, CheckCircle2, Award, Calendar, Check, ExternalLink, Briefcase, Sparkles, Layers, Target, Code, Cpu, Shield, Smartphone, ArrowRight, Monitor, ChevronDown, CheckCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

interface CaseStudyClientProps {
  project: any;
  relatedProjects: any[];
}

export function CaseStudyClient({ project, relatedProjects }: CaseStudyClientProps) {
  const [activeSection, setActiveSection] = useState("overview");
  
  const navItems = [
    { id: "overview", label: "Overview" },
    { id: "challenge", label: "Challenge" },
    { id: "solution", label: "Solution" },
    { id: "features", label: "Features" },
    { id: "gallery", label: "Gallery" },
    { id: "architecture", label: "Architecture" },
    { id: "results", label: "Results" },
    { id: "faq", label: "FAQ" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.id));
      let currentActive = navItems[0].id;
      
      for (const section of sections) {
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            currentActive = section.id;
          }
        }
      }
      setActiveSection(currentActive);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navItems]);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const mainImage = project.coverImage || project.desktopImage || project.image;
  const techList = project.techStack || project.tech || [];
  
  // Safe parsing of JSON arrays from CMS if they are strings (sometimes JSON comes as strings if not properly parsed backend, but let's assume they are objects)
  const safeArray = (arr: any) => Array.isArray(arr) ? arr : [];

  const solutionCards = safeArray(project.solutionCards);
  const featureHighlights = safeArray(project.featureHighlights);
  const galleryItems = safeArray(project.galleryItems);
  const designProcess = safeArray(project.designProcess);
  const techStackDetails = safeArray(project.techStackDetails);
  const lessonsLearned = safeArray(project.lessonsLearned);
  const faqs = safeArray(project.faqs);
  const adminFeatures = safeArray(project.adminPanel?.features);
  const adminScreenshots = safeArray(project.adminPanel?.screenshots);
  const resultsList = safeArray(project.results);

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-brand-500/30">
      
      {/* 1. PROJECT HERO */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-slate-50">
        <div className="absolute top-0 left-0 w-full h-[500px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100/40 via-white to-white pointer-events-none" />
        
        <Container className="relative z-10">
          <Link href="/portfolio" className="inline-flex items-center text-xs font-bold text-slate-500 hover:text-brand-600 transition-colors uppercase tracking-widest mb-10 group">
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Case Studies
          </Link>

          <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-16">
            <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-brand-50 text-brand-600 border border-brand-100">
                {project.category}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-slate-100 text-slate-600 border border-slate-200">
                {project.industry || "Technology"}
              </span>
            </div>

            {project.clientLogo ? (
              <img src={project.clientLogo} alt={project.clientName} className="h-12 object-contain mb-8 mix-blend-multiply" />
            ) : null}

            <motion.h1 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
              className="text-5xl md:text-7xl font-extrabold tracking-tight font-display mb-8 text-slate-950 leading-[1.1]"
            >
              {project.name}
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xl md:text-2xl text-slate-500 mb-10 leading-relaxed max-w-3xl"
            >
              {project.shortDescription || project.description}
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap items-center justify-center gap-4"
            >
              {(project.liveUrl || project.websiteUrl) && (
                <a href={project.liveUrl || project.websiteUrl} target="_blank" rel="noopener noreferrer">
                  <Button variant="primary" className="h-12 px-8 rounded-full shadow-lg shadow-brand-500/20 text-sm flex items-center gap-2 group hover:-translate-y-0.5 transition-transform">
                    Visit Live Project <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Button>
                </a>
              )}
              <Link href="/contact">
                <Button variant="outline" className="h-12 px-8 rounded-full text-sm hover:bg-slate-50 transition-colors">
                  Start a Similar Project
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Large Hero Mockup */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
            className="relative max-w-5xl mx-auto"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200 bg-white">
              <div className="h-10 bg-slate-100 border-b border-slate-200 flex items-center px-4 gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="mx-auto px-4 py-1 bg-white border border-slate-200 rounded-md text-[10px] text-slate-400 font-medium font-sans">
                  {project.liveUrl ? new URL(project.liveUrl).hostname : `${project.slug}.com`}
                </div>
              </div>
              <div className="relative aspect-[16/9] md:aspect-[16/10] bg-slate-50">
                <img src={mainImage} alt="Project Interface" className="w-full h-full object-cover object-top" />
              </div>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* STICKY NAV + CONTENT WRAPPER */}
      <Container className="relative pt-20 pb-32">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          
          {/* STICKY SIDEBAR */}
          <div className="hidden lg:block w-64 shrink-0 sticky top-32">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-6">Contents</h4>
              <nav className="flex flex-col gap-1">
                {navItems.map(item => (
                  <button
                    key={item.id}
                    onClick={() => scrollTo(item.id)}
                    className={`text-left text-sm py-2 px-3 rounded-lg font-medium transition-all ${activeSection === item.id ? 'bg-brand-50 text-brand-700' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'}`}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
            
            <div className="mt-8 p-6 rounded-2xl border border-slate-100 shadow-sm">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">Project Details</h4>
              <div className="space-y-4 text-sm">
                {project.clientName && (
                  <div>
                    <span className="block text-slate-400 mb-1">Client</span>
                    <span className="font-semibold text-slate-900">{project.clientName}</span>
                  </div>
                )}
                {project.role && (
                  <div>
                    <span className="block text-slate-400 mb-1">Role</span>
                    <span className="font-semibold text-slate-900">{project.role}</span>
                  </div>
                )}
                {project.timeline && (
                  <div>
                    <span className="block text-slate-400 mb-1">Timeline</span>
                    <span className="font-semibold text-slate-900">{project.timeline}</span>
                  </div>
                )}
                {project.platform && (
                  <div>
                    <span className="block text-slate-400 mb-1">Platform</span>
                    <span className="font-semibold text-slate-900">{project.platform}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* MAIN CONTENT AREA */}
          <div className="flex-1 min-w-0 space-y-32">
            
            {/* 2. OVERVIEW */}
            <div id="overview" className="scroll-mt-32">
              <span className="text-sm font-bold text-brand-600 uppercase tracking-widest mb-3 block">01 / Overview</span>
              <h2 className="text-3xl md:text-4xl font-extrabold font-display text-slate-900 mb-8">About this Project</h2>
              <div className="prose prose-lg prose-slate text-slate-600 max-w-none">
                <p className="whitespace-pre-line text-lg leading-relaxed">{project.longDescription || project.description}</p>
              </div>
              
              {project.businessGoal && (
                <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 p-8 rounded-2xl bg-blue-50/50 border border-blue-100/50">
                  <div>
                    <div className="flex items-center gap-2 mb-3 text-blue-700">
                      <Target className="w-5 h-5" /> <h4 className="font-bold">Business Goal</h4>
                    </div>
                    <p className="text-slate-700 text-sm leading-relaxed">{project.businessGoal}</p>
                  </div>
                  {project.targetAudience && (
                    <div>
                      <div className="flex items-center gap-2 mb-3 text-indigo-700">
                        <CheckCircle className="w-5 h-5" /> <h4 className="font-bold">Target Audience</h4>
                      </div>
                      <p className="text-slate-700 text-sm leading-relaxed">{project.targetAudience}</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* 3. CHALLENGE */}
            {(project.challenge || project.clientProblems || project.businessPainPoints) && (
              <div id="challenge" className="scroll-mt-32">
                 <span className="text-sm font-bold text-brand-600 uppercase tracking-widest mb-3 block">02 / The Challenge</span>
                 <h2 className="text-3xl md:text-4xl font-extrabold font-display text-slate-900 mb-8">Breaking Down the Problem</h2>
                 
                 {project.challenge && (
                   <p className="text-xl text-slate-600 leading-relaxed mb-10">{project.challenge}</p>
                 )}

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   {project.clientProblems && (
                     <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-md transition-shadow">
                       <h4 className="font-bold text-slate-900 text-lg mb-3">Client Problems</h4>
                       <div className="text-slate-600 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: project.clientProblems }} />
                     </div>
                   )}
                   {project.businessPainPoints && (
                     <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-md transition-shadow">
                       <h4 className="font-bold text-slate-900 text-lg mb-3">Business Pain Points</h4>
                       <div className="text-slate-600 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: project.businessPainPoints }} />
                     </div>
                   )}
                   {project.technicalChallenges && (
                     <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-md transition-shadow">
                       <h4 className="font-bold text-slate-900 text-lg mb-3">Technical Limitations</h4>
                       <div className="text-slate-600 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: project.technicalChallenges }} />
                     </div>
                   )}
                 </div>
              </div>
            )}

            {/* 4. SOLUTION */}
            {(project.solution || solutionCards.length > 0) && (
              <div id="solution" className="scroll-mt-32">
                <span className="text-sm font-bold text-brand-600 uppercase tracking-widest mb-3 block">03 / Our Solution</span>
                <h2 className="text-3xl md:text-4xl font-extrabold font-display text-slate-900 mb-8">How We Solved It</h2>
                
                {project.solution && (
                  <p className="text-xl text-slate-600 leading-relaxed mb-12">{project.solution}</p>
                )}

                {solutionCards.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {solutionCards.map((card: any, i: number) => (
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        key={i} 
                        className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm"
                      >
                        <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center mb-4 text-xl font-bold">
                          {i + 1}
                        </div>
                        <h4 className="font-bold text-slate-900 mb-2">{card.title}</h4>
                        <p className="text-sm text-slate-500 leading-relaxed">{card.description}</p>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 5. FEATURES */}
            {featureHighlights.length > 0 && (
              <div id="features" className="scroll-mt-32">
                <span className="text-sm font-bold text-brand-600 uppercase tracking-widest mb-3 block">04 / Feature Highlights</span>
                <h2 className="text-3xl md:text-4xl font-extrabold font-display text-slate-900 mb-10">Core Capabilities</h2>

                <div className="space-y-12">
                  {featureHighlights.map((feat: any, i: number) => (
                    <motion.div 
                      key={i} 
                      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                      className={`flex flex-col ${i % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-10 items-center`}
                    >
                      <div className="flex-1 space-y-4">
                        <h3 className="text-2xl font-bold text-slate-900">{feat.title}</h3>
                        <p className="text-slate-600 leading-relaxed">{feat.description}</p>
                      </div>
                      <div className="flex-1 w-full">
                        {feat.image ? (
                          <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-lg relative aspect-video bg-slate-50">
                            <img src={feat.image} alt={feat.title} className="w-full h-full object-cover object-top" />
                          </div>
                        ) : (
                          <div className="rounded-2xl border border-slate-200 bg-slate-50 aspect-video flex items-center justify-center">
                            <Monitor className="w-12 h-12 text-slate-300" />
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* 6. PRODUCT GALLERY */}
            {galleryItems.length > 0 && (
              <div id="gallery" className="scroll-mt-32">
                <span className="text-sm font-bold text-brand-600 uppercase tracking-widest mb-3 block">05 / Product Gallery</span>
                <h2 className="text-3xl md:text-4xl font-extrabold font-display text-slate-900 mb-8">Interface Showcase</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {galleryItems.map((img: any, i: number) => (
                    <div key={i} className="group relative rounded-2xl overflow-hidden border border-slate-200 shadow-sm cursor-zoom-in">
                      <div className="aspect-[4/3] bg-slate-50 overflow-hidden">
                        <img src={img.url || img} alt={`Gallery ${i}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      </div>
                      {img.type && (
                        <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-bold text-slate-900 shadow-sm">
                          {img.type}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 7. SYSTEM ARCHITECTURE & 8. TECH STACK */}
            {(techStackDetails.length > 0 || project.systemArchitecture?.image) && (
              <div id="architecture" className="scroll-mt-32">
                <span className="text-sm font-bold text-brand-600 uppercase tracking-widest mb-3 block">06 / Engineering</span>
                <h2 className="text-3xl md:text-4xl font-extrabold font-display text-slate-900 mb-8">Architecture & Tech Stack</h2>

                {project.systemArchitecture?.image && (
                  <div className="mb-16">
                    <div className="p-8 rounded-3xl bg-slate-900 text-white shadow-xl">
                      <div className="mb-6 flex items-center gap-3">
                        <Cpu className="w-6 h-6 text-brand-400" />
                        <h3 className="text-xl font-bold">System Architecture</h3>
                      </div>
                      <div className="rounded-xl overflow-hidden bg-white">
                        <img src={project.systemArchitecture.image} alt="Architecture Diagram" className="w-full" />
                      </div>
                      {project.systemArchitecture.description && (
                        <p className="mt-6 text-slate-300 text-sm leading-relaxed">{project.systemArchitecture.description}</p>
                      )}
                    </div>
                  </div>
                )}

                {techStackDetails.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {techStackDetails.map((tech: any, i: number) => (
                      <div key={i} className="p-6 rounded-2xl border border-slate-100 bg-white shadow-sm flex items-start gap-4 hover:border-brand-200 transition-colors">
                        <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100 overflow-hidden">
                          {tech.logo ? <img src={tech.logo} alt={tech.technology} className="w-6 h-6 object-contain" /> : <Code className="w-6 h-6 text-slate-400" />}
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900">{tech.technology}</h4>
                          <p className="text-xs text-brand-600 font-semibold mb-2">{tech.purpose}</p>
                          <p className="text-sm text-slate-500 leading-relaxed">{tech.whySelected}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Fallback to simple tech tags if detailed ones aren't provided */}
                {techStackDetails.length === 0 && techList.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {techList.map((t: string) => (
                      <span key={t} className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-semibold text-slate-700">{t}</span>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 11. RESPONSIVE EXPERIENCE */}
            {(project.mobileImage || project.mockupTablet) && (
              <div className="scroll-mt-32">
                 <span className="text-sm font-bold text-brand-600 uppercase tracking-widest mb-3 block">07 / Responsive</span>
                 <h2 className="text-3xl md:text-4xl font-extrabold font-display text-slate-900 mb-10">Any Device, Anywhere</h2>
                 
                 <div className="flex flex-col md:flex-row gap-10 items-center justify-center bg-slate-50 p-10 rounded-3xl border border-slate-100">
                    {/* Mobile Mockup */}
                    {project.mobileImage && (
                      <div className="relative w-[280px] shrink-0 border-[8px] border-slate-900 rounded-[3rem] shadow-2xl bg-slate-900 overflow-hidden transform -rotate-2 hover:rotate-0 transition-transform duration-500 z-20">
                        <div className="absolute top-0 inset-x-0 h-6 bg-slate-900 z-10 rounded-b-2xl" />
                        <img src={project.mobileImage} alt="Mobile View" className="w-full h-auto" />
                      </div>
                    )}
                    {/* Tablet Mockup */}
                    {project.mockupTablet && (
                      <div className="relative w-full max-w-[500px] border-[8px] border-slate-900 rounded-[2rem] shadow-2xl bg-slate-900 overflow-hidden transform rotate-1 hover:rotate-0 transition-transform duration-500">
                        <img src={project.mockupTablet} alt="Tablet View" className="w-full h-auto" />
                      </div>
                    )}
                 </div>
              </div>
            )}

            {/* 13. RESULTS */}
            {resultsList.length > 0 && (
              <div id="results" className="scroll-mt-32">
                <span className="text-sm font-bold text-brand-600 uppercase tracking-widest mb-3 block">08 / Results</span>
                <h2 className="text-3xl md:text-4xl font-extrabold font-display text-slate-900 mb-8">Business Impact</h2>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {resultsList.map((res: string, i: number) => {
                    // Quick parse for big numbers (e.g., "300% Growth")
                    const match = res.match(/^([\d.,]+[%+KMBkmb]?)\s+(.*)$/);
                    if (match) {
                      return (
                        <div key={i} className="p-6 rounded-2xl bg-emerald-50 border border-emerald-100 text-center">
                          <div className="text-3xl font-extrabold text-emerald-600 font-display mb-2">{match[1]}</div>
                          <div className="text-sm font-semibold text-emerald-900">{match[2]}</div>
                        </div>
                      )
                    }
                    return (
                      <div key={i} className="p-6 rounded-2xl bg-slate-50 border border-slate-100 text-center flex flex-col items-center justify-center col-span-2 sm:col-span-1">
                        <CheckCircle2 className="w-6 h-6 text-brand-500 mb-3" />
                        <div className="text-sm font-semibold text-slate-800">{res}</div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* 14. TESTIMONIAL */}
            {project.testimonialQuote && (
              <div className="scroll-mt-32">
                <div className="p-10 md:p-16 rounded-3xl bg-slate-950 text-white shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/20 rounded-full blur-[80px]" />
                  <span className="text-brand-400 font-bold uppercase tracking-widest text-xs mb-6 block">Client Feedback</span>
                  <blockquote className="text-2xl md:text-3xl font-medium font-display leading-snug mb-10 relative z-10">
                    "{project.testimonialQuote}"
                  </blockquote>
                  <div className="flex items-center gap-4 relative z-10">
                    {project.testimonialPhoto && (
                      <img src={project.testimonialPhoto} alt={project.testimonialAuthor} className="w-14 h-14 rounded-full border-2 border-slate-800 object-cover" />
                    )}
                    <div>
                      <div className="font-bold text-lg">{project.testimonialAuthor}</div>
                      <div className="text-slate-400 text-sm">{project.testimonialRole}, {project.testimonialCompany}</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 17. FAQ */}
            {faqs.length > 0 && (
              <div id="faq" className="scroll-mt-32">
                <span className="text-sm font-bold text-brand-600 uppercase tracking-widest mb-3 block">09 / FAQ</span>
                <h2 className="text-3xl md:text-4xl font-extrabold font-display text-slate-900 mb-8">Project Insights</h2>
                
                <div className="space-y-4">
                  {faqs.map((faq: any, i: number) => (
                    <details key={i} className="group bg-white border border-slate-200 rounded-2xl p-6 cursor-pointer open:bg-slate-50 open:border-slate-300 transition-colors">
                      <summary className="flex items-center justify-between font-bold text-lg text-slate-900 marker:content-none">
                        {faq.question}
                        <ChevronDown className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform" />
                      </summary>
                      <p className="mt-4 text-slate-600 leading-relaxed text-sm">
                        {faq.answer}
                      </p>
                    </details>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </Container>

      {/* 16. RELATED PROJECTS */}
      {relatedProjects && relatedProjects.length > 0 && (
        <section className="py-24 bg-slate-50 border-t border-slate-100">
          <Container>
            <div className="flex items-end justify-between mb-12">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-brand-600 block mb-2">Explore More Work</span>
                <h2 className="text-3xl font-bold font-display text-slate-900">Related Case Studies</h2>
              </div>
              <Link href="/portfolio" className="hidden sm:inline-flex items-center text-xs font-bold text-brand-600 hover:text-brand-700 uppercase tracking-widest gap-1 group border-b border-transparent hover:border-brand-600 pb-0.5 transition-all">
                View All Case Studies <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedProjects.map((p: any) => {
                const cover = p.coverImage || p.desktopImage || p.image;
                return (
                  <div key={p.slug} className="flex flex-col bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-500 group overflow-hidden">
                    <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                      <img src={cover} alt={p.name} className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 opacity-60" />
                      <div className="absolute top-4 left-4">
                        <span className="px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-widest bg-brand-600 text-white shadow-md">
                          {p.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex items-center justify-between text-xs text-slate-400 font-semibold mb-3">
                        <span>{p.clientName || "WebNest Internal"}</span>
                        <span>{p.completionYear || "2024"}</span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-600 transition-colors duration-300 mb-2 font-display">
                        {p.name}
                      </h3>
                      <p className="text-slate-500 text-xs leading-relaxed mb-6 line-clamp-2 flex-1">
                        {p.shortDescription || p.description}
                      </p>
                      <div className="pt-4 border-t border-slate-100">
                        <Link href={`/portfolio/${p.slug}`}>
                          <Button variant="primary" className="w-full h-10 text-xs rounded-xl flex items-center justify-center gap-1.5 group/btn">
                            View Case Study <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Container>
        </section>
      )}

      {/* 18. FINAL CTA */}
      <section className="py-32 bg-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-brand-900/40 via-slate-950 to-slate-950" />
        <Container className="relative z-10 text-center">
          <h2 className="text-4xl md:text-6xl font-extrabold font-display text-white mb-8">Ready to build something similar?</h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-12">
            Let's discuss how we can engineer a premium digital solution tailored to your business needs.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link href="/contact">
              <Button variant="primary" className="h-14 px-10 rounded-full text-base font-bold bg-white text-slate-950 hover:bg-slate-100 transition-all hover:scale-105 shadow-xl shadow-white/10">
                Book Discovery Call
              </Button>
            </Link>
          </div>
        </Container>
      </section>

    </div>
  );
}
