import { getOrders } from "@/lib/orders-actions";
import { OrderStatus } from "@/lib/db-types";
import { OrderCard } from "./order-card";
import { PackageOpenIcon } from "hugeicons-react";

interface OrdersListProps {
  statusFilter?: OrderStatus;
}

export async function OrdersList({ statusFilter }: OrdersListProps) {
  const [orders] = await Promise.all([getOrders(statusFilter)]);

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border bg-muted/20 py-20 text-center">
        <PackageOpenIcon size={40} className="text-muted-foreground/50" />
        <div>
          <p className="text-sm font-medium text-muted-foreground">No orders found</p>
          <p className="text-xs text-muted-foreground/70 mt-0.5">
            {statusFilter
              ? `No orders with status "${statusFilter.toLowerCase()}"`
              : "Orders will appear here once customers start purchasing."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  );
}
