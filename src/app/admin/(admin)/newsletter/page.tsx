"use client";

import { CrudTable } from "@/components/admin/CrudTable";

export default function AdminNewsletter() {
  return (
    <div className="p-8 h-full bg-zinc-950/20">
      <div className="max-w-6xl mx-auto">
        <CrudTable
          title="Newsletter Subscribers"
          endpoint="newsletter"
          columns={[
            { key: "email", label: "Email Address", render: (v) => <span className="font-semibold text-gray-900">{v}</span> },
            { key: "subscribedAt", label: "Subscription Date", render: (v) => <span className="text-zinc-500">{v ? new Date(v).toLocaleString() : "N/A"}</span> },
          ]}
          formConfig={[
            { key: "email", label: "Email Address", type: "text", required: true },
          ]}
        />
      </div>
    </div>
  );
}
