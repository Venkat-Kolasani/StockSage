# StockSage - Smart Stock Consultant Agent
*Where Wisdom Meets Investing*

StockSage is an AI-powered stock market consultant that provides beginner-friendly investment advice. Built with Next.js, it combines rule-based analysis with AI-generated insights to help users make informed investment decisions.

## Features

- **Portfolio Analysis**: Input your stocks and get comprehensive analysis
- **AI-Powered Advice**: Get personalized investment recommendations with Gemini AI
- **Risk Assessment**: Understand your portfolio's risk level and diversification
- **Usage Tracking**: Monitor your analysis usage with Flexprice integration
- **Real-time Data**: Live stock data via Pathway integration (with mock fallback)

## Environment Setup

To enable full functionality, add these environment variables to your Vercel project:

### Required API Keys

1. **Gemini API Key** (for AI-powered advice generation):
   ```
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

2. **Flexprice API Key** (for usage tracking and billing):
   ```
   FLEXPRICE_API_KEY=your_flexprice_api_key_here
   ```

3. **Pathway API Key** (for real-time stock data):
   ```
   PATHWAY_API_KEY=your_pathway_api_key_here
   ```

### How to Add Environment Variables

1. Go to your Vercel project dashboard
2. Navigate to Settings → Environment Variables
3. Add the variables above with your actual API keys
4. Redeploy your application

### Getting API Keys

#### Google Gemini Setup
1. Visit [Google AI Studio](https://aistudio.google.com/)
2. Create an API key for Gemini
3. Copy your API key

#### Flexprice Setup
1. Visit [Flexprice.io](https://flexprice.io)
2. Sign up for an account
3. Create a new project
4. Copy your API key from the dashboard
5. Configure usage events for:
   - `portfolio_analysis`
   - `advice_generation`
   - `stock_search`

#### Pathway Setup
1. Visit [Pathway.com](https://pathway.com)
2. Sign up for their financial data API
3. Subscribe to stock data endpoints
4. Copy your API key from the dashboard

### Fallback Behavior

StockSage is designed to work even without API keys:

- **Without Gemini**: Rule-based advice will be used instead of AI-generated advice
- **Without Flexprice**: Usage tracking will log to console instead of billing service
- **Without Pathway**: Mock stock data will be used for demonstrations

This allows you to test and develop the application before setting up paid integrations.

## Development

```bash
pnpm install
pnpm dev
```

Visit `http://localhost:3000` to see the application.

## Deployment

Deploy to Vercel with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Venkat-Kolasani/StockSage)

Remember to add your environment variables after deployment for full functionality.

## Architecture

- **Frontend**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with Radix UI components
- **AI**: Google Gemini 1.5 Flash for investment advice generation
- **Data**: Pathway API for live stock data (with mock fallback)
- **Billing**: Flexprice for usage tracking
- **Deployment**: Vercel platform

## Usage Tracking Events

The application tracks these events for billing:

- `portfolio_analysis`: When a user analyzes their portfolio
- `advice_generation`: When AI advice is generated
- `stock_search`: When users search for stocks

Each event includes relevant metadata for usage analytics and billing purposes.
