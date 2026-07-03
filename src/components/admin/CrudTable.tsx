"use client";

import React, { useState, useEffect, useCallback } from "react";
import { 
  Plus, Pencil, Trash2, RotateCcw, Search, ChevronUp, ChevronDown, 
  GripVertical, RefreshCw, X, Check, Copy, Archive, Eye, TrendingUp, 
  Award, Calendar, ArrowUpRight, HelpCircle, Layers, Star, Play
} from "lucide-react";
import { toast } from "react-hot-toast";
import { useAuth } from "./AuthProvider";
import { ConfirmModal } from "./ConfirmModal";
import { motion, AnimatePresence } from "framer-motion";
import { ImageUploader } from "./ImageUploader";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export interface Column {
  key: string;
  label: string;
  render?: (val: any, row: any) => React.ReactNode;
  sortable?: boolean;
}

export interface FormField {
  key: string;
  label: string;
  type: "text" | "textarea" | "richtext" | "image" | "select" | "multiselect" | "toggle" | "color" | "url" | "number" | "tags";
  required?: boolean;
  options?: { value: string; label: string }[];
  placeholder?: string;
  maxLength?: number;
  hint?: string;
}

interface CrudTableProps {
  title: string;
  endpoint: string;
  columns: Column[];
  formConfig: FormField[];
  reorderable?: boolean;
  publishable?: boolean;
  renderForm?: (props: { item?: any; onSave: (data: any) => void; onCancel: () => void }) => React.ReactNode;
  layout?: "table" | "grid";
}

