"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Sparkles, Loader2, Plus } from "lucide-react"

interface SuggestedStock {
  symbol: string
  name: string
  price: number
  change: number
  changesPercentage: number
  sector?: string
  reason: string
}

interface SuggestedStocksProps {
  currentStocks?: Array<{ symbol: string; sector: string }>
  riskLevel?: string
  diversificationScore?: number
  onAddStock?: (symbol: string) => void
}

export function SuggestedStocks({
  currentStocks = [],
  riskLevel = "MEDIUM",
  diversificationScore = 50,
  onAddStock,
}: SuggestedStocksProps) {
  const [suggestions, setSuggestions] = useState<SuggestedStock[]>([])
  const [reasoning, setReasoning] = useState("")
  const [loading, setLoading] = useState(false)
  const [dataSource, setDataSource] = useState<"live" | "demo">("demo")

  useEffect(() => {
    if (currentStocks.length === 0) return

    const fetchSuggestions = async () => {
      setLoading(true)
      try {
        const response = await fetch("/api/stocks/suggested", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            currentStocks,
            riskLevel,
            diversificationScore,
          }),
        })

        const data = await response.json()
        setSuggestions(data.suggestions || [])
        setReasoning(data.reasoning || "")
        setDataSource(data.dataSource || "demo")
      } catch (error) {
        console.error("Failed to fetch suggestions:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchSuggestions()
  }, [currentStocks, riskLevel, diversificationScore])

  if (currentStocks.length === 0) {
    return null
  }

  return (
    <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              AI-Suggested Stocks to Add
            </CardTitle>
            <CardDescription className="mt-1">
              {reasoning || "Based on your portfolio composition and market trends"}
            </CardDescription>
          </div>
          <Badge 
            variant="outline" 
            className={dataSource === "live" ? "border-green-500/50 text-green-600" : "border-yellow-500/50 text-yellow-600"}
          >
            {dataSource === "live" ? "🟢 Live" : "🟡 Demo"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : suggestions.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No suggestions available at the moment
          </div>
        ) : (
          <div className="space-y-3">
            {suggestions.map((stock) => (
              <div
                key={stock.symbol}
                className="flex items-start justify-between p-4 rounded-lg border border-border bg-card/50 hover:bg-card transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold">{stock.symbol}</h4>
                    {stock.sector && (
                      <Badge variant="outline" className="text-xs">
                        {stock.sector}
                      </Badge>
                    )}
                    <Badge
                      className={
                        stock.changesPercentage >= 0
                          ? "bg-green-500/10 text-green-600"
                          : "bg-red-500/10 text-red-600"
                      }
                    >
                      {stock.changesPercentage >= 0 ? "+" : ""}
                      {stock.changesPercentage.toFixed(2)}%
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">{stock.name}</p>
                  <p className="text-sm font-medium mb-2">
                    ${stock.price.toFixed(2)}
                  </p>
                  <p className="text-xs text-muted-foreground italic">{stock.reason}</p>
                </div>
                {onAddStock && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onAddStock(stock.symbol)}
                    className="gap-2 ml-4 shrink-0"
                  >
                    <Plus className="h-4 w-4" />
                    Add
                  </Button>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}