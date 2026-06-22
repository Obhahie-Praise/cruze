import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function AccountLoading() {
  return (
    <div className="mx-auto max-w-4xl w-full px-4 py-8 space-y-6 animate-fade-in duration-200">
      {/* Header Skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-72" />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Navigation Sidebar Skeleton */}
        <div className="space-y-2 md:col-span-1">
          <Skeleton className="h-10 w-full rounded-lg" />
          <Skeleton className="h-10 w-full rounded-lg" />
          <Skeleton className="h-10 w-full rounded-lg" />
        </div>

        {/* Content Area Card Skeleton */}
        <div className="md:col-span-2">
          <Card>
            <CardHeader className="space-y-2">
              <Skeleton className="h-6 w-36" />
              <Skeleton className="h-4 w-60" />
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-10 w-full rounded-md" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-10 w-full rounded-md" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-10 w-full rounded-md" />
              </div>
              <Skeleton className="h-10 w-28 rounded-md mt-6" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
