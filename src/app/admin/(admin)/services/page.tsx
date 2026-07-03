"use client";

import { CrudTable } from "@/components/admin/CrudTable";

export default function AdminServices() {
  return (
    <CrudTable
      title="Services"
      endpoint="services"
      publishable
      reorderable
      layout="grid"
      columns={[
        { key: "icon", label: "Icon", render: (v) => <span className="font-mono text-xs bg-gray-100 px-2 py-0.5 rounded">{v}</span> },
        { key: "title", label: "Title", render: (v) => <span className="font-semibold text-gray-900">{v}</span> },
        { key: "description", label: "Description", render: (v) => <span className="text-sm text-gray-500 truncate max-w-xs inline-block">{v}</span> },
        { key: "featured", label: "Featured", render: (v) => v ? <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-700">Featured</span> : null },
        { key: "isPublished", label: "Status", render: (v) => <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${v ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>{v ? "Live" : "Draft"}</span> },
      ]}
      formConfig={[
        { key: "icon", label: "Icon Name (Lucide)", type: "text", placeholder: "Code2", hint: "Use any Lucide icon name, e.g. Code2, Globe, Zap, ShoppingCart" },
        { key: "title", label: "Service Title", type: "text", required: true, maxLength: 60 },
        { key: "description", label: "Description", type: "textarea", required: true, maxLength: 300 },
        { key: "link", label: "Learn More Link", type: "url", placeholder: "/services" },
        { key: "featured", label: "Featured Card (larger bento tile)", type: "toggle" },
        { key: "isPublished", label: "Published", type: "toggle" },
        { key: "order", label: "Display Order", type: "number" },
      ]}
    />
  );
}
