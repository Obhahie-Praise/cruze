"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { OrderStatus } from "@/lib/db-types";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface TabConfig {
  label: string;
  value: OrderStatus | "ALL";
}

const TABS: TabConfig[] = [
  { label: "All", value: "ALL" },
  { label: "New", value: OrderStatus.NEW },
  { label: "Pending", value: OrderStatus.PENDING },
  { label: "Ready", value: OrderStatus.READY },
  { label: "Delivered", value: OrderStatus.DELIVERED },
  { label: "Cancelled / Returned", value: OrderStatus.CANCELLED },
  { label: "Refunded", value: OrderStatus.REFUNDED },
];

interface OrderTabsProps {
  currentStatus?: OrderStatus;
  counts?: Partial<Record<OrderStatus | "ALL", number>>;
}

export function OrderTabs({ currentStatus, counts = {} }: OrderTabsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleTabClick = useCallback(
    (value: OrderStatus | "ALL") => {
      const params = new URLSearchParams(searchParams.toString());
      if (value === "ALL") {
        params.delete("status");
      } else {
        params.set("status", value);
      }
      router.push(`${pathname}?${params.toString()}`);
    },
    [router, pathname, searchParams]
  );

  const activeTab = currentStatus ?? "ALL";

  return (
    <div
      role="tablist"
      aria-label="Filter orders by status"
      className="flex flex-wrap gap-1.5 rounded-xl bg-muted/40 border border-border p-1.5"
    >
      {TABS.map(({ label, value }) => {
        const isActive = activeTab === value;
        const count = counts[value];

        return (
          <button
            key={value}
            id={`order-tab-${value.toLowerCase()}`}
            role="tab"
            aria-selected={isActive}
            type="button"
            onClick={() => handleTabClick(value)}
            className={cn(
              "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-all duration-150",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              isActive
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-background/60"
            )}
          >
            {label}
            {count !== undefined && (
              <Badge
                variant="secondary"
                className={cn(
                  "h-4 min-w-4 px-1 text-[10px] font-semibold tabular-nums",
                  isActive ? "bg-muted text-foreground" : "bg-muted/60 text-muted-foreground"
                )}
              >
                {count}
              </Badge>
            )}
          </button>
        );
      })}
    </div>
  );
}
