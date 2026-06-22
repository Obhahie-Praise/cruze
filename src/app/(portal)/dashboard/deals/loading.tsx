import { DataTableSkeleton } from "@/components/portal/shared-skeletons";

export default function DealsLoading() {
  return (
    <div className="flex flex-1 flex-col gap-4 animate-fade-in duration-200">
      <div>
        <div className="h-7 w-24 bg-muted animate-pulse rounded" />
        <div className="h-4 w-64 bg-muted animate-pulse rounded mt-1.5" />
      </div>
      <DataTableSkeleton rows={4} cols={4} />
    </div>
  );
}
