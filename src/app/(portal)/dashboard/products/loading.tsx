import { DataTableSkeleton } from "@/components/portal/shared-skeletons";

export default function ProductsLoading() {
  return (
    <div className="flex flex-1 flex-col gap-4 animate-fade-in duration-200">
      <div>
        <div className="h-7 w-28 bg-muted animate-pulse rounded" />
        <div className="h-4 w-80 bg-muted animate-pulse rounded mt-1.5" />
      </div>
      <DataTableSkeleton rows={6} cols={5} />
    </div>
  );
}
