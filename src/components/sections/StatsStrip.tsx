"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "../ui/Section";
import { Card } from "../ui/Card";
import { useState, useEffect } from "react";
import { stats as defaultStats } from "@/lib/fallbackData";
import { getStats, getSiteSettings } from "@/services/api";

gsap.registerPlugin(ScrollTrigger);

export function StatsStrip() {
  const [stats, setStats] = useState(defaultStats);

  useEffect(() => {
    getSiteSettings().then(settings => {
      if (settings && settings.statsCounters && settings.statsCounters.length > 0) {
        setStats(settings.statsCounters);
      } else {
        getStats().then(data => {
          if (data && data.length > 0) setStats(data);
        });
      }
    });
  }, []);

  const containerRef = useRef<HTMLDivElement>(null);
  
  useGSAP(() => {
    const numbers = gsap.utils.toArray<HTMLElement>('.stat-number');
    
    numbers.forEach((num) => {
      const target = parseFloat(num.getAttribute('data-target') || "0");
      
      gsap.to(num, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          once: true,
        },
        innerHTML: target,
        duration: 2.5,
        ease: "power3.out",
        snap: { innerHTML: 1 },
        onUpdate: function() {
          num.innerHTML = Math.round(parseFloat(this.targets()[0].innerHTML)).toString();
        }
      });
    });
    
    gsap.fromTo('.stat-item', 
      { y: 30, opacity: 0 },
      {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          once: true,
        },
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out"
      }
    );
  }, { scope: containerRef, dependencies: [stats] });

  return (
    <div className="relative z-20" ref={containerRef}>
      <Container>
        <Card variant="glass" padding="md" className="mx-auto max-w-5xl shadow-[0_30px_60px_-15px_rgba(15,23,42,0.1)] border-white/40">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-gray-200/50">
            {stats.map((stat, i) => (
              <div key={i} className="stat-item flex flex-col items-center justify-center text-center pt-6 md:pt-0 first:pt-0">
                <div className="flex items-baseline gap-1">
                  <span 
                    className="stat-number font-display text-4xl lg:text-5xl font-bold text-ink-900 tracking-tight"
                    data-target={stat.value}
                  >
                    0
                  </span>
                  <span className="font-display text-3xl lg:text-4xl font-bold text-brand-600">
                    {stat.suffix}
                  </span>
                </div>
                <span className="text-sm font-medium text-ink-600 mt-2">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </Container>
    </div>
  );
}
