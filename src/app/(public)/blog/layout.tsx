import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Insights & Engineering Blog | WebNest",
  description: "Deep dives into modern web development and UI/UX design trends.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
