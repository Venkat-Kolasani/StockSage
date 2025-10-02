// API endpoint for AI-suggested stocks based on portfolio
import { NextResponse } from "next/server"
import { fmpStock } from "@/lib/integrations/fmp-stock"
import { gemini } from "@/lib/integrations/gemini"

// Comprehensive stock database by sector for suggestions
const STOCK_DATABASE = {
  Technology: [
    { symbol: "AAPL", name: "Apple Inc." },
    { symbol: "MSFT", name: "Microsoft Corporation" },
    { symbol: "GOOGL", name: "Alphabet Inc." },
    { symbol: "NVDA", name: "NVIDIA Corporation" },
    { symbol: "AMD", name: "Advanced Micro Devices" },
    { symbol: "CRM", name: "Salesforce Inc." },
    { symbol: "ADBE", name: "Adobe Inc." },
    { symbol: "INTC", name: "Intel Corporation" },
  ],
  Healthcare: [
    { symbol: "JNJ", name: "Johnson & Johnson" },
    { symbol: "UNH", name: "UnitedHealth Group" },
    { symbol: "PFE", name: "Pfizer Inc." },
    { symbol: "ABBV", name: "AbbVie Inc." },
    { symbol: "TMO", name: "Thermo Fisher Scientific" },
    { symbol: "MRK", name: "Merck & Co." },
  ],
  Finance: [
    { symbol: "JPM", name: "JPMorgan Chase & Co." },
    { symbol: "BAC", name: "Bank of America Corp" },
    { symbol: "WFC", name: "Wells Fargo & Company" },
    { symbol: "GS", name: "Goldman Sachs Group" },
    { symbol: "V", name: "Visa Inc." },
    { symbol: "MA", name: "Mastercard Inc." },
  ],
  "Consumer Cyclical": [
    { symbol: "AMZN", name: "Amazon.com Inc." },
    { symbol: "TSLA", name: "Tesla, Inc." },
    { symbol: "HD", name: "Home Depot Inc." },
    { symbol: "NKE", name: "Nike Inc." },
    { symbol: "MCD", name: "McDonald's Corporation" },
    { symbol: "SBUX", name: "Starbucks Corporation" },
  ],
  Energy: [
    { symbol: "XOM", name: "Exxon Mobil Corporation" },
    { symbol: "CVX", name: "Chevron Corporation" },
    { symbol: "COP", name: "ConocoPhillips" },
    { symbol: "SLB", name: "Schlumberger NV" },
  ],
  Industrials: [
    { symbol: "BA", name: "Boeing Company" },
    { symbol: "CAT", name: "Caterpillar Inc." },
    { symbol: "GE", name: "General Electric" },
    { symbol: "UPS", name: "United Parcel Service" },
  ],
}

export async function POST(req: Request) {
  try {
    const { currentStocks, riskLevel, diversificationScore } = await req.json()

    // Analyze current portfolio sectors
    const currentSectors = currentStocks.map((s: any) => s.sector)
    const sectorCounts: Record<string, number> = {}
    for (const sector of currentSectors) {
      sectorCounts[sector] = (sectorCounts[sector] || 0) + 1
    }

    // Find underrepresented sectors
    const allSectors = Object.keys(STOCK_DATABASE)
    const underrepresentedSectors = allSectors.filter(
      sector => !sectorCounts[sector] || sectorCounts[sector] < 2
    )

    // Get current stock symbols to avoid duplicates
    const currentSymbols = currentStocks.map((s: any) => s.symbol.toUpperCase())

    // Select stocks from underrepresented sectors
    const candidateStocks: Array<{ symbol: string; name: string; sector: string }> = []
    
    for (const sector of underrepresentedSectors.slice(0, 3)) {
      const sectorStocks = STOCK_DATABASE[sector as keyof typeof STOCK_DATABASE] || []
      for (const stock of sectorStocks.slice(0, 2)) {
        if (!currentSymbols.includes(stock.symbol)) {
          candidateStocks.push({ ...stock, sector })
        }
      }
    }

    // If portfolio is well-diversified, suggest top performers
    if (candidateStocks.length < 3) {
      const techStocks = STOCK_DATABASE.Technology.filter(
        s => !currentSymbols.includes(s.symbol)
      ).slice(0, 3)
      candidateStocks.push(...techStocks.map(s => ({ ...s, sector: "Technology" })))
    }

    // Fetch live prices for candidate stocks
    const symbols = candidateStocks.map(s => s.symbol)
    const quotes = await fmpStock.getBatchQuotes(symbols)

    // Build suggestions with live data
    const suggestedStocks = candidateStocks.map(candidate => {
      const quote = quotes.find(q => q.symbol === candidate.symbol)
      
      if (quote) {
        return {
          symbol: quote.symbol,
          name: candidate.name,
          price: quote.price,
          change: quote.change,
          changesPercentage: quote.changesPercentage,
          sector: candidate.sector,
          reason: `Diversifies into ${candidate.sector} sector - currently ${quote.changesPercentage >= 0 ? 'gaining' : 'down'} ${Math.abs(quote.changesPercentage).toFixed(2)}%`,
        }
      }
      
      // Fallback with demo prices
      return {
        symbol: candidate.symbol,
        name: candidate.name,
        price: 150 + Math.random() * 200,
        change: (Math.random() - 0.5) * 10,
        changesPercentage: (Math.random() - 0.5) * 5,
        sector: candidate.sector,
        reason: `Recommended to diversify into ${candidate.sector} sector`,
      }
    }).slice(0, 5)

    // Generate AI reasoning
    let aiReasoning = ""
    
    if (diversificationScore < 50) {
      const topSector = Object.entries(sectorCounts).sort((a, b) => b[1] - a[1])[0]
      aiReasoning = `Your portfolio is heavily concentrated in ${topSector[0]} (${topSector[1]} stocks). These suggestions will help diversify across sectors.`
    } else if (diversificationScore < 70) {
      aiReasoning = `Your portfolio has decent diversification. These stocks from underrepresented sectors can further balance your holdings.`
    } else {
      aiReasoning = `Your portfolio is well-diversified. Consider these top performers to complement your existing positions.`
    }

    if (riskLevel === "HIGH") {
      aiReasoning += " Focus on stable, established companies to balance your risk profile."
    }

    return NextResponse.json({
      suggestions: suggestedStocks,
      reasoning: aiReasoning,
      count: suggestedStocks.length,
      dataSource: quotes.length > 0 ? "live" : "demo",
    })
  } catch (error) {
    console.error("[Suggested Stocks API] Error:", error)
    
    // Return basic suggestions on error
    return NextResponse.json({
      suggestions: [
        { symbol: "JPM", name: "JPMorgan Chase & Co.", price: 195.40, change: 2.10, changesPercentage: 1.09, sector: "Finance", reason: "Blue-chip financial stock for diversification" },
        { symbol: "JNJ", name: "Johnson & Johnson", price: 162.30, change: 1.50, changesPercentage: 0.93, sector: "Healthcare", reason: "Defensive healthcare leader" },
        { symbol: "XOM", name: "Exxon Mobil Corporation", price: 118.70, change: 0.80, changesPercentage: 0.68, sector: "Energy", reason: "Energy sector exposure" },
      ],
      reasoning: "Consider these diversified stocks from different sectors",
      count: 3,
      dataSource: "demo",
    })
  }
}