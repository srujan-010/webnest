"use client";

import { CrudTable, FormField } from "@/components/admin/CrudTable";

export default function AdminHero() {
  const formConfig: FormField[] = [
    { key: "badge", label: "Badge Text", type: "text", required: true, placeholder: "Premium Software Agency", maxLength: 60 },
    { key: "headline", label: "Main Headline", type: "text", required: true, maxLength: 100, hint: "The main hero headline. The highlighted portion is set separately." },
    { key: "headlineHighlight", label: "Headline Highlight (gradient text)", type: "text", maxLength: 40, hint: "This text will be shown in blue gradient within the headline." },
    { key: "subheadline", label: "Subheadline", type: "textarea", maxLength: 200 },
    { key: "primaryCta.label", label: "Primary Button Label", type: "text", placeholder: "Start Your Project" },
    { key: "primaryCta.link", label: "Primary Button Link", type: "url", placeholder: "/contact" },
    { key: "secondaryCta.label", label: "Secondary Button Label", type: "text", placeholder: "View Our Work" },
    { key: "secondaryCta.link", label: "Secondary Button Link", type: "url", placeholder: "/portfolio" },
  ];

  return (
    <CrudTable
      title="Hero Content"
      endpoint="hero"
      publishable
      columns={[
        { key: "badge", label: "Badge" },
        { key: "headline", label: "Headline", render: (v) => <span className="font-medium text-gray-900 truncate max-w-xs inline-block">{v}</span> },
        { key: "subheadline", label: "Subheadline", render: (v) => <span className="text-gray-500 text-sm truncate max-w-xs inline-block">{v}</span> },
        { key: "isPublished", label: "Status", render: (v) => <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${v ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>{v ? "Live" : "Draft"}</span> },
      ]}
      formConfig={formConfig}
    />
  );
}
