"use client";

import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useAuth } from "@/components/admin/AuthProvider";
import { Save, Plus, Trash2, ChevronDown, ChevronUp, Globe } from "lucide-react";
import { LivePreview } from "@/components/admin/LivePreview";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const initialData = {
  hero: { title: "", subtitle: "", visualImage: "" },
  metrics: [],
  frustrations: [],
  comparisonTable: [],
  timelineSteps: [],
  teamRoles: [],
  engineeringStandards: [],
  featuredProjects: [],
  testimonials: [],
  beforeAfter: [],
  investmentValue: [],
  faqs: [],
  cta: { title: "", subtitle: "", buttonText: "", buttonLink: "" },
  seo: { metaTitle: "", metaDescription: "" }
};

export default function AdminWhyUsPage() {
  const { token } = useAuth();
  const [data, setData] = useState<any>(initialData);
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    hero: true,
    metrics: false,
    frustrations: false,
    comparisonTable: false,
    timelineSteps: false,
    teamRoles: false,
    engineeringStandards: false,
    featuredProjects: false,
    testimonials: false,
    beforeAfter: false,
    investmentValue: false,
    faqs: false,
    cta: false,
    seo: false
  });

  const toggleSection = (key: string) => {
    setOpenSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  useEffect(() => {
    fetch(`${API_URL}/why-us-page/draft`, { headers: { Authorization: `Bearer ${token}` } })
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
      const res = await fetch(`${API_URL}/why-us-page`, {
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
      await fetch(`${API_URL}/why-us-page`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(data),
      });

      const res = await fetch(`${API_URL}/why-us-page/publish`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) toast.success("Why Us page published live!");
      else throw new Error("Publish failed.");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setPublishing(false);
    }
  };

  const updateNested = (section: string, field: string, value: any) => {
    setData((prev: any) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value }
    }));
  };

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

  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden">
      <div className="w-full lg:w-1/2 overflow-y-auto p-6 space-y-8 pb-32">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-gray-200 shadow-sm sticky top-0 z-10">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Why Us CMS</h1>
            <p className="text-sm text-gray-500 mt-0.5">Edit and publish the trust-building page.</p>
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

        {/* 1. HERO */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <button onClick={() => toggleSection('hero')} className="w-full px-6 py-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors">
            <h2 className="font-semibold text-gray-900">1. Hero Section</h2>
            {openSections.hero ? <ChevronUp className="w-5 h-5 text-gray-500" /> : <ChevronDown className="w-5 h-5 text-gray-500" />}
          </button>
          {openSections.hero && (
            <div className="p-6 space-y-6">
              <div className="space-y-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Title</label><input type="text" value={data.hero?.title || ""} onChange={e => updateNested('hero', 'title', e.target.value)} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label><textarea value={data.hero?.subtitle || ""} onChange={e => updateNested('hero', 'subtitle', e.target.value)} rows={3} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" /></div>
              </div>
            </div>
          )}
        </div>

        {/* 2. METRICS */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <button onClick={() => toggleSection('metrics')} className="w-full px-6 py-4 flex items-center justify-between bg-gray-50">
            <h2 className="font-semibold text-gray-900">2. Trust Metrics</h2>
            {openSections.metrics ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
          {openSections.metrics && (
            <div className="p-6 space-y-4">
              {data.metrics?.map((item: any, i: number) => (
                <div key={i} className="p-4 border rounded-lg relative flex gap-4">
                  <div className="flex-1 grid grid-cols-3 gap-2">
                    <div><label className="block text-xs mb-1">Value (e.g. 99)</label><input type="text" value={item.value} onChange={e => updateArrayItem('metrics', i, 'value', e.target.value)} className="w-full p-2 border rounded-lg text-sm" /></div>
                    <div><label className="block text-xs mb-1">Suffix (e.g. %)</label><input type="text" value={item.suffix} onChange={e => updateArrayItem('metrics', i, 'suffix', e.target.value)} className="w-full p-2 border rounded-lg text-sm" /></div>
                    <div><label className="block text-xs mb-1">Label</label><input type="text" value={item.label} onChange={e => updateArrayItem('metrics', i, 'label', e.target.value)} className="w-full p-2 border rounded-lg text-sm" /></div>
                  </div>
                  <button onClick={() => removeArrayItem('metrics', i)} className="text-red-500 mt-6"><Trash2 className="w-5 h-5" /></button>
                </div>
              ))}
              <button onClick={() => addArrayItem('metrics', { value: '', suffix: '', label: '' })} className="flex items-center gap-1 text-blue-600 text-sm font-medium"><Plus className="w-4 h-4" /> Add Metric</button>
            </div>
          )}
        </div>
        
        {/* 3. FRUSTRATIONS */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <button onClick={() => toggleSection('frustrations')} className="w-full px-6 py-4 flex items-center justify-between bg-gray-50">
            <h2 className="font-semibold text-gray-900">3. Why Companies Leave Agencies</h2>
            {openSections.frustrations ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
          {openSections.frustrations && (
            <div className="p-6 space-y-4">
              {data.frustrations?.map((item: any, i: number) => (
                <div key={i} className="p-4 border rounded-lg relative">
                  <button onClick={() => removeArrayItem('frustrations', i)} className="absolute top-4 right-4 text-red-500"><Trash2 className="w-4 h-4" /></button>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div><label className="block text-xs mb-1">Icon</label><input type="text" value={item.icon} onChange={e => updateArrayItem('frustrations', i, 'icon', e.target.value)} className="w-full p-2 border rounded-lg text-sm" /></div>
                    <div><label className="block text-xs mb-1">Title</label><input type="text" value={item.title} onChange={e => updateArrayItem('frustrations', i, 'title', e.target.value)} className="w-full p-2 border rounded-lg text-sm" /></div>
                  </div>
                  <div><label className="block text-xs mb-1">Description</label><textarea value={item.description} onChange={e => updateArrayItem('frustrations', i, 'description', e.target.value)} rows={2} className="w-full p-2 border rounded-lg text-sm" /></div>
                </div>
              ))}
              <button onClick={() => addArrayItem('frustrations', { icon: 'AlertTriangle', title: '', description: '' })} className="flex items-center gap-1 text-blue-600 text-sm font-medium"><Plus className="w-4 h-4" /> Add Frustration</button>
            </div>
          )}
        </div>

        {/* 4. COMPARISON TABLE */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <button onClick={() => toggleSection('comparisonTable')} className="w-full px-6 py-4 flex items-center justify-between bg-gray-50">
            <h2 className="font-semibold text-gray-900">4. The WebNest Difference</h2>
            {openSections.comparisonTable ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
          {openSections.comparisonTable && (
            <div className="p-6 space-y-4">
              {data.comparisonTable?.map((item: any, i: number) => (
                <div key={i} className="p-4 border rounded-lg relative flex gap-4">
                  <div className="flex-1 grid grid-cols-3 gap-2">
                    <div><label className="block text-xs mb-1">Feature Name</label><input type="text" value={item.feature} onChange={e => updateArrayItem('comparisonTable', i, 'feature', e.target.value)} className="w-full p-2 border rounded-lg text-sm" /></div>
                    <div><label className="block text-xs mb-1">Typical Agency</label><input type="text" value={item.typicalAgency} onChange={e => updateArrayItem('comparisonTable', i, 'typicalAgency', e.target.value)} className="w-full p-2 border rounded-lg text-sm text-red-600" /></div>
                    <div><label className="block text-xs mb-1">WebNest</label><input type="text" value={item.webNest} onChange={e => updateArrayItem('comparisonTable', i, 'webNest', e.target.value)} className="w-full p-2 border rounded-lg text-sm text-green-600 font-medium" /></div>
                  </div>
                  <button onClick={() => removeArrayItem('comparisonTable', i)} className="text-red-500 mt-6"><Trash2 className="w-5 h-5" /></button>
                </div>
              ))}
              <button onClick={() => addArrayItem('comparisonTable', { feature: '', typicalAgency: '', webNest: '' })} className="flex items-center gap-1 text-blue-600 text-sm font-medium"><Plus className="w-4 h-4" /> Add Row</button>
            </div>
          )}
        </div>

        {/* 5. HOW WE WORK (TIMELINE) */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <button onClick={() => toggleSection('timelineSteps')} className="w-full px-6 py-4 flex items-center justify-between bg-gray-50">
            <h2 className="font-semibold text-gray-900">5. How We Work Together</h2>
            {openSections.timelineSteps ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
          {openSections.timelineSteps && (
            <div className="p-6 space-y-4">
              {data.timelineSteps?.map((item: any, i: number) => (
                <div key={i} className="p-4 border rounded-lg relative">
                  <button onClick={() => removeArrayItem('timelineSteps', i)} className="absolute top-4 right-4 text-red-500"><Trash2 className="w-4 h-4" /></button>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div><label className="block text-xs mb-1">Icon</label><input type="text" value={item.icon} onChange={e => updateArrayItem('timelineSteps', i, 'icon', e.target.value)} className="w-full p-2 border rounded-lg text-sm" /></div>
                    <div><label className="block text-xs mb-1">Title</label><input type="text" value={item.title} onChange={e => updateArrayItem('timelineSteps', i, 'title', e.target.value)} className="w-full p-2 border rounded-lg text-sm" /></div>
                  </div>
                  <div><label className="block text-xs mb-1">Description</label><textarea value={item.description} onChange={e => updateArrayItem('timelineSteps', i, 'description', e.target.value)} rows={2} className="w-full p-2 border rounded-lg text-sm" /></div>
                </div>
              ))}
              <button onClick={() => addArrayItem('timelineSteps', { icon: 'Circle', title: '', description: '' })} className="flex items-center gap-1 text-blue-600 text-sm font-medium"><Plus className="w-4 h-4" /> Add Step</button>
            </div>
          )}
        </div>

        {/* 6. MEET THE TEAM */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <button onClick={() => toggleSection('teamRoles')} className="w-full px-6 py-4 flex items-center justify-between bg-gray-50">
            <h2 className="font-semibold text-gray-900">6. Meet the Team</h2>
            {openSections.teamRoles ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
          {openSections.teamRoles && (
            <div className="p-6 space-y-4">
              {data.teamRoles?.map((item: any, i: number) => (
                <div key={i} className="p-4 border rounded-lg relative">
                  <button onClick={() => removeArrayItem('teamRoles', i)} className="absolute top-4 right-4 text-red-500"><Trash2 className="w-4 h-4" /></button>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div><label className="block text-xs mb-1">Icon</label><input type="text" value={item.icon} onChange={e => updateArrayItem('teamRoles', i, 'icon', e.target.value)} className="w-full p-2 border rounded-lg text-sm" /></div>
                    <div><label className="block text-xs mb-1">Role Name</label><input type="text" value={item.role} onChange={e => updateArrayItem('teamRoles', i, 'role', e.target.value)} className="w-full p-2 border rounded-lg text-sm" /></div>
                  </div>
                  <div><label className="block text-xs mb-1">Description</label><textarea value={item.description} onChange={e => updateArrayItem('teamRoles', i, 'description', e.target.value)} rows={2} className="w-full p-2 border rounded-lg text-sm" /></div>
                </div>
              ))}
              <button onClick={() => addArrayItem('teamRoles', { icon: 'User', role: '', description: '' })} className="flex items-center gap-1 text-blue-600 text-sm font-medium"><Plus className="w-4 h-4" /> Add Role</button>
            </div>
          )}
        </div>

        {/* 7. ENGINEERING STANDARDS */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <button onClick={() => toggleSection('engineeringStandards')} className="w-full px-6 py-4 flex items-center justify-between bg-gray-50">
            <h2 className="font-semibold text-gray-900">7. Engineering Standards</h2>
            {openSections.engineeringStandards ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
          {openSections.engineeringStandards && (
            <div className="p-6 space-y-4">
              {data.engineeringStandards?.map((item: any, i: number) => (
                <div key={i} className="p-4 border rounded-lg relative">
                  <button onClick={() => removeArrayItem('engineeringStandards', i)} className="absolute top-4 right-4 text-red-500"><Trash2 className="w-4 h-4" /></button>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div><label className="block text-xs mb-1">Icon</label><input type="text" value={item.icon} onChange={e => updateArrayItem('engineeringStandards', i, 'icon', e.target.value)} className="w-full p-2 border rounded-lg text-sm" /></div>
                    <div><label className="block text-xs mb-1">Title</label><input type="text" value={item.title} onChange={e => updateArrayItem('engineeringStandards', i, 'title', e.target.value)} className="w-full p-2 border rounded-lg text-sm" /></div>
                  </div>
                  <div><label className="block text-xs mb-1">Description</label><textarea value={item.description} onChange={e => updateArrayItem('engineeringStandards', i, 'description', e.target.value)} rows={2} className="w-full p-2 border rounded-lg text-sm" /></div>
                </div>
              ))}
              <button onClick={() => addArrayItem('engineeringStandards', { icon: 'Code', title: '', description: '' })} className="flex items-center gap-1 text-blue-600 text-sm font-medium"><Plus className="w-4 h-4" /> Add Standard</button>
            </div>
          )}
        </div>

        {/* 8. FEATURED PROJECTS */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <button onClick={() => toggleSection('featuredProjects')} className="w-full px-6 py-4 flex items-center justify-between bg-gray-50">
            <h2 className="font-semibold text-gray-900">8. Products We've Built</h2>
            {openSections.featuredProjects ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
          {openSections.featuredProjects && (
            <div className="p-6 space-y-4">
              {data.featuredProjects?.map((item: any, i: number) => (
                <div key={i} className="p-4 border rounded-lg relative">
                  <button onClick={() => removeArrayItem('featuredProjects', i)} className="absolute top-4 right-4 text-red-500"><Trash2 className="w-4 h-4" /></button>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div><label className="block text-xs mb-1">Project Name</label><input type="text" value={item.projectName} onChange={e => updateArrayItem('featuredProjects', i, 'projectName', e.target.value)} className="w-full p-2 border rounded-lg text-sm" /></div>
                    <div><label className="block text-xs mb-1">Image URL</label><input type="text" value={item.image} onChange={e => updateArrayItem('featuredProjects', i, 'image', e.target.value)} className="w-full p-2 border rounded-lg text-sm" /></div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div><label className="block text-xs mb-1">Link</label><input type="text" value={item.link} onChange={e => updateArrayItem('featuredProjects', i, 'link', e.target.value)} className="w-full p-2 border rounded-lg text-sm" /></div>
                    <div><label className="block text-xs mb-1">Outcome</label><input type="text" value={item.outcome} onChange={e => updateArrayItem('featuredProjects', i, 'outcome', e.target.value)} className="w-full p-2 border rounded-lg text-sm" /></div>
                  </div>
                </div>
              ))}
              <button onClick={() => addArrayItem('featuredProjects', { projectName: '', outcome: '', image: '', link: '#' })} className="flex items-center gap-1 text-blue-600 text-sm font-medium"><Plus className="w-4 h-4" /> Add Project</button>
            </div>
          )}
        </div>
        
        {/* 9. TESTIMONIALS */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <button onClick={() => toggleSection('testimonials')} className="w-full px-6 py-4 flex items-center justify-between bg-gray-50">
            <h2 className="font-semibold text-gray-900">9. Client Success Stories</h2>
            {openSections.testimonials ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
          {openSections.testimonials && (
            <div className="p-6 space-y-4">
              {data.testimonials?.map((item: any, i: number) => (
                <div key={i} className="p-4 border rounded-lg relative">
                  <button onClick={() => removeArrayItem('testimonials', i)} className="absolute top-4 right-4 text-red-500"><Trash2 className="w-4 h-4" /></button>
                  <div className="mb-4"><label className="block text-xs mb-1">Quote</label><textarea value={item.quote} onChange={e => updateArrayItem('testimonials', i, 'quote', e.target.value)} rows={3} className="w-full p-2 border rounded-lg text-sm" /></div>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div><label className="block text-xs mb-1">Author Name</label><input type="text" value={item.author} onChange={e => updateArrayItem('testimonials', i, 'author', e.target.value)} className="w-full p-2 border rounded-lg text-sm" /></div>
                    <div><label className="block text-xs mb-1">Role / Title</label><input type="text" value={item.role} onChange={e => updateArrayItem('testimonials', i, 'role', e.target.value)} className="w-full p-2 border rounded-lg text-sm" /></div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div><label className="block text-xs mb-1">Company</label><input type="text" value={item.company} onChange={e => updateArrayItem('testimonials', i, 'company', e.target.value)} className="w-full p-2 border rounded-lg text-sm" /></div>
                    <div><label className="block text-xs mb-1">Project</label><input type="text" value={item.project} onChange={e => updateArrayItem('testimonials', i, 'project', e.target.value)} className="w-full p-2 border rounded-lg text-sm" /></div>
                    <div><label className="block text-xs mb-1">Outcome</label><input type="text" value={item.outcome} onChange={e => updateArrayItem('testimonials', i, 'outcome', e.target.value)} className="w-full p-2 border rounded-lg text-sm" /></div>
                  </div>
                </div>
              ))}
              <button onClick={() => addArrayItem('testimonials', { quote: '', author: '', role: '', company: '', project: '', outcome: '' })} className="flex items-center gap-1 text-blue-600 text-sm font-medium"><Plus className="w-4 h-4" /> Add Testimonial</button>
            </div>
          )}
        </div>

        {/* 10. BEFORE VS AFTER */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <button onClick={() => toggleSection('beforeAfter')} className="w-full px-6 py-4 flex items-center justify-between bg-gray-50">
            <h2 className="font-semibold text-gray-900">10. Before vs After</h2>
            {openSections.beforeAfter ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
          {openSections.beforeAfter && (
            <div className="p-6 space-y-4">
              {data.beforeAfter?.map((item: any, i: number) => (
                <div key={i} className="p-4 border rounded-lg relative">
                  <button onClick={() => removeArrayItem('beforeAfter', i)} className="absolute top-4 right-4 text-red-500"><Trash2 className="w-4 h-4" /></button>
                  <div className="mb-4"><label className="block text-xs mb-1">Scenario (e.g. Scaling User Base)</label><input type="text" value={item.scenario} onChange={e => updateArrayItem('beforeAfter', i, 'scenario', e.target.value)} className="w-full p-2 border rounded-lg text-sm" /></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div><label className="block text-xs mb-1">Before</label><textarea value={item.before} onChange={e => updateArrayItem('beforeAfter', i, 'before', e.target.value)} rows={3} className="w-full p-2 border rounded-lg text-sm text-red-600" /></div>
                    <div><label className="block text-xs mb-1">After</label><textarea value={item.after} onChange={e => updateArrayItem('beforeAfter', i, 'after', e.target.value)} rows={3} className="w-full p-2 border rounded-lg text-sm text-green-600" /></div>
                  </div>
                </div>
              ))}
              <button onClick={() => addArrayItem('beforeAfter', { scenario: '', before: '', after: '' })} className="flex items-center gap-1 text-blue-600 text-sm font-medium"><Plus className="w-4 h-4" /> Add Scenario</button>
            </div>
          )}
        </div>

        {/* 11. INVESTMENT VALUE */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <button onClick={() => toggleSection('investmentValue')} className="w-full px-6 py-4 flex items-center justify-between bg-gray-50">
            <h2 className="font-semibold text-gray-900">11. Why Businesses Invest in WebNest</h2>
            {openSections.investmentValue ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
          {openSections.investmentValue && (
            <div className="p-6 space-y-4">
              {data.investmentValue?.map((item: any, i: number) => (
                <div key={i} className="p-4 border rounded-lg relative">
                  <button onClick={() => removeArrayItem('investmentValue', i)} className="absolute top-4 right-4 text-red-500"><Trash2 className="w-4 h-4" /></button>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div><label className="block text-xs mb-1">Icon</label><input type="text" value={item.icon} onChange={e => updateArrayItem('investmentValue', i, 'icon', e.target.value)} className="w-full p-2 border rounded-lg text-sm" /></div>
                    <div><label className="block text-xs mb-1">Title</label><input type="text" value={item.title} onChange={e => updateArrayItem('investmentValue', i, 'title', e.target.value)} className="w-full p-2 border rounded-lg text-sm" /></div>
                  </div>
                  <div><label className="block text-xs mb-1">Description</label><textarea value={item.description} onChange={e => updateArrayItem('investmentValue', i, 'description', e.target.value)} rows={2} className="w-full p-2 border rounded-lg text-sm" /></div>
                </div>
              ))}
              <button onClick={() => addArrayItem('investmentValue', { icon: 'TrendingUp', title: '', description: '' })} className="flex items-center gap-1 text-blue-600 text-sm font-medium"><Plus className="w-4 h-4" /> Add Value</button>
            </div>
          )}
        </div>

        {/* 12. FAQS */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <button onClick={() => toggleSection('faqs')} className="w-full px-6 py-4 flex items-center justify-between bg-gray-50">
            <h2 className="font-semibold text-gray-900">12. FAQs</h2>
            {openSections.faqs ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
          {openSections.faqs && (
            <div className="p-6 space-y-4">
              {data.faqs?.map((item: any, i: number) => (
                <div key={i} className="p-4 border rounded-lg relative">
                  <button onClick={() => removeArrayItem('faqs', i)} className="absolute top-4 right-4 text-red-500"><Trash2 className="w-4 h-4" /></button>
                  <div className="mb-2"><label className="block text-xs mb-1">Question</label><input type="text" value={item.question} onChange={e => updateArrayItem('faqs', i, 'question', e.target.value)} className="w-full p-2 border rounded-lg text-sm" /></div>
                  <div><label className="block text-xs mb-1">Answer</label><textarea value={item.answer} onChange={e => updateArrayItem('faqs', i, 'answer', e.target.value)} rows={3} className="w-full p-2 border rounded-lg text-sm" /></div>
                </div>
              ))}
              <button onClick={() => addArrayItem('faqs', { question: '', answer: '' })} className="flex items-center gap-1 text-blue-600 text-sm font-medium"><Plus className="w-4 h-4" /> Add FAQ</button>
            </div>
          )}
        </div>

        {/* 13. CTA */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <button onClick={() => toggleSection('cta')} className="w-full px-6 py-4 flex items-center justify-between bg-gray-50">
            <h2 className="font-semibold text-gray-900">13. Final CTA & SEO</h2>
            {openSections.cta ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
          {openSections.cta && (
            <div className="p-6 space-y-4">
              <div><label className="block text-xs mb-1">CTA Title</label><input type="text" value={data.cta?.title || ""} onChange={e => updateNested('cta', 'title', e.target.value)} className="w-full p-2 border rounded-lg text-sm" /></div>
              <div><label className="block text-xs mb-1">CTA Subtitle</label><input type="text" value={data.cta?.subtitle || ""} onChange={e => updateNested('cta', 'subtitle', e.target.value)} className="w-full p-2 border rounded-lg text-sm" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-xs mb-1">Button Text</label><input type="text" value={data.cta?.buttonText || ""} onChange={e => updateNested('cta', 'buttonText', e.target.value)} className="w-full p-2 border rounded-lg text-sm" /></div>
                <div><label className="block text-xs mb-1">Button Link</label><input type="text" value={data.cta?.buttonLink || ""} onChange={e => updateNested('cta', 'buttonLink', e.target.value)} className="w-full p-2 border rounded-lg text-sm" /></div>
              </div>
              <div className="border-t pt-4 mt-4">
                <div><label className="block text-xs mb-1">Meta Title</label><input type="text" value={data.seo?.metaTitle || ""} onChange={e => updateNested('seo', 'metaTitle', e.target.value)} className="w-full p-2 border rounded-lg text-sm" /></div>
                <div><label className="block text-xs mb-1">Meta Description</label><input type="text" value={data.seo?.metaDescription || ""} onChange={e => updateNested('seo', 'metaDescription', e.target.value)} className="w-full p-2 border rounded-lg text-sm" /></div>
              </div>
            </div>
          )}
        </div>

      </div>

      <div className="hidden lg:block w-1/2 bg-zinc-950 p-6 border-l border-zinc-800">
        <LivePreview url="/why-us" data={data} />
      </div>
    </div>
  );
}
