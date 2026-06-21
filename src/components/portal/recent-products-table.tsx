"use client";

import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowUpDown } from "lucide-react";
import type { RecentProduct } from "@/lib/dashboard-analytics";

type SortField = "sellingPrice" | "stock" | "createdAt";
type SortDir = "asc" | "desc";

interface RecentProductsTableProps {
  products: RecentProduct[];
  total: number;
  page: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export function RecentProductsTable({
  products,
  total,
  page,
  pageSize,
  onPageChange,
}: RecentProductsTableProps) {
  const [sortField, setSortField] = React.useState<SortField>("createdAt");
  const [sortDir, setSortDir] = React.useState<SortDir>("desc");

  const totalPages = Math.ceil(total / pageSize);

  const sorted = React.useMemo(() => {
    return [...products].sort((a, b) => {
      const aVal =
        sortField === "createdAt"
          ? new Date(a.createdAt).getTime()
          : (a[sortField] as number);
      const bVal =
        sortField === "createdAt"
          ? new Date(b.createdAt).getTime()
          : (b[sortField] as number);
      return sortDir === "desc" ? bVal - aVal : aVal - bVal;
    });
  }, [products, sortField, sortDir]);

  function toggleSort(field: SortField) {
    if (sortField === field) {
      setSortDir((d) => (d === "desc" ? "asc" : "desc"));
    } else {
      setSortField(field);
      setSortDir("desc");
    }
  }

  function SortHeader({
    field,
    children,
  }: {
    field: SortField;
    children: React.ReactNode;
  }) {
    return (
      <Button
        variant="ghost"
        size="sm"
        className="-ml-3 h-8 font-medium text-muted-foreground hover:text-foreground"
        onClick={() => toggleSort(field)}
      >
        {children}
        <ArrowUpDown size={12} className="ml-1" />
      </Button>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Recent Products</CardTitle>
      </CardHeader>
      <CardContent className="px-0">
        {products.length === 0 ? (
          <div className="flex items-center justify-center py-16 text-muted-foreground text-sm px-6">
            <div className="text-center">
              <p className="font-medium">No products added yet</p>
              <p className="text-xs mt-1">
                Products will appear here once they are created.
              </p>
            </div>
          </div>
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="pl-6">Product</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>
                    <SortHeader field="sellingPrice">Price</SortHeader>
                  </TableHead>
                  <TableHead>
                    <SortHeader field="stock">Stock</SortHeader>
                  </TableHead>
                  <TableHead>
                    <SortHeader field="createdAt">Created</SortHeader>
                  </TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sorted.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="pl-6 font-medium">
                      {product.name}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {product.categoryName ?? (
                        <span className="italic text-xs">Uncategorized</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {new Intl.NumberFormat("en-NG", {
                        style: "currency",
                        currency: "NGN",
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      }).format(product.sellingPrice)}
                    </TableCell>
                    <TableCell>
                      <span
                        className={
                          product.stock === 0
                            ? "text-destructive font-medium"
                            : product.stock <= 5
                            ? "text-yellow-600 dark:text-yellow-400 font-medium"
                            : ""
                        }
                      >
                        {product.stock}
                      </span>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {new Date(product.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </TableCell>
                    <TableCell>
                      {product.published ? (
                        <Badge variant="default" className="text-xs">
                          Published
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="text-xs">
                          Draft
                        </Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between px-6 pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground">
                  Page {page} of {totalPages}
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onPageChange(page - 1)}
                    disabled={page === 1}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onPageChange(page + 1)}
                    disabled={page === totalPages}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}

export function RecentProductsTableSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-5 w-36" />
      </CardHeader>
      <CardContent className="px-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="pl-6">Product</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 5 }).map((_, i) => (
              <TableRow key={i}>
                <TableCell className="pl-6">
                  <Skeleton className="h-4 w-40" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-24" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-20" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-10" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-24" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-5 w-16 rounded-full" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
