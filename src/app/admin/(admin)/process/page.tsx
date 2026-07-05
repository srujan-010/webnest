"use client";

import { CrudTable } from "@/components/admin/CrudTable";
import { Search, PenTool, Layout, Code2, TestTube, Rocket, Headphones, Zap, MessageSquare, Terminal, Heart, Lightbulb } from "lucide-react";

export default function AdminProcessSteps() {
  return (
    <CrudTable
      title="Process Steps"
      endpoint="process"
      reorderable
      columns={[
        { key: "icon", label: "Icon", render: (v) => <span className="text-gray-500 font-medium">{v}</span> },
        { key: "title", label: "Step Title", render: (v) => <span className="font-semibold text-gray-900">{v}</span> },
        { key: "desc", label: "Description", render: (v) => <span className="text-sm text-gray-500 truncate max-w-xs inline-block">{v}</span> },
      ]}
      formConfig={[
        { key: "title", label: "Step Title", type: "text", required: true, maxLength: 80 },
        { key: "desc", label: "Description", type: "textarea", required: true, maxLength: 300 },
        { key: "icon", label: "Icon Identifier", type: "select", options: [
          { value: "Search", label: "Search" },
          { value: "PenTool", label: "Pen Tool" },
          { value: "Layout", label: "Layout" },
          { value: "Code2", label: "Code" },
          { value: "TestTube", label: "Test Tube" },
          { value: "Rocket", label: "Rocket" },
          { value: "Headphones", label: "Headphones" },
          { value: "Zap", label: "Zap" },
          { value: "MessageSquare", label: "Message Square" },
          { value: "Terminal", label: "Terminal" },
          { value: "Heart", label: "Heart" },
          { value: "Lightbulb", label: "Lightbulb" },
        ]},
        { key: "duration", label: "Estimated Duration", type: "text", placeholder: "e.g., 1-2 Weeks" },
        { key: "deliverables", label: "Deliverables", type: "tags", hint: "Press Enter or comma to add deliverables" },
        { key: "outcome", label: "Outcome", type: "text", placeholder: "e.g., Complete Product Blueprint" },
        { key: "order", label: "Order", type: "number", hint: "Controls display sequence." },
      ]}
    />
  );
}
