import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Engineering Process | WebNest",
  description: "Our battle-tested methodology from discovery to deployment.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
