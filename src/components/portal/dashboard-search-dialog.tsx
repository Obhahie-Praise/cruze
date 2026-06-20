"use client";

import * as React from "react";
import { Search01Icon, ArrowRight01Icon } from "hugeicons-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface SearchSuggestion {
  label: string;
  description: string;
  href: string;
}

const suggestions: SearchSuggestion[] = [
  { label: "Overview", description: "Dashboard overview", href: "/dashboard/overview" },
  { label: "Products", description: "Manage your products", href: "/dashboard/products" },
  { label: "Orders", description: "View and manage orders", href: "/dashboard/orders" },
  { label: "Customers", description: "Browse customer accounts", href: "/dashboard/customers" },
  { label: "Deals", description: "Manage promotional campaigns", href: "/dashboard/deals" },
  { label: "Support", description: "View support tickets", href: "/dashboard/support" },
  { label: "Analytics", description: "View store analytics", href: "/dashboard/analytics" },
];

export function DashboardSearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const [query, setQuery] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);

  const filtered = query.trim()
    ? suggestions.filter(
        (s) =>
          s.label.toLowerCase().includes(query.toLowerCase()) ||
          s.description.toLowerCase().includes(query.toLowerCase())
      )
    : suggestions;

  // Focus input when dialog opens
  React.useEffect(() => {
    if (open) {
      const timer = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => setQuery(""), 0);
      return () => clearTimeout(timer);
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-md min-w-xl overflow-hidden p-0 gap-0"
        aria-describedby="dashboard-search-description"
      >
        <DialogHeader className="sr-only">
          <DialogTitle>Search Dashboard</DialogTitle>
        </DialogHeader>

        {/* Search Input */}
        <div className="flex items-center gap-3 border-b border-border px-4 py-3">
          <Search01Icon
            className="shrink-0 text-muted-foreground"
            size={18}
          />
          <input
            id="dashboard-search-input"
            ref={inputRef}
            type="text"
            placeholder="Search pages, products, customers..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            aria-label="Search dashboard"
          />
          <kbd className="hidden shrink-0 items-center gap-1 rounded border border-border bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground sm:flex">
            ESC
          </kbd>
        </div>

        {/* Suggestions */}
        <div
          id="dashboard-search-description"
          role="listbox"
          aria-label="Search suggestions"
          className="max-h-[360px] overflow-y-auto py-2"
        >
          {filtered.length === 0 ? (
            <p className="px-4 py-6 text-center text-sm text-muted-foreground">
              No results found for &quot;{query}&quot;
            </p>
          ) : (
            <>
              <p className="px-4 pb-1 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                {query.trim() ? "Results" : "Quick navigation"}
              </p>
              {filtered.map((item) => (
                <button
                  key={item.href}
                  role="option"
                  aria-selected={false}
                  type="button"
                  onClick={() => onOpenChange(false)}
                  className="flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors hover:bg-accent focus-visible:bg-accent focus-visible:outline-none"
                >
                  <div className="flex min-w-0 flex-1 flex-col">
                    <span className="truncate text-sm font-medium text-foreground">
                      {item.label}
                    </span>
                    <span className="truncate text-xs text-muted-foreground">
                      {item.description}
                    </span>
                  </div>
                  <ArrowRight01Icon
                    size={14}
                    className="shrink-0 text-muted-foreground"
                  />
                </button>
              ))}
            </>
          )}
        </div>

        {/* Footer hint */}
        <div className="flex items-center gap-4 border-t border-border px-4 py-2.5">
          <span className="text-[11px] text-muted-foreground">
            Search functionality coming soon
          </span>
        </div>
      </DialogContent>
    </Dialog>
  );
}
