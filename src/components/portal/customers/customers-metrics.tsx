import { getCustomersMetrics } from "@/lib/customers-actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  UserGroupIcon,
  UserAdd01Icon,
  ShoppingCartCheckIn01Icon,
  UserMultiple02Icon,
} from "hugeicons-react";

export async function CustomersMetrics() {
  let metrics = {
    newUsersThisMonth: 0,
    totalUsers: 0,
    usersWithPurchase: 0,
    usersWithMultiplePurchases: 0,
  };

  try {
    metrics = await getCustomersMetrics();
  } catch {
    // Silently fall back to zeros
  }

  const cards = [
    {
      title: "New Users This Month",
      value: metrics.newUsersThisMonth.toLocaleString(),
      description: "Registered in the current month",
      icon: UserAdd01Icon,
    },
    {
      title: "Total Users",
      value: metrics.totalUsers.toLocaleString(),
      description: "All registered customers",
      icon: UserGroupIcon,
    },
    {
      title: "At Least One Purchase",
      value: metrics.usersWithPurchase.toLocaleString(),
      description: "Customers who have bought items",
      icon: ShoppingCartCheckIn01Icon,
    },
    {
      title: "Multiple Purchases",
      value: metrics.usersWithMultiplePurchases.toLocaleString(),
      description: "Returning and loyal customers",
      icon: UserMultiple02Icon,
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
