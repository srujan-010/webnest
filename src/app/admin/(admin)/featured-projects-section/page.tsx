"use client";

import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useAuth } from "@/components/admin/AuthProvider";
import { Save, Globe, FolderKanban } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const initialData = {
  badge: "Featured Projects",
  title: "Selected Work",
  subtitle: "Digital products that set the standard.",
  selectedProjectIds: [] as string[]
};

export default function AdminFeaturedProjectsSection() {
  const { token } = useAuth();
  const [data, setData] = useState<any>(initialData);
  const [allProjects, setAllProjects] = useState<any[]>([]);
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);

  useEffect(() => {
    // Fetch draft
    fetch(`${API_URL}/featured-project-section/draft`, { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then((json) => {
        if (json.success && json.data) {
          setData({ ...initialData, ...json.data });
        }
      })
      .catch(() => toast.error("Failed to load draft."));

    // Fetch projects
    fetch(`${API_URL}/projects`)
      .then((r) => r.json())
      .then((json) => {
        if (json.success && json.data) {
          setAllProjects(json.data);
        }
      })
      .catch(() => toast.error("Failed to load projects."));
  }, [token]);

  const handleSaveDraft = async () => {
    setSaving(true);
    try {
      const res = await fetch(`${API_URL}/featured-project-section`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(data),
      });
      if (res.ok) toast.success("Draft saved successfully!");
      else throw new Error("Save failed.");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handlePublishLive = async () => {
    if (!confirm("Are you sure you want to publish these changes live?")) return;
    setPublishing(true);
    try {
      await fetch(`${API_URL}/featured-project-section`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(data),
      });

      const res = await fetch(`${API_URL}/featured-project-section/publish`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) toast.success("Section published live!");
      else throw new Error("Publish failed.");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setPublishing(false);
    }
  };

  const handleProjectToggle = (projectId: string) => {
    setData((prev: any) => {
      const ids = prev.selectedProjectIds || [];
      if (ids.includes(projectId)) {
        return { ...prev, selectedProjectIds: ids.filter((id: string) => id !== projectId) };
      } else {
        return { ...prev, selectedProjectIds: [...ids, projectId] };
      }
    });
  };

  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden bg-gray-50">
      <div className="w-full overflow-y-auto p-6 space-y-8 pb-32">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-gray-200 shadow-sm sticky top-0 z-10">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Featured Projects Section</h1>
            <p className="text-sm text-gray-500 mt-0.5">Manage the homepage portfolio showcase section text and selected projects.</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleSaveDraft}
              disabled={saving || publishing}
              className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors disabled:opacity-50"
            >
              <Save className="w-4 h-4" /> {saving ? "Saving..." : "Save Draft"}
            </button>
            <button
              onClick={handlePublishLive}
              disabled={saving || publishing}
              className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors disabled:opacity-50 shadow-sm"
            >
              <Globe className="w-4 h-4" /> {publishing ? "Publishing..." : "Publish Live"}
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
          <h2 className="font-semibold text-gray-900 border-b pb-2 mb-4">Text Configuration</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Badge</label>
            <input type="text" value={data.badge || ""} onChange={(e) => setData({...data, badge: e.target.value})} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input type="text" value={data.title || ""} onChange={(e) => setData({...data, title: e.target.value})} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
            <input type="text" value={data.subtitle || ""} onChange={(e) => setData({...data, subtitle: e.target.value})} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-semibold text-gray-900 border-b pb-2 mb-4 flex items-center gap-2">
            <FolderKanban className="w-5 h-5 text-gray-400" />
            Select Featured Projects
          </h2>
          <p className="text-sm text-gray-500 mb-4">Select the projects you want to feature on the homepage. They will be displayed in the order they were selected.</p>
          
          {data.selectedProjectIds?.length > 0 && (
            <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
              <h3 className="text-sm font-bold text-blue-900 mb-2">Selected Order:</h3>
              <ol className="list-decimal list-inside text-sm text-blue-800 space-y-1">
                {data.selectedProjectIds.map((id: string) => {
                  const proj = allProjects.find(p => p._id === id);
                  return <li key={id}>{proj ? proj.title : id}</li>;
                })}
              </ol>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {allProjects.map((project: any) => {
              const isSelected = data.selectedProjectIds?.includes(project._id);
              return (
                <label key={project._id} className={`flex items-start p-4 border rounded-xl cursor-pointer transition-colors ${isSelected ? 'bg-indigo-50 border-indigo-200' : 'hover:bg-gray-50'}`}>
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => handleProjectToggle(project._id)}
                    className="mt-1 w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <div className="ml-3 flex flex-col">
                    <span className={`text-sm font-semibold ${isSelected ? 'text-indigo-900' : 'text-gray-900'}`}>{project.title}</span>
                    <span className="text-xs text-gray-500">{project.category}</span>
                  </div>
                </label>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
