"use client";

import { CrudTable } from "@/components/admin/CrudTable";

export default function AdminFaq() {
  return (
    <CrudTable
      title="FAQ"
      endpoint="faq"
      reorderable
      layout="grid"
      columns={[
        { key: "question", label: "Question", render: (v) => <span className="font-medium text-gray-900 truncate max-w-sm inline-block">{v}</span> },
        { key: "answer", label: "Answer", render: (v) => <span className="text-sm text-gray-500 truncate max-w-xs inline-block">{String(v || "").replace(/<[^>]+>/g, "")}</span> },
      ]}
      formConfig={[
        { key: "question", label: "Question", type: "text", required: true, maxLength: 200 },
        { key: "answer", label: "Answer", type: "textarea", required: true, hint: "Supports basic formatting." },
        { key: "order", label: "Display Order", type: "number" },
      ]}
    />
  );
}
