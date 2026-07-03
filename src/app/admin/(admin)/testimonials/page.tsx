"use client";

import { CrudTable } from "@/components/admin/CrudTable";

export default function AdminTestimonials() {
  return (
    <CrudTable
      title="Testimonials"
      endpoint="testimonials"
      publishable
      reorderable
      layout="grid"
      columns={[
        { key: "name", label: "Client Name", render: (v) => <span className="font-semibold text-gray-900">{v}</span> },
        { key: "role", label: "Role" },
        { key: "company", label: "Company" },
        { key: "stars", label: "Stars", render: (v) => <span>{"⭐".repeat(v || 5)}</span> },
        { key: "isPublished", label: "Status", render: (v) => <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${v ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>{v ? "Live" : "Draft"}</span> },
      ]}
      formConfig={[
        { key: "photo", label: "Client Photo", type: "image" },
        { key: "name", label: "Client Name", type: "text", required: true },
        { key: "role", label: "Job Title / Role", type: "text", required: true },
        { key: "company", label: "Company", type: "text", required: true },
        { key: "stars", label: "Star Rating (1–5)", type: "number" },
        { key: "quote", label: "Testimonial Quote", type: "textarea", required: true, maxLength: 500 },
        { key: "isPublished", label: "Published", type: "toggle" },
        { key: "order", label: "Display Order", type: "number" },
      ]}
    />
  );
}
