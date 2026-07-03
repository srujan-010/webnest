import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Services | WebNest",
  description: "Bespoke business websites, web applications, and e-commerce platforms engineered for growth.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
