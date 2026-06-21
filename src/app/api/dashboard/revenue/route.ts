import { NextRequest, NextResponse } from "next/server";
import { getRevenueChartData } from "@/lib/dashboard-analytics";
import type { RevenueFilter } from "@/lib/dashboard-analytics";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const filter = (searchParams.get("filter") ?? "monthly") as RevenueFilter;

  const validFilters: RevenueFilter[] = ["daily", "weekly", "monthly"];
  if (!validFilters.includes(filter)) {
    return NextResponse.json(
      { error: "Invalid filter. Must be daily, weekly, or monthly." },
      { status: 400 }
    );
  }

  try {
    const data = await getRevenueChartData(filter);
    return NextResponse.json(data);
  } catch (error) {
    console.error("[/api/dashboard/revenue] Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch revenue data." },
      { status: 500 }
    );
  }
}
