import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface MetricCards {
  totalRevenue: number;
  orders: number;
  customers: number;
  supportTickets: number;
}

export interface RevenueDataPoint {
  label: string;
  totalRevenue: number;
  newCustomerRevenue: number;
}

export interface TopProduct {
  id: string;
  name: string;
  slug: string;
  revenue: number;
  orders: number;
  stock: number;
  published: boolean;
}

export interface RecentProduct {
  id: string;
  name: string;
  slug: string;
  categoryName: string | null;
  sellingPrice: number;
  stock: number;
  published: boolean;
  createdAt: Date;
}

export type RevenueFilter = "daily" | "weekly" | "monthly";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getDateRange(filter: RevenueFilter): { start: Date; end: Date } {
  const now = new Date();
  const end = new Date(now);

  switch (filter) {
    case "daily": {
      const start = new Date(now);
      start.setDate(now.getDate() - 29); // 30 days
      start.setHours(0, 0, 0, 0);
      return { start, end };
    }
    case "weekly": {
      const start = new Date(now);
      start.setDate(now.getDate() - 11 * 7); // 12 weeks
      start.setHours(0, 0, 0, 0);
      return { start, end };
    }
    case "monthly":
    default: {
      const start = new Date(now);
      start.setMonth(now.getMonth() - 11); // 12 months
      start.setDate(1);
      start.setHours(0, 0, 0, 0);
      return { start, end };
    }
  }
}

function formatLabel(date: Date, filter: RevenueFilter): string {
  switch (filter) {
    case "daily":
      return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    case "weekly": {
      const weekEnd = new Date(date);
      weekEnd.setDate(date.getDate() + 6);
      return `${date.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`;
    }
    case "monthly":
    default:
      return date.toLocaleDateString("en-US", { month: "short", year: "2-digit" });
  }
}

// ─── Cached Queries ───────────────────────────────────────────────────────────

export const getMetricCards = unstable_cache(
  async (): Promise<MetricCards> => {
    const [revenueResult, orders, customers, supportTickets] = await Promise.all([
      prisma.paymentTransaction.aggregate({
        _sum: { amount: true },
        where: { status: "SUCCESSFUL" },
      }),
      prisma.order.count(),
      prisma.user.count({ where: { role: "CUSTOMER" } }),
      prisma.supportTicket.count(),
    ]);

    return {
      totalRevenue: Number(revenueResult._sum.amount ?? 0),
      orders,
      customers,
      supportTickets,
    };
  },
  ["dashboard-metrics"],
  { revalidate: 60 * 5 } // 5 minutes
);

