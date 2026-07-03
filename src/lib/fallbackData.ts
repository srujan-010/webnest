// src/lib/fallbackData.ts

export const heroProjects = [
  {
    id: "swastika",
    name: "Swastika Sarees",
    category: "E-Commerce",
    description: "Luxury saree e-commerce platform with seamless payment integration.",
    desktopImage: "/projects/swastika_sarees.png",
    mobileImage: "/projects/swastika_sarees.png",
    thumbnailImage: "/projects/swastika_sarees.png",
    tech: ["Next.js", "Tailwind", "Stripe"]
  },
  {
    id: "shoppulse",
    name: "ShopPulse POS",
    category: "Web Application",
    description: "Modern inventory and billing dashboard for retail businesses.",
    desktopImage: "/projects/shoppulse_pos.png",
    mobileImage: "/projects/shoppulse_pos.png",
    thumbnailImage: "/projects/shoppulse_pos.png",
    tech: ["React", "Node.js", "MongoDB"]
  },
  {
    id: "suryodaya",
    name: "Suryodaya Farms",
    category: "E-Commerce",
    description: "Organic farming and agricultural products digital storefront.",
    desktopImage: "/projects/suryodaya_farms.png",
    mobileImage: "/projects/suryodaya_farms.png",
    thumbnailImage: "/projects/suryodaya_farms.png",
    tech: ["Next.js", "Tailwind", "PostgreSQL"]
  },
  {
    id: "tsquadron",
    name: "TSquadron",
    category: "Corporate Site",
    description: "B2B digital solutions company website with modern aesthetics.",
    desktopImage: "/projects/tsquadron.png",
    mobileImage: "/projects/tsquadron.png",
    thumbnailImage: "/projects/tsquadron.png",
    tech: ["React", "Framer Motion", "Tailwind"]
  },
  {
    id: "ima",
    name: "IMA Warangal",
    category: "Organization Site",
    description: "Professional medical association platform and directory.",
    desktopImage: "/projects/ima_warangal.png",
    mobileImage: "/projects/ima_warangal.png",
    thumbnailImage: "/projects/ima_warangal.png",
    tech: ["React", "Node.js", "MongoDB"]
  }
];

export const services = [
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

export const faqs = [
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

export const projects = [
  {
    name: "ShopPluse POS",
    category: "Web Application",
    description: "A comprehensive point-of-sale and inventory management system designed for multi-store retail operations with real-time syncing.",
    features: ["Real-time Inventory", "Multi-store Support", "Advanced Analytics"],
    tech: ["Next.js", "Node.js", "MongoDB", "Socket.io"],
    color: "from-blue-500/20 to-cyan-500/20",
    accent: "bg-blue-500"
  },
  {
    name: "Swastika Sarees",
    category: "E-Commerce",
    description: "Premium ethnic wear e-commerce platform featuring immersive high-resolution product viewing and seamless checkout flows.",
    features: ["Custom Shopping Cart", "Razorpay Integration", "Dynamic Search"],
    tech: ["React", "Express", "Redux", "Tailwind"],
    color: "from-rose-500/20 to-pink-500/20",
    accent: "bg-rose-500"
  },
  {
    name: "Suryodaya Farms",
    category: "Business Website",
    description: "Digital presence for an organic farming cooperative, highlighting sustainable practices and direct-to-consumer sales.",
    features: ["Storytelling UX", "Product Catalog", "Newsletter"],
    tech: ["Next.js", "Framer Motion", "Sanity CMS"],
    color: "from-green-500/20 to-emerald-500/20",
    accent: "bg-green-500"
  },
  {
    name: "TSquadron",
    category: "Corporate Portal",
    description: "Secure internal portal for a security services firm, managing deployments, shifts, and client communications.",
    features: ["Role-based Access", "Shift Scheduling", "Secure Messaging"],
    tech: ["React", "Firebase", "Tailwind"],
    color: "from-slate-600/20 to-slate-800/20",
    accent: "bg-slate-700"
  }
];

export const processSteps = [
  { id: "01", title: "Discover", icon: "Search", desc: "Deep dive into your business goals, target audience, and technical requirements." },
  { id: "02", title: "Plan", icon: "PenTool", desc: "Strategic blueprinting, architecture design, and project roadmapping." },
  { id: "03", title: "Design", icon: "Layout", desc: "Crafting bespoke, user-centric wireframes and high-fidelity UI designs." },
  { id: "04", title: "Develop", icon: "Code2", desc: "Agile engineering using modern, scalable tech stacks and clean code." },
  { id: "05", title: "Test", icon: "TestTube", desc: "Rigorous QA, performance profiling, and security auditing." },
  { id: "06", title: "Launch", icon: "Rocket", desc: "Seamless deployment to production environments and zero-downtime go-live." },
  { id: "07", title: "Support", icon: "Headphones", desc: "Continuous monitoring, maintenance, and iterative feature enhancements." },
];

export const techStack = [
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

export const testimonials = [
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

export const team = [
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

export const stats = [
  { value: 30, suffix: "+", label: "Projects Delivered" },
  { value: 20, suffix: "+", label: "Happy Clients" },
  { value: 99, suffix: "%", label: "Client Satisfaction" },
  { value: 5, suffix: "+", label: "Industries Served" },
];

export const navLinks = [
  { name: "About", href: "/about" },
  { name: "Process", href: "/process" },
  { name: "Technologies", href: "/technologies" },
  { name: "Blog", href: "/blog" },
];

export const navServices = [
  { name: "Business Websites", icon: "Monitor", href: "/services#business-websites", desc: "Corporate and brand identity platforms" },
  { name: "Web Applications", icon: "Smartphone", href: "/services#web-applications", desc: "Complex SaaS and custom platforms" },
  { name: "E-Commerce", icon: "ShoppingCart", href: "/services#e-commerce", desc: "High-conversion online stores" },
  { name: "Admin Dashboards", icon: "LayoutDashboard", href: "/services#admin-dashboards", desc: "Internal tools and data visualization" },
  { name: "SEO & Growth", icon: "Search", href: "/services#seo", desc: "Technical and content optimization" },
  { name: "Maintenance", icon: "Wrench", href: "/services#maintenance", desc: "Ongoing support and updates" },
];

export const footerContent = {
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

export const whyUsReasons = [
  { title: "Fast Delivery", text: "Optimized workflows ensuring rapid deployment without compromising quality." },
  { title: "Premium UI", text: "Bespoke, handcrafted interfaces that elevate your brand's digital presence." },
  { title: "SEO Friendly", text: "Built-in technical SEO best practices to rank higher from day one." },
  { title: "Responsive Design", text: "Flawless execution across mobile, tablet, and desktop breakpoints." },
  { title: "Secure Code", text: "Enterprise-grade security standards and vulnerability protection." },
  { title: "Scalable Architecture", text: "Modern stacks designed to grow seamlessly with your user base." },
  { title: "Affordable Pricing", text: "Transparent, value-driven pricing structures for maximum ROI." },
  { title: "24/7 Support", text: "Dedicated maintenance and support long after launch." },
];
