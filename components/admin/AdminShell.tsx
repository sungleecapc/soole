"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  FileText,
  ListOrdered,
  LogOut,
  ExternalLink,
} from "lucide-react";
import { auth } from "@/lib/firebase/client"; // Use client auth for sign-out

interface AdminShellProps {
  children: React.ReactNode;
}

export function AdminShell({ children }: AdminShellProps) {
  const pathname = usePathname();

  const navItems = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/posts", label: "Posts", icon: FileText },
    { href: "/admin/rankings", label: "Rankings", icon: ListOrdered },
  ];

  return (
    <div className="flex min-h-screen bg-stone-50 dark:bg-stone-950">
      {/* Sidebar */}
      <aside className="hidden w-64 border-r border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 md:block">
        <div className="flex h-16 items-center px-6 border-b border-stone-200 dark:border-stone-800">
          <Link href="/admin" className="text-lg font-bold tracking-tight">
            SOOLE Admin
          </Link>
        </div>
        <div className="p-4 space-y-4">
          <nav className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  pathname === item.href
                    ? "bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-stone-100"
                    : "text-stone-500 hover:bg-stone-50 dark:hover:bg-stone-800 hover:text-stone-900 dark:hover:text-stone-100",
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="pt-4 border-t border-stone-100 dark:border-stone-800">
            <Button
              variant="outline"
              className="w-full justify-start text-stone-500"
              asChild
            >
              <Link href="/" target="_blank">
                <ExternalLink className="mr-2 h-4 w-4" /> View Public Site
              </Link>
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 mt-2"
              onClick={() => auth.signOut()}
            >
              <LogOut className="mr-2 h-4 w-4" /> Sign Out
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        <header className="flex h-16 items-center border-b border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 px-6 md:hidden">
          <Link href="/admin" className="text-lg font-bold tracking-tight">
            SOOLE Admin
          </Link>
        </header>
        <div className="p-6 md:p-8">{children}</div>
      </main>
    </div>
  );
}
