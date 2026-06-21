import * as React from "react";
import { Suspense } from "react";
import {
  getMetricCards,
  getRevenueChartData,
  getTopProducts,
  getRecentProducts,
} from "@/lib/dashboard-analytics";
import { OverviewMetricCards, OverviewMetricCardsSkeleton } from "@/components/portal/overview-metric-cards";
import { RevenueStatisticsCardSkeleton } from "@/components/portal/revenue-statistics-card";
import { TopProductsTableSkeleton } from "@/components/portal/top-products-table";
import { RecentProductsTableSkeleton } from "@/components/portal/recent-products-table";
import { OverviewClientShell } from "@/components/portal/overview-client-shell";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Overview — Dashboard",
  description: "Dashboard overview with real-time business metrics, revenue statistics, and product insights.",
};

// ─── Metric Cards Server Component ───────────────────────────────────────────
async function MetricCardsSection() {
  try {
    const metrics = await getMetricCards();
    return <OverviewMetricCards {...metrics} />;
  } catch {
    return (
      <div className="rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
        Unable to load metrics. Please refresh the page.
      </div>
    );
  }
}

// ─── Charts + Tables Server Component ────────────────────────────────────────
async function OverviewContentSection() {
  try {
    const [revenueData, topProducts, recentProducts] = await Promise.all([
      getRevenueChartData("monthly"),
      getTopProducts(1, 10),
      getRecentProducts(1, 10),
    ]);

    return (
      <OverviewClientShell
        initialRevenueData={revenueData}
        initialTopProducts={topProducts}
        initialRecentProducts={recentProducts}
      />
    );
  } catch {
    return (
      <div className="rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
        Unable to load analytics data. Please refresh the page.
      </div>
    );
  }
}

// ─── Overview Page ────────────────────────────────────────────────────────────
export default function DashboardOverviewPage() {
  return (
    <div className="mx-auto max-w-7xl w-full flex flex-col gap-6">
      {/* Page Header */}
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Overview</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Real-time business metrics and analytics.
        </p>
      </div>

      {/* Metric Cards */}
      <Suspense fallback={<OverviewMetricCardsSkeleton />}>
        <MetricCardsSection />
      </Suspense>

      {/* Revenue Chart + Tables */}
      <Suspense
        fallback={
          <div className="flex flex-col gap-6">
            <RevenueStatisticsCardSkeleton />
            <TopProductsTableSkeleton />
            <RecentProductsTableSkeleton />
          </div>
        }
      >
        <OverviewContentSection />
      </Suspense>
    </div>
  );
}