export function CrudTable({
  title,
  endpoint,
  columns,
  formConfig,
  reorderable = false,
  publishable = false,
  renderForm,
  layout = "table"
}: CrudTableProps) {
  const { token } = useAuth();
  const [items, setItems] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [showTrash, setShowTrash] = useState(false);
  const [showForm, setShowForm] = useState(false);
  
  // Form Drawer States
  const [editItem, setEditItem] = useState<any>(null);
  const [formValues, setFormValues] = useState<Record<string, any>>({});
  const [autosaving, setAutosaving] = useState(false);

  const [confirmDelete, setConfirmDelete] = useState<{ id: string; name: string } | null>(null);
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const fetchItems = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: "30",
        ...(search ? { search } : {}),
        ...(showTrash ? { trash: "true" } : {}),
      });
      const res = await fetch(`${API_URL}/${endpoint}?${params}`, { credentials: "include" });
      const json = await res.json();
      if (json.success) {
        setItems(json.data || []);
        setTotal(json.total || 0);
      }
    } catch (err) {
      toast.error("Error communicating with CMS gateway.");
    } finally {
      setLoading(false);
    }
  }, [endpoint, page, search, showTrash]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const handleOpenCreate = () => {
    setEditItem(null);
    const init: Record<string, any> = {};
    formConfig.forEach((f) => {
      init[f.key] = f.type === "toggle" ? false : f.type === "tags" || f.type === "multiselect" ? [] : "";
    });
    setFormValues(init);
    setShowForm(true);
  };

  const handleOpenEdit = (item: any) => {
    setEditItem(item);
    setFormValues({ ...item });
    setShowForm(true);
  };

  const handleSave = async (dataToSave: any) => {
    const isEdit = !!editItem?._id;
    const method = isEdit ? "PUT" : "POST";
    const url = isEdit ? `${API_URL}/${endpoint}/${editItem._id}` : `${API_URL}/${endpoint}`;
    console.log('📤 [Frontend CrudTable] Saving data to URL:', url);
    console.log('📤 [Frontend CrudTable] Save request payload:', dataToSave);
    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        credentials: "include",
        body: JSON.stringify(dataToSave),
      });
      const json = await res.json();
      console.log('📥 [Frontend CrudTable] Save response json:', json);
      if (!res.ok) throw new Error(json.message);
      toast.success(isEdit ? "Record synchronized." : "New record published.");
      setShowForm(false);
      setEditItem(null);
      fetchItems();
      console.log('✅ [Frontend CrudTable] State synchronized successfully after save.');
    } catch (err: any) {
      console.error('❌ [Frontend CrudTable] Save failed:', err);
      toast.error(err.message || "Autosave write-buffer mismatch.");
    }
  };

  const handleDuplicate = async (item: any) => {
    const duplicatedData = { ...item };
    delete duplicatedData._id;
    delete duplicatedData.createdAt;
    delete duplicatedData.updatedAt;
    
    // Append Copy tag
    if (duplicatedData.name) duplicatedData.name += " (Copy)";
    if (duplicatedData.title) duplicatedData.title += " (Copy)";
    if (duplicatedData.slug) duplicatedData.slug += "-copy";

    try {
      const res = await fetch(`${API_URL}/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(duplicatedData),
      });
      if (res.ok) {
        toast.success("Document duplicated successfully.");
        fetchItems();
      } else {
        toast.error("Duplicate request failed.");
      }
    } catch {
      toast.error("Could not reach CMS services.");
    }
  };

  const handleDelete = async (id: string, hard = false) => {
    try {
      const url = hard ? `${API_URL}/${endpoint}/${id}?hard=true` : `${API_URL}/${endpoint}/${id}`;
      const res = await fetch(url, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
        credentials: "include",
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message);
      toast.success(hard ? "Erased permanently." : "Document archived to Trash.");
      setConfirmDelete(null);
      fetchItems();
    } catch (err: any) {
      toast.error(err.message || "Delete handler mismatch.");
    }
  };

  const handleRestore = async (id: string) => {
    try {
      const res = await fetch(`${API_URL}/${endpoint}/${id}/restore`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
        credentials: "include",
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message);
      toast.success("Document recovered.");
      fetchItems();
    } catch (err: any) {
      toast.error(err.message || "Recovery failure.");
    }
  };

  const handlePublish = async (id: string) => {
    try {
      const res = await fetch(`${API_URL}/${endpoint}/${id}/publish`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
        credentials: "include",
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message);
      toast.success("Publish status synchronized.");
      fetchItems();
    } catch (err: any) {
      toast.error(err.message || "Publish failure.");
    }
  };

  const sortedItems = sortKey
    ? [...items].sort((a, b) => {
        const aVal = a[sortKey] ?? "";
        const bVal = b[sortKey] ?? "";
        const cmp = String(aVal).localeCompare(String(bVal));
        return sortDir === "asc" ? cmp : -cmp;
      })
    : items;

  // Render Live Preview split view
  const renderLivePreview = () => {
    const isService = endpoint === "services";
    const name = formValues.name || formValues.title || "Untitled Document";
    const desc = formValues.description || formValues.shortDesc || "No content summary written yet.";
    const img = formValues.image || formValues.logo || "/logo.png";
    const category = formValues.category || (isService ? "Core Capabilities" : "General");

    return (
      <div className="border border-zinc-800 rounded-xl bg-zinc-950 p-6 space-y-4 max-w-sm mx-auto shadow-2xl relative overflow-hidden select-none">
        <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-2xl" />
        <div className="flex items-center justify-between">
          <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 uppercase">
            Live Preview
          </span>
          <span className="text-[10px] text-zinc-500 font-semibold">{category}</span>
        </div>
        {img && img !== "/logo.png" && (
          <div className="aspect-[16/10] w-full bg-zinc-900 rounded-lg overflow-hidden border border-zinc-800">
            <img src={img} alt="Preview" className="object-cover w-full h-full" />
          </div>
        )}
        <div className="space-y-2">
          <h4 className="font-extrabold text-sm text-white line-clamp-1">{name}</h4>
          <p className="text-[11px] text-zinc-400 leading-relaxed line-clamp-3">{desc}</p>
        </div>
        <div className="pt-4 border-t border-zinc-900 flex justify-between items-center text-[10px] text-zinc-500">
          <span>Target Score: 98%</span>
          <span>WebNest Engine</span>
        </div>
      </div>
    );
  };

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto select-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">{title}</h1>
          <p className="text-xs font-semibold text-zinc-500 mt-1">
            {total} {showTrash ? "archived" : "operational"} records synchronized
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <button
            suppressHydrationWarning
            onClick={() => { setShowTrash(!showTrash); setPage(1); }}
            className={`px-4 py-2 rounded-xl text-xs font-bold border transition-colors ${
              showTrash
                ? "bg-red-500/10 border-red-500/30 text-red-400"
                : "border-zinc-800 bg-zinc-900/40 text-zinc-400 hover:bg-zinc-900 hover:text-white"
            }`}
          >
            {showTrash ? "← Active Directory" : "Trash"}
          </button>
          {!showTrash && (
            <button
              suppressHydrationWarning
              onClick={handleOpenCreate}
              className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-lg shadow-indigo-600/10 hover:shadow-indigo-600/20"
            >
              <Plus className="w-4 h-4" />
              Create New
            </button>
          )}
        </div>
      </div>

      {/* Actions / Filter bar */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
        <input
          suppressHydrationWarning
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          placeholder={`Search ${title.toLowerCase()}...`}
          className="w-full pl-10 pr-4 py-2.5 text-xs font-semibold border border-zinc-800 rounded-xl bg-zinc-950 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder-zinc-600"
        />
      </div>

      {/* Main View Area */}
      <div>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-zinc-950/60 rounded-2xl border border-zinc-850 p-6 h-56 space-y-4">
                <div className="w-12 h-12 bg-zinc-900 rounded-xl" />
                <div className="w-1/2 h-4 bg-zinc-900 rounded" />
                <div className="w-full h-12 bg-zinc-900 rounded" />
              </div>
            ))}
          </div>
        ) : sortedItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 bg-zinc-950 rounded-2xl border border-zinc-800/80 border-dashed text-zinc-500 gap-2">
            <p className="font-semibold text-sm">No entries matched query criteria</p>
            <p className="text-xs text-zinc-600">Try adjusting your filters or create a new document.</p>
            {!showTrash && (
              <button
                suppressHydrationWarning
                onClick={handleOpenCreate}
                className="mt-2 text-xs font-bold text-indigo-400 hover:underline"
              >
                Add first item
              </button>
            )}
          </div>
        ) : layout === "grid" && !showTrash ? (
          /* High-Fidelity CMS Cards */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedItems.map((item) => {
              const name = item.name || item.title || item.question || item.author || "Unnamed Item";
              const desc = item.description || item.answer || item.quote || item.role || item.category || "";
              const img = item.image || item.logo || item.avatar || item.thumbnail || "";
              const live = item.isPublished || item.status === "published";
              
              // Dynamic SaaS Meta variables (Services context)
              const isService = endpoint === "services";
              const seoScore = item.seoScore || (isService ? 94 : null);
              const views = item.views || (isService ? 1420 : null);
              const leads = item.leads || (isService ? 12 : null);
              const category = item.category || (isService ? "Core Capabilities" : "");
              const technologies = item.technologies || (isService ? ["React", "Next.js", "Vite"] : []);

              return (
                <motion.div
                  key={item._id}
                  whileHover={{ y: -3 }}
                  className="bg-zinc-950 rounded-2xl border border-zinc-800/85 p-6 shadow-lg flex flex-col justify-between group hover:border-zinc-700/80 transition-all relative overflow-hidden"
                >
                  <div className="space-y-4">
                    {/* Featured / Live Indicator */}
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase bg-zinc-900 border border-zinc-800 text-zinc-500">
                        {category || title.slice(0, -1)}
                      </span>
                      <div className="flex items-center gap-1.5">
                        {item.featured && (
                          <span className="inline-flex items-center gap-0.5 text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
                            <Star className="w-2.5 h-2.5 fill-current" /> Featured
                          </span>
                        )}
                        <span className={`inline-flex items-center gap-1 text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                          live ? "bg-green-500/10 text-green-400 border border-green-500/20" : "bg-zinc-800 text-zinc-500"
                        }`}>
                          {live ? "Live" : "Draft"}
                        </span>
                      </div>
                    </div>

                    {/* Image overlay banner or geometric pattern fallback */}
                    {img ? (
                      <div className="relative aspect-[16/9] w-full bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800/60">
                        <img src={img} alt={name} className="object-cover w-full h-full group-hover:scale-[1.02] transition-transform duration-300" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      </div>
                    ) : (
                      <div className="relative aspect-[16/9] w-full bg-zinc-900/40 rounded-xl overflow-hidden border border-zinc-850 flex items-center justify-center">
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent blur-md" />
                        <Layers className="w-8 h-8 text-zinc-700/80" />
                      </div>
                    )}

                    <div className="space-y-1.5">
                      <h3 className="font-extrabold text-base text-white group-hover:text-indigo-400 transition-colors leading-snug">{name}</h3>
                      <p className="text-xs text-zinc-400 line-clamp-3 leading-relaxed">{desc}</p>
                    </div>

                    {/* Service/Card Metrics Indicators */}
                    {isService && (
                      <div className="grid grid-cols-3 gap-2 bg-zinc-900/30 p-2.5 rounded-xl border border-zinc-900/80 text-[10px] text-zinc-500 font-semibold select-none">
                        <div className="flex flex-col">
                          <span className="text-[8px] uppercase tracking-wider text-zinc-600">SEO Score</span>
                          <span className="text-white font-bold mt-0.5 flex items-center gap-0.5">
                            <Award className="w-3 h-3 text-indigo-400" /> {seoScore}%
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[8px] uppercase tracking-wider text-zinc-600">Views</span>
                          <span className="text-white font-bold mt-0.5 flex items-center gap-0.5">
                            <Eye className="w-3 h-3 text-indigo-400" /> {views}
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[8px] uppercase tracking-wider text-zinc-600">Leads</span>
                          <span className="text-white font-bold mt-0.5 flex items-center gap-0.5">
                            <TrendingUp className="w-3 h-3 text-indigo-400" /> {leads}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Technologies tags */}
                    {technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {technologies.map((t: string) => (
                          <span key={t} className="text-[9px] font-bold bg-zinc-900 text-zinc-500 px-2 py-0.5 rounded border border-zinc-800/40">{t}</span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Actions footer */}
                  <div className="mt-6 pt-4 border-t border-zinc-800/60 flex items-center justify-between text-[10px] text-zinc-500 font-medium">
                    <span className="font-semibold text-zinc-600 flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> Updated: {new Date(item.updatedAt || item.createdAt).toLocaleDateString()}
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        suppressHydrationWarning
                        onClick={() => handleDuplicate(item)}
                        className="p-1.5 rounded-lg border border-zinc-800 hover:border-zinc-700 bg-zinc-900/40 hover:bg-zinc-900 text-zinc-400 hover:text-white transition-colors"
                        title="Duplicate"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                      <button
                        suppressHydrationWarning
                        onClick={() => handleOpenEdit(item)}
                        className="p-1.5 rounded-lg border border-zinc-800 hover:border-zinc-700 bg-zinc-900/40 hover:bg-zinc-900 text-zinc-400 hover:text-white transition-colors"
                        title="Edit Details"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        suppressHydrationWarning
                        onClick={() => setConfirmDelete({ id: item._id, name })}
                        className="p-1.5 rounded-lg border border-zinc-800 hover:border-red-950/40 bg-zinc-900/40 hover:bg-red-950/20 text-zinc-500 hover:text-red-400 transition-colors"
                        title="Archive to Trash"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          /* Table Layout Mode */
          <div className="bg-zinc-950 rounded-2xl border border-zinc-800/80 overflow-hidden shadow-lg">
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-zinc-800/80 bg-zinc-900/30 text-zinc-400 font-bold uppercase tracking-wider">
                    {reorderable && <th className="w-8 px-3 py-3" />}
                    {columns.map((col) => (
                      <th
                        key={col.key}
                        className="px-4 py-3.5 text-left cursor-pointer select-none"
                        onClick={() => {
                          if (col.sortable !== false) {
                            setSortDir(sortKey === col.key && sortDir === "asc" ? "desc" : "asc");
                            setSortKey(col.key);
                          }
                        }}
                      >
                        <div className="flex items-center gap-1.5">
                          {col.label}
                          {sortKey === col.key && (sortDir === "asc" ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />)}
                        </div>
                      </th>
                    ))}
                    <th className="px-4 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-900 text-zinc-300">
                  {sortedItems.map((item) => (
                    <tr key={item._id} className="hover:bg-zinc-900/20 transition-colors">
                      {reorderable && (
                        <td className="px-3 py-3">
                          <GripVertical className="w-4 h-4 text-zinc-600 cursor-grab" />
                        </td>
                      )}
                      {columns.map((col) => (
                        <td key={col.key} className="px-4 py-3.5 max-w-xs font-semibold">
                          {col.render ? col.render(item[col.key], item) : (
                            <span className="truncate block">{String(item[col.key] ?? "—")}</span>
                          )}
                        </td>
                      ))}
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1.5">
                          {showTrash ? (
                            <>
                              <button
                                suppressHydrationWarning
                                onClick={() => handleRestore(item._id)}
                                className="p-1.5 rounded-lg border border-zinc-800 hover:bg-zinc-900 text-indigo-400 transition-colors"
                                title="Restore"
                              >
                                <RotateCcw className="w-3.5 h-3.5" />
                              </button>
                              <button
                                suppressHydrationWarning
                                onClick={() => setConfirmDelete({ id: item._id, name: item.name || item.title || item._id })}
                                className="p-1.5 rounded-lg border border-zinc-800 hover:bg-red-950/20 text-red-400 transition-colors"
                                title="Delete Permanently"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </>
                          ) : (
                            <>
                              {publishable && !item.isPublished && item.status !== "published" && (
                                <button
                                  suppressHydrationWarning
                                  onClick={() => handlePublish(item._id)}
                                  className="px-2.5 py-1 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-[10px] font-bold hover:bg-green-500/20 transition-all"
                                >
                                  Publish
                                </button>
                              )}
                              {(item.isPublished || item.status === "published") && (
                                <span className="px-2 py-1 rounded-lg bg-green-500/10 border border-green-500/10 text-green-400 text-[10px] font-extrabold uppercase">Live</span>
                              )}
                              <button
                                suppressHydrationWarning
                                onClick={() => handleDuplicate(item)}
                                className="p-1.5 rounded-lg border border-zinc-800 hover:bg-zinc-900 text-zinc-400 hover:text-white transition-colors"
                                title="Duplicate"
                              >
                                <Copy className="w-3.5 h-3.5" />
                              </button>
                              <button
                                suppressHydrationWarning
                                onClick={() => handleOpenEdit(item)}
                                className="p-1.5 rounded-lg border border-zinc-800 hover:bg-zinc-900 text-zinc-400 hover:text-white transition-colors"
                                title="Edit"
                              >
                                <Pencil className="w-3.5 h-3.5" />
                              </button>
                              <button
                                suppressHydrationWarning
                                onClick={() => setConfirmDelete({ id: item._id, name: item.name || item.title || item._id })}
                                className="p-1.5 rounded-lg border border-zinc-800 hover:bg-red-950/20 text-red-500 hover:text-red-400 transition-colors"
                                title="Delete"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Pagination */}
      {total > 30 && (
        <div className="flex items-center justify-between text-xs text-zinc-500">
          <span>Showing {Math.min((page - 1) * 30 + 1, total)}–{Math.min(page * 30, total)} of {total}</span>
          <div className="flex gap-2">
            <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="px-3.5 py-1.5 rounded-xl border border-zinc-800 bg-zinc-950 text-zinc-400 disabled:opacity-40 hover:bg-zinc-900 font-bold transition-all">Prev</button>
            <button disabled={page * 30 >= total} onClick={() => setPage(p => p + 1)} className="px-3.5 py-1.5 rounded-xl border border-zinc-800 bg-zinc-950 text-zinc-400 disabled:opacity-40 hover:bg-zinc-900 font-bold transition-all">Next</button>
          </div>
        </div>
      )}

      {/* Side Slide-Over Edit Drawer */}
      <AnimatePresence>
        {showForm && (
          <div className="fixed inset-0 z-50 flex justify-end bg-black/70">
            <div className="absolute inset-0" onClick={() => { setShowForm(false); setEditItem(null); }} />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="relative w-full max-w-4xl bg-zinc-950 border-l border-zinc-800 flex flex-col h-full shadow-2xl z-10"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800/80 bg-zinc-950">
                <div>
                  <h2 className="text-base font-bold text-white">
                    {editItem ? `Edit ${title.slice(0, -1)}` : `Create ${title.slice(0, -1)}`}
                  </h2>
                  <p className="text-[10px] text-zinc-500 mt-0.5 uppercase tracking-wider font-semibold">
                    {editItem ? `ID: ${editItem._id}` : "New Entry Details"}
                  </p>
                </div>
                <button onClick={() => { setShowForm(false); setEditItem(null); }} className="w-8 h-8 flex items-center justify-center rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-850 text-zinc-500 hover:text-white transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Split Drawer Form and Live Preview Body */}
              <div className="flex-1 overflow-hidden flex flex-col md:flex-row bg-zinc-900/10">
                {/* Left Form (Scrollable) */}
                <div className="flex-1 overflow-y-auto p-6 border-r border-zinc-900">
                  {renderForm ? (
                    renderForm({ item: editItem, onSave: handleSave, onCancel: () => { setShowForm(false); setEditItem(null); } })
                  ) : (
                    <EditForm 
                      fields={formConfig} 
                      defaultValues={editItem} 
                      onSave={handleSave} 
                      onCancel={() => { setShowForm(false); setEditItem(null); }} 
                      onChange={(updatedVals) => setFormValues(updatedVals)}
                    />
                  )}
                </div>

                {/* Right Live Preview Split Panel (Visible on Desktop) */}
                <div className="hidden md:flex w-[350px] bg-zinc-950 p-6 flex-col justify-center border-l border-zinc-900">
                  {renderLivePreview()}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Confirm Delete */}
      {confirmDelete && (
        <ConfirmModal
          title={showTrash ? "Delete item permanently?" : "Move item to trash?"}
          description={
            showTrash
              ? `Are you sure you want to permanently erase "${confirmDelete.name}"? This action cannot be reversed.`
              : `Are you sure you want to soft-delete "${confirmDelete.name}"? You can recover it from the Trash Manager later.`
          }
          confirmLabel={showTrash ? "Permanently Erase" : "Move to Trash"}
          onConfirm={() => handleDelete(confirmDelete.id, showTrash)}
          onCancel={() => setConfirmDelete(null)}
          danger
        />
      )}
    </div>
  );
}

// ─── Inline Form Modal Wrapper ──────────────────────────────────
import { EditForm } from "./EditForm";
