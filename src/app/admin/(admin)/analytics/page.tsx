"use client";

import { motion } from "framer-motion";
import { BarChart2, Eye, Globe, MousePointerClick, TrendingUp } from "lucide-react";

export default function AdminAnalytics() {
  const cards = [
    { label: "Page Views", value: "84.2k", change: "+18.2%", trend: "up", icon: Eye, color: "text-blue-600 bg-blue-50" },
    { label: "Click Rate", value: "4.8%", change: "+0.5%", trend: "up", icon: MousePointerClick, color: "text-emerald-600 bg-emerald-50" },
    { label: "Ref. Traffic", value: "12.4k", change: "-2.4%", trend: "down", icon: Globe, color: "text-violet-600 bg-violet-50" },
    { label: "Conv. Rate", value: "3.2%", change: "+1.1%", trend: "up", icon: TrendingUp, color: "text-amber-600 bg-amber-50" },
  ];

  return (
    <div className="p-8 h-full bg-gray-50/50 space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-display text-gray-900 tracking-tight">Site Analytics</h1>
        <p className="text-gray-500 mt-1">Real-time visitor patterns, traffic channels, and page impressions.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, i) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${card.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                  card.trend === "up" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                }`}>
                  {card.change}
                </span>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-1">{card.value}</h3>
              <p className="text-sm font-medium text-gray-500">{card.label}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm min-h-[350px]">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Traffic Progression</h3>
          <div className="w-full h-64 border border-dashed border-gray-200 bg-gray-50/50 rounded-xl flex items-center justify-center text-gray-400 font-medium">
            [Chart Area: Weekly page views progression graph]
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm min-h-[350px] flex flex-col">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Popular Referrers</h3>
          <div className="space-y-4 flex-1 flex flex-col justify-center">
            {[
              { label: "Google Search", pct: "45%" },
              { label: "LinkedIn Direct", pct: "30%" },
              { label: "GitHub Repository", pct: "15%" },
              { label: "Twitter / X", pct: "10%" },
            ].map((ref) => (
              <div key={ref.label}>
                <div className="flex justify-between text-sm font-medium mb-1">
                  <span className="text-gray-700">{ref.label}</span>
                  <span className="text-gray-500">{ref.pct}</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full" style={{ width: ref.pct }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
