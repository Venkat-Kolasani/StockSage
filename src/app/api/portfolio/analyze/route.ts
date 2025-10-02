import { NextResponse } from "next/server"
import { finnhub } from "@/lib/integrations/finnhub"

export const dynamic = "force-dynamic"

interface PortfolioStock {
  symbol: string
  shares: number
  purchasePrice?: number
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const portfolio: PortfolioStock[] = body.portfolio || body.stocks

    if (!portfolio || !Array.isArray(portfolio)) {
      return NextResponse.json(
        { error: "Invalid portfolio data" },
        { status: 400 }
      )
    }

    // Fetch quotes for all symbols
    const quotes = await finnhub.getBatchQuotes(portfolio.map(s => s.symbol))

    // Build portfolio stocks with full data
    const portfolioStocks = portfolio.map((stock) => {
      const quote = quotes.find((q) => q.symbol === stock.symbol.toUpperCase())
      if (!quote) {
        return null
      }

      return {
        symbol: stock.symbol.toUpperCase(),
        shares: stock.shares,
        currentPrice: quote.price,
        previousClose: quote.previousClose,
        marketCap: `${(quote.marketCap / 1e9).toFixed(1)}B`,
        peRatio: quote.pe || 25,
        sector: getSectorForSymbol(stock.symbol)
      }
    }).filter(s => s !== null)

    if (portfolioStocks.length === 0) {
      return NextResponse.json(
        { error: "No valid stock quotes found" },
        { status: 400 }
      )
    }

    // Calculate portfolio metrics
    const totalValue = portfolioStocks.reduce((sum, stock) => 
      sum + (stock.currentPrice * stock.shares), 0
    )
    
    const totalCost = portfolioStocks.reduce((sum, stock) => 
      sum + (stock.previousClose * stock.shares), 0
    )
    
    const totalGainLoss = totalValue - totalCost
    const totalGainLossPercent = totalCost > 0 ? (totalGainLoss / totalCost) * 100 : 0

    const portfolioData = {
      stocks: portfolioStocks,
      totalValue,
      totalGainLoss,
      totalGainLossPercent
    }

    // Generate rule-based advice
    const individualAdvice = portfolioStocks.map((stock) => {
      const priceChange = ((stock.currentPrice - stock.previousClose) / stock.previousClose) * 100
      const stockValue = stock.currentPrice * stock.shares
      const portfolioWeight = (stockValue / totalValue) * 100

      let action: "BUY" | "SELL" | "HOLD" = "HOLD"
      let confidence: "HIGH" | "MEDIUM" | "LOW" = "MEDIUM"
      let reasoning = ""

      if (portfolioWeight > 40) {
        action = "SELL"
        confidence = "HIGH"
        reasoning = `Over-weighted at ${portfolioWeight.toFixed(1)}% of portfolio. Consider reducing position for better diversification.`
      } else if (stock.peRatio > 50 && priceChange > 5) {
        action = "SELL"
        confidence = "MEDIUM"
        reasoning = `High P/E ratio (${stock.peRatio.toFixed(1)}) with recent gains. May be overvalued.`
      } else if (stock.peRatio < 20 && priceChange < -3) {
        action = "BUY"
        confidence = "HIGH"
        reasoning = `Attractive P/E ratio (${stock.peRatio.toFixed(1)}) with recent dip. Good buying opportunity.`
      } else if (priceChange > 3) {
        action = "HOLD"
        reasoning = `Strong recent performance (+${priceChange.toFixed(1)}%). Monitor for continued momentum.`
      } else {
        reasoning = `Stable performance. Current position size (${portfolioWeight.toFixed(1)}%) is appropriate.`
      }

      return {
        symbol: stock.symbol,
        action,
        confidence,
        reasoning
      }
    })

    // Calculate diversification and risk
    const sectorCounts = portfolioStocks.reduce((acc, stock) => {
      acc[stock.sector] = (acc[stock.sector] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    const diversificationScore = Math.min(100, Object.keys(sectorCounts).length * 20)
    
    const techWeight = portfolioStocks
      .filter(s => s.sector === "Technology")
      .reduce((sum, stock) => sum + (stock.currentPrice * stock.shares), 0) / totalValue * 100

    const avgPE = portfolioStocks.reduce((sum, stock) => sum + stock.peRatio, 0) / portfolioStocks.length
    
    let riskLevel: "LOW" | "MEDIUM" | "HIGH" = "MEDIUM"
    if (avgPE > 40 || techWeight > 80) {
      riskLevel = "HIGH"
    } else if (avgPE < 25 && diversificationScore > 60) {
      riskLevel = "LOW"
    }

    // Generate insights
    const keyInsights: string[] = []
    
    if (techWeight > 70) {
      keyInsights.push("Portfolio is heavily concentrated in technology sector. Consider diversifying into other sectors.")
    }
    
    if (portfolioStocks.length < 5) {
      keyInsights.push("Portfolio has limited diversification. Consider adding more stocks across different sectors.")
    }

    if (totalGainLossPercent > 20) {
      keyInsights.push("Strong portfolio performance. Consider taking some profits and rebalancing.")
    } else if (totalGainLossPercent < -10) {
      keyInsights.push("Portfolio is underperforming. Review individual positions and consider adjustments.")
    }

    // Generate overall advice
    let overallAdvice = ""
    if (riskLevel === "HIGH") {
      overallAdvice = `Your portfolio shows high risk with an average P/E of ${avgPE.toFixed(1)}. Consider diversifying across more sectors and adding defensive stocks to reduce volatility.`
    } else if (riskLevel === "LOW") {
      overallAdvice = `Your portfolio is well-balanced with good diversification (score: ${diversificationScore}/100). Maintain current allocation and monitor individual positions regularly.`
    } else {
      overallAdvice = `Your portfolio has moderate risk. With ${portfolioStocks.length} holdings and ${diversificationScore}/100 diversification score, consider ${portfolioStocks.length < 8 ? "adding more positions" : "rebalancing"} to optimize returns.`
    }

    return NextResponse.json({
      portfolio: portfolioData,
      individualAdvice,
      overallAdvice,
      diversificationScore,
      riskLevel,
      keyInsights,
      dataSource: "live"
    })
  } catch (error) {
    console.error("[API] Error analyzing portfolio:", error)
    return NextResponse.json(
      { error: "Failed to analyze portfolio" },
      { status: 500 }
    )
  }
}

// Helper function to map symbols to sectors
function getSectorForSymbol(symbol: string): string {
  const sectorMap: Record<string, string> = {
    AAPL: "Technology",
    MSFT: "Technology",
    GOOGL: "Technology",
    AMZN: "Consumer Cyclical",
    TSLA: "Automotive",
    NVDA: "Technology",
    META: "Technology",
    NFLX: "Communication Services",
    JPM: "Financial",
    BAC: "Financial",
    WMT: "Consumer Defensive",
    PG: "Consumer Defensive",
    JNJ: "Healthcare",
    UNH: "Healthcare",
    XOM: "Energy",
    CVX: "Energy"
  }
  
  return sectorMap[symbol.toUpperCase()] || "Technology"
}