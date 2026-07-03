"use client";

import { motion } from "framer-motion";
import { Container, Section } from "@/components/ui/Section";
import { 
  Code2, Server, Database, Cloud, CreditCard, Wrench, 
  Sparkles, Layers, Box, Terminal, Globe, ShieldCheck
} from "lucide-react";

import { getTechStack } from "@/services/api";
import { useState, useEffect } from "react";

export default function TechnologiesPage() {
  const [techCategories, setTechCategories] = useState<any[]>([]);

  useEffect(() => {
    getTechStack().then(setTechCategories);
  }, []);
  return (
    <main className="min-h-screen pt-32 pb-20 bg-surface-0 overflow-hidden">
      
      {/* Hero Section */}
      <Section className="pb-16 relative">
        <div className="absolute top-0 right-0 w-1/2 h-[500px] bg-gradient-to-bl from-brand-50 to-transparent blur-3xl -z-10" />
        <Container>
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center rounded-full bg-blue-50/80 px-3 py-1 text-xs font-semibold text-brand-600 ring-1 ring-inset ring-brand-600/10 mb-8 uppercase tracking-wider"
            >
              Tech Stack
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-ink-900 mb-6 font-display"
            >
              Powered by <span className="text-gradient">modern</span> engineering.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-ink-600 max-w-2xl leading-relaxed mb-12"
            >
              We don't use legacy systems or bloated frameworks. We build exclusively on the modern web stack to guarantee security, scalability, and unmatched performance.
            </motion.p>
          </div>
        </Container>
      </Section>

      {/* Categories */}
      {techCategories?.map((category: any, idx: number) => {
        const CategoryIcon = (require('lucide-react') as any)[category.icon] || Code2;
        return (
        <Section key={category.title} className="py-12 md:py-20 border-t border-gray-100" background={idx % 2 === 0 ? "default" : "alternate"}>
          <Container>
            <div className="flex items-center gap-4 mb-12">
              <div className="w-14 h-14 bg-brand-50 text-brand-600 rounded-2xl flex items-center justify-center">
                <CategoryIcon className="w-7 h-7" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold font-display text-ink-900">{category.title}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.items?.map((tech: any, techIdx: number) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: techIdx * 0.1 }}
                  className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow group flex flex-col h-full"
                >
                  <div className="flex items-center gap-3 mb-4">
                     <div className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center text-ink-600 group-hover:text-brand-600 group-hover:border-brand-200 transition-colors">
                       <Box className="w-4 h-4" />
                     </div>
                     <h3 className="text-xl font-bold text-ink-900 font-display">{tech.name}</h3>
                  </div>
                  
                  <p className="text-ink-600 mb-6 font-medium text-sm">{tech.desc}</p>
                  
                  <div className="mt-auto pt-6 border-t border-gray-50 space-y-4">
                    <div>
                      <span className="block text-[11px] font-bold uppercase tracking-wider text-ink-400 mb-1">Why We Use It</span>
                      <p className="text-sm text-ink-700 leading-relaxed">{tech.why}</p>
                    </div>
                    <div>
                      <span className="block text-[11px] font-bold uppercase tracking-wider text-ink-400 mb-1">Featured In</span>
                      <p className="text-sm text-brand-600 font-medium">{tech.projects}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Container>
        </Section>
      )})}

    </main>
  );
}
