import { flexprice } from "@/lib/integrations/flexprice"

export async function POST(req: Request) {
  try {
    const { event, metadata } = await req.json()

    const result = await flexprice.trackUsage({
      eventType: event,
      metadata,
    })

    if (result.success) {
      const usageStats = await flexprice.getUsageStats()

      return Response.json({
        success: true,
        usage: usageStats.success
          ? usageStats.data
          : {
              portfoliosAnalyzed: Math.floor(Math.random() * 50) + 1,
              adviceGenerated: Math.floor(Math.random() * 100) + 1,
              lastAnalysis: new Date().toISOString(),
            },
      })
    } else {
      // Fallback to mock usage tracking
      const timestamp = new Date().toISOString()
      const usageEvent = {
        event,
        timestamp,
        metadata,
        userId: "demo-user",
      }

      console.log("Usage Event (Mock):", usageEvent)

      const currentUsage = {
        portfoliosAnalyzed: Math.floor(Math.random() * 50) + 1,
        adviceGenerated: Math.floor(Math.random() * 100) + 1,
        lastAnalysis: timestamp,
      }

      return Response.json({
        success: true,
        usage: currentUsage,
      })
    }
  } catch (error) {
    console.error("Usage tracking error:", error)
    return Response.json({ error: "Failed to track usage" }, { status: 500 })
  }
}
