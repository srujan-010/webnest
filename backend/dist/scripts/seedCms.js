"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../../.env'), override: true });
const db_1 = require("../config/db");
const Hero_1 = __importDefault(require("../models/Hero"));
const Stat_1 = __importDefault(require("../models/Stat"));
const Service_1 = __importDefault(require("../models/Service"));
const ProcessStep_1 = __importDefault(require("../models/ProcessStep"));
const TechStackItem_1 = __importDefault(require("../models/TechStackItem"));
const Testimonial_1 = __importDefault(require("../models/Testimonial"));
const WhyUsReason_1 = __importDefault(require("../models/WhyUsReason"));
const BlogPost_1 = __importDefault(require("../models/BlogPost"));
const Faq_1 = __importDefault(require("../models/Faq"));
const Navigation_1 = __importDefault(require("../models/Navigation"));
const FooterContent_1 = __importDefault(require("../models/FooterContent"));
const SiteSettings_1 = __importDefault(require("../models/SiteSettings"));
const Project_1 = __importDefault(require("../models/Project"));
const HeroModel = Hero_1.default;
const StatModel = Stat_1.default;
const ServiceModel = Service_1.default;
const ProcessStepModel = ProcessStep_1.default;
const TechStackItemModel = TechStackItem_1.default;
const TestimonialModel = Testimonial_1.default;
const WhyUsReasonModel = WhyUsReason_1.default;
const BlogPostModel = BlogPost_1.default;
const FaqModel = Faq_1.default;
const NavigationModel = Navigation_1.default;
const FooterContentModel = FooterContent_1.default;
const SiteSettingsModel = SiteSettings_1.default;
const ProjectModel = Project_1.default;
async function seedHero() {
    const count = await HeroModel.countDocuments();
    if (count === 0) {
        console.log('🌱 Seeding Hero collection...');
        await HeroModel.create({
            badge: 'Premium Software Agency',
            headline: 'Crafting Digital Experiences That Drive Business Growth',
            headlineHighlight: 'Business Growth',
            subheadline: 'We build premium websites, web applications, dashboards, e-commerce platforms, and digital products that help businesses grow.',
            primaryCta: { label: 'Start Your Project', link: '/contact' },
            secondaryCta: { label: 'View Our Work', link: '/portfolio' },
            logoStrip: [
                { image: 'https://cdn.worldvectorlogo.com/logos/react-2.svg', label: 'React', order: 0 },
                { image: 'https://cdn.worldvectorlogo.com/logos/nextjs-2.svg', label: 'Next.js', order: 1 }
            ],
            isPublished: true,
        });
        console.log('✅ Seeding Hero complete.');
    }
    else {
        console.log('ℹ️ Hero collection already has data, skipping...');
    }
}
async function seedStats() {
    const defaultStats = [
        { value: 30, suffix: '+', label: 'Projects Delivered', order: 0 },
        { value: 20, suffix: '+', label: 'Happy Clients', order: 1 },
        { value: 99, suffix: '%', label: 'Client Satisfaction', order: 2 },
        { value: 5, suffix: '+', label: 'Industries Served', order: 3 },
    ];
    console.log('🌱 Seeding Stats collection...');
    for (const s of defaultStats) {
        const exist = await StatModel.findOne({ label: s.label });
        if (!exist) {
            await StatModel.create(s);
            console.log(`  + Created stat: "${s.label}"`);
        }
    }
    console.log('✅ Seeding Stats complete.');
}
async function seedServices() {
    const defaultServices = [
        {
            title: "Web Applications",
            shortDescription: "Scalable, high-performance web apps built with modern React and Next.js architectures. Tailored for complex business logic.",
            icon: "Code2",
            className: "lg:col-span-2 bg-brand-600 text-white border-brand-500",
            iconClass: "text-brand-200",
            textClass: "text-brand-100",
            buttonClass: "text-white hover:text-brand-200",
            large: true,
            featured: true,
            order: 0
        },
        {
            title: "E-Commerce",
            shortDescription: "Conversion-optimized storefronts with seamless payment integration.",
            icon: "ShoppingCart",
            className: "lg:col-span-2 bg-white border-gray-100",
            iconClass: "text-brand-600",
            textClass: "text-ink-600",
            buttonClass: "text-brand-600 hover:text-brand-700",
            large: false,
            featured: true,
            order: 1
        },
        {
            title: "UI/UX Design",
            shortDescription: "Premium, user-centric interfaces that engage and convert.",
            icon: "Paintbrush",
            className: "lg:col-span-1 bg-white border-gray-100",
            iconClass: "text-accent-violet",
            textClass: "text-ink-600",
            buttonClass: "text-accent-violet hover:text-accent-violet/80",
            large: false,
            featured: true,
            order: 2
        },
        {
            title: "Business Sites",
            shortDescription: "Professional landing pages that establish authority.",
            icon: "MonitorSmartphone",
            className: "lg:col-span-1 bg-white border-gray-100",
            iconClass: "text-accent-cyan",
            textClass: "text-ink-600",
            buttonClass: "text-accent-cyan hover:text-accent-cyan/80",
            large: false,
            featured: true,
            order: 3
        },
        {
            title: "Admin Dashboards",
            shortDescription: "Intuitive internal tools for managing your data and workflows efficiently.",
            icon: "LayoutDashboard",
            className: "lg:col-span-2 bg-surface-50 border-gray-200/60",
            iconClass: "text-brand-500",
            textClass: "text-ink-600",
            buttonClass: "text-brand-600 hover:text-brand-700",
            large: true,
            featured: true,
            order: 4
        },
        {
            title: "Technical SEO",
            shortDescription: "Architecture optimized for search engine visibility.",
            icon: "Search",
            className: "lg:col-span-1 bg-white border-gray-100",
            iconClass: "text-emerald-500",
            textClass: "text-ink-600",
            buttonClass: "text-emerald-500 hover:text-emerald-600",
            large: false,
            featured: true,
            order: 5
        },
        {
            title: "Secure Hosting",
            shortDescription: "Fast, reliable cloud infrastructure deployment.",
            icon: "Server",
            className: "lg:col-span-1 bg-white border-gray-100",
            iconClass: "text-blue-500",
            textClass: "text-ink-600",
            buttonClass: "text-blue-500 hover:text-blue-600",
            large: false,
            featured: true,
            order: 6
        },
        {
            title: "Maintenance",
            shortDescription: "Ongoing support and security updates.",
            icon: "ShieldCheck",
            className: "lg:col-span-2 bg-white border-gray-100",
            iconClass: "text-amber-500",
            textClass: "text-ink-600",
            buttonClass: "text-amber-500 hover:text-amber-600",
            large: true,
            featured: true,
            order: 7
        }
    ];
    console.log('🌱 Seeding Services collection...');
    for (const s of defaultServices) {
        const exist = await ServiceModel.findOne({ title: s.title });
        if (!exist) {
            await ServiceModel.create(s);
            console.log(`  + Created service: "${s.title}"`);
        }
    }
    console.log('✅ Seeding Services complete.');
}
async function seedProcess() {
    const defaultProcess = [
        { title: "Discover", icon: "Search", desc: "Deep dive into your business goals, target audience, and technical requirements.", order: 0 },
        { title: "Plan", icon: "PenTool", desc: "Strategic blueprinting, architecture design, and project roadmapping.", order: 1 },
        { title: "Design", icon: "Layout", desc: "Crafting bespoke, user-centric wireframes and high-fidelity UI designs.", order: 2 },
        { title: "Develop", icon: "Code2", desc: "Agile engineering using modern, scalable tech stacks and clean code.", order: 3 },
        { title: "Test", icon: "TestTube", desc: "Rigorous QA, performance profiling, and security auditing.", order: 4 },
        { title: "Launch", icon: "Rocket", desc: "Seamless deployment to production environments and zero-downtime go-live.", order: 5 },
        { title: "Support", icon: "Headphones", desc: "Continuous monitoring, maintenance, and iterative feature enhancements.", order: 6 }
    ];
    console.log('🌱 Seeding ProcessSteps collection...');
    for (const p of defaultProcess) {
        const exist = await ProcessStepModel.findOne({ title: p.title });
        if (!exist) {
            await ProcessStepModel.create(p);
            console.log(`  + Created process step: "${p.title}"`);
        }
    }
    console.log('✅ Seeding Process complete.');
}
async function seedTech() {
    const defaultTech = [
        { name: "React", Icon: "FaReact", category: "frontend", order: 0 },
        { name: "Next.js", Icon: "SiNextdotjs", category: "frontend", order: 1 },
        { name: "TypeScript", Icon: "SiTypescript", category: "frontend", order: 2 },
        { name: "Tailwind CSS", Icon: "SiTailwindcss", category: "frontend", order: 3 },
        { name: "Node.js", Icon: "FaNodeJs", category: "backend", order: 4 },
        { name: "MongoDB", Icon: "SiMongodb", category: "db", order: 5 },
        { name: "PostgreSQL", Icon: "SiPostgresql", category: "db", order: 6 },
        { name: "Framer Motion", Icon: "SiFramer", category: "frontend", order: 7 },
        { name: "GSAP", Icon: "SiGreensock", category: "tools", order: 8 },
        { name: "AWS", Icon: "FaAws", category: "tools", order: 9 }
    ];
    console.log('🌱 Seeding TechStack collection...');
    for (const t of defaultTech) {
        const exist = await TechStackItemModel.findOne({ name: t.name });
        if (!exist) {
            await TechStackItemModel.create(t);
            console.log(`  + Created tech stack item: "${t.name}"`);
        }
    }
    console.log('✅ Seeding Tech complete.');
}
async function seedTestimonials() {
    const defaultTestimonials = [
        {
            reviewText: "WebNest completely transformed our digital presence. Their attention to detail and engineering quality is unmatched. Our conversion rate doubled within a month.",
            clientName: "Sarah Jenkins",
            companyName: "Swastika Sarees",
            role: "CEO",
            rating: 5,
            order: 0
        },
        {
            reviewText: "The point-of-sale system they built for us handles thousands of transactions daily without a hiccup. Truly enterprise-grade software.",
            clientName: "Michael Chen",
            companyName: "ShopPluse",
            role: "Director",
            rating: 5,
            order: 1
        },
        {
            reviewText: "They don't just write code; they understand business. Every feature they proposed added tangible value to our bottom line.",
            clientName: "David Sharma",
            companyName: "Suryodaya Farms",
            role: "Founder",
            rating: 5,
            order: 2
        },
        {
            reviewText: "Flawless execution from discovery to launch. The UI is stunning and the performance is incredibly fast.",
            clientName: "Emily Taylor",
            companyName: "TSquadron",
            role: "CTO",
            rating: 5,
            order: 3
        }
    ];
    console.log('🌱 Seeding Testimonials collection...');
    for (const t of defaultTestimonials) {
        const exist = await TestimonialModel.findOne({ clientName: t.clientName });
        if (!exist) {
            await TestimonialModel.create(t);
            console.log(`  + Created testimonial for: "${t.clientName}"`);
        }
    }
    console.log('✅ Seeding Testimonials complete.');
}
async function seedWhyUs() {
    const defaultWhyUs = [
        { title: "Fast Delivery", text: "Optimized workflows ensuring rapid deployment without compromising quality.", order: 0 },
        { title: "Premium UI", text: "Bespoke, handcrafted interfaces that elevate your brand's digital presence.", order: 1 },
        { title: "SEO Friendly", text: "Built-in technical SEO best practices to rank higher from day one.", order: 2 },
        { title: "Responsive Design", text: "Flawless execution across mobile, tablet, and desktop breakpoints.", order: 3 },
        { title: "Secure Code", text: "Enterprise-grade security standards and vulnerability protection.", order: 4 },
        { title: "Scalable Architecture", text: "Modern stacks designed to grow seamlessly with your user base.", order: 5 },
        { title: "Affordable Pricing", text: "Transparent, value-driven pricing structures for maximum ROI.", order: 6 },
        { title: "24/7 Support", text: "Dedicated maintenance and support long after launch.", order: 7 }
    ];
    console.log('🌱 Seeding WhyUsReason collection...');
    for (const w of defaultWhyUs) {
        const exist = await WhyUsReasonModel.findOne({ title: w.title });
        if (!exist) {
            await WhyUsReasonModel.create(w);
            console.log(`  + Created why us reason: "${w.title}"`);
        }
    }
    console.log('✅ Seeding WhyUs complete.');
}
async function seedBlog() {
    const count = await BlogPostModel.countDocuments();
    if (count === 0) {
        console.log('🌱 Seeding BlogPost collection...');
        await BlogPostModel.create({
            title: "Building Modern Web Apps with Next.js",
            slug: "building-modern-web-apps-with-nextjs",
            excerpt: "Learn how to build lightning-fast web applications using Next.js App Router and modern architecture patterns.",
            contentRichText: "<p>Next.js is a powerful framework that enables developers to build high-performance web applications...</p>",
            body: "<p>Next.js is a powerful framework that enables developers to build high-performance web applications...</p>",
            author: "Admin Team",
            category: "Development",
            tags: ["Next.js", "React", "WebDev"],
            readTimeMinutes: 5,
            status: "published",
            publishedAt: new Date(),
        });
        console.log('✅ Seeding BlogPost complete.');
    }
    else {
        console.log('ℹ️ BlogPost collection already has data, skipping...');
    }
}
async function seedFaq() {
    const defaultFaqs = [
        { question: "What is your typical project timeline?", answer: "Project timelines vary based on complexity. A standard corporate website typically takes 4-6 weeks, while a custom web application or e-commerce platform can take 8-16 weeks from discovery to launch.", order: 0 },
        { question: "Do you provide ongoing support after launch?", answer: "Yes, we offer comprehensive maintenance and support packages. This includes security monitoring, performance optimization, regular updates, and a dedicated block of hours for iterative feature enhancements.", order: 1 },
        { question: "Will my website be optimized for SEO?", answer: "Absolutely. Technical SEO is built into our core development process. We ensure optimal site speed, semantic HTML structure, proper meta tags, dynamic sitemaps, and mobile responsiveness to give you the best foundation for search rankings.", order: 2 },
        { question: "What technologies do you use?", answer: "We specialize in modern JavaScript/TypeScript ecosystems. Our primary stack includes React, Next.js, Node.js, and Tailwind CSS. For databases, we use PostgreSQL or MongoDB depending on data structure requirements.", order: 3 },
        { question: "How do you handle project management and communication?", answer: "We believe in radical transparency. You'll have direct access to a dedicated project manager, regular sync calls, and access to our project management dashboard (Jira/Linear) to track progress in real-time.", order: 4 }
    ];
    console.log('🌱 Seeding Faq collection...');
    for (const f of defaultFaqs) {
        const exist = await FaqModel.findOne({ question: f.question });
        if (!exist) {
            await FaqModel.create(f);
            console.log(`  + Created FAQ: "${f.question}"`);
        }
    }
    console.log('✅ Seeding Faq complete.');
}
async function seedNavigation() {
    const count = await NavigationModel.countDocuments();
    if (count === 0) {
        console.log('🌱 Seeding Navigation collection...');
        await NavigationModel.create({
            items: [
                {
                    type: 'links',
                    data: [
                        { name: "About", href: "/about" },
                        { name: "Process", href: "/process" },
                        { name: "Technologies", href: "/technologies" },
                        { name: "Blog", href: "/blog" }
                    ]
                },
                {
                    type: 'services',
                    data: [
                        { name: "Business Websites", icon: "Monitor", href: "/services#business-websites", desc: "Corporate and brand identity platforms" },
                        { name: "Web Applications", icon: "Smartphone", href: "/services#web-applications", desc: "Complex SaaS and custom platforms" },
                        { name: "E-Commerce", icon: "ShoppingCart", href: "/services#e-commerce", desc: "High-conversion online stores" },
                        { name: "Admin Dashboards", icon: "LayoutDashboard", href: "/services#admin-dashboards", desc: "Internal tools and data visualization" },
                        { name: "SEO & Growth", icon: "Search", href: "/services#seo", desc: "Technical and content optimization" },
                        { name: "Maintenance", icon: "Wrench", href: "/services#maintenance", desc: "Ongoing support and updates" }
                    ]
                }
            ]
        });
        console.log('✅ Seeding Navigation complete.');
    }
    else {
        console.log('ℹ️ Navigation collection already has data, skipping...');
    }
}
async function seedFooter() {
    const count = await FooterContentModel.countDocuments();
    if (count === 0) {
        console.log('🌱 Seeding FooterContent collection...');
        await FooterContentModel.create({
            description: "We design and build premium software solutions for ambitious brands worldwide.",
            servicesLinks: [
                { label: "Web Applications", url: "#" },
                { label: "E-Commerce", url: "#" },
                { label: "UI/UX Design", url: "#" },
                { label: "Business Sites", url: "#" },
                { label: "Admin Dashboards", url: "#" }
            ],
            companyLinks: [
                { label: "About Us", url: "#" },
                { label: "Careers", url: "#" },
                { label: "Our Process", url: "#" },
                { label: "Contact", url: "#" },
                { label: "Blog", url: "#" }
            ],
            socialLinks: [
                { platform: "FaTwitter", url: "#" },
                { platform: "FaLinkedin", url: "#" },
                { platform: "FaGithub", url: "#" }
            ],
            copyright: `© ${new Date().getFullYear()} WebNest Agency. All rights reserved.`
        });
        console.log('✅ Seeding FooterContent complete.');
    }
    else {
        console.log('ℹ️ FooterContent collection already has data, skipping...');
    }
}
async function seedSettings() {
    const count = await SiteSettingsModel.countDocuments();
    if (count === 0) {
        console.log('🌱 Seeding SiteSettings collection...');
        await SiteSettingsModel.create({
            heroHeading: "Crafting Digital Experiences That Drive Business Growth",
            heroSubheading: "We build premium software solutions, web applications, and digital platforms that help brands scale and succeed.",
            statsCounters: [
                { label: "Projects Delivered", value: 30, suffix: "+" },
                { label: "Happy Clients", value: 20, suffix: "+" },
                { label: "Client Satisfaction", value: 99, suffix: "%" },
                { label: "Industries Served", value: 5, suffix: "+" }
            ],
            contactEmail: "hello@webnest.agency",
            contactPhone: "+1 (555) 000-0000",
            address: "123 Agency Blvd, Tech City",
            mapEmbedUrl: "",
            whatsappNumber: "",
            socialLinks: {
                facebook: "",
                twitter: "",
                linkedin: "",
                github: "",
                instagram: ""
            },
            seoDefaults: {
                title: "WebNest — Premium Software & Design Agency",
                description: "We design and build premium web applications, e-commerce stores, and software solutions.",
                ogImage: ""
            },
            aboutText: "We are a team of expert engineers, designers, and strategists dedicated to delivering elite software products.",
            footerText: `© ${new Date().getFullYear()} WebNest Agency. All rights reserved.`,
            navItems: [
                { label: "About", url: "/about", order: 0 },
                { label: "Process", url: "/process", order: 1 },
                { label: "Technologies", url: "/technologies", order: 2 },
                { label: "Blog", url: "/blog", order: 3 }
            ],
            headerCta: {
                label: "Start Project",
                link: "/contact"
            }
        });
        console.log('✅ Seeding SiteSettings complete.');
    }
    else {
        // If it exists, let's make sure it has navItems and headerCta filled
        const settings = await SiteSettingsModel.findOne();
        if (settings && (!settings.navItems || settings.navItems.length === 0)) {
            console.log('🌱 Adding default navItems & headerCta to existing SiteSettings...');
            settings.navItems = [
                { label: "About", url: "/about", order: 0 },
                { label: "Process", url: "/process", order: 1 },
                { label: "Technologies", url: "/technologies", order: 2 },
                { label: "Blog", url: "/blog", order: 3 }
            ];
            settings.headerCta = {
                label: "Start Project",
                link: "/contact"
            };
            await settings.save();
            console.log('✅ SiteSettings updated.');
        }
        console.log('ℹ️ SiteSettings collection already has data, skipping...');
    }
}
async function seedProjects() {
    console.log('🌱 Seeding Projects collection (clearing old entries first)...');
    await ProjectModel.deleteMany({});
    const mockProjects = [
        {
            title: "ShopPluse POS",
            name: "ShopPluse POS",
            slug: "shoppluse-pos",
            category: "Web Applications",
            categories: ["Web Applications"],
            shortDescription: "A comprehensive point-of-sale and inventory management system designed for multi-store retail operations with real-time syncing.",
            longDescription: "ShopPluse POS solves the multi-channel inventory synchronization problem for high-growth retailers. It integrates physical barcode scanning, receipt generation, and real-time ledger accounting into a unified browser experience.",
            challenge: "ShopPluse was faced with the challenge of real-time inventory synchronization across 15+ physical storefronts and a digital e-commerce channel, leading to frequent overselling, stock discrepancies, and delayed financial reporting.",
            solution: "We built a centralized Node.js/Socket.io synchronization server with an offline-first Next.js PWA client. Transactions are queue-buffered locally and synced automatically when connection is restored, while advanced optimistic locking prevents race conditions.",
            featuresList: ["Real-time Inventory Syncing", "Offline-first Transaction Queue", "Multi-store Analytics Dashboard", "Barcode Scanning Integration"],
            techStack: ["Next.js", "Node.js", "MongoDB", "Socket.io", "Tailwind CSS"],
            clientName: "ShopPluse Retail Group",
            clientLogo: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=100&q=80",
            completionYear: "2024",
            results: [
                "99.9% Inventory Accuracy",
                "40% Faster Checkout Speed",
                "Real-time sync across 15 locations",
                "Zero data loss during offline periods"
            ],
            testimonialQuote: "WebNest transformed our retail operations. The POS system is extremely fast, works offline, and keeps our inventory perfectly in sync across all our stores.",
            testimonialAuthor: "Arjun Mehta",
            testimonialRole: "Chief Operating Officer",
            testimonialCompany: "ShopPluse Retail Group",
            testimonialPhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
            color: "from-blue-600/20 to-cyan-500/20",
            accent: "bg-blue-600",
            desktopImage: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80",
            image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80",
            mobileImage: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=600&q=80",
            thumbnail: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80",
            coverImage: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80",
            gallery: [
                "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
            ],
            status: "published",
            isFeatured: true,
            order: 0
        },
        {
            title: "Swastika Sarees",
            name: "Swastika Sarees",
            slug: "swastika-sarees",
            category: "E-Commerce",
            categories: ["E-Commerce"],
            shortDescription: "Premium ethnic wear e-commerce platform featuring immersive high-resolution product viewing and seamless checkout flows.",
            longDescription: "Swastika Sarees delivers a custom shopping flow designed for luxury apparel buyers. Highlights include smooth page transition animations, highly detailed dynamic filters, and real-time Razorpay integrations.",
            challenge: "A traditional high-end boutique needing to translate their premium offline boutique experience into a digital platform that conveys the fine texture and drape of luxury fabrics while maintaining page loads under 1.5 seconds.",
            solution: "Designed a clean, minimalist UI with dynamic high-resolution image zoom, custom video integrations, and an ultra-streamlined single-page checkout flow integrated with domestic and international payment gateways.",
            featuresList: ["Dynamic High-Res Media Gallery", "Single-Page Checkout Flow", "Robust Custom Inventory Manager", "Personalized Recommendation Engine"],
            techStack: ["React", "Express", "Node.js", "MongoDB", "Redux", "Tailwind CSS"],
            clientName: "Swastika Fashion House",
            clientLogo: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=100&q=80",
            completionYear: "2024",
            results: [
                "150% Increase in Online Sales",
                "Sub-1.2s Average Page Load Time",
                "32% Cart Abandonment Reduction",
                "4.8/5 Star Customer Satisfaction"
            ],
            testimonialQuote: "Our online presence finally matches the craftsmanship of our products. WebNest's attention to detail was exceptional.",
            testimonialAuthor: "Priyanka Sen",
            testimonialRole: "Founder & Creative Director",
            testimonialCompany: "Swastika Fashion House",
            testimonialPhoto: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
            color: "from-rose-500/20 to-pink-500/20",
            accent: "bg-rose-500",
            desktopImage: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80",
            image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80",
            mobileImage: "https://images.unsplash.com/photo-1555421689-491a97ff2040?auto=format&fit=crop&w=600&q=80",
            thumbnail: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80",
            coverImage: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80",
            gallery: [
                "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1472851294608-062f824d296e?auto=format&fit=crop&w=800&q=80"
            ],
            status: "published",
            isFeatured: true,
            order: 1
        },
        {
            title: "Suryodaya Farms",
            name: "Suryodaya Farms",
            slug: "suryodaya-farms",
            category: "Corporate",
            categories: ["Corporate"],
            shortDescription: "Digital presence for an organic farming cooperative, highlighting sustainable practices and direct-to-consumer sales.",
            longDescription: "Suryodaya Farms provides farmers with a direct digital portal to sell fresh produce. It is optimized for mobile responsiveness and incorporates storytelling UI layouts that connect buyers directly to origin information.",
            challenge: "Connecting rural organic farmers directly to urban consumers to eliminate middlemen, requiring a platform that establishes deep trust and showcases the sustainable farm-to-table practices behind each crop.",
            solution: "Created an interactive storytelling website that tracks agricultural produce from farm to fork, incorporating location pinning, rich media CMS integration, and micro-animations to highlight crop lifecycles.",
            featuresList: ["Interactive Storytelling Layout", "D2C Fresh Produce Catalog", "Newsletter & Subscription System", "Geographic Farm Mapping"],
            techStack: ["Next.js", "Framer Motion", "Sanity CMS", "MongoDB"],
            clientName: "Suryodaya Agro Cooperative",
            clientLogo: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=100&q=80",
            completionYear: "2023",
            results: [
                "80% Direct Sales Growth",
                "4.9/5 Average Farmer Rating",
                "5,000+ Active Subscriptions",
                "45% More Profit for Farmers"
            ],
            testimonialQuote: "The storytelling aspect of the website has helped us build incredible trust with our customers. Direct sales have boomed and middlemen are gone!",
            testimonialAuthor: "Ramesh Patel",
            testimonialRole: "President",
            testimonialCompany: "Suryodaya Agro Cooperative",
            testimonialPhoto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
            color: "from-green-500/20 to-emerald-500/20",
            accent: "bg-green-500",
            desktopImage: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=80",
            image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=80",
            mobileImage: "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?auto=format&fit=crop&w=600&q=80",
            thumbnail: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=80",
            coverImage: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=80",
            gallery: [
                "https://images.unsplash.com/photo-1464225226654-7f1bc7cbd97c?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1530968033775-2c9273f08965?auto=format&fit=crop&w=800&q=80"
            ],
            status: "published",
            isFeatured: true,
            order: 2
        },
        {
            title: "MediConnect Portal",
            name: "MediConnect Portal",
            slug: "mediconnect-portal",
            category: "Healthcare",
            categories: ["Healthcare"],
            shortDescription: "Telehealth and patient management portal with HIPAA compliance, WebRTC consultations, and medical logs.",
            longDescription: "MediConnect streamlines patient-doctor interactions by offering HIPAA-compliant online consultations, digital prescription logs, and a user-friendly scheduler.",
            challenge: "A leading healthcare network wanting to reduce wait times and offer secure virtual consultations during peak hours, needing end-to-end encryption and a reliable video platform.",
            solution: "Developed a secure healthcare portal using WebRTC for encrypted browser consultations, combined with a Mongoose backend that encrypts PHI at rest and provides role-based portal access.",
            featuresList: ["HIPAA-compliant WebRTC consultations", "Encrypted PHI Records", "Automated Appointments Scheduler", "Digital Prescriptions Portal"],
            techStack: ["React", "Node.js", "MongoDB", "Express", "WebRTC"],
            clientName: "MediConnect Health Group",
            clientLogo: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=100&q=80",
            completionYear: "2025",
            results: [
                "10k+ Monthly Virtual Calls",
                "99.8% Video Stream Reliability",
                "45% Wait Time Reduction",
                "100% HIPAA Compliance Score"
            ],
            testimonialQuote: "WebNest delivered a secure, reliable, and user-friendly platform that has completely modernized how our doctors connect with patients.",
            testimonialAuthor: "Dr. Amit Verma",
            testimonialRole: "Chief Medical Officer",
            testimonialCompany: "MediConnect Health Group",
            testimonialPhoto: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=200&q=80",
            color: "from-teal-500/20 to-cyan-500/20",
            accent: "bg-teal-600",
            desktopImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
            image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
            mobileImage: "https://images.unsplash.com/photo-1511174511562-5f7f18b854f8?auto=format&fit=crop&w=600&q=80",
            thumbnail: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
            coverImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
            gallery: [
                "https://images.unsplash.com/photo-1504813184591-015578f7c975?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&w=800&q=80"
            ],
            status: "published",
            isFeatured: true,
            order: 3
        },
        {
            title: "EduLearn Academy",
            name: "EduLearn Academy",
            slug: "edulearn-academy",
            category: "Education",
            categories: ["Education"],
            shortDescription: "Interactive learning management system with intuitive course builders, quizzes, and student logs.",
            longDescription: "EduLearn Academy gamifies online education, allowing schools to craft custom curriculums and track student progress visually.",
            challenge: "A private tutoring institution suffered from low course completion rates (18%) because of their disjointed, slow legacy course platform.",
            solution: "Engineered a streamlined Next.js dashboard featuring cached video loading, micro-credentials generation, and interactive assessments that sync with MongoDB.",
            featuresList: ["Interactive Course Builder", "Automated Quizzing Engine", "Dynamic Student Analytics", "Micro-Credentials Generation"],
            techStack: ["Next.js", "Node.js", "Express", "MongoDB", "Framer Motion"],
            clientName: "EduLearn Global",
            clientLogo: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=100&q=80",
            completionYear: "2024",
            results: [
                "200% Increase in Course Comp.",
                "100k+ Active Global Students",
                "4.8/5 Star Platform Rating",
                "Reduced load times by 65%"
            ],
            testimonialQuote: "WebNest designed an incredibly clean and motivating interface. Our students are finishing more courses than ever.",
            testimonialAuthor: "Sarah Jenkins",
            testimonialRole: "Director of Learning",
            testimonialCompany: "EduLearn Global",
            testimonialPhoto: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
            color: "from-amber-500/20 to-orange-500/20",
            accent: "bg-amber-600",
            desktopImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
            image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
            mobileImage: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80",
            thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
            coverImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
            gallery: [
                "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80"
            ],
            status: "published",
            isFeatured: false,
            order: 4
        },
        {
            title: "NeuroAnalytics AI",
            name: "NeuroAnalytics AI",
            slug: "neuroanalytics-ai",
            category: "AI",
            categories: ["AI"],
            shortDescription: "AI-driven customer sentiment analysis platform processing live chats and calls.",
            longDescription: "NeuroAnalytics AI parses enterprise support streams in real-time, delivering immediate customer mood analysis and response ideas.",
            challenge: "An enterprise SaaS firm had customer reviews and transcripts scattered across multiple tools, making it impossible to analyze customer friction points dynamically.",
            solution: "Built a centralized intelligence dashboard integrating OpenAI's API to summarize logs, score customer sentiment, and suggest resolution actions in under 200ms.",
            featuresList: ["Real-time Sentiment Pipeline", "OpenAI API Integration", "Customer Friction Tracker", "Automated Auto-response Agent"],
            techStack: ["Next.js", "Python", "FastAPI", "MongoDB", "Tailwind CSS"],
            clientName: "NeuroAnalytics Inc.",
            clientLogo: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=100&q=80",
            completionYear: "2025",
            results: [
                "5M+ Transcripts Processed Daily",
                "95% Sentiment Accuracy",
                "60% Reduced Support Times",
                "28% Net Promoter Score Increase"
            ],
            testimonialQuote: "The insights generated by NeuroAnalytics have completely changed our product roadmap decisions. WebNest's AI integration is top-notch.",
            testimonialAuthor: "Mark Cubert",
            testimonialRole: "VP of Customer Success",
            testimonialCompany: "NeuroAnalytics Inc.",
            testimonialPhoto: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80",
            color: "from-purple-500/20 to-indigo-500/20",
            accent: "bg-purple-600",
            desktopImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
            mobileImage: "https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&w=600&q=80",
            thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
            coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
            gallery: [
                "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80"
            ],
            status: "published",
            isFeatured: false,
            order: 5
        },
        {
            title: "PayFlow Gateway",
            name: "PayFlow Gateway",
            slug: "payflow-gateway",
            category: "FinTech",
            categories: ["FinTech"],
            shortDescription: "Secure B2B remittance and global billing gateway with automated tax compliance rules.",
            longDescription: "PayFlow scales cross-border business transactions with smart currency routing, automated invoice generation, and Stripe integrations.",
            challenge: "B2B companies faced high conversion fees and slow wire transfers (3-5 days) when paying international developers and partners.",
            solution: "Developed an API-driven global payment gateway that leverages Stripe treasury accounts to clear international transactions within minutes.",
            featuresList: ["Multi-Currency Smart Routing", "Automated KYC Verification", "Stripe API Integration", "Dynamic Localized Invoicing"],
            techStack: ["Next.js", "Express", "MongoDB", "Stripe API", "Node.js"],
            clientName: "PayFlow Finance",
            clientLogo: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=100&q=80",
            completionYear: "2025",
            results: [
                "$250M+ Annual Remittances",
                "0.0% Fraudulent Charge Rate",
                "remittance time cut to < 3 min",
                "Saved clients $1.2M in fees"
            ],
            testimonialQuote: "Security was our biggest concern, and WebNest passed every compliance audit with flying colors. A premium development partner.",
            testimonialAuthor: "Elena Rostova",
            testimonialRole: "CTO",
            testimonialCompany: "PayFlow Finance",
            testimonialPhoto: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
            color: "from-emerald-500/20 to-teal-500/20",
            accent: "bg-emerald-600",
            desktopImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
            mobileImage: "https://images.unsplash.com/photo-1536412597336-ade7b523ecfc?auto=format&fit=crop&w=600&q=80",
            thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
            coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
            gallery: [
                "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1589758438368-0ad531db3366?auto=format&fit=crop&w=800&q=80"
            ],
            status: "published",
            isFeatured: false,
            order: 6
        },
        {
            title: "FitPulse App",
            name: "FitPulse App",
            slug: "fitpulse-app",
            category: "Mobile",
            categories: ["Mobile"],
            shortDescription: "Cross-platform mobile workout companion app syncing biometrics from wearables.",
            longDescription: "FitPulse connects fitness enthusiasts to customized gym workout plans and plots heart rate stats using lightweight MongoDB endpoints.",
            challenge: "A national gym chain wanted a responsive app to connect members to trainers, track user metrics, and load biometric charts quickly in offline locker rooms.",
            solution: "Created a React Native companion app integrated with wearable biometric endpoints and a local database cache that syncs to MongoDB in the background.",
            featuresList: ["Wearable API Synchronization", "Offline Bio-metric Cache", "SVG Progress Charts", "Direct Trainer Chat System"],
            techStack: ["React Native", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
            clientName: "FitPulse Fitness",
            clientLogo: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=100&q=80",
            completionYear: "2024",
            results: [
                "500k+ Active App Downloads",
                "90% Month-1 User Retention",
                "Integrated with 10+ wearables",
                "4.9 Apple App Store rating"
            ],
            testimonialQuote: "Our members love the FitPulse companion app. It's fluid, reliable, and perfectly tracks their progress and workouts offline.",
            testimonialAuthor: "Chris Evans",
            testimonialRole: "Fitness Director",
            testimonialCompany: "FitPulse Fitness",
            testimonialPhoto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
            color: "from-red-500/20 to-orange-500/20",
            accent: "bg-red-600",
            desktopImage: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80",
            image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80",
            mobileImage: "https://images.unsplash.com/photo-1510051640316-ecc39186b64b?auto=format&fit=crop&w=600&q=80",
            thumbnail: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80",
            coverImage: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80",
            gallery: [
                "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80"
            ],
            status: "published",
            isFeatured: false,
            order: 7
        }
    ];
    for (const p of mockProjects) {
        await ProjectModel.create(p);
        console.log(`  + Created project: "${p.name}"`);
    }
    console.log('✅ Seeding Projects complete.');
}
async function run() {
    await (0, db_1.connectDB)();
    console.log('Connected to MongoDB. Starting database seed...');
    await seedHero();
    await seedStats();
    await seedServices();
    await seedProcess();
    await seedTech();
    await seedTestimonials();
    await seedWhyUs();
    await seedBlog();
    await seedFaq();
    await seedNavigation();
    await seedFooter();
    await seedSettings();
    await seedProjects();
    console.log('\n🎉 ALL CMS DATA SEEDED SUCCESSFULLY TO MONGODB!');
    mongoose_1.default.connection.close();
}
run();
