"use client";

import { CrudTable } from "@/components/admin/CrudTable";

export default function AdminTeam() {
  return (
    <CrudTable
      title="Team Members"
      endpoint="team"
      reorderable
      layout="grid"
      columns={[
        { key: "photo", label: "Photo", render: (v, row) => (
          <div className="w-8 h-8 rounded-full overflow-hidden bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xs">
            {v ? <img src={v} alt={row.name} className="w-full h-full object-cover" /> : row.name?.slice(0, 1)}
          </div>
        )},
        { key: "name", label: "Name", render: (v) => <span className="font-semibold text-gray-900">{v}</span> },
        { key: "role", label: "Role" },
        { key: "skills", label: "Skills", render: (v) => <span className="text-xs text-gray-500">{Array.isArray(v) ? v.slice(0, 3).join(", ") : v}</span> },
        { key: "isActive", label: "Status", render: (v) => <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${v ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>{v ? "Active" : "Archived"}</span> },
      ]}
      formConfig={[
        { key: "photo", label: "Profile Photo", type: "image" },
        { key: "name", label: "Full Name", type: "text", required: true },
        { key: "role", label: "Job Title / Role", type: "text", required: true },
        { key: "skills", label: "Skills / Technologies", type: "tags", hint: "Press Enter to add each skill." },
        { key: "linkedIn", label: "LinkedIn URL", type: "url" },
        { key: "github", label: "GitHub URL", type: "url" },
        { key: "email", label: "Email Address", type: "text" },
        { key: "isActive", label: "Active (shown on site)", type: "toggle" },
        { key: "order", label: "Display Order", type: "number" },
      ]}
    />
  );
}
