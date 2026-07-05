import mongoose, { Schema, Document } from 'mongoose';

// 1. Hero
const HeroSchema = new Schema({
  title: { type: String, default: 'Engineering Excellence. No Compromises.' },
  subtitle: { type: String, default: 'We are more than just a development agency. We are your long-term technical partners.' },
  visualImage: { type: String, default: '' },
}, { _id: false });

// 2. Trust Metrics
const MetricSchema = new Schema({
  value: { type: String, required: true },
  label: { type: String, required: true },
  suffix: { type: String, default: '' },
}, { _id: false });

// 3. Frustrations (Why Companies Leave Other Agencies)
const FrustrationSchema = new Schema({
  icon: { type: String, default: 'AlertTriangle' },
  title: { type: String, required: true },
  description: { type: String, required: true },
}, { _id: false });

// 4. Comparison Table
const ComparisonRowSchema = new Schema({
  feature: { type: String, required: true },
  typicalAgency: { type: String, required: true },
  webNest: { type: String, required: true },
}, { _id: false });

// 5. How We Work Together (Timeline)
const TimelineStepSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, default: 'Circle' },
}, { _id: false });

// 6. Meet the Team
const TeamRoleSchema = new Schema({
  role: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, default: 'User' },
}, { _id: false });

// 7. Engineering Standards (Bento)
const EngineeringStandardSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, default: 'Code' },
}, { _id: false });

// 8. Featured Projects
const FeaturedProjectSchema = new Schema({
  projectName: { type: String, required: true },
  outcome: { type: String, required: true },
  image: { type: String, default: '' },
  link: { type: String, default: '#' },
}, { _id: false });

// 9. Client Success Stories
const TestimonialSchema = new Schema({
  quote: { type: String, required: true },
  author: { type: String, required: true },
  role: { type: String, default: '' },
  company: { type: String, default: '' },
  project: { type: String, default: '' },
  outcome: { type: String, default: '' },
}, { _id: false });

// 10. Before vs After
const BeforeAfterSchema = new Schema({
  scenario: { type: String, required: true },
  before: { type: String, required: true },
  after: { type: String, required: true },
}, { _id: false });

// 11. Investment Value
const InvestmentValueSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, default: 'TrendingUp' },
}, { _id: false });

// 12. FAQ
const FaqSchema = new Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
}, { _id: false });

// 13. Final CTA
const CtaSchema = new Schema({
  title: { type: String, default: 'Ready to build something extraordinary?' },
  subtitle: { type: String, default: 'Skip the guesswork. Partner with an engineering team that delivers predictable excellence.' },
  buttonText: { type: String, default: 'Book Discovery Call' },
  buttonLink: { type: String, default: '/contact' },
}, { _id: false });

const SeoSchema = new Schema({
  metaTitle: { type: String, default: 'Why WebNest | Engineering Excellence' },
  metaDescription: { type: String, default: 'Discover why top companies trust WebNest with their digital infrastructure.' },
}, { _id: false });

const SectionSchema = new Schema({
  hero: { type: HeroSchema, default: () => ({}) },
  metrics: [MetricSchema],
  frustrations: [FrustrationSchema],
  comparisonTable: [ComparisonRowSchema],
  timelineSteps: [TimelineStepSchema],
  teamRoles: [TeamRoleSchema],
  engineeringStandards: [EngineeringStandardSchema],
  featuredProjects: [FeaturedProjectSchema],
  testimonials: [TestimonialSchema],
  beforeAfter: [BeforeAfterSchema],
  investmentValue: [InvestmentValueSchema],
  faqs: [FaqSchema],
  cta: { type: CtaSchema, default: () => ({}) },
  seo: { type: SeoSchema, default: () => ({}) },
}, { _id: false });

export interface IWhyUsPage extends Document {
  draft: any;
  published: any;
  lastPublishedAt?: Date;
}

const WhyUsPageSchema = new Schema<IWhyUsPage>({
  draft: { type: SectionSchema, default: () => ({}) },
  published: { type: SectionSchema, default: () => ({}) },
  lastPublishedAt: { type: Date },
}, { timestamps: true });

export default mongoose.models.WhyUsPage || mongoose.model<IWhyUsPage>('WhyUsPage', WhyUsPageSchema);
