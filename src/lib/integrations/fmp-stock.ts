// Financial Modeling Prep API integration for real-time stock data
// Free tier: 250 calls/day - https://financialmodelingprep.com

export interface FMPQuote {
  symbol: string
  name: string
  price: number
  changesPercentage: number
  change: number
  dayLow: number
  dayHigh: number
  yearHigh: number
  yearLow: number
  marketCap: number
  priceAvg50: number
  priceAvg200: number
  volume: number
  avgVolume: number
  open: number
  previousClose: number
  eps: number
  pe: number
  earningsAnnouncement?: string
  sharesOutstanding: number
  timestamp: number
}

export interface FMPSearchResult {
  symbol: string
  name: string
  currency: string
  stockExchange: string
  exchangeShortName: string
}

class FMPStockClient {
  private baseUrl = "https://financialmodelingprep.com/api/v3"
  private apiKey: string

  constructor() {
    // FMP API key should be available on both client and server
    this.apiKey = process.env.NEXT_PUBLIC_FMP_API_KEY || ""
    if (!this.apiKey) {
      console.warn("[FMP] API key not configured - using demo key with limited access")
      this.apiKey = "demo"
    }
  }

  async getQuote(symbol: string): Promise<FMPQuote | null> {
    try {
      const response = await fetch(
        `${this.baseUrl}/quote/${symbol}?apikey=${this.apiKey}`,
        { cache: "no-store" }
      )
      
      if (!response.ok) {
        console.error(`[FMP] API error for ${symbol}:`, response.status)
        return null
      }

      const data = await response.json()
      return data[0] || null
    } catch (error) {
      console.error(`[FMP] Failed to fetch quote for ${symbol}:`, error)
      return null
    }
  }

  async getBatchQuotes(symbols: string[]): Promise<FMPQuote[]> {
    try {
      const symbolsParam = symbols.join(",")
      const response = await fetch(
        `${this.baseUrl}/quote/${symbolsParam}?apikey=${this.apiKey}`,
        { cache: "no-store" }
      )
      
      if (!response.ok) {
        console.error("[FMP] API batch error:", response.status, await response.text())
        return []
      }

      const data = await response.json()
      return data || []
    } catch (error) {
      console.error("[FMP] Failed to fetch batch quotes:", error)
      return []
    }
  }

  async searchStocks(query: string): Promise<FMPSearchResult[]> {
    try {
      const response = await fetch(
        `${this.baseUrl}/search?query=${encodeURIComponent(query)}&limit=10&apikey=${this.apiKey}`,
        { cache: "no-store" }
      )
      
      if (!response.ok) {
        return []
      }

      const data = await response.json()
      return data || []
    } catch (error) {
      console.error("[FMP] Search failed:", error)
      return []
    }
  }

  async getProfile(symbol: string) {
    try {
      const response = await fetch(
        `${this.baseUrl}/profile/${symbol}?apikey=${this.apiKey}`,
        { cache: "no-store" }
      )
      
      if (!response.ok) {
        return null
      }

      const data = await response.json()
      return data[0] || null
    } catch (error) {
      console.error(`[FMP] Failed to fetch profile for ${symbol}:`, error)
      return null
    }
  }

  async getGainers(): Promise<FMPQuote[]> {
    try {
      const response = await fetch(
        `${this.baseUrl}/stock_market/gainers?apikey=${this.apiKey}`,
        { cache: "no-store" }
      )
      
      if (!response.ok) {
        console.error("[FMP] Gainers API error:", response.status)
        return []
      }

      const data = await response.json()
      return data || []
    } catch (error) {
      console.error("[FMP] Failed to fetch gainers:", error)
      return []
    }
  }

  async getLosers(): Promise<FMPQuote[]> {
    try {
      const response = await fetch(
        `${this.baseUrl}/stock_market/losers?apikey=${this.apiKey}`,
        { cache: "no-store" }
      )
      
      if (!response.ok) {
        console.error("[FMP] Losers API error:", response.status)
        return []
      }

      const data = await response.json()
      return data || []
    } catch (error) {
      console.error("[FMP] Failed to fetch losers:", error)
      return []
    }
  }

  async getActives(): Promise<FMPQuote[]> {
    try {
      const response = await fetch(
        `${this.baseUrl}/stock_market/actives?apikey=${this.apiKey}`,
        { cache: "no-store" }
      )
      
      if (!response.ok) {
        console.error("[FMP] Actives API error:", response.status)
        return []
      }

      const data = await response.json()
      return data || []
    } catch (error) {
      console.error("[FMP] Failed to fetch actives:", error)
      return []
    }
  }
}

export const fmpStock = new FMPStockClient()