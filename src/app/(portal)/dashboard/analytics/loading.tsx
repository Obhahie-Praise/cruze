import {
  MetricCardsSkeleton,
  AnalyticsChartSkeleton,
} from "@/components/portal/shared-skeletons";

export default function AnalyticsLoading() {
  return (
    <div className="flex flex-1 flex-col gap-6 animate-fade-in duration-200">
      <div>
        <div className="h-7 w-28 bg-muted animate-pulse rounded" />
        <div className="h-4 w-72 bg-muted animate-pulse rounded mt-1.5" />
      </div>

      {/* Filter Row Skeleton */}
      <div className="flex items-center gap-2">
        <div className="h-9 w-28 bg-muted animate-pulse rounded-md" />
        <div className="h-9 w-28 bg-muted animate-pulse rounded-md" />
        <div className="h-9 w-28 bg-muted animate-pulse rounded-md" />
      </div>

      {/* Metric Cards */}
      <MetricCardsSkeleton count={4} />

      {/* Charts */}
      <AnalyticsChartSkeleton />
      <AnalyticsChartSkeleton />
    </div>
  );
}
