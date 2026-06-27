"use server";

import { prisma } from "@/lib/prisma";
import { Prisma } from "@/lib/db-types";

export type CustomerFilter = 
  | "ALL"
  | "THIS_MONTH"
  | "PAYING"
  | "IN_CART"
  | "MULTIPLE_PURCHASES"
  | "PROMOTIONAL"
  | "HIGH_VALUE"
  | "INACTIVE";

export interface CustomerMetrics {
  newUsersThisMonth: number;
  totalUsers: number;
  usersWithPurchase: number;
  usersWithMultiplePurchases: number;
}

export interface CustomerRow {
  id: string;
  name: string;
  email: string;
  image: string | null;
  totalOrders: number;
  totalSpend: number;
  lastPurchase: Date | null;
  cartValue: number;
  accountStatus: "Active" | "New" | "Returning" | "Inactive";
}

export interface CustomersResponse {
  customers: CustomerRow[];
  total: number;
  pageCount: number;
}

export interface CustomerDetails {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  image: string | null;
  createdAt: Date;
  lastActiveAt: Date | null;
  accountStatus: "Active" | "New" | "Returning" | "Inactive";
  lifetimeSpend: number;
  lifetimeOrders: number;
  averageOrderValue: number;
  currentCartValue: number;
  promotionalOrders: number;
  purchaseHistory: {
    id: string;
    orderNumber: string;
    createdAt: Date;
    totalAmount: number;
    status: string;
    itemsCount: number;
  }[];
  addresses: {
    id: string;
    firstName: string | null;
    lastName: string | null;
    streetAddress: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    isDefault: boolean;
  }[];
  currentCart: {
    productName: string;
    productImage: string | null;
    quantity: number;
    totalValue: number;
  }[];
  promotions: {
    id: string;
    name: string;
    discountApplied: number;
    redemptionDate: Date;
  }[];
}

export async function getCustomersMetrics(): Promise<CustomerMetrics> {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const [totalUsers, newUsersThisMonth, usersWithPurchase, usersWithMultiplePurchases] = await Promise.all([
    prisma.user.count({ where: { role: "CUSTOMER" } }),
    prisma.user.count({ where: { role: "CUSTOMER", createdAt: { gte: startOfMonth } } }),
    prisma.user.count({ where: { role: "CUSTOMER", ordersCount: { gt: 0 } } }),
    prisma.user.count({ where: { role: "CUSTOMER", ordersCount: { gt: 1 } } }),
  ]);

  return {
    newUsersThisMonth,
    totalUsers,
    usersWithPurchase,
    usersWithMultiplePurchases,
  };
}

export async function getCustomerCounts(): Promise<Record<CustomerFilter, number>> {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const inactiveDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000); // 90 days

  const [
    all,
    thisMonth,
    paying,
    inCart,
    multiple,
    promotional,
    highValue,
    inactive,
  ] = await Promise.all([
    prisma.user.count({ where: { role: "CUSTOMER" } }),
    prisma.user.count({ where: { role: "CUSTOMER", createdAt: { gte: startOfMonth } } }),
    prisma.user.count({ where: { role: "CUSTOMER", ordersCount: { gt: 0 } } }),
    prisma.user.count({ where: { role: "CUSTOMER", carts: { some: { items: { some: {} } } } } }),
    prisma.user.count({ where: { role: "CUSTOMER", ordersCount: { gt: 1 } } }),
    prisma.user.count({ where: { role: "CUSTOMER", orders: { some: { couponCode: { not: null } } } } }),
    prisma.user.count({ where: { role: "CUSTOMER", lifetimeValue: { gte: 1000 } } }), // Assume >= $1000 is high value
    prisma.user.count({ where: { role: "CUSTOMER", lastActiveAt: { lt: inactiveDate } } }),
  ]);

  return {
    ALL: all,
    THIS_MONTH: thisMonth,
    PAYING: paying,
    IN_CART: inCart,
    MULTIPLE_PURCHASES: multiple,
    PROMOTIONAL: promotional,
    HIGH_VALUE: highValue,
    INACTIVE: inactive,
  };
}

