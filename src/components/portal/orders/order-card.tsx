"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn, formatCurrency } from "@/lib/utils";
import Image from "next/image";
import { OrderDetailModal } from "./order-detail-modal";
import { OrderStatus, type Prisma } from "@/lib/db-types";

export type OrderWithDetails = Prisma.OrderGetPayload<{
  include: {
    user: { select: { name: true; email: true } };
    items: true;
    transactions: true;
  };
}>;

// ---- Status Badge --------------------------------------------------------
const STATUS_MAP: Record<OrderStatus, { label: string; className: string }> = {
  NEW: {
    label: "New",
    className: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  },
  PENDING: {
    label: "Pending",
    className: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  },
  READY: {
    label: "Ready",
    className: "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400",
  },
  DELIVERED: {
    label: "Delivered",
    className: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  },
  CANCELLED: {
    label: "Cancelled",
    className: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  },
  REFUNDED: {
    label: "Refunded",
    className: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  },
};

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  const config = STATUS_MAP[status] ?? {
    label: status,
    className: "bg-muted text-muted-foreground",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
        config.className
      )}
    >
      {config.label}
    </span>
  );
}

// ---- Order Card ----------------------------------------------------------
interface OrderCardProps {
  order: OrderWithDetails;
}

export function OrderCard({ order }: OrderCardProps) {
  const [open, setOpen] = useState(false);

  const firstItem = order.items[0];
  const imageUrl = firstItem?.imageUrl ?? null;
  const itemName = firstItem?.name ?? "Unknown Product";
  const totalQuantity = order.items.reduce((sum: number, i: { quantity: number }) => sum + i.quantity, 0);

  // Parse variant attributes from snapshot
  const attributes = firstItem?.attributes as Record<string, string> | null;
  const variantStr = attributes
    ? Object.entries(attributes)
        .map(([k, v]) => `${k}: ${v}`)
        .join(" · ")
    : null;

  return (
    <>
      <Card
        role="button"
        tabIndex={0}
        aria-label={`Order ${order.orderNumber} — click to view details`}
        onClick={() => setOpen(true)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") setOpen(true);
        }}
        className="cursor-pointer transition-all hover:border-foreground/20 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <CardContent className="p-4">
          <div className="flex gap-4 items-center">
            {/* Product Image */}
            <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border border-border bg-muted">
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={itemName}
                  fill
                  unoptimized
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
                  No image
                </div>
              )}
            </div>

            {/* Order Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-[11px] font-mono text-muted-foreground">{order.orderNumber}</p>
                  <p className="mt-0.5 font-semibold text-sm leading-tight truncate">{itemName}</p>
                  {variantStr && (
                    <p className="text-xs text-muted-foreground mt-0.5 truncate">{variantStr}</p>
                  )}
                  <p className="text-xs text-muted-foreground mt-1">{order.user.name}</p>
                </div>
                {/* Status badge top-right */}
                <OrderStatusBadge status={order.status} />
              </div>
            </div>

            {/* Price + Qty */}
            <div className="flex flex-col items-end gap-1 flex-shrink-0">
              <p className="text-lg font-bold tracking-tight">
                {formatCurrency(Number(order.totalAmount))}
              </p>
              <p className="text-xs text-muted-foreground">Qty: {totalQuantity}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <OrderDetailModal
        open={open}
        onOpenChange={setOpen}
        order={order}
      />
    </>
  );
}
