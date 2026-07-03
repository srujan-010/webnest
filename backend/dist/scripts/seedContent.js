"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../config/db");
const Project_1 = __importDefault(require("../models/Project"));
const Service_1 = __importDefault(require("../models/Service"));
const ProcessStep_1 = __importDefault(require("../models/ProcessStep"));
const TechStackItem_1 = __importDefault(require("../models/TechStackItem"));
const Testimonial_1 = __importDefault(require("../models/Testimonial"));
const TeamMember_1 = __importDefault(require("../models/TeamMember"));
const Stat_1 = __importDefault(require("../models/Stat"));
const Navigation_1 = __importDefault(require("../models/Navigation"));
const FooterContent_1 = __importDefault(require("../models/FooterContent"));
const Faq_1 = __importDefault(require("../models/Faq"));
const WhyUsReason_1 = __importDefault(require("../models/WhyUsReason"));
const SiteSettings_1 = __importDefault(require("../models/SiteSettings"));
const NewsletterSubscriber_1 = __importDefault(require("../models/NewsletterSubscriber"));
const fallbackData_1 = require("./fallbackData");
async function seedContent() {
    await (0, db_1.connectDB)();
    console.log('Starting content migration...');
    try {
        // Clear collections first to avoid duplicates or leftovers from schema mismatches
        await Promise.all([
            Project_1.default.deleteMany({}),
            Service_1.default.deleteMany({}),
            ProcessStep_1.default.deleteMany({}),
            TechStackItem_1.default.deleteMany({}),
            Testimonial_1.default.deleteMany({}),
            TeamMember_1.default.deleteMany({}),
            Stat_1.default.deleteMany({}),
            Navigation_1.default.deleteMany({}),
            FooterContent_1.default.deleteMany({}),
            Faq_1.default.deleteMany({}),
            WhyUsReason_1.default.deleteMany({}),
            SiteSettings_1.default.deleteMany({}),
            NewsletterSubscriber_1.default.deleteMany({}),
        ]);
        console.log('🧹 Cleared all collections successfully');
        // 1. Projects
        for (let i = 0; i < fallbackData_1.projects.length; i++) {
            const p = fallbackData_1.projects[i];
            const slug = p.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
            await Project_1.default.findOneAndUpdate({ slug }, { ...p, slug, order: i, status: 'published' }, { upsert: true, new: true });
        }
        console.log(`✅ Seeded ${fallbackData_1.projects.length} Projects`);
        // 2. Services
        for (let i = 0; i < fallbackData_1.services.length; i++) {
            const s = fallbackData_1.services[i];
            await Service_1.default.findOneAndUpdate({ title: s.title }, { ...s, order: i }, { upsert: true, new: true });
        }
        console.log(`✅ Seeded ${fallbackData_1.services.length} Services`);
        // 3. Process Steps
        for (let i = 0; i < fallbackData_1.processSteps.length; i++) {
            const ps = fallbackData_1.processSteps[i];
            await ProcessStep_1.default.findOneAndUpdate({ title: ps.title }, { ...ps, order: i }, { upsert: true, new: true });
        }
        console.log(`✅ Seeded ${fallbackData_1.processSteps.length} Process Steps`);
        // 4. Tech Stack Items
        for (let i = 0; i < fallbackData_1.techStack.length; i++) {
            const ts = fallbackData_1.techStack[i];
            await TechStackItem_1.default.findOneAndUpdate({ name: ts.name }, { ...ts, order: i }, { upsert: true, new: true });
        }
        console.log(`✅ Seeded ${fallbackData_1.techStack.length} Tech Stack Items`);
        // 5. Testimonials
        for (let i = 0; i < fallbackData_1.testimonials.length; i++) {
            const t = fallbackData_1.testimonials[i];
            await Testimonial_1.default.findOneAndUpdate({ name: t.author, company: t.role || 'Unknown' }, { ...t, name: t.author, stars: t.rating, order: i }, { upsert: true, new: true });
        }
        console.log(`✅ Seeded ${fallbackData_1.testimonials.length} Testimonials`);
        // 6. Team Members
        for (let i = 0; i < fallbackData_1.team.length; i++) {
            const t = fallbackData_1.team[i];
            await TeamMember_1.default.findOneAndUpdate({ name: t.name }, { ...t, order: i }, { upsert: true, new: true });
        }
        console.log(`✅ Seeded ${fallbackData_1.team.length} Team Members`);
        // 7. Stats
        for (let i = 0; i < fallbackData_1.stats.length; i++) {
            const s = fallbackData_1.stats[i];
            await Stat_1.default.findOneAndUpdate({ label: s.label }, { ...s, order: i }, { upsert: true, new: true });
        }
        console.log(`✅ Seeded ${fallbackData_1.stats.length} Stats`);
        // 8. Navigation
        await Navigation_1.default.deleteMany({});
        await Navigation_1.default.create({
            items: [
                { type: 'links', data: fallbackData_1.navLinks },
                { type: 'services', data: fallbackData_1.navServices }
            ]
        });
        console.log(`✅ Seeded Navigation`);
        // 9. Footer Content
        await FooterContent_1.default.deleteMany({});
        await FooterContent_1.default.create(fallbackData_1.footerContent);
        console.log(`✅ Seeded Footer Content`);
        // 10. FAQs
        for (let i = 0; i < fallbackData_1.faqs.length; i++) {
            const f = fallbackData_1.faqs[i];
            await Faq_1.default.findOneAndUpdate({ question: f.question }, { ...f, order: i }, { upsert: true, new: true });
        }
        console.log(`✅ Seeded ${fallbackData_1.faqs.length} FAQs`);
        // 11. Why Us Reasons
        for (let i = 0; i < fallbackData_1.whyUsReasons.length; i++) {
            const r = fallbackData_1.whyUsReasons[i];
            await WhyUsReason_1.default.findOneAndUpdate({ title: r.title }, { ...r, order: i }, { upsert: true, new: true });
        }
        console.log(`✅ Seeded ${fallbackData_1.whyUsReasons.length} Why Us Reasons`);
        // 12. Site Settings Singleton
        await SiteSettings_1.default.create({
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
    }
    catch (err) {
        console.error('❌ Migration failed:', err);
        process.exit(1);
    }
}
seedContent();
