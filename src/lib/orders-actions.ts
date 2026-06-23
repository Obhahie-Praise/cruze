"use server";

import { prisma } from "@/lib/prisma";
import { OrderStatus } from "@/lib/db-types";
import { revalidatePath } from "next/cache";

export interface OrderMetrics {
  totalOrders: number;
  ordersThisMonth: number;
  totalDelivered: number;
  averageProfit: number;
}

export async function getOrderMetrics(): Promise<OrderMetrics> {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const [totalOrders, ordersThisMonth, totalDelivered, allOrders] = await Promise.all([
    prisma.order.count(),
    prisma.order.count({
      where: {
        createdAt: { gte: startOfMonth },
      },
    }),
    prisma.order.count({
      where: { status: "DELIVERED" },
    }),
    prisma.order.findMany({
      select: {
        totalAmount: true,
        items: {
          select: {
            costPrice: true,
            quantity: true,
          },
        },
      },
    }),
  ]);

  let totalProfit = 0;
  let profitableOrdersCount = 0;

  for (const order of allOrders) {
    let orderCost = 0;
    for (const item of order.items) {
      if (item.costPrice) {
        orderCost += Number(item.costPrice) * item.quantity;
      }
    }
    const orderTotal = Number(order.totalAmount);
    if (orderCost > 0 || orderTotal > 0) {
      totalProfit += orderTotal - orderCost;
      profitableOrdersCount++;
    }
  }

  const averageProfit = profitableOrdersCount > 0 ? totalProfit / profitableOrdersCount : 0;

  return {
    totalOrders,
    ordersThisMonth,
    totalDelivered,
    averageProfit,
  };
}

export async function getOrders(statusFilter?: OrderStatus) {
  const whereClause = statusFilter ? { status: statusFilter } : {};

  return prisma.order.findMany({
    where: whereClause,
    orderBy: { createdAt: "desc" },
    include: {
      user: {
        select: { name: true, email: true },
      },
      items: true,
      transactions: true,
    },
  });
}

export async function updateOrderStatus(
  orderId: string,
  status: OrderStatus,
  refundReason?: string
) {
  await prisma.order.update({
    where: { id: orderId },
    data: {
      status,
      ...(refundReason ? { refundReason } : {}),
    },
  });

  revalidatePath("/dashboard/orders");
  revalidatePath("/dashboard/overview");
}
