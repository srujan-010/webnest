"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Search, PenTool, Layout, Code2, TestTube, Rocket, Headphones, Zap, MessageSquare, Terminal, Heart, Lightbulb, ArrowRight, CheckCircle2, ChevronRight, Activity, ArrowDown } from "lucide-react";
import { Container, Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

const iconMap: Record<string, any> = { Search, PenTool, Layout, Code2, TestTube, Rocket, Headphones, Zap, MessageSquare, Terminal, Heart, Lightbulb };

interface ProcessClientProps {
  steps: any[];
}

export function ProcessClient({ steps }: ProcessClientProps) {
  const [activeStep, setActiveStep] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // Calculate active step based on scroll
  useEffect(() => {
    const handleScroll = () => {
      const stepElements = document.querySelectorAll('.process-step');
      let current = 0;
      stepElements.forEach((el, index) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.6) {
          current = index;
        }
      });
      setActiveStep(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-brand-500/30 overflow-hidden relative">
      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Subtle blueprint grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
        {/* Soft radial gradients */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-100/40 via-transparent to-transparent opacity-60 blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-100/40 via-transparent to-transparent opacity-60 blur-3xl" />
      </div>

      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-16 z-10 border-b border-slate-200/50 bg-white/50 backdrop-blur-3xl">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-2xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-brand-600 ring-1 ring-inset ring-brand-600/20 mb-6 uppercase tracking-widest"
              >
                How We Work
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
                className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 mb-6 font-display leading-[1.1]"
              >
                Engineering <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-600 to-indigo-600">Excellence</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg md:text-xl text-slate-500 leading-relaxed max-w-xl"
              >
                We don't believe in black boxes. Our battle-tested methodology ensures total transparency, predictable timelines, and exceptional technical outcomes.
              </motion.p>
            </div>
            
            {/* Animated Engineering Illustration */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.3 }}
              className="relative hidden lg:block h-[400px] w-full"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Flow lines */}
                <svg className="absolute w-full h-full text-slate-200" viewBox="0 0 400 300">
                  <path d="M 50,150 C 150,150 150,50 250,50 C 350,50 350,250 250,250 C 150,250 150,150 250,150" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4">
                    <animate attributeName="stroke-dashoffset" from="40" to="0" dur="2s" repeatCount="indefinite" />
                  </path>
                </svg>
                {/* Floating Mockups */}
                <motion.div animate={{ y: [-10, 10, -10] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="absolute left-[10%] top-[30%] w-32 h-40 bg-white rounded-xl shadow-xl border border-slate-200 p-3">
                  <div className="w-full h-2 bg-slate-100 rounded-sm mb-2" />
                  <div className="w-2/3 h-2 bg-slate-100 rounded-sm mb-4" />
                  <div className="w-full h-16 bg-blue-50 rounded-md" />
                </motion.div>
                <motion.div animate={{ y: [10, -10, 10] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute right-[15%] top-[10%] w-36 h-36 bg-slate-900 rounded-xl shadow-2xl border border-slate-800 p-4">
                  <Code2 className="text-brand-400 w-6 h-6 mb-3" />
                  <div className="w-full h-1.5 bg-slate-800 rounded-sm mb-2" />
                  <div className="w-4/5 h-1.5 bg-slate-800 rounded-sm mb-2" />
                  <div className="w-full h-1.5 bg-slate-800 rounded-sm mb-2" />
                  <div className="w-3/5 h-1.5 bg-slate-800 rounded-sm" />
                </motion.div>
                <motion.div animate={{ y: [-5, 5, -5] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }} className="absolute right-[25%] bottom-[15%] w-40 h-24 bg-white rounded-xl shadow-lg border border-slate-200 p-3 flex flex-col justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center"><CheckCircle2 className="w-3 h-3 text-emerald-600" /></div>
                    <div className="w-16 h-2 bg-slate-100 rounded-sm" />
                  </div>
                  <div className="w-full h-8 bg-slate-50 rounded-md mt-2 border border-slate-100" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* 2. STICKY NAV & PROCESS TIMELINE */}
      <Container className="relative z-10 py-24">
        <div className="flex flex-col lg:flex-row gap-16 items-start relative">
          
          {/* STICKY NAVIGATION */}
          <div className="hidden lg:block w-48 shrink-0 sticky top-32">
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">Process Stages</h4>
            <nav className="flex flex-col gap-1 relative">
              {/* Active indicator bar */}
              <div className="absolute left-0 top-0 w-0.5 bg-slate-200 h-full rounded-full" />
              <motion.div 
                className="absolute left-0 w-0.5 bg-brand-600 rounded-full transition-all duration-300"
                style={{ top: `${(activeStep / Math.max(steps.length - 1, 1)) * 100}%`, height: '24px', marginTop: '-12px' }}
              />
              
              {steps.map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    const el = document.getElementById(`step-${idx}`);
                    if (el) {
                      const offset = 100;
                      const bodyRect = document.body.getBoundingClientRect().top;
                      const elementRect = el.getBoundingClientRect().top;
                      const elementPosition = elementRect - bodyRect;
                      window.scrollTo({ top: elementPosition - offset, behavior: "smooth" });
                    }
                  }}
                  className={`text-left text-sm py-2 px-4 transition-all ${activeStep === idx ? 'text-brand-700 font-bold' : 'text-slate-500 hover:text-slate-900 font-medium'}`}
                >
                  {step.title}
                </button>
              ))}
            </nav>
          </div>

          {/* TIMELINE */}
          <div className="flex-1 min-w-0 relative" ref={containerRef}>
            {/* Animated center line */}
            <div className="absolute left-6 md:left-[50%] top-0 bottom-0 w-[2px] bg-slate-200 -translate-x-1/2 rounded-full overflow-hidden">
              <motion.div 
                className="absolute top-0 left-0 w-full bg-gradient-to-b from-brand-500 via-indigo-500 to-emerald-500 rounded-full"
                style={{ height: lineHeight }}
              />
              {/* Flowing particles */}
              <motion.div 
                animate={{ top: ["0%", "100%"] }} 
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute left-1/2 -translate-x-1/2 w-1.5 h-8 bg-white rounded-full blur-[2px] opacity-70"
              />
            </div>

            <div className="space-y-12 md:space-y-32 py-10">
              {steps.map((step, index) => {
                const isActive = activeStep === index;
                const isPast = activeStep > index;
                const Icon = iconMap[step.icon] || Zap;
                const displayId = (index + 1).toString().padStart(2, '0');

                return (
                  <motion.div 
                    id={`step-${index}`}
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, type: "spring", bounce: 0.2 }}
                    className={`process-step relative flex flex-col md:flex-row items-center justify-between group ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                  >
                    {/* Timeline Node */}
                    <div className="absolute left-6 md:left-1/2 -translate-x-1/2 flex items-center justify-center z-20">
                      <motion.div 
                        animate={{ 
                          scale: isActive ? 1.2 : 1,
                          backgroundColor: isActive || isPast ? '#2563eb' : '#ffffff',
                          borderColor: isActive || isPast ? '#2563eb' : '#e2e8f0',
                          color: isActive || isPast ? '#ffffff' : '#64748b'
                        }}
                        transition={{ duration: 0.3 }}
                        className="w-12 h-12 rounded-full border-4 shadow-sm flex items-center justify-center transition-all duration-300"
                      >
                        <Icon className="w-5 h-5" />
                      </motion.div>
                      {/* Active Glow */}
                      {isActive && (
                        <div className="absolute inset-0 bg-brand-500 rounded-full blur-xl opacity-40 animate-pulse" />
                      )}
                    </div>

                    {/* Card Content */}
                    <div className={`w-full md:w-[45%] pl-20 md:pl-0 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                      <div className={`relative bg-white/80 backdrop-blur-xl p-8 rounded-3xl border transition-all duration-500 ${isActive ? 'border-brand-200 shadow-2xl shadow-brand-500/10 scale-[1.02]' : isPast ? 'border-slate-200 shadow-md opacity-70' : 'border-slate-100 shadow-sm opacity-50'} hover:shadow-xl hover:-translate-y-1`}>
                        
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-2xl font-extrabold text-slate-900 font-display">{step.title}</h3>
                          <span className="text-4xl font-black text-slate-100 select-none font-display leading-none">{displayId}</span>
                        </div>
                        
                        <p className="text-slate-600 leading-relaxed mb-6">{step.desc}</p>
                        
                        {/* Extended Details */}
                        <div className="space-y-4 pt-4 border-t border-slate-100 text-sm">
                          {step.duration && (
                            <div className="flex items-start gap-3">
                              <span className="w-24 shrink-0 font-bold text-slate-900">Duration</span>
                              <span className="text-slate-600 font-medium">{step.duration}</span>
                            </div>
                          )}
                          
                          {step.deliverables && step.deliverables.length > 0 && (
                            <div className="flex items-start gap-3">
                              <span className="w-24 shrink-0 font-bold text-slate-900">Deliverables</span>
                              <ul className="text-slate-600 space-y-1">
                                {step.deliverables.map((del: string, i: number) => (
                                  <li key={i} className="flex items-center gap-2">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> {del}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                          
                          {step.outcome && (
                            <div className="flex items-start gap-3 pt-2">
                              <span className="w-24 shrink-0 font-bold text-slate-900">Outcome</span>
                              <span className="text-brand-600 font-bold bg-brand-50 px-2.5 py-0.5 rounded-md">{step.outcome}</span>
                            </div>
                          )}
                        </div>

                      </div>
                    </div>

                    <div className="hidden md:block w-[45%]" />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>

      {/* 4. PROCESS OUTPUTS FLOW */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-brand-900/40 via-slate-900 to-slate-950" />
        <Container className="relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold font-display mb-16">The Value Chain</h2>
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 max-w-5xl mx-auto">
            {[
              { phase: "Discover", deliverable: "Research Report" },
              { phase: "Plan", deliverable: "Tech Architecture" },
              { phase: "Design", deliverable: "Interactive Prototype" },
              { phase: "Develop", deliverable: "Production Build" },
              { phase: "Launch", deliverable: "Live Product" },
            ].map((item, i, arr) => (
              <React.Fragment key={i}>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="flex flex-col items-center"
                >
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">{item.phase}</span>
                  <div className="px-5 py-3 rounded-xl bg-slate-800 border border-slate-700 font-semibold shadow-lg">
                    {item.deliverable}
                  </div>
                </motion.div>
                {i < arr.length - 1 && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 + 0.1 }}
                  >
                    <ArrowRight className="w-5 h-5 text-brand-500 hidden md:block" />
                    <ArrowDown className="w-5 h-5 text-brand-500 md:hidden my-2" />
                  </motion.div>
                )}
              </React.Fragment>
            ))}
          </div>
        </Container>
      </section>

      {/* 5. ENGINEERING METRICS */}
      <section className="py-24 bg-white border-b border-slate-100">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Projects Delivered", value: "150+" },
              { label: "Client Satisfaction", value: "98%" },
              { label: "Average MVP", value: "4 Weeks" },
              { label: "Support", value: "24/7" },
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="text-center p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="text-4xl md:text-5xl font-black text-slate-900 font-display mb-3">{stat.value}</div>
                <div className="text-sm font-bold text-slate-500 uppercase tracking-widest">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* 6. COLLABORATION WORKFLOW */}
      <section className="py-24 bg-slate-50">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold font-display text-slate-900 mb-4">How We Collaborate</h2>
            <p className="text-slate-600 leading-relaxed">Continuous delivery requires continuous communication. Here is how we stay aligned with your team.</p>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 max-w-4xl mx-auto">
            {[
              { title: "Weekly Syncs", icon: Activity },
              { title: "Sprint Reviews", icon: Layout },
              { title: "Design Approvals", icon: CheckCircle2 },
              { title: "Continuous QA", icon: TestTube },
            ].map((item, i, arr) => (
              <React.Fragment key={i}>
                <div className="flex flex-col items-center text-center group cursor-default">
                  <div className="w-16 h-16 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center mb-4 group-hover:border-brand-500 group-hover:shadow-md transition-all">
                    <item.icon className="w-6 h-6 text-slate-600 group-hover:text-brand-600 transition-colors" />
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">{item.title}</h4>
                </div>
                {i < arr.length - 1 && (
                  <div className="hidden md:block flex-1 h-[2px] bg-slate-200 relative overflow-hidden">
                    <motion.div 
                      animate={{ left: ["-100%", "100%"] }} 
                      transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: i * 0.5 }}
                      className="absolute top-0 w-1/2 h-full bg-gradient-to-r from-transparent via-brand-500 to-transparent opacity-50"
                    />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </Container>
      </section>

      {/* 8. FINAL CTA */}
      <section className="relative py-32 overflow-hidden bg-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-900/40 via-slate-900 to-slate-950" />
        <Container className="relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-extrabold font-display text-white mb-6">
              Ready to Build Something Exceptional?
            </h2>
            <p className="text-xl text-slate-300 mb-16 leading-relaxed">
              Skip the guesswork. Partner with an engineering team that delivers predictable excellence.
            </p>
            
            {/* CTA Timeline */}
            <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 mb-16 text-sm font-bold text-slate-300">
              <span className="flex items-center gap-2 bg-slate-800/50 px-4 py-2 rounded-full border border-slate-700 backdrop-blur-sm"><span className="w-5 h-5 rounded-full bg-brand-500 text-white flex items-center justify-center text-[10px]">1</span> Discovery Call</span>
              <ChevronRight className="w-4 h-4 text-slate-600 hidden sm:block" />
              <span className="flex items-center gap-2 bg-slate-800/50 px-4 py-2 rounded-full border border-slate-700 backdrop-blur-sm"><span className="w-5 h-5 rounded-full bg-brand-500 text-white flex items-center justify-center text-[10px]">2</span> Proposal</span>
              <ChevronRight className="w-4 h-4 text-slate-600 hidden sm:block" />
              <span className="flex items-center gap-2 bg-slate-800/50 px-4 py-2 rounded-full border border-slate-700 backdrop-blur-sm"><span className="w-5 h-5 rounded-full bg-brand-500 text-white flex items-center justify-center text-[10px]">3</span> Kickoff</span>
              <ChevronRight className="w-4 h-4 text-slate-600 hidden sm:block" />
              <span className="flex items-center gap-2 bg-brand-900/50 text-brand-300 px-4 py-2 rounded-full border border-brand-700/50 backdrop-blur-sm"><Rocket className="w-4 h-4" /> Launch</span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/contact">
                <Button variant="primary" className="h-14 px-8 rounded-full text-base font-bold bg-white text-slate-900 hover:bg-slate-100 hover:scale-105 transition-all shadow-xl shadow-white/10">
                  Book Discovery Call
                </Button>
              </Link>
              <Link href="/portfolio">
                <Button variant="outline" className="h-14 px-8 rounded-full text-base font-bold border-slate-700 text-white hover:bg-slate-800 transition-colors">
                  View Portfolio
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
