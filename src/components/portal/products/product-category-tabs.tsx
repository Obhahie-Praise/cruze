"use client";

import { useState, useCallback } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { AddCategoryDialog } from "@/components/portal/products/add-category-dialog";
import { PlusSignIcon } from "hugeicons-react";

interface CategoryTab {
  id: string;
  name: string;
  count: number;
}

interface ProductCategoryTabsProps {
  categories: CategoryTab[];
  allCount: number;
  currentCategoryId?: string;
}

export function ProductCategoryTabs({
  categories,
  allCount,
  currentCategoryId,
}: ProductCategoryTabsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [dialogOpen, setDialogOpen] = useState(false);

  const handleTabClick = useCallback(
    (categoryId: string | null) => {
      const params = new URLSearchParams(searchParams.toString());
      if (categoryId) {
        params.set("category", categoryId);
      } else {
        params.delete("category");
      }
      // Reset page on tab change
      params.delete("page");
      router.push(`${pathname}?${params.toString()}`);
    },
    [router, pathname, searchParams]
  );

  const activeId = currentCategoryId ?? null;

  const handleCategoryCreated = () => {
    router.refresh();
  };

  return (
    <>
      <div
        role="tablist"
        aria-label="Filter products by category"
        className="flex flex-wrap gap-1.5 rounded-xl p-1.5"
      >
        {/* All Tab */}
        <button
          key="all"
          id="product-tab-all"
          role="tab"
          aria-selected={activeId === null}
          type="button"
          onClick={() => handleTabClick(null)}
          className={cn(
            "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-all duration-150",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            activeId === null
              ? "bg-muted text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground hover:bg-background/60"
          )}
        >
          All
          <Badge
            variant="secondary"
            className={cn(
              "h-4 min-w-4 px-1 text-[10px] font-semibold tabular-nums",
              activeId === null
                ? "bg-muted text-foreground"
                : "bg-muted/60 text-muted-foreground"
            )}
          >
            {allCount}
          </Badge>
        </button>

        {/* Dynamic Category Tabs */}
        {categories.map(({ id, name, count }) => {
          const isActive = activeId === id;
          return (
            <button
              key={id}
              id={`product-tab-${id}`}
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

        {/* Add Category Tab */}
        <button
          id="product-tab-add-category"
          role="tab"
          aria-selected={false}
          type="button"
          onClick={() => setDialogOpen(true)}
          className={cn(
            "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-all duration-150",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            "text-muted-foreground hover:text-foreground hover:bg-background/60"
          )}
        >
          <PlusSignIcon size={14} />
          Add Category
        </button>
      </div>

      <AddCategoryDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSuccess={handleCategoryCreated}
      />
    </>
  );
}
