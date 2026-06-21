import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  CreditCardIcon,
  ShoppingBag01Icon,
  UserGroupIcon,
  CustomerSupportIcon,
} from "hugeicons-react";

interface MetricCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  description?: string;
}

function MetricCard({ title, value, icon, description }: MetricCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold tracking-tight">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
      </CardContent>
    </Card>
  );
}

interface OverviewMetricCardsProps {
  totalRevenue: number;
  orders: number;
  customers: number;
  supportTickets: number;
}

export function OverviewMetricCards({
  totalRevenue,
  orders,
  customers,
  supportTickets,
}: OverviewMetricCardsProps) {
  const formattedRevenue = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(totalRevenue);

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <MetricCard
        title="Total Revenue"
        value={formattedRevenue}
        icon={<CreditCardIcon size={16} />}
        description="All-time successful transactions"
      />
      <MetricCard
        title="Orders"
        value={orders.toLocaleString()}
        icon={<ShoppingBag01Icon size={16} />}
        description="Total orders placed"
      />
      <MetricCard
        title="Customers"
        value={customers.toLocaleString()}
        icon={<UserGroupIcon size={16} />}
        description="Registered customer accounts"
      />
      <MetricCard
        title="Support Tickets"
        value={supportTickets.toLocaleString()}
        icon={<CustomerSupportIcon size={16} />}
        description="Total support tickets opened"
      />
    </div>
  );
}

export function OverviewMetricCardsSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <Card key={i}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-4 w-4 rounded" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-32 mb-1" />
            <Skeleton className="h-3 w-40" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
