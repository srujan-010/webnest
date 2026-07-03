"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "./AuthProvider";
import {
  LayoutDashboard, Star, Layers, FolderKanban, Users, MessageSquare,
  HelpCircle, Zap, Cpu, Globe, FileText, Settings, Navigation,
  LogOut, ChevronRight, Sparkles, BarChart2, CheckCircle2,
  Menu, Image as ImageIcon, Trash2
} from "lucide-react";

const navGroups = [
  {
    label: "Overview",
    items: [
      { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
      { href: "/admin/analytics", label: "Analytics", icon: BarChart2 },
    ],
  },
  {
    label: "Content",
    items: [
      { href: "/admin/homepage", label: "Homepage", icon: Globe },
      { href: "/admin/hero", label: "Hero Content", icon: Sparkles },
      { href: "/admin/showcase-settings", label: "Showcase Settings", icon: Settings },
      { href: "/admin/showcase-items", label: "Showcase Items", icon: Star },
      { href: "/admin/about", label: "About Page", icon: Star },
      { href: "/admin/services", label: "Services", icon: Layers },
      { href: "/admin/projects", label: "Portfolio", icon: FolderKanban },
      { href: "/admin/process", label: "Process", icon: Zap },
      { href: "/admin/techstack", label: "Technologies", icon: Cpu },
    ],
  },
  {
    label: "Marketing",
    items: [
      { href: "/admin/testimonials", label: "Testimonials", icon: MessageSquare },
      { href: "/admin/blog", label: "Blog", icon: FileText },
      { href: "/admin/faq", label: "FAQ", icon: HelpCircle },
      { href: "/admin/contact", label: "Contact Inquiries", icon: MessageSquare },
      { href: "/admin/newsletter", label: "Newsletter", icon: FileText },
    ],
  },
  {
    label: "Media",
    items: [
      { href: "/admin/media", label: "Media Library", icon: ImageIcon },
    ],
  },
  {
    label: "System",
    items: [
      { href: "/admin/navigation", label: "Navigation", icon: Navigation },
      { href: "/admin/seo", label: "SEO", icon: Globe },
      { href: "/admin/users", label: "Users & Admins", icon: Users },
      { href: "/admin/settings", label: "Settings", icon: Settings },
      { href: "/admin/trash", label: "Trash Manager", icon: Trash2 },
    ],
  },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  const isActive = (href: string) =>
    pathname === href || (href !== "/admin/dashboard" && pathname.startsWith(href));

  return (
    <>
      {/* Mobile overlay – no backdrop-blur to prevent blur leaking on desktop via display:none */}
      {!collapsed && (
        <div
          className="fixed inset-0 bg-black/60 z-20 lg:hidden"
          onClick={() => setCollapsed(true)}
        />
      )}

      <aside
        className={`relative flex flex-col bg-zinc-950 text-zinc-300 border-r border-zinc-800/80 transition-all duration-300 ease-out select-none ${
          collapsed ? "w-[72px]" : "w-[260px]"
        } min-h-screen shrink-0 z-30`}
      >
        {/* Workspace Brand Block */}
        <div className="flex items-center justify-between px-5 h-[68px] border-b border-zinc-800/60">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm tracking-wide shadow-md shadow-indigo-600/20">
                W
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-sm text-white tracking-tight flex items-center gap-1">
                  WebNest CMS
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 fill-indigo-400/20" />
                </span>
                <span className="text-[10px] text-zinc-500 font-medium tracking-wide">Enterprise Suite</span>
              </div>
            </div>
          )}
          {collapsed && (
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm mx-auto shadow-md">
              W
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className={`w-7 h-7 flex items-center justify-center rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white transition-all duration-200 ${
              collapsed ? "absolute -right-3.5 top-5 bg-zinc-900 border border-zinc-800" : "ml-auto"
            }`}
            suppressHydrationWarning
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

        {/* Sidebar Nav */}
        <nav className="flex-1 overflow-y-auto py-5 px-3 space-y-5 custom-scrollbar">
          {navGroups.map((group) => (
            <div key={group.label} className="space-y-1">
              {!collapsed && (
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest px-3.5 mb-2">
                  {group.label}
                </p>
              )}
              <div className="space-y-[2px]">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      title={collapsed ? item.label : undefined}
                      className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all group relative ${
                        active
                          ? "bg-indigo-600/10 text-white font-semibold ring-1 ring-indigo-500/20"
                          : "text-zinc-400 hover:bg-zinc-900/60 hover:text-zinc-100"
                      }`}
                    >
                      {active && (
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-indigo-500 rounded-r-md" />
                      )}
                      <Icon className={`w-4 h-4 shrink-0 transition-colors ${active ? "text-indigo-400" : "text-zinc-500 group-hover:text-zinc-300"}`} />
                      {!collapsed && <span className="truncate">{item.label}</span>}
                      {!collapsed && active && (
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 ml-auto" />
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Workspace / Profile */}
        <div className="border-t border-zinc-800/60 p-4 bg-zinc-950/40">
          <div className={`flex items-center gap-3 ${collapsed ? "justify-center" : ""}`}>
            <div className="w-9 h-9 rounded-full bg-zinc-800 ring-1 ring-zinc-700/50 flex items-center justify-center text-xs font-bold text-white shrink-0 shadow-inner">
              {user?.name?.slice(0, 1).toUpperCase() || "A"}
            </div>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate leading-none mb-1">{user?.name || "Admin"}</p>
                <p className="text-[10px] text-zinc-500 truncate capitalize font-medium">{user?.role || "editor"}</p>
              </div>
            )}
            {!collapsed && (
              <button
                onClick={logout}
                title="Logout"
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-950/30 text-zinc-400 hover:text-red-400 transition-colors"
                suppressHydrationWarning
              >
                <LogOut className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
