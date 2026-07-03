

import { Preloader } from "@/components/sections/Preloader";
import { HeroSection } from "@/components/sections/HeroSection";
import { StatsStrip } from "@/components/sections/StatsStrip";
import { ServicesBento } from "@/components/sections/ServicesBento";
import { ShowcaseSection } from "@/components/sections/ShowcaseSection";
import { WhyUs } from "@/components/sections/WhyUs";
import { TestimonialsCarousel } from "@/components/sections/TestimonialsCarousel";
import { Container, Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { getStats, getServices, getProjects, getTestimonials, getHeroes } from "@/services/api";

export default async function Home() {
  const [stats, services, projects, testimonials, heroes] = await Promise.all([
    getStats(),
    getServices(),
    getProjects(),
    getTestimonials(),
    getHeroes()
  ]);

  const heroData = heroes && heroes.length > 0 ? heroes[0] : null;

  return (
    <>
      <Preloader />
      
      <main className="flex flex-col">
        {/* 1. Hero */}
        <HeroSection />
        
        {/* 2. Stats */}
        <StatsStrip />
        
        {/* 3. Services Summary */}
        <ServicesBento />
        <Section className="pb-14 pt-0 bg-surface-0 flex justify-center">
           <Link href="/services">
             <Button variant="ghost" className="font-semibold text-brand-600 hover:bg-brand-50 group">
               View All Services <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
             </Button>
           </Link>
        </Section>
        
        {/* 4. Portfolio Summary */}
        <ShowcaseSection />
        <Section className="pb-14 pt-0 bg-surface-0 flex justify-center">
           <Link href="/portfolio">
             <Button variant="ghost" className="font-semibold text-brand-600 hover:bg-brand-50 group">
               View Full Portfolio <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
             </Button>
           </Link>
        </Section>

        {/* 5. Why Choose Us (About Teaser) */}
        <WhyUs />
        <Section background="alternate" className="pb-14 pt-0 flex justify-center">
           <Link href="/about">
             <Button variant="ghost" className="font-semibold text-brand-600 hover:bg-brand-50 group">
               Read Our Story <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
             </Button>
           </Link>
        </Section>
        
        {/* 6. Social Proof */}
        <TestimonialsCarousel />
        
        {/* 7. Final Global CTA */}
        <Section className="py-16">
          <Container>
            <div className="bg-ink-900 rounded-3xl p-12 text-center relative overflow-hidden">
               <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-brand-600/20 via-ink-900 to-ink-900 pointer-events-none" />
               <h2 className="text-3xl md:text-5xl font-bold font-display text-white mb-6 relative z-10">Ready to build something extraordinary?</h2>
               <Link href="/contact" className="relative z-10">
                 <Button variant="primary" className="h-[52px] px-8 bg-white text-ink-900 hover:bg-gray-100">
                   Start Your Project
                 </Button>
               </Link>
            </div>
          </Container>
        </Section>

      </main>
    </>
  );
}
