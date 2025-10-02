// Pathway integration for real-time stock data
export class PathwayClient {
  private apiKey: string
  private baseUrl = "https://api.pathway.com/v1"

  constructor(apiKey?: string) {
    this.apiKey = apiKey || process.env.PATHWAY_API_KEY || ""
    if (!this.apiKey) {
      console.warn("[v0] Pathway API key not found. Using mock data instead.")
    }
  }

  async getStockData(symbols: string[]) {
    if (!this.apiKey) {
      console.log("[v0] Pathway API unavailable - using mock data")
      // Return mock data when API key is not available
      return this.getMockStockData(symbols)
    }

    try {
      const response = await fetch(`${this.baseUrl}/stocks/batch`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          symbols: symbols,
          fields: ["price", "change", "change_percent", "volume", "market_cap"],
        }),
      })

      if (!response.ok) {
        throw new Error(`Pathway API error: ${response.status}`)
      }

      const data = await response.json()
      console.log("[v0] Pathway stock data fetched for:", symbols)
      return { success: true, data: data.stocks }
    } catch (error) {
      console.error("[v0] Pathway API failed, using mock data:", error)
      return this.getMockStockData(symbols)
    }
  }

  private getMockStockData(symbols: string[]) {
    // Mock data generator for when Pathway API is unavailable
    const mockData = symbols.map((symbol) => ({
      symbol,
      price: Math.random() * 300 + 50, // Random price between $50-$350
      change: (Math.random() - 0.5) * 20, // Random change between -$10 to +$10
      change_percent: (Math.random() - 0.5) * 10, // Random % change between -5% to +5%
      volume: Math.floor(Math.random() * 10000000), // Random volume
      market_cap: Math.floor(Math.random() * 1000000000000), // Random market cap
      last_updated: new Date().toISOString(),
    }))

    return { success: true, data: mockData, mock: true }
  }

  async searchStocks(query: string) {
    if (!this.apiKey) {
      console.log("[v0] Pathway search unavailable - using mock results")
      return this.getMockSearchResults(query)
    }

    try {
      const response = await fetch(`${this.baseUrl}/stocks/search?q=${encodeURIComponent(query)}`, {
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
        },
      })

      if (!response.ok) {
        throw new Error(`Pathway API error: ${response.status}`)
      }

      const data = await response.json()
      return { success: true, data: data.results }
    } catch (error) {
      console.error("[v0] Pathway search failed, using mock results:", error)
      return this.getMockSearchResults(query)
    }
  }

  private getMockSearchResults(query: string) {
    // Mock search results for common stocks
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

    const filtered = mockStocks.filter(
      (stock) =>
        stock.symbol.toLowerCase().includes(query.toLowerCase()) ||
        stock.name.toLowerCase().includes(query.toLowerCase()),
    )

    return { success: true, data: filtered, mock: true }
  }
}

export const pathway = new PathwayClient()
