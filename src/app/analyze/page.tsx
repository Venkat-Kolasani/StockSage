import { PortfolioAnalyzer } from "@/components/portfolio-analyzer"
import { MarketOverview } from "@/components/market-overview"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Brain } from "lucide-react"
import Link from "next/link"

export default function AnalyzePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Home</span>
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-accent-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">StockSage</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Portfolio Analysis</h1>
            <p className="text-lg text-muted-foreground">
              Get AI-powered investment advice with real-time market data
            </p>
          </div>
          
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Left Column: Market Overview */}
            <div className="lg:col-span-1">
              <MarketOverview />
            </div>

            {/* Right Column: Portfolio Analyzer */}
            <div className="lg:col-span-2">
              <PortfolioAnalyzer />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}