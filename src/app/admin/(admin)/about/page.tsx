"use client";

import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useAuth } from "@/components/admin/AuthProvider";
import { Save, Plus, Trash2, ChevronDown, ChevronUp, Globe } from "lucide-react";
import { LivePreview } from "@/components/admin/LivePreview";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const initialData = {
  hero: { badge: "", heading: "", highlight: "", description: "", hasDecorations: true },
  missionVision: [],
  whyWeStarted: { title: "", description: "" },
  coreValues: [],
  teamSection: { title: "", subtitle: "" },
  techSection: { title: "" },
  timeline: [],
  philosophy: { title: "", description: "", bullets: [], featureCard: { title: "", description: "" } },
  cta: { heading: "", description: "", buttonText: "", buttonLink: "" },
  seo: { title: "", description: "", keywords: "", canonicalUrl: "", ogTitle: "", ogDescription: "", ogImage: "" }
};

export default function AdminAboutPage() {
  const { token } = useAuth();
  const [data, setData] = useState<any>(initialData);
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  
  // UI State for accordions
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    hero: true,
    missionVision: false,
    whyWeStarted: false,
    coreValues: false,
    timeline: false,
    philosophy: false,
    cta: false,
    seo: false
  });

  const toggleSection = (key: string) => {
    setOpenSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  useEffect(() => {
    fetch(`${API_URL}/about-page/draft`, { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then((json) => {
        if (json.success && json.data) {
          setData({ ...initialData, ...json.data });
        }
      })
      .catch(() => toast.error("Failed to load draft."));
  }, [token]);

  const handleSaveDraft = async () => {
    setSaving(true);
    try {
      const res = await fetch(`${API_URL}/about-page/draft`, {
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
      // Auto save draft first
      await fetch(`${API_URL}/about-page/draft`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(data),
      });

      const res = await fetch(`${API_URL}/about-page/publish`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) toast.success("About page published live!");
      else throw new Error("Publish failed.");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setPublishing(false);
    }
  };

  // Helper to handle nested object updates
  const updateNested = (section: string, field: string, value: any) => {
    setData((prev: any) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value }
    }));
  };

  // Helper for arrays
  const addArrayItem = (section: string, defaultItem: any) => {
    setData((prev: any) => ({
      ...prev,
      [section]: [...(prev[section] || []), defaultItem]
    }));
  };

  const updateArrayItem = (section: string, idx: number, field: string, value: any) => {
    setData((prev: any) => {
      const arr = [...(prev[section] || [])];
      arr[idx] = { ...arr[idx], [field]: value };
      return { ...prev, [section]: arr };
    });
  };

  const removeArrayItem = (section: string, idx: number) => {
    setData((prev: any) => {
      const arr = [...(prev[section] || [])];
      arr.splice(idx, 1);
      return { ...prev, [section]: arr };
    });
  };

  // specific nested helper for philosophy bullets
  const addPhilosophyBullet = () => {
    setData((prev: any) => ({
      ...prev,
      philosophy: {
        ...prev.philosophy,
        bullets: [...(prev.philosophy.bullets || []), { icon: 'Check', text: '' }]
      }
    }));
  };

  const updatePhilosophyBullet = (idx: number, text: string) => {
    setData((prev: any) => {
      const b = [...(prev.philosophy.bullets || [])];
      b[idx] = { ...b[idx], text };
      return { ...prev, philosophy: { ...prev.philosophy, bullets: b } };
    });
  };

  const removePhilosophyBullet = (idx: number) => {
    setData((prev: any) => {
      const b = [...(prev.philosophy.bullets || [])];
      b.splice(idx, 1);
      return { ...prev, philosophy: { ...prev.philosophy, bullets: b } };
    });
  };

  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden">
      <div className="w-full lg:w-1/2 overflow-y-auto p-6 space-y-8 pb-32">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-gray-200 shadow-sm sticky top-0 z-10">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">About Page CMS</h1>
          <p className="text-sm text-gray-500 mt-0.5">Edit, draft, and publish the complete About page.</p>
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

      {/* Hero Section */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <button onClick={() => toggleSection('hero')} className="w-full px-6 py-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors">
          <h2 className="font-semibold text-gray-900">1. Hero Section</h2>
          {openSections.hero ? <ChevronUp className="w-5 h-5 text-gray-500" /> : <ChevronDown className="w-5 h-5 text-gray-500" />}
        </button>
        {openSections.hero && (
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Badge Text</label>
              <input type="text" value={data.hero?.badge || ""} onChange={e => updateNested('hero', 'badge', e.target.value)} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Main Heading</label>
              <input type="text" value={data.hero?.heading || ""} onChange={e => updateNested('hero', 'heading', e.target.value)} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Gradient Highlight Text</label>
              <input type="text" value={data.hero?.highlight || ""} onChange={e => updateNested('hero', 'highlight', e.target.value)} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea value={data.hero?.description || ""} onChange={e => updateNested('hero', 'description', e.target.value)} rows={3} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
          </div>
        )}
      </div>

      {/* Mission & Vision */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <button onClick={() => toggleSection('missionVision')} className="w-full px-6 py-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors">
          <h2 className="font-semibold text-gray-900">2. Mission & Vision</h2>
          {openSections.missionVision ? <ChevronUp className="w-5 h-5 text-gray-500" /> : <ChevronDown className="w-5 h-5 text-gray-500" />}
        </button>
        {openSections.missionVision && (
          <div className="p-6 space-y-4">
            {data.missionVision?.map((item: any, i: number) => (
              <div key={i} className="p-4 border border-gray-200 rounded-lg relative">
                <button onClick={() => removeArrayItem('missionVision', i)} className="absolute top-4 right-4 text-red-500 hover:text-red-700"><Trash2 className="w-4 h-4" /></button>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Icon Name (lucide)</label>
                    <input type="text" value={item.icon} onChange={e => updateArrayItem('missionVision', i, 'icon', e.target.value)} className="w-full p-2 border rounded-lg text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Title</label>
                    <input type="text" value={item.title} onChange={e => updateArrayItem('missionVision', i, 'title', e.target.value)} className="w-full p-2 border rounded-lg text-sm" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Description</label>
                  <textarea value={item.description} onChange={e => updateArrayItem('missionVision', i, 'description', e.target.value)} rows={2} className="w-full p-2 border rounded-lg text-sm" />
                </div>
              </div>
            ))}
            <button onClick={() => addArrayItem('missionVision', { icon: 'Target', title: '', description: '' })} className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium"><Plus className="w-4 h-4" /> Add Card</button>
          </div>
        )}
      </div>

      {/* Why We Started */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <button onClick={() => toggleSection('whyWeStarted')} className="w-full px-6 py-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors">
          <h2 className="font-semibold text-gray-900">3. Why We Started</h2>
          {openSections.whyWeStarted ? <ChevronUp className="w-5 h-5 text-gray-500" /> : <ChevronDown className="w-5 h-5 text-gray-500" />}
        </button>
        {openSections.whyWeStarted && (
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Section Title</label>
              <input type="text" value={data.whyWeStarted?.title || ""} onChange={e => updateNested('whyWeStarted', 'title', e.target.value)} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea value={data.whyWeStarted?.description || ""} onChange={e => updateNested('whyWeStarted', 'description', e.target.value)} rows={4} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
          </div>
        )}
      </div>

      {/* Core Values */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <button onClick={() => toggleSection('coreValues')} className="w-full px-6 py-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors">
          <h2 className="font-semibold text-gray-900">4. Core Values</h2>
          {openSections.coreValues ? <ChevronUp className="w-5 h-5 text-gray-500" /> : <ChevronDown className="w-5 h-5 text-gray-500" />}
        </button>
        {openSections.coreValues && (
          <div className="p-6 space-y-4">
            {data.coreValues?.map((item: any, i: number) => (
              <div key={i} className="p-4 border border-gray-200 rounded-lg relative">
                <button onClick={() => removeArrayItem('coreValues', i)} className="absolute top-4 right-4 text-red-500 hover:text-red-700"><Trash2 className="w-4 h-4" /></button>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Icon Name</label>
                    <input type="text" value={item.icon} onChange={e => updateArrayItem('coreValues', i, 'icon', e.target.value)} className="w-full p-2 border rounded-lg text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Title</label>
                    <input type="text" value={item.title} onChange={e => updateArrayItem('coreValues', i, 'title', e.target.value)} className="w-full p-2 border rounded-lg text-sm" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Description</label>
                  <textarea value={item.description} onChange={e => updateArrayItem('coreValues', i, 'description', e.target.value)} rows={2} className="w-full p-2 border rounded-lg text-sm" />
                </div>
              </div>
            ))}
            <button onClick={() => addArrayItem('coreValues', { icon: 'Target', title: '', description: '' })} className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium"><Plus className="w-4 h-4" /> Add Core Value</button>
          </div>
        )}
      </div>

      {/* Timeline */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <button onClick={() => toggleSection('timeline')} className="w-full px-6 py-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors">
          <h2 className="font-semibold text-gray-900">5. Journey Timeline</h2>
          {openSections.timeline ? <ChevronUp className="w-5 h-5 text-gray-500" /> : <ChevronDown className="w-5 h-5 text-gray-500" />}
        </button>
        {openSections.timeline && (
          <div className="p-6 space-y-4">
            {data.timeline?.map((item: any, i: number) => (
              <div key={i} className="p-4 border border-gray-200 rounded-lg relative flex gap-4 items-start">
                <div className="flex-1 grid grid-cols-4 gap-4">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Year</label>
                    <input type="text" value={item.year} onChange={e => updateArrayItem('timeline', i, 'year', e.target.value)} className="w-full p-2 border rounded-lg text-sm" />
                  </div>
                  <div className="col-span-3">
                    <label className="block text-xs text-gray-500 mb-1">Title</label>
                    <input type="text" value={item.title} onChange={e => updateArrayItem('timeline', i, 'title', e.target.value)} className="w-full p-2 border rounded-lg text-sm" />
                  </div>
                  <div className="col-span-4">
                    <label className="block text-xs text-gray-500 mb-1">Description</label>
                    <textarea value={item.description} onChange={e => updateArrayItem('timeline', i, 'description', e.target.value)} rows={2} className="w-full p-2 border rounded-lg text-sm" />
                  </div>
                </div>
                <button onClick={() => removeArrayItem('timeline', i)} className="text-red-500 hover:text-red-700 mt-6"><Trash2 className="w-5 h-5" /></button>
              </div>
            ))}
            <button onClick={() => addArrayItem('timeline', { year: '', title: '', description: '' })} className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium"><Plus className="w-4 h-4" /> Add Event</button>
          </div>
        )}
      </div>

      {/* Philosophy */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <button onClick={() => toggleSection('philosophy')} className="w-full px-6 py-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors">
          <h2 className="font-semibold text-gray-900">6. Philosophy & Culture</h2>
          {openSections.philosophy ? <ChevronUp className="w-5 h-5 text-gray-500" /> : <ChevronDown className="w-5 h-5 text-gray-500" />}
        </button>
        {openSections.philosophy && (
          <div className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input type="text" value={data.philosophy?.title || ""} onChange={e => updateNested('philosophy', 'title', e.target.value)} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea value={data.philosophy?.description || ""} onChange={e => updateNested('philosophy', 'description', e.target.value)} rows={3} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Bullet Points</label>
              <div className="space-y-2">
                {data.philosophy?.bullets?.map((b: any, i: number) => (
                  <div key={i} className="flex items-center gap-2">
                    <input type="text" value={b.text} onChange={e => updatePhilosophyBullet(i, e.target.value)} className="flex-1 p-2 border rounded-lg text-sm" />
                    <button onClick={() => removePhilosophyBullet(i)} className="text-red-500 p-2"><Trash2 className="w-4 h-4" /></button>
                  </div>
                ))}
              </div>
              <button onClick={addPhilosophyBullet} className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium mt-3"><Plus className="w-4 h-4" /> Add Bullet</button>
            </div>

            <div className="pt-4 border-t">
              <h4 className="font-semibold mb-3">Feature Card (Right Side)</h4>
              <div className="space-y-3">
                <input type="text" placeholder="Card Title" value={data.philosophy?.featureCard?.title || ""} onChange={e => setData((p:any) => ({...p, philosophy: {...p.philosophy, featureCard: {...p.philosophy.featureCard, title: e.target.value}}}))} className="w-full p-2 border rounded-lg text-sm" />
                <input type="text" placeholder="Card Description" value={data.philosophy?.featureCard?.description || ""} onChange={e => setData((p:any) => ({...p, philosophy: {...p.philosophy, featureCard: {...p.philosophy.featureCard, description: e.target.value}}}))} className="w-full p-2 border rounded-lg text-sm" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <button onClick={() => toggleSection('cta')} className="w-full px-6 py-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors">
          <h2 className="font-semibold text-gray-900">7. Call to Action</h2>
          {openSections.cta ? <ChevronUp className="w-5 h-5 text-gray-500" /> : <ChevronDown className="w-5 h-5 text-gray-500" />}
        </button>
        {openSections.cta && (
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Heading</label>
              <input type="text" value={data.cta?.heading || ""} onChange={e => updateNested('cta', 'heading', e.target.value)} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea value={data.cta?.description || ""} onChange={e => updateNested('cta', 'description', e.target.value)} rows={2} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Button Text</label>
                <input type="text" value={data.cta?.buttonText || ""} onChange={e => updateNested('cta', 'buttonText', e.target.value)} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Button Link</label>
                <input type="text" value={data.cta?.buttonLink || ""} onChange={e => updateNested('cta', 'buttonLink', e.target.value)} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* SEO */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <button onClick={() => toggleSection('seo')} className="w-full px-6 py-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors">
          <h2 className="font-semibold text-gray-900">8. SEO & Meta</h2>
          {openSections.seo ? <ChevronUp className="w-5 h-5 text-gray-500" /> : <ChevronDown className="w-5 h-5 text-gray-500" />}
        </button>
        {openSections.seo && (
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label className="block text-sm mb-1 text-gray-700">Meta Title</label><input type="text" value={data.seo?.title || ""} onChange={e => updateNested('seo', 'title', e.target.value)} className="w-full p-2 border rounded-lg text-sm" /></div>
            <div><label className="block text-sm mb-1 text-gray-700">Meta Description</label><input type="text" value={data.seo?.description || ""} onChange={e => updateNested('seo', 'description', e.target.value)} className="w-full p-2 border rounded-lg text-sm" /></div>
            <div><label className="block text-sm mb-1 text-gray-700">Keywords</label><input type="text" value={data.seo?.keywords || ""} onChange={e => updateNested('seo', 'keywords', e.target.value)} className="w-full p-2 border rounded-lg text-sm" /></div>
            <div><label className="block text-sm mb-1 text-gray-700">Canonical URL</label><input type="text" value={data.seo?.canonicalUrl || ""} onChange={e => updateNested('seo', 'canonicalUrl', e.target.value)} className="w-full p-2 border rounded-lg text-sm" /></div>
          </div>
        )}
      </div>

      </div>

      <div className="hidden lg:block w-1/2 bg-zinc-950 p-6 border-l border-zinc-800">
        <LivePreview url="/about" data={data} />
      </div>
    </div>
  );
}
