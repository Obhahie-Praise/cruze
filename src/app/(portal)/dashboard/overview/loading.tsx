import {
  MetricCardsSkeleton,
  AnalyticsChartSkeleton,
  DataTableSkeleton,
} from "@/components/portal/shared-skeletons";

export default function DashboardOverviewLoading() {
  return (
    <div className="mx-auto max-w-7xl w-full flex flex-col gap-6 animate-fade-in duration-200">
      {/* Page Header Skeleton */}
      <div className="space-y-2">
        <div className="h-6 w-32 bg-muted animate-pulse rounded" />
        <div className="h-4 w-64 bg-muted animate-pulse rounded" />
      </div>

      {/* Metric Cards Skeleton */}
      <MetricCardsSkeleton />

      {/* Analytics Chart & Tables Skeletons */}
      <div className="flex flex-col gap-6">
        <AnalyticsChartSkeleton />
        <DataTableSkeleton rows={5} cols={5} />
      </div>
    </div>
  );
}
