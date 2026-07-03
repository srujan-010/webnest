"use client";

import { motion } from "framer-motion";
import { Container, Section } from "@/components/ui/Section";
import { TeamSection } from "@/components/sections/TeamSection";
import { TechStack } from "@/components/sections/TechStack";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Target, Eye, Heart, Code2, Users, Rocket } from "lucide-react";
import Image from "next/image";

import { useState, useEffect } from "react";
import { getSiteSettings } from "@/services/api";

const defaultValues = [
  { icon: Target, title: "Precision", desc: "Every pixel, every line of code is crafted with intention. We don't believe in 'good enough'." },
  { icon: Heart, title: "Empathy", desc: "We build for humans first. Understanding your users is the foundation of our engineering." },
  { icon: Code2, title: "Excellence", desc: "We write clean, scalable, and performant code that stands the test of time." },
];

const defaultTimeline = [
  { year: "2018", title: "The Beginning", desc: "Founded by a trio of senior engineers frustrated by the agency status quo." },
  { year: "2020", title: "Going Global", desc: "Expanded our team across 3 continents and delivered our 50th enterprise platform." },
  { year: "2023", title: "Award Winning", desc: "Recognized for excellence in UI/UX and technical architecture on Awwwards." },
  { year: "2026", title: "Next Generation", desc: "Pioneering AI-integrated web applications and immersive digital experiences." },
];

const iconMap = { Target, Heart, Code2, Users, Rocket, Eye };
const getIcon = (iconName?: string) => {
  if (!iconName) return Target;
  return (iconMap as any)[iconName] || Target;
};

export default function AboutPage() {
  const [values, setValues] = useState<any[]>(defaultValues);
  const [timeline, setTimeline] = useState<any[]>(defaultTimeline);
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    getSiteSettings().then((data) => {
      if (data) {
        setSettings(data);
        if (data.aboutValues && data.aboutValues.length > 0) {
          setValues(data.aboutValues);
        }
        if (data.aboutTimeline && data.aboutTimeline.length > 0) {
          setTimeline(data.aboutTimeline);
        }
      }
    });
  }, []);

  return (
    <main className="min-h-screen pt-32 pb-20 overflow-hidden bg-white">
      
      {/* 1. Hero Section */}
      <Section className="pb-20 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-[#F8FBFF] to-transparent blur-3xl -z-10 animate-pulse duration-[10000ms]" />
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center rounded-full bg-blue-50/80 px-3 py-1 text-xs font-semibold text-brand-600 ring-1 ring-inset ring-brand-600/10 mb-8 uppercase tracking-wider"
            >
              Our Story
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-ink-900 mb-8 font-display"
            >
              We are an engineering and design collective building the <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-600 to-[#6D5EF5]">future of the web.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-ink-600 max-w-2xl mx-auto leading-relaxed"
            >
              {settings?.aboutText || "WebNest was born out of a desire to bridge the gap between stunning aesthetic design and rigorous technical architecture. We don't just build websites; we engineer digital products that drive real business growth."}
            </motion.p>
          </div>
        </Container>
      </Section>

      {/* 2. Mission & Vision */}
      <Section background="alternate" className="py-24">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100"
            >
              <div className="w-12 h-12 bg-brand-50 rounded-xl flex items-center justify-center text-brand-600 mb-6">
                <Target className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-bold font-display text-ink-900 mb-4">Our Mission</h2>
              <p className="text-ink-600 leading-relaxed text-lg">
                To empower businesses with premium, scalable, and high-performance digital infrastructure. We aim to elevate industry standards by delivering handcrafted solutions that refuse to compromise on design or code quality.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100"
            >
              <div className="w-12 h-12 bg-violet-50 rounded-xl flex items-center justify-center text-violet-600 mb-6">
                <Eye className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-bold font-display text-ink-900 mb-4">Our Vision</h2>
              <p className="text-ink-600 leading-relaxed text-lg">
                To be the global benchmark for digital product agencies. We envision a web where every interface is intuitive, every interaction is meaningful, and every backend system is robust and secure.
              </p>
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* 3. Why We Started */}
      <Section className="py-24">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold font-display text-ink-900 mb-6">Why We Started WebNest</h2>
            <p className="text-xl text-ink-600 leading-relaxed">
              We were tired of seeing businesses forced to choose between template-driven mediocrity or bloated, slow enterprise platforms. We built WebNest to provide a third option: handcrafted, high-performance digital experiences tailored specifically to the unique DNA of your brand.
            </p>
          </div>
        </Container>
      </Section>

      {/* 4. Our Values */}
      <Section background="alternate" className="py-24">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-display text-ink-900 mb-4">Core Values</h2>
            <p className="text-lg text-ink-600">The principles that guide our every decision.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((val, idx) => {
              const IconComponent = typeof val.icon === 'string' ? getIcon(val.icon) : (val.icon || Target);
              return (
                <motion.div
                  key={val.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm"
                >
                  <div className="w-10 h-10 bg-brand-50 rounded-lg flex items-center justify-center text-brand-600 mb-6">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold text-ink-900 mb-3">{val.title}</h3>
                  <p className="text-ink-600 leading-relaxed">{val.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* 5. Technologies */}
      <TechStack />

      {/* 6. Company Timeline */}
      <Section className="py-24 overflow-hidden relative">
        <Container>
          <div className="max-w-2xl mb-16">
            <h2 className="text-4xl font-bold font-display text-ink-900 mb-4">Our Journey</h2>
            <p className="text-lg text-ink-600">From a small studio to a global agency.</p>
          </div>
          
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gray-200 -translate-x-1/2" />
            
            <div className="space-y-16">
              {timeline.map((item, idx) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className={`relative flex flex-col md:flex-row items-center justify-between ${idx % 2 === 0 ? "md:flex-row-reverse" : ""}`}
                >
                  <div className="hidden md:block w-5/12" />
                  
                  {/* Timeline Dot */}
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-brand-600 rounded-full border-4 border-white shadow-sm -translate-x-1/2 z-10" />
                  
                  {/* Content Box */}
                  <div className={`w-full md:w-5/12 pl-12 md:pl-0 ${idx % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"}`}>
                    <span className="inline-block px-3 py-1 bg-brand-50 text-brand-600 font-bold rounded-lg mb-3">
                      {item.year}
                    </span>
                    <h3 className="text-2xl font-bold text-ink-900 mb-2">{item.title}</h3>
                    <p className="text-ink-600">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* 7. Meet Our Team */}
      <TeamSection />

      {/* 8. Work Culture & Philosophy */}
      <Section className="py-24">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold font-display text-ink-900 mb-6">Our Philosophy & Culture</h2>
              <p className="text-lg text-ink-600 mb-6 leading-relaxed">
                We foster a culture of deep work and continuous learning. Our team operates asynchronously across timezones, united by a shared passion for technical excellence and modern design aesthetics.
              </p>
              <ul className="space-y-4">
                {[
                  "We prioritize performance and accessibility from day one.",
                  "We believe in transparent communication and rapid iteration.",
                  "We are technologists who understand business objectives."
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-ink-700">
                    <div className="mt-1 w-5 h-5 rounded-full bg-brand-50 flex items-center justify-center shrink-0">
                      <div className="w-1.5 h-1.5 bg-brand-600 rounded-full" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden bg-gray-100 shadow-xl border border-gray-200/50"
            >
              {/* Minimalist abstract representation of culture/teamwork since we don't have stock photos */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-50 to-violet-50 flex flex-col items-center justify-center p-12 text-center">
                 <Users className="w-16 h-16 text-brand-400 mb-6" />
                 <h3 className="text-2xl font-bold text-ink-900 mb-2">Remote First. Globally Connected.</h3>
                 <p className="text-ink-500">Operating across 3 continents, united by code.</p>
              </div>
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* 9. Call to Action */}
      <Section background="alternate" className="py-24 overflow-hidden relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-brand-100/40 to-violet-100/40 blur-3xl rounded-full -z-10" />
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold font-display text-ink-900 mb-6">Ready to build something extraordinary?</h2>
            <p className="text-xl text-ink-600 mb-10">Join the growing list of visionary companies that trust WebNest with their digital infrastructure.</p>
            <Button variant="default" size="lg" className="h-[52px] px-8 text-[15px] shadow-sm hover:shadow-md group">
              Start Your Project
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </Container>
      </Section>

    </main>
  );
}
