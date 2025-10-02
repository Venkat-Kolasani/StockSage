// Finnhub Stock API Integration
// Free tier: 60 API calls/minute
// https://finnhub.io/docs/api

export interface FinnhubQuote {
  c: number  // Current price
  d: number  // Change
  dp: number // Percent change
  h: number  // High price of the day
  l: number  // Low price of the day
  o: number  // Open price of the day
  pc: number // Previous close price
  t: number  // Timestamp
}

export interface FinnhubSearchResult {
  description: string
  displaySymbol: string
  symbol: string
  type: string
}

class FinnhubClient {
  private apiKey: string
  private baseUrl = "https://finnhub.io/api/v1"

  constructor() {
    this.apiKey = process.env.NEXT_PUBLIC_FINNHUB_API_KEY || process.env.FINNHUB_API_KEY || ""
    if (!this.apiKey) {
      console.warn("[Finnhub] API key not found. Using demo data fallback.")
    }
  }

  async getQuote(symbol: string) {
    if (!this.apiKey) {
      console.log("[Finnhub] No API key - using demo data")
      return this.getMockQuote(symbol)
    }

    try {
      const response = await fetch(
        `${this.baseUrl}/quote?symbol=${symbol}&token=${this.apiKey}`,
        { cache: "no-store" }
      )

      if (!response.ok) {
        console.error(`[Finnhub] Quote error for ${symbol}:`, response.status)
        return this.getMockQuote(symbol)
      }

      const data: FinnhubQuote = await response.json()
      
      // Check if data is valid (Finnhub returns 0s for invalid symbols)
      if (data.c === 0 && data.pc === 0) {
        return this.getMockQuote(symbol)
      }

      return {
        symbol: symbol.toUpperCase(),
        name: `${symbol.toUpperCase()} Inc.`,
        price: data.c,
        change: data.d,
        changesPercentage: data.dp,
        volume: 0,
        previousClose: data.pc,
        marketCap: 0,
        pe: 0,
      }
    } catch (error) {
      console.error(`[Finnhub] Failed to fetch quote for ${symbol}:`, error)
      return this.getMockQuote(symbol)
    }
  }

  async searchStocks(query: string) {
    if (!this.apiKey) {
      return this.getMockSearchResults(query)
    }

    try {
      const response = await fetch(
        `${this.baseUrl}/search?q=${encodeURIComponent(query)}&token=${this.apiKey}`,
        { cache: "no-store" }
      )

      if (!response.ok) {
        return this.getMockSearchResults(query)
      }

      const data = await response.json()
      return (data.result || []).slice(0, 10).map((item: FinnhubSearchResult) => ({
        symbol: item.symbol,
        name: item.description,
        exchange: item.type,
      }))
    } catch (error) {
      console.error("[Finnhub] Search failed:", error)
      return this.getMockSearchResults(query)
    }
  }

  async getBatchQuotes(symbols: string[]) {
    const quotes = await Promise.all(symbols.map(s => this.getQuote(s)))
    return quotes.filter(q => q !== null)
  }

  // Finnhub doesn't have direct gainers/losers endpoints in free tier
  // We'll use mock data for these
  async getGainers() {
    return this.getMockGainers()
  }

  async getLosers() {
    return this.getMockLosers()
  }

  private getMockQuote(symbol: string) {
    const basePrice = 100 + Math.random() * 400
    const change = (Math.random() - 0.5) * 20
    const previousClose = basePrice - change
    
    return {
      symbol: symbol.toUpperCase(),
      name: `${symbol.toUpperCase()} Inc.`,
      price: basePrice,
      change: change,
      changesPercentage: (change / previousClose) * 100,
      volume: Math.floor(Math.random() * 50000000) + 1000000,
      previousClose: previousClose,
      marketCap: Math.floor(Math.random() * 1000000000000),
      pe: Math.random() * 50 + 10,
    }
  }

