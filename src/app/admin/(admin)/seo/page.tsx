"use client";

import { CrudTable } from "@/components/admin/CrudTable";

export default function AdminSeo() {
  return (
    <div className="p-8 h-full bg-gray-50/50">
      <div className="max-w-6xl mx-auto">
        <CrudTable
          title="SEO Metadata"
          endpoint="seo"
          columns={[
            { key: "page", label: "Page Route", render: (v) => <span className="font-semibold text-gray-900">{v}</span> },
            { key: "title", label: "SEO Title" },
            { key: "description", label: "Meta Description", render: (v) => <span className="text-gray-500 truncate max-w-sm inline-block">{v}</span> },
          ]}
          formConfig={[
            { key: "page", label: "Page Route (e.g. /about, /portfolio)", type: "text", required: true },
            { key: "title", label: "SEO Title Tag", type: "text", required: true },
            { key: "description", label: "Meta Description Tag", type: "textarea", required: true },
            { key: "ogImage", label: "Open Graph Image (Social Share Image)", type: "image" },
          ]}
        />
      </div>
    </div>
  );
}
