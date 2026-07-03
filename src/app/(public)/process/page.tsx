"use client";

import { motion } from "framer-motion";
import { Container, Section } from "@/components/ui/Section";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

export default function ProcessPage() {
  return (
    <main className="min-h-screen pt-32 pb-20 overflow-hidden bg-surface-0">
      
      {/* Hero Section */}
      <Section className="pb-12 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-100/40 via-transparent to-transparent -z-10" />
        <Container>
          <div className="max-w-4xl mx-auto text-center">
             <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center rounded-full bg-blue-50/80 px-3 py-1 text-xs font-semibold text-brand-600 ring-1 ring-inset ring-brand-600/10 mb-8 uppercase tracking-wider"
            >
              How We Work
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-ink-900 mb-6 font-display"
            >
              Engineering <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-600 to-[#6D5EF5]">Excellence</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-ink-600 max-w-2xl mx-auto leading-relaxed"
            >
              We don't believe in black boxes. Our battle-tested methodology ensures total transparency, predictable timelines, and exceptional technical outcomes.
            </motion.p>
          </div>
        </Container>
      </Section>

      {/* The Core Process Timeline Component */}
      <ProcessTimeline />

      {/* Philosophy / Reassurance Section */}
      <Section background="alternate" className="py-24 border-t border-gray-100 mt-12">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold font-display text-ink-900 mb-6">Built for scale. Designed for humans.</h2>
              <p className="text-lg text-ink-600 mb-6 leading-relaxed">
                Our process isn't just about writing code; it's about solving business problems. By combining rigorous agile methodologies with world-class design thinking, we ensure that every product we launch is both beautiful and bulletproof.
              </p>
              <ul className="space-y-4">
                {[
                  "Weekly sprint reviews and transparent reporting.",
                  "Direct access to your lead engineers and designers.",
                  "Zero vendor lock-in with clean, documented codebases."
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-ink-700 font-medium">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-gray-200/60 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-brand-50 to-transparent rounded-full blur-3xl -z-10" />
               <h3 className="text-2xl font-bold text-ink-900 mb-4 font-display">Ready to start?</h3>
               <p className="text-ink-600 mb-8">Schedule a discovery call to discuss your project requirements and see if we're a technical fit.</p>
               <Button variant="primary" className="w-full h-[52px] text-[15px] group">
                 Book a Discovery Call <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
               </Button>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
