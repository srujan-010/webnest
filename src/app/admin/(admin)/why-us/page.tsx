"use client";

import { CrudTable } from "@/components/admin/CrudTable";

export default function AdminWhyUs() {
  return (
    <div className="p-8 h-full bg-gray-50/50">
      <div className="max-w-6xl mx-auto">
        <CrudTable
          title="Why Us Reasons"
          endpoint="why-us"
          reorderable
          layout="grid"
          columns={[
            { key: "title", label: "Title", render: (v) => <span className="font-semibold text-gray-900">{v}</span> },
            { key: "text", label: "Reason Text", render: (v) => <span className="text-gray-500 truncate max-w-lg inline-block">{v}</span> },
            { key: "order", label: "Order" },
          ]}
          formConfig={[
            { key: "title", label: "Title (e.g. Fast Delivery)", type: "text", required: true },
            { key: "text", label: "Reason Text", type: "textarea", required: true },
            { key: "order", label: "Display Order", type: "number" },
          ]}
        />
      </div>
    </div>
  );
}
