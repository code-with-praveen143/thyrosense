import React from "react";
import { Sidebar } from "@/app/dashboard/components/sidebar";
import { Navbar } from "@/app/dashboard/components/user-nav";
import { Footer } from "./footer";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const userRole =
    typeof window !== "undefined" ? sessionStorage.getItem("role") : null;

  return (
    <div className="relative min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <Navbar />
      </header>

      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Mobile sidebar */}

        {/* Desktop sidebar */}
        <aside className="hidden lg:block w-64 flex-shrink-0 border-r bg-background">
          <div className="h-full overflow-y-auto">
            <Sidebar />
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
