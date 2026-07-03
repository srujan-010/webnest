"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, BarChart2, Layers, FolderKanban, Star, MessageSquare, HelpCircle, ArrowRight } from "lucide-react";

const sections = [
  { href: "/admin/hero", label: "Hero Section", desc: "Main headline, paragraph intro, and header actions.", icon: Sparkles, color: "text-amber-500 bg-amber-50" },
  { href: "/admin/stats", label: "Stats Strip", desc: "Company metrics, project counts, and custom indicators.", icon: BarChart2, color: "text-emerald-500 bg-emerald-50" },
  { href: "/admin/services", label: "Services Bento", desc: "Deep dive services features and summary blocks.", icon: Layers, color: "text-blue-500 bg-blue-50" },
  { href: "/admin/projects", label: "Portfolio Showcase", desc: "Project list grid, screenshots, features, and links.", icon: FolderKanban, color: "text-indigo-500 bg-indigo-50" },
  { href: "/admin/why-us", label: "Why Choose Us", desc: "Eight value cards highlighting agency expertise.", icon: Star, color: "text-purple-500 bg-purple-50" },
  { href: "/admin/testimonials", label: "Testimonials", desc: "Carousel review cards displaying client feedback.", icon: MessageSquare, color: "text-rose-500 bg-rose-50" },
  { href: "/admin/faq", label: "FAQ Accordion", desc: "Accordion answers resolving initial user questions.", icon: HelpCircle, color: "text-cyan-500 bg-cyan-50" },
];

export default function AdminHomepage() {
  return (
    <div className="p-8 h-full bg-gray-50/50">
      <div className="max-w-5xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold font-display text-gray-900 tracking-tight">Homepage Sections Manager</h1>
          <p className="text-gray-500 mt-1">Easily select and edit any visual component layout on your agency's homepage.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          {sections.map((section, idx) => {
            const Icon = section.icon;
            return (
              <motion.div
                key={section.href}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ scale: 1.01 }}
                className="bg-white p-6 rounded-2xl border border-gray-200 hover:border-gray-300 transition-all flex gap-4 shadow-sm group hover:shadow-md cursor-pointer"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${section.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{section.label}</h3>
                  <p className="text-sm text-gray-500 mt-1">{section.desc}</p>
                  <Link href={section.href} className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:underline mt-4">
                    Go to Section Editor <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
