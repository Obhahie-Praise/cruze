"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home01Icon,
  PackageIcon,
  ShoppingBag01Icon,
  UserGroupIcon,
  Analytics01Icon,
} from "hugeicons-react";
import { cn } from "@/lib/utils";

interface NavigationItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navigation: NavigationItem[] = [
  { name: "Overview", href: "/dashboard/overview", icon: Home01Icon },
  { name: "Products", href: "/dashboard/products", icon: PackageIcon },
  { name: "Orders", href: "/dashboard/orders", icon: ShoppingBag01Icon },
  { name: "Customers", href: "/dashboard/customers", icon: UserGroupIcon },
  { name: "Analytics", href: "/dashboard/analytics", icon: Analytics01Icon },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-20 flex w-64 flex-col border-r border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        {/* Logo Section */}
        <div className="flex h-16 items-center px-6 border-b border-zinc-200 dark:border-zinc-800">
          <Link href="/dashboard" className="flex items-center gap-2 font-semibold text-lg tracking-tight">
            <span className="h-6 w-6 rounded bg-zinc-900 dark:bg-zinc-100 flex items-center justify-center text-white dark:text-black text-xs font-bold">C</span>
            Cruze Portal
          </Link>
        </div>

        {/* Navigation links */}
        <nav className="flex-1 space-y-1 px-4 py-6">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-50"
                    : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/50 dark:hover:text-zinc-50"
                )}
              >
                <Icon className={cn(
                  "h-5 w-5 transition-transform duration-200 group-hover:scale-105",
                  isActive ? "text-zinc-900 dark:text-zinc-50" : "text-zinc-400 dark:text-zinc-500"
                )} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Footer/User Info placeholder */}
        <div className="border-t border-zinc-200 p-4 dark:border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center font-semibold text-sm">
              AD
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="truncate text-sm font-medium">Admin User</p>
              <p className="truncate text-xs text-zinc-500 dark:text-zinc-400">admin@cruze.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 pl-64">
        {/* Top Header */}
        <header className="flex h-16 items-center justify-between border-b border-zinc-200 bg-white px-8 dark:border-zinc-800 dark:bg-zinc-900">
          <h1 className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
            {navigation.find((item) => item.href === pathname)?.name || "Dashboard"}
          </h1>
          <div className="flex items-center gap-4">
            {/* Minimal top actions placeholder */}
            <span className="text-xs text-zinc-400 dark:text-zinc-500">Secure Admin Session</span>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
