import { DataTableSkeleton } from "@/components/portal/shared-skeletons";

export default function DashboardGenericLoading() {
  return (
    <div className="mx-auto max-w-7xl w-full flex flex-col gap-6 animate-fade-in duration-200">
      {/* Page Header Skeleton */}
      <div className="space-y-2">
        <div className="h-6 w-40 bg-muted animate-pulse rounded" />
        <div className="h-4 w-72 bg-muted animate-pulse rounded" />
      </div>

      {/* Table Skeleton */}
      <DataTableSkeleton rows={6} cols={4} />
    </div>
  );
}