export async function getCustomers({
  page = 1,
  pageSize = 10,
  search = "",
  filter = "ALL",
}: {
  page?: number;
  pageSize?: number;
  search?: string;
  filter?: CustomerFilter;
}): Promise<CustomersResponse> {
  const whereClause: Prisma.UserWhereInput = { role: "CUSTOMER" };

  if (search) {
    whereClause.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { email: { contains: search, mode: "insensitive" } },
    ];
  }

  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const inactiveDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);

  switch (filter) {
    case "THIS_MONTH":
      whereClause.createdAt = { gte: startOfMonth };
      break;
    case "PAYING":
      whereClause.ordersCount = { gt: 0 };
      break;
    case "IN_CART":
      whereClause.carts = { some: { items: { some: {} } } };
      break;
    case "MULTIPLE_PURCHASES":
      whereClause.ordersCount = { gt: 1 };
      break;
    case "PROMOTIONAL":
      whereClause.orders = { some: { couponCode: { not: null } } };
      break;
    case "HIGH_VALUE":
      whereClause.lifetimeValue = { gte: 1000 };
      break;
    case "INACTIVE":
      whereClause.lastActiveAt = { lt: inactiveDate };
      break;
  }

  const total = await prisma.user.count({ where: whereClause });
  
  const users = await prisma.user.findMany({
    where: whereClause,
    skip: (page - 1) * pageSize,
    take: pageSize,
    orderBy: { createdAt: "desc" },
    include: {
      orders: {
        orderBy: { createdAt: "desc" },
        take: 1,
        select: { createdAt: true },
      },
      carts: {
        orderBy: { updatedAt: "desc" },
        take: 1,
        include: {
          items: { select: { quantity: true, addedPrice: true } }
        }
      }
    },
  });

  const customers: CustomerRow[] = users.map(user => {
    // Calculate Cart Value
    let cartValue = 0;
    if (user.carts && user.carts.length > 0) {
      cartValue = user.carts[0].items.reduce((sum, item) => sum + (Number(item.addedPrice) * item.quantity), 0);
    }

    // Determine Account Status
    let status: "Active" | "New" | "Returning" | "Inactive" = "Active";
    if (user.lastActiveAt && user.lastActiveAt < inactiveDate) {
      status = "Inactive";
    } else if (user.ordersCount > 1) {
      status = "Returning";
    } else if (user.createdAt >= startOfMonth) {
      status = "New";
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.image,
      totalOrders: user.ordersCount,
      totalSpend: Number(user.lifetimeValue),
      lastPurchase: user.orders.length > 0 ? user.orders[0].createdAt : null,
      cartValue,
      accountStatus: status,
    };
  });

  return {
    customers,
    total,
    pageCount: Math.ceil(total / pageSize),
  };
}

export async function getCustomerDetails(id: string): Promise<CustomerDetails | null> {
  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      orders: {
        orderBy: { createdAt: "desc" },
        include: {
          items: { select: { id: true } }
        }
      },
      addresses: true,
      carts: {
        orderBy: { updatedAt: "desc" },
        take: 1,
        include: {
          items: {
            include: { product: { select: { name: true, images: { take: 1, orderBy: { order: 'asc' } } } } }
          }
        }
      }
    }
  });

  if (!user) return null;

  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const inactiveDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
  
  let status: "Active" | "New" | "Returning" | "Inactive" = "Active";
  if (user.lastActiveAt && user.lastActiveAt < inactiveDate) {
    status = "Inactive";
  } else if (user.ordersCount > 1) {
    status = "Returning";
  } else if (user.createdAt >= startOfMonth) {
    status = "New";
  }

  const averageOrderValue = user.ordersCount > 0 
    ? Number(user.lifetimeValue) / user.ordersCount 
    : 0;

  const promotionalOrders = user.orders.filter(o => o.couponCode != null).length;

  let currentCartValue = 0;
  const currentCart = [];
  if (user.carts && user.carts.length > 0) {
    for (const item of user.carts[0].items) {
      const itemTotal = Number(item.addedPrice) * item.quantity;
      currentCartValue += itemTotal;
      currentCart.push({
        productName: item.product?.name || "Unknown Product",
        productImage: item.product?.images?.[0]?.url || null,
        quantity: item.quantity,
        totalValue: itemTotal,
      });
    }
  }

  // Extract promotions from orders with discount amounts
  const promotions = user.orders
    .filter(o => o.couponCode && Number(o.discountAmount) > 0)
    .map(o => ({
      id: o.id,
      name: o.couponCode!,
      discountApplied: Number(o.discountAmount),
      redemptionDate: o.createdAt,
    }));

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.addresses.find(a => a.phone)?.phone || null,
    image: user.image,
    createdAt: user.createdAt,
    lastActiveAt: user.lastActiveAt,
    accountStatus: status,
    lifetimeSpend: Number(user.lifetimeValue),
    lifetimeOrders: user.ordersCount,
    averageOrderValue,
    currentCartValue,
    promotionalOrders,
    purchaseHistory: user.orders.map(o => ({
      id: o.id,
      orderNumber: o.orderNumber,
      createdAt: o.createdAt,
      totalAmount: Number(o.totalAmount),
      status: o.status,
      itemsCount: o.items.length,
    })),
    addresses: user.addresses.map(a => ({
      id: a.id,
      firstName: a.firstName,
      lastName: a.lastName,
      streetAddress: a.streetAddress,
      city: a.city,
      state: a.state,
      postalCode: a.postalCode,
      country: a.country,
      isDefault: a.isDefault,
    })),
    currentCart,
    promotions,
  };
}
