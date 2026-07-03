"use client";

import { ContactSplit } from "@/components/sections/ContactSplit";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { Container, Section } from "@/components/ui/Section";
import { motion } from "framer-motion";

import { getFAQs } from "@/services/api";
import { useState, useEffect } from "react";

export default function ContactPage() {
  const [faqs, setFaqs] = useState<any[]>([]);

  useEffect(() => {
    getFAQs().then(data => {
      if (data) setFaqs(data);
    });
  }, []);

  return (
    <main className="min-h-screen pt-20">
      <ContactSplit />
      
      {/* FAQ Section */}
      <Section className="py-24 border-t border-gray-100">
        <Container>
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold font-display text-ink-900 mb-4">Frequently Asked Questions</h2>
              <p className="text-lg text-ink-600">Everything you need to know before we start working together.</p>
            </motion.div>
            
            <FaqAccordion items={faqs} />
          </div>
        </Container>
      </Section>
    </main>
  );
}
