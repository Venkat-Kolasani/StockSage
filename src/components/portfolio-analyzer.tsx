"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Loader2, Plus, Trash2, TrendingUp, TrendingDown, Minus, BarChart3, Sparkles, RefreshCw } from "lucide-react"
import { SuggestedStocks } from "@/components/suggested-stocks"
import type { PortfolioAnalysis } from "@/lib/types"

interface StockInput {
  symbol: string
  shares: number
}

export function PortfolioAnalyzer() {
  const [stocks, setStocks] = useState<StockInput[]>([{ symbol: "", shares: 0 }])
  const [analysis, setAnalysis] = useState<PortfolioAnalysis | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null)

  const addStock = () => {
    setStocks([...stocks, { symbol: "", shares: 0 }])
  }

  const removeStock = (index: number) => {
    setStocks(stocks.filter((_, i) => i !== index))
  }

  const updateStock = (index: number, field: keyof StockInput, value: string | number) => {
    const updated = [...stocks]
    updated[index] = { ...updated[index], [field]: value }
    setStocks(updated)
  }

  const analyzePortfolio = async () => {
    const validStocks = stocks.filter((s) => s.symbol && s.shares > 0)
    if (validStocks.length === 0) {
      setError("Please add at least one stock with shares")
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/portfolio/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stocks: validStocks }),
      })

      if (!response.ok) {
        throw new Error("Failed to analyze portfolio")
      }

      const result = await response.json()
      setAnalysis(result)
      setLastUpdate(new Date())
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const getActionColor = (action: string) => {
    switch (action) {
      case "BUY":
        return "bg-green-500/10 text-green-600 border-green-500/20"
      case "SELL":
        return "bg-red-500/10 text-red-600 border-red-500/20"
      case "HOLD":
        return "bg-blue-500/10 text-blue-600 border-blue-500/20"
      default:
        return "bg-gray-500/10 text-gray-600 border-gray-500/20"
    }
  }

  const getConfidenceColor = (confidence: string) => {
    switch (confidence) {
      case "HIGH":
        return "bg-green-500/10 text-green-600"
      case "MEDIUM":
        return "bg-yellow-500/10 text-yellow-600"
      case "LOW":
        return "bg-red-500/10 text-red-600"
      default:
        return "bg-gray-500/10 text-gray-600"
    }
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "LOW":
        return "text-green-400"
      case "MEDIUM":
        return "text-yellow-400"
      case "HIGH":
        return "text-red-400"
      default:
        return "text-gray-400"
    }
  }

  const handleAddSuggestedStock = (symbol: string) => {
    setStocks([...stocks, { symbol, shares: 0 }])
  }

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Your Portfolio
          </CardTitle>
          <CardDescription>Add your stocks and shares to get real-time AI analysis</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {stocks.map((stock, index) => (
            <div key={index} className="flex gap-3 items-center">
              <Input
                placeholder="Stock Symbol (e.g., AAPL)"
                value={stock.symbol}
                onChange={(e) => updateStock(index, "symbol", e.target.value.toUpperCase())}
                className="flex-1"
              />
              <Input
                type="number"
                placeholder="Shares"
                value={stock.shares || ""}
                onChange={(e) => updateStock(index, "shares", Number.parseInt(e.target.value) || 0)}
                className="w-32"
              />
              {stocks.length > 1 && (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => removeStock(index)}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={addStock}
              className="gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Stock
            </Button>
            <Button
              onClick={analyzePortfolio}
              disabled={loading}
              className="gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  Analyze with AI
                </>
              )}
            </Button>
            {analysis && (
              <Button
                variant="ghost"
                onClick={analyzePortfolio}
                disabled={loading}
                className="gap-2 ml-auto"
              >
                <RefreshCw className="h-4 w-4" />
                Refresh
              </Button>
            )}
          </div>

          {error && (
            <div className="text-destructive text-sm bg-destructive/10 p-3 rounded-lg border border-destructive/20">
              {error}
            </div>
          )}

          {lastUpdate && (
            <div className="text-xs text-muted-foreground">
              Last updated: {lastUpdate.toLocaleTimeString()}
            </div>
          )}
        </CardContent>
      </Card>

      {analysis && (
        <div className="space-y-6">
          {/* Portfolio Overview with Enhanced Metrics */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardDescription>Total Value</CardDescription>
                <CardTitle className="text-2xl">
                  ${analysis.portfolio.totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Badge variant="outline" className={analysis.dataSource === "live" ? "border-green-500/50 text-green-400" : "border-yellow-500/50 text-yellow-400"}>
                  {analysis.dataSource === "live" ? "🟢 Live Data" : "🟡 Demo Data"}
                </Badge>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardDescription>Gain/Loss</CardDescription>
                <CardTitle className={`text-2xl flex items-center gap-2 ${analysis.portfolio.totalGainLoss >= 0 ? "text-green-400" : "text-red-400"}`}>
                  {analysis.portfolio.totalGainLoss >= 0 ? <TrendingUp className="h-5 w-5" /> : <TrendingDown className="h-5 w-5" />}
                  {analysis.portfolio.totalGainLoss >= 0 ? "+" : ""}${Math.abs(analysis.portfolio.totalGainLoss).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Badge className={analysis.portfolio.totalGainLoss >= 0 ? "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-600"}>
                  {analysis.portfolio.totalGainLossPercent >= 0 ? "+" : ""}{analysis.portfolio.totalGainLossPercent.toFixed(2)}%
                </Badge>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardDescription>Diversification</CardDescription>
                <CardTitle className="text-2xl">{analysis.diversificationScore}/100</CardTitle>
              </CardHeader>
              <CardContent>
                <Progress value={analysis.diversificationScore} className="h-2" />
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardDescription>Risk Level</CardDescription>
                <CardTitle className={`text-2xl ${getRiskColor(analysis.riskLevel)}`}>
                  {analysis.riskLevel}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">
                  {analysis.riskLevel === "LOW" ? "Conservative" : analysis.riskLevel === "MEDIUM" ? "Balanced" : "Aggressive"}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* AI Overall Advice */}
          <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                AI Investment Advice
                <Badge variant="outline" className="ml-auto">Powered by Gemini</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground leading-relaxed">{analysis.overallAdvice}</p>
            </CardContent>
          </Card>

          {/* NEW: Suggested Stocks */}
          <SuggestedStocks
            currentStocks={analysis.portfolio.stocks.map(s => ({
              symbol: s.symbol,
              sector: s.sector
            }))}
            riskLevel={analysis.riskLevel}
            diversificationScore={analysis.diversificationScore}
            onAddStock={handleAddSuggestedStock}
          />

          {/* Portfolio Holdings */}
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle>Portfolio Holdings</CardTitle>
              <CardDescription>{analysis.portfolio.stocks.length} stocks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {analysis.portfolio.stocks.map((stock) => {
                  const change = ((stock.currentPrice - stock.previousClose) / stock.previousClose) * 100
                  const value = stock.currentPrice * stock.shares
                  const portfolioWeight = (value / analysis.portfolio.totalValue) * 100
                  
                  return (
                    <div key={stock.symbol} className="flex items-center justify-between p-3 rounded-lg border border-border bg-card/50">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold">{stock.symbol}</h4>
                          <Badge variant="outline" className="text-xs">{stock.sector}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {stock.shares} shares × ${stock.currentPrice.toFixed(2)} = ${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge className={change >= 0 ? "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-600"}>
                          {change >= 0 ? "+" : ""}{change.toFixed(2)}%
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">
                          {portfolioWeight.toFixed(1)}% of portfolio
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Individual Stock Analysis */}
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle>Individual Stock Recommendations</CardTitle>
              <CardDescription>AI-powered insights for each holding</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {analysis.individualAdvice.map((advice) => (
                  <div key={advice.symbol} className="p-4 rounded-lg border border-border bg-card/50">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold">{advice.symbol}</h4>
                        <Badge className={getActionColor(advice.action)}>{advice.action}</Badge>
                        <Badge className={getConfidenceColor(advice.confidence)} variant="outline">{advice.confidence}</Badge>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{advice.reasoning}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Key Insights */}
          {analysis.keyInsights.length > 0 && (
            <Card className="border-blue-500/20 bg-blue-500/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  💡 Key Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {analysis.keyInsights.map((insight, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <Minus className="h-4 w-4 mt-0.5 text-blue-400 flex-shrink-0" />
                      <span>{insight}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  )
}