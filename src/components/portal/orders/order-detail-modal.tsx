"use client";

import { useState, useTransition } from "react";
import { OrderStatus } from "@/lib/db-types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { OrderStatusBadge, type OrderWithDetails } from "./order-card";
import { RefundDialog } from "./refund-dialog";
import { updateOrderStatus } from "@/lib/orders-actions";
import { formatCurrency } from "@/lib/utils";
import {
  User02Icon,
  Location01Icon,
  Package01Icon,
  CreditCardIcon,
  InformationCircleIcon,
  CheckmarkCircle01Icon,
  DeliveryTruck01Icon,
  Cancel01Icon,
} from "hugeicons-react";
import { toast } from "sonner";

interface OrderDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  order: OrderWithDetails;
}

// ---- Section wrapper -------------------------------------------------------
function Section({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Icon size={15} className="text-muted-foreground" />
        <h3 className="text-sm font-semibold">{title}</h3>
      </div>
      <div className="rounded-lg border border-border bg-muted/30 p-4 text-sm space-y-2">
        {children}
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-muted-foreground shrink-0">{label}</span>
      <span className="text-right font-medium">{value}</span>
    </div>
  );
}

// ---- Main Modal ------------------------------------------------------------
export function OrderDetailModal({ open, onOpenChange, order }: OrderDetailModalProps) {
  const [isPending, startTransition] = useTransition();
  const [currentStatus, setCurrentStatus] = useState<OrderStatus>(order.status);
  const [refundOpen, setRefundOpen] = useState(false);

  const shippingAddress = order.shippingAddress as Record<string, string>;

  const canMarkReady = currentStatus === OrderStatus.PENDING || currentStatus === OrderStatus.NEW;
  const canMarkDelivered = currentStatus === OrderStatus.READY;
  const canRefund =
    currentStatus !== OrderStatus.REFUNDED && currentStatus !== OrderStatus.CANCELLED;

  function handleMarkReady() {
    startTransition(async () => {
      try {
        await updateOrderStatus(order.id, OrderStatus.READY);
        setCurrentStatus(OrderStatus.READY);
        toast.success("Order marked as Ready.");
      } catch {
        toast.error("Failed to update order status.");
      }
    });
  }

  function handleMarkDelivered() {
    startTransition(async () => {
      try {
        await updateOrderStatus(order.id, OrderStatus.DELIVERED);
        setCurrentStatus(OrderStatus.DELIVERED);
        toast.success("Order marked as Delivered.");
      } catch {
        toast.error("Failed to update order status.");
      }
    });
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-2xl w-full overflow-y-auto max-h-[90vh]">
          {/* Header */}
          <DialogHeader>
            <div className="flex items-start justify-between gap-4 pr-8">
              <div>
                <DialogTitle>Order Detail</DialogTitle>
                <p className="text-xs font-mono text-muted-foreground mt-0.5">
                  {order.orderNumber}
                </p>
              </div>
              <OrderStatusBadge status={currentStatus} />
            </div>
          </DialogHeader>

          {/* Body Sections */}
          <div className="space-y-5">

            {/* Customer Information */}
            <Section icon={User02Icon} title="Customer Information">
              <Row label="Name" value={order.user.name} />
              <Row label="Email" value={order.user.email} />
              <Row label="Phone" value={order.phone || "—"} />
            </Section>

            {/* Shipping Address */}
            <Section icon={Location01Icon} title="Shipping Address">
              {shippingAddress ? (
                <>
                  {shippingAddress.firstName && shippingAddress.lastName && (
                    <Row
                      label="Recipient"
                      value={`${shippingAddress.firstName} ${shippingAddress.lastName}`}
                    />
                  )}
                  <Row label="Street" value={shippingAddress.streetAddress ?? "—"} />
                  {shippingAddress.apartment && (
                    <Row label="Apartment" value={shippingAddress.apartment} />
                  )}
                  <Row
                    label="City"
                    value={`${shippingAddress.city ?? ""}, ${shippingAddress.state ?? ""} ${shippingAddress.postalCode ?? ""}`.trim()}
                  />
                  <Row label="Country" value={shippingAddress.country ?? "—"} />
                </>
              ) : (
                <p className="text-muted-foreground text-sm">No shipping address on file.</p>
              )}
            </Section>

            {/* Order Items */}
            <Section icon={Package01Icon} title="Order Items">
              {order.items.map((item) => {
                const attrs = item.attributes as Record<string, string> | null;
                return (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 py-2 border-b border-border/50 last:border-0"
                  >
                    {item.imageUrl && (
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        width={48}
                        height={48}
                        unoptimized
                        className="rounded-md object-cover border border-border flex-shrink-0"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{item.name}</p>
                      {item.sku && (
                        <p className="text-xs text-muted-foreground font-mono">SKU: {item.sku}</p>
                      )}
                      {attrs && (
                        <p className="text-xs text-muted-foreground">
                          {Object.entries(attrs)
                            .map(([k, v]) => `${k}: ${v}`)
                            .join(" · ")}
                        </p>
                      )}
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-sm font-semibold">
                        {formatCurrency(Number(item.price))}
                      </p>
                      <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                  </div>
                );
              })}
            </Section>

            {/* Payment Information */}
            <Section icon={CreditCardIcon} title="Payment Information">
              <Row label="Subtotal" value={formatCurrency(Number(order.subtotalAmount))} />
              {Number(order.discountAmount) > 0 && (
                <Row
                  label="Discount"
                  value={`-${formatCurrency(Number(order.discountAmount))}`}
                />
              )}
              {Number(order.shippingAmount) > 0 && (
                <Row label="Shipping" value={formatCurrency(Number(order.shippingAmount))} />
              )}
              {Number(order.taxAmount) > 0 && (
                <Row label="Tax" value={formatCurrency(Number(order.taxAmount))} />
              )}
              <Separator className="my-1" />
              <Row
                label="Total"
                value={
                  <span className="text-base font-bold">
                    {formatCurrency(Number(order.totalAmount))}
                  </span>
                }
              />
              {order.couponCode && (
                <Row
                  label="Coupon"
                  value={<Badge variant="outline">{order.couponCode}</Badge>}
                />
              )}
            </Section>

            {/* Order Information */}
            <Section icon={InformationCircleIcon} title="Order Information">
              <Row label="Created" value={new Date(order.createdAt).toLocaleString()} />
              <Row label="Last Updated" value={new Date(order.updatedAt).toLocaleString()} />
              <Row label="Status" value={<OrderStatusBadge status={currentStatus} />} />
            </Section>

            {/* Notes / Refund Reason */}
            {(order.notes || order.refundReason) && (
              <Section icon={InformationCircleIcon} title="Notes">
                {order.notes && <p className="text-sm">{order.notes}</p>}
                {order.refundReason && (
                  <div>
                    <p className="text-xs text-muted-foreground font-semibold mb-1">
                      Refund Reason:
                    </p>
                    <p className="text-sm text-destructive">{order.refundReason}</p>
                  </div>
                )}
              </Section>
            )}
          </div>

          {/* Footer Actions */}
          <DialogFooter>
            <div className="flex flex-wrap gap-2 flex-1">
              <Button
                id="order-action-mark-ready"
                variant="outline"
                size="sm"
                disabled={!canMarkReady || isPending}
                onClick={handleMarkReady}
                className="gap-1.5"
              >
                <CheckmarkCircle01Icon size={14} />
                {canMarkReady ? "Mark as Ready" : "Already Ready"}
              </Button>

              <Button
                id="order-action-mark-delivered"
                variant="outline"
                size="sm"
                disabled={!canMarkDelivered || isPending}
                onClick={handleMarkDelivered}
                className="gap-1.5"
              >
                <DeliveryTruck01Icon size={14} />
                Mark as Delivered
              </Button>

              <Button
                id="order-action-refund"
                variant="outline"
                size="sm"
                disabled={!canRefund || isPending}
                onClick={() => setRefundOpen(true)}
                className="gap-1.5 text-destructive hover:text-destructive border-destructive/30 hover:border-destructive/60"
              >
                <Cancel01Icon size={14} />
                Refund
              </Button>
            </div>

            <Button
              id="order-action-finish"
              size="sm"
              onClick={() => onOpenChange(false)}
            >
              Finish
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <RefundDialog
        open={refundOpen}
        onOpenChange={setRefundOpen}
        orderId={order.id}
        orderNumber={order.orderNumber}
        onSuccess={() => setCurrentStatus(OrderStatus.REFUNDED)}
      />
    </>
  );
}
