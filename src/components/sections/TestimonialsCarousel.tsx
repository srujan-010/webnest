"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { Container, Section } from "../ui/Section";
import { Card } from "../ui/Card";
import { testimonials as defaultTestimonials } from "@/lib/fallbackData";
import { getTestimonials } from "@/services/api";

export function TestimonialsCarousel() {
  const [testimonials, setTestimonials] = useState<any[]>(defaultTestimonials);

  useEffect(() => {
    getTestimonials().then(data => {
      if (data && data.length > 0) setTestimonials(data);
    });
  }, []);

  const [width, setWidth] = useState(0);
  const carousel = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);

  useEffect(() => {
    if (carousel.current) {
      setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
    }
  }, []);

  useEffect(() => {
    if (width === 0) return;
    const intervalId = setInterval(() => {
      let nextX = x.get() - (carousel.current?.offsetWidth || 500) * 0.8;
      if (nextX < -width) nextX = 0;
      animate(x, nextX, { type: "spring", stiffness: 300, damping: 30 });
    }, 5000);
    return () => clearInterval(intervalId);
  }, [width, x]);

  return (
    <Section className="bg-surface-0 py-24 md:py-32 overflow-hidden">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-10 gap-6">
          <div className="max-w-2xl">
             <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-ink-900 mb-4 font-display">
               Don't just take <span className="text-brand-600">our word for it.</span>
             </h2>
             <p className="text-lg text-ink-600">
               Hear from the industry leaders who trust us to build their mission-critical software.
             </p>
          </div>
        </div>
      </Container>

      <div className="pl-4 sm:pl-6 lg:pl-8 mx-auto w-full max-w-7xl">
        <motion.div 
          ref={carousel} 
          className="cursor-grab active:cursor-grabbing overflow-hidden"
          whileTap={{ cursor: "grabbing" }}
        >
          <motion.div 
            drag="x" 
            dragConstraints={{ right: 0, left: -width }}
            style={{ x }}
            className="flex gap-6 pr-4 sm:pr-8"
          >
            {testimonials.map((testimonial: any, i) => (
              <motion.div 
                key={testimonial._id || testimonial.id || i} 
                className="min-w-[320px] md:min-w-[400px] lg:min-w-[500px]"
              >
                <Card className="h-full p-8 md:p-10 flex flex-col justify-between hover:shadow-xl transition-shadow bg-surface-1/50 border-gray-200/60">
                  <div>
                    <div className="flex gap-1 mb-6">
                      {[...Array(testimonial.stars || testimonial.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-brand-600 text-brand-600" />
                      ))}
                    </div>
                    <Quote className="w-10 h-10 text-brand-600/20 mb-4" />
                    <p className="text-lg md:text-xl text-ink-900 font-medium leading-relaxed mb-8">
                      "{testimonial.quote}"
                    </p>
                  </div>
                  <div className="flex items-center gap-4 mt-auto">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-400 to-accent-violet flex items-center justify-center text-white font-bold">
                      {(testimonial.name || testimonial.author || '?').charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-ink-900">{testimonial.name || testimonial.author}</h4>
                      <p className="text-sm text-ink-600">{testimonial.role}{testimonial.company ? ` · ${testimonial.company}` : ''}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
        
        <div className="mt-8 flex items-center justify-center gap-4 md:hidden">
          <p className="text-sm text-ink-400 font-medium">Swipe to read more</p>
        </div>
      </div>
    </Section>
  );
}
