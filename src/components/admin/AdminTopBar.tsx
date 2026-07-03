"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ExternalLink, RefreshCw, ChevronRight, Search, Bell, Command } from "lucide-react";
import { toast } from "react-hot-toast";

// Build breadcrumb from pathname
function buildBreadcrumb(pathname: string) {
  const segments = pathname.replace(/^\/admin\/?/, "").split("/").filter(Boolean);
  const crumbs = [{ label: "Admin", href: "/admin/dashboard" }];
  let running = "/admin";
  for (const seg of segments) {
    if (seg === "dashboard") continue;
    running += "/" + seg;
    crumbs.push({ label: seg.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()), href: running });
  }
  return crumbs;
}

export function AdminTopBar() {
  const pathname = usePathname();
  const [publishing, setPublishing] = useState(false);
  const crumbs = buildBreadcrumb(pathname);

  const handlePublishAll = async () => {
    setPublishing(true);
    try {
      const res = await fetch("/api/revalidate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ secret: process.env.NEXT_PUBLIC_REVALIDATION_SECRET || "webnest_revalidate_secret_2024", tags: ["all"] }),
      });
      if (res.ok) {
        toast.success("Successfully synchronized and revalidated all routes!");
      } else {
        toast.error("Revalidation cache flush failed.");
      }
    } catch (err) {
      toast.error("Network interface error.");
    } finally {
      setPublishing(false);
    }
  };

  return (
    <header className="h-[68px] border-b border-zinc-800 bg-zinc-950 flex items-center px-6 gap-6 shrink-0 justify-between select-none">
      {/* Left: Breadcrumbs */}
      <nav className="flex items-center gap-1.5 text-xs font-medium">
        {crumbs.map((crumb, i) => (
          <React.Fragment key={crumb.href}>
            {i > 0 && <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />}
            {i === crumbs.length - 1 ? (
              <span className="text-zinc-200 font-semibold">{crumb.label}</span>
            ) : (
              <Link href={crumb.href} className="text-zinc-500 hover:text-zinc-300 transition-colors">
                {crumb.label}
              </Link>
            )}
          </React.Fragment>
        ))}
      </nav>

      {/* Center: Command Palette Trigger Mock */}
      <div className="hidden md:flex items-center gap-2 max-w-sm w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-zinc-500 hover:bg-zinc-900/80 hover:text-zinc-400 hover:border-zinc-700 transition-all cursor-pointer">
        <Search className="w-4 h-4 text-zinc-500" />
        <span className="text-xs font-medium flex-1">Search CMS index...</span>
        <div className="flex items-center gap-0.5 text-[10px] font-bold bg-zinc-800 border border-zinc-700 text-zinc-400 px-1.5 py-0.5 rounded">
          <Command className="w-2.5 h-2.5" /> K
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-3">
        {/* Notifications Mock */}
        <button
          suppressHydrationWarning
          className="w-9 h-9 flex items-center justify-center rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors"
        >
          <Bell className="w-4 h-4" />
        </button>

        {/* Site Preview */}
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-1.5 text-xs text-zinc-300 hover:text-white px-3.5 py-2 rounded-xl border border-zinc-800 hover:border-zinc-700 bg-zinc-900/40 hover:bg-zinc-900 transition-colors font-semibold"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          Preview
        </Link>

        {/* Sync Publish */}
        <button
          onClick={handlePublishAll}
          disabled={publishing}
          className="flex items-center gap-1.5 text-xs text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-xl font-bold transition-all disabled:opacity-60 shadow-lg shadow-indigo-600/10 hover:shadow-indigo-600/20 shrink-0"
          suppressHydrationWarning
        >
          <RefreshCw className={`w-3.5 h-3.5 ${publishing ? "animate-spin" : ""}`} />
          {publishing ? "Syncing…" : "Publish Live"}
        </button>
      </div>
    </header>
  );
}
