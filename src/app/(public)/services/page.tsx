"use client";

import { motion } from "framer-motion";
import { Container, Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { 
  Monitor, Smartphone, ShoppingCart, LayoutDashboard, 
  Search, Wrench, Server, PenTool, ArrowRight, CheckCircle2,
  Clock, Code2, Zap
} from "lucide-react";
import Link from "next/link";

import { getServices } from "@/services/api";
import { useState, useEffect } from "react";

export default function ServicesPage() {
  const [allServices, setAllServices] = useState<any[]>([]);

  useEffect(() => {
    getServices().then(setAllServices);
  }, []);

  const detailedServices = allServices?.filter((s: any) => s.isDetailed) || [];
  const additionalServices = allServices?.filter((s: any) => !s.isDetailed) || [];


  return (
    <main className="min-h-screen pt-32 pb-20 overflow-hidden">
      
      {/* 1. Hero Section */}
      <Section className="pb-16 relative">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-ink-900 mb-6 font-display"
            >
              Premium Services for <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-600 to-[#6D5EF5]">Digital Leaders</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg md:text-xl text-ink-600 max-w-2xl mx-auto leading-relaxed"
            >
              From bespoke corporate websites to complex SaaS applications, we engineer digital solutions that solve real business problems.
            </motion.p>
          </div>
        </Container>
      </Section>

      {/* 2. Deep Dive Services (The big three) */}
      {detailedServices.map((service: any, index: number) => {
        const IconComponent = (require('lucide-react') as any)[service.icon] || LayoutDashboard;
        return (
        <Section 
          key={service._id || service.idSlug || index} 
          id={service.idSlug}
          background={index % 2 !== 0 ? "alternate" : "default"} 
          className="py-24 border-t border-gray-100"
        >
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
              
              {/* Left: Overview & Benefits */}
              <div className="lg:col-span-7">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-brand-50 rounded-2xl flex items-center justify-center text-brand-600">
                    <IconComponent className="w-8 h-8" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold font-display text-ink-900">{service.title}</h2>
                </div>
                
                <p className="text-xl text-ink-600 leading-relaxed mb-10">
                  {service.overview}
                </p>

                <div className="mb-12">
                  <h3 className="text-lg font-bold text-ink-900 mb-6 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-amber-500" /> Key Benefits
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {service.benefits?.map((benefit: string, bIdx: number) => (
                      <div key={`${benefit}-${bIdx}`} className="flex items-start gap-3 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                        <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                        <span className="font-medium text-ink-700">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Service Specific FAQ */}
                <div className="mt-12 pt-12 border-t border-gray-100">
                  <h3 className="text-2xl font-bold text-ink-900 mb-6">Frequently Asked Questions</h3>
                  <FaqAccordion items={service.faqs} />
                </div>
              </div>

              {/* Right: Specs & CTA */}
              <div className="lg:col-span-5">
                <div className="bg-white rounded-3xl p-8 border border-gray-200/60 shadow-xl shadow-brand-900/5 sticky top-32">
                  
                  <div className="mb-8">
                    <h4 className="text-sm font-bold uppercase tracking-widest text-ink-400 mb-4 flex items-center gap-2">
                      <Code2 className="w-4 h-4" /> Tech Stack
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {service.technologies?.map((tech: string, tIdx: number) => (
                        <span key={`${tech}-${tIdx}`} className="px-3 py-1.5 bg-surface-1 border border-gray-200 rounded-md text-sm font-medium text-ink-700">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-10 pb-8 border-b border-gray-100">
                    <h4 className="text-sm font-bold uppercase tracking-widest text-ink-400 mb-4 flex items-center gap-2">
                      <Clock className="w-4 h-4" /> Est. Timeline
                    </h4>
                    <p className="text-xl font-bold text-ink-900">{service.timeline}</p>
                  </div>

                  <div className="space-y-4">
                    <Button variant="primary" className="w-full h-12 justify-between group">
                      Request Pricing <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                    <Link href={`/portfolio?category=${service.idSlug}`}>
                      <Button variant="ghost" className="w-full h-12 mt-2">
                        View Related Projects
                      </Button>
                    </Link>
                  </div>

                </div>
              </div>

            </div>
          </Container>
        </Section>
      )})}

      {/* 3. Additional Services Grid */}
      <Section background="alternate" className="py-24 border-t border-gray-100">
        <Container>
          <div className="mb-16">
            <h2 className="text-3xl font-bold font-display text-ink-900 mb-4">More Expertise</h2>
            <p className="text-lg text-ink-600 max-w-2xl">Additional services we provide to ensure your digital infrastructure remains robust and competitive.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalServices.map((service: any, sIdx: number) => {
              const SmallIcon = (require('lucide-react') as any)[service.icon] || LayoutDashboard;
              return (
              <div key={service._id || service.idSlug || sIdx} id={service.idSlug} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group cursor-pointer">
                <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-ink-600 mb-6 group-hover:bg-brand-50 group-hover:text-brand-600 transition-colors">
                  <SmallIcon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-ink-900 mb-3">{service.title}</h3>
                <p className="text-ink-600 leading-relaxed mb-6">{service.overview}</p>
                <div className="flex items-center text-brand-600 font-semibold text-sm group-hover:gap-2 transition-all">
                  Learn More <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            )})}
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section className="py-24">
        <Container>
           <div className="bg-ink-900 rounded-[2.5rem] p-12 md:p-20 text-center relative overflow-hidden">
             <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-600/30 via-ink-900 to-ink-900 pointer-events-none" />
             <div className="relative z-10">
               <h2 className="text-3xl md:text-5xl font-bold font-display text-white mb-6">Ready to upgrade your digital presence?</h2>
               <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto">Schedule a free technical consultation with our engineering team to discuss your next project.</p>
               <Button variant="primary" className="h-[52px] px-8 bg-white text-ink-900 hover:bg-gray-100">
                 Book Consultation
               </Button>
             </div>
           </div>
        </Container>
      </Section>
    </main>
  );
}
