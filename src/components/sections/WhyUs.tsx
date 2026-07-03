"use client";

import { motion } from "framer-motion";
import { Container, Section } from "../ui/Section";

import { whyUsReasons as defaultReasons } from "@/lib/fallbackData";
import { getWhyUsReasons } from "@/services/api";
import { useState, useEffect } from "react";

export function WhyUs() {
  const [reasons, setReasons] = useState(defaultReasons);

  useEffect(() => {
    getWhyUsReasons().then(data => {
      if (data && data.length > 0) setReasons(data);
    });
  }, []);
  return (
    <Section background="alternate" className="relative overflow-hidden py-32 bg-slate-50" id="why-us">
      <Container className="relative z-10">
        
        {/* Bold Gradient Panel Header */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-brand-600 to-accent-violet p-12 md:p-16 mb-8 md:mb-10 max-w-4xl mx-auto text-center shadow-2xl">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative z-10 text-4xl md:text-5xl font-extrabold tracking-tighter text-white mb-4"
          >
            Why Partner With WebNest
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="relative z-10 text-lg md:text-xl text-brand-100 leading-relaxed max-w-2xl mx-auto"
          >
            We eliminate the technical friction between your vision and reality, delivering uncompromising quality at every step of the development lifecycle.
          </motion.p>
        </div>

        {/* Numbered Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
              whileHover={{ y: -5 }}
              className="relative bg-white border border-gray-100 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 group overflow-hidden"
            >
              <div className="absolute -top-6 -right-4 text-8xl font-black text-gray-50/50 group-hover:text-brand-50 transition-colors pointer-events-none select-none">
                {(i + 1).toString().padStart(2, '0')}
              </div>
              <div className="relative z-10">
                <h3 className="text-xl font-semibold text-ink-900 mb-3 tracking-tight">
                  {reason.title}
                </h3>
                <p className="text-ink-600 leading-relaxed text-sm">
                  {reason.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
