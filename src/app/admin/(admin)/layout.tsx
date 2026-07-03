import { AuthProvider } from "@/components/admin/AuthProvider";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminTopBar } from "@/components/admin/AdminTopBar";
import { Toaster } from "react-hot-toast";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <div className="admin-light flex min-h-screen bg-zinc-50 text-zinc-900 selection:bg-indigo-100 selection:text-indigo-900">
        <AdminSidebar />
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <AdminTopBar />
          <main className="flex-1 overflow-y-auto bg-zinc-100/50">
            {children}
          </main>
        </div>
      </div>
      <Toaster position="bottom-right" toastOptions={{ duration: 3000 }} />
    </AuthProvider>
  );
}
