"use client";

import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useAuth } from "@/components/admin/AuthProvider";
import { Save, Plus, Trash2 } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

interface IValue { title: string; desc: string; icon?: string; }
interface ITimeline { year: string; title: string; desc: string; }

export default function AdminAbout() {
  const { token } = useAuth();
  const [values, setValues] = useState<IValue[]>([]);
  const [timeline, setTimeline] = useState<ITimeline[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/settings`)
      .then((r) => r.json())
      .then((json) => {
        if (json.success && json.data) {
          setValues(json.data.aboutValues || []);
          setTimeline(json.data.aboutTimeline || []);
        }
      })
      .catch(() => toast.error("Failed to load settings."));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch(`${API_URL}/settings`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        credentials: "include",
        body: JSON.stringify({ aboutValues: values, aboutTimeline: timeline }),
      });
      if (res.ok) toast.success("About page content saved!");
      else throw new Error("Save failed.");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  const addValue = () => setValues((prev) => [...prev, { title: "", desc: "", icon: "Target" }]);
  const removeValue = (idx: number) => setValues((prev) => prev.filter((_, i) => i !== idx));
  const updateValue = (idx: number, key: keyof IValue, val: string) =>
    setValues((prev) => prev.map((item, i) => (i === idx ? { ...item, [key]: val } : item)));

  const addTimeline = () => setTimeline((prev) => [...prev, { year: "", title: "", desc: "" }]);
  const removeTimeline = (idx: number) => setTimeline((prev) => prev.filter((_, i) => i !== idx));
  const updateTimeline = (idx: number, key: keyof ITimeline, val: string) =>
    setTimeline((prev) => prev.map((item, i) => (i === idx ? { ...item, [key]: val } : item)));

  return (
    <div className="p-6 max-w-4xl space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">About Page CMS</h1>
          <p className="text-sm text-gray-500 mt-0.5">Manage core values and timeline events displayed on the About page.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-60 transition-colors"
        >
          <Save className="w-4 h-4" /> {saving ? "Saving…" : "Save"}
        </button>
      </div>

      {/* Core Values Section */}
      <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
        <div className="px-4 py-3 flex items-center justify-between">
          <h2 className="font-semibold text-gray-900 text-sm">Core Values</h2>
          <button onClick={addValue} className="text-xs text-blue-600 hover:underline">+ Add Value</button>
        </div>
        {values.length === 0 && (
          <div className="px-4 py-8 text-center text-gray-400 text-sm">No core values set.</div>
        )}
        {values.map((item, i) => (
          <div key={i} className="px-4 py-3 flex items-center gap-3">
            <div className="flex-1 grid grid-cols-3 gap-2">
              <input
                value={item.title}
                onChange={(e) => updateValue(i, "title", e.target.value)}
                placeholder="Value Title"
                className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none"
              />
              <input
                value={item.desc}
                onChange={(e) => updateValue(i, "desc", e.target.value)}
                placeholder="Description"
                className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none col-span-2"
              />
            </div>
            <button onClick={() => removeValue(i)} className="text-red-400 hover:text-red-600">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Timeline Section */}
      <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
        <div className="px-4 py-3 flex items-center justify-between">
          <h2 className="font-semibold text-gray-900 text-sm">Journey Timeline</h2>
          <button onClick={addTimeline} className="text-xs text-blue-600 hover:underline">+ Add Event</button>
        </div>
        {timeline.length === 0 && (
          <div className="px-4 py-8 text-center text-gray-400 text-sm">No timeline events set.</div>
        )}
        {timeline.map((item, i) => (
          <div key={i} className="px-4 py-3 flex items-center gap-3">
            <div className="flex-1 grid grid-cols-4 gap-2">
              <input
                value={item.year}
                onChange={(e) => updateTimeline(i, "year", e.target.value)}
                placeholder="Year (e.g. 2026)"
                className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none"
              />
              <input
                value={item.title}
                onChange={(e) => updateTimeline(i, "title", e.target.value)}
                placeholder="Event Title"
                className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none"
              />
              <input
                value={item.desc}
                onChange={(e) => updateTimeline(i, "desc", e.target.value)}
                placeholder="Description"
                className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none col-span-2"
              />
            </div>
            <button onClick={() => removeTimeline(i)} className="text-red-400 hover:text-red-600">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
