"use client";

import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useAuth } from "@/components/admin/AuthProvider";
import { Trash2, RotateCcw, AlertTriangle } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

interface ITrashItem {
  id: string;
  type: string;
  name: string;
  endpoint: string;
  deletedAt?: string;
}

export default function AdminTrash() {
  const { token } = useAuth();
  const [items, setItems] = useState<ITrashItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTrash = async () => {
    setLoading(true);
    const endpoints = [
      { key: "projects", label: "Project" },
      { key: "services", label: "Service" },
      { key: "testimonials", label: "Testimonial" },
      { key: "faq", label: "FAQ" },
      { key: "team", label: "Team Member" },
      { key: "techstack", label: "Technology" },
    ];

    try {
      const allResults = await Promise.all(
        endpoints.map(async (ep) => {
          try {
            const res = await fetch(`${API_URL}/${ep.key}?trash=true`, {
              headers: { Authorization: `Bearer ${token}` },
            });
            const json = await res.json();
            if (json.success && Array.isArray(json.data)) {
              return json.data.map((item: any) => ({
                id: item._id,
                type: ep.label,
                name: item.name || item.title || item.question || item.author || "Unnamed Record",
                endpoint: ep.key,
                deletedAt: item.deletedAt || item.updatedAt,
              }));
            }
          } catch {}
          return [];
        })
      );
      setItems(allResults.flat());
    } catch {
      toast.error("Failed to query trash items.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchTrash();
  }, [token]);

  const handleRestore = async (item: ITrashItem) => {
    try {
      const res = await fetch(`${API_URL}/${item.endpoint}/${item.id}/restore`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();
      if (res.ok && json.success) {
        toast.success(`Successfully restored "${item.name}"`);
        fetchTrash();
      } else {
        toast.error(json.message || "Failed to restore record.");
      }
    } catch {
      toast.error("Error restoring record.");
    }
  };

  const handleHardDelete = async (item: ITrashItem) => {
    if (!window.confirm(`Are you sure you want to permanently delete "${item.name}"? This action CANNOT be undone.`)) {
      return;
    }

    try {
      const res = await fetch(`${API_URL}/${item.endpoint}/${item.id}?hard=true`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();
      if (res.ok && json.success) {
        toast.success(`Permanently deleted "${item.name}"`);
        fetchTrash();
      } else {
        toast.error(json.message || "Failed to permanently delete.");
      }
    } catch {
      toast.error("Error permanently deleting.");
    }
  };

  return (
    <div className="p-8 h-full bg-gray-50/50 space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-display text-gray-900 tracking-tight">Trash Manager</h1>
        <p className="text-gray-500 mt-1">Review soft-deleted entries across all collections and restore them to live view.</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 font-medium">
              <th className="px-6 py-4">Record Name</th>
              <th className="px-6 py-4">Content Type</th>
              <th className="px-6 py-4">Deleted At</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-gray-400">Loading deleted records…</td>
              </tr>
            ) : items.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-gray-400 flex flex-col items-center gap-2 justify-center">
                  <AlertTriangle className="w-8 h-8 text-amber-500/80" />
                  <p className="font-medium">Your trash is currently empty</p>
                  <p className="text-xs text-gray-400">Items you delete will show up here for recovery.</p>
                </td>
              </tr>
            ) : (
              items.map((item) => (
                <tr key={`${item.endpoint}-${item.id}`} className="hover:bg-gray-50/50">
                  <td className="px-6 py-4 font-semibold text-gray-900">{item.name}</td>
                  <td className="px-6 py-4 text-gray-500">
                    <span className="px-2 py-0.5 rounded-md bg-gray-100 border border-gray-200 text-xs font-semibold text-gray-700">
                      {item.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {item.deletedAt ? new Date(item.deletedAt).toLocaleString() : "Unknown"}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex gap-2 justify-end">
                      <button
                        onClick={() => handleRestore(item)}
                        title="Restore"
                        className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 text-blue-600 transition-colors"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleHardDelete(item)}
                        title="Delete Permanently"
                        className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-red-50 text-red-600 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
