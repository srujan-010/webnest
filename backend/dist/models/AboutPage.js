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
const HeroSchema = new mongoose_1.Schema({
    badge: { type: String, default: 'Our Story' },
    heading: { type: String, default: 'We are an engineering and design collective building the' },
    highlight: { type: String, default: 'future of the web.' },
    description: { type: String, default: 'WebNest was born out of a desire to bridge the gap between stunning aesthetic design and rigorous technical architecture.' },
    hasDecorations: { type: Boolean, default: true }
}, { _id: false });
const MissionVisionCardSchema = new mongoose_1.Schema({
    icon: { type: String, default: 'Target' },
    title: { type: String, required: true },
    description: { type: String, required: true },
    order: { type: Number, default: 0 }
}, { _id: false });
const CoreValueSchema = new mongoose_1.Schema({
    icon: { type: String, default: 'Target' },
    title: { type: String, required: true },
    description: { type: String, required: true },
    order: { type: Number, default: 0 }
}, { _id: false });
const TimelineEventSchema = new mongoose_1.Schema({
    year: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    side: { type: String, enum: ['left', 'right'], default: 'left' },
    order: { type: Number, default: 0 }
}, { _id: false });
const BulletSchema = new mongoose_1.Schema({
    icon: { type: String, default: 'Check' },
    text: { type: String, required: true }
}, { _id: false });
const FeatureCardSchema = new mongoose_1.Schema({
    title: { type: String, default: 'Remote First. Globally Connected.' },
    description: { type: String, default: 'Operating across 3 continents, united by code.' }
}, { _id: false });
const PhilosophySchema = new mongoose_1.Schema({
    title: { type: String, default: 'Our Philosophy & Culture' },
    description: { type: String, default: 'We foster a culture of deep work and continuous learning.' },
    bullets: [BulletSchema],
    featureCard: { type: FeatureCardSchema, default: () => ({}) }
}, { _id: false });
const CtaSchema = new mongoose_1.Schema({
    heading: { type: String, default: 'Ready to build something extraordinary?' },
    description: { type: String, default: 'Join the growing list of visionary companies that trust WebNest with their digital infrastructure.' },
    buttonText: { type: String, default: 'Start Your Project' },
    buttonLink: { type: String, default: '/contact' }
}, { _id: false });
const SeoSchema = new mongoose_1.Schema({
    title: { type: String, default: 'About Us | WebNest' },
    description: { type: String, default: 'Learn more about WebNest.' },
    keywords: { type: String, default: '' },
    canonicalUrl: { type: String, default: '' },
    ogTitle: { type: String, default: '' },
    ogDescription: { type: String, default: '' },
    ogImage: { type: String, default: '' }
}, { _id: false });
const SectionSchema = new mongoose_1.Schema({
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
const AboutPageSchema = new mongoose_1.Schema({
    draft: { type: SectionSchema, default: () => ({}) },
    published: { type: SectionSchema, default: () => ({}) },
    lastPublishedAt: { type: Date }
}, { timestamps: true });
exports.default = mongoose_1.default.models.AboutPage || mongoose_1.default.model('AboutPage', AboutPageSchema);
