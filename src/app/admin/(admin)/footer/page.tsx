"use client";

import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useAuth } from "@/components/admin/AuthProvider";
import { Save, Plus, Trash2 } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

interface ILink { label: string; url: string; }
interface ISocialLink { platform: string; url: string; }

export default function AdminFooter() {
  const { token } = useAuth();
  const [description, setDescription] = useState("");
  const [copyright, setCopyright] = useState("");
  const [servicesLinks, setServicesLinks] = useState<ILink[]>([]);
  const [companyLinks, setCompanyLinks] = useState<ILink[]>([]);
  const [socialLinks, setSocialLinks] = useState<ISocialLink[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/footer`)
      .then((r) => r.json())
      .then((data) => {
        if (data) {
          setDescription(data.description || "");
          setCopyright(data.copyright || "");
          setServicesLinks(data.servicesLinks || []);
          setCompanyLinks(data.companyLinks || []);
          setSocialLinks(data.socialLinks || []);
        }
      })
      .catch(() => toast.error("Failed to load footer data."));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch(`${API_URL}/footer`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        credentials: "include",
        body: JSON.stringify({ description, copyright, servicesLinks, companyLinks, socialLinks }),
      });
      if (res.ok) toast.success("Footer saved!");
      else throw new Error("Save failed.");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  const addServiceLink = () => setServicesLinks((prev) => [...prev, { label: "", url: "" }]);
  const removeServiceLink = (idx: number) => setServicesLinks((prev) => prev.filter((_, i) => i !== idx));
  const updateServiceLink = (idx: number, key: keyof ILink, val: string) =>
    setServicesLinks((prev) => prev.map((item, i) => (i === idx ? { ...item, [key]: val } : item)));

  const addCompanyLink = () => setCompanyLinks((prev) => [...prev, { label: "", url: "" }]);
  const removeCompanyLink = (idx: number) => setCompanyLinks((prev) => prev.filter((_, i) => i !== idx));
  const updateCompanyLink = (idx: number, key: keyof ILink, val: string) =>
    setCompanyLinks((prev) => prev.map((item, i) => (i === idx ? { ...item, [key]: val } : item)));

  const addSocialLink = () => setSocialLinks((prev) => [...prev, { platform: "FaTwitter", url: "" }]);
  const removeSocialLink = (idx: number) => setSocialLinks((prev) => prev.filter((_, i) => i !== idx));
  const updateSocialLink = (idx: number, key: keyof ISocialLink, val: string) =>
    setSocialLinks((prev) => prev.map((item, i) => (i === idx ? { ...item, [key]: val } : item)));

  return (
    <div className="p-6 max-w-4xl space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Footer Settings</h1>
          <p className="text-sm text-gray-500 mt-0.5">Manage footer description, company/services links, and social links.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-60 transition-colors"
        >
          <Save className="w-4 h-4" /> {saving ? "Saving…" : "Save"}
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Footer Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Copyright Text</label>
          <input
            value={copyright}
            onChange={(e) => setCopyright(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>
      </div>

      {/* Services Links */}
      <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
        <div className="px-4 py-3 flex items-center justify-between">
          <h2 className="font-semibold text-gray-900 text-sm">Services Links</h2>
          <button onClick={addServiceLink} className="text-xs text-blue-600 hover:underline">+ Add Link</button>
        </div>
        {servicesLinks.length === 0 && (
          <div className="px-4 py-8 text-center text-gray-400 text-sm">No service links yet.</div>
        )}
        {servicesLinks.map((item, i) => (
          <div key={i} className="px-4 py-3 flex items-center gap-3">
            <div className="flex-1 grid grid-cols-2 gap-2">
              <input
                value={item.label}
                onChange={(e) => updateServiceLink(i, "label", e.target.value)}
                placeholder="Label"
                className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none"
              />
              <input
                value={item.url}
                onChange={(e) => updateServiceLink(i, "url", e.target.value)}
                placeholder="URL (e.g. /services#e-commerce)"
                className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none"
              />
            </div>
            <button onClick={() => removeServiceLink(i)} className="text-red-400 hover:text-red-600">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Company Links */}
      <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
        <div className="px-4 py-3 flex items-center justify-between">
          <h2 className="font-semibold text-gray-900 text-sm">Company Links</h2>
          <button onClick={addCompanyLink} className="text-xs text-blue-600 hover:underline">+ Add Link</button>
        </div>
        {companyLinks.length === 0 && (
          <div className="px-4 py-8 text-center text-gray-400 text-sm">No company links yet.</div>
        )}
        {companyLinks.map((item, i) => (
          <div key={i} className="px-4 py-3 flex items-center gap-3">
            <div className="flex-1 grid grid-cols-2 gap-2">
              <input
                value={item.label}
                onChange={(e) => updateCompanyLink(i, "label", e.target.value)}
                placeholder="Label"
                className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none"
              />
              <input
                value={item.url}
                onChange={(e) => updateCompanyLink(i, "url", e.target.value)}
                placeholder="URL (e.g. /about)"
                className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none"
              />
            </div>
            <button onClick={() => removeCompanyLink(i)} className="text-red-400 hover:text-red-600">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Social Links */}
      <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
        <div className="px-4 py-3 flex items-center justify-between">
          <h2 className="font-semibold text-gray-900 text-sm">Social Links</h2>
          <button onClick={addSocialLink} className="text-xs text-blue-600 hover:underline">+ Add Link</button>
        </div>
        {socialLinks.length === 0 && (
          <div className="px-4 py-8 text-center text-gray-400 text-sm">No social links yet.</div>
        )}
        {socialLinks.map((item, i) => (
          <div key={i} className="px-4 py-3 flex items-center gap-3">
            <div className="flex-1 grid grid-cols-2 gap-2">
              <select
                value={item.platform}
                onChange={(e) => updateSocialLink(i, "platform", e.target.value)}
                className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none"
              >
                <option value="FaTwitter">Twitter (FaTwitter)</option>
                <option value="FaLinkedin">LinkedIn (FaLinkedin)</option>
                <option value="FaGithub">Github (FaGithub)</option>
                <option value="FaInstagram">Instagram (FaInstagram)</option>
                <option value="FaFacebook">Facebook (FaFacebook)</option>
                <option value="FaYoutube">YouTube (FaYoutube)</option>
              </select>
              <input
                value={item.url}
                onChange={(e) => updateSocialLink(i, "url", e.target.value)}
                placeholder="URL (e.g. https://twitter.com/...)"
                className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none"
              />
            </div>
            <button onClick={() => removeSocialLink(i)} className="text-red-400 hover:text-red-600">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
