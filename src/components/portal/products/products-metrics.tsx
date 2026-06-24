import { getProductMetrics } from "@/lib/products-actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Package01Icon,
  AlertCircleIcon,
  MoneyBag01Icon,
  ShoppingCartCheckIn01Icon,
} from "hugeicons-react";
import { formatCurrency } from "@/lib/utils";

export async function ProductsMetrics() {
  let metrics = {
    totalProducts: 0,
    outOfStock: 0,
    totalInventoryWorth: 0,
    totalInCart: 0,
  };

  try {
    metrics = await getProductMetrics();
  } catch {
    // Silently fall back to zeros
  }

  const cards = [
    {
      title: "Total Products",
      value: metrics.totalProducts.toLocaleString(),
      description: "Active catalog items",
      icon: Package01Icon,
    },
    {
      title: "Out of Stock",
      value: metrics.outOfStock.toLocaleString(),
      description: "Products with zero inventory",
      icon: AlertCircleIcon,
    },
    {
      title: "Inventory Worth",
      value: formatCurrency(metrics.totalInventoryWorth),
      description: "Total stock value at selling price",
      icon: MoneyBag01Icon,
    },
    {
      title: "In Customer Carts",
      value: metrics.totalInCart.toLocaleString(),
      description: "Cart items across all customers",
      icon: ShoppingCartCheckIn01Icon,
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <Card key={card.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {card.title}
              </CardTitle>
              <Icon size={16} className="text-muted-foreground" />
            </CardHeader>
            <CardContent className="space-y-1">
              <p className="text-2xl font-bold tracking-tight">{card.value}</p>
              <p className="text-xs text-muted-foreground">{card.description}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
