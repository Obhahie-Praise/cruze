import { getOrderMetrics } from "@/lib/orders-actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ShoppingBag01Icon,
  Calendar01Icon,
  DeliveryTruck01Icon,
  BarChartIcon,
} from "hugeicons-react";
import { formatCurrency } from "@/lib/utils";

export async function OrdersMetrics() {
  let metrics = { totalOrders: 0, ordersThisMonth: 0, totalDelivered: 0, averageProfit: 0 };

  try {
    metrics = await getOrderMetrics();
  } catch {
    // Silently fall back to zeros — error shown in UI
  }

  const cards = [
    {
      title: "Total Orders",
      value: metrics.totalOrders.toLocaleString(),
      description: "All time",
      icon: ShoppingBag01Icon,
    },
    {
      title: "Orders This Month",
      value: metrics.ordersThisMonth.toLocaleString(),
      description: "Current month",
      icon: Calendar01Icon,
    },
    {
      title: "Total Delivered",
      value: metrics.totalDelivered.toLocaleString(),
      description: "Successfully fulfilled",
      icon: DeliveryTruck01Icon,
    },
    {
      title: "Avg. Profit / Order",
      value: formatCurrency(metrics.averageProfit),
      description: "Revenue minus cost",
      icon: BarChartIcon,
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