  private getMockGainers() {
    return [
      { symbol: "NVDA", name: "NVIDIA Corporation", price: 487.50, change: 15.30, changesPercentage: 3.24, volume: 52000000, previousClose: 472.20, marketCap: 1200000000000, pe: 45.2 },
      { symbol: "TSLA", name: "Tesla, Inc.", price: 265.80, change: 8.20, changesPercentage: 3.18, volume: 98000000, previousClose: 257.60, marketCap: 850000000000, pe: 68.3 },
      { symbol: "AMD", name: "Advanced Micro Devices", price: 167.40, change: 5.10, changesPercentage: 3.14, volume: 45000000, previousClose: 162.30, marketCap: 270000000000, pe: 38.5 },
      { symbol: "META", name: "Meta Platforms Inc.", price: 498.20, change: 14.50, changesPercentage: 3.00, volume: 18000000, previousClose: 483.70, marketCap: 1300000000000, pe: 28.4 },
      { symbol: "GOOGL", name: "Alphabet Inc.", price: 178.30, change: 5.10, changesPercentage: 2.95, volume: 25000000, previousClose: 173.20, marketCap: 2200000000000, pe: 26.7 },
      { symbol: "MSFT", name: "Microsoft Corporation", price: 422.40, change: 11.80, changesPercentage: 2.87, volume: 22000000, previousClose: 410.60, marketCap: 3100000000000, pe: 35.2 },
      { symbol: "AMZN", name: "Amazon.com Inc.", price: 184.60, change: 4.90, changesPercentage: 2.73, volume: 48000000, previousClose: 179.70, marketCap: 1900000000000, pe: 52.8 },
      { symbol: "AAPL", name: "Apple Inc.", price: 185.20, change: 4.50, changesPercentage: 2.49, volume: 51000000, previousClose: 180.70, marketCap: 2900000000000, pe: 29.1 },
    ]
  }

  private getMockLosers() {
    return [
      { symbol: "INTC", name: "Intel Corporation", price: 28.40, change: -1.20, changesPercentage: -4.05, volume: 62000000, previousClose: 29.60, marketCap: 120000000000, pe: 15.8 },
      { symbol: "PYPL", name: "PayPal Holdings Inc.", price: 61.30, change: -2.40, changesPercentage: -3.77, volume: 12000000, previousClose: 63.70, marketCap: 68000000000, pe: 18.2 },
      { symbol: "SNAP", name: "Snap Inc.", price: 10.80, change: -0.38, changesPercentage: -3.40, volume: 28000000, previousClose: 11.18, marketCap: 17000000000, pe: -12.5 },
      { symbol: "BA", name: "Boeing Company", price: 168.20, change: -5.40, changesPercentage: -3.11, volume: 8900000, previousClose: 173.60, marketCap: 105000000000, pe: 22.4 },
      { symbol: "DIS", name: "Walt Disney Company", price: 91.50, change: -2.80, changesPercentage: -2.97, volume: 11000000, previousClose: 94.30, marketCap: 167000000000, pe: 38.9 },
      { symbol: "COIN", name: "Coinbase Global Inc.", price: 184.30, change: -5.20, changesPercentage: -2.74, volume: 5400000, previousClose: 189.50, marketCap: 42000000000, pe: 35.7 },
      { symbol: "ROKU", name: "Roku Inc.", price: 68.90, change: -1.80, changesPercentage: -2.55, volume: 6700000, previousClose: 70.70, marketCap: 9500000000, pe: -18.3 },
      { symbol: "SQ", name: "Block Inc.", price: 64.20, change: -1.60, changesPercentage: -2.43, volume: 9200000, previousClose: 65.80, marketCap: 38000000000, pe: 24.6 },
    ]
  }

  private getMockSearchResults(query: string) {
    const mockStocks = [
      { symbol: "AAPL", name: "Apple Inc.", exchange: "NASDAQ" },
      { symbol: "GOOGL", name: "Alphabet Inc.", exchange: "NASDAQ" },
      { symbol: "MSFT", name: "Microsoft Corporation", exchange: "NASDAQ" },
      { symbol: "TSLA", name: "Tesla, Inc.", exchange: "NASDAQ" },
      { symbol: "AMZN", name: "Amazon.com, Inc.", exchange: "NASDAQ" },
      { symbol: "NVDA", name: "NVIDIA Corporation", exchange: "NASDAQ" },
      { symbol: "META", name: "Meta Platforms, Inc.", exchange: "NASDAQ" },
      { symbol: "NFLX", name: "Netflix, Inc.", exchange: "NASDAQ" },
    ]

    return mockStocks.filter(
      (stock) =>
        stock.symbol.toLowerCase().includes(query.toLowerCase()) ||
        stock.name.toLowerCase().includes(query.toLowerCase()),
    )
  }
}

export const finnhub = new FinnhubClient()