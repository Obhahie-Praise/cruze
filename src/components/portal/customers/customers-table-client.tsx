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
import {
  DropdownMenu,
  DropdownMenuContent,
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
  UserIcon
} from "hugeicons-react";
import { formatCurrency } from "@/lib/utils";
import type { CustomersResponse } from "@/lib/customers-actions";
import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { CustomerModal } from "./customer-modal";

interface CustomersTableClientProps {
  data: CustomersResponse;
}

export function CustomersTableClient({ data }: CustomersTableClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  // Search state
  const defaultSearch = searchParams.get("search") ?? "";
  const [searchValue, setSearchValue] = React.useState(defaultSearch);
  const [debouncedSearch] = useDebounce(searchValue, 400);

  // Modal state
  const [selectedCustomerId, setSelectedCustomerId] = React.useState<string | null>(null);

  // Sync search to URL
  React.useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (debouncedSearch) {
      params.set("search", debouncedSearch);
      params.set("page", "1"); // reset page on search
    } else {
      params.delete("search");
    }
    
    if (params.get("search") !== searchParams.get("search")) {
      router.push(`${pathname}?${params.toString()}`);
    }
  }, [debouncedSearch, pathname, router, searchParams]);

  // Filter handlers
  const handleFilterChange = (filterValue: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (filterValue === "ALL") {
      params.delete("filter");
    } else {
      params.set("filter", filterValue);
    }
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
  };

  const currentFilter = searchParams.get("filter") ?? "ALL";

  // Pagination handlers
  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  const currentPage = parseInt(searchParams.get("page") || "1");

  return (
    <div className="flex flex-col gap-4">
      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <div className="relative flex items-center">
          <Search01Icon size={16} className="absolute left-3 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search customers..."
            className="pl-9 pr-4 w-[250px] lg:w-[300px]"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger className={buttonVariants({ variant: "outline", size: "sm", className: "h-9" })}>
              <FilterIcon size={16} className="mr-2" />
              Filter
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuLabel>Filter Customers</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup value={currentFilter} onValueChange={handleFilterChange}>
                <DropdownMenuRadioItem value="ALL">All Customers</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="THIS_MONTH">New This Month</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="PAYING">Paying</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="IN_CART">Cart Active</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="MULTIPLE_PURCHASES">Returning (2+ Orders)</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="PROMOTIONAL">Used Promotions</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="HIGH_VALUE">High Value (≥$1k)</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="INACTIVE">Inactive (90d+)</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="pl-4">Customer</TableHead>
                  <TableHead>Total Orders</TableHead>
                  <TableHead>Total Spend</TableHead>
                  <TableHead>Last Purchase</TableHead>
                  <TableHead>Cart Value</TableHead>
                  <TableHead>Account Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.customers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-32 text-center text-muted-foreground">
                      No customers found.
                    </TableCell>
                  </TableRow>
                ) : (
                  data.customers.map((customer) => (
                    <TableRow 
                      key={customer.id} 
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => setSelectedCustomerId(customer.id)}
                    >
                      <TableCell className="pl-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 shrink-0 rounded-full bg-muted flex items-center justify-center overflow-hidden border">
                            {customer.image ? (
                              <Image src={customer.image} alt={customer.name} width={40} height={40} className="h-full w-full object-cover" />
                            ) : (
                              <UserIcon size={18} className="text-muted-foreground" />
                            )}
                          </div>
                          <div className="flex flex-col">
                            <span className="font-medium text-sm line-clamp-1">{customer.name}</span>
                            <span className="text-xs text-muted-foreground">{customer.email}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">
                        {customer.totalOrders}
                      </TableCell>
                      <TableCell className="text-sm font-medium">
                        {formatCurrency(customer.totalSpend)}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {customer.lastPurchase ? (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger className="cursor-help border-b border-dashed border-muted-foreground/50">
                                {new Date(customer.lastPurchase).toLocaleDateString()}
                              </TooltipTrigger>
                              <TooltipContent>
                                {new Date(customer.lastPurchase).toLocaleString()}
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        ) : (
                          "—"
                        )}
                      </TableCell>
                      <TableCell className="text-sm">
                        {customer.cartValue > 0 ? formatCurrency(customer.cartValue) : "—"}
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant="secondary"
                          className={
                            customer.accountStatus === "Active" || customer.accountStatus === "Returning" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" :
                            customer.accountStatus === "New" ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" :
                            "bg-muted text-muted-foreground"
                          }
                        >
                          {customer.accountStatus}
                        </Badge>
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
          <span>{data.total} Customers total</span>
        </div>
        <div className="flex items-center gap-2">
          <span>Page {currentPage} of {data.pageCount || 1}</span>
          <Button 
            variant="outline" 
            size="sm" 
            disabled={currentPage <= 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Previous
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            disabled={currentPage >= (data.pageCount || 1)}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </Button>
        </div>
      </div>

      <CustomerModal 
        customerId={selectedCustomerId} 
        open={!!selectedCustomerId} 
        onOpenChange={(open) => {
          if (!open) setSelectedCustomerId(null);
        }} 
      />
    </div>
  );
}
