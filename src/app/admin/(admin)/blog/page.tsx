"use client";

import { CrudTable } from "@/components/admin/CrudTable";

export default function AdminBlog() {
  return (
    <CrudTable
      title="Blog Posts"
      endpoint="blog"
      publishable
      columns={[
        { key: "title", label: "Title", render: (v) => <span className="font-semibold text-gray-900 truncate max-w-xs inline-block">{v}</span> },
        { key: "author", label: "Author" },
        { key: "category", label: "Category" },
        { key: "status", label: "Status", render: (v) => (
          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
            v === "published" ? "bg-green-100 text-green-700" :
            v === "scheduled" ? "bg-blue-100 text-blue-700" :
            "bg-gray-100 text-gray-500"
          }`}>{v}</span>
        )},
      ]}
      formConfig={[
        { key: "coverImage", label: "Cover Image", type: "image" },
        { key: "title", label: "Post Title", type: "text", required: true, maxLength: 120 },
        { key: "slug", label: "URL Slug", type: "text", hint: "Auto-generated from title if blank." },
        { key: "author", label: "Author Name", type: "text", required: true },
        { key: "category", label: "Category", type: "text", placeholder: "Engineering, Case Study, News…" },
        { key: "contentRichText", label: "Body Content", type: "richtext", hint: "Full article rich text body." },
        { key: "seoTitle", label: "SEO Title", type: "text", maxLength: 70 },
        { key: "seoDescription", label: "SEO Description", type: "textarea", maxLength: 160 },
        { key: "status", label: "Status", type: "select", options: [
          { value: "draft", label: "Draft" },
          { value: "published", label: "Published" },
          { value: "scheduled", label: "Scheduled" },
        ]},
      ]}
    />
  );
}
