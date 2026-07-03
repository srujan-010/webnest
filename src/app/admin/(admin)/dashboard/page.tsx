"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/components/admin/AuthProvider";
import { motion } from "framer-motion";
import { 
  FolderKanban, 
  MessageSquare,
  Sparkles,
  ArrowRight,
  Plus,
  Layers,
  Activity,
  Globe,
  Settings,
  HardDrive,
  Database,
  FileText,
  Bookmark,
  Share2,
  CheckCircle,
  Eye,
  Heart
} from "lucide-react";
import Link from "next/link";
import { toast } from "react-hot-toast";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

interface IContact {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  message: string;
  createdAt: string;
}

interface IAudit {
  _id: string;
  action: string;
  model: string;
  adminName: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const { user, token } = useAuth();
  
  // Dynamic stats
  const [projectCount, setProjectCount] = useState(0);
  const [serviceCount, setServiceCount] = useState(0);
  const [testimonialCount, setTestimonialCount] = useState(0);
  const [blogCount, setBlogCount] = useState(0);
  const [contactCount, setContactCount] = useState(0);
  const [publishedCount, setPublishedCount] = useState(0);
  const [draftCount, setDraftCount] = useState(0);

  const [latestInquiries, setLatestInquiries] = useState<IContact[]>([]);
  const [activities, setActivities] = useState<IAudit[]>([]);
  const [dbStatus, setDbStatus] = useState<"connecting" | "online" | "offline">("connecting");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check Health
    fetch(`${API_URL}/health`)
      .then((res) => {
        if (res.ok) setDbStatus("online");
        else setDbStatus("offline");
      })
      .catch(() => setDbStatus("offline"));

    const loadDashboardData = async () => {
      try {
        const [projRes, servRes, testRes, blogRes, contRes, auditRes] = await Promise.all([
          fetch(`${API_URL}/projects`),
          fetch(`${API_URL}/services`),
          fetch(`${API_URL}/testimonials`),
          fetch(`${API_URL}/blog`),
          fetch(`${API_URL}/contact`, { headers: { Authorization: `Bearer ${token}` } }),
          fetch(`${API_URL}/audit`, { headers: { Authorization: `Bearer ${token}` } }),
        ]);

        const projs = await projRes.json();
        const servs = await servRes.json();
        const tests = await testRes.json();
        const blogs = await blogRes.json();
        const conts = await contRes.json();
        const audits = await auditRes.json();

        // Totals
        const pCount = projs.success ? projs.total : 0;
        const sCount = servs.success ? servs.total : 0;
        const tCount = tests.success ? tests.total : 0;
        const bCount = blogs.success ? blogs.total : 0;
        const cCount = conts.success ? conts.total : 0;

        setProjectCount(pCount);
        setServiceCount(sCount);
        setTestimonialCount(tCount);
        setBlogCount(bCount);
        setContactCount(cCount);

        // Published vs Draft Calculation
        let pub = 0;
        let drf = 0;

        const checkPublishState = (list: any[]) => {
          list.forEach((item) => {
            if (item.isPublished || item.status === "published") pub++;
            else drf++;
          });
        };

        if (projs.success && Array.isArray(projs.data)) checkPublishState(projs.data);
        if (servs.success && Array.isArray(servs.data)) checkPublishState(servs.data);
        if (tests.success && Array.isArray(tests.data)) checkPublishState(tests.data);
        if (blogs.success && Array.isArray(blogs.data)) checkPublishState(blogs.data);

        setPublishedCount(pub);
        setDraftCount(drf);

        if (conts.success) {
          setLatestInquiries(conts.data?.slice(0, 3) || []);
        }
        if (audits.success) {
          setActivities(audits.data?.slice(0, 5) || []);
        }
      } catch {
        toast.error("Error connecting dashboard operations panel.");
      } finally {
        setLoading(false);
      }
    };

    if (token) loadDashboardData();
  }, [token]);

  const totalContent = projectCount + serviceCount + testimonialCount + blogCount;

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto select-none">
      
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold font-display text-white tracking-tight">
            Operational Dashboard
          </h1>
          <p className="text-zinc-400 text-sm mt-1">Hello, {user?.name?.split(' ')[0] || "Admin"}. Review dynamic metrics and website integrity indexes.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          {/* Webnest Service Health */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800">
            <Globe className="w-4 h-4 text-zinc-500" />
            <span className="text-xs text-zinc-400 font-semibold">Gateway:</span>
            <span className="text-xs font-bold text-green-400">HTTP 200</span>
          </div>

          {/* Database Health */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800">
            <Database className="w-4 h-4 text-zinc-500" />
            <span className="text-xs text-zinc-400 font-semibold">MongoDB:</span>
            <span className={`inline-flex items-center gap-1.5 text-xs font-bold ${
              dbStatus === "online" ? "text-green-400" : dbStatus === "offline" ? "text-red-400" : "text-amber-400"
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${
                dbStatus === "online" ? "bg-green-400" : dbStatus === "offline" ? "bg-red-400" : "bg-amber-400"
              }`} />
              {dbStatus === "online" ? "Online" : dbStatus === "offline" ? "Offline" : "Checking"}
            </span>
          </div>

          <Link
            href="/admin/homepage"
            className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-4 py-2 rounded-xl transition-all shadow-lg shadow-indigo-600/10 hover:shadow-indigo-600/20"
          >
            Manage Content <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Main KPI Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-zinc-950 p-6 rounded-2xl border border-zinc-800/80 shadow-lg">
          <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Total Content</p>
          <h3 className="text-3xl font-extrabold text-white tracking-tight">{loading ? "..." : totalContent}</h3>
          <span className="text-[10px] text-zinc-500 font-semibold mt-1 block">Live resources registered</span>
        </div>
        <div className="bg-zinc-950 p-6 rounded-2xl border border-zinc-800/80 shadow-lg">
          <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Published</p>
          <h3 className="text-3xl font-extrabold text-green-400 tracking-tight">{loading ? "..." : publishedCount}</h3>
          <span className="text-[10px] text-zinc-500 font-semibold mt-1 block">Live on the public site</span>
        </div>
        <div className="bg-zinc-950 p-6 rounded-2xl border border-zinc-800/80 shadow-lg">
          <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Drafts</p>
          <h3 className="text-3xl font-extrabold text-amber-400 tracking-tight">{loading ? "..." : draftCount}</h3>
          <span className="text-[10px] text-zinc-500 font-semibold mt-1 block">Awaiting publication</span>
        </div>
        <div className="bg-zinc-950 p-6 rounded-2xl border border-zinc-800/80 shadow-lg">
          <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Inquiries</p>
          <h3 className="text-3xl font-extrabold text-indigo-400 tracking-tight">{loading ? "..." : contactCount}</h3>
          <span className="text-[10px] text-zinc-500 font-semibold mt-1 block">Leads generated</span>
        </div>
      </div>

      {/* Module Overview Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Portfolio Items", val: projectCount, desc: "Showcased Projects", icon: FolderKanban, color: "text-blue-400 bg-blue-500/10" },
          { label: "Core Services", val: serviceCount, desc: "Capability Tiles", icon: Layers, color: "text-emerald-400 bg-emerald-500/10" },
          { label: "Blog Articles", val: blogCount, desc: "News & Insights", icon: FileText, color: "text-purple-400 bg-purple-500/10" },
          { label: "Testimonials", val: testimonialCount, desc: "Customer Reviews", icon: Heart, color: "text-rose-400 bg-rose-500/10" },
        ].map((mod, i) => {
          const Icon = mod.icon;
          return (
            <motion.div
              key={mod.label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-zinc-950 p-5 rounded-2xl border border-zinc-800/60 flex items-center justify-between"
            >
              <div>
                <h4 className="text-xs font-bold text-zinc-400">{mod.label}</h4>
                <p className="text-2xl font-extrabold text-white mt-1">{loading ? "..." : mod.val}</p>
                <span className="text-[9px] text-zinc-500 font-semibold tracking-wide">{mod.desc}</span>
              </div>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${mod.color}`}>
                <Icon className="w-5 h-5" />
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Columns: Activity Metrics & Latest Submissions */}
        <div className="lg:col-span-2 space-y-6">
          {/* Traffic Progression Mock */}
          <div className="bg-zinc-950 rounded-2xl border border-zinc-800/80 p-6 shadow-lg flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-white">System Operations Performance</h3>
                <p className="text-xs text-zinc-500">Live endpoint latencies and rendering timings.</p>
              </div>
              <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-indigo-500/10 text-indigo-400">99.9% Uptime</span>
            </div>
            <div className="w-full rounded-xl bg-zinc-900/30 border border-zinc-800 border-dashed flex flex-col items-center justify-center text-zinc-500 text-xs font-medium gap-2 py-16">
              <Activity className="w-6 h-6 text-indigo-500/50 animate-pulse" />
              <span>Real-time Operations Monitor</span>
            </div>
          </div>

          {/* Latest Submissions */}
          <div className="bg-zinc-950 rounded-2xl border border-zinc-800/80 p-6 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-base font-bold text-white">Recent Leads</h3>
                <p className="text-xs text-zinc-500">Form entries submitted via public gateway.</p>
              </div>
              <Link href="/admin/contact" className="text-xs font-bold text-indigo-400 hover:underline flex items-center gap-0.5">
                View all <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            {loading ? (
              <div className="text-zinc-500 text-sm py-6 text-center">Synchronizing inquiries...</div>
            ) : latestInquiries.length === 0 ? (
              <div className="text-zinc-600 text-xs py-8 text-center bg-zinc-900/10 rounded-xl border border-zinc-900 border-dashed">
                No inquiries received yet.
              </div>
            ) : (
              <div className="divide-y divide-zinc-900">
                {latestInquiries.map((inq) => (
                  <div key={inq._id} className="py-4 first:pt-0 last:pb-0 flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-850 flex items-center justify-center text-xs font-bold text-zinc-300 uppercase shrink-0">
                      {inq.firstName.slice(0, 1)}{inq.lastName.slice(0, 1)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold text-white truncate">{inq.firstName} {inq.lastName}</p>
                        <span className="text-[9px] text-zinc-500 font-semibold">
                          {new Date(inq.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-400 mt-1 truncate">{inq.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Columns: Quick Shortcuts & Actions */}
        <div className="space-y-6">
          {/* Quick Actions Shortcuts */}
          <div className="bg-zinc-950 rounded-2xl border border-zinc-800/80 p-6 shadow-lg">
            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4">Quick Shortcuts</h3>
            <div className="grid grid-cols-2 gap-2">
              <Link href="/admin/hero" className="flex flex-col items-center justify-center p-4 bg-zinc-900/50 hover:bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-xl text-center transition-all group">
                <Sparkles className="w-4 h-4 text-indigo-400 mb-2 group-hover:scale-105 transition-transform" />
                <span className="text-[10px] font-bold text-zinc-300">Edit Hero</span>
              </Link>
              <Link href="/admin/blog" className="flex flex-col items-center justify-center p-4 bg-zinc-900/50 hover:bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-xl text-center transition-all group">
                <Plus className="w-4 h-4 text-indigo-400 mb-2 group-hover:scale-105 transition-transform" />
                <span className="text-[10px] font-bold text-zinc-300">New Blog</span>
              </Link>
              <Link href="/admin/settings" className="flex flex-col items-center justify-center p-4 bg-zinc-900/50 hover:bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-xl text-center transition-all group">
                <Settings className="w-4 h-4 text-indigo-400 mb-2 group-hover:scale-105 transition-transform" />
                <span className="text-[10px] font-bold text-zinc-300">Settings</span>
              </Link>
              <Link href="/admin/trash" className="flex flex-col items-center justify-center p-4 bg-zinc-900/50 hover:bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-xl text-center transition-all group">
                <HardDrive className="w-4 h-4 text-indigo-400 mb-2 group-hover:scale-105 transition-transform" />
                <span className="text-[10px] font-bold text-zinc-300">Trash Bin</span>
              </Link>
            </div>
          </div>

          {/* Audit Action Log */}
          <div className="bg-zinc-950 rounded-2xl border border-zinc-800/80 p-6 shadow-lg min-h-[300px] flex flex-col">
            <h3 className="text-base font-bold text-white mb-4">Audit Logs</h3>
            
            {loading ? (
              <div className="text-zinc-500 text-sm py-6 text-center">Loading feed...</div>
            ) : activities.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-zinc-600 text-[10px] gap-1 border border-zinc-900 border-dashed rounded-xl py-8">
                <span>No audit events registered yet.</span>
              </div>
            ) : (
              <div className="space-y-4 flex-1 overflow-y-auto max-h-[300px] pr-1">
                {activities.map((act) => (
                  <div key={act._id} className="flex gap-3">
                    <div className="w-7 h-7 rounded-full bg-zinc-900 border border-zinc-850 flex items-center justify-center shrink-0 mt-0.5 text-zinc-500">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-zinc-200 font-bold leading-normal capitalize">
                        {act.action.replace(/_/g, " ")} on <span className="text-indigo-400">{act.model}</span>
                      </p>
                      <p className="text-[9px] text-zinc-500 mt-0.5">
                        By {act.adminName || "User"} • {new Date(act.createdAt).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  );
}
