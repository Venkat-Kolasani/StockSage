import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowRight,
  Brain,
  TrendingUp,
  Shield,
  Users,
  Zap,
  CheckCircle,
  Star,
  BarChart3,
  Target,
  DollarSign,
} from "lucide-react"
import { PortfolioAnalyzer } from "@/components/portfolio-analyzer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-accent-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">StockSage</span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">
              How it Works
            </a>
            <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">
              Pricing
            </a>
          </nav>
          <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
            <a href="/analyze">Get Started</a>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img
            src="/abstract-financial-charts-and-graphs-background-pa.jpg"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto text-center max-w-4xl relative z-10">
          <Badge variant="secondary" className="mb-6 px-4 py-2">
            <Zap className="w-4 h-4 mr-2" />
            AI-Powered Investment Advice
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-balance mb-6 leading-tight">
            Smart Stock Consultant Agent
          </h1>
          <p className="text-xl text-muted-foreground mb-4 font-medium">Where Wisdom Meets Investing</p>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
            Get clear, actionable investment advice in plain English. Perfect for beginners who want to make confident
            investment decisions without the complexity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 px-8 py-3 text-lg">
              <a href="/analyze">
                Start Analyzing Your Portfolio
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </Button>
            <Button variant="outline" size="lg" className="px-8 py-3 text-lg bg-transparent">
              View Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-16 px-4 bg-muted/30 relative">
        <div className="absolute right-0 top-0 w-1/3 h-full opacity-5">
          <img
            src="/confused-person-looking-at-complex-financial-chart.jpg"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">The Problem with Stock Market Investing</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Stock markets are overwhelming for beginners, leading to confusion and poor investment decisions.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2 border-destructive/20">
              <CardHeader>
                <CardTitle className="text-destructive">Information Overload</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Overwhelming volume of data and complex terminology makes it difficult for beginners to understand the
                  market.
                </p>
              </CardContent>
            </Card>
            <Card className="border-2 border-destructive/20">
              <CardHeader>
                <CardTitle className="text-destructive">No Clear Guidance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Existing apps show prices but fail to provide actionable advice, leaving investors to make uninformed
                  decisions.
                </p>
              </CardContent>
            </Card>
            <Card className="border-2 border-destructive/20">
              <CardHeader>
                <CardTitle className="text-destructive">Risky Decisions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Relying on unverified information from friends, YouTube, or random decisions leads to poor investment
                  outcomes.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="outline" className="mb-4">
                Our Solution
              </Badge>
              <h2 className="text-4xl font-bold mb-6 text-balance">AI-Powered Investment Advice in Plain English</h2>
              <p className="text-lg text-muted-foreground mb-8">
                StockSage provides clear, actionable investment advice that beginners can understand. No more confusion,
                no more guesswork – just smart recommendations to guide your investment journey.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-accent" />
                  <span>Simple buy, sell, hold, or diversify recommendations</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-accent" />
                  <span>Portfolio analysis and risk assessment</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-accent" />
                  <span>Real-time market data integration</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-accent" />
                  <span>Pay-as-you-go pricing model</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <Card className="p-6 shadow-2xl border-accent/20">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">Portfolio Analysis</h3>
                    <Badge variant="secondary" className="bg-accent/20 text-accent">
                      AI Powered
                    </Badge>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="w-4 h-4 text-accent" />
                        <span className="font-medium">AAPL</span>
                      </div>
                      <Badge className="bg-accent text-accent-foreground">BUY</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="flex items-center space-x-2">
                        <BarChart3 className="w-4 h-4 text-chart-2" />
                        <span className="font-medium">TSLA</span>
                      </div>
                      <Badge variant="outline">HOLD</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Target className="w-4 h-4 text-destructive" />
                        <span className="font-medium">NVDA</span>
                      </div>
                      <Badge variant="destructive">SELL</Badge>
                    </div>
                  </div>
                  <div className="pt-4 border-t">
                    <p className="text-sm text-muted-foreground">
                      <strong>Recommendation:</strong> Consider diversifying your tech holdings and taking profits on
                      NVDA while it's high.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-4 bg-muted/30 relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1/4 h-1/2 opacity-5">
          <img
            src="/ai-brain-with-neural-networks-and-financial-data-c.jpg"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Powerful Features for Smart Investing</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to make informed investment decisions, designed specifically for beginners.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow border-accent/10">
              <CardHeader>
                <Brain className="w-10 h-10 text-accent mb-4" />
                <CardTitle>AI-Powered Analysis</CardTitle>
                <CardDescription>
                  Advanced algorithms analyze your portfolio and market conditions to provide intelligent
                  recommendations.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="hover:shadow-lg transition-shadow border-accent/10">
              <CardHeader>
                <TrendingUp className="w-10 h-10 text-accent mb-4" />
                <CardTitle>Real-Time Data</CardTitle>
                <CardDescription>
                  Live stock prices and market data from Financial Modeling Prep ensure your advice is always current.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="hover:shadow-lg transition-shadow border-accent/10">
              <CardHeader>
                <Shield className="w-10 h-10 text-accent mb-4" />
                <CardTitle>Risk Management</CardTitle>
                <CardDescription>
                  Identify over-weighted positions and get diversification recommendations to protect your investments.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="hover:shadow-lg transition-shadow border-accent/10">
              <CardHeader>
                <Users className="w-10 h-10 text-accent mb-4" />
                <CardTitle>Beginner Friendly</CardTitle>
                <CardDescription>
                  Complex financial concepts explained in plain English that anyone can understand and act upon.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="hover:shadow-lg transition-shadow border-accent/10">
              <CardHeader>
                <BarChart3 className="w-10 h-10 text-accent mb-4" />
                <CardTitle>Portfolio Tracking</CardTitle>
                <CardDescription>
                  Easy portfolio input and tracking with usage counters to monitor your analysis history.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="hover:shadow-lg transition-shadow border-accent/10">
              <CardHeader>
                <DollarSign className="w-10 h-10 text-accent mb-4" />
                <CardTitle>Fair Pricing</CardTitle>
                <CardDescription>
                  Pay-as-you-go model means you only pay for the advice you use, with transparent usage tracking.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 relative">
        <div className="absolute right-0 bottom-0 w-1/3 h-1/2 opacity-5">
          <img
            src="/step-by-step-workflow-diagram-with-arrows-and-icon.jpg"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How StockSage Works</h2>
            <p className="text-lg text-muted-foreground">Get professional investment advice in three simple steps</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-accent-foreground">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Input Your Portfolio</h3>
              <p className="text-muted-foreground">
                Simply enter your stock tickers and holdings using our intuitive interface. Add or remove stocks as
                needed.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-accent-foreground">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">AI Analysis</h3>
              <p className="text-muted-foreground">
                Our AI engine analyzes your portfolio using real-time market data and advanced algorithms to generate
                insights.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-accent-foreground">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Get Clear Advice</h3>
              <p className="text-muted-foreground">
                Receive actionable recommendations in plain English: buy, sell, hold, or diversify with clear
                explanations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Portfolio Analyzer */}
      <section className="py-20 px-4 bg-gradient-to-br from-background via-muted/20 to-background">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 bg-accent/10 text-accent border-accent/20">
              <Zap className="w-4 h-4 mr-2" />
              Try It Live
            </Badge>
            <h2 className="text-4xl font-bold mb-4">Experience StockSage Now</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Enter your actual portfolio below and get instant AI-powered investment advice. See exactly how StockSage
              can help you make smarter investment decisions.
            </p>
          </div>

          <PortfolioAnalyzer />
        </div>
      </section>

      {/* Example Portfolio Demo */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              Live Demo
            </Badge>
            <h2 className="text-4xl font-bold mb-4">See StockSage in Action</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Here's an example of how StockSage analyzes a typical beginner's portfolio and provides actionable advice.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Input Portfolio */}
            <div>
              <h3 className="text-2xl font-semibold mb-6 flex items-center">
                <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center mr-3">
                  <span className="text-sm font-bold text-accent-foreground">1</span>
                </div>
                Sample Portfolio Input
              </h3>
              <Card className="p-6 border-accent/20">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-background rounded-lg border">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">AAPL</span>
                      </div>
                      <div>
                        <p className="font-medium">Apple Inc.</p>
                        <p className="text-sm text-muted-foreground">Technology</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">50 shares</p>
                      <p className="text-sm text-muted-foreground">$8,750</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-background rounded-lg border">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">TSLA</span>
                      </div>
                      <div>
                        <p className="font-medium">Tesla Inc.</p>
                        <p className="text-sm text-muted-foreground">Automotive</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">25 shares</p>
                      <p className="text-sm text-muted-foreground">$6,250</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-background rounded-lg border">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">NVDA</span>
                      </div>
                      <div>
                        <p className="font-medium">NVIDIA Corp.</p>
                        <p className="text-sm text-muted-foreground">Technology</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">15 shares</p>
                      <p className="text-sm text-muted-foreground">$10,500</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-background rounded-lg border">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">MSFT</span>
                      </div>
                      <div>
                        <p className="font-medium">Microsoft Corp.</p>
                        <p className="text-sm text-muted-foreground">Technology</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">20 shares</p>
                      <p className="text-sm text-muted-foreground">$8,400</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Total Portfolio Value:</span>
                      <span className="text-xl font-bold text-accent">$33,900</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* AI Analysis Results */}
            <div>
              <h3 className="text-2xl font-semibold mb-6 flex items-center">
                <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center mr-3">
                  <span className="text-sm font-bold text-accent-foreground">2</span>
                </div>
                AI Analysis & Recommendations
              </h3>

              {/* Portfolio Overview */}
              <Card className="p-6 mb-6 border-accent/20">
                <h4 className="font-semibold mb-4 flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2 text-accent" />
                  Portfolio Overview
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Risk Level:</span>
                    <Badge variant="outline" className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20">
                      Moderate-High
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Diversification:</span>
                    <Badge variant="outline" className="bg-red-500/10 text-red-600 border-red-500/20">
                      Poor (80% Tech)
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Growth Potential:</span>
                    <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/20">
                      High
                    </Badge>
                  </div>
                </div>
              </Card>

              {/* Individual Stock Recommendations */}
              <Card className="p-6 border-accent/20">
                <h4 className="font-semibold mb-4 flex items-center">
                  <Target className="w-5 h-5 mr-2 text-accent" />
                  Stock Recommendations
                </h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                    <div className="flex items-center space-x-3">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                      <div>
                        <span className="font-medium">AAPL</span>
                        <p className="text-xs text-muted-foreground">Strong fundamentals, good entry point</p>
                      </div>
                    </div>
                    <Badge className="bg-green-600 text-white">BUY MORE</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                    <div className="flex items-center space-x-3">
                      <BarChart3 className="w-4 h-4 text-blue-600" />
                      <div>
                        <span className="font-medium">MSFT</span>
                        <p className="text-xs text-muted-foreground">Stable performer, maintain position</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-blue-500/10 text-blue-600 border-blue-500/20">
                      HOLD
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                    <div className="flex items-center space-x-3">
                      <Target className="w-4 h-4 text-yellow-600" />
                      <div>
                        <span className="font-medium">TSLA</span>
                        <p className="text-xs text-muted-foreground">High volatility, reduce exposure</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20">
                      REDUCE
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-red-500/10 rounded-lg border border-red-500/20">
                    <div className="flex items-center space-x-3">
                      <TrendingUp className="w-4 h-4 text-red-600 rotate-180" />
                      <div>
                        <span className="font-medium">NVDA</span>
                        <p className="text-xs text-muted-foreground">Overvalued, take profits</p>
                      </div>
                    </div>
                    <Badge variant="destructive">SELL 50%</Badge>
                  </div>
                </div>
              </Card>

              {/* Key Insights */}
              <Card className="p-6 mt-6 border-accent/20 bg-accent/5">
                <h4 className="font-semibold mb-4 flex items-center">
                  <Brain className="w-5 h-5 mr-2 text-accent" />
                  Key Insights
                </h4>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                    <p>
                      <strong>Diversification Alert:</strong> 80% of your portfolio is in technology stocks. Consider
                      adding healthcare, finance, or consumer goods.
                    </p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                    <p>
                      <strong>Profit Taking:</strong> NVDA has gained 150% this year. Consider taking some profits and
                      reinvesting in undervalued sectors.
                    </p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                    <p>
                      <strong>Growth Opportunity:</strong> Your portfolio has strong growth potential but needs better
                      risk management through diversification.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 px-8 py-3 text-lg">
              Analyze Your Portfolio Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <p className="text-sm text-muted-foreground mt-3">
              Get personalized advice for your actual portfolio • First analysis free
            </p>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-8">Trusted by Beginner Investors</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 border-accent/10">
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-accent fill-current" />
                ))}
              </div>
              <p className="text-muted-foreground mb-4">
                "Finally, investment advice I can actually understand! StockSage helped me make my first confident stock
                purchase."
              </p>
              <p className="font-semibold">Sarah M.</p>
              <p className="text-sm text-muted-foreground">New Investor</p>
            </Card>
            <Card className="p-6 border-accent/10">
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-accent fill-current" />
                ))}
              </div>
              <p className="text-muted-foreground mb-4">
                "The AI recommendations are spot-on. I've improved my portfolio diversification significantly."
              </p>
              <p className="font-semibold">Mike R.</p>
              <p className="text-sm text-muted-foreground">Retail Investor</p>
            </Card>
            <Card className="p-6 border-accent/10">
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-accent fill-current" />
                ))}
              </div>
              <p className="text-muted-foreground mb-4">
                "Love the pay-as-you-go model. I only pay for advice when I need it, and it's always worth it."
              </p>
              <p className="font-semibold">Jennifer L.</p>
              <p className="text-sm text-muted-foreground">Part-time Trader</p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 relative">
        <div className="absolute inset-0 opacity-5">
          <img
            src="/upward-trending-financial-charts-and-growth-arrows.jpg"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <h2 className="text-4xl font-bold mb-6 text-balance">Ready to Make Smarter Investment Decisions?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of beginner investors who trust StockSage for clear, actionable investment advice.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 px-8 py-3 text-lg">
              Start Your Free Analysis
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <p className="text-sm text-muted-foreground">No credit card required • Pay only for what you use</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30 py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                  <Brain className="w-5 h-5 text-accent-foreground" />
                </div>
                <span className="text-xl font-bold">StockSage</span>
              </div>
              <p className="text-muted-foreground">Where Wisdom Meets Investing. Smart stock advice for everyone.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    API
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Careers
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Privacy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2025 StockSage. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
