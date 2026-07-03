"use client";

import { CrudTable } from "@/components/admin/CrudTable";

export default function AdminStats() {
  return (
    <CrudTable
      title="Stats Strip"
      endpoint="stats"
      reorderable
      columns={[
        { key: "number", label: "Number", render: (v, row) => <span className="font-bold text-gray-900 text-lg">{v}{row.suffix}</span> },
        { key: "label", label: "Label" },
        { key: "order", label: "Order" },
      ]}
      formConfig={[
        { key: "number", label: "Number Value", type: "text", required: true, placeholder: "150" },
        { key: "suffix", label: "Suffix", type: "text", placeholder: "+", hint: "e.g. +, %, k+" },
        { key: "label", label: "Label", type: "text", required: true, placeholder: "Projects Delivered" },
        { key: "order", label: "Display Order", type: "number" },
      ]}
    />
  );
}
