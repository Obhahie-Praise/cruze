import * as React from "react";
import { Suspense } from "react";
import type { Metadata } from "next";
import { CustomersMetrics } from "@/components/portal/customers/customers-metrics";
import { CustomerTabs } from "@/components/portal/customers/customer-tabs";
import { CustomersTableClient } from "@/components/portal/customers/customers-table-client";
import { OrderMetricsSkeleton, DataTableSkeleton } from "@/components/portal/shared-skeletons";
import { getCustomers, getCustomerCounts, type CustomerFilter } from "@/lib/customers-actions";

export const metadata: Metadata = {
  title: "Customers Management — Dashboard",
  description: "Central location for customer management and analytics.",
};

interface CustomersPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function CustomersManagementPage({ searchParams }: CustomersPageProps) {
  const params = await searchParams;
  
  const search = params.search as string | undefined;
  const filter = (params.filter as CustomerFilter) || "ALL";
  const page = parseInt(params.page as string) || 1;

  // Parallel fetch for counts and table data
  const [counts, customersData] = await Promise.all([
    getCustomerCounts(),
    getCustomers({
      page,
      search,
      filter,
      pageSize: 10,
    }),
  ]);

  return (
    <div className="mx-auto max-w-7xl w-full flex flex-col gap-6">
      {/* Page Header */}
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Customers Management</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          View customer analytics, purchase history, and manage relationships.
        </p>
      </div>

      {/* Metric Cards */}
      <Suspense fallback={<OrderMetricsSkeleton />}>
        <CustomersMetrics />
      </Suspense>

      {/* Tabs and Data Table */}
      <div className="flex flex-col gap-4 mt-4">
        {/* Customer Tabs */}
        <CustomerTabs 
          counts={counts}
          currentFilter={filter}
        />

        {/* Data Table */}
        <Suspense key={`${search}-${filter}-${page}`} fallback={<DataTableSkeleton rows={10} cols={6} />}>
          <CustomersTableClient 
            data={customersData} 
          />
        </Suspense>
      </div>
    </div>
  );
}
