"use client";

import * as React from "react";
import { RevenueStatisticsCard } from "@/components/portal/revenue-statistics-card";
import { TopProductsTable } from "@/components/portal/top-products-table";
import { RecentProductsTable } from "@/components/portal/recent-products-table";
import type {
  RevenueDataPoint,
  RevenueFilter,
  TopProduct,
  RecentProduct,
} from "@/lib/dashboard-analytics";

interface OverviewClientShellProps {
  initialRevenueData: RevenueDataPoint[];
  initialTopProducts: { products: TopProduct[]; total: number };
  initialRecentProducts: { products: RecentProduct[]; total: number };
}

const PAGE_SIZE = 10;

export function OverviewClientShell({
  initialRevenueData,
  initialTopProducts,
  initialRecentProducts,
}: OverviewClientShellProps) {
  const [revenueFilter, setRevenueFilter] =
    React.useState<RevenueFilter>("monthly");
  const [revenueData, setRevenueData] =
    React.useState<RevenueDataPoint[]>(initialRevenueData);
  const [revenueLoading, setRevenueLoading] = React.useState(false);

  const [topPage, setTopPage] = React.useState(1);
  const [topData, setTopData] = React.useState(initialTopProducts);
  const [topLoading, setTopLoading] = React.useState(false);

  const [recentPage, setRecentPage] = React.useState(1);
  const [recentData, setRecentData] = React.useState(initialRecentProducts);
  const [recentLoading, setRecentLoading] = React.useState(false);

  // Revenue Filter Change
  async function handleFilterChange(filter: RevenueFilter) {
    setRevenueFilter(filter);
    setRevenueLoading(true);
    try {
      const res = await fetch(`/api/dashboard/revenue?filter=${filter}`);
      if (res.ok) {
        const data = await res.json();
        setRevenueData(data);
      }
    } catch {
      // Silently preserve existing data on network error
    } finally {
      setRevenueLoading(false);
    }
  }

  // Top Products Page Change
  async function handleTopPageChange(page: number) {
    setTopPage(page);
    setTopLoading(true);
    try {
      const res = await fetch(
        `/api/dashboard/top-products?page=${page}&pageSize=${PAGE_SIZE}`
      );
      if (res.ok) {
        const data = await res.json();
        setTopData(data);
      }
    } catch {
      // Silently preserve existing data
    } finally {
      setTopLoading(false);
    }
  }

  // Recent Products Page Change
  async function handleRecentPageChange(page: number) {
    setRecentPage(page);
    setRecentLoading(true);
    try {
      const res = await fetch(
        `/api/dashboard/recent-products?page=${page}&pageSize=${PAGE_SIZE}`
      );
      if (res.ok) {
        const data = await res.json();
        setRecentData(data);
      }
    } catch {
      // Silently preserve existing data
    } finally {
      setRecentLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Revenue Statistics Chart */}
      <div className={revenueLoading ? "opacity-60 transition-opacity" : "transition-opacity"}>
        <RevenueStatisticsCard
          data={revenueData}
          filter={revenueFilter}
          onFilterChange={handleFilterChange}
        />
      </div>

      {/* Top Products */}
      <div className={topLoading ? "opacity-60 transition-opacity" : "transition-opacity"}>
        <TopProductsTable
          products={topData.products}
          total={topData.total}
          page={topPage}
          pageSize={PAGE_SIZE}
          onPageChange={handleTopPageChange}
        />
      </div>

      {/* Recent Products */}
      <div className={recentLoading ? "opacity-60 transition-opacity" : "transition-opacity"}>
        <RecentProductsTable
          products={recentData.products}
          total={recentData.total}
          page={recentPage}
          pageSize={PAGE_SIZE}
          onPageChange={handleRecentPageChange}
        />
      </div>
    </div>
  );
}
