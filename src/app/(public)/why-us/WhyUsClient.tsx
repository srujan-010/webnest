"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useInView } from "framer-motion";
import Link from "next/link";
import { 
  ArrowRight, Shield, Zap, Lock, Code, CheckCircle2, 
  TrendingUp, Users, Smartphone, Globe, Layout, 
  Database, Server, Cpu, Star, AlertTriangle, 
  ChevronDown, Quote, Briefcase, Activity, 
  Settings, Target, User, Circle, Monitor,
  Check, X, ChevronRight, ArrowUpRight
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";

const IconMap: Record<string, any> = {
  ArrowRight, Shield, Zap, Lock, Code, CheckCircle2,
  TrendingUp, Users, Smartphone, Globe, Layout,
  Database, Server, Cpu, Star, AlertTriangle,
  ChevronDown, Quote, Briefcase, Activity,
  Settings, Target, User, Circle, Monitor
};

// Default fallback data for sections if CMS data is missing
const DefaultPainPoints = [
  { icon: "AlertTriangle", title: "Freelancer Flakiness", description: "Projects delayed or abandoned midway with no communication." },
  { icon: "Code", title: "Spaghetti Code", description: "Unmaintainable, poorly architected software that breaks on scaling." },
  { icon: "Target", title: "Missed Deadlines", description: "Constant timeline extensions and unpredictable budget overruns." }
];

const DefaultStandards = [
  { icon: "Zap", title: "Performance", description: "Lighthouse scores 95+ on every project.", metric: "95+" },
  { icon: "Lock", title: "Security", description: "OWASP-aligned code reviews on every build." },
  { icon: "Users", title: "Accessibility", description: "WCAG 2.1 AA compliant interfaces." },
  { icon: "TrendingUp", title: "Scalability", description: "Cloud-native architectures built to handle millions." },
  { icon: "Code", title: "Maintainability", description: "Clean code principles and comprehensive documentation." },
  { icon: "Layout", title: "Clean Architecture", description: "Separation of concerns for modular, extensible systems." }
];

export default function WhyUsClient({ data }: { data: any }) {
  const {
    hero = { title: "Engineering Excellence. No Compromises.", subtitle: "We are your long-term technical partners, building scalable software that drives business growth." },
    cta = { title: "Ready to build something extraordinary?", subtitle: "Partner with an engineering team that delivers predictable excellence.", buttonText: "Book Discovery Call", buttonLink: "/contact" },
    comparisonTable = [
      { feature: "Code Ownership", typicalAgency: "Held hostage", webNest: "100% yours upon completion" },
      { feature: "Communication", typicalAgency: "Black box approach", webNest: "Transparent weekly sprints" },
      { feature: "Team Structure", typicalAgency: "Solo freelancer", webNest: "Full cross-functional team" },
      { feature: "Testing", typicalAgency: "Manual basic testing", webNest: "Automated QA pipelines" },
      { feature: "Post-Launch", typicalAgency: "Disappears after handoff", webNest: "Ongoing SLA and scaling support" }
    ],
    timelineSteps = [
      { title: "Discovery", description: "Deep dive into your business goals, technical constraints, and product requirements.", icon: "Target" },
      { title: "Design", description: "Creating pixel-perfect, accessible, and high-converting UI/UX designs.", icon: "Layout" },
      { title: "Development", description: "Writing clean, scalable code with modern frameworks.", icon: "Code" },
      { title: "Launch", description: "Rigorous testing and seamless deployment to production.", icon: "Zap" },
      { title: "Growth", description: "Ongoing support, monitoring, and feature iteration.", icon: "TrendingUp" }
    ],
    beforeAfter = [
      { scenario: "System Architecture", before: "Monolithic, slow, and hard to update codebase.", after: "Microservices with automated CI/CD pipelines." },
      { scenario: "User Experience", before: "Confusing navigation leading to high bounce rates.", after: "Intuitive flows increasing conversion by 25%." }
    ],
    siteSettings,
    teamMembers = [],
    projects = [],
    testimonials = [],
    faqs = [],
    painPoints = DefaultPainPoints,
    engineeringStandards = DefaultStandards,
    whyUsReasons = [],
    processSteps = [],
    comparisonRows = []
  } = data || {};

  // 1. HERO SECTION
  const renderHero = () => {
    return (
      <section className="relative pt-40 pb-28 bg-[#F8FAFC] overflow-hidden">
        {/* Subtle animated gradient background */}
        <div className="absolute inset-0 z-0">
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute -top-[20%] -right-[10%] w-[70%] h-[70%] rounded-full bg-blue-100/50 blur-[120px]"
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear", delay: 1 }}
            className="absolute -bottom-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-emerald-100/40 blur-[100px]"
          />
        </div>

        <Container className="relative z-10 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Text Content */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 font-display mb-6 tracking-tight leading-[1.1]">
                {hero.title || "Engineering Excellence. No Compromises."}
              </h1>
              <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-lg">
                {hero.subtitle || "We are your long-term technical partners, building scalable software that drives business growth and removes technical debt."}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href={hero.buttonLink || "/contact"}>
                  <Button variant="primary" className="h-14 px-8 rounded-full text-lg font-bold w-full sm:w-auto shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all hover:-translate-y-0.5">
                    {hero.buttonText || "Start Your Project"}
                  </Button>
                </Link>
                <Link href="/portfolio">
                  <Button variant="outline" className="h-14 px-8 rounded-full text-lg font-bold w-full sm:w-auto bg-white hover:bg-slate-50 border-slate-200">
                    View Our Work
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Animated Tilted Mockup */}
            <motion.div 
              initial={{ opacity: 0, x: 50, rotateY: 20, rotateX: 10 }}
              animate={{ opacity: 1, x: 0, rotateY: -5, rotateX: 5 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
              className="relative perspective-[2000px] hidden md:block"
            >
              <div className="relative w-[120%] -ml-[10%] aspect-[16/10] bg-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-slate-700 transform-style-3d">
                <div className="absolute top-0 left-0 w-full h-8 bg-slate-800 flex items-center px-4 gap-2 border-b border-slate-700 z-20">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                </div>
                {/* Looping Content inside mockup */}
                <div className="absolute top-8 left-0 w-full h-[calc(100%-2rem)] bg-slate-100 overflow-hidden">
                  <motion.div 
                    animate={{ y: ["0%", "-33.33%", "-66.66%", "0%"] }}
                    transition={{ duration: 15, ease: "easeInOut", repeat: Infinity, times: [0, 0.45, 0.9, 1] }}
                    className="w-full h-[300%]"
                  >
                    {/* Screen 1: Dashboard */}
                    <div className="w-full h-1/3 bg-white p-6 relative">
                      <div className="h-10 w-full bg-slate-100 rounded-lg mb-6" />
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="h-24 bg-blue-50 rounded-lg" />
                        <div className="h-24 bg-emerald-50 rounded-lg" />
                        <div className="h-24 bg-purple-50 rounded-lg" />
                      </div>
                      <div className="h-40 bg-slate-50 rounded-lg" />
                    </div>
                    {/* Screen 2: Code/Editor */}
                    <div className="w-full h-1/3 bg-[#0F172A] p-6 font-mono text-xs text-blue-300">
                      <p>{"function initializeSystem() {"}</p>
                      <p className="pl-4">{"const cluster = new ServerCluster();"}</p>
                      <p className="pl-4">{"await cluster.scale(1000);"}</p>
                      <p className="pl-4 text-emerald-400">{"console.log('Zero downtime achieved');"}</p>
                      <p>{"}"}</p>
                    </div>
                    {/* Screen 3: E-commerce / Grid */}
                    <div className="w-full h-1/3 bg-slate-50 p-6">
                       <div className="grid grid-cols-2 gap-4 h-full">
                         <div className="bg-white rounded-xl shadow-sm h-full" />
                         <div className="bg-white rounded-xl shadow-sm h-full" />
                       </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>
    );
  };

  // 2. TRUST METRICS
  const renderMetrics = () => {
    const stats = siteSettings?.statsCounters || [
      { value: 50, label: "Projects Delivered", suffix: "+" },
      { value: 99, label: "Client Satisfaction", suffix: "%" },
      { value: 10, label: "Industries Served", suffix: "+" },
      { value: 24, label: "Support", suffix: "/7" }
    ];

    return (
      <section className="py-16 bg-white border-b border-slate-100 relative z-20">
        <Container className="max-w-6xl">
          <div className="flex flex-wrap md:flex-nowrap justify-between items-center divide-y md:divide-y-0 md:divide-x divide-slate-100">
            {stats.map((stat: any, i: number) => (
              <StatCounter key={i} stat={stat} index={i} total={stats.length} />
            ))}
          </div>
        </Container>
      </section>
    );
  };

  // 3. WHY COMPANIES LEAVE (Agitate)
  const renderFrustrations = () => {
    const pPoints = painPoints.length > 0 ? painPoints : DefaultPainPoints;
    
    return (
      <section className="py-24 bg-[#0B1120] text-white">
        <Container className="max-w-6xl">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl md:text-5xl font-extrabold font-display mb-6">Why Companies Leave Other Agencies</h2>
              <p className="text-xl text-slate-400">The software development industry is broken. We hear these stories every week. Does this sound familiar?</p>
            </motion.div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {pPoints.slice(0, 3).map((point: any, i: number) => {
              const Icon = IconMap[point.icon] || AlertTriangle;
              return (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800"
                >
                  <Icon className="w-10 h-10 text-red-400 mb-6" />
                  <h3 className="text-xl font-bold mb-3">{point.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{point.description}</p>
                </motion.div>
              )
            })}
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="text-2xl font-medium text-brand-400">Here's what changes when you work with WebNest.</p>
          </motion.div>
        </Container>
      </section>
    );
  };

  // 4. THE WEBNEST DIFFERENCE (Differentiate)
  const renderComparison = () => {
    const rows = comparisonRows.length > 0 ? comparisonRows : comparisonTable;

    return (
      <section className="py-24 bg-white">
        <Container className="max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 font-display mb-4">The WebNest Difference</h2>
            <p className="text-lg text-slate-600">Immediate relief from standard agency headaches.</p>
          </div>
          
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xl shadow-slate-200/50">
            {/* Header */}
            <div className="grid grid-cols-12 bg-slate-50 border-b border-slate-200 p-6 items-center">
              <div className="col-span-4 font-bold text-slate-400 uppercase tracking-widest text-xs">Criteria</div>
              <div className="col-span-4 font-bold text-slate-400 uppercase tracking-widest text-xs text-center">Typical Agency</div>
              <div className="col-span-4 font-bold text-brand-600 uppercase tracking-widest text-xs text-center">WebNest</div>
            </div>
            
            {/* Rows */}
            <div className="divide-y divide-slate-100">
              {rows.map((row: any, i: number) => (
                <ComparisonRow key={i} row={row} index={i} />
              ))}
            </div>
          </div>
        </Container>
      </section>
    );
  };

  // 5. HOW WE WORK TOGETHER (Process)
  const renderTimeline = () => {
    const steps = processSteps.length > 0 ? processSteps : timelineSteps;

    return (
      <section className="py-24 bg-slate-50 border-y border-slate-200 overflow-hidden">
        <Container className="max-w-4xl relative">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-extrabold font-display mb-4">How We Work Together</h2>
            <p className="text-lg text-slate-600">A transparent, predictable system from day one. Here's exactly what you'll experience.</p>
          </div>

          <div className="relative">
            {/* Timeline track */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-slate-200 md:-translate-x-1/2 rounded-full" />
            
            <div className="space-y-12">
              {steps.map((step: any, i: number) => {
                const Icon = IconMap[step.icon] || Circle;
                const isEven = i % 2 === 0;
                return (
                  <TimelineStepItem key={i} step={step} index={i} isEven={isEven} icon={Icon} />
                );
              })}
            </div>
          </div>
        </Container>
      </section>
    );
  };



  // 7. ENGINEERING STANDARDS (Bento)
  const renderEngineeringStandards = () => {
    const stds = engineeringStandards.length > 0 ? engineeringStandards : DefaultStandards;
    
    return (
      <section className="py-24 bg-slate-950 text-white relative overflow-hidden">
        <Container className="max-w-6xl relative z-10">
          <div className="mb-16 max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-extrabold font-display mb-4">Our Engineering Standards</h2>
            <p className="text-lg text-slate-400">We build software that is fast, secure, and scalable. Rigor isn't optional; it's our baseline.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-auto md:auto-rows-[160px] lg:auto-rows-[180px]">
            {stds.slice(0, 6).map((std: any, i: number) => (
              <BentoCard key={i} std={std} index={i} />
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <p className="text-xl font-medium text-slate-400">But don't just take our word for it. Look at what we've shipped.</p>
          </div>
        </Container>
      </section>
    );
  };

  // 8. PRODUCTS WE'VE BUILT (Track Record)
  const renderFeaturedProjects = () => {
    if (!projects || projects.length === 0) return null;
    
    return (
      <section className="py-24 bg-white overflow-hidden">
        <Container className="max-w-7xl">
          <div className="mb-16 px-4">
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 font-display mb-4">Products We've Built</h2>
            <p className="text-lg text-slate-600">Real business results from scalable software.</p>
          </div>
          
          {/* Horizontal scroll on desktop, stack on mobile */}
          <div className="flex flex-col lg:flex-row gap-8 pb-8 px-4 overflow-x-auto snap-x snap-mandatory no-scrollbar hide-scroll">
            {projects.slice(0, 4).map((proj: any, i: number) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="snap-center shrink-0 w-full lg:w-[800px] bg-[#F8FAFC] rounded-3xl border border-slate-200 overflow-hidden flex flex-col group"
              >
                <div className="h-64 md:h-80 bg-slate-200 relative overflow-hidden">
                  {proj.image || proj.coverImage ? (
                    <img src={proj.image || proj.coverImage} alt={proj.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  ) : (
                    <div className="w-full h-full bg-slate-800 flex items-center justify-center">
                      <Code className="w-16 h-16 text-slate-600" />
                    </div>
                  )}
                  {/* Tech stack tags over image */}
                  <div className="absolute bottom-4 left-4 flex gap-2 flex-wrap">
                    {(proj.techStack || []).slice(0, 3).map((tech: string, idx: number) => (
                      <span key={idx} className="bg-black/50 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full border border-white/10">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="p-8 md:p-10 flex flex-col grow">
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">{proj.title}</h3>
                  <p className="text-slate-600 mb-6 line-clamp-2">{proj.shortDescription}</p>
                  
                  {proj.results && proj.results.length > 0 && (
                    <div className="bg-emerald-50 text-emerald-800 font-medium text-sm px-4 py-3 rounded-xl mb-auto flex items-center gap-3">
                      <TrendingUp className="w-5 h-5 text-emerald-600 shrink-0" />
                      {proj.results[0]}
                    </div>
                  )}
                  
                  <div className="mt-8 pt-6 border-t border-slate-200 flex items-center justify-between">
                    <Link href={`/portfolio/${proj.slug}`} className="font-bold text-brand-600 hover:text-brand-700 flex items-center gap-2 group/link">
                      View Case Study <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>
    );
  };

  // 9. CLIENT SUCCESS STORIES (Outcomes)
  const renderTestimonials = () => {
    if (!testimonials || testimonials.length === 0) return null;
    
    return (
      <section className="py-24 bg-slate-50 border-y border-slate-200">
        <Container className="max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 font-display mb-4">Don't Just Take Our Word For It</h2>
          </div>
          
          <div className="columns-1 md:columns-2 gap-6 space-y-6">
            {testimonials.map((t: any, i: number) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 2) * 0.1 }}
                className="bg-white p-8 rounded-3xl border border-slate-200 break-inside-avoid shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex gap-1 mb-6 text-amber-400">
                  {[...Array(5)].map((_, idx) => <Star key={idx} className="w-5 h-5 fill-current" />)}
                </div>
                <p className="text-lg md:text-xl font-medium leading-relaxed text-slate-800 mb-8">"{t.quote}"</p>
                
                {t.outcome && (
                  <div className="bg-emerald-50 rounded-xl p-4 mb-6 border border-emerald-100 flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div className="font-medium text-emerald-900 text-sm">{t.outcome}</div>
                  </div>
                )}
                
                <div className="flex items-center gap-4">
                  {t.photo ? (
                    <img src={t.photo} alt={t.author} className="w-12 h-12 rounded-full object-cover" />
                  ) : (
                    <div className="w-12 h-12 bg-slate-100 border border-slate-200 rounded-full flex items-center justify-center font-bold text-slate-500">
                      {t.author.charAt(0)}
                    </div>
                  )}
                  <div>
                    <div className="font-bold text-slate-900">{t.author}</div>
                    <div className="text-sm text-slate-500">{t.role}{t.company ? `, ${t.company}` : ''}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>
    );
  };

  // 10. BEFORE VS AFTER (Transformation)
  const renderBeforeAfter = () => {
    if (!beforeAfter || beforeAfter.length === 0) return null;

    return (
      <section className="py-24 bg-white">
        <Container className="max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 font-display mb-4">The Transformation</h2>
            <p className="text-lg text-slate-600">The shift our clients experience when they stop fighting their tech stack.</p>
          </div>
          
          <div className="space-y-8">
            {beforeAfter.map((item: any, i: number) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-[#F8FAFC] border border-slate-200 rounded-3xl p-6 md:p-10"
              >
                <h3 className="text-xl font-bold text-slate-900 mb-8 border-b border-slate-200 pb-4">{item.scenario}</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                  {/* Before */}
                  <div className="bg-white p-6 md:p-8 rounded-2xl border border-red-100 shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-red-50 rounded-full blur-2xl -mr-8 -mt-8" />
                    <div className="flex items-center gap-2 mb-4 relative z-10">
                      <X className="w-5 h-5 text-red-500" />
                      <span className="font-bold text-slate-400 uppercase tracking-widest text-xs">The Problem</span>
                    </div>
                    <p className="text-slate-700 font-medium relative z-10">{item.before}</p>
                  </div>
                  
                  {/* After */}
                  <div className="bg-emerald-50/50 p-6 md:p-8 rounded-2xl border border-emerald-100 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-100 rounded-full blur-2xl -mr-8 -mt-8" />
                    <div className="flex items-center gap-2 mb-4 relative z-10">
                      <Check className="w-5 h-5 text-emerald-600" />
                      <span className="font-bold text-emerald-700 uppercase tracking-widest text-xs">The Outcome</span>
                    </div>
                    <p className="text-emerald-900 font-medium relative z-10 text-lg">{item.after}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>
    );
  };

  // 11. WHY BUSINESSES INVEST (Value Prop Sticky Layout)
  const renderValueProp = () => {
    if (!whyUsReasons || whyUsReasons.length === 0) return null;

    return (
      <section className="py-24 bg-[#F8FAFC] border-t border-slate-200">
        <Container className="max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Sticky Header */}
            <div className="lg:col-span-5 relative">
              <div className="sticky top-32">
                <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 font-display mb-6">Why Businesses Invest in WebNest</h2>
                <p className="text-lg text-slate-600 mb-8">It's not an expense. It's a strategic investment in predictable delivery, scalable foundations, and peace of mind.</p>
                <Link href={hero.buttonLink || "/contact"}>
                  <Button variant="outline" className="hidden lg:inline-flex rounded-full border-slate-300">
                    Discuss Your Needs
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Scrolling List */}
            <div className="lg:col-span-7">
              <div className="space-y-12">
                {whyUsReasons.map((reason: any, i: number) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="relative pl-10 md:pl-16"
                  >
                    <div className="absolute left-0 top-0 text-5xl md:text-7xl font-black text-slate-200/50 font-display select-none -translate-x-2 -translate-y-4">
                      {i + 1}
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-4 relative z-10">{reason.title}</h3>
                    <p className="text-lg text-slate-600 leading-relaxed relative z-10">{reason.text}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>
    );
  };

  // 12. FAQ (Objection Handling)
  const renderFaqs = () => {
    if (!faqs || faqs.length === 0) return null;
    
    return (
      <section className="py-24 bg-white border-y border-slate-200">
        <Container className="max-w-3xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 font-display mb-4">Clear Expectations</h2>
            <p className="text-lg text-slate-600">Addressing your final questions before we talk.</p>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq: any, i: number) => (
              <FaqItem key={i} faq={faq} index={i} />
            ))}
          </div>
        </Container>
      </section>
    );
  };

  // 13. FINAL CTA (Convert)
  const renderCta = () => {
    return (
      <section className="py-32 bg-[#0B1120] relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-1/2 bg-brand-500/20 blur-[120px] rounded-full pointer-events-none" />
        
        <Container className="relative z-10 text-center max-w-4xl">
          <h2 className="text-4xl md:text-6xl font-black text-white font-display mb-6">{cta.title}</h2>
          <p className="text-xl text-slate-400 mx-auto mb-12 max-w-2xl">{cta.subtitle}</p>
          
          <Link href={cta.buttonLink}>
            <Button variant="primary" className="h-16 px-12 rounded-full text-xl font-bold bg-white text-slate-900 hover:bg-slate-100 hover:scale-105 transition-all shadow-[0_0_40px_rgba(255,255,255,0.1)] mb-20 group">
              {cta.buttonText}
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          
          {/* Project Journey Recap */}
          <div className="pt-16 border-t border-slate-800/50">
            <div className="flex items-center justify-between relative max-w-2xl mx-auto">
              <div className="absolute top-1/2 left-[10%] right-[10%] h-px bg-slate-800 -translate-y-1/2 z-0" />
              
              {['Connect', 'Discover', 'Build', 'Launch'].map((step, i) => (
                <div key={i} className="flex flex-col items-center relative z-10 bg-[#0B1120] px-2">
                  <div className="w-10 h-10 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-slate-400 font-bold mb-3">
                    {i + 1}
                  </div>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>
    );
  };

  return (
    <div className="min-h-screen bg-white selection:bg-brand-500/30">
      {renderHero()}
      {renderMetrics()}
      {renderFrustrations()}
      {renderComparison()}
      {renderTimeline()}
      {renderEngineeringStandards()}
      {renderFeaturedProjects()}
      {renderTestimonials()}
      {renderBeforeAfter()}
      {renderValueProp()}
      {renderFaqs()}
      {renderCta()}
    </div>
  );
}

// --- Sub-components for interactivity ---

const BentoAnimatedNumber = ({ value, suffix = "", prefix = "" }: { value: number, suffix?: string, prefix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000;
      const frames = 60 * (duration / 1000);
      const increment = value / frames;
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 1000 / 60);
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return <span ref={ref}>{prefix}{count}{suffix}</span>;
}

const BentoCard = ({ std, index }: { std: any, index: number }) => {
  const Icon = IconMap[std.icon] || Code;
  
  const layouts = [
    "md:col-span-2 md:row-span-2", // 0: Performance
    "md:col-span-1 md:row-span-1", // 1: Security
    "md:col-span-1 md:row-span-1", // 2: Accessibility
    "md:col-span-2 md:row-span-1", // 3: Scalability
    "md:col-span-1 md:row-span-1", // 4: Maintainability
    "md:col-span-3 md:row-span-1", // 5: Clean Architecture
  ];

  const styles = [
    { anchor: "from-brand-500/20 to-brand-900/0", borderHover: "hover:border-brand-500/50", text: "text-brand-400", line: "bg-brand-500" },
    { anchor: "from-emerald-500/20 to-emerald-900/0", borderHover: "hover:border-emerald-500/50", text: "text-emerald-400", line: "bg-emerald-500" },
    { anchor: "from-purple-500/20 to-purple-900/0", borderHover: "hover:border-purple-500/50", text: "text-purple-400", line: "bg-purple-500" },
    { anchor: "from-blue-500/20 to-blue-900/0", borderHover: "hover:border-blue-500/50", text: "text-blue-400", line: "bg-blue-500" },
    { anchor: "from-amber-500/20 to-amber-900/0", borderHover: "hover:border-amber-500/50", text: "text-amber-400", line: "bg-amber-500" },
    { anchor: "from-pink-500/20 to-pink-900/0", borderHover: "hover:border-pink-500/50", text: "text-pink-400", line: "bg-pink-500" },
  ];

  const layout = layouts[index % layouts.length];
  const style = styles[index % styles.length];

  const renderStat = () => {
    switch(index) {
      case 0: return <div className={`text-5xl lg:text-7xl font-black ${style.text} font-display`}><BentoAnimatedNumber value={95} suffix="+" /></div>;
      case 1: return <div className={`text-3xl font-black ${style.text} font-display`}><BentoAnimatedNumber value={0} suffix=" breaches" /></div>;
      case 2: return <div className={`text-4xl font-black ${style.text} font-display`}>AA</div>;
      case 3: return <div className={`text-4xl font-black ${style.text} font-display`}><BentoAnimatedNumber value={10} suffix="x" /></div>;
      case 4: return <div className={`px-4 py-1.5 bg-amber-500/10 ${style.text} rounded-lg text-sm border border-amber-500/30 font-bold tracking-widest uppercase shadow-[0_0_15px_rgba(245,158,11,0.2)]`}>A+ Grade</div>;
      case 5: return (
        <div className="flex gap-2 opacity-80 group-hover:opacity-100 transition-opacity items-end h-10 mt-2">
          <div className="w-3 h-5 bg-pink-500/40 rounded-sm group-hover:bg-pink-500 transition-colors" />
          <div className="w-3 h-8 bg-pink-400/40 rounded-sm group-hover:bg-pink-400 transition-colors" />
          <div className="w-3 h-12 bg-pink-300/40 rounded-sm group-hover:bg-pink-300 transition-colors shadow-[0_0_15px_rgba(249,168,212,0.4)]" />
        </div>
      );
      default: return null;
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
      className={`relative bg-[#0B1120] rounded-3xl border border-slate-800 p-8 flex flex-col justify-between overflow-hidden group transition-all duration-500 hover:-translate-y-2 ${style.borderHover} ${layout} hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]`}
    >
      <div className={`absolute -top-24 -right-24 w-64 h-64 bg-gradient-to-br ${style.anchor} blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />
      <div className={`absolute top-0 left-0 right-0 h-[2px] ${style.line} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

      <div className="relative z-10 flex flex-col h-full justify-between gap-8">
        <div className="flex justify-between items-start gap-4">
          <div className={`w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center relative overflow-hidden group-hover:scale-110 group-hover:border-transparent transition-all duration-500 shadow-inner shrink-0`}>
            <div className={`absolute inset-0 bg-gradient-to-br ${style.anchor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
            <Icon className={`w-8 h-8 text-slate-500 group-hover:${style.text} relative z-10 transition-colors duration-500`} strokeWidth={1.5} />
          </div>
          <div className="text-right">
            {renderStat()}
          </div>
        </div>
        <div className="mt-auto">
          <h3 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-slate-100 transition-colors">{std.title}</h3>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed group-hover:text-slate-300 transition-colors">{std.description}</p>
        </div>
      </div>
    </motion.div>
  );
};

const StatCounter = ({ stat, index, total }: { stat: any, index: number, total: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = parseInt(stat.value) || 0;
      if (end === 0) return;
      const duration = 2000;
      const increment = end / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, stat.value]);

  return (
    <div ref={ref} className={`w-full py-8 text-center px-4 md:w-1/${total}`}>
      <div className="text-4xl md:text-5xl font-black text-brand-600 font-display mb-2">
        {count}{stat.suffix}
      </div>
      <div className="text-sm font-bold text-slate-500 uppercase tracking-wider">{stat.label}</div>
    </div>
  );
};

const ComparisonRow = ({ row, index }: { row: any, index: number }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -10 }} 
      whileInView={{ opacity: 1, x: 0 }} 
      viewport={{ once: true }} 
      transition={{ delay: index * 0.05 }}
      className="grid grid-cols-12 p-6 items-center hover:bg-slate-50 transition-colors group"
    >
      <div className="col-span-4 font-bold text-slate-900 pr-4 group-hover:text-brand-600 transition-colors">{row.criteria || row.feature}</div>
      <div className="col-span-4 text-slate-400 text-center pr-4 transition-colors group-hover:text-slate-500">{row.typicalAgencyText || row.typicalAgency}</div>
      <div className="col-span-4 font-bold text-brand-700 bg-brand-50/50 group-hover:bg-brand-50 rounded-lg p-3 text-center flex flex-col sm:flex-row items-center justify-center gap-2 transition-colors">
        <CheckCircle2 className="w-5 h-5 text-brand-500 shrink-0" />
        {row.webnestText || row.webNest}
      </div>
    </motion.div>
  );
};

const TimelineStepItem = ({ step, index, isEven, icon: Icon }: { step: any, index: number, isEven: boolean, icon: any }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["end end", "center center"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.7, 1], [0.3, 0.7, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.7, 1], [0.95, 0.98, 1]);
  const borderColor = useTransform(scrollYProgress, [0, 0.7, 1], ["#E2E8F0", "#93C5FD", "#3B82F6"]);
  const iconColor = useTransform(scrollYProgress, [0, 0.7, 1], ["#94A3B8", "#FFFFFF", "#FFFFFF"]);
  const iconBg = useTransform(scrollYProgress, [0, 0.7, 1], ["#FFFFFF", "#60A5FA", "#3B82F6"]);
  const iconScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <div ref={ref} className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-0 ${isEven ? 'md:flex-row-reverse' : ''}`}>
      {/* Center node */}
      <motion.div 
        className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 border-[4px] rounded-full items-center justify-center z-10 shadow-sm transition-all"
        style={{ borderColor, backgroundColor: iconBg, color: iconColor, scale: iconScale }}
      >
        <Icon className="w-5 h-5" />
      </motion.div>
      
      {/* Spacer for desktop */}
      <div className="hidden md:block w-1/2" />
      
      {/* Content */}
      <div className={`w-full md:w-1/2 ${isEven ? 'md:pr-16 text-left md:text-right' : 'md:pl-16 text-left'}`}>
        <motion.div 
          style={{ opacity, scale }}
          className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow group relative overflow-hidden"
        >
          {/* Subtle active state gradient hint */}
          <motion.div 
            style={{ opacity: useTransform(scrollYProgress, [0, 1], [0, 1]) }}
            className="absolute inset-0 bg-gradient-to-tr from-brand-50 to-transparent pointer-events-none"
          />
          <div className="relative z-10">
            <div className="text-brand-600 text-sm font-bold uppercase tracking-widest mb-3">Step {index + 1}</div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">{step.title}</h3>
            {/* The prompt said: "clientExperience" or "desc" */}
            <p className="text-slate-600 leading-relaxed">{step.desc || step.clientExperience || step.description}</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const FaqItem = ({ faq, index }: { faq: any, index: number }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      viewport={{ once: true }} 
      transition={{ delay: index * 0.1 }}
      className="border border-slate-200 rounded-2xl overflow-hidden bg-[#F8FAFC] hover:border-slate-300 transition-colors"
    >
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full px-6 md:px-8 py-6 text-left flex justify-between items-center group"
        suppressHydrationWarning
      >
        <span className="font-bold text-slate-900 md:text-lg pr-8">{faq.question}</span>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${isOpen ? 'bg-slate-200' : 'bg-slate-100 group-hover:bg-slate-200'}`}>
          <ChevronDown className={`w-5 h-5 text-slate-600 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }} 
            animate={{ height: "auto", opacity: 1 }} 
            exit={{ height: 0, opacity: 0 }} 
            transition={{ duration: 0.3, ease: "easeInOut" }} 
            className="px-6 md:px-8 pb-6 pt-0"
          >
            <div className="pt-4 border-t border-slate-200">
              <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
