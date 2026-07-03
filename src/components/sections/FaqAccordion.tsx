"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { Container, Section } from "../ui/Section";
import { useEffect } from "react";
import { faqs as defaultFaqs } from "@/lib/fallbackData";
import { getFAQs } from "@/services/api";

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  items?: FaqItem[];
}

export function FaqAccordion({ items: initialItems }: FaqAccordionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const [items, setItems] = useState<FaqItem[]>(initialItems || defaultFaqs);

  useEffect(() => {
    if (!initialItems) {
      getFAQs().then(data => {
        if (data && data.length > 0) setItems(data);
      });
    }
  }, [initialItems]);

  return (
    <Section background="alternate" className="py-24 md:py-32">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          <div className="lg:col-span-5">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold tracking-tight text-ink-900 mb-4 font-display"
            >
              Frequently asked <br />
              <span className="text-brand-600">questions.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-ink-600 mb-8"
            >
              Everything you need to know about our process, pricing, and capabilities. Can't find the answer you're looking for? Reach out to our team.
            </motion.p>
          </div>

          <div className="lg:col-span-7">
            <div className="space-y-4">
              {items.map((faq, index) => {
                const isActive = activeIndex === index;
                return (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    key={index}
                    className={`border rounded-2xl overflow-hidden transition-colors duration-300 ${isActive ? 'bg-white border-brand-200 shadow-sm' : 'bg-transparent border-gray-200 hover:border-brand-200'}`}
                  >
                    <button
                      suppressHydrationWarning
                      onClick={() => setActiveIndex(isActive ? null : index)}
                      className="flex items-center justify-between w-full p-6 text-left"
                    >
                      <span className={`text-lg font-bold font-display ${isActive ? 'text-brand-600' : 'text-ink-900'}`}>
                        {faq.question}
                      </span>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isActive ? 'bg-brand-50 text-brand-600' : 'bg-surface-1 text-ink-400'}`}>
                        {isActive ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                      </div>
                    </button>
                    
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                          <div className="px-6 pb-6 text-ink-600 leading-relaxed">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
