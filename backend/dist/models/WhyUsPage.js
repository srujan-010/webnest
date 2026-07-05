"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
// 1. Hero
const HeroSchema = new mongoose_1.Schema({
    title: { type: String, default: 'Engineering Excellence. No Compromises.' },
    subtitle: { type: String, default: 'We are more than just a development agency. We are your long-term technical partners.' },
    visualImage: { type: String, default: '' },
}, { _id: false });
// 2. Trust Metrics
const MetricSchema = new mongoose_1.Schema({
    value: { type: String, required: true },
    label: { type: String, required: true },
    suffix: { type: String, default: '' },
}, { _id: false });
// 3. Frustrations (Why Companies Leave Other Agencies)
const FrustrationSchema = new mongoose_1.Schema({
    icon: { type: String, default: 'AlertTriangle' },
    title: { type: String, required: true },
    description: { type: String, required: true },
}, { _id: false });
// 4. Comparison Table
const ComparisonRowSchema = new mongoose_1.Schema({
    feature: { type: String, required: true },
    typicalAgency: { type: String, required: true },
    webNest: { type: String, required: true },
}, { _id: false });
// 5. How We Work Together (Timeline)
const TimelineStepSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, default: 'Circle' },
}, { _id: false });
// 6. Meet the Team
const TeamRoleSchema = new mongoose_1.Schema({
    role: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, default: 'User' },
}, { _id: false });
// 7. Engineering Standards (Bento)
const EngineeringStandardSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, default: 'Code' },
}, { _id: false });
// 8. Featured Projects
const FeaturedProjectSchema = new mongoose_1.Schema({
    projectName: { type: String, required: true },
    outcome: { type: String, required: true },
    image: { type: String, default: '' },
    link: { type: String, default: '#' },
}, { _id: false });
// 9. Client Success Stories
const TestimonialSchema = new mongoose_1.Schema({
    quote: { type: String, required: true },
    author: { type: String, required: true },
    role: { type: String, default: '' },
    company: { type: String, default: '' },
    project: { type: String, default: '' },
    outcome: { type: String, default: '' },
}, { _id: false });
// 10. Before vs After
const BeforeAfterSchema = new mongoose_1.Schema({
    scenario: { type: String, required: true },
    before: { type: String, required: true },
    after: { type: String, required: true },
}, { _id: false });
// 11. Investment Value
const InvestmentValueSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, default: 'TrendingUp' },
}, { _id: false });
// 12. FAQ
const FaqSchema = new mongoose_1.Schema({
    question: { type: String, required: true },
    answer: { type: String, required: true },
}, { _id: false });
// 13. Final CTA
const CtaSchema = new mongoose_1.Schema({
    title: { type: String, default: 'Ready to build something extraordinary?' },
    subtitle: { type: String, default: 'Skip the guesswork. Partner with an engineering team that delivers predictable excellence.' },
    buttonText: { type: String, default: 'Book Discovery Call' },
    buttonLink: { type: String, default: '/contact' },
}, { _id: false });
const SeoSchema = new mongoose_1.Schema({
    metaTitle: { type: String, default: 'Why WebNest | Engineering Excellence' },
    metaDescription: { type: String, default: 'Discover why top companies trust WebNest with their digital infrastructure.' },
}, { _id: false });
const SectionSchema = new mongoose_1.Schema({
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
const WhyUsPageSchema = new mongoose_1.Schema({
    draft: { type: SectionSchema, default: () => ({}) },
    published: { type: SectionSchema, default: () => ({}) },
    lastPublishedAt: { type: Date },
}, { timestamps: true });
exports.default = mongoose_1.default.models.WhyUsPage || mongoose_1.default.model('WhyUsPage', WhyUsPageSchema);
