"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  Home01Icon,
  PackageIcon,
  ShoppingBag01Icon,
  UserGroupIcon,
  Analytics01Icon,
  Search01Icon,
  SaleTag02Icon,
  CustomerSupportIcon,
  Settings01Icon,
  LogoutSquare02Icon,
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSession, signOut } from "@/lib/auth-client";
import { Skeleton } from "@/components/ui/skeleton";

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
  { name: "Deals", href: "/dashboard/deals", icon: SaleTag02Icon },
  { name: "Support", href: "/dashboard/support", icon: CustomerSupportIcon },
  { name: "Analytics", href: "/dashboard/analytics", icon: Analytics01Icon },
];

function UserAvatar({
  name,
  image,
}: {
  name?: string | null;
  image?: string | null;
}) {
  if (image) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={image}
        alt={name ?? "User avatar"}
        className="h-8 w-8 shrink-0 rounded-full object-cover"
      />
    );
  }
  const initials = name
    ? name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "?";
  return (
    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold text-muted-foreground">
      {initials}
    </span>
  );
}

function DashboardSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = React.useState(false);
  const { data: session, isPending } = useSession();

  // Wire Ctrl+L / Cmd+L to open the search dialog
  React.useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key === "l") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleLogout = async () => {
    await signOut({
      fetchOptions: {
        onSuccess() {
          router.push("/signin");
        },
      },
    });
  };

  return (
    <>
      <Sidebar collapsible="icon">
        {/* ── Header / Brand ─────────────────────────────────── */}
        <SidebarHeader className="h-14 justify-center px-3">
          <Link
            href="/dashboard"
            className="flex items-center gap-2.5 overflow-hidden font-semibold"
          >
            <span className="flex h-6.5 w-6.5 shrink-0 items-center justify-center rounded-md bg-foreground text-xs font-bold text-background">
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
              <SidebarMenu className="space-y-1.5">
                {/* Search — must be first */}
                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={() => setSearchOpen(true)}
                    tooltip="Search (Ctrl+L)"
                    aria-label="Open search dialog"
                    id="sidebar-search-trigger"
                  >
                    <Search01Icon size={16} className="shrink-0" />
                    <span className="flex flex-1 items-center justify-between">
                      Search
                      <kbd
                        className="ml-auto hidden items-center gap-0.5 rounded border border-border bg-muted px-1 py-0.5 text-[10px] font-medium text-muted-foreground group-data-[collapsible=icon]:hidden sm:flex"
                        aria-label="Keyboard shortcut: Ctrl L"
                      >
                        <span>⌃</span>
                        <span>L</span>
                      </kbd>
                    </span>
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

        {/* ── Footer / Profile ────────────────────────────────── */}
        <SidebarFooter className="p-1">
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <SidebarMenuButton
                      size="lg"
                      tooltip="Account"
                      aria-label="Account menu"
                      id="sidebar-profile-button"
                    />
                  }
                >
                  {isPending ? (
                    <>
                      <Skeleton className="h-8 w-8 rounded-full shrink-0" />
                      <div className="flex min-w-0 flex-col gap-1">
                        <Skeleton className="h-3 w-24 rounded" />
                        <Skeleton className="h-2.5 w-32 rounded" />
                      </div>
                    </>
                  ) : (
                    <>
                      <UserAvatar
                        name={session?.user?.name}
                        image={session?.user?.image}
                      />
                      <div className="flex min-w-0 flex-col text-left">
                        <span className="truncate text-sm font-medium">
                          {session?.user?.name ?? "Admin User"}
                        </span>
                        <span className="truncate text-xs text-muted-foreground">
                          {session?.user?.email ?? ""}
                        </span>
                      </div>
                    </>
                  )}
                </DropdownMenuTrigger>

                <DropdownMenuContent side="top" align="start" sideOffset={8}>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {session?.user?.name ?? "Admin User"}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {session?.user?.email ?? ""}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    id="sidebar-account-settings"
                    onClick={() => router.push("/profile")}
                  >
                    <Settings01Icon size={16} className="shrink-0" />
                    Account Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    id="sidebar-logout"
                    variant="destructive"
                    onClick={handleLogout}
                  >
                    <LogoutSquare02Icon size={16} className="shrink-0" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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
