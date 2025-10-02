// API endpoint for top stock losers
import { NextResponse } from "next/server"
import { finnhub } from "@/lib/integrations/finnhub"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const losers = await finnhub.getLosers()
    
    return NextResponse.json({
      losers,
      dataSource: "finnhub"
    })
  } catch (error) {
    console.error("[API] Error fetching losers:", error)
    return NextResponse.json(
      { error: "Failed to fetch market losers" },
      { status: 500 }
    )
  }
}