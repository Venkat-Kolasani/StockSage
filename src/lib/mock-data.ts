import type { Stock } from "./types"

// Mock stock data - simulating real-time stock prices
export const MOCK_STOCK_DATA: Record<string, Omit<Stock, "shares">> = {
  AAPL: {
    symbol: "AAPL",
    currentPrice: 185.92,
    previousClose: 182.31,
    marketCap: "2.85T",
    peRatio: 28.5,
    sector: "Technology",
  },
  TSLA: {
    symbol: "TSLA",
    currentPrice: 248.5,
    previousClose: 245.12,
    marketCap: "791B",
    peRatio: 65.2,
    sector: "Automotive",
  },
  NVDA: {
    symbol: "NVDA",
    currentPrice: 875.3,
    previousClose: 862.15,
    marketCap: "2.16T",
    peRatio: 73.8,
    sector: "Technology",
  },
  MSFT: {
    symbol: "MSFT",
    currentPrice: 420.15,
    previousClose: 418.9,
    marketCap: "3.12T",
    peRatio: 32.1,
    sector: "Technology",
  },
  GOOGL: {
    symbol: "GOOGL",
    currentPrice: 142.8,
    previousClose: 140.25,
    marketCap: "1.78T",
    peRatio: 25.4,
    sector: "Technology",
  },
  AMZN: {
    symbol: "AMZN",
    currentPrice: 155.2,
    previousClose: 152.75,
    marketCap: "1.61T",
    peRatio: 48.9,
    sector: "Consumer Discretionary",
  },
  META: {
    symbol: "META",
    currentPrice: 485.75,
    previousClose: 482.3,
    marketCap: "1.23T",
    peRatio: 24.7,
    sector: "Technology",
  },
  NFLX: {
    symbol: "NFLX",
    currentPrice: 625.4,
    previousClose: 620.85,
    marketCap: "277B",
    peRatio: 42.3,
    sector: "Communication Services",
  },
}

export function getStockData(symbol: string): Omit<Stock, "shares"> | null {
  return MOCK_STOCK_DATA[symbol.toUpperCase()] || null
}

export function getAllAvailableStocks(): string[] {
  return Object.keys(MOCK_STOCK_DATA)
}
