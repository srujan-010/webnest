"use client";

import { CrudTable } from "@/components/admin/CrudTable";

export default function AdminProjects() {
  return (
    <CrudTable
      title="Projects"
      endpoint="projects"
      publishable
      reorderable
      layout="grid"
      columns={[
        { key: "title", label: "Project Title", render: (v) => <span className="font-semibold text-gray-900">{v}</span> },
        { key: "category", label: "Primary Category" },
        { key: "shortDescription", label: "Short Description", render: (v) => <span className="text-sm text-gray-500 truncate max-w-xs inline-block">{v}</span> },
        { key: "status", label: "Status", render: (v) => (
          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${v === "published" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>
            {v === "published" ? "Live" : "Draft"}
          </span>
        )},
      ]}
      formConfig={[
        // Basic Info
        { key: "title", label: "Project Title", type: "text", required: true, maxLength: 80 },
        { key: "slug", label: "URL Slug", type: "text", placeholder: "my-project", hint: "Auto-generated from title if left blank." },
        { key: "category", label: "Primary Category", type: "select", required: true, options: [
          { value: "E-Commerce", label: "E-Commerce" },
          { value: "Web Application", label: "Web Application" },
          { value: "Corporate", label: "Corporate" },
          { value: "SaaS", label: "SaaS" },
          { value: "Mobile App", label: "Mobile App" },
        ]},
        { key: "shortDescription", label: "Short Description", type: "textarea", required: true, maxLength: 200 },
        
        // Hero / Overview (Case Study)
        { key: "clientName", label: "Client Name", type: "text" },
        { key: "clientLogo", label: "Client Logo (URL)", type: "image" },
        { key: "role", label: "WebNest Role", type: "text", placeholder: "e.g., Full Stack Development & UI/UX" },
        { key: "timeline", label: "Timeline", type: "text", placeholder: "e.g., 4 Months" },
        { key: "completionYear", label: "Completion Year", type: "text", placeholder: "e.g., 2024" },
        { key: "businessGoal", label: "Business Goal", type: "textarea" },
        { key: "targetAudience", label: "Target Audience", type: "text" },
        { key: "industry", label: "Industry", type: "text" },
        { key: "platform", label: "Platform", type: "text", placeholder: "e.g., Web, iOS, Android" },
        
        // Challenge (Case Study)
        { key: "challenge", label: "Challenge Overview", type: "textarea" },
        { key: "clientProblems", label: "Client Problems", type: "richtext" },
        { key: "businessPainPoints", label: "Business Pain Points", type: "richtext" },
        { key: "technicalChallenges", label: "Technical Challenges", type: "richtext" },
        { key: "oldWorkflow", label: "Old Workflow", type: "textarea" },
        { key: "limitations", label: "Limitations", type: "textarea" },
        
        // Solution & Features (Case Study)
        { key: "solution", label: "Solution Overview", type: "textarea" },
        { key: "solutionCards", label: "Solution Cards (JSON Array of {title, description, icon})", type: "json" },
        { key: "featureHighlights", label: "Feature Highlights (JSON Array of {title, description, icon, image})", type: "json" },
        
        // Images & Mockups
        { key: "desktopImage", label: "Desktop Mockup", type: "image" },
        { key: "mockupTablet", label: "Tablet Mockup", type: "image" },
        { key: "mobileImage", label: "Mobile Mockup", type: "image" },
        { key: "galleryItems", label: "Product Gallery (JSON Array of {url, type})", type: "json" },
        
        // Process & Architecture
        { key: "designProcess", label: "Design Process (JSON Array of {title, description, milestone})", type: "json" },
        { key: "systemArchitecture.image", label: "Architecture Diagram (URL)", type: "image" },
        { key: "systemArchitecture.description", label: "Architecture Description", type: "textarea" },
        
        // Tech Stack
        { key: "techStackDetails", label: "Tech Stack Details (JSON Array of {technology, purpose, whySelected})", type: "json" },
        
        // Admin Panel Showcase
        { key: "adminPanel.description", label: "Admin Panel Description", type: "textarea" },
        { key: "adminPanel.features", label: "Admin Panel Features (Tags)", type: "tags" },
        { key: "adminPanel.screenshots", label: "Admin Panel Screenshots (Tags of URLs)", type: "tags" },

        // Performance & Results
        { key: "performanceMetrics.performance", label: "Performance Score (0-100)", type: "number" },
        { key: "performanceMetrics.seo", label: "SEO Score (0-100)", type: "number" },
        { key: "performanceMetrics.accessibility", label: "Accessibility Score (0-100)", type: "number" },
        { key: "performanceMetrics.bestPractices", label: "Best Practices Score (0-100)", type: "number" },
        { key: "results", label: "Key Results / Business Impact (Tags)", type: "tags" },
        
        // Testimonial
        { key: "testimonialQuote", label: "Testimonial Quote", type: "textarea" },
        { key: "testimonialAuthor", label: "Testimonial Author", type: "text" },
        { key: "testimonialRole", label: "Testimonial Role", type: "text" },
        { key: "testimonialCompany", label: "Testimonial Company", type: "text" },
        { key: "testimonialPhoto", label: "Testimonial Photo (URL)", type: "image" },

        // Insights & FAQ
        { key: "lessonsLearned", label: "Lessons Learned (JSON Array of {challenge, solution, insight})", type: "json" },
        { key: "faqs", label: "FAQs (JSON Array of {question, answer})", type: "json" },

        // SEO & Meta
        { key: "seo.metaTitle", label: "SEO Meta Title", type: "text" },
        { key: "seo.metaDescription", label: "SEO Meta Description", type: "textarea" },
        { key: "seo.keywords", label: "SEO Keywords", type: "text" },
        { key: "liveUrl", label: "Live Website URL", type: "url" },

        // Status
        { key: "isFeatured", label: "Feature on Homepage Mockup?", type: "toggle" },
        { key: "status", label: "Status", type: "select", options: [
          { value: "draft", label: "Draft" },
          { value: "published", label: "Published" },
        ]},
        { key: "order", label: "Display Order", type: "number", hint: "Lower number = shown first." },
      ]}
    />
  );
}
