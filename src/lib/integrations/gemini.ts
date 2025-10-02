// Google Gemini AI integration for portfolio analysis
// Free tier available at https://ai.google.dev/

import { GoogleGenerativeAI } from "@google/generative-ai"

class GeminiClient {
  private genAI: GoogleGenerativeAI | null = null
  private model: any = null

  constructor() {
    const apiKey = process.env.GEMINI_API_KEY
    if (apiKey) {
      this.genAI = new GoogleGenerativeAI(apiKey)
      // Using gemini-1.5-flash for free tier
      this.model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" })
    } else {
      console.warn("[Gemini] API key not configured - AI features will use fallback")
    }
  }

  async generatePortfolioAdvice(
    portfolioData: {
      stocks: Array<{
        symbol: string
        shares: number
        currentPrice: number
        changePercent: number
        sector: string
        pe?: number
      }>
      totalValue: number
      totalGainLoss: number
      totalGainLossPercent: number
      diversificationScore: number
      riskLevel: string
    }
  ): Promise<string> {
    if (!this.model) {
      return this.getFallbackAdvice(portfolioData)
    }

    try {
      const prompt = `You are a professional financial advisor. Provide concise, actionable investment advice for this portfolio in 2-3 sentences.

Portfolio Summary:
${portfolioData.stocks.map(s => `- ${s.symbol}: ${s.shares} shares @ $${s.currentPrice} (${s.changePercent >= 0 ? '+' : ''}${s.changePercent.toFixed(2)}%) [${s.sector}]`).join('\n')}

Total Value: $${portfolioData.totalValue.toLocaleString()}
Total Gain/Loss: ${portfolioData.totalGainLoss >= 0 ? '+' : ''}$${portfolioData.totalGainLoss.toLocaleString()} (${portfolioData.totalGainLossPercent.toFixed(2)}%)
Diversification: ${portfolioData.diversificationScore}/100
Risk Level: ${portfolioData.riskLevel}

Focus on overall strategy, not individual stocks. Be beginner-friendly and encouraging.`

      const result = await this.model.generateContent(prompt)
      const response = await result.response
      return response.text()
    } catch (error) {
      console.error("[Gemini] AI generation failed:", error)
      return this.getFallbackAdvice(portfolioData)
    }
  }

  async generateStockInsights(
    symbol: string,
    stockData: {
      price: number
      changePercent: number
      sector: string
      pe?: number
      marketCap?: number
      yearHigh?: number
      yearLow?: number
    }
  ): Promise<string> {
    if (!this.model) {
      return this.getFallbackStockInsight(symbol, stockData)
    }

    try {
      const prompt = `As a financial analyst, provide a brief 1-2 sentence insight about ${symbol} stock.

Current Price: $${stockData.price}
Change: ${stockData.changePercent >= 0 ? '+' : ''}${stockData.changePercent.toFixed(2)}%
Sector: ${stockData.sector}
${stockData.pe ? `P/E Ratio: ${stockData.pe}` : ''}
${stockData.marketCap ? `Market Cap: $${(stockData.marketCap / 1e9).toFixed(2)}B` : ''}

Be concise and actionable.`

      const result = await this.model.generateContent(prompt)
      const response = await result.response
      return response.text()
    } catch (error) {
      console.error("[Gemini] Stock insight generation failed:", error)
      return this.getFallbackStockInsight(symbol, stockData)
    }
  }

  private getFallbackAdvice(portfolioData: any): string {
    const { totalGainLossPercent, diversificationScore, riskLevel } = portfolioData
    
    let advice = ""
    
    if (totalGainLossPercent > 5) {
      advice = "Your portfolio is performing well with strong gains. "
    } else if (totalGainLossPercent < -5) {
      advice = "Your portfolio is experiencing losses, but this is normal market behavior. "
    } else {
      advice = "Your portfolio shows stable performance. "
    }
    
    if (diversificationScore < 40) {
      advice += "Consider diversifying across more sectors to reduce risk. "
    } else if (diversificationScore > 80) {
      advice += "Your portfolio shows excellent diversification. "
    }
    
    if (riskLevel === "HIGH") {
      advice += "Your current allocation carries higher risk - consider rebalancing for stability."
    } else if (riskLevel === "LOW") {
      advice += "Your conservative approach provides good stability for long-term growth."
    } else {
      advice += "Your balanced approach aligns well with moderate risk tolerance."
    }
    
    return advice
  }

  private getFallbackStockInsight(symbol: string, stockData: any): string {
    const { changePercent, pe } = stockData
    
    if (changePercent > 5) {
      return `${symbol} is showing strong momentum with significant gains today.`
    } else if (changePercent < -5) {
      return `${symbol} is experiencing a downturn, which may present a buying opportunity if fundamentals remain strong.`
    } else if (pe && pe < 15) {
      return `${symbol} appears reasonably valued with a low P/E ratio.`
    }
    
    return `${symbol} is trading within normal ranges.`
  }
}

export const gemini = new GeminiClient()