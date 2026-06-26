import { OrderMetricsSkeleton, DataTableSkeleton } from "@/components/portal/shared-skeletons";

export default function CustomersLoading() {
  return (
    <div className="mx-auto max-w-7xl w-full flex flex-col gap-6 animate-fade-in duration-200">
      <div>
        <div className="h-7 w-48 bg-muted animate-pulse rounded-md"></div>
        <div className="h-4 w-72 bg-muted/60 animate-pulse rounded-md mt-2"></div>
      </div>
      
      <OrderMetricsSkeleton />

      <div className="flex flex-col gap-4 mt-4">
        <div className="flex gap-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-9 w-24 bg-muted animate-pulse rounded-lg"></div>
          ))}
        </div>
        <DataTableSkeleton rows={6} cols={6} />
      </div>
    </div>
  );
}
