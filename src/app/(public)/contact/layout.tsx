import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | WebNest",
  description: "Reach out to discuss your project requirements.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
