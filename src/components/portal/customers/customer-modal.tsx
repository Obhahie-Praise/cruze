"use client";

import { useEffect, useState } from "react";
import { formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { getCustomerDetails, type CustomerDetails } from "@/lib/customers-actions";
import { 
  ShoppingBag01Icon, 
  ShoppingCart01Icon, 
  MoneyBag01Icon, 
  GiftIcon,
  Mail01Icon,
  UserIcon,
} from "hugeicons-react";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";

interface CustomerModalProps {
  customerId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CustomerModal({ customerId, open, onOpenChange }: CustomerModalProps) {
  const [customer, setCustomer] = useState<CustomerDetails | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open && customerId) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLoading(true);
      getCustomerDetails(customerId)
        .then((data) => {
          setCustomer(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    } else {
      setCustomer(null);
    }
  }, [open, customerId]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl lg:max-w-5xl h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Customer Details</DialogTitle>
          <DialogDescription>
            Comprehensive view of customer profile, analytics, and history.
          </DialogDescription>
        </DialogHeader>

        {loading ? (
          <div className="space-y-6">
            <div className="flex gap-4">
              <Skeleton className="h-16 w-16 rounded-full" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-5 w-[200px]" />
                <Skeleton className="h-4 w-[150px]" />
              </div>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
               {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-24" />)}
            </div>
          </div>
        ) : !customer ? (
          <div className="py-8 text-center text-muted-foreground">
            {customerId ? "Failed to load customer." : "No customer selected."}
          </div>
        ) : (
          <div className="flex flex-col gap-6 pt-2">
            
            {/* Overview Section */}
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 shrink-0 rounded-full bg-muted flex items-center justify-center overflow-hidden border border-border">
                {customer.image ? (
                  <Image src={customer.image} alt={customer.name} width={64} height={64} className="h-full w-full object-cover" />
                ) : (
                  <UserIcon size={32} className="text-muted-foreground" />
                )}
              </div>
              <div className="flex flex-col">
                <h2 className="text-xl font-bold">{customer.name}</h2>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                  <Mail01Icon size={14} />
                  <span>{customer.email}</span>
                </div>
              </div>
              <div className="ml-auto flex items-center gap-2">
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
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm bg-muted/30 p-4 rounded-lg border">
              <div>
                <p className="text-muted-foreground mb-1">Customer Since</p>
                <p className="font-medium">{new Date(customer.createdAt).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">Last Active</p>
                <p className="font-medium">{customer.lastActiveAt ? new Date(customer.lastActiveAt).toLocaleDateString() : "Never"}</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">Phone</p>
                <p className="font-medium">{customer.phone || "—"}</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">Default Address</p>
                <p className="font-medium truncate">{customer.addresses.find(a => a.isDefault)?.city || "—"}</p>
              </div>
            </div>

            {/* Analytics */}
            <h3 className="text-lg font-semibold tracking-tight -mb-2">Analytics</h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <MoneyBag01Icon size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Lifetime Spend</p>
                    <p className="text-xl font-bold">{formatCurrency(customer.lifetimeSpend)}</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <ShoppingBag01Icon size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Orders</p>
                    <p className="text-xl font-bold">{customer.lifetimeOrders}</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <ShoppingCart01Icon size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Cart Value</p>
                    <p className="text-xl font-bold">{formatCurrency(customer.currentCartValue)}</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <GiftIcon size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Promotions Used</p>
                    <p className="text-xl font-bold">{customer.promotionalOrders}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Layout Split */}
            <div className="grid lg:grid-cols-3 gap-6">
              
              {/* Left Column: Purchase History */}
              <div className="lg:col-span-2 space-y-4">
                <h3 className="text-lg font-semibold tracking-tight">Recent Orders</h3>
                <div className="rounded-md border overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-muted/50 text-muted-foreground">
                      <tr>
                        <th className="font-medium p-3 text-left">Order ID</th>
                        <th className="font-medium p-3 text-left">Date</th>
                        <th className="font-medium p-3 text-left">Items</th>
                        <th className="font-medium p-3 text-left">Status</th>
                        <th className="font-medium p-3 text-right">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {customer.purchaseHistory.length === 0 ? (
                        <tr><td colSpan={5} className="p-4 text-center text-muted-foreground">No orders found.</td></tr>
                      ) : (
                        customer.purchaseHistory.map(order => (
                          <tr key={order.id} className="hover:bg-muted/30">
                            <td className="p-3 font-mono">{order.orderNumber}</td>
                            <td className="p-3 text-muted-foreground">{new Date(order.createdAt).toLocaleDateString()}</td>
                            <td className="p-3">{order.itemsCount}</td>
                            <td className="p-3">
                              <Badge variant="outline" className="text-[10px] uppercase">
                                {order.status}
                              </Badge>
                            </td>
                            <td className="p-3 text-right font-medium">{formatCurrency(order.totalAmount)}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Right Column: Active Cart & Address */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold tracking-tight mb-4">Current Cart</h3>
                  <div className="rounded-md border p-4 bg-muted/10">
                    {customer.currentCart.length === 0 ? (
                      <p className="text-sm text-muted-foreground text-center py-4">Cart is empty.</p>
                    ) : (
                      <div className="space-y-4">
                        {customer.currentCart.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-3">
                            <div className="h-10 w-10 bg-muted rounded-md border flex items-center justify-center overflow-hidden shrink-0">
                               {item.productImage ? (
                                  <Image src={item.productImage} alt={item.productName} width={40} height={40} className="object-cover" />
                               ) : (
                                  <ShoppingCart01Icon size={16} className="text-muted-foreground" />
                               )}
                            </div>
                            <div className="flex-1 overflow-hidden">
                              <p className="text-sm font-medium line-clamp-1">{item.productName}</p>
                              <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                            </div>
                            <div className="font-medium text-sm">
                              {formatCurrency(item.totalValue)}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold tracking-tight mb-4">Addresses</h3>
                  {customer.addresses.length === 0 ? (
                    <div className="rounded-md border p-4 text-center text-sm text-muted-foreground bg-muted/10">
                      No addresses saved.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {customer.addresses.map((addr) => (
                        <div key={addr.id} className="rounded-md border p-3 text-sm bg-muted/10 relative">
                          {addr.isDefault && (
                            <Badge variant="secondary" className="absolute top-2 right-2 text-[10px]">Default</Badge>
                          )}
                          <p className="font-medium">{addr.firstName} {addr.lastName}</p>
                          <p className="text-muted-foreground mt-1">{addr.streetAddress}</p>
                          <p className="text-muted-foreground">{addr.city}, {addr.state} {addr.postalCode}</p>
                          <p className="text-muted-foreground">{addr.country}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
