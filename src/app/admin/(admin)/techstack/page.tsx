"use client";

import { CrudTable } from "@/components/admin/CrudTable";

export default function AdminTechStack() {
  return (
    <CrudTable
      title="Tech Stack Logos"
      endpoint="techstack"
      reorderable
      layout="grid"
      columns={[
        { key: "logo", label: "Logo", render: (v) => v ? <img src={v} alt="logo" className="w-8 h-8 object-contain" /> : <div className="w-8 h-8 bg-gray-100 rounded" /> },
        { key: "name", label: "Technology Name", render: (v) => <span className="font-semibold text-gray-900">{v}</span> },
        { key: "link", label: "Link", render: (v) => v ? <a href={v} target="_blank" className="text-blue-600 text-sm hover:underline">{v}</a> : null },
      ]}
      formConfig={[
        { key: "logo", label: "Logo Image", type: "image" },
        { key: "name", label: "Technology Name", type: "text", required: true, placeholder: "React, Next.js, etc." },
        { key: "link", label: "Official Website URL", type: "url" },
        { key: "order", label: "Display Order", type: "number" },
      ]}
    />
  );
}
