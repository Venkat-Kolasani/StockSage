// Flexprice integration for usage tracking and billing
export class FlexpriceClient {
  private apiKey: string
  private baseUrl = "https://api.flexprice.io/v1"

  constructor(apiKey?: string) {
    this.apiKey = apiKey || process.env.FLEXPRICE_API_KEY || ""
    if (!this.apiKey) {
      console.warn("[v0] Flexprice API key not found. Usage tracking will be disabled.")
    }
  }

  async trackUsage(event: {
    userId?: string
    eventType: "portfolio_analysis" | "stock_search" | "advice_generation"
    metadata?: Record<string, any>
  }) {
    if (!this.apiKey) {
      console.log("[v0] Flexprice tracking skipped - no API key")
      return { success: false, reason: "no_api_key" }
    }

    try {
      const response = await fetch(`${this.baseUrl}/events`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          event_type: event.eventType,
          user_id: event.userId || "anonymous",
          timestamp: new Date().toISOString(),
          metadata: event.metadata || {},
        }),
      })

      if (!response.ok) {
        throw new Error(`Flexprice API error: ${response.status}`)
      }

      const data = await response.json()
      console.log("[v0] Flexprice usage tracked:", event.eventType)
      return { success: true, data }
    } catch (error) {
      console.error("[v0] Flexprice tracking failed:", error)
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
    }
  }

  async getUsageStats(userId?: string) {
    if (!this.apiKey) {
      return { success: false, reason: "no_api_key" }
    }

    try {
      const params = new URLSearchParams()
      if (userId) params.append("user_id", userId)

      const response = await fetch(`${this.baseUrl}/usage?${params}`, {
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
        },
      })

      if (!response.ok) {
        throw new Error(`Flexprice API error: ${response.status}`)
      }

      const data = await response.json()
      return { success: true, data }
    } catch (error) {
      console.error("[v0] Flexprice usage stats failed:", error)
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
    }
  }
}

export const flexprice = new FlexpriceClient()
