import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import { connectDB } from '../config/db';
import SiteSettings from '../models/SiteSettings';
import AboutPage from '../models/AboutPage';

async function migrate() {
  await connectDB();
  const settings = await SiteSettings.findOne();
  let aboutPage = await AboutPage.findOne();
  
  if (!aboutPage) {
    aboutPage = await AboutPage.create({});
  }

  // default arrays if none exist
  const defaultMissionVision = [
    { icon: 'Target', title: 'Our Mission', description: 'To empower businesses with premium, scalable, and high-performance digital infrastructure. We aim to elevate industry standards by delivering handcrafted solutions that refuse to compromise on design or code quality.', order: 0 },
    { icon: 'Eye', title: 'Our Vision', description: 'To be the global benchmark for digital product agencies. We envision a web where every interface is intuitive, every interaction is meaningful, and every backend system is robust and secure.', order: 1 }
  ];

  const defaultPhilosophyBullets = [
    { icon: 'Check', text: 'We prioritize performance and accessibility from day one.' },
    { icon: 'Check', text: 'We believe in transparent communication and rapid iteration.' },
    { icon: 'Check', text: 'We are technologists who understand business objectives.' }
  ];

  let coreValues = [];
  let timeline = [];

  if (settings && settings.get('aboutValues') && settings.get('aboutValues').length > 0) {
    coreValues = settings.get('aboutValues').map((v: any) => ({
      icon: v.icon || 'Target',
      title: v.title,
      description: v.desc || v.description || '',
      order: 0
    }));
  } else {
    coreValues = [
      { icon: 'Target', title: "Precision", description: "Every pixel, every line of code is crafted with intention. We don't believe in 'good enough'." },
      { icon: 'Heart', title: "Empathy", description: "We build for humans first. Understanding your users is the foundation of our engineering." },
      { icon: 'Code2', title: "Excellence", description: "We write clean, scalable, and performant code that stands the test of time." },
    ];
  }

  if (settings && settings.get('aboutTimeline') && settings.get('aboutTimeline').length > 0) {
    timeline = settings.get('aboutTimeline').map((t: any) => ({
      year: t.year,
      title: t.title,
      description: t.desc || t.description || '',
      order: 0
    }));
  } else {
    timeline = [
      { year: "2018", title: "The Beginning", description: "Founded by a trio of senior engineers frustrated by the agency status quo." },
      { year: "2020", title: "Going Global", description: "Expanded our team across 3 continents and delivered our 50th enterprise platform." },
      { year: "2023", title: "Award Winning", description: "Recognized for excellence in UI/UX and technical architecture on Awwwards." },
      { year: "2026", title: "Next Generation", description: "Pioneering AI-integrated web applications and immersive digital experiences." },
    ];
  }

  const heroDesc = settings?.aboutText || "WebNest was born out of a desire to bridge the gap between stunning aesthetic design and rigorous technical architecture. We don't just build websites; we engineer digital products that drive real business growth.";

  const sectionData = {
    hero: { badge: 'Our Story', heading: 'We are an engineering and design collective building the', highlight: 'future of the web.', description: heroDesc, hasDecorations: true },
    missionVision: defaultMissionVision,
    whyWeStarted: { title: 'Why We Started WebNest', description: 'We were tired of seeing businesses forced to choose between template-driven mediocrity or bloated, slow enterprise platforms. We built WebNest to provide a third option: handcrafted, high-performance digital experiences tailored specifically to the unique DNA of your brand.' },
    coreValues: coreValues,
    timeline: timeline,
    philosophy: { title: 'Our Philosophy & Culture', description: 'We foster a culture of deep work and continuous learning. Our team operates asynchronously across timezones, united by a shared passion for technical excellence and modern design aesthetics.', bullets: defaultPhilosophyBullets, featureCard: { title: 'Remote First. Globally Connected.', description: 'Operating across 3 continents, united by code.' } },
    cta: { heading: 'Ready to build something extraordinary?', description: 'Join the growing list of visionary companies that trust WebNest with their digital infrastructure.', buttonText: 'Start Your Project', buttonLink: '/contact' },
    seo: { title: 'About Us | WebNest', description: 'Learn more about WebNest.', keywords: '', canonicalUrl: '', ogTitle: '', ogDescription: '', ogImage: '' }
  };

  aboutPage.draft = sectionData;
  aboutPage.published = sectionData;
  aboutPage.lastPublishedAt = new Date();

  await aboutPage.save();
  console.log("Migration complete!");
  process.exit(0);
}

migrate().catch(console.error);
