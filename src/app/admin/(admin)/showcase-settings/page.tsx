"use client";

import { CrudTable, FormField } from "@/components/admin/CrudTable";

export default function AdminShowcaseSettings() {
  const formConfig: FormField[] = [
    { key: "autoPlay", label: "Auto Play", type: "toggle", hint: "Automatically cycle slides." },
    { key: "autoPlayInterval", label: "Auto Play Interval (ms)", type: "number", placeholder: "4500", hint: "Time between transitions." },
    { key: "infiniteLoop", label: "Infinite Loop", type: "toggle", hint: "Loop back to the start after reaching the last slide." },
    {
      key: "transitionType",
      label: "Transition Type",
      type: "select",
      options: [
        { value: "fade", label: "Fade" },
        { value: "slide", label: "Slide" }
      ]
    },
    { key: "transitionSpeed", label: "Transition Speed (ms)", type: "number", placeholder: "400" },
    { key: "showNavigation", label: "Show Navigation Arrows", type: "toggle" },
    { key: "showIndicators", label: "Show Indicator Dots", type: "toggle" },
    {
      key: "browserWindowStyle",
      label: "Browser Mockup Style",
      type: "select",
      options: [
        { value: "macOS", label: "macOS Chrome (3 Window Dots)" },
        { value: "generic", label: "Generic Browser Border" },
        { value: "minimal", label: "Minimalist Card" }
      ]
    },
    { key: "desktopWidth", label: "Desktop Mockup Width", type: "text", placeholder: "100%", hint: "e.g., 100%, 600px, 45rem" },
    { key: "desktopHeight", label: "Desktop Mockup Height", type: "text", placeholder: "auto", hint: "e.g., auto, 400px" },
    {
      key: "mobileLayout",
      label: "Mobile Layout Mode",
      type: "select",
      options: [
        { value: "carousel", label: "Carousel Slideshow" },
        { value: "stack", label: "Stack Vertically" },
        { value: "hidden", label: "Hide Showcase on Mobile" }
      ]
    }
  ];

  return (
    <CrudTable
      title="Showcase Settings"
      endpoint="hero-showcase-settings"
      publishable
      columns={[
        { key: "browserWindowStyle", label: "Style" },
        { key: "transitionType", label: "Transition" },
        { key: "autoPlay", label: "Autoplay", render: (v) => <span>{v ? "Yes" : "No"}</span> },
        { key: "desktopWidth", label: "Width" },
        { key: "desktopHeight", label: "Height" },
        { key: "isPublished", label: "Status", render: (v) => <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${v ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>{v ? "Live" : "Draft"}</span> },
      ]}
      formConfig={formConfig}
    />
  );
}
