"use client";

import { CrudTable } from "@/components/admin/CrudTable";

export default function AdminContact() {
  return (
    <div className="p-8 h-full bg-gray-50/50">
      <div className="max-w-6xl mx-auto">
        <CrudTable
          title="Contact Inquiries"
          endpoint="contact"
          columns={[
            { key: "name", label: "Client Name", render: (v) => <span className="font-semibold text-gray-900">{v}</span> },
            { key: "email", label: "Email Address", render: (v) => <a href={`mailto:${v}`} className="text-blue-600 hover:underline">{v}</a> },
            { key: "phone", label: "Phone" },
            { key: "projectType", label: "Project Type" },
            { key: "status", label: "Status", render: (v) => (
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                v === "closed" ? "bg-zinc-150 text-zinc-650" :
                v === "contacted" ? "bg-blue-100 text-blue-700" :
                "bg-green-100 text-green-700"
              }`}>{v || "new"}</span>
            )},
            { key: "message", label: "Message", render: (v) => <span className="text-sm text-gray-500 truncate max-w-xs inline-block">{v}</span> },
          ]}
          formConfig={[
            { key: "name", label: "Client Name", type: "text", required: true },
            { key: "email", label: "Email Address", type: "text", required: true },
            { key: "phone", label: "Phone Number", type: "text" },
            { key: "projectType", label: "Project Type", type: "select", options: [
              { value: "Web App", label: "Web Application" },
              { value: "E-Commerce", label: "E-Commerce" },
              { value: "UI/UX", label: "UI/UX Design" },
              { value: "Consulting", label: "Consulting / General" }
            ]},
            { key: "status", label: "Status", type: "select", options: [
              { value: "new", label: "New Inbound" },
              { value: "contacted", label: "Contacted" },
              { value: "closed", label: "Closed" }
            ]},
            { key: "message", label: "Project Details / Message", type: "textarea", required: true },
          ]}
        />
      </div>
    </div>
  );
}
