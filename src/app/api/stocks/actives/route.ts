// API endpoint for most active stocks
import { NextResponse } from "next/server"
import { fmpStock } from "@/lib/integrations/fmp-stock"

// Fallback demo data
const DEMO_ACTIVES = [
  { symbol: "TSLA", name: "Tesla, Inc.", price: 265.80, change: 8.20, changesPercentage: 3.18, volume: 98000000 },
  { symbol: "AAPL", name: "Apple Inc.", price: 185.20, change: 4.50, changesPercentage: 2.49, volume: 51000000 },
  { symbol: "NVDA", name: "NVIDIA Corporation", price: 487.50, change: 15.30, changesPercentage: 3.24, volume: 52000000 },
  { symbol: "AMZN", name: "Amazon.com Inc.", price: 184.60, change: 4.90, changesPercentage: 2.73, volume: 48000000 },
  { symbol: "AMD", name: "Advanced Micro Devices", price: 167.40, change: 5.10, changesPercentage: 3.14, volume: 45000000 },
  { symbol: "INTC", name: "Intel Corporation", price: 28.40, change: -1.20, changesPercentage: -4.05, volume: 62000000 },
  { symbol: "SNAP", name: "Snap Inc.", price: 10.80, change: -0.38, changesPercentage: -3.40, volume: 28000000 },
  { symbol: "GOOGL", name: "Alphabet Inc.", price: 178.30, change: 5.10, changesPercentage: 2.95, volume: 25000000 },
  { symbol: "UBER", name: "Uber Technologies Inc.", price: 72.40, change: -1.70, changesPercentage: -2.29, volume: 24000000 },
  { symbol: "MSFT", name: "Microsoft Corporation", price: 422.40, change: 11.80, changesPercentage: 2.87, volume: 22000000 },
]

export async function GET() {
  try {
    const data = await fmpStock.getActives()
    
    // If live data is available, use it
    if (data && data.length > 0) {
      const actives = data.slice(0, 10).map((stock: any) => ({
        symbol: stock.symbol,
        name: stock.name,
        price: stock.price,
        change: stock.change,
        changesPercentage: stock.changesPercentage,
        volume: stock.volume,
      }))
      return NextResponse.json({ actives, count: actives.length, dataSource: "live" })
    }
    
    // Fallback to demo data
    console.log("[Actives API] Using demo data (live data unavailable)")
    return NextResponse.json({ 
      actives: DEMO_ACTIVES, 
      count: DEMO_ACTIVES.length,
      dataSource: "demo" 
    })
  } catch (error) {
    console.error("[Actives API] Error:", error)
    return NextResponse.json(
      { 
        actives: DEMO_ACTIVES, 
        count: DEMO_ACTIVES.length,
        dataSource: "demo",
        error: "Using demo data due to API error"
      },
      { status: 200 }
    )
  }
}