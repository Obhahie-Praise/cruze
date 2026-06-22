import { ProductGridSkeleton } from "@/components/portal/shared-skeletons";
import { Skeleton } from "@/components/ui/skeleton";

export default function StorefrontLoading() {
  return (
    <div className="mx-auto max-w-7xl w-full px-4 py-8 flex flex-col gap-8 animate-fade-in duration-200">
      {/* Branded Banner Placeholder */}
      <div className="w-full h-[250px] sm:h-[350px] bg-muted animate-pulse rounded-2xl flex flex-col justify-end p-6 md:p-10 gap-3">
        <Skeleton className="h-8 w-[60%] sm:w-[40%] bg-background/20" />
        <Skeleton className="h-4 w-[80%] sm:w-[50%] bg-background/20" />
        <Skeleton className="h-10 w-28 bg-background/30 rounded-lg mt-2" />
      </div>

      {/* Grid Header */}
      <div className="flex justify-between items-center mt-4">
        <div className="space-y-2">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-4 w-72" />
        </div>
        <Skeleton className="h-8 w-24" />
      </div>

      {/* Product List Skeleton */}
      <ProductGridSkeleton count={8} />
    </div>
  );
}
