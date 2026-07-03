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
        { key: "longDescription", label: "Long Description", type: "textarea", maxLength: 1000 },
        { key: "thumbnail", label: "Thumbnail Image", type: "image" },
        { key: "coverImage", label: "Cover Image", type: "image" },
        { key: "desktopImage", label: "Desktop Screenshot (URL or upload)", type: "image" },
        { key: "mobileImage", label: "Mobile Screenshot", type: "image" },
        { key: "galleryImages", label: "Gallery Images", type: "tags", hint: "Press Enter or comma to add gallery image URLs." },
        { key: "featuresList", label: "Key Features", type: "tags", hint: "Press Enter or comma to add each feature bullet." },
        { key: "techStack", label: "Tech Stack", type: "tags", hint: "Add each technology used." },
        { key: "liveUrl", label: "Live Website URL", type: "url" },
        { key: "caseStudyContent", label: "Case Study Content (Rich Text)", type: "richtext" },
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