export const getRevenueChartData = unstable_cache(
  async (filter: RevenueFilter): Promise<RevenueDataPoint[]> => {
    const { start, end } = getDateRange(filter);

    // Fetch paid orders in the date range with their transaction data
    const orders = await prisma.order.findMany({
      where: {
        createdAt: { gte: start, lte: end },
        status: { in: ["PAID", "PROCESSING", "SHIPPED", "DELIVERED"] },
      },
      include: {
        transactions: {
          where: { status: "SUCCESSFUL" },
          select: { amount: true },
        },
        user: {
          select: { createdAt: true },
        },
      },
      orderBy: { createdAt: "asc" },
    });

    // Generate bucket intervals
    const buckets: Map<string, { totalRevenue: number; newCustomerRevenue: number }> = new Map();

    if (filter === "daily") {
      const current = new Date(start);
      while (current <= end) {
        buckets.set(formatLabel(current, filter), { totalRevenue: 0, newCustomerRevenue: 0 });
        current.setDate(current.getDate() + 1);
      }
    } else if (filter === "weekly") {
      const current = new Date(start);
      while (current <= end) {
        buckets.set(formatLabel(current, filter), { totalRevenue: 0, newCustomerRevenue: 0 });
        current.setDate(current.getDate() + 7);
      }
    } else {
      const current = new Date(start);
      while (
        current.getFullYear() < end.getFullYear() ||
        (current.getFullYear() === end.getFullYear() && current.getMonth() <= end.getMonth())
      ) {
        buckets.set(formatLabel(current, filter), { totalRevenue: 0, newCustomerRevenue: 0 });
        current.setMonth(current.getMonth() + 1);
      }
    }

    // Populate buckets
    for (const order of orders) {
      const orderDate = new Date(order.createdAt);
      let bucketKey: string;

      if (filter === "daily") {
        bucketKey = formatLabel(orderDate, filter);
      } else if (filter === "weekly") {
        // Find the week start
        const weekStart = new Date(start);
        while (weekStart <= orderDate) {
          const next = new Date(weekStart);
          next.setDate(next.getDate() + 7);
          if (next > orderDate) break;
          weekStart.setDate(weekStart.getDate() + 7);
        }
        bucketKey = formatLabel(weekStart, filter);
      } else {
        const monthDate = new Date(orderDate.getFullYear(), orderDate.getMonth(), 1);
        bucketKey = formatLabel(monthDate, filter);
      }

      const bucket = buckets.get(bucketKey);
      if (bucket) {
        const orderRevenue = order.transactions.reduce((sum, t) => sum + Number(t.amount), 0);
        bucket.totalRevenue += orderRevenue;

        // New customer = user created within 30 days of their first order
        const userAge = order.createdAt.getTime() - order.user.createdAt.getTime();
        const thirtyDays = 30 * 24 * 60 * 60 * 1000;
        if (userAge <= thirtyDays) {
          bucket.newCustomerRevenue += orderRevenue;
        }
      }
    }

    return Array.from(buckets.entries()).map(([label, data]) => ({
      label,
      ...data,
    }));
  },
  ["dashboard-revenue-chart"],
  { revalidate: 60 * 5 }
);

export const getTopProducts = unstable_cache(
  async (page: number = 1, pageSize: number = 10): Promise<{ products: TopProduct[]; total: number }> => {
    const orderItems = await prisma.orderItem.groupBy({
      by: ["productId"],
      _sum: { price: true },
      _count: { orderId: true },
      where: { productId: { not: null } },
      orderBy: { _sum: { price: "desc" } },
      take: 100, // fetch top 100 for stable sorting
    });

    const productIds = orderItems
      .map((item) => item.productId)
      .filter(Boolean) as string[];

    const products = productIds.length > 0
      ? await prisma.product.findMany({
          where: { id: { in: productIds } },
          select: {
            id: true,
            name: true,
            slug: true,
            stock: true,
            published: true,
          },
        })
      : [];

    const productMap = new Map(products.map((p) => [p.id, p]));

    const ranked = orderItems
      .filter((item) => item.productId && productMap.has(item.productId!))
      .map((item) => {
        const product = productMap.get(item.productId!)!;
        return {
          id: product.id,
          name: product.name,
          slug: product.slug,
          revenue: Number(item._sum.price ?? 0),
          orders: item._count.orderId,
          stock: product.stock,
          published: product.published,
        };
      });

    const total = ranked.length;
    const start = (page - 1) * pageSize;
    const paginated = ranked.slice(start, start + pageSize);

    return { products: paginated, total };
  },
  ["dashboard-top-products"],
  { revalidate: 60 * 5 }
);

export const getRecentProducts = unstable_cache(
  async (page: number = 1, pageSize: number = 10): Promise<{ products: RecentProduct[]; total: number }> => {
    const [products, total] = await Promise.all([
      prisma.product.findMany({
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
        select: {
          id: true,
          name: true,
          slug: true,
          sellingPrice: true,
          stock: true,
          published: true,
          createdAt: true,
          category: { select: { name: true } },
        },
      }),
      prisma.product.count(),
    ]);

    return {
      products: products.map((p) => ({
        id: p.id,
        name: p.name,
        slug: p.slug,
        categoryName: p.category?.name ?? null,
        sellingPrice: Number(p.sellingPrice),
        stock: p.stock,
        published: p.published,
        createdAt: p.createdAt,
      })),
      total,
    };
  },
  ["dashboard-recent-products"],
  { revalidate: 60 * 5 }
);
