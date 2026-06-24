"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { unstable_cache } from "next/cache";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ProductMetrics {
  totalProducts: number;
  outOfStock: number;
  totalInventoryWorth: number;
  totalInCart: number;
}

export interface CategoryWithCount {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  targetAudience: string | null;
  occasion: string | null;
  season: string | null;
  material: string | null;
  createdAt: Date;
  updatedAt: Date;
  _count: { products: number };
}

export interface ProductRow {
  id: string;
  name: string;
  sku: string | null;
  sellingPrice: number;
  stock: number;
  published: boolean;
  featured: boolean;
  archived: boolean;
  viewsCount: number;
  updatedAt: Date;
  category: { id: string; name: string } | null;
  images: { url: string }[];
  _count: {
    cartItems: number;
    orderItems: number;
  };
}

export interface ProductsResult {
  products: ProductRow[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface CreateCategoryInput {
  name: string;
  description: string;
  targetAudience: string;
  occasion: string;
  season: string;
  material: string;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function toSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// ---------------------------------------------------------------------------
// Metrics
// ---------------------------------------------------------------------------

export const getProductMetrics = unstable_cache(
  async (): Promise<ProductMetrics> => {
    const [totalProducts, outOfStock, inventoryData, totalInCart] =
      await Promise.all([
        prisma.product.count({ where: { archived: false } }),
        prisma.product.count({
          where: { stock: 0, archived: false },
        }),
        prisma.product.findMany({
          where: { archived: false },
          select: { sellingPrice: true, stock: true },
        }),
        prisma.cartItem.count(),
      ]);

    const totalInventoryWorth = inventoryData.reduce((acc, p) => {
      return acc + Number(p.sellingPrice) * p.stock;
    }, 0);

    return { totalProducts, outOfStock, totalInventoryWorth, totalInCart };
  },
  ["product-metrics"],
  { revalidate: 60 }
);

// ---------------------------------------------------------------------------
// Categories
// ---------------------------------------------------------------------------

export const getCategories = unstable_cache(
  async (): Promise<CategoryWithCount[]> => {
    const raw = await prisma.category.findMany({
      orderBy: { name: "asc" },
      include: {
        _count: { select: { products: true } },
      },
    });

    return raw.map((c) => ({
      id: c.id,
      name: c.name,
      slug: c.slug,
      description: c.description,
      targetAudience: c.targetAudience,
      occasion: c.occasion,
      season: c.season,
      material: c.material,
      createdAt: c.createdAt,
      updatedAt: c.updatedAt,
      _count: c._count,
    }));
  },
  ["categories-list"],
  { revalidate: 60 }
);

export const getActivePromotions = unstable_cache(
  async () => {
    return prisma.promotion.findMany({
      where: { isActive: true },
      orderBy: { createdAt: "desc" },
    });
  },
  ["active-promotions"],
  { revalidate: 60 }
);

export async function createCategory(
  input: CreateCategoryInput
): Promise<{ success: boolean; error?: string }> {
  try {
    const baseSlug = toSlug(input.name);
    // Ensure slug uniqueness
    const existing = await prisma.category.count({
      where: { slug: { startsWith: baseSlug } },
    });
    const slug = existing > 0 ? `${baseSlug}-${existing}` : baseSlug;

    await prisma.category.create({
      data: {
        name: input.name.trim(),
        slug,
        description: input.description.trim(),
        targetAudience: input.targetAudience.trim(),
        occasion: input.occasion,
        season: input.season,
        material: input.material,
      },
    });

    revalidatePath("/dashboard/products");
    return { success: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return { success: false, error: message };
  }
}

// ---------------------------------------------------------------------------
// Product Creation
// ---------------------------------------------------------------------------

export interface CreateProductInput {
  name: string;
  description: string;
  costPrice: number;
  sellingPrice: number;
  stock: number;
  categoryId: string;
  promotionId?: string;
  keywords: string[];
  images: { url: string; isCover: boolean; order: number }[];
}

export async function createProduct(input: CreateProductInput): Promise<{ success: boolean; error?: string }> {
  try {
    const baseSlug = toSlug(input.name);
    const existing = await prisma.product.count({
      where: { slug: { startsWith: baseSlug } },
    });
    const slug = existing > 0 ? `${baseSlug}-${existing}` : baseSlug;

    await prisma.product.create({
      data: {
        name: input.name.trim(),
        slug,
        description: input.description.trim(),
        costPrice: input.costPrice,
        sellingPrice: input.sellingPrice,
        stock: input.stock,
        categoryId: input.categoryId,
        promotionId: input.promotionId || null,
        published: true, // Auto-publish for now
        keywords: {
          connectOrCreate: input.keywords.map(kw => ({
            where: { name: kw.trim() },
            create: { name: kw.trim() }
          }))
        },
        images: {
          create: input.images.map(img => ({
            url: img.url,
            isCover: img.isCover,
            order: img.order
          }))
        }
      }
    });

    revalidatePath("/dashboard/products");
    return { success: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return { success: false, error: message };
  }
}

// ---------------------------------------------------------------------------
// Products — listing with search / filter / pagination
// ---------------------------------------------------------------------------

export type StockFilter = "in-stock" | "out-of-stock" | "low-stock";
export type StatusFilter = "featured" | "active" | "archived" | "in-cart" | "ordered";
export type ProductFilter = StockFilter | StatusFilter;

export async function getProducts(opts: {
  page?: number;
  pageSize?: number;
  search?: string;
  categoryId?: string;
  filter?: ProductFilter;
}): Promise<ProductsResult> {
  const page = Math.max(1, opts.page ?? 1);
  const pageSize = opts.pageSize ?? 20;
  const skip = (page - 1) * pageSize;

  // Build where clause
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const where: Record<string, any> = {};

  if (opts.categoryId) {
    where.categoryId = opts.categoryId;
  }

  if (opts.search) {
    const q = opts.search.trim();
    where.OR = [
      { name: { contains: q, mode: "insensitive" } },
      { sku: { contains: q, mode: "insensitive" } },
      { category: { name: { contains: q, mode: "insensitive" } } },
    ];
  }

  switch (opts.filter) {
    case "in-stock":
      where.stock = { gt: 0 };
      break;
    case "out-of-stock":
      where.stock = 0;
      break;
    case "low-stock":
      where.stock = { gt: 0, lte: 5 };
      break;
    case "featured":
      where.featured = true;
      break;
    case "active":
      where.published = true;
      where.archived = false;
      break;
    case "archived":
      where.archived = true;
      break;
    case "in-cart":
      where.cartItems = { some: {} };
      break;
    case "ordered":
      where.orderItems = { some: {} };
      break;
  }

  const [rawProducts, total] = await Promise.all([
    prisma.product.findMany({
      where,
      skip,
      take: pageSize,
      orderBy: { updatedAt: "desc" },
      select: {
        id: true,
        name: true,
        sku: true,
        sellingPrice: true,
        stock: true,
        published: true,
        featured: true,
        archived: true,
        viewsCount: true,
        updatedAt: true,
        category: { select: { id: true, name: true } },
        images: { select: { url: true }, orderBy: { order: "asc" }, take: 1 },
        _count: { select: { cartItems: true, orderItems: true } },
      },
    }),
    prisma.product.count({ where }),
  ]);

  const products: ProductRow[] = rawProducts.map((p) => ({
    ...p,
    sellingPrice: Number(p.sellingPrice),
  }));

  return {
    products,
    total,
    page,
    pageSize,
    totalPages: Math.max(1, Math.ceil(total / pageSize)),
  };
}

// ---------------------------------------------------------------------------
// Bulk actions
// ---------------------------------------------------------------------------

export async function deleteProducts(
  ids: string[]
): Promise<{ success: boolean; error?: string }> {
  try {
    await prisma.product.deleteMany({ where: { id: { in: ids } } });
    revalidatePath("/dashboard/products");
    return { success: true };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to delete products",
    };
  }
}

export async function archiveProducts(
  ids: string[]
): Promise<{ success: boolean; error?: string }> {
  try {
    await prisma.product.updateMany({
      where: { id: { in: ids } },
      data: { archived: true, published: false },
    });
    revalidatePath("/dashboard/products");
    return { success: true };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to archive products",
    };
  }
}

export async function moveProductsToCategory(
  ids: string[],
  categoryId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    await prisma.product.updateMany({
      where: { id: { in: ids } },
      data: { categoryId },
    });
    revalidatePath("/dashboard/products");
    return { success: true };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to move products",
    };
  }
}

export async function deleteProduct(
  id: string
): Promise<{ success: boolean; error?: string }> {
  try {
    await prisma.product.delete({ where: { id } });
    revalidatePath("/dashboard/products");
    return { success: true };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to delete product",
    };
  }
}

export async function moveProductCategory(
  productId: string,
  categoryId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    await prisma.product.update({
      where: { id: productId },
      data: { categoryId },
    });
    revalidatePath("/dashboard/products");
    return { success: true };
  } catch (err) {
    return {
      success: false,
      error:
        err instanceof Error ? err.message : "Failed to update product category",
    };
  }
}
