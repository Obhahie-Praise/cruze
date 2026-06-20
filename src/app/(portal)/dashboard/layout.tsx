"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home01Icon,
  PackageIcon,
  ShoppingBag01Icon,
  UserGroupIcon,
  Analytics01Icon,
  Search01Icon,
  UserCircleIcon,
} from "hugeicons-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { ThemeSwitcher } from "@/components/shared/theme-switcher";
import { DashboardSearchDialog } from "@/components/portal/dashboard-search-dialog";
import { DashboardBreadcrumb } from "@/components/portal/dashboard-breadcrumb";

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
}

const navItems: NavItem[] = [
  { name: "Overview", href: "/dashboard/overview", icon: Home01Icon },
  { name: "Orders", href: "/dashboard/orders", icon: ShoppingBag01Icon },
  { name: "Products", href: "/dashboard/products", icon: PackageIcon },
  { name: "Customers", href: "/dashboard/customers", icon: UserGroupIcon },
  { name: "Analytics", href: "/dashboard/analytics", icon: Analytics01Icon },
];

function DashboardSidebar() {
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = React.useState(false);

  return (
    <>
      <Sidebar collapsible="icon">
        {/* ── Header / Brand ─────────────────────────────────── */}
        <SidebarHeader className="h-14 justify-center px-3">
          <Link
            href="/dashboard"
            className="flex items-center gap-2.5 overflow-hidden font-semibold"
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-foreground text-xs font-bold text-background">
              C
            </span>
            <span className="truncate text-sm">Cruze</span>
          </Link>
        </SidebarHeader>

        <Separator className="mb-0" />

        {/* ── Navigation ─────────────────────────────────────── */}
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {/* Search — must be first */}
                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={() => setSearchOpen(true)}
                    tooltip="Search"
                    aria-label="Open search"
                    id="sidebar-search-trigger"
                  >
                    <Search01Icon size={16} className="shrink-0" />
                    <span>Search</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                {/* Nav links */}
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  const Icon = item.icon;
                  return (
                    <SidebarMenuItem key={item.name}>
                      <SidebarMenuButton
                        render={<Link href={item.href} />}
                        isActive={isActive}
                        tooltip={item.name}
                        aria-label={item.name}
                        id={`sidebar-nav-${item.name.toLowerCase()}`}
                      >
                        <Icon size={16} className="shrink-0" />
                        <span>{item.name}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        {/* ── Footer / Profile placeholder ───────────────────── */}
        <Separator />
        <SidebarFooter className="py-2 px-3">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                size="lg"
                tooltip="Account"
                aria-label="Account (coming soon)"
                id="sidebar-profile-button"
                className="cursor-default"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted">
                  <UserCircleIcon size={18} className="text-muted-foreground" />
                </span>
                <div className="flex min-w-0 flex-col text-left">
                  <span className="truncate text-sm font-medium">Admin User</span>
                  <span className="truncate text-xs text-muted-foreground">
                    admin@cruze.com
                  </span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>

        <SidebarRail />
      </Sidebar>

      {/* Search dialog — rendered outside sidebar so it always overlays correctly */}
      <DashboardSearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <DashboardSidebar />

      <SidebarInset>
        {/* ── Top Navigation Bar ──────────────────────────────── */}
        <header className="relative flex h-14 shrink-0 items-center border-b border-border bg-background px-4">
          {/* Left: Sidebar trigger */}
          <div className="flex items-center">
            <SidebarTrigger
              id="dashboard-sidebar-trigger"
              aria-label="Toggle sidebar"
            />
          </div>

          {/* Center: Breadcrumb — absolutely centered so it's unaffected by side content */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="pointer-events-auto">
              <DashboardBreadcrumb />
            </div>
          </div>

          {/* Right: Theme switcher */}
          <div className="ml-auto flex items-center">
            <ThemeSwitcher />
          </div>
        </header>

        {/* ── Main Content Area ───────────────────────────────── */}
        <main
          id="dashboard-main-content"
          className="flex flex-1 flex-col overflow-y-auto p-6"
        >
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
