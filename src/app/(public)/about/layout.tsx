import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About WebNest | Premium Agency",
  description: "Learn about our mission, vision, and the engineering collective behind WebNest.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
