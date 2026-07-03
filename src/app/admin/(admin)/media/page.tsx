"use client";

import { CrudTable } from "@/components/admin/CrudTable";

export default function AdminMedia() {
  return (
    <div className="p-8 h-full bg-gray-50/50">
      <div className="max-w-6xl mx-auto">
        <CrudTable
          title="Media Library"
          endpoint="media"
          layout="grid"
          columns={[
            { key: "url", label: "Preview", render: (v) => <img src={v} alt="Preview" className="w-16 h-16 object-cover rounded-lg border border-gray-200" /> },
            { key: "url", label: "URL Link", render: (v) => <a href={v} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline truncate max-w-sm inline-block">{v}</a> },
            { key: "publicId", label: "Cloudinary Public ID" },
          ]}
          formConfig={[
            { key: "url", label: "Image File", type: "image", required: true },
            { key: "publicId", label: "Cloudinary Public ID", type: "text" },
          ]}
        />
      </div>
    </div>
  );
}
