"use client";

import { useCallback } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { CustomerFilter } from "@/lib/customers-actions";

interface CustomerTabsProps {
  counts: Record<CustomerFilter, number>;
  currentFilter?: CustomerFilter;
}

export function CustomerTabs({
  counts,
  currentFilter,
}: CustomerTabsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleTabClick = useCallback(
    (filter: CustomerFilter) => {
      const params = new URLSearchParams(searchParams.toString());
      if (filter !== "ALL") {
        params.set("filter", filter);
      } else {
        params.delete("filter");
      }
      // Reset page on tab change
      params.delete("page");
      router.push(`${pathname}?${params.toString()}`);
    },
    [router, pathname, searchParams]
  );

  const activeFilter = currentFilter ?? "ALL";

  const tabs: { id: CustomerFilter; name: string }[] = [
    { id: "ALL", name: "All" },
    { id: "THIS_MONTH", name: "This Month" },
    { id: "PAYING", name: "Paying Users" },
    { id: "IN_CART", name: "Items In Cart" },
    { id: "MULTIPLE_PURCHASES", name: "Multiple Purchases" },
    { id: "PROMOTIONAL", name: "Promotional Purchases" },
    { id: "HIGH_VALUE", name: "High Value" },
    { id: "INACTIVE", name: "Inactive" },
  ];

  return (
    <div
      role="tablist"
      aria-label="Filter customers"
      className="flex flex-wrap gap-1.5 rounded-xl p-1.5"
    >
      {tabs.map(({ id, name }) => {
        const isActive = activeFilter === id;
        const count = counts[id];
        return (
          <button
            key={id}
            id={`customer-tab-${id}`}
            role="tab"
            aria-selected={isActive}
            type="button"
            onClick={() => handleTabClick(id)}
            className={cn(
              "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-all duration-150",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              isActive
                ? "bg-muted text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-background/60"
            )}
          >
            {name}
            <Badge
              variant="secondary"
              className={cn(
                "h-4 min-w-4 px-1 text-[10px] font-semibold tabular-nums",
                isActive
                  ? "bg-muted text-foreground"
                  : "bg-muted/60 text-muted-foreground"
              )}
            >
              {count}
            </Badge>
          </button>
        );
      })}
    </div>
  );
}
