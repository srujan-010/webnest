"use client";

import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useAuth } from "@/components/admin/AuthProvider";
import { Save } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export default function AdminNavigation() {
  const { token } = useAuth();
  const [items, setItems] = useState<{ label: string; url: string; order: number }[]>([]);
  const [headerCta, setHeaderCta] = useState({ label: "Start Project", link: "/contact" });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/settings`)
      .then(r => r.json())
      .then(json => {
        if (json.success && json.data) {
          setItems(json.data.navItems || []);
          setHeaderCta(json.data.headerCta || { label: "Start Project", link: "/contact" });
        }
      });
  }, []);

  const addItem = () => setItems(prev => [...prev, { label: "", url: "", order: prev.length }]);
  const removeItem = (i: number) => setItems(prev => prev.filter((_, idx) => idx !== i));
  const updateItem = (i: number, key: string, val: string) =>
    setItems(prev => prev.map((item, idx) => idx === i ? { ...item, [key]: val } : item));

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch(`${API_URL}/settings`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        credentials: "include",
        body: JSON.stringify({ navItems: items, headerCta }),
      });
      if (res.ok) toast.success("Navigation saved!");
      else throw new Error("Save failed.");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Navigation</h1>
          <p className="text-sm text-gray-500 mt-0.5">Manage top navigation links and header CTA button.</p>
        </div>
        <button onClick={handleSave} disabled={saving} className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-60">
          <Save className="w-4 h-4" /> {saving ? "Saving…" : "Save"}
        </button>
      </div>

      {/* Nav Items */}
      <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
        <div className="px-4 py-3 flex items-center justify-between">
          <h2 className="font-semibold text-gray-900 text-sm">Nav Menu Items</h2>
          <button onClick={addItem} className="text-xs text-blue-600 hover:underline">+ Add Item</button>
        </div>
        {items.length === 0 && (
          <div className="px-4 py-8 text-center text-gray-400 text-sm">No nav items yet. Add one above.</div>
        )}
        {items.map((item, i) => (
          <div key={i} className="px-4 py-3 flex items-center gap-3">
            <div className="flex-1 grid grid-cols-2 gap-2">
              <input
                value={item.label}
                onChange={(e) => updateItem(i, "label", e.target.value)}
                placeholder="Label (e.g. Services)"
                className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
              <input
                value={item.url}
                onChange={(e) => updateItem(i, "url", e.target.value)}
                placeholder="URL (e.g. /services)"
                className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
            <button onClick={() => removeItem(i)} className="text-red-400 hover:text-red-600 text-xs px-2">Remove</button>
          </div>
        ))}
      </div>

      {/* Header CTA */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-4">
        <h2 className="font-semibold text-gray-900 text-sm">Header CTA Button</h2>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-gray-500 block mb-1">Button Label</label>
            <input
              value={headerCta.label}
              onChange={(e) => setHeaderCta(prev => ({ ...prev, label: e.target.value }))}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
          <div>
            <label className="text-xs text-gray-500 block mb-1">Button Link</label>
            <input
              value={headerCta.link}
              onChange={(e) => setHeaderCta(prev => ({ ...prev, link: e.target.value }))}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
