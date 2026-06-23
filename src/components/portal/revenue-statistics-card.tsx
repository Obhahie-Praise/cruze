"use client";

import * as React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { MoreHorizontal } from "lucide-react";
import type { RevenueDataPoint, RevenueFilter } from "@/lib/dashboard-analytics";

type RevenueMode = "total" | "new-customer";

interface RevenueChartProps {
  data: RevenueDataPoint[];
  filter: RevenueFilter;
  onFilterChange: (filter: RevenueFilter) => void;
}

const FILTER_LABELS: Record<RevenueFilter, string> = {
  daily: "Daily",
  weekly: "Weekly",
  monthly: "Monthly",
};

// Custom tooltip component
function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
}) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-lg border border-border bg-background px-3 py-2 shadow-md text-sm">
      <p className="font-medium mb-1 text-foreground">{label}</p>
      {payload.map((entry, i) => (
        <p key={i} className="text-muted-foreground">
          <span style={{ color: entry.color }}>●</span>{" "}
          {entry.name}:{" "}
          <span className="font-medium text-foreground">
            {new Intl.NumberFormat("en-NG", {
              style: "currency",
              currency: "NGN",
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).format(entry.value)}
          </span>
        </p>
      ))}
    </div>
  );
}

export function RevenueStatisticsCard({ data, filter, onFilterChange }: RevenueChartProps) {
  const [mode, setMode] = React.useState<RevenueMode>("total");

  const currentRevenue = React.useMemo(() => {
    const total = data.reduce(
      (sum, point) =>
        mode === "total"
          ? sum + point.totalRevenue
          : sum + point.newCustomerRevenue,
      0
    );
    return total;
  }, [data, mode]);

  const hasData = data.some(
    (d) => d.totalRevenue > 0 || d.newCustomerRevenue > 0
  );

  const formatRevenue = (value: number) =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);

  const revenueLabel =
    FILTER_LABELS[filter] === "Daily"
      ? "30-Day Revenue"
      : FILTER_LABELS[filter] === "Weekly"
      ? "12-Week Revenue"
      : "12-Month Revenue";

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <p className="text-sm text-muted-foreground">{revenueLabel}</p>
          <CardTitle className="text-3xl font-bold tracking-tight mt-1">
            {formatRevenue(currentRevenue)}
          </CardTitle>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground font-medium">
            Revenue Statistics
          </span>
          <DropdownMenu>
            <DropdownMenuTrigger render={
              <Button
                variant="ghost"
                size="icon"
                aria-label="Revenue chart options"
                id="revenue-chart-menu"
              />
            }>
              <MoreHorizontal size={16} />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52">
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Filter</DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    {(["daily", "weekly", "monthly"] as RevenueFilter[]).map(
                      (f) => (
                        <DropdownMenuItem
                          key={f}
                          onClick={() => onFilterChange(f)}
                          className={filter === f ? "font-medium" : ""}
                        >
                          {FILTER_LABELS[f]}
                          {filter === f && (
                            <span className="ml-auto text-xs text-muted-foreground">
                              ✓
                            </span>
                          )}
                        </DropdownMenuItem>
                      )
                    )}
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => setMode("total")}
                className={mode === "total" ? "font-medium" : ""}
              >
                Show Total Revenue
                {mode === "total" && (
                  <span className="ml-auto text-xs text-muted-foreground">✓</span>
                )}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setMode("new-customer")}
                className={mode === "new-customer" ? "font-medium" : ""}
              >
                Show New Customer Revenue
                {mode === "new-customer" && (
                  <span className="ml-auto text-xs text-muted-foreground">✓</span>
                )}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent>
        {!hasData ? (
          <div className="flex items-center justify-center h-64 text-muted-foreground text-sm">
            <div className="text-center">
              <p className="font-medium">No revenue data yet</p>
              <p className="text-xs mt-1">
                Revenue will appear here once orders are completed.
              </p>
            </div>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={280}>
            <LineChart
              data={data}
              margin={{ top: 4, right: 12, left: 0, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                className="stroke-border"
                stroke="currentColor"
                opacity={0.3}
              />
              <XAxis
                dataKey="label"
                tick={{ fontSize: 11, fill: "currentColor" }}
                className="text-muted-foreground"
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                tickFormatter={(v) =>
                  new Intl.NumberFormat("en-NG", {
                    notation: "compact",
                    currency: "NGN",
                  }).format(v)
                }
                tick={{ fontSize: 11, fill: "currentColor" }}
                className="text-muted-foreground"
                tickLine={false}
                axisLine={false}
                width={60}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                wrapperStyle={{ fontSize: "12px" }}
                formatter={(value) => (
                  <span className="text-muted-foreground">{value}</span>
                )}
              />
              <Line
                type="monotone"
                dataKey="totalRevenue"
                name="Revenue Trend"
                stroke="hsl(var(--foreground))"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="newCustomerRevenue"
                name="New Customer Revenue"
                stroke="hsl(var(--muted-foreground))"
                strokeWidth={2}
                strokeDasharray="4 4"
                dot={false}
                activeDot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}

export function RevenueStatisticsCardSkeleton() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <Skeleton className="h-4 w-28 mb-2" />
          <Skeleton className="h-9 w-48" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-36" />
          <Skeleton className="h-8 w-8 rounded" />
        </div>
      </CardHeader>
      <CardContent>
        <Skeleton className="h-72 w-full rounded-lg" />
      </CardContent>
    </Card>
  );
}
