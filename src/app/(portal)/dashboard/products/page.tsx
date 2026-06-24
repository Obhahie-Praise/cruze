import * as React from "react";
import { Suspense } from "react";
import type { Metadata } from "next";
import { ProductsMetrics } from "@/components/portal/products/products-metrics";
import { ProductCategoryTabs } from "@/components/portal/products/product-category-tabs";
import { ProductsTableClient } from "@/components/portal/products/products-table-client";
import { OrderMetricsSkeleton, DataTableSkeleton } from "@/components/portal/shared-skeletons";
import { getCategories, getProducts } from "@/lib/products-actions";

export const metadata: Metadata = {
  title: "Products Management — Dashboard",
  description: "Primary inventory and catalog management center.",
};

interface ProductsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ProductsManagementPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams;
  
  const categoryId = params.category as string | undefined;
  const search = params.search as string | undefined;
  const filter = params.filter as import("@/lib/products-actions").ProductFilter | undefined;
  const page = parseInt(params.page as string) || 1;

  // Parallel fetch for categories and products
  const [categories, productsData] = await Promise.all([
    getCategories(),
    getProducts({
      page,
      search,
      categoryId,
      filter,
      pageSize: 10, // Can be adjusted
    }),
  ]);

  const allCount = categories.reduce((acc, c) => acc + c._count.products, 0);

  const mappedCategories = categories.map((c) => ({
    id: c.id,
    name: c.name,
    count: c._count.products,
  }));

  return (
    <div className="mx-auto max-w-7xl w-full flex flex-col gap-6">
      {/* Page Header */}
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Products Management</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Manage your product catalog, inventory, and categories.
        </p>
      </div>

      {/* Metric Cards */}
      <Suspense fallback={<OrderMetricsSkeleton />}>
        <ProductsMetrics />
      </Suspense>

      {/* Tabs and Data Table */}
      <div className="flex flex-col gap-4 mt-4">
        {/* Category Tabs */}
        <ProductCategoryTabs 
          categories={mappedCategories} 
          allCount={allCount} 
          currentCategoryId={categoryId} 
        />

        {/* Data Table */}
        <Suspense key={`${categoryId}-${search}-${filter}-${page}`} fallback={<DataTableSkeleton />}>
          <ProductsTableClient 
            data={productsData} 
            categories={categories.map(c => ({ id: c.id, name: c.name }))}
          />
        </Suspense>
      </div>
    </div>
  );
}
