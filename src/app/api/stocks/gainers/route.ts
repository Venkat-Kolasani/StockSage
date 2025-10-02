import { NextResponse } from "next/server"
import { finnhub } from "@/lib/integrations/finnhub"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const gainers = await finnhub.getGainers()
    
    return NextResponse.json({
      gainers,
      dataSource: "finnhub"
    })
  } catch (error) {
    console.error("[API] Error fetching gainers:", error)
    return NextResponse.json(
      { error: "Failed to fetch market gainers" },
      { status: 500 }
    )
  }
}