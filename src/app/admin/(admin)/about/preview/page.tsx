"use client";

import { motion } from "framer-motion";
import { Container, Section } from "@/components/ui/Section";
import { TeamSection } from "@/components/sections/TeamSection";
import { TechStack } from "@/components/sections/TechStack";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Target, Eye, Heart, Code2, Users, Rocket, Check, AlertCircle } from "lucide-react";
import Image from "next/image";

import { useState, useEffect } from "react";
import { useAuth } from "@/components/admin/AuthProvider";
import { getAboutPageDraft } from "@/services/api";

const iconMap = { Target, Heart, Code2, Users, Rocket, Eye, Check };
const getIcon = (iconName?: string) => {
  if (!iconName) return Target;
  return (iconMap as any)[iconName] || Target;
};

export default function AboutPreviewPage() {
  const { token } = useAuth();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      getAboutPageDraft(token).then((res) => {
        if (res) setData(res);
        setLoading(false);
      });
    }
  }, [token]);

  if (loading) return <div className="min-h-screen bg-white" />;
  if (!data) return <div className="min-h-screen bg-white flex items-center justify-center">Draft Content Not Found.</div>;

  return (
    <div className="relative">
      <div className="fixed top-0 left-0 right-0 bg-yellow-500 text-yellow-950 px-4 py-2 text-sm font-medium flex items-center justify-center gap-2 z-50">
        <AlertCircle className="w-4 h-4" />
        You are viewing the About Page Draft Preview
      </div>
      
      <main className="min-h-screen pt-32 pb-20 overflow-hidden bg-white mt-8">
        
        {/* 1. Hero Section */}
        <Section className="pb-20 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-[#F8FBFF] to-transparent blur-3xl -z-10 animate-pulse duration-[10000ms]" />
          <Container>
            <div className="max-w-4xl mx-auto text-center">
              {data.hero?.badge && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex items-center rounded-full bg-blue-50/80 px-3 py-1 text-xs font-semibold text-brand-600 ring-1 ring-inset ring-brand-600/10 mb-8 uppercase tracking-wider"
                >
                  {data.hero.badge}
                </motion.div>
              )}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-ink-900 mb-8 font-display"
              >
                {data.hero?.heading} <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-600 to-[#6D5EF5]">{data.hero?.highlight}</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg md:text-xl text-ink-600 max-w-2xl mx-auto leading-relaxed"
              >
                {data.hero?.description}
              </motion.p>
            </div>
          </Container>
        </Section>

        {/* 2. Mission & Vision */}
        {data.missionVision && data.missionVision.length > 0 && (
          <Section background="alternate" className="py-24">
            <Container>
              <div className={`grid grid-cols-1 md:grid-cols-${Math.min(data.missionVision.length, 2)} gap-12 lg:gap-24`}>
                {data.missionVision.map((mv: any, idx: number) => {
                  const IconComponent = getIcon(mv.icon);
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100"
                    >
                      <div className={`w-12 h-12 ${idx % 2 === 0 ? 'bg-brand-50 text-brand-600' : 'bg-violet-50 text-violet-600'} rounded-xl flex items-center justify-center mb-6`}>
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <h2 className="text-3xl font-bold font-display text-ink-900 mb-4">{mv.title}</h2>
                      <p className="text-ink-600 leading-relaxed text-lg">
                        {mv.description}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </Container>
          </Section>
        )}

        {/* 3. Why We Started */}
        {data.whyWeStarted?.title && (
          <Section className="py-24">
            <Container>
              <div className="max-w-3xl mx-auto text-center mb-16">
                <h2 className="text-4xl font-bold font-display text-ink-900 mb-6">{data.whyWeStarted.title}</h2>
                <p className="text-xl text-ink-600 leading-relaxed whitespace-pre-wrap">
                  {data.whyWeStarted.description}
                </p>
              </div>
            </Container>
          </Section>
        )}

        {/* 4. Our Values */}
        {data.coreValues && data.coreValues.length > 0 && (
          <Section background="alternate" className="py-24">
            <Container>
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold font-display text-ink-900 mb-4">Core Values</h2>
                <p className="text-lg text-ink-600">The principles that guide our every decision.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {data.coreValues.map((val: any, idx: number) => {
                  const IconComponent = getIcon(val.icon);
                  return (
                    <motion.div
                      key={idx}
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
                      <p className="text-ink-600 leading-relaxed">{val.description}</p>
                    </motion.div>
                  );
                })}
              </div>
            </Container>
          </Section>
        )}

        {/* 5. Technologies */}
        <TechStack />

        {/* 6. Company Timeline */}
        {data.timeline && data.timeline.length > 0 && (
          <Section className="py-24 overflow-hidden relative">
            <Container>
              <div className="max-w-2xl mb-16">
                <h2 className="text-4xl font-bold font-display text-ink-900 mb-4">Our Journey</h2>
                <p className="text-lg text-ink-600">From a small studio to a global agency.</p>
              </div>
              
              <div className="relative">
                <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gray-200 -translate-x-1/2" />
                
                <div className="space-y-16">
                  {data.timeline.map((item: any, idx: number) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      className={`relative flex flex-col md:flex-row items-center justify-between ${idx % 2 === 0 ? "md:flex-row-reverse" : ""}`}
                    >
                      <div className="hidden md:block w-5/12" />
                      <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-brand-600 rounded-full border-4 border-white shadow-sm -translate-x-1/2 z-10" />
                      
                      <div className={`w-full md:w-5/12 pl-12 md:pl-0 ${idx % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"}`}>
                        <span className="inline-block px-3 py-1 bg-brand-50 text-brand-600 font-bold rounded-lg mb-3">
                          {item.year}
                        </span>
                        <h3 className="text-2xl font-bold text-ink-900 mb-2">{item.title}</h3>
                        <p className="text-ink-600">{item.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Container>
          </Section>
        )}

        {/* 7. Meet Our Team */}
        <TeamSection />

        {/* 8. Work Culture & Philosophy */}
        {data.philosophy?.title && (
          <Section className="py-24">
            <Container>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-4xl font-bold font-display text-ink-900 mb-6">{data.philosophy.title}</h2>
                  <p className="text-lg text-ink-600 mb-6 leading-relaxed">
                    {data.philosophy.description}
                  </p>
                  <ul className="space-y-4">
                    {data.philosophy.bullets?.map((item: any, i: number) => (
                      <li key={i} className="flex items-start gap-3 text-ink-700">
                        <div className="mt-1 w-5 h-5 rounded-full bg-brand-50 flex items-center justify-center shrink-0">
                          <div className="w-1.5 h-1.5 bg-brand-600 rounded-full" />
                        </div>
                        {item.text}
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
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-50 to-violet-50 flex flex-col items-center justify-center p-12 text-center">
                     <Users className="w-16 h-16 text-brand-400 mb-6" />
                     <h3 className="text-2xl font-bold text-ink-900 mb-2">{data.philosophy.featureCard?.title}</h3>
                     <p className="text-ink-500">{data.philosophy.featureCard?.description}</p>
                  </div>
                </motion.div>
              </div>
            </Container>
          </Section>
        )}

        {/* 9. Call to Action */}
        {data.cta?.heading && (
          <Section background="alternate" className="py-24 overflow-hidden relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-brand-100/40 to-violet-100/40 blur-3xl rounded-full -z-10" />
            <Container>
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-4xl md:text-5xl font-bold font-display text-ink-900 mb-6">{data.cta.heading}</h2>
                <p className="text-xl text-ink-600 mb-10">{data.cta.description}</p>
                <Button variant="default" size="lg" className="h-[52px] px-8 text-[15px] shadow-sm hover:shadow-md group">
                  {data.cta.buttonText}
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </Container>
          </Section>
        )}

      </main>
    </div>
  );
}
