import type { Metadata } from "next";
import { Inter, Space_Grotesk, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WebNest | Premium Software & Design Agency",
  description: "WebNest is an award-winning digital agency crafting premium web applications, corporate websites, and e-commerce platforms that drive real business growth.",
  keywords: ["software agency", "web development", "UI/UX design", "React", "Next.js", "e-commerce"],
  authors: [{ name: "WebNest" }],
  openGraph: {
    title: "WebNest | Premium Software & Design Agency",
    description: "WebNest is an award-winning digital agency crafting premium web applications, corporate websites, and e-commerce platforms that drive real business growth.",
    type: "website",
    locale: "en_US",
    siteName: "WebNest",
  },
  twitter: {
    card: "summary_large_image",
    title: "WebNest | Premium Software & Design Agency",
    description: "Crafting digital experiences that drive business growth.",
  },
  icons: {
    icon: "https://res.cloudinary.com/dixbhnqnf/image/upload/v1783074928/WhatsApp_Image_2026-07-03_at_3.48.58_PM-Photoroom_gk5hxf.png"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Global Schema for Organization
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "WebNest",
    "url": "https://webnest.agency",
    "logo": "https://res.cloudinary.com/dixbhnqnf/image/upload/v1783074928/WhatsApp_Image_2026-07-03_at_3.48.58_PM-Photoroom_gk5hxf.png",
    "sameAs": [
      "https://twitter.com/webnest",
      "https://linkedin.com/company/webnest"
    ],
    "description": "Premium software development and UI/UX design agency."
  };

  return (
    <html
      lang="en"
      className={cn("h-full", "scroll-smooth", inter.variable, spaceGrotesk.variable, "font-sans", geist.variable)}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans text-ink-900 bg-surface-0" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
