import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

// Metric Cards Skeleton
export function MetricCardsSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <Card key={i}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-4 w-4 rounded" />
          </CardHeader>
          <CardContent className="space-y-2">
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-3.5 w-36" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// Analytics Chart Skeleton
export function AnalyticsChartSkeleton() {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="space-y-1.5">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-4 w-64" />
        </div>
        <Skeleton className="h-8 w-32" />
      </CardHeader>
      <CardContent className="pt-4">
        <div className="flex items-end gap-2 h-[300px] w-full px-2 pt-6">
          {Array.from({ length: 12 }).map((_, i) => {
            const heights = ["h-[40%]", "h-[60%]", "h-[45%]", "h-[70%]", "h-[85%]", "h-[50%]", "h-[65%]", "h-[40%]", "h-[75%]", "h-[90%]", "h-[55%]", "h-[80%]"];
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                <Skeleton className={`w-full ${heights[i % heights.length]} rounded-t`} />
                <Skeleton className="h-3 w-8" />
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

// Data Table Skeleton
export function DataTableSkeleton({ rows = 5, cols = 4 }: { rows?: number; cols?: number }) {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="space-y-1.5">
          <Skeleton className="h-5 w-48" />
          <Skeleton className="h-3.5 w-72" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-8 w-24" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="w-full border rounded-lg overflow-hidden">
          {/* Table Header */}
          <div className="flex border-b bg-muted/40 px-4 py-3">
            {Array.from({ length: cols }).map((_, i) => (
              <div key={i} className="flex-1">
                <Skeleton className="h-4 w-[60%]" />
              </div>
            ))}
          </div>
          {/* Table Rows */}
          <div className="divide-y">
            {Array.from({ length: rows }).map((_, r) => (
              <div key={r} className="flex px-4 py-3.5 items-center">
                {Array.from({ length: cols }).map((_, c) => (
                  <div key={c} className="flex-1">
                    <Skeleton className={`h-4 ${c === 0 ? "w-[75%]" : c === cols - 1 ? "w-[40%]" : "w-[50%]"}`} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        {/* Pagination Skeleton */}
        <div className="flex items-center justify-between pt-4">
          <Skeleton className="h-4 w-36" />
          <div className="flex gap-1">
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-8 w-16" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Product Grid Skeleton
export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex flex-col gap-3 rounded-xl overflow-hidden border p-3 bg-card shadow-sm">
          {/* Image Skeleton */}
          <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-muted">
            <Skeleton className="h-full w-full" />
          </div>
          {/* Info Skeletons */}
          <div className="space-y-2 mt-1">
            <Skeleton className="h-4 w-[40%] rounded" />
            <Skeleton className="h-5 w-[85%] rounded" />
            <div className="flex items-center justify-between pt-1">
              <Skeleton className="h-5 w-[30%] rounded" />
              <Skeleton className="h-8 w-[25%] rounded-md" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Support Ticket Skeleton
export function SupportTicketSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <Card key={i}>
          <CardContent className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-2.5 flex-1">
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-5 w-24 rounded-full" />
              </div>
              <Skeleton className="h-5 w-[60%]" />
              <div className="flex gap-4">
                <Skeleton className="h-3.5 w-32" />
                <Skeleton className="h-3.5 w-24" />
              </div>
            </div>
            <div className="flex items-center gap-2 self-start md:self-center">
              <Skeleton className="h-9 w-24" />
              <Skeleton className="h-9 w-9 rounded-md" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
