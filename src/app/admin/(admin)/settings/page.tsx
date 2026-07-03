"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/components/admin/AuthProvider";
import { toast } from "react-hot-toast";
import { 
  Settings, Sparkles, BarChart2, PhoneCall, Share2, Globe, 
  FileText, Loader2, Save, Plus, Trash2 
} from "lucide-react";
import { ImageUploader } from "@/components/admin/ImageUploader";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export default function AdminSettings() {
  const { token } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<"general" | "hero" | "stats" | "contact" | "social" | "seo">("general");

  // Form State matching schema
  const [heroHeading, setHeroHeading] = useState("");
  const [heroSubheading, setHeroSubheading] = useState("");
  const [statsCounters, setStatsCounters] = useState<Array<{ label: string; value: number; suffix: string }>>([]);
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [address, setAddress] = useState("");
  const [mapEmbedUrl, setMapEmbedUrl] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [socialLinks, setSocialLinks] = useState({
    facebook: "",
    twitter: "",
    linkedin: "",
    github: "",
    instagram: "",
  });
  const [seoDefaults, setSeoDefaults] = useState({
    title: "",
    description: "",
    ogImage: "",
  });
  const [aboutText, setAboutText] = useState("");
  const [footerText, setFooterText] = useState("");

  useEffect(() => {
    async function fetchSettings() {
      try {
        const res = await fetch(`${API_URL}/settings`, { credentials: "include" });
        const json = await res.json();
        if (json.success && json.data) {
          const d = json.data;
          setHeroHeading(d.heroHeading || "");
          setHeroSubheading(d.heroSubheading || "");
          setStatsCounters(d.statsCounters || []);
          setContactEmail(d.contactEmail || "");
          setContactPhone(d.contactPhone || "");
          setAddress(d.address || "");
          setMapEmbedUrl(d.mapEmbedUrl || "");
          setWhatsappNumber(d.whatsappNumber || "");
          setSocialLinks({
            facebook: d.socialLinks?.facebook || "",
            twitter: d.socialLinks?.twitter || "",
            linkedin: d.socialLinks?.linkedin || "",
            github: d.socialLinks?.github || "",
            instagram: d.socialLinks?.instagram || "",
          });
          setSeoDefaults({
            title: d.seoDefaults?.title || "",
            description: d.seoDefaults?.description || "",
            ogImage: d.seoDefaults?.ogImage || "",
          });
          setAboutText(d.aboutText || "");
          setFooterText(d.footerText || "");
        }
      } catch (err) {
        toast.error("Failed to load site settings.");
      } finally {
        setLoading(false);
      }
    }
    fetchSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      heroHeading,
      heroSubheading,
      statsCounters,
      contactEmail,
      contactPhone,
      address,
      mapEmbedUrl,
      whatsappNumber,
      socialLinks,
      seoDefaults,
      aboutText,
      footerText,
    };

    try {
      const res = await fetch(`${API_URL}/settings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message);
      toast.success("Site configuration successfully synced.");
    } catch (err: any) {
      toast.error(err.message || "Failed to save settings.");
    } finally {
      setSaving(false);
    }
  };

  const addStatCounter = () => {
    setStatsCounters([...statsCounters, { label: "New Metric", value: 0, suffix: "+" }]);
  };

  const removeStatCounter = (index: number) => {
    setStatsCounters(statsCounters.filter((_, idx) => idx !== index));
  };

  const updateStatCounter = (index: number, key: "label" | "value" | "suffix", val: any) => {
    const updated = statsCounters.map((item, idx) => {
      if (idx === index) {
        return { ...item, [key]: val };
      }
      return item;
    });
    setStatsCounters(updated);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[500px] text-zinc-400">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-500 mr-3" />
        <span>Loading global configurations...</span>
      </div>
    );
  }

  return (
    <div className="p-8 h-full bg-zinc-950/20 max-w-6xl mx-auto space-y-8 select-none">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800/60 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2 font-display">
            <Settings className="w-6 h-6 text-indigo-500" />
            Global Site Settings
          </h1>
          <p className="text-xs text-zinc-500 mt-1 font-semibold">
            Edit the singleton document driving the hero block, brand details, metrics, and SEO defaults.
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-indigo-600/10 hover:shadow-indigo-600/20 flex items-center gap-2 self-start md:self-auto disabled:opacity-75"
        >
          {saving ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          {saving ? "Synchronizing..." : "Save Settings"}
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Navigation Tabs */}
        <div className="w-full lg:w-[240px] flex flex-col gap-1 shrink-0 bg-zinc-900 border border-zinc-800/80 p-2 rounded-2xl shadow-sm">
          <button
            onClick={() => setActiveTab("general")}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === "general"
                ? "bg-indigo-600/10 text-white border-l-2 border-indigo-500 font-semibold"
                : "text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200"
            }`}
          >
            <FileText className="w-4 h-4" />
            Brand Copy
          </button>
          <button
            onClick={() => setActiveTab("hero")}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === "hero"
                ? "bg-indigo-600/10 text-white border-l-2 border-indigo-500 font-semibold"
                : "text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200"
            }`}
          >
            <Sparkles className="w-4 h-4" />
            Hero Details
          </button>
          <button
            onClick={() => setActiveTab("stats")}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === "stats"
                ? "bg-indigo-600/10 text-white border-l-2 border-indigo-500 font-semibold"
                : "text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200"
            }`}
          >
            <BarChart2 className="w-4 h-4" />
            Stats Counters
          </button>
          <button
            onClick={() => setActiveTab("contact")}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === "contact"
                ? "bg-indigo-600/10 text-white border-l-2 border-indigo-500 font-semibold"
                : "text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200"
            }`}
          >
            <PhoneCall className="w-4 h-4" />
            Contact Info
          </button>
          <button
            onClick={() => setActiveTab("social")}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === "social"
                ? "bg-indigo-600/10 text-white border-l-2 border-indigo-500 font-semibold"
                : "text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200"
            }`}
          >
            <Share2 className="w-4 h-4" />
            Social Profiles
          </button>
          <button
            onClick={() => setActiveTab("seo")}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === "seo"
                ? "bg-indigo-600/10 text-white border-l-2 border-indigo-500 font-semibold"
                : "text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200"
            }`}
          >
            <Globe className="w-4 h-4" />
            SEO Defaults
          </button>
        </div>

        {/* Tab Contents Card */}
        <div className="flex-1 w-full bg-zinc-900 border border-zinc-800 p-8 rounded-2xl shadow-xl">
          <form onSubmit={handleSave} className="space-y-6">
            
            {/* BRAND COPY */}
            {activeTab === "general" && (
              <div className="space-y-5 animate-in fade-in-50 duration-200">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-zinc-800 pb-2">Brand & Footer Copy</h3>
                
                <div>
                  <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-2">About Section Bio</label>
                  <textarea
                    value={aboutText}
                    onChange={(e) => setAboutText(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 text-xs font-semibold border border-zinc-800 rounded-xl bg-zinc-950 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-white transition-all placeholder-zinc-700 resize-none"
                    placeholder="Brief description about the agency..."
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-2">Footer Copyright Copy</label>
                  <input
                    type="text"
                    value={footerText}
                    onChange={(e) => setFooterText(e.target.value)}
                    className="w-full px-4 py-3 text-xs font-semibold border border-zinc-800 rounded-xl bg-zinc-950 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-white transition-all placeholder-zinc-700"
                    placeholder="© 2026 WebNest. All rights reserved."
                  />
                </div>
              </div>
            )}

            {/* HERO DETAILS */}
            {activeTab === "hero" && (
              <div className="space-y-5 animate-in fade-in-50 duration-200">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-zinc-800 pb-2">Hero Headline</h3>
                
                <div>
                  <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-2">Primary Heading</label>
                  <textarea
                    value={heroHeading}
                    onChange={(e) => setHeroHeading(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 text-xs font-semibold border border-zinc-800 rounded-xl bg-zinc-950 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-white transition-all placeholder-zinc-700 resize-none"
                    placeholder="Crafting Digital Experiences..."
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-2">Subheading Paragraph</label>
                  <textarea
                    value={heroSubheading}
                    onChange={(e) => setHeroSubheading(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 text-xs font-semibold border border-zinc-800 rounded-xl bg-zinc-950 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-white transition-all placeholder-zinc-700 resize-none"
                    placeholder="We build software solutions..."
                  />
                </div>
              </div>
            )}

            {/* STATS COUNTERS */}
            {activeTab === "stats" && (
              <div className="space-y-5 animate-in fade-in-50 duration-200">
                <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">Metrics Counters</h3>
                  <button
                    type="button"
                    onClick={addStatCounter}
                    className="px-3 py-1 bg-zinc-800 hover:bg-zinc-750 text-indigo-400 rounded-lg text-[10px] font-bold transition-all border border-zinc-750 flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Add Metric
                  </button>
                </div>

                <div className="space-y-3">
                  {statsCounters.map((stat, idx) => (
                    <div key={idx} className="flex flex-col sm:flex-row items-center gap-3 p-4 bg-zinc-950 border border-zinc-850 rounded-xl">
                      <div className="flex-1 w-full grid grid-cols-3 gap-2">
                        <div>
                          <label className="block text-[8px] font-bold text-zinc-500 uppercase tracking-wider mb-1">Label</label>
                          <input
                            type="text"
                            value={stat.label}
                            onChange={(e) => updateStatCounter(idx, "label", e.target.value)}
                            className="w-full px-3 py-2 text-xs border border-zinc-800 rounded-lg bg-zinc-900 focus:outline-none text-white font-semibold"
                            placeholder="Projects Delivered"
                          />
                        </div>
                        <div>
                          <label className="block text-[8px] font-bold text-zinc-500 uppercase tracking-wider mb-1">Value</label>
                          <input
                            type="number"
                            value={stat.value}
                            onChange={(e) => updateStatCounter(idx, "value", Number(e.target.value))}
                            className="w-full px-3 py-2 text-xs border border-zinc-800 rounded-lg bg-zinc-900 focus:outline-none text-white font-semibold"
                            placeholder="30"
                          />
                        </div>
                        <div>
                          <label className="block text-[8px] font-bold text-zinc-500 uppercase tracking-wider mb-1">Suffix</label>
                          <input
                            type="text"
                            value={stat.suffix}
                            onChange={(e) => updateStatCounter(idx, "suffix", e.target.value)}
                            className="w-full px-3 py-2 text-xs border border-zinc-800 rounded-lg bg-zinc-900 focus:outline-none text-white font-semibold"
                            placeholder="+"
                          />
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeStatCounter(idx)}
                        className="p-2 border border-zinc-800 hover:border-red-900 bg-zinc-900 hover:bg-red-950/20 text-zinc-500 hover:text-red-400 rounded-lg transition-colors mt-4 sm:mt-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  {statsCounters.length === 0 && (
                    <p className="text-xs text-zinc-500 text-center py-6 font-semibold">No metrics created yet. Click "Add Metric" to define some counters.</p>
                  )}
                </div>
              </div>
            )}

            {/* CONTACT INFO */}
            {activeTab === "contact" && (
              <div className="space-y-5 animate-in fade-in-50 duration-200">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-zinc-800 pb-2">Agency Contact Details</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-2">Public Contact Email</label>
                    <input
                      type="email"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="w-full px-4 py-3 text-xs font-semibold border border-zinc-800 rounded-xl bg-zinc-950 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-white transition-all placeholder-zinc-700"
                      placeholder="hello@webnest.agency"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-2">Phone Number</label>
                    <input
                      type="text"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      className="w-full px-4 py-3 text-xs font-semibold border border-zinc-800 rounded-xl bg-zinc-950 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-white transition-all placeholder-zinc-700"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-2">Office Address</label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full px-4 py-3 text-xs font-semibold border border-zinc-800 rounded-xl bg-zinc-950 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-white transition-all placeholder-zinc-700"
                      placeholder="123 Agency St, Suite 100"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-2">WhatsApp Contact Number</label>
                    <input
                      type="text"
                      value={whatsappNumber}
                      onChange={(e) => setWhatsappNumber(e.target.value)}
                      className="w-full px-4 py-3 text-xs font-semibold border border-zinc-800 rounded-xl bg-zinc-950 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-white transition-all placeholder-zinc-700"
                      placeholder="15550000000 (No spaces or formatting)"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-2">Google Map Embed Link</label>
                  <textarea
                    value={mapEmbedUrl}
                    onChange={(e) => setMapEmbedUrl(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 text-xs font-semibold border border-zinc-800 rounded-xl bg-zinc-950 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-white transition-all placeholder-zinc-700 resize-none font-mono"
                    placeholder="https://www.google.com/maps/embed?pb=..."
                  />
                </div>
              </div>
            )}

            {/* SOCIAL PROFILES */}
            {activeTab === "social" && (
              <div className="space-y-5 animate-in fade-in-50 duration-200">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-zinc-800 pb-2">Social Network Links</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-2">LinkedIn URL</label>
                    <input
                      type="url"
                      value={socialLinks.linkedin}
                      onChange={(e) => setSocialLinks({ ...socialLinks, linkedin: e.target.value })}
                      className="w-full px-4 py-3 text-xs font-semibold border border-zinc-800 rounded-xl bg-zinc-950 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-white transition-all placeholder-zinc-700"
                      placeholder="https://linkedin.com/company/..."
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-2">GitHub Profile URL</label>
                    <input
                      type="url"
                      value={socialLinks.github}
                      onChange={(e) => setSocialLinks({ ...socialLinks, github: e.target.value })}
                      className="w-full px-4 py-3 text-xs font-semibold border border-zinc-800 rounded-xl bg-zinc-950 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-white transition-all placeholder-zinc-700"
                      placeholder="https://github.com/..."
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-2">Twitter / X URL</label>
                    <input
                      type="url"
                      value={socialLinks.twitter}
                      onChange={(e) => setSocialLinks({ ...socialLinks, twitter: e.target.value })}
                      className="w-full px-4 py-3 text-xs font-semibold border border-zinc-800 rounded-xl bg-zinc-950 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-white transition-all placeholder-zinc-700"
                      placeholder="https://x.com/..."
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-2">Facebook URL</label>
                    <input
                      type="url"
                      value={socialLinks.facebook}
                      onChange={(e) => setSocialLinks({ ...socialLinks, facebook: e.target.value })}
                      className="w-full px-4 py-3 text-xs font-semibold border border-zinc-800 rounded-xl bg-zinc-950 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-white transition-all placeholder-zinc-700"
                      placeholder="https://facebook.com/..."
                    />
                  </div>
                </div>
              </div>
            )}

            {/* SEO DEFAULTS */}
            {activeTab === "seo" && (
              <div className="space-y-5 animate-in fade-in-50 duration-200">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-zinc-800 pb-2">Global SEO Defaults</h3>
                
                <div>
                  <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-2">Default Page Title Template</label>
                  <input
                    type="text"
                    value={seoDefaults.title}
                    onChange={(e) => setSeoDefaults({ ...seoDefaults, title: e.target.value })}
                    className="w-full px-4 py-3 text-xs font-semibold border border-zinc-800 rounded-xl bg-zinc-950 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-white transition-all placeholder-zinc-700"
                    placeholder="WebNest — Premium Software & Design Agency"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-2">Default Meta Description</label>
                  <textarea
                    value={seoDefaults.description}
                    onChange={(e) => setSeoDefaults({ ...seoDefaults, description: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 text-xs font-semibold border border-zinc-800 rounded-xl bg-zinc-950 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-white transition-all placeholder-zinc-700 resize-none"
                    placeholder="Brief description used by search engines..."
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-2">Default OpenGraph Image URL</label>
                  <ImageUploader
                    value={seoDefaults.ogImage}
                    onChange={(url) => setSeoDefaults({ ...seoDefaults, ogImage: url })}
                  />
                </div>
              </div>
            )}

          </form>
        </div>
      </div>
    </div>
  );
}
