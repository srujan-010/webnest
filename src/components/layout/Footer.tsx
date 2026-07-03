"use client";

import Link from "next/link";
import { Container } from "../ui/Section";
import { ArrowRight } from "lucide-react";
import { FaGithub, FaLinkedin, FaTwitter, FaFacebook, FaInstagram } from "react-icons/fa";
import { useState, useEffect } from "react";
import { footerContent as defaultFooter } from "@/lib/fallbackData";
import { getFooterContent, getSiteSettings } from "@/services/api";
import { toast } from "react-hot-toast";

export function Footer() {
  const [footer, setFooter] = useState(defaultFooter);
  const [settings, setSettings] = useState<any>(null);
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    getFooterContent().then(data => {
      if (data && data.description) {
        setFooter(data);
      }
    });
    getSiteSettings().then(data => {
      if (data) setSettings(data);
    });
  }, []);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setSubmitting(true);
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
      const res = await fetch(`${API_URL}/newsletter/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const json = await res.json();
      if (res.ok && json.success) {
        toast.success("Thank you! You have subscribed successfully.");
        setEmail("");
      } else {
        toast.error(json.message || "Failed to subscribe.");
      }
    } catch {
      toast.error("Could not connect to subscription services.");
    } finally {
      setSubmitting(false);
    }
  };

  const socialItems = settings?.socialLinks 
    ? Object.entries(settings.socialLinks).filter(([_, url]) => !!url) 
    : [];

  return (
    <footer className="bg-slate-50 pt-14 pb-10 border-t border-gray-200 shadow-[0_-20px_40px_rgba(0,0,0,0.02)] relative z-10 select-none">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-12">
          
          {/* Brand & Newsletter */}
          <div className="lg:col-span-5 pr-0 lg:pr-12">
            <Link href="/" className="flex items-center gap-2 group mb-6">
              <img src="https://res.cloudinary.com/dixbhnqnf/image/upload/v1783074928/WhatsApp_Image_2026-07-03_at_3.48.58_PM-Photoroom_gk5hxf.png" alt="WebNest Logo" className="h-12 object-contain" />
            </Link>
            <p className="text-ink-600 mb-8 max-w-sm leading-relaxed text-sm">
              {settings?.aboutText || footer.description}
            </p>
            
            <form onSubmit={handleSubscribe} className="relative max-w-sm">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                suppressHydrationWarning 
                placeholder="Subscribe to our newsletter" 
                className="w-full bg-white border border-gray-200 shadow-sm rounded-full px-6 py-3.5 text-xs font-semibold text-ink-900 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all placeholder:text-gray-400"
                required
              />
              <button 
                type="submit" 
                suppressHydrationWarning 
                disabled={submitting}
                className="absolute right-1.5 top-1.5 bottom-1.5 w-10 bg-brand-600 hover:bg-brand-500 rounded-full flex items-center justify-center text-white transition-colors disabled:opacity-50"
                aria-label="Subscribe"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Links */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h4 className="text-ink-900 font-bold mb-6 font-display text-sm">Services</h4>
              <ul className="space-y-4 text-xs font-semibold">
                {footer?.servicesLinks?.map(link => (
                  <li key={link.label}><Link href={link.url} className="text-ink-600 hover:text-brand-600 transition-colors">{link.label}</Link></li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-ink-900 font-bold mb-6 font-display text-sm">Company</h4>
              <ul className="space-y-4 text-xs font-semibold">
                {footer?.companyLinks?.map(link => (
                  <li key={link.label}><Link href={link.url} className="text-ink-600 hover:text-brand-600 transition-colors">{link.label}</Link></li>
                ))}
              </ul>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <h4 className="text-ink-900 font-bold mb-6 font-display text-sm">Connect</h4>
              <div className="flex gap-4">
                {socialItems.length > 0 ? (
                  socialItems.map(([platform, url]) => {
                    const Icon = platform === "linkedin" ? FaLinkedin :
                                  platform === "github" ? FaGithub :
                                  platform === "twitter" ? FaTwitter : FaFacebook;
                    return (
                      <a key={platform} href={url as string} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center text-ink-600 hover:text-brand-600 hover:border-brand-200 transition-all">
                        <Icon className="w-4 h-4" />
                      </a>
                    );
                  })
                ) : (
                  footer?.socialLinks?.map(link => {
                    const platformLower = link.platform.toLowerCase();
                    const Icon = platformLower.includes("linkedin") ? FaLinkedin :
                                  platformLower.includes("github") ? FaGithub : FaTwitter;
                    return (
                      <a key={link.platform} href={link.url} className="w-10 h-10 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center text-ink-600 hover:text-brand-600 hover:border-brand-200 transition-all">
                        <Icon className="w-4 h-4" />
                      </a>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-xs font-semibold">
            {settings?.footerText || footer.copyright.replace('2024', new Date().getFullYear().toString())}
          </p>
          <div className="flex gap-6 text-xs font-semibold">
            <a href="/privacy" className="text-gray-500 hover:text-brand-600 transition-colors">Privacy Policy</a>
            <a href="/terms" className="text-gray-500 hover:text-brand-600 transition-colors">Terms of Service</a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
