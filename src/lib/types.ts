export interface Stock {
  symbol: string
  shares: number
  currentPrice: number
  previousClose: number
  marketCap: string
  peRatio: number
  sector: string
}

export interface Portfolio {
  stocks: Stock[]
  totalValue: number
  totalGainLoss: number
  totalGainLossPercent: number
}

export interface StockAdvice {
  symbol: string
  action: "BUY" | "SELL" | "HOLD"
  confidence: "HIGH" | "MEDIUM" | "LOW"
  reasoning: string
  targetPrice?: number
}

export interface PortfolioAnalysis {
  portfolio: Portfolio
  individualAdvice: StockAdvice[]
  overallAdvice: string
  diversificationScore: number
  riskLevel: "LOW" | "MEDIUM" | "HIGH"
  keyInsights: string[]
  dataSource?: "live" | "mock"
}

export interface UsageStats {
  portfoliosAnalyzed: number
  adviceGenerated: number
  lastAnalysis: string
}
