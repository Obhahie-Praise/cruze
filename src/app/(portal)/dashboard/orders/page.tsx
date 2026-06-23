import * as React from "react";
import { Suspense } from "react";
import type { Metadata } from "next";
import { OrdersMetrics } from "@/components/portal/orders/orders-metrics";
import { OrderMetricsSkeleton, OrderListSkeleton } from "@/components/portal/shared-skeletons";
import { OrdersList } from "@/components/portal/orders/orders-list";
import { OrderTabs } from "@/components/portal/orders/order-tabs";
import { OrderStatus } from "@/lib/db-types";

export const metadata: Metadata = {
  title: "Orders Management — Dashboard",
  description: "Operational center for managing store orders and fulfillment.",
};

interface OrdersPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function OrdersManagementPage({ searchParams }: OrdersPageProps) {
  const params = await searchParams;
  const statusParam = params.status as string | undefined;

  let filter: OrderStatus | undefined = undefined;
  if (statusParam && Object.values(OrderStatus).includes(statusParam as OrderStatus)) {
    filter = statusParam as OrderStatus;
  }

  return (
    <div className="mx-auto max-w-7xl w-full flex flex-col gap-6">
      {/* Page Header */}
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Orders Management</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Operational center for managing orders, refunds, and fulfillment.
        </p>
      </div>

      {/* Metric Cards */}
      <Suspense fallback={<OrderMetricsSkeleton />}>
        <OrdersMetrics />
      </Suspense>

      {/* Orders Section */}
      <div className="flex flex-col gap-4 mt-4">
        {/* Order Tabs */}
        <OrderTabs currentStatus={filter} />

        {/* Orders List */}
        <Suspense key={filter ?? "all"} fallback={<OrderListSkeleton />}>
          <OrdersList statusFilter={filter} />
        </Suspense>
      </div>
    </div>
  );
}
