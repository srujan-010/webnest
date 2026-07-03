"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, MessageSquare, Phone } from "lucide-react";
import { Button } from "../ui/Button";
import { Container, Section } from "../ui/Section";
import { Card } from "../ui/Card";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { getSiteSettings } from "@/services/api";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export function ContactSplit() {
  const [settings, setSettings] = useState<any>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [projectType, setProjectType] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    getSiteSettings().then((data) => {
      if (data) setSettings(data);
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(`${API_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, projectType, message }),
      });
      const json = await res.json();
      if (res.ok && json.success) {
        toast.success("Thank you! Your message has been received.");
        setName("");
        setEmail("");
        setPhone("");
        setProjectType("");
        setMessage("");
      } else {
        toast.error(json.message || "Failed to send message.");
      }
    } catch {
      toast.error("Could not send message. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const whatsappLink = settings?.whatsappNumber
    ? `https://wa.me/${settings.whatsappNumber.replace(/\D/g, "")}`
    : "https://wa.me/15550000000";

  return (
    <Section id="contact" className="py-24 md:py-32 bg-slate-50 relative overflow-hidden">
      {/* Decorative ambient shape */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-50/45 to-transparent pointer-events-none animate-pulse duration-[8000ms]" />
      
      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Left: Contact Info */}
          <div className="flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-ink-900 mb-4 font-display">
                Let's build something <br />
                <span className="text-brand-600">extraordinary.</span>
              </h2>
              <p className="text-lg text-ink-600 mb-8 max-w-md">
                Ready to transform your digital presence? Reach out to discuss your project, and our team will get back to you within 24 hours.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="space-y-8 mb-10"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-brand-600 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-ink-900 mb-1">Email Us</h4>
                  <a href={`mailto:${settings?.contactEmail || "hello@webnest.agency"}`} className="text-ink-600 hover:text-brand-600 transition-colors">
                    {settings?.contactEmail || "hello@webnest.agency"}
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-brand-600 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-ink-900 mb-1">Call Us</h4>
                  <a href={`tel:${settings?.contactPhone || "+1 (555) 000-0000"}`} className="text-ink-600 hover:text-brand-600 transition-colors">
                    {settings?.contactPhone || "+1 (555) 000-0000"}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-brand-600 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-ink-900 mb-1">Visit Studio</h4>
                  <p className="text-ink-600 leading-relaxed">
                    {settings?.address || "123 Innovation Drive, Tech Park\nBangalore, KA 560001"}
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="w-full sm:w-auto bg-[#25D366] hover:bg-[#1DA851] text-white shadow-[0_8px_20px_-8px_rgba(37,211,102,0.5)]">
                  <MessageSquare className="w-5 h-5 mr-2 fill-current" /> Chat on WhatsApp
                </Button>
              </a>
            </motion.div>
          </div>

          {/* Right: Premium Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Card variant="default" padding="lg" className="shadow-2xl border-0 ring-1 ring-gray-900/5 bg-white">
              <h3 className="text-2xl font-bold font-display text-ink-900 mb-8">Send us a message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    suppressHydrationWarning
                    className="peer w-full bg-slate-50/50 border border-gray-200 rounded-xl px-4 pt-6 pb-2 text-ink-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all placeholder-transparent"
                    placeholder="Full Name"
                    required
                  />
                  <label htmlFor="name" className="absolute left-4 top-2 text-xs font-semibold text-ink-400 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:top-2 peer-focus:text-xs peer-focus:text-brand-600">Full Name *</label>
                </div>

                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    suppressHydrationWarning
                    className="peer w-full bg-slate-50/50 border border-gray-200 rounded-xl px-4 pt-6 pb-2 text-ink-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all placeholder-transparent"
                    placeholder="Email Address"
                    required
                  />
                  <label htmlFor="email" className="absolute left-4 top-2 text-xs font-semibold text-ink-400 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:top-2 peer-focus:text-xs peer-focus:text-brand-600">Email Address *</label>
                </div>
                
                <div className="relative">
                  <input
                    type="text"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    suppressHydrationWarning
                    className="peer w-full bg-slate-50/50 border border-gray-200 rounded-xl px-4 pt-6 pb-2 text-ink-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all placeholder-transparent"
                    placeholder="Phone Number"
                  />
                  <label htmlFor="phone" className="absolute left-4 top-2 text-xs font-semibold text-ink-400 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:top-2 peer-focus:text-xs peer-focus:text-brand-600">Phone Number</label>
                </div>

                <div className="relative">
                  <select
                    id="projectType"
                    value={projectType}
                    onChange={(e) => setProjectType(e.target.value)}
                    suppressHydrationWarning
                    className="peer w-full bg-slate-50/50 border border-gray-200 rounded-xl px-4 pt-6 pb-2 text-ink-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all appearance-none font-semibold text-xs"
                  >
                    <option value="" disabled hidden></option>
                    <option value="Web App">Web Application</option>
                    <option value="E-Commerce">E-Commerce</option>
                    <option value="UI/UX Design">UI/UX Design</option>
                    <option value="Consulting">Consulting / General</option>
                  </select>
                  <label htmlFor="projectType" className="absolute left-4 top-2 text-xs font-semibold text-ink-400">Project Type</label>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                     <svg className="w-4 h-4 text-ink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>

                <div className="relative">
                  <textarea
                    id="message"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    suppressHydrationWarning
                    className="peer w-full bg-slate-50/50 border border-gray-200 rounded-xl px-4 pt-6 pb-2 text-ink-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all placeholder-transparent resize-none"
                    placeholder="Project Details"
                    required
                  ></textarea>
                  <label htmlFor="message" className="absolute left-4 top-2 text-xs font-semibold text-ink-400 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:top-2 peer-focus:text-xs peer-focus:text-brand-600">Project Details *</label>
                </div>

                <Button variant="primary" size="lg" className="w-full h-12 shadow-lg shadow-brand-500/10 hover:shadow-brand-500/20" disabled={submitting}>
                  {submitting ? "Sending…" : "Send Message"}
                </Button>
              </form>
            </Card>
          </motion.div>
          
        </div>
      </Container>
    </Section>
  );
}
