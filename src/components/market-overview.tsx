"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, TrendingDown, Activity, Loader2, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

interface StockItem {
  symbol: string
  name: string
  price: number
  change: number
  changesPercentage: number
  volume: number
}

export function MarketOverview() {
  const [gainers, setGainers] = useState<StockItem[]>([])
  const [losers, setLosers] = useState<StockItem[]>([])
  const [loading, setLoading] = useState(true)
  const [dataSource, setDataSource] = useState<"live" | "demo">("demo")
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null)

  const fetchMarketData = async () => {
    setLoading(true)
    try {
      const [gainersRes, losersRes] = await Promise.all([
        fetch("/api/stocks/gainers"),
        fetch("/api/stocks/losers"),
      ])

      const [gainersData, losersData] = await Promise.all([
        gainersRes.json(),
        losersRes.json(),
      ])

      setGainers(gainersData.gainers || [])
      setLosers(losersData.losers || [])
      setDataSource(gainersData.dataSource || "demo")
      setLastUpdate(new Date())
    } catch (error) {
      console.error("Failed to fetch market data:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMarketData()
    // Refresh every 5 minutes
    const interval = setInterval(fetchMarketData, 300000)
    return () => clearInterval(interval)
  }, [])

  const renderStockList = (stocks: StockItem[], type: "gainer" | "loser") => {
    if (loading) {
      return (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      )
    }

    if (stocks.length === 0) {
      return (
        <div className="text-center py-8 text-muted-foreground">
          No data available
        </div>
      )
    }

    return (
      <div className="space-y-2">
        {stocks.map((stock, index) => {
          // Add safety checks for undefined values
          const price = stock.price ?? 0
          const changesPercentage = stock.changesPercentage ?? 0
          
          return (
            <div
              key={stock.symbol}
              className="flex items-center justify-between p-3 rounded-lg border border-border bg-card/50 hover:bg-card transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-xs font-medium text-muted-foreground w-6">
                  #{index + 1}
                </span>
                <div>
                  <h4 className="font-semibold">{stock.symbol}</h4>
                  <p className="text-xs text-muted-foreground">{stock.name}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold">${price.toFixed(2)}</p>
                <Badge
                  className={
                    changesPercentage >= 0
                      ? "bg-green-500/10 text-green-600"
                      : "bg-red-500/10 text-red-600"
                  }
                >
                  {changesPercentage >= 0 ? "+" : ""}
                  {changesPercentage.toFixed(2)}%
                </Badge>
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Market Overview
            </CardTitle>
            <CardDescription>Top gainers and losers</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Badge 
              variant="outline" 
              className={dataSource === "live" ? "border-green-500/50 text-green-600" : "border-yellow-500/50 text-yellow-600"}
            >
              {dataSource === "live" ? "🟢 Live Data" : "🟡 Demo Data"}
            </Badge>
            <Button
              variant="ghost"
              size="icon"
              onClick={fetchMarketData}
              disabled={loading}
              className="h-8 w-8"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </div>
        {lastUpdate && (
          <p className="text-xs text-muted-foreground mt-2">
            Last updated: {lastUpdate.toLocaleTimeString()}
          </p>
        )}
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="gainers" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="gainers" className="gap-2">
              <TrendingUp className="h-4 w-4" />
              Top Gainers
            </TabsTrigger>
            <TabsTrigger value="losers" className="gap-2">
              <TrendingDown className="h-4 w-4" />
              Top Losers
            </TabsTrigger>
          </TabsList>
          <TabsContent value="gainers" className="mt-4">
            {renderStockList(gainers, "gainer")}
          </TabsContent>
          <TabsContent value="losers" className="mt-4">
            {renderStockList(losers, "loser")}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}