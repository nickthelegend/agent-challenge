# API Keys Setup Guide for Global Supply Chain Risk Analysis Agent

## Overview
This guide will help you obtain and configure the necessary API keys to enable real-time data integration for the Global Supply Chain Risk Analysis Agent.

## Required API Keys (Core Functionality)

### 1. MarineTraffic API 🚢
**Purpose**: Real-time vessel tracking and shipping data
**Website**: https://www.marinetraffic.com/en/ais-api-services
**Pricing**: Starts at $50/month for basic vessel tracking
**Free Tier**: Limited trial available

**How to get the API key**:
1. Visit https://www.marinetraffic.com/en/ais-api-services
2. Create an account or sign in
3. Choose a subscription plan
4. Navigate to API section in your dashboard
5. Generate your API key

**Environment Variable**: `MARINETRAFFIC_API_KEY`

### 2. OpenWeatherMap API 🌦️
**Purpose**: Weather data and marine forecasts
**Website**: https://openweathermap.org/api
**Pricing**: Free tier available (1000 calls/day), paid plans start at $40/month
**Free Tier**: Yes - 1,000 API calls per day

**How to get the API key**:
1. Visit https://openweathermap.org/api
2. Sign up for a free account
3. Verify your email address
4. Go to API keys section in your account
5. Copy your default API key (or create a new one)

**Environment Variable**: `OPENWEATHERMAP_API_KEY`

### 3. NewsAPI 📰
**Purpose**: Real-time news monitoring and analysis
**Website**: https://newsapi.org/
**Pricing**: Free tier (500 requests/day), paid plans start at $449/month
**Free Tier**: Yes - 500 requests per day

**How to get the API key**:
1. Visit https://newsapi.org/
2. Click "Get API Key" and sign up
3. Verify your email address
4. Your API key will be displayed on the dashboard
5. Copy the API key

**Environment Variable**: `NEWSAPI_KEY`

## Optional API Keys (Enhanced Functionality)

### 4. Alpha Vantage API 📈
**Purpose**: Economic indicators and commodity prices
**Website**: https://www.alphavantage.co/support/#api-key
**Pricing**: Free tier (5 requests/minute), paid plans start at $49.99/month
**Free Tier**: Yes - 5 API requests per minute and 500 requests per day

**How to get the API key**:
1. Visit https://www.alphavantage.co/support/#api-key
2. Fill out the form with your details
3. Choose "Free" for the plan type
4. Submit the form
5. Check your email for the API key

**Environment Variable**: `ALPHA_VANTAGE_API_KEY`

### 5. Planet Labs API 🛰️
**Purpose**: Satellite imagery analysis for port congestion
**Website**: https://www.planet.com/
**Pricing**: Contact for enterprise pricing (typically $1000+/month)
**Free Tier**: Limited trial for developers

**How to get the API key**:
1. Visit https://www.planet.com/
2. Sign up for a developer account
3. Request access to their API
4. Complete the application process
5. Receive API credentials via email

**Environment Variable**: `PLANET_LABS_API_KEY`

### 6. Trading Economics API 💹
**Purpose**: Comprehensive economic data and indicators
**Website**: https://tradingeconomics.com/api
**Pricing**: Starts at $50/month
**Free Tier**: Limited trial available

**How to get the API key**:
1. Visit https://tradingeconomics.com/api
2. Sign up for an account
3. Choose a subscription plan
4. Access your API key from the dashboard
5. Copy the API key

**Environment Variable**: `TRADING_ECONOMICS_API_KEY`

## Quick Setup Instructions

### Step 1: Copy Environment Template
```bash
cp .env.template .env
```

### Step 2: Edit the .env file
Open the `.env` file and replace the placeholder values with your actual API keys:

```bash
# Required APIs
MARINETRAFFIC_API_KEY=your_actual_marinetraffic_key
OPENWEATHERMAP_API_KEY=your_actual_openweather_key
NEWSAPI_KEY=your_actual_newsapi_key

# Optional APIs (for enhanced functionality)
ALPHA_VANTAGE_API_KEY=your_actual_alphavantage_key
PLANET_LABS_API_KEY=your_actual_planet_key
TRADING_ECONOMICS_API_KEY=your_actual_trading_economics_key
```

### Step 3: Test Configuration
Run the agent to test your API configuration:
```bash
npm run dev
```

The agent will validate your API keys on startup and show which APIs are configured.

## Cost-Effective Approach

### Free Tier Strategy (Recommended for Testing)
1. **OpenWeatherMap**: Free tier (1000 calls/day) ✅
2. **NewsAPI**: Free tier (500 calls/day) ✅
3. **Alpha Vantage**: Free tier (5 calls/minute) ✅
4. **MarineTraffic**: Use trial or simulated data
5. **Planet Labs**: Use simulated satellite analysis
6. **Trading Economics**: Use simulated economic data

**Total Cost**: $0/month for basic functionality

### Production Strategy
1. **OpenWeatherMap**: Professional plan ($40/month)
2. **NewsAPI**: Business plan ($449/month)
3. **MarineTraffic**: Basic plan ($50/month)
4. **Alpha Vantage**: Premium plan ($49.99/month)
5. **Planet Labs**: Enterprise (contact for pricing)
6. **Trading Economics**: Basic plan ($50/month)

**Total Cost**: ~$639/month for full functionality

## Fallback Strategy

The agent is designed to work even without API keys by using simulated data:

- **No API Keys**: Agent uses realistic simulated data for all sources
- **Partial API Keys**: Agent uses real data where available, simulated data for missing APIs
- **All API Keys**: Agent uses real-time data from all sources

## Security Best Practices

1. **Never commit API keys to version control**
2. **Use environment variables for all sensitive data**
3. **Rotate API keys regularly**
4. **Monitor API usage to prevent unexpected charges**
5. **Set up billing alerts for paid APIs**
6. **Use least-privilege access when possible**

## Troubleshooting

### Common Issues

1. **"API key not configured" error**
   - Check that the environment variable is set correctly
   - Ensure no extra spaces or quotes in the .env file

2. **"Rate limit exceeded" error**
   - Check your API usage limits
   - Consider upgrading to a higher tier
   - Implement request throttling

3. **"Invalid API key" error**
   - Verify the API key is correct
   - Check if the API key has expired
   - Ensure the API key has the necessary permissions

### Testing API Keys

You can test individual API keys using the agent's health check tool:

```bash
# Test all APIs
curl -X POST http://localhost:8080/agents/supplyChainAgent/tools/check-api-health

# Test specific APIs
curl -X POST http://localhost:8080/agents/supplyChainAgent/tools/check-api-health \
  -H "Content-Type: application/json" \
  -d '{"apis_to_check": ["openweathermap", "newsapi"]}'
```

## Support

If you encounter issues with API setup:

1. Check the API provider's documentation
2. Verify your account status and billing
3. Contact the API provider's support team
4. Use the agent's simulated data mode for testing

The agent is designed to be resilient and will continue operating even if some APIs are unavailable.