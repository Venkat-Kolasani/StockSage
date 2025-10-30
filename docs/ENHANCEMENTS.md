# Portfolio Analyzer Enhancements

## Overview
The `/analyze` route has been enhanced with real-time stock data fetching and AI-powered insights using Google Gemini.

## New Features

### 1. Real-Time Stock Data
- **Integration**: Financial Modeling Prep (FMP) API
- **Features**:
  - Real-time stock prices for any publicly traded company
  - Live market data including P/E ratios, market cap, volume
  - Batch quote fetching for multiple stocks simultaneously
  - Automatic fallback to demo data if API is unavailable
- **Free Tier**: 250 API calls per day

### 2. AI-Powered Analysis with Gemini
- **Integration**: Google Gemini 1.5 Flash (free tier)
- **Features**:
  - Personalized portfolio advice based on your holdings
  - Individual stock insights and recommendations
  - Context-aware analysis considering market conditions
  - Beginner-friendly explanations
- **Free Tier**: 60 requests per minute

### 3. Enhanced Dashboard UI
- **Portfolio Metrics Grid**: 
  - Total value with precise formatting
  - Gain/loss with visual indicators
  - Diversification score with progress bar
  - Risk level assessment
  
- **Portfolio Holdings Card**:
  - Detailed breakdown of each stock
  - Real-time price changes
  - Portfolio weight percentages
  - Sector classification
  
- **Individual Stock Analysis**:
  - BUY/SELL/HOLD recommendations
  - Confidence levels (HIGH/MEDIUM/LOW)
  - AI-generated reasoning for each recommendation
  
- **Key Insights Section**:
  - Portfolio-level observations
  - Diversification suggestions
  - Risk management tips

- **Real-time Updates**:
  - Refresh button to get latest data
  - Last update timestamp
  - Live/Demo data indicator

## Setup Instructions

### 1. Get API Keys

#### Google Gemini API Key (Required for AI features)
1. Visit [Google AI Studio](https://ai.google.dev/)
2. Sign in with your Google account
3. Click "Get API Key"
4. Create a new API key
5. Copy the key

#### Financial Modeling Prep API Key (Optional)
1. Visit [FMP Developer Docs](https://financialmodelingprep.com/developer/docs/)
2. Sign up for a free account
3. Navigate to your dashboard
4. Copy your API key

### 2. Configure Environment Variables

Create a `.env` file in the root directory:

```bash
# Required for AI-powered insights
GEMINI_API_KEY=your_gemini_api_key_here

# Optional - uses demo key if not provided
NEXT_PUBLIC_FMP_API_KEY=your_fmp_api_key_here
```

### 3. Install Dependencies

The `@google/generative-ai` package is already included in package.json. No additional installation needed.

### 4. Run the Application

```bash
npm run dev
```

Navigate to `/analyze` to use the enhanced portfolio analyzer.

## How It Works

### Data Flow

1. **User Input**: User enters stock symbols and share counts
2. **Real-Time Data Fetch**: FMP API fetches current prices and metrics
3. **Portfolio Calculation**: System calculates total value, gains/losses, diversification
4. **AI Analysis**: Gemini analyzes portfolio and generates personalized advice
5. **Display Results**: Enhanced dashboard shows comprehensive analysis

### Fallback Mechanism

The system is designed to work even without API keys:

- **Without FMP Key**: Uses demo data for stock prices
- **Without Gemini Key**: Uses rule-based fallback advice generation
- **Network Issues**: Gracefully handles API failures with fallback logic

## Technical Details

### New Integrations

1. **`src/lib/integrations/fmp-stock.ts`**
   - FMP API client for real-time stock data
   - Batch quote fetching
   - Stock search functionality
   - Company profile data

2. **`src/lib/integrations/gemini.ts`**
   - Gemini AI client for portfolio analysis
   - Portfolio advice generation
   - Individual stock insights
   - Fallback advice logic

### Updated Files

1. **`src/app/api/portfolio/analyze/route.ts`**
   - Integrated FMP for real-time data
   - Added Gemini AI for advice generation
   - Enhanced error handling
   - Improved response structure

2. **`src/components/portfolio-analyzer.tsx`**
   - Redesigned UI with metric cards
   - Added portfolio holdings breakdown
   - Enhanced visual indicators
   - Added refresh functionality
   - Improved loading and error states

## API Usage Limits

### Free Tier Limits

- **Gemini AI**: 60 requests/minute (generous for personal use)
- **FMP**: 250 calls/day (sufficient for portfolio analysis)

### Tips for Staying Within Limits

1. Use the refresh button sparingly
2. Analyze your portfolio once per day
3. The system caches results during session
4. Demo mode available without API keys

## Features Comparison

| Feature | Before | After |
|---------|--------|-------|
| Stock Data | Mock/Static | Real-time via FMP API |
| AI Advice | OpenAI (paid) | Google Gemini (free) |
| Dashboard | Basic metrics | Enhanced with visual indicators |
| Portfolio View | Simple list | Detailed breakdown with weights |
| Updates | Manual page refresh | Refresh button with timestamp |
| Data Source | Hidden | Clearly indicated (Live/Demo) |
| Stock Details | Limited | Comprehensive (price, change, sector) |

## Future Enhancements

Potential improvements for the future:

1. **Real-time Updates**: WebSocket integration for live price updates
2. **Historical Charts**: Price history and performance visualization
3. **Sector Analysis**: Deep dive into sector allocation
4. **Comparison Tools**: Compare portfolio against market indexes
5. **Alerts**: Set price alerts and notifications
6. **Export**: Download analysis reports as PDF
7. **Social Features**: Share portfolio performance (anonymously)

## Troubleshooting

### Common Issues

**Issue**: "Failed to analyze portfolio"
- **Solution**: Check your API keys are correctly set in `.env`
- **Fallback**: System will use demo data automatically

**Issue**: AI advice seems generic
- **Solution**: Ensure GEMINI_API_KEY is set correctly
- **Note**: Fallback advice is rule-based and less personalized

**Issue**: Stock prices not updating
- **Solution**: Check NEXT_PUBLIC_FMP_API_KEY or use the Refresh button
- **Note**: Free tier has daily limits (250 calls)

## Support

For issues or questions:
1. Check the `.env.example` file for correct configuration
2. Review browser console for detailed error messages
3. Verify API keys are active and have available quota
4. Test with demo mode first (without API keys)