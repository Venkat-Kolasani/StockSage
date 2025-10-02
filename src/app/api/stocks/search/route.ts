import { NextResponse } from "next/server"
import { finnhub } from "@/lib/integrations/finnhub"

export const dynamic = "force-dynamic"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("q")

  if (!query) {
    return NextResponse.json({ error: "Query parameter 'q' is required" }, { status: 400 })
  }

  try {
    const results = await finnhub.searchStocks(query)
    
    return NextResponse.json({
      results,
      dataSource: "finnhub"
    })
  } catch (error) {
    console.error("[API] Error searching stocks:", error)
    return NextResponse.json(
      { error: "Failed to search stocks" },
      { status: 500 }
    )
  }
}