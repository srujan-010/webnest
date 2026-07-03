"use strict";
// src/lib/fallbackData.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.whyUsReasons = exports.footerContent = exports.navServices = exports.navLinks = exports.stats = exports.team = exports.testimonials = exports.techStack = exports.processSteps = exports.projects = exports.faqs = exports.services = exports.heroProjects = void 0;
exports.heroProjects = [
    {
        id: "swastika",
        name: "Swastika Sarees",
        category: "E-Commerce",
        description: "Luxury saree e-commerce platform with seamless payment integration.",
        image: "/projects/swastika_sarees.png",
        tech: ["Next.js", "Tailwind", "Stripe"]
    },
    {
        id: "shoppulse",
        name: "ShopPulse POS",
        category: "Web Application",
        description: "Modern inventory and billing dashboard for retail businesses.",
        image: "/projects/shoppulse_pos.png",
        tech: ["React", "Node.js", "MongoDB"]
    },
    {
        id: "suryodaya",
        name: "Suryodaya Farms",
        category: "E-Commerce",
        description: "Organic farming and agricultural products digital storefront.",
        image: "/projects/suryodaya_farms.png",
        tech: ["Next.js", "Tailwind", "PostgreSQL"]
    },
    {
        id: "tsquadron",
        name: "TSquadron",
        category: "Corporate Site",
        description: "B2B digital solutions company website with modern aesthetics.",
        image: "/projects/tsquadron.png",
        tech: ["React", "Framer Motion", "Tailwind"]
    },
    {
        id: "ima",
        name: "IMA Warangal",
        category: "Organization Site",
        description: "Professional medical association platform and directory.",
        image: "/projects/ima_warangal.png",
        tech: ["React", "Node.js", "MongoDB"]
    }
];
exports.services = [
    {
        title: "Web Applications",
        description: "Scalable, high-performance web apps built with modern React and Next.js architectures. Tailored for complex business logic.",
        icon: "Code2",
        className: "lg:col-span-2 bg-brand-600 text-white border-brand-500",
        iconClass: "text-brand-200",
        textClass: "text-brand-100",
        buttonClass: "text-white hover:text-brand-200",
        large: true
    },
    {
        title: "E-Commerce",
        description: "Conversion-optimized storefronts with seamless payment integration.",
        icon: "ShoppingCart",
        className: "lg:col-span-2 bg-white border-gray-100",
        iconClass: "text-brand-600",
        textClass: "text-ink-600",
        buttonClass: "text-brand-600 hover:text-brand-700"
    },
    {
        title: "UI/UX Design",
        description: "Premium, user-centric interfaces that engage and convert.",
        icon: "Paintbrush",
        className: "lg:col-span-1 bg-white border-gray-100",
        iconClass: "text-accent-violet",
        textClass: "text-ink-600",
        buttonClass: "text-accent-violet hover:text-accent-violet/80"
    },
    {
        title: "Business Sites",
        description: "Professional landing pages that establish authority.",
        icon: "MonitorSmartphone",
        className: "lg:col-span-1 bg-white border-gray-100",
        iconClass: "text-accent-cyan",
        textClass: "text-ink-600",
        buttonClass: "text-accent-cyan hover:text-accent-cyan/80"
    },
    {
        title: "Admin Dashboards",
        description: "Intuitive internal tools for managing your data and workflows efficiently.",
        icon: "LayoutDashboard",
        className: "lg:col-span-2 bg-surface-50 border-gray-200/60",
        iconClass: "text-brand-500",
        textClass: "text-ink-600",
        buttonClass: "text-brand-600 hover:text-brand-700"
    },
    {
        title: "Technical SEO",
        description: "Architecture optimized for search engine visibility.",
        icon: "Search",
        className: "lg:col-span-1 bg-white border-gray-100",
        iconClass: "text-emerald-500",
        textClass: "text-ink-600",
        buttonClass: "text-emerald-500 hover:text-emerald-600"
    },
    {
        title: "Secure Hosting",
        description: "Fast, reliable cloud infrastructure deployment.",
        icon: "Server",
        className: "lg:col-span-1 bg-white border-gray-100",
        iconClass: "text-blue-500",
        textClass: "text-ink-600",
        buttonClass: "text-blue-500 hover:text-blue-600"
    },
    {
        title: "Maintenance",
        description: "Ongoing support and security updates.",
        icon: "ShieldCheck",
        className: "lg:col-span-2 bg-white border-gray-100",
        iconClass: "text-amber-500",
        textClass: "text-ink-600",
        buttonClass: "text-amber-500 hover:text-amber-600"
    }
];
exports.faqs = [
    {
        question: "What is your typical project timeline?",
        answer: "Project timelines vary based on complexity. A standard corporate website typically takes 4-6 weeks, while a custom web application or e-commerce platform can take 8-16 weeks from discovery to launch."
    },
    {
        question: "Do you provide ongoing support after launch?",
        answer: "Yes, we offer comprehensive maintenance and support packages. This includes security monitoring, performance optimization, regular updates, and a dedicated block of hours for iterative feature enhancements."
    },
    {
        question: "Will my website be optimized for SEO?",
        answer: "Absolutely. Technical SEO is built into our core development process. We ensure optimal site speed, semantic HTML structure, proper meta tags, dynamic sitemaps, and mobile responsiveness to give you the best foundation for search rankings."
    },
    {
        question: "What technologies do you use?",
        answer: "We specialize in modern JavaScript/TypeScript ecosystems. Our primary stack includes React, Next.js, Node.js, and Tailwind CSS. For databases, we use PostgreSQL or MongoDB depending on data structure requirements."
    },
    {
        question: "How do you handle project management and communication?",
        answer: "We believe in radical transparency. You'll have direct access to a dedicated project manager, regular sync calls, and access to our project management dashboard (Jira/Linear) to track progress in real-time."
    }
];
exports.projects = [
    {
        title: "ShopPluse POS",
        name: "ShopPluse POS",
        slug: "shoppulse-pos",
        categories: ["Web Application", "SaaS"],
        category: "Web Application",
        shortDescription: "A comprehensive point-of-sale and inventory management system designed for multi-store retail operations with real-time syncing.",
        description: "A comprehensive point-of-sale and inventory management system designed for multi-store retail operations with real-time syncing.",
        longDescription: "ShopPluse POS solves the multi-channel inventory synchronization problem for high-growth retailers. It integrates physical barcode scanning, receipt generation, and real-time ledger accounting into a unified browser experience.",
        desktopImage: "/projects/shoppulse_pos.png",
        image: "/projects/shoppulse_pos.png",
        mobileImage: "/projects/shoppulse_mobile.png",
        gallery: [],
        liveUrl: "https://shoppulse-pos.webnest.agency",
        websiteUrl: "https://shoppulse-pos.webnest.agency",
        caseStudyUrl: "/portfolio/shoppulse-pos",
        caseStudyContent: "<h3>The Challenge</h3><p>Retailers struggle with fragmented inventory datasets.</p><h3>Our Solution</h3><p>We engineered a localized database architecture syncing to a central MongoDB server via WebSockets.</p>",
        isFeatured: true,
        featuresList: ["Real-time Inventory", "Multi-store Support", "Advanced Analytics"],
        features: ["Real-time Inventory", "Multi-store Support", "Advanced Analytics"],
        techStack: ["Next.js", "Node.js", "MongoDB", "Socket.io"],
        tech: ["Next.js", "Node.js", "MongoDB", "Socket.io"],
        color: "from-blue-500/20 to-cyan-500/20",
        accent: "bg-blue-500",
        order: 0,
        status: "published"
    },
    {
        title: "Swastika Sarees",
        name: "Swastika Sarees",
        slug: "swastika-sarees",
        categories: ["E-Commerce", "Retail"],
        category: "E-Commerce",
        shortDescription: "Premium ethnic wear e-commerce platform featuring immersive high-resolution product viewing and seamless checkout flows.",
        description: "Premium ethnic wear e-commerce platform featuring immersive high-resolution product viewing and seamless checkout flows.",
        longDescription: "Swastika Sarees brings the heritage of traditional sarees to a global customer base. The digital storefront handles intensive media collections and integrates customized payment gateways for seamless cross-border shipping.",
        desktopImage: "/projects/swastika_sarees.png",
        image: "/projects/swastika_sarees.png",
        mobileImage: "/projects/swastika_mobile.png",
        gallery: [],
        liveUrl: "https://swastikasarees.com",
        websiteUrl: "https://swastikasarees.com",
        caseStudyUrl: "/portfolio/swastika-sarees",
        caseStudyContent: "<h3>The Challenge</h3><p>High-resolution textile imagery can degrade site performance and slow checkout flows.</p><h3>Our Solution</h3><p>Using Next.js Image Optimization and Cloudinary CDN storage to serve images instantly.</p>",
        isFeatured: true,
        featuresList: ["Custom Shopping Cart", "Razorpay Integration", "Dynamic Search"],
        features: ["Custom Shopping Cart", "Razorpay Integration", "Dynamic Search"],
        techStack: ["React", "Express", "Redux", "Tailwind"],
        tech: ["React", "Express", "Redux", "Tailwind"],
        color: "from-rose-500/20 to-pink-500/20",
        accent: "bg-rose-500",
        order: 1,
        status: "published"
    },
    {
        title: "TSquadron",
        name: "TSquadron",
        slug: "tsquadron",
        categories: ["Corporate", "IT Services"],
        category: "Corporate",
        shortDescription: "Secure internal portal for a security services firm, managing deployments, shifts, and client communications.",
        description: "Secure internal portal for a security services firm, managing deployments, shifts, and client communications.",
        longDescription: "TSquadron provides elite staffing and security services. Their portal digitizes shift management, personnel tracking, and incident logging across client facilities.",
        desktopImage: "/projects/tsquadron.png",
        image: "/projects/tsquadron.png",
        mobileImage: "/projects/tsquadron_mobile.png",
        gallery: [],
        liveUrl: "https://tsquadron.com",
        websiteUrl: "https://tsquadron.com",
        caseStudyUrl: "/portfolio/tsquadron",
        caseStudyContent: "<h3>The Challenge</h3><p>Managing security guard rotations without coordination lag.</p><h3>Our Solution</h3><p>We built a drag-and-drop shift calendar linked with real-time push notifications.</p>",
        isFeatured: true,
        featuresList: ["Role-based Access", "Shift Scheduling", "Secure Messaging"],
        features: ["Role-based Access", "Shift Scheduling", "Secure Messaging"],
        techStack: ["React", "Firebase", "Tailwind"],
        tech: ["React", "Firebase", "Tailwind"],
        color: "from-slate-600/20 to-slate-800/20",
        accent: "bg-slate-700",
        order: 2,
        status: "published"
    },
    {
        title: "Suryodaya Farms",
        name: "Suryodaya Farms",
        slug: "suryodaya-farms",
        categories: ["E-Commerce", "Agriculture"],
        category: "E-Commerce",
        shortDescription: "Organic farming storefront highlighting direct-to-consumer delivery and agricultural subscriptions.",
        description: "Organic farming storefront highlighting direct-to-consumer delivery and agricultural subscriptions.",
        longDescription: "Suryodaya Farms bypasses distributors to deliver farm-fresh, chemical-free organic produce directly to urban homes through custom weekly crates.",
        desktopImage: "/projects/suryodaya_farms.png",
        image: "/projects/suryodaya_farms.png",
        mobileImage: "/projects/suryodaya_mobile.png",
        gallery: [],
        liveUrl: "https://suryodayafarms.com",
        websiteUrl: "https://suryodayafarms.com",
        caseStudyUrl: "/portfolio/suryodaya-farms",
        caseStudyContent: "<h3>The Challenge</h3><p>Managing dynamic agricultural yields and predicting customer supply crates.</p><h3>Our Solution</h3><p>Implemented smart delivery queues and subscription models for pre-ordering.</p>",
        isFeatured: true,
        featuresList: ["Storytelling UX", "Product Catalog", "Newsletter"],
        features: ["Storytelling UX", "Product Catalog", "Newsletter"],
        techStack: ["Next.js", "Framer Motion", "Sanity CMS"],
        tech: ["Next.js", "Framer Motion", "Sanity CMS"],
        color: "from-green-500/20 to-emerald-500/20",
        accent: "bg-green-500",
        order: 3,
        status: "published"
    },
    {
        title: "IMA Warangal",
        name: "IMA Warangal",
        slug: "ima-warangal",
        categories: ["Corporate", "Healthcare"],
        category: "Corporate",
        shortDescription: "Professional association portal and medical practitioner directory for the Indian Medical Association.",
        description: "Professional association portal and medical practitioner directory for the Indian Medical Association.",
        longDescription: "IMA Warangal hosts doctors' directories, event logging, CME trackers, and official communications to serve the medical practitioner group.",
        desktopImage: "/projects/ima_warangal.png",
        image: "/projects/ima_warangal.png",
        mobileImage: "/projects/ima_mobile.png",
        gallery: [],
        liveUrl: "https://imawarangal.org",
        websiteUrl: "https://imawarangal.org",
        caseStudyUrl: "/portfolio/ima-warangal",
        caseStudyContent: "<h3>The Challenge</h3><p>Keeping practitioner data verified and search indexable for public lookups.</p><h3>Our Solution</h3><p>We built a secured admin verification flow that indexes approved doctors to the public search directory.</p>",
        isFeatured: false,
        featuresList: ["Doctor Search Directory", "Event Registration", "Practitioner Login"],
        features: ["Doctor Search Directory", "Event Registration", "Practitioner Login"],
        techStack: ["React", "Node.js", "MongoDB"],
        tech: ["React", "Node.js", "MongoDB"],
        color: "from-indigo-500/20 to-purple-500/20",
        accent: "bg-indigo-600",
        order: 4,
        status: "published"
    },
    {
        title: "Nani Ka Chulha",
        name: "Nani Ka Chulha",
        slug: "nani-ka-chulha",
        categories: ["E-Commerce", "Food"],
        category: "E-Commerce",
        shortDescription: "Direct-to-consumer store for handcrafted traditional spice blends and organic pickles.",
        description: "Direct-to-consumer store for handcrafted traditional spice blends and organic pickles.",
        longDescription: "Nani Ka Chulha preserves traditional family recipes and delivers high-quality handground spices and pickles worldwide with zero preservatives.",
        desktopImage: "/projects/nanikachulha.png",
        image: "/projects/nanikachulha.png",
        mobileImage: "/projects/nanikachulha_mobile.png",
        gallery: [],
        liveUrl: "https://nanikachulha.com",
        websiteUrl: "https://nanikachulha.com",
        caseStudyUrl: "/portfolio/nani-ka-chulha",
        caseStudyContent: "<h3>The Challenge</h3><p>Conveying authenticity and home-made quality on a standardized ecommerce platform.</p><h3>Our Solution</h3><p>A warm display theme combining organic illustrations with modern performance design.</p>",
        isFeatured: false,
        featuresList: ["Gourmet Catalog", "Global Shipping Integration", "Customer Reviews"],
        features: ["Gourmet Catalog", "Global Shipping Integration", "Customer Reviews"],
        techStack: ["Next.js", "Tailwind CSS", "Shopify GraphQL"],
        tech: ["Next.js", "Tailwind CSS", "Shopify GraphQL"],
        color: "from-amber-500/20 to-orange-500/20",
        accent: "bg-amber-600",
        order: 5,
        status: "published"
    },
    {
        title: "Chitti Management System",
        name: "Chitti Management System",
        slug: "chitti-management-system",
        categories: ["Web Application", "SaaS"],
        category: "Web Application",
        shortDescription: "Comprehensive chit fund and financial ledger management platform for small and medium finance institutions.",
        description: "Comprehensive chit fund and financial ledger management platform for small and medium finance institutions.",
        longDescription: "Chitti Management System automates Chit group accounts, transaction journals, auction history, and commission calculations for financial firms.",
        desktopImage: "/projects/chitti.png",
        image: "/projects/chitti.png",
        mobileImage: "/projects/chitti_mobile.png",
        gallery: [],
        liveUrl: "https://chitti-cms.webnest.agency",
        websiteUrl: "https://chitti-cms.webnest.agency",
        caseStudyUrl: "/portfolio/chitti-management-system",
        caseStudyContent: "<h3>The Challenge</h3><p>Error-prone pen-paper ledgers leading to financial disputes in chit fund management.</p><h3>Our Solution</h3><p>A multi-tenant ledger engine with cryptographic logs for double-entry validation.</p>",
        isFeatured: false,
        featuresList: ["Ledger Audit Trails", "SMS Notification Gateway", "Auction Calculators"],
        features: ["Ledger Audit Trails", "SMS Notification Gateway", "Auction Calculators"],
        techStack: ["React", "Express", "PostgreSQL", "Twilio API"],
        tech: ["React", "Express", "PostgreSQL", "Twilio API"],
        color: "from-teal-500/20 to-emerald-500/20",
        accent: "bg-teal-600",
        order: 6,
        status: "published"
    },
    {
        title: "Recharge Platform",
        name: "Recharge Platform",
        slug: "recharge-platform",
        categories: ["Web Application", "Fintech"],
        category: "Web Application",
        shortDescription: "API gateway and client dashboard for processing mobile recharge and utility bill payments.",
        description: "API gateway and client dashboard for processing mobile recharge and utility bill payments.",
        longDescription: "Recharge Platform aggregates dynamic operators to support instant prepaid top-ups, DTH activation, and electricity bill settlements through clean reseller dashboards.",
        desktopImage: "/projects/recharge.png",
        image: "/projects/recharge.png",
        mobileImage: "/projects/recharge_mobile.png",
        gallery: [],
        liveUrl: "https://recharge.webnest.agency",
        websiteUrl: "https://recharge.webnest.agency",
        caseStudyUrl: "/portfolio/recharge-platform",
        caseStudyContent: "<h3>The Challenge</h3><p>Connecting with multiple operator endpoints that fail frequently or timeout.</p><h3>Our Solution</h3><p>We built a load-balanced retry queue engine that routes transaction requests instantly.</p>",
        isFeatured: false,
        featuresList: ["High-throughput API", "Agent Commission Ledgers", "Instant Settlements"],
        features: ["High-throughput API", "Agent Commission Ledgers", "Instant Settlements"],
        techStack: ["Next.js", "Go", "Redis", "MongoDB"],
        tech: ["Next.js", "Go", "Redis", "MongoDB"],
        color: "from-violet-500/20 to-purple-500/20",
        accent: "bg-violet-600",
        order: 7,
        status: "published"
    }
];
exports.processSteps = [
    { id: "01", title: "Discover", icon: "Search", desc: "Deep dive into your business goals, target audience, and technical requirements." },
    { id: "02", title: "Plan", icon: "PenTool", desc: "Strategic blueprinting, architecture design, and project roadmapping." },
    { id: "03", title: "Design", icon: "Layout", desc: "Crafting bespoke, user-centric wireframes and high-fidelity UI designs." },
    { id: "04", title: "Develop", icon: "Code2", desc: "Agile engineering using modern, scalable tech stacks and clean code." },
    { id: "05", title: "Test", icon: "TestTube", desc: "Rigorous QA, performance profiling, and security auditing." },
    { id: "06", title: "Launch", icon: "Rocket", desc: "Seamless deployment to production environments and zero-downtime go-live." },
    { id: "07", title: "Support", icon: "Headphones", desc: "Continuous monitoring, maintenance, and iterative feature enhancements." },
];
exports.techStack = [
    { name: "React", Icon: "FaReact" },
    { name: "Next.js", Icon: "SiNextdotjs" },
    { name: "TypeScript", Icon: "SiTypescript" },
    { name: "Tailwind CSS", Icon: "SiTailwindcss" },
    { name: "Node.js", Icon: "FaNodeJs" },
    { name: "MongoDB", Icon: "SiMongodb" },
    { name: "PostgreSQL", Icon: "SiPostgresql" },
    { name: "Framer Motion", Icon: "SiFramer" },
    { name: "GSAP", Icon: "SiGreensock" },
    { name: "AWS", Icon: "FaAws" },
];
exports.testimonials = [
    {
        quote: "WebNest completely transformed our digital presence. Their attention to detail and engineering quality is unmatched. Our conversion rate doubled within a month.",
        author: "Sarah Jenkins",
        role: "CEO, Swastika Sarees",
        rating: 5
    },
    {
        quote: "The point-of-sale system they built for us handles thousands of transactions daily without a hiccup. Truly enterprise-grade software.",
        author: "Michael Chen",
        role: "Director, ShopPluse",
        rating: 5
    },
    {
        quote: "They don't just write code; they understand business. Every feature they proposed added tangible value to our bottom line.",
        author: "David Sharma",
        role: "Founder, Suryodaya Farms",
        rating: 5
    },
    {
        quote: "Flawless execution from discovery to launch. The UI is stunning and the performance is incredibly fast.",
        author: "Emily Taylor",
        role: "CTO, TSquadron",
        rating: 5
    }
];
exports.team = [
    {
        name: "Alex Sterling",
        role: "Technical Director",
        skills: ["Architecture", "Next.js", "Cloud"],
        color: "from-brand-500 to-accent-violet"
    },
    {
        name: "Sarah Chen",
        role: "Lead Designer",
        skills: ["UI/UX", "Design Systems", "Framer"],
        color: "from-accent-violet to-pink-500"
    },
    {
        name: "Marcus Johnson",
        role: "Senior Engineer",
        skills: ["React", "Node.js", "Performance"],
        color: "from-accent-cyan to-brand-400"
    },
];
exports.stats = [
    { value: 30, suffix: "+", label: "Projects Delivered" },
    { value: 20, suffix: "+", label: "Happy Clients" },
    { value: 99, suffix: "%", label: "Client Satisfaction" },
    { value: 5, suffix: "+", label: "Industries Served" },
];
exports.navLinks = [
    { name: "About", href: "/about" },
    { name: "Process", href: "/process" },
    { name: "Technologies", href: "/technologies" },
    { name: "Blog", href: "/blog" },
];
exports.navServices = [
    { name: "Business Websites", icon: "Monitor", href: "/services#business-websites", desc: "Corporate and brand identity platforms" },
    { name: "Web Applications", icon: "Smartphone", href: "/services#web-applications", desc: "Complex SaaS and custom platforms" },
    { name: "E-Commerce", icon: "ShoppingCart", href: "/services#e-commerce", desc: "High-conversion online stores" },
    { name: "Admin Dashboards", icon: "LayoutDashboard", href: "/services#admin-dashboards", desc: "Internal tools and data visualization" },
    { name: "SEO & Growth", icon: "Search", href: "/services#seo", desc: "Technical and content optimization" },
    { name: "Maintenance", icon: "Wrench", href: "/services#maintenance", desc: "Ongoing support and updates" },
];
exports.footerContent = {
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
};
exports.whyUsReasons = [
    { title: "Fast Delivery", text: "Optimized workflows ensuring rapid deployment without compromising quality." },
    { title: "Premium UI", text: "Bespoke, handcrafted interfaces that elevate your brand's digital presence." },
    { title: "SEO Friendly", text: "Built-in technical SEO best practices to rank higher from day one." },
    { title: "Responsive Design", text: "Flawless execution across mobile, tablet, and desktop breakpoints." },
    { title: "Secure Code", text: "Enterprise-grade security standards and vulnerability protection." },
    { title: "Scalable Architecture", text: "Modern stacks designed to grow seamlessly with your user base." },
    { title: "Affordable Pricing", text: "Transparent, value-driven pricing structures for maximum ROI." },
    { title: "24/7 Support", text: "Dedicated maintenance and support long after launch." },
];
