import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Tech Stack | WebNest",
  description: "We build exclusively on modern stacks like Next.js, React, Node.js, and PostgreSQL.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
