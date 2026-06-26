"use client";

import * as React from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useDebounce } from "use-debounce";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Search01Icon, 
  FilterIcon, 
  MoreVerticalIcon, 
  Delete01Icon, 
  Archive01Icon,
  FolderOpenIcon
} from "hugeicons-react";
import { formatCurrency } from "@/lib/utils";
import type { ProductsResult } from "@/lib/products-actions";
import { deleteProducts, archiveProducts, moveProductsToCategory } from "@/lib/products-actions";
import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import { toast } from "sonner";
import { AddProductDialog } from "./add-product-dialog";

interface ProductsTableClientProps {
  data: ProductsResult;
  categories: { id: string; name: string }[];
  promotions: { id: string; name: string; discountPercent: number }[];
}

export function ProductsTableClient({ data, categories, promotions }: ProductsTableClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Selection state
  const [selectedIds, setSelectedIds] = React.useState<Set<string>>(new Set());
  
  // Search state
  const defaultSearch = searchParams.get("search") ?? "";
  const [searchValue, setSearchValue] = React.useState(defaultSearch);
  const [debouncedSearch] = useDebounce(searchValue, 400);

  // Add Product modal state
  const [isAddProductOpen, setIsAddProductOpen] = React.useState(false);

  // Sync search to URL
  React.useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (debouncedSearch) {
      params.set("search", debouncedSearch);
      params.set("page", "1"); // reset page on search
    } else {
      params.delete("search");
    }
    
    // Prevent infinite loops by only pushing if changed
    if (params.get("search") !== searchParams.get("search")) {
      router.push(`${pathname}?${params.toString()}`);
    }
  }, [debouncedSearch, pathname, router, searchParams]);

  // Bulk Actions
  const [isPending, startTransition] = React.useTransition();

  const handleBulkDelete = () => {
    if (selectedIds.size === 0) return;
    if (!window.confirm("Are you sure you want to delete the selected products?")) return;
    
    startTransition(async () => {
      const res = await deleteProducts(Array.from(selectedIds));
      if (res.success) {
        toast.success("Products deleted successfully");
        setSelectedIds(new Set());
      } else {
        toast.error(res.error || "Failed to delete products");
      }
    });
  };

  const handleBulkArchive = () => {
    if (selectedIds.size === 0) return;
    
    startTransition(async () => {
      const res = await archiveProducts(Array.from(selectedIds));
      if (res.success) {
        toast.success("Products archived successfully");
        setSelectedIds(new Set());
      } else {
        toast.error(res.error || "Failed to archive products");
      }
    });
  };

  const handleBulkMoveCategory = (categoryId: string) => {
    if (selectedIds.size === 0) return;
    
    startTransition(async () => {
      const res = await moveProductsToCategory(Array.from(selectedIds), categoryId);
      if (res.success) {
        toast.success("Products moved successfully");
        setSelectedIds(new Set());
      } else {
        toast.error(res.error || "Failed to move products");
      }
    });
  };

  // Selection handlers
  const toggleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(new Set(data.products.map(p => p.id)));
    } else {
      setSelectedIds(new Set());
    }
  };

  const toggleSelect = (id: string, checked: boolean) => {
    const newSelected = new Set(selectedIds);
    if (checked) {
      newSelected.add(id);
    } else {
      newSelected.delete(id);
    }
    setSelectedIds(newSelected);
  };

  const isAllSelected = data.products.length > 0 && selectedIds.size === data.products.length;
  const isSomeSelected = selectedIds.size > 0 && selectedIds.size < data.products.length;

  // Filter handlers
  const handleFilterChange = (filterValue: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (filterValue === "all") {
      params.delete("filter");
    } else {
      params.set("filter", filterValue);
    }
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
  };

  const currentFilter = searchParams.get("filter") ?? "all";

  // Pagination handlers
  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative flex items-center">
            <Search01Icon size={16} className="absolute left-3 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search products..."
              className="pl-9 pr-4 w-[250px] lg:w-[300px]"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
          </div>
          
          {selectedIds.size > 0 && (
            <div className="flex items-center gap-2 ml-4 px-3 py-1.5 bg-muted/50 rounded-md border text-sm">
              <span className="font-medium mr-2">{selectedIds.size} selected</span>
              <Button variant="outline" size="sm" className="h-7 text-xs" onClick={handleBulkArchive} disabled={isPending}>
                <Archive01Icon size={14} className="mr-1.5" /> Archive
              </Button>
              <Button variant="destructive" size="sm" className="h-7 text-xs" onClick={handleBulkDelete} disabled={isPending}>
                <Delete01Icon size={14} className="mr-1.5" /> Delete
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger className={buttonVariants({ variant: "outline", size: "sm", className: "h-7 text-xs" })} disabled={isPending}>
                  <FolderOpenIcon size={14} className="mr-1.5" /> Move
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Select Category</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {categories.map((c) => (
                    <DropdownMenuItem key={c.id} onClick={() => handleBulkMoveCategory(c.id)}>
                      {c.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button onClick={() => setIsAddProductOpen(true)} className="h-9">
            Add Product
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger className={buttonVariants({ variant: "outline", size: "sm", className: "h-9" })}>
              <FilterIcon size={16} className="mr-2" />
              Filter
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
            <DropdownMenuLabel>Filter Products</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup value={currentFilter} onValueChange={handleFilterChange}>
              <DropdownMenuRadioItem value="all">All Products</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="active">Active</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="featured">Featured</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="archived">Archived</DropdownMenuRadioItem>
              <DropdownMenuSeparator />
              <DropdownMenuRadioItem value="in-stock">In Stock</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="low-stock">Low Stock</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="out-of-stock">Out of Stock</DropdownMenuRadioItem>
              <DropdownMenuSeparator />
              <DropdownMenuRadioItem value="in-cart">In Cart</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="ordered">Ordered</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12 pl-4">
                    <Checkbox
                      checked={isAllSelected || (isSomeSelected ? true : false)}
                      onCheckedChange={toggleSelectAll}
                      aria-label="Select all"
                    />
                  </TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>In Cart</TableHead>
                  <TableHead>Orders</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.products.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={10} className="h-32 text-center text-muted-foreground">
                      No products found.
                    </TableCell>
                  </TableRow>
                ) : (
                  data.products.map((product) => (
                    <TableRow key={product.id} data-state={selectedIds.has(product.id) ? "selected" : undefined}>
                      <TableCell className="pl-4">
                        <Checkbox
                          checked={selectedIds.has(product.id)}
                          onCheckedChange={(checked) => toggleSelect(product.id, !!checked)}
                          aria-label={`Select ${product.name}`}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 shrink-0 rounded-md bg-muted flex items-center justify-center overflow-hidden border">
                            {product.images?.[0] ? (
                              <Image src={product.images[0].url} alt={product.name} width={40} height={40} className="h-full w-full object-cover" />
                            ) : (
                              <span className="text-xs text-muted-foreground">No img</span>
                            )}
                          </div>
                          <div className="flex flex-col">
                            <span className="font-medium text-sm line-clamp-1">{product.name}</span>
                            {product.featured && <span className="text-[10px] text-primary font-medium">Featured</span>}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {product.category?.name || "Uncategorized"}
                      </TableCell>
                      <TableCell className="text-sm font-mono text-muted-foreground">
                        {product.sku || "—"}
                      </TableCell>
                      <TableCell className="text-sm font-medium">
                        {formatCurrency(product.sellingPrice)}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className={
                            product.stock === 0
                              ? "bg-destructive/10 text-destructive border-destructive/20"
                              : product.stock <= 5
                              ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                              : "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                          }
                        >
                          {product.stock}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm">{product._count.cartItems}</TableCell>
                      <TableCell className="text-sm">{product._count.orderItems}</TableCell>
                      <TableCell>
                        {product.archived ? (
                          <Badge variant="outline">Archived</Badge>
                        ) : product.published ? (
                          <Badge variant="default">Active</Badge>
                        ) : (
                          <Badge variant="secondary">Draft</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger className={buttonVariants({ variant: "ghost", size: "icon", className: "h-8 w-8" })}>
                            <MoreVerticalIcon size={16} />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Edit Product</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">Delete Product</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Footer / Pagination */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <div>
          {selectedIds.size > 0 ? (
            <span>{selectedIds.size} of {data.total} row(s) selected.</span>
          ) : (
            <span>{data.total} Products total</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span>Page {data.page} of {data.totalPages}</span>
          <Button 
            variant="outline" 
            size="sm" 
            disabled={data.page <= 1}
            onClick={() => handlePageChange(data.page - 1)}
          >
            Previous
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            disabled={data.page >= data.totalPages}
            onClick={() => handlePageChange(data.page + 1)}
          >
            Next
          </Button>
        </div>
      </div>

      <AddProductDialog 
        open={isAddProductOpen} 
        onOpenChange={setIsAddProductOpen} 
        categories={categories}
        promotions={promotions}
        onSuccess={() => {
          router.refresh();
        }}
      />
    </div>
  );
}
