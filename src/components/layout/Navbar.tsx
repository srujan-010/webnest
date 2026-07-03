"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Button } from "../ui/Button";
import { ChevronDown, Search, Monitor, Smartphone, ShoppingCart, LayoutDashboard, Search as SearchIcon, Wrench, ArrowRight } from "lucide-react";
import { usePathname } from "next/navigation";
import { navLinks as defaultNavLinks, navServices as defaultNavServices } from "@/lib/fallbackData";
import { getSiteSettings, getServices } from "@/services/api";

const iconMap: Record<string, any> = { Monitor, Smartphone, ShoppingCart, LayoutDashboard, SearchIcon, Wrench };

export function Navbar() {
  const [navLinks, setNavLinks] = useState(defaultNavLinks);
  const [services, setServices] = useState(defaultNavServices);
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    getSiteSettings().then(data => {
      if (data) {
        setSettings(data);
        if (data.navItems && data.navItems.length > 0) {
          const formattedLinks = data.navItems.map((item: any) => ({
            name: item.label,
            href: item.url
          }));
          setNavLinks(formattedLinks);
        }
      }
    });
    getServices().then(data => {
      if (data && data.length > 0) {
        const formattedServices = data.map((item: any) => ({
          name: item.title,
          href: item.link || `/services#${item.slug}`,
          desc: item.shortDescription,
          icon: item.icon
        }));
        setServices(formattedServices);
      }
    });
  }, []);

  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const updateScrolled = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", updateScrolled);
    updateScrolled();
    return () => window.removeEventListener("scroll", updateScrolled);
  }, []);

  const navHeight = useTransform(scrollY, [0, 100], ["5rem", "4rem"]);
  const navBlur = useTransform(scrollY, [0, 100], ["blur(0px)", "blur(12px)"]);
  const navBg = useTransform(scrollY, [0, 100], ["rgba(255,255,255,0)", "rgba(255,255,255,0.85)"]);
  const navShadow = useTransform(scrollY, [0, 100], ["none", "0 4px 30px rgba(15, 23, 42, 0.05)"]);

  // Close menus on route change
  useEffect(() => {
    setActiveMenu(null);
  }, [pathname]);

  return (
    <motion.header
      style={{
        height: navHeight,
        backdropFilter: navBlur,
        backgroundColor: navBg,
        boxShadow: navShadow,
      }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center transition-all duration-300 border-b border-transparent data-[scrolled=true]:border-gray-200/50"
      data-scrolled={isScrolled}
      onMouseLeave={() => setActiveMenu(null)}
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between h-full relative">
        <Link href="/" className="flex items-center gap-2 group shrink-0">
          <img src="https://res.cloudinary.com/dixbhnqnf/image/upload/v1783074928/WhatsApp_Image_2026-07-03_at_3.48.58_PM-Photoroom_gk5hxf.png" alt="WebNest Logo" className="h-12 object-contain" />
        </Link>

        <nav className="hidden lg:flex items-center gap-1 h-full">
          
          {/* Services Mega Menu Trigger */}
          <div 
            className="relative h-full flex items-center px-3 cursor-pointer group"
            onMouseEnter={() => setActiveMenu("services")}
          >
            <Link href="/services" className="flex items-center gap-1 text-sm font-semibold text-ink-600 group-hover:text-brand-600 transition-colors">
              Services <ChevronDown className="w-3.5 h-3.5 opacity-50 group-hover:rotate-180 transition-transform duration-300" />
            </Link>
          </div>

          {/* Portfolio Dropdown Trigger */}
          <div 
            className="relative h-full flex items-center px-3 cursor-pointer group"
            onMouseEnter={() => setActiveMenu("portfolio")}
          >
            <Link href="/portfolio" className="flex items-center gap-1 text-sm font-semibold text-ink-600 group-hover:text-brand-600 transition-colors">
              Portfolio <ChevronDown className="w-3.5 h-3.5 opacity-50 group-hover:rotate-180 transition-transform duration-300" />
            </Link>
          </div>

          {/* Standard Links */}
          {navLinks.map((link) => (
            <div 
              key={link.name} 
              className="h-full flex items-center px-3"
              onMouseEnter={() => setActiveMenu(null)}
            >
              <Link
                href={link.href}
                className="text-sm font-semibold text-ink-600 hover:text-brand-600 transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-0.5 after:bg-brand-600 after:scale-x-0 after:origin-right hover:after:scale-x-100 hover:after:origin-left after:transition-transform after:duration-300"
              >
                {link.name}
              </Link>
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          <button className="hidden sm:flex w-9 h-9 items-center justify-center rounded-full text-ink-600 hover:bg-surface-100 transition-colors" suppressHydrationWarning>
            <Search className="w-4 h-4" />
          </button>
          <Link href="/contact">
            <Button variant="ghost" className="hidden md:inline-flex px-4" suppressHydrationWarning>
              Contact
            </Button>
          </Link>
          <Link href={settings?.headerCta?.link || "/contact"}>
            <Button variant="primary" className="px-5 shadow-sm">
              {settings?.headerCta?.label || "Start Project"}
            </Button>
          </Link>
        </div>

        {/* --- DROPDOWNS --- */}
        <AnimatePresence>
          {activeMenu === "services" && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -5, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="absolute top-[calc(100%-8px)] left-1/2 -translate-x-1/2 w-[800px] bg-white rounded-2xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border border-gray-100 p-6 overflow-hidden"
              onMouseEnter={() => setActiveMenu("services")}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                {services.map((service) => (
                  <Link key={service.name} href={service.href} className="group/item flex items-start gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center shrink-0 group-hover/item:bg-brand-600 group-hover/item:text-white transition-colors">
                      {(() => {
                        const IconComponent = typeof service.icon === 'string' ? iconMap[service.icon] : service.icon;
                        return IconComponent ? <IconComponent className="w-5 h-5" /> : null;
                      })()}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-ink-900 mb-0.5">{service.name}</h4>
                      <p className="text-xs text-ink-500 leading-relaxed">{service.desc}</p>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between bg-gray-50/50 -mx-6 -mb-6 px-6 py-4">
                <span className="text-sm text-ink-600 font-medium">Looking for a custom solution?</span>
                <Link href="/contact" className="text-sm font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1">
                  Book a free consultation <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          )}

          {activeMenu === "portfolio" && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -5, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="absolute top-[calc(100%-8px)] left-1/4 w-[280px] bg-white rounded-2xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border border-gray-100 p-2 overflow-hidden"
              onMouseEnter={() => setActiveMenu("portfolio")}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <div className="flex flex-col">
                {['All Projects', 'Business Websites', 'E-Commerce', 'Web Applications', 'Admin Dashboards'].map((cat) => (
                  <Link key={cat} href={`/portfolio?category=${cat.toLowerCase().replace(' ', '-')}`} className="px-4 py-2.5 text-sm font-semibold text-ink-700 hover:bg-brand-50 hover:text-brand-600 rounded-lg transition-colors">
                    {cat}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
