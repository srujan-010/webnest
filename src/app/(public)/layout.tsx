import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PreviewProvider } from "@/components/providers/PreviewProvider";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <PreviewProvider>
      <Navbar />
      {children}
      <Footer />
    </PreviewProvider>
  );
}
