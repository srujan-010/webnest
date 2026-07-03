import mongoose, { Schema, Document } from 'mongoose';

const HeroSchema = new Schema({
  badge: { type: String, default: 'Our Story' },
  heading: { type: String, default: 'We are an engineering and design collective building the' },
  highlight: { type: String, default: 'future of the web.' },
  description: { type: String, default: 'WebNest was born out of a desire to bridge the gap between stunning aesthetic design and rigorous technical architecture.' },
  hasDecorations: { type: Boolean, default: true }
}, { _id: false });

const MissionVisionCardSchema = new Schema({
  icon: { type: String, default: 'Target' },
  title: { type: String, required: true },
  description: { type: String, required: true },
  order: { type: Number, default: 0 }
}, { _id: false });

const CoreValueSchema = new Schema({
  icon: { type: String, default: 'Target' },
  title: { type: String, required: true },
  description: { type: String, required: true },
  order: { type: Number, default: 0 }
}, { _id: false });

const TimelineEventSchema = new Schema({
  year: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  side: { type: String, enum: ['left', 'right'], default: 'left' },
  order: { type: Number, default: 0 }
}, { _id: false });

const BulletSchema = new Schema({
  icon: { type: String, default: 'Check' },
  text: { type: String, required: true }
}, { _id: false });

const FeatureCardSchema = new Schema({
  title: { type: String, default: 'Remote First. Globally Connected.' },
  description: { type: String, default: 'Operating across 3 continents, united by code.' }
}, { _id: false });

const PhilosophySchema = new Schema({
  title: { type: String, default: 'Our Philosophy & Culture' },
  description: { type: String, default: 'We foster a culture of deep work and continuous learning.' },
  bullets: [BulletSchema],
  featureCard: { type: FeatureCardSchema, default: () => ({}) }
}, { _id: false });

const CtaSchema = new Schema({
  heading: { type: String, default: 'Ready to build something extraordinary?' },
  description: { type: String, default: 'Join the growing list of visionary companies that trust WebNest with their digital infrastructure.' },
  buttonText: { type: String, default: 'Start Your Project' },
  buttonLink: { type: String, default: '/contact' }
}, { _id: false });

const SeoSchema = new Schema({
  title: { type: String, default: 'About Us | WebNest' },
  description: { type: String, default: 'Learn more about WebNest.' },
  keywords: { type: String, default: '' },
  canonicalUrl: { type: String, default: '' },
  ogTitle: { type: String, default: '' },
  ogDescription: { type: String, default: '' },
  ogImage: { type: String, default: '' }
}, { _id: false });

const SectionSchema = new Schema({
  hero: { type: HeroSchema, default: () => ({}) },
  missionVision: [MissionVisionCardSchema],
  whyWeStarted: {
    title: { type: String, default: 'Why We Started WebNest' },
    description: { type: String, default: 'We were tired of seeing businesses forced to choose between template-driven mediocrity or bloated, slow enterprise platforms.' }
  },
  coreValues: [CoreValueSchema],
  teamSection: {
    title: { type: String, default: 'Meet Our Team' },
    subtitle: { type: String, default: 'The minds behind the code.' }
  },
  techSection: {
    title: { type: String, default: 'Technologies We Use' }
  },
  timeline: [TimelineEventSchema],
  philosophy: { type: PhilosophySchema, default: () => ({}) },
  cta: { type: CtaSchema, default: () => ({}) },
  seo: { type: SeoSchema, default: () => ({}) }
}, { _id: false });

export interface IAboutPage extends Document {
  draft: any;
  published: any;
  lastPublishedAt?: Date;
}

const AboutPageSchema = new Schema<IAboutPage>({
  draft: { type: SectionSchema, default: () => ({}) },
  published: { type: SectionSchema, default: () => ({}) },
  lastPublishedAt: { type: Date }
}, { timestamps: true });

export default mongoose.models.AboutPage || mongoose.model<IAboutPage>('AboutPage', AboutPageSchema);
