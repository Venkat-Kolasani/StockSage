import type { Stock, Portfolio, StockAdvice, PortfolioAnalysis } from "./types"
import { getStockData } from "./mock-data"

export function calculatePortfolioMetrics(stocks: Array<{ symbol: string; shares: number }>): Portfolio {
  const portfolioStocks: Stock[] = []
  let totalValue = 0
  let totalCost = 0

  for (const stock of stocks) {
    const stockData = getStockData(stock.symbol)
    if (!stockData) continue

    const fullStock: Stock = {
      ...stockData,
      shares: stock.shares,
    }

    const currentValue = fullStock.currentPrice * fullStock.shares
    const previousValue = fullStock.previousClose * fullStock.shares

    portfolioStocks.push(fullStock)
    totalValue += currentValue
    totalCost += previousValue
  }

  const totalGainLoss = totalValue - totalCost
  const totalGainLossPercent = totalCost > 0 ? (totalGainLoss / totalCost) * 100 : 0

  return {
    stocks: portfolioStocks,
    totalValue,
    totalGainLoss,
    totalGainLossPercent,
  }
}

export function generateRuleBasedAdvice(portfolio: Portfolio): Partial<PortfolioAnalysis> {
  const advice: StockAdvice[] = []
  const keyInsights: string[] = []

  // Analyze individual stocks
  for (const stock of portfolio.stocks) {
    const priceChange = ((stock.currentPrice - stock.previousClose) / stock.previousClose) * 100
    const stockValue = stock.currentPrice * stock.shares
    const portfolioWeight = (stockValue / portfolio.totalValue) * 100

    let action: "BUY" | "SELL" | "HOLD" = "HOLD"
    let confidence: "HIGH" | "MEDIUM" | "LOW" = "MEDIUM"
    let reasoning = ""

    // Rule-based logic
    if (portfolioWeight > 40) {
      action = "SELL"
      confidence = "HIGH"
      reasoning = `Over-weighted at ${portfolioWeight.toFixed(1)}% of portfolio. Consider reducing position for better diversification.`
    } else if (stock.peRatio > 50 && priceChange > 5) {
      action = "SELL"
      confidence = "MEDIUM"
      reasoning = `High P/E ratio (${stock.peRatio}) with recent gains. May be overvalued.`
    } else if (stock.peRatio < 20 && priceChange < -3) {
      action = "BUY"
      confidence = "HIGH"
      reasoning = `Attractive P/E ratio (${stock.peRatio}) with recent dip. Good buying opportunity.`
    } else if (priceChange > 3) {
      action = "HOLD"
      reasoning = `Strong recent performance (+${priceChange.toFixed(1)}%). Monitor for continued momentum.`
    } else {
      reasoning = `Stable performance. Current position size (${portfolioWeight.toFixed(1)}%) is appropriate.`
    }

    advice.push({
      symbol: stock.symbol,
      action,
      confidence,
      reasoning,
    })
  }

  // Portfolio-level insights
  const techStocks = portfolio.stocks.filter((s) => s.sector === "Technology")
  const techWeight =
    (techStocks.reduce((sum, stock) => sum + stock.currentPrice * stock.shares, 0) / portfolio.totalValue) * 100

  if (techWeight > 70) {
    keyInsights.push(
      "Portfolio is heavily concentrated in technology sector. Consider diversifying into other sectors.",
    )
  }

  if (portfolio.stocks.length < 5) {
    keyInsights.push("Portfolio has limited diversification. Consider adding more stocks across different sectors.")
  }

  // Calculate diversification score
  const sectorCounts = portfolio.stocks.reduce(
    (acc, stock) => {
      acc[stock.sector] = (acc[stock.sector] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const diversificationScore = Math.min(100, Object.keys(sectorCounts).length * 20)

  // Determine risk level
  const avgPE = portfolio.stocks.reduce((sum, stock) => sum + stock.peRatio, 0) / portfolio.stocks.length
  let riskLevel: "LOW" | "MEDIUM" | "HIGH" = "MEDIUM"

  if (avgPE > 40 || techWeight > 80) {
    riskLevel = "HIGH"
  } else if (avgPE < 25 && diversificationScore > 60) {
    riskLevel = "LOW"
  }

  return {
    individualAdvice: advice,
    diversificationScore,
    riskLevel,
    keyInsights,
  }
}
