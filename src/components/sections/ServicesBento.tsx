"use client";

import { motion } from "framer-motion";
import { ArrowRight, Code2, LayoutDashboard, MonitorSmartphone, Paintbrush, Search, Server, ShieldCheck, ShoppingCart } from "lucide-react";
import { Container, Section } from "../ui/Section";
import { Card } from "../ui/Card";
import { useState, useEffect } from "react";
import { services as defaultServices } from "@/lib/fallbackData";
import { getServices } from "@/services/api";

const iconMap: Record<string, any> = { Code2, LayoutDashboard, MonitorSmartphone, Paintbrush, Search, Server, ShieldCheck, ShoppingCart };

export function ServicesBento() {
  const [services, setServices] = useState(defaultServices);

  useEffect(() => {
    getServices().then(data => {
      if (data && data.length > 0) setServices(data);
    });
  }, []);

  return (
    <Section background="alternate" id="services">
      <Container>
        <div className="mb-8 md:mb-10 max-w-3xl">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold tracking-tight text-ink-900 mb-4"
          >
            Engineering <span className="text-gradient">Capabilities</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-ink-600 leading-relaxed"
          >
            We don't just build websites; we engineer digital products that solve complex business problems. Our comprehensive suite of services covers the entire software lifecycle.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 items-start">
          {services.map((service: any, index) => {
            const className = service.className || "lg:col-span-1 bg-white border-gray-100";
            const isBrandBg = className.includes('bg-brand');
            const iconClass = service.iconClass || (isBrandBg ? 'text-brand-200' : 'text-brand-600');
            const textClass = service.textClass || (isBrandBg ? 'text-brand-100' : 'text-ink-600');
            const buttonClass = service.buttonClass || (isBrandBg ? 'text-white hover:text-brand-200' : 'text-brand-600 hover:text-brand-700');

            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                className={className}
              >
                <div 
                  className={`group relative p-6 md:p-7 rounded-[20px] flex flex-col cursor-pointer border shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_30px_-10px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 ${isBrandBg ? className + ' shadow-[0_4px_20px_-4px_rgba(37,99,235,0.2)] hover:shadow-[0_12px_30px_-10px_rgba(37,99,235,0.3)]' : className}`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-5 ${isBrandBg ? 'bg-white/10' : 'bg-surface-1'} group-hover:scale-110 transition-transform duration-300 shrink-0`}>
                    {(() => {
                      const Icon = iconMap[service.icon as string] || Code2;
                      return <Icon className={`w-5 h-5 ${iconClass}`} />;
                    })()}
                  </div>
                  <h3 className={`text-xl font-semibold mb-2 ${isBrandBg ? 'text-white' : 'text-ink-900'} tracking-tight`}>
                    {service.title}
                  </h3>
                  <p className={`${textClass} text-sm leading-relaxed line-clamp-2`}>
                    {service.description}
                  </p>
                  <div className={`mt-5 inline-flex items-center gap-1.5 text-sm font-semibold ${buttonClass} opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300`}>
                    Learn more <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
