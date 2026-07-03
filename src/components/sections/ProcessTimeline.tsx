"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container, Section } from "../ui/Section";
import { Search, PenTool, Layout, Code2, TestTube, Rocket, Headphones, Zap, MessageSquare, Terminal, Heart, Lightbulb } from "lucide-react";
import { useState, useEffect } from "react";
import { processSteps as defaultSteps } from "@/lib/fallbackData";
import { getProcessSteps } from "@/services/api";

const iconMap: Record<string, any> = { Search, PenTool, Layout, Code2, TestTube, Rocket, Headphones, Zap, MessageSquare, Terminal, Heart, Lightbulb };

gsap.registerPlugin(ScrollTrigger);

export function ProcessTimeline() {
  const [steps, setSteps] = useState(defaultSteps);

  useEffect(() => {
    getProcessSteps().then(data => {
      if (data && data.length > 0) setSteps(data);
    });
  }, []);

  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 40%",
        end: "bottom 80%",
        scrub: 1,
      }
    });

    timeline.to(progressRef.current, {
      height: "100%",
      ease: "none"
    });

    const stepElements = gsap.utils.toArray<HTMLElement>('.process-step');
    stepElements.forEach((step, i) => {
      ScrollTrigger.create({
        trigger: step,
        start: "top 60%",
        onEnter: () => {
          gsap.to(step.querySelector('.step-icon'), { 
            backgroundColor: "#2563EB", 
            color: "#FFFFFF", 
            scale: 1.1,
            duration: 0.3 
          });
          gsap.to(step.querySelector('.step-content'), {
            opacity: 1,
            x: 0,
            duration: 0.5,
            ease: "back.out(1.7)"
          });
        },
        onLeaveBack: () => {
          gsap.to(step.querySelector('.step-icon'), { 
            backgroundColor: "#F8FAFC", 
            color: "#475569", 
            scale: 1,
            duration: 0.3 
          });
          gsap.to(step.querySelector('.step-content'), {
            opacity: 0.4,
            duration: 0.3
          });
        }
      });
    });

  }, { scope: containerRef });

  return (
    <Section id="process" className="bg-surface-0">
      <Container>
        <div className="text-center mb-8 md:mb-10 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-ink-900 mb-4">
            Our Engineering <span className="text-gradient">Process</span>
          </h2>
          <p className="text-lg md:text-xl text-ink-600 leading-relaxed">
            A battle-tested methodology designed to mitigate risk and guarantee exceptional outcomes.
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative pl-4 md:pl-0" ref={containerRef}>
          {/* Vertical Line */}
          <div 
            ref={lineRef} 
            className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gray-100 -translate-x-1/2 rounded-full"
          >
            <div 
              ref={progressRef}
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-brand-600 to-accent-violet rounded-full shadow-[0_0_15px_rgba(37,99,235,0.5)]"
              style={{ height: "0%" }}
            />
          </div>

          <div className="space-y-12 md:space-y-24 relative py-10">
            {steps.map((step: any, index) => {
              const displayId = (index + 1).toString().padStart(2, '0');
              return (
                <div 
                  key={step.title} 
                  className={`process-step relative flex flex-col md:flex-row items-start md:items-center justify-between group ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                >
                  {/* Mobile icon position (left) / Desktop absolute center */}
                  <div className="absolute left-8 md:left-1/2 -translate-x-1/2 flex items-center justify-center z-10">
                    <div className="step-icon w-12 h-12 rounded-full bg-surface-1 border-4 border-white shadow-sm flex items-center justify-center text-ink-600 transition-colors">
                      {(() => {
                        const Icon = iconMap[step.icon as string] || Zap;
                        return <Icon className="w-5 h-5" />;
                      })()}
                    </div>
                  </div>

                  <div className={`step-content w-full md:w-5/12 pl-20 md:pl-0 ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'} opacity-40 translate-x-4 md:translate-x-0`}>
                    <div className={`text-6xl font-bold text-gray-100 mb-[-20px] font-display select-none ${index % 2 === 0 ? 'md:-ml-4' : 'md:-mr-4'}`}>
                      {displayId}
                    </div>
                    <div className="relative z-10 bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-100 shadow-xl">
                      <h3 className="text-2xl font-bold text-ink-900 mb-3 font-display">{step.title}</h3>
                      <p className="text-ink-600 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                  
                  <div className="hidden md:block w-5/12" />
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </Section>
  );
}
