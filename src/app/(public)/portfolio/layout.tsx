import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Selected Work & Portfolio | WebNest",
  description: "Explore our portfolio of premium websites and digital products.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
