"use client";

import { useState, useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { OrderStatus } from "@/lib/db-types";
import { updateOrderStatus } from "@/lib/orders-actions";
import { toast } from "sonner";

interface RefundDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  orderId: string;
  orderNumber: string;
  onSuccess: () => void;
}

export function RefundDialog({
  open,
  onOpenChange,
  orderId,
  orderNumber,
  onSuccess,
}: RefundDialogProps) {
  const [reason, setReason] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [isPending, startTransition] = useTransition();

  const canSubmit = reason.trim().length >= 10 && confirmed;

  function handleSubmit() {
    startTransition(async () => {
      try {
        await updateOrderStatus(orderId, OrderStatus.REFUNDED, reason.trim());
        onSuccess();
        onOpenChange(false);
        setReason("");
        setConfirmed(false);
        toast.success("Order refunded successfully.");
      } catch {
        toast.error("Failed to process refund. Please try again.");
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={isPending ? undefined : onOpenChange}>
      <DialogContent className="max-w-md" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle className="text-destructive">Confirm Refund</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Warning */}
          <div className="rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm">
            <p className="text-muted-foreground">
              You are about to refund order{" "}
              <span className="font-mono font-semibold text-foreground">{orderNumber}</span>.
              This action{" "}
              <span className="font-semibold text-destructive">cannot be reversed</span>.
            </p>
          </div>

          {/* Refund Reason */}
          <div className="space-y-1.5">
            <Label htmlFor="refund-reason" className="text-sm font-medium">
              Refund Reason <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="refund-reason"
              placeholder="Describe the reason for this refund (minimum 10 characters)…"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={4}
              className="resize-none text-sm"
              disabled={isPending}
            />
            <p className="text-xs text-muted-foreground text-right">
              {reason.trim().length} / 10 min characters
            </p>
          </div>

          {/* Confirmation checkbox */}
          <label
            htmlFor="refund-confirm"
            className="flex items-start gap-2.5 cursor-pointer rounded-lg border border-destructive/30 bg-destructive/5 p-3"
          >
            <input
              id="refund-confirm"
              type="checkbox"
              checked={confirmed}
              onChange={(e) => setConfirmed(e.target.checked)}
              disabled={isPending}
              className="mt-0.5 accent-destructive"
            />
            <span className="text-xs text-muted-foreground leading-relaxed">
              I understand this action is{" "}
              <strong className="text-destructive">irreversible</strong>. The order status will
              be permanently set to <strong>Refunded</strong> and the refund reason will be
              stored in the database.
            </span>
          </label>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button
            id="refund-dialog-submit"
            variant="destructive"
            disabled={!canSubmit || isPending}
            onClick={handleSubmit}
          >
            {isPending ? "Processing…" : "Process Refund"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
