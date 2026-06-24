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
import type { TopProduct } from "@/lib/dashboard-analytics";

type SortField = "revenue" | "orders" | "stock";
type SortDir = "asc" | "desc";

interface TopProductsTableProps {
  products: TopProduct[];
  total: number;
  page: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

interface SortHeaderProps {
  field: SortField;
  children: React.ReactNode;
  onToggle: (field: SortField) => void;
}

function SortHeader({ field, children, onToggle }: SortHeaderProps) {
  return (
    <Button
      variant="ghost"
      size="sm"
      className="-ml-3 h-8 font-medium text-muted-foreground hover:text-foreground"
      onClick={() => onToggle(field)}
    >
      {children}
      <ArrowUpDown size={12} className="ml-1" />
    </Button>
  );
}

export function TopProductsTable({
  products,
  total,
  page,
  pageSize,
  onPageChange,
}: TopProductsTableProps) {
  const [sortField, setSortField] = React.useState<SortField>("revenue");
  const [sortDir, setSortDir] = React.useState<SortDir>("desc");

  const totalPages = Math.ceil(total / pageSize);

  const sorted = React.useMemo(() => {
    return [...products].sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];
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

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Top Products</CardTitle>
      </CardHeader>
      <CardContent className="px-0">
        {products.length === 0 ? (
          <div className="flex items-center justify-center py-16 text-muted-foreground text-sm px-6">
            <div className="text-center">
              <p className="font-medium">No product sales data yet</p>
              <p className="text-xs mt-1">
                Top products will appear once orders are processed.
              </p>
            </div>
          </div>
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="pl-6">Product</TableHead>
                  <TableHead>
                    <SortHeader field="revenue" onToggle={toggleSort}>Revenue</SortHeader>
                  </TableHead>
                  <TableHead>
                    <SortHeader field="orders" onToggle={toggleSort}>Orders</SortHeader>
                  </TableHead>
                  <TableHead>
                    <SortHeader field="stock" onToggle={toggleSort}>Stock</SortHeader>
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
                    <TableCell>
                      {new Intl.NumberFormat("en-NG", {
                        style: "currency",
                        currency: "NGN",
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      }).format(product.revenue)}
                    </TableCell>
                    <TableCell>{product.orders.toLocaleString()}</TableCell>
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

export function TopProductsTableSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-5 w-32" />
      </CardHeader>
      <CardContent className="px-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="pl-6">Product</TableHead>
              <TableHead>Revenue</TableHead>
              <TableHead>Orders</TableHead>
              <TableHead>Stock</TableHead>
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
                  <Skeleton className="h-4 w-12" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-10" />
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
