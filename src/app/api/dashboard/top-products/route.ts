import { NextRequest, NextResponse } from "next/server";
import { getTopProducts } from "@/lib/dashboard-analytics";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const page = Math.max(1, Number(searchParams.get("page") ?? "1"));
  const pageSize = Math.min(50, Math.max(1, Number(searchParams.get("pageSize") ?? "10")));

  try {
    const data = await getTopProducts(page, pageSize);
    return NextResponse.json(data);
  } catch (error) {
    console.error("[/api/dashboard/top-products] Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch top products." },
      { status: 500 }
    );
  }
}
