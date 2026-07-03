"use client";

import React, { useState, useEffect, useCallback } from "react";
import { 
  Plus, Search, ArrowUp, ArrowDown, Trash2, Star, Edit2, 
  Copy, Check, X, Eye, EyeOff, Sparkles, Filter 
} from "lucide-react";
import { toast } from "react-hot-toast";
import { useAuth } from "@/components/admin/AuthProvider";
import { ImageUploader } from "@/components/admin/ImageUploader";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export default function AdminShowcaseItems() {
  const { token } = useAuth();
  const [items, setItems] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Search & Filter
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<"all" | "active" | "disabled" | "featured">("all");
  
  // Drawer Editor State
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  
  // Form Values
  const [formProject, setFormProject] = useState("");
  const [formOrder, setFormOrder] = useState(0);
  const [formEnabled, setFormEnabled] = useState(true);
  const [formFeatured, setFormFeatured] = useState(false);
  const [formCtaLabel, setFormCtaLabel] = useState("");
  const [formCtaLink, setFormCtaLink] = useState("");
  const [formDescOverride, setFormDescOverride] = useState("");
  const [formBannerOverride, setFormBannerOverride] = useState("");
  const [formMobileOverride, setFormMobileOverride] = useState("");

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [itemsRes, projRes] = await Promise.all([
        fetch(`${API_URL}/hero-showcase-items`, { credentials: "include" }),
        fetch(`${API_URL}/projects`, { credentials: "include" })
      ]);
      
      const itemsJson = await itemsRes.json();
      const projJson = await projRes.json();
      
      if (itemsJson.success) {
        setItems(itemsJson.data || []);
      }
      if (projJson.success) {
        setProjects(projJson.data || []);
      }
    } catch (err) {
      toast.error("Failed to load CMS data.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Open creation drawer
  const handleOpenCreate = () => {
    setEditingItem(null);
    setFormProject("");
    // Find next available order index
    const maxOrder = items.reduce((max, item) => Math.max(max, item.order || 0), -1);
    setFormOrder(maxOrder + 1);
    setFormEnabled(true);
    setFormFeatured(false);
    setFormCtaLabel("");
    setFormCtaLink("");
    setFormDescOverride("");
    setFormBannerOverride("");
    setFormMobileOverride("");
    setDrawerOpen(true);
  };

  // Open edit drawer
  const handleOpenEdit = (item: any) => {
    setEditingItem(item);
    setFormProject(item.project?._id || item.project || "");
    setFormOrder(item.order ?? 0);
    setFormEnabled(item.isEnabled ?? true);
    setFormFeatured(item.isFeatured ?? false);
    setFormCtaLabel(item.customCtaLabel || "");
    setFormCtaLink(item.customCtaLink || "");
    setFormDescOverride(item.descriptionOverride || "");
    setFormBannerOverride(item.overrideBannerImage || "");
    setFormMobileOverride(item.overrideMobileImage || "");
    setDrawerOpen(true);
  };

  // Save item (Create or Edit)
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formProject) {
      toast.error("Please select a portfolio project.");
      return;
    }

    const payload = {
      project: formProject,
      order: formOrder,
      isEnabled: formEnabled,
      isFeatured: formFeatured,
      customCtaLabel: formCtaLabel || undefined,
      customCtaLink: formCtaLink || undefined,
      descriptionOverride: formDescOverride || undefined,
      overrideBannerImage: formBannerOverride || undefined,
      overrideMobileImage: formMobileOverride || undefined,
    };

    const isEdit = !!editingItem;
    const url = isEdit ? `${API_URL}/hero-showcase-items/${editingItem._id}` : `${API_URL}/hero-showcase-items`;
    const method = isEdit ? "PUT" : "POST";

    try {
      // If setting this item as featured, we need to make sure others are unfeatured.
      // The backend does it, or we handle it. But to be safe, let's proceed.
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        credentials: "include",
        body: JSON.stringify(payload)
      });
      
      const json = await res.json();
      if (!res.ok) throw new Error(json.message);
      
      toast.success(isEdit ? "Showcase item updated." : "Showcase item created.");
      setDrawerOpen(false);
      fetchData();
    } catch (err: any) {
      toast.error(err.message || "Save failed.");
    }
  };

  // Quick toggle enabled
  const toggleEnabled = async (item: any) => {
    try {
      const res = await fetch(`${API_URL}/hero-showcase-items/${item._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        credentials: "include",
        body: JSON.stringify({ isEnabled: !item.isEnabled })
      });
      if (res.ok) {
        toast.success(`Showcase item ${!item.isEnabled ? "enabled" : "disabled"}.`);
        fetchData();
      }
    } catch (err) {
      toast.error("Failed to update status.");
    }
  };

  // Quick toggle featured
  const toggleFeatured = async (item: any) => {
    try {
      // If setting to featured, we must turn off featured on all other items first
      if (!item.isFeatured) {
        const otherFeatured = items.filter(i => i.isFeatured && i._id !== item._id);
        await Promise.all(
          otherFeatured.map(other => 
            fetch(`${API_URL}/hero-showcase-items/${other._id}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
              },
              credentials: "include",
              body: JSON.stringify({ isFeatured: false })
            })
          )
        );
      }

      const res = await fetch(`${API_URL}/hero-showcase-items/${item._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        credentials: "include",
        body: JSON.stringify({ isFeatured: !item.isFeatured })
      });
      if (res.ok) {
        toast.success(item.isFeatured ? "Removed from featured." : "Set as featured slide.");
        fetchData();
      }
    } catch (err) {
      toast.error("Failed to update featured slide.");
    }
  };

  // Move item order up or down
  const handleMove = async (index: number, direction: "up" | "down") => {
    const list = [...sortedItems];
    if (direction === "up" && index === 0) return;
    if (direction === "down" && index === list.length - 1) return;

    const swapIndex = direction === "up" ? index - 1 : index + 1;
    const current = list[index];
    const target = list[swapIndex];

    try {
      // Swap order values in DB
      await Promise.all([
        fetch(`${API_URL}/hero-showcase-items/${current._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          credentials: "include",
          body: JSON.stringify({ order: target.order })
        }),
        fetch(`${API_URL}/hero-showcase-items/${target._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          credentials: "include",
          body: JSON.stringify({ order: current.order })
        })
      ]);
      
      toast.success("Showcase order rearranged.");
      fetchData();
    } catch (err) {
      toast.error("Failed to reorder items.");
    }
  };

  // Duplicate item
  const handleDuplicate = async (item: any) => {
    try {
      const payload = {
        project: item.project?._id || item.project,
        order: (item.order ?? 0) + 1,
        isEnabled: item.isEnabled ?? true,
        isFeatured: false, // Don't duplicate featured status
        customCtaLabel: item.customCtaLabel,
        customCtaLink: item.customCtaLink,
        descriptionOverride: item.descriptionOverride,
        overrideBannerImage: item.overrideBannerImage,
        overrideMobileImage: item.overrideMobileImage
      };

      const res = await fetch(`${API_URL}/hero-showcase-items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        credentials: "include",
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        toast.success("Showcase item duplicated.");
        fetchData();
      }
    } catch (err) {
      toast.error("Failed to duplicate item.");
    }
  };

  // Delete item
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this showcase item?")) return;
    try {
      const res = await fetch(`${API_URL}/hero-showcase-items/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
        credentials: "include"
      });
      if (res.ok) {
        toast.success("Showcase item deleted.");
        fetchData();
      }
    } catch (err) {
      toast.error("Failed to delete item.");
    }
  };

  // Sort & Filter logic
  const filteredItems = items.filter((item) => {
    const proj = item.project;
    const name = proj?.title || proj?.name || "Untitled";
    const category = proj?.category || "";
    
    // Search matches
    const searchMatch = 
      name.toLowerCase().includes(search.toLowerCase()) || 
      category.toLowerCase().includes(search.toLowerCase());
      
    // Filter matches
    if (filterType === "active") return searchMatch && item.isEnabled;
    if (filterType === "disabled") return searchMatch && !item.isEnabled;
    if (filterType === "featured") return searchMatch && item.isFeatured;
    
    return searchMatch;
  });

  const sortedItems = [...filteredItems].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto select-none text-zinc-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-indigo-500" /> Hero Showcase Items
          </h1>
          <p className="text-xs font-semibold text-zinc-500 mt-1">
            {sortedItems.length} portfolio items configured in the homepage showcase
          </p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-lg shadow-indigo-600/10"
        >
          <Plus className="w-4 h-4" /> Create Showcase Item
        </button>
      </div>

      {/* Search, Filter, Sort Controls */}
      <div className="flex flex-col md:flex-row gap-4 bg-zinc-950 p-4 rounded-2xl border border-zinc-800/80">
        <div className="flex-1 relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Search by project name or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-zinc-800 rounded-xl bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-xs text-white"
          />
        </div>

        <div className="flex gap-2 shrink-0">
          <div className="flex items-center gap-1.5 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-xl text-xs">
            <Filter className="w-3.5 h-3.5 text-zinc-500" />
            <select
              value={filterType}
              onChange={(e: any) => setFilterType(e.target.value)}
              className="bg-transparent text-white focus:outline-none font-bold"
            >
              <option value="all">All Items</option>
              <option value="active">Enabled Only</option>
              <option value="disabled">Disabled Only</option>
              <option value="featured">Featured Slide Only</option>
            </select>
          </div>
        </div>
      </div>

      {/* Items Grid Layout */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-56 bg-zinc-950 border border-zinc-900 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : sortedItems.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-zinc-800 rounded-2xl bg-zinc-900/10">
          <p className="text-sm font-bold text-zinc-400">No showcase items found.</p>
          <p className="text-xs text-zinc-600 mt-1">Create a new item or search with a different keyword.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedItems.map((item, index) => {
            const project = item.project;
            const name = project?.title || project?.name || "Untitled Project";
            const category = project?.category || "General";
            const coverImage = item.overrideBannerImage || project?.coverImage || "/placeholder.png";
            const desc = item.descriptionOverride || project?.shortDescription || "No description available.";
            const isEnabled = item.isEnabled;
            const isFeatured = item.isFeatured;

            return (
              <div
                key={item._id}
                className={`relative flex flex-col justify-between bg-zinc-950 border rounded-2xl p-5 shadow-lg group hover:border-zinc-700 transition-all ${
                  isFeatured ? "ring-1 ring-amber-500/30 border-amber-500/20" : "border-zinc-800"
                }`}
              >
                <div className="space-y-4">
                  {/* Status indicators */}
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase bg-zinc-900 border border-zinc-800 text-zinc-500">
                      {category}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono text-zinc-600 text-[10px] font-bold">#{item.order}</span>
                      {isFeatured && (
                        <span className="inline-flex items-center gap-0.5 text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                          <Star className="w-2.5 h-2.5 fill-current" /> Featured
                        </span>
                      )}
                      <span className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                        isEnabled 
                          ? "bg-green-500/10 text-green-400 border border-green-500/20" 
                          : "bg-zinc-900 text-zinc-600 border border-zinc-800"
                      }`}>
                        {isEnabled ? "Active" : "Disabled"}
                      </span>
                    </div>
                  </div>

                  {/* Project Cover Preview */}
                  <div className="relative aspect-[16/9] w-full bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800/60">
                    <img
                      src={coverImage}
                      alt={name}
                      className="object-cover w-full h-full group-hover:scale-[1.02] transition-transform duration-300"
                    />
                  </div>

                  {/* Details */}
                  <div className="space-y-1">
                    <h3 className="font-extrabold text-sm text-white group-hover:text-indigo-400 transition-colors leading-tight line-clamp-1">
                      {name}
                    </h3>
                    <p className="text-[11px] text-zinc-500 leading-normal line-clamp-2">{desc}</p>
                    
                    {/* Overrides labels */}
                    <div className="flex flex-wrap gap-1.5 pt-1.5">
                      {item.descriptionOverride && (
                        <span className="text-[9px] font-bold bg-zinc-900 border border-zinc-800 text-indigo-400 px-1.5 py-0.5 rounded">
                          Desc Override
                        </span>
                      )}
                      {(item.overrideBannerImage || item.overrideMobileImage) && (
                        <span className="text-[9px] font-bold bg-zinc-900 border border-zinc-800 text-pink-400 px-1.5 py-0.5 rounded">
                          Image Override
                        </span>
                      )}
                      {(item.customCtaLabel || item.customCtaLink) && (
                        <span className="text-[9px] font-bold bg-zinc-900 border border-zinc-800 text-purple-400 px-1.5 py-0.5 rounded">
                          CTA Override
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Actions Footer */}
                <div className="mt-5 pt-3 border-t border-zinc-900 flex items-center justify-between">
                  {/* Order movement buttons */}
                  <div className="flex gap-1">
                    <button
                      onClick={() => handleMove(index, "up")}
                      disabled={index === 0}
                      className="p-1 rounded bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-400 disabled:opacity-20 transition-colors"
                      title="Move Up"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleMove(index, "down")}
                      disabled={index === sortedItems.length - 1}
                      className="p-1 rounded bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-400 disabled:opacity-20 transition-colors"
                      title="Move Down"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Edit/Duplicate/Delete buttons */}
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => toggleEnabled(item)}
                      className={`p-1.5 rounded-lg border transition-colors ${
                        isEnabled
                          ? "border-green-500/20 bg-green-500/5 text-green-400 hover:bg-green-500/10"
                          : "border-zinc-800 bg-zinc-900/40 text-zinc-500 hover:border-zinc-700"
                      }`}
                      title={isEnabled ? "Disable Item" : "Enable Item"}
                    >
                      {isEnabled ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                    </button>
                    <button
                      onClick={() => toggleFeatured(item)}
                      className={`p-1.5 rounded-lg border transition-colors ${
                        isFeatured
                          ? "border-amber-500/20 bg-amber-500/5 text-amber-400 hover:bg-amber-500/10"
                          : "border-zinc-800 bg-zinc-900/40 text-zinc-500 hover:border-zinc-700"
                      }`}
                      title={isFeatured ? "Starred (Featured)" : "Make Featured slide"}
                    >
                      <Star className={`w-3.5 h-3.5 ${isFeatured ? "fill-amber-400" : ""}`} />
                    </button>
                    <button
                      onClick={() => handleDuplicate(item)}
                      className="p-1.5 rounded-lg border border-zinc-800 hover:border-zinc-700 bg-zinc-900/40 hover:bg-zinc-900 text-zinc-400 hover:text-white transition-colors"
                      title="Duplicate"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleOpenEdit(item)}
                      className="p-1.5 rounded-lg border border-zinc-850 hover:border-indigo-500/30 bg-zinc-900/40 hover:bg-indigo-600/10 text-zinc-400 hover:text-indigo-400 transition-colors"
                      title="Edit Item"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="p-1.5 rounded-lg border border-zinc-850 hover:border-red-500/30 bg-zinc-900/40 hover:bg-red-950/20 text-zinc-500 hover:text-red-400 transition-colors"
                      title="Delete Item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Edit Drawer Modal */}
      {drawerOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-end">
          <div className="w-full max-w-lg bg-zinc-950 border-l border-zinc-850 p-6 flex flex-col justify-between shadow-2xl overflow-y-auto">
            <div>
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-4 border-b border-zinc-850 mb-6">
                <div>
                  <h2 className="text-base font-extrabold text-white">
                    {editingItem ? "Edit Showcase Item" : "Create Showcase Item"}
                  </h2>
                  <p className="text-[10px] text-zinc-500 font-semibold mt-0.5">
                    Select a portfolio reference and configure display overrides
                  </p>
                </div>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-zinc-900 text-zinc-400 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Form Body */}
              <form onSubmit={handleSave} className="space-y-5">
                {/* Project selector */}
                <div>
                  <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">
                    Portfolio Project Reference
                  </label>
                  <select
                    value={formProject}
                    onChange={(e) => setFormProject(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs font-semibold border border-zinc-800 rounded-xl bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-white transition-all"
                    required
                  >
                    <option value="">Choose a project...</option>
                    {projects.map((proj) => (
                      <option key={proj._id} value={proj._id}>
                        {proj.title || proj.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Display Order */}
                <div>
                  <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">
                    Display Order (#)
                  </label>
                  <input
                    type="number"
                    value={formOrder}
                    onChange={(e) => setFormOrder(Number(e.target.value))}
                    placeholder="0"
                    className="w-full px-3.5 py-2 text-xs font-semibold border border-zinc-800 rounded-xl bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-white transition-all"
                    required
                  />
                </div>

                {/* Enabled & Featured Checkboxes */}
                <div className="grid grid-cols-2 gap-4 pt-1.5">
                  <label className="flex items-center gap-2 border border-zinc-900 bg-zinc-900/30 p-3 rounded-xl cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formEnabled}
                      onChange={(e) => setFormEnabled(e.target.checked)}
                      className="rounded border-zinc-800 bg-zinc-950 text-indigo-600 focus:ring-indigo-500/20"
                    />
                    <span className="text-xs font-bold text-zinc-400">Enabled</span>
                  </label>
                  <label className="flex items-center gap-2 border border-zinc-900 bg-zinc-900/30 p-3 rounded-xl cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formFeatured}
                      onChange={(e) => setFormFeatured(e.target.checked)}
                      className="rounded border-zinc-800 bg-zinc-950 text-indigo-600 focus:ring-indigo-500/20"
                    />
                    <span className="text-xs font-bold text-zinc-400">Featured (Start Slide)</span>
                  </label>
                </div>

                {/* Divider */}
                <div className="border-t border-zinc-850/80 my-2 pt-2">
                  <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-1">
                    Showcase Value Overrides
                  </h4>
                  <p className="text-[9px] text-zinc-500 leading-normal">
                    Leave overrides blank to automatically inherit values from the original portfolio project record.
                  </p>
                </div>

                {/* Custom CTA Label */}
                <div>
                  <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">
                    Custom CTA Label
                  </label>
                  <input
                    type="text"
                    value={formCtaLabel}
                    onChange={(e) => setFormCtaLabel(e.target.value)}
                    placeholder="e.g. Launch POS Panel (Default: View Case Study)"
                    className="w-full px-3.5 py-2 text-xs font-semibold border border-zinc-800 rounded-xl bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-white transition-all"
                  />
                </div>

                {/* Custom CTA Link */}
                <div>
                  <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">
                    Custom CTA Link (URL)
                  </label>
                  <input
                    type="text"
                    value={formCtaLink}
                    onChange={(e) => setFormCtaLink(e.target.value)}
                    placeholder="e.g. https://pos.shop.com (Default: Case Study Slug)"
                    className="w-full px-3.5 py-2 text-xs font-semibold border border-zinc-800 rounded-xl bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-white transition-all"
                  />
                </div>

                {/* Description Override */}
                <div>
                  <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">
                    Description Override
                  </label>
                  <textarea
                    value={formDescOverride}
                    onChange={(e) => setFormDescOverride(e.target.value)}
                    rows={3}
                    placeholder="Specify a shorter or more marketing-oriented summary text for the hero slider..."
                    className="w-full px-3.5 py-2 text-xs font-semibold border border-zinc-800 rounded-xl bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-white transition-all resize-none"
                  />
                </div>

                {/* Image Overrides */}
                <div className="border-t border-zinc-850/80 my-2 pt-2">
                  <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-1">
                    Image Overrides
                  </h4>
                  <p className="text-[9px] text-zinc-500 leading-normal mb-4">
                    If omitted, the hero showcase uses the underlying portfolio project's cover image.
                  </p>
                  
                  <div className="space-y-4">
                    {/* Banner Image Override */}
                    <div className="bg-zinc-900/30 p-3 rounded-xl border border-zinc-900">
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider">
                          Banner Image (Desktop)
                        </label>
                        {formBannerOverride && (
                          <button
                            type="button"
                            onClick={() => setFormBannerOverride("")}
                            className="text-[10px] bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-2 py-1 rounded transition-colors"
                          >
                            Reset to Portfolio Image
                          </button>
                        )}
                      </div>
                      
                      {!formBannerOverride && formProject ? (
                        <div className="mb-3 p-3 bg-zinc-950 border border-zinc-800 rounded-xl flex items-center gap-3">
                          <div className="w-16 h-10 bg-zinc-900 rounded overflow-hidden flex-shrink-0">
                            <img 
                              src={projects.find(p => p._id === formProject)?.coverImage || "/placeholder.png"} 
                              alt="Portfolio Default" 
                              className="w-full h-full object-cover opacity-80"
                            />
                          </div>
                          <div>
                            <span className="text-[10px] uppercase font-bold text-zinc-500 block">Current Source</span>
                            <span className="text-xs font-bold text-zinc-300">Portfolio Project (Default)</span>
                          </div>
                        </div>
                      ) : null}
                      
                      <ImageUploader
                        value={formBannerOverride}
                        onChange={setFormBannerOverride}
                        aspectRatio="16/9"
                      />
                      {formBannerOverride && (
                        <div className="mt-2 text-[10px] text-indigo-400 font-semibold flex justify-end">
                          ✓ Using Override Image
                        </div>
                      )}
                    </div>

                    {/* Mobile Image Override */}
                    <div className="bg-zinc-900/30 p-3 rounded-xl border border-zinc-900">
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider">
                          Mobile Image (Optional)
                        </label>
                        {formMobileOverride && (
                          <button
                            type="button"
                            onClick={() => setFormMobileOverride("")}
                            className="text-[10px] bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-2 py-1 rounded transition-colors"
                          >
                            Clear
                          </button>
                        )}
                      </div>
                      <ImageUploader
                        value={formMobileOverride}
                        onChange={setFormMobileOverride}
                        aspectRatio="9/16"
                      />
                    </div>
                  </div>
                </div>

                {/* Form Buttons */}
                <div className="flex justify-end gap-3 pt-6 border-t border-zinc-850 mt-6">
                  <button
                    type="button"
                    onClick={() => setDrawerOpen(false)}
                    className="px-4 py-2 text-xs font-bold text-zinc-400 border border-zinc-800 hover:border-zinc-700 bg-zinc-900/40 hover:bg-zinc-900 rounded-xl transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-all shadow-lg"
                  >
                    {editingItem ? "Save Changes" : "Create Item"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
