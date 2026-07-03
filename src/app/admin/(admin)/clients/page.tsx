"use client";

import { CrudTable } from "@/components/admin/CrudTable";

export default function AdminClients() {
  return (
    <div className="p-8 h-full bg-gray-50/50">
      <div className="max-w-6xl mx-auto">
        <CrudTable
          title="Clients"
          endpoint="clients"
          columns={[
            { key: "company", label: "Company", render: (val) => <span className="font-medium text-gray-900">{val}</span> },
            { key: "logo", label: "Logo URL", render: (val) => <span className="text-gray-500 truncate max-w-xs inline-block">{val}</span> },
          ]}
          formConfig={[
            { key: "company", label: "Company Name", type: "text", required: true },
            { key: "logo", label: "Logo URL (Cloudinary)", type: "text", required: true },
          ]}
        />
      </div>
    </div>
  );
}
