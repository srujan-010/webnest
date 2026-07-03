// @ts-nocheck
import mongoose from 'mongoose';
import { connectDB } from '../config/db';
import Project from '../models/Project';
import Service from '../models/Service';
import ProcessStep from '../models/ProcessStep';
import TechStackItem from '../models/TechStackItem';
import Testimonial from '../models/Testimonial';
import TeamMember from '../models/TeamMember';
import Stat from '../models/Stat';
import Navigation from '../models/Navigation';
import FooterContent from '../models/FooterContent';
import Faq from '../models/Faq';
import WhyUsReason from '../models/WhyUsReason';
import SiteSettings from '../models/SiteSettings';
import NewsletterSubscriber from '../models/NewsletterSubscriber';

import {
  projects,
  services,
  processSteps,
  techStack,
  testimonials,
  team,
  stats,
  navLinks,
  navServices,
  footerContent,
  faqs,
  whyUsReasons,
} from './fallbackData';

async function seedContent() {
  await connectDB();
  console.log('Starting content migration...');

  try {
    // Clear collections first to avoid duplicates or leftovers from schema mismatches
    await Promise.all([
      Project.deleteMany({}),
      Service.deleteMany({}),
      ProcessStep.deleteMany({}),
      TechStackItem.deleteMany({}),
      Testimonial.deleteMany({}),
      TeamMember.deleteMany({}),
      Stat.deleteMany({}),
      Navigation.deleteMany({}),
      FooterContent.deleteMany({}),
      Faq.deleteMany({}),
      WhyUsReason.deleteMany({}),
      SiteSettings.deleteMany({}),
      NewsletterSubscriber.deleteMany({}),
    ]);
    console.log('🧹 Cleared all collections successfully');

    // 1. Projects
    for (let i = 0; i < projects.length; i++) {
      const p = projects[i];
      const slug = p.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      await Project.findOneAndUpdate(
        { slug },
        { ...p, slug, order: i, status: 'published' },
        { upsert: true, new: true }
      );
    }
    console.log(`✅ Seeded ${projects.length} Projects`);

    // 2. Services
    for (let i = 0; i < services.length; i++) {
      const s = services[i];
      await Service.findOneAndUpdate(
        { title: s.title },
        { ...s, order: i },
        { upsert: true, new: true }
      );
    }
    console.log(`✅ Seeded ${services.length} Services`);

    // 3. Process Steps
    for (let i = 0; i < processSteps.length; i++) {
      const ps = processSteps[i];
      await ProcessStep.findOneAndUpdate(
        { title: ps.title },
        { ...ps, order: i },
        { upsert: true, new: true }
      );
    }
    console.log(`✅ Seeded ${processSteps.length} Process Steps`);

    // 4. Tech Stack Items
    for (let i = 0; i < techStack.length; i++) {
      const ts = techStack[i];
      await TechStackItem.findOneAndUpdate(
        { name: ts.name },
        { ...ts, order: i },
        { upsert: true, new: true }
      );
    }
    console.log(`✅ Seeded ${techStack.length} Tech Stack Items`);

    // 5. Testimonials
    for (let i = 0; i < testimonials.length; i++) {
      const t = testimonials[i];
      await Testimonial.findOneAndUpdate(
        { name: t.author, company: t.role || 'Unknown' },
        { ...t, name: t.author, stars: t.rating, order: i },
        { upsert: true, new: true }
      );
    }
    console.log(`✅ Seeded ${testimonials.length} Testimonials`);

    // 6. Team Members
    for (let i = 0; i < team.length; i++) {
      const t = team[i];
      await TeamMember.findOneAndUpdate(
        { name: t.name },
        { ...t, order: i },
        { upsert: true, new: true }
      );
    }
    console.log(`✅ Seeded ${team.length} Team Members`);

    // 7. Stats
    for (let i = 0; i < stats.length; i++) {
      const s = stats[i];
      await Stat.findOneAndUpdate(
        { label: s.label },
        { ...s, order: i },
        { upsert: true, new: true }
      );
    }
    console.log(`✅ Seeded ${stats.length} Stats`);

    // 8. Navigation
    await Navigation.deleteMany({});
    await Navigation.create({
      items: [
        { type: 'links', data: navLinks },
        { type: 'services', data: navServices }
      ]
    });
    console.log(`✅ Seeded Navigation`);

    // 9. Footer Content
    await FooterContent.deleteMany({});
    await FooterContent.create(footerContent);
    console.log(`✅ Seeded Footer Content`);

    // 10. FAQs
    for (let i = 0; i < faqs.length; i++) {
      const f = faqs[i];
      await Faq.findOneAndUpdate(
        { question: f.question },
        { ...f, order: i },
        { upsert: true, new: true }
      );
    }
    console.log(`✅ Seeded ${faqs.length} FAQs`);

    // 11. Why Us Reasons
    for (let i = 0; i < whyUsReasons.length; i++) {
      const r = whyUsReasons[i];
      await WhyUsReason.findOneAndUpdate(
        { title: r.title },
        { ...r, order: i },
        { upsert: true, new: true }
      );
    }
    console.log(`✅ Seeded ${whyUsReasons.length} Why Us Reasons`);

    // 12. Site Settings Singleton
    await SiteSettings.create({
      heroHeading: 'Crafting Digital Experiences That Drive Business Growth',
      heroSubheading: 'We build premium software solutions, web applications, and digital platforms that help brands scale and succeed.',
      statsCounters: [
        { label: 'Projects Delivered', value: 30, suffix: '+' },
        { label: 'Happy Clients', value: 20, suffix: '+' },
        { label: 'Client Satisfaction', value: 99, suffix: '%' },
        { label: 'Industries Served', value: 5, suffix: '+' }
      ],
      contactEmail: 'hello@webnest.agency',
      contactPhone: '+1 (555) 000-0000',
      address: '123 Agency Blvd, Tech City',
      mapEmbedUrl: '',
      whatsappNumber: '15550000000',
      socialLinks: {
        facebook: 'https://facebook.com/webnest',
        twitter: 'https://twitter.com/webnest',
        linkedin: 'https://linkedin.com/company/webnest',
        github: 'https://github.com/webnest'
      },
      seoDefaults: {
        title: 'WebNest — Premium Software & Design Agency',
        description: 'We design and build premium web applications, e-commerce stores, and software solutions.',
        ogImage: ''
      },
      aboutText: 'We are a team of expert engineers, designers, and strategists dedicated to delivering elite software products.',
      footerText: '© 2026 WebNest Agency. All rights reserved.'
    });
    console.log('✅ Seeded Site Settings');

    console.log('🎉 Migration completed successfully!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Migration failed:', err);
    process.exit(1);
  }
}

seedContent();
