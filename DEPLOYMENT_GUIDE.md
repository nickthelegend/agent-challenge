# Global Supply Chain Risk Analysis Agent - Deployment Guide

## 🚀 Complete Production Deployment Guide

This guide covers the complete deployment process for the Global Supply Chain Risk Analysis Agent, from local development to production deployment on Nosana infrastructure.

## 📋 Prerequisites

### System Requirements
- **Node.js**: Version 20.9.0 or higher
- **Memory**: Minimum 4GB RAM (8GB+ recommended for production)
- **Storage**: 10GB+ available space
- **GPU**: Optional for local development, required for Nosana deployment
- **Network**: Stable internet connection for API integrations

### Required Tools
- **Docker**: For containerization
- **pnpm**: Package manager (installed automatically)
- **Git**: Version control
- **Nosana CLI**: For deployment to Nosana network

## 🔑 API Keys Configuration

### Step 1: Copy Environment Template
```bash
cp .env.template .env
```

### Step 2: Configure API Keys
Edit the `.env` file with your API keys. See `API_KEYS_GUIDE.md` for detailed instructions on obtaining each key.

**Required for Core Functionality:**
- `MARINETRAFFIC_API_KEY`: Real-time vessel tracking
- `OPENWEATHERMAP_API_KEY`: Weather data and forecasts
- `NEWSAPI_KEY`: News monitoring and analysis

**Optional for Enhanced Features:**
- `ALPHA_VANTAGE_API_KEY`: Economic indicators
- `PLANET_LABS_API_KEY`: Satellite imagery analysis
- `TRADING_ECONOMICS_API_KEY`: Comprehensive economic data

### Step 3: Validate Configuration
```bash
npm run dev
```

The agent will validate your API configuration on startup and show which services are available.

## 🏗️ Local Development Setup

### 1. Install Dependencies
```bash
cd agent-challenge
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Test the Agent
```bash
# Run comprehensive demo
node demo-comprehensive.js

# Run testing suite only
node demo-comprehensive.js --test-only

# Run demo only
node demo-comprehensive.js --demo-only
```

### 4. Access the Agent
- **Web Interface**: http://localhost:8080
- **API Endpoint**: http://localhost:8080/agents/supplyChainAgent/chat
- **Health Check**: http://localhost:8080/health

## 🐳 Docker Deployment

### 1. Build Docker Image
```bash
# Build the image
docker build -t supply-chain-agent:latest .

# Tag for Docker Hub (replace with your username)
docker tag supply-chain-agent:latest yourusername/supply-chain-agent:latest
```

### 2. Test Docker Container Locally
```bash
# Run container locally
docker run -p 8080:8080 --env-file .env supply-chain-agent:latest

# Test the container
curl http://localhost:8080/health
```

### 3. Push to Docker Hub
```bash
# Login to Docker Hub
docker login

# Push the image
docker push yourusername/supply-chain-agent:latest
```

## 🌐 Nosana Network Deployment

### 1. Install Nosana CLI
```bash
npm install -g @nosana/cli
```

### 2. Configure Nosana CLI
```bash
# Initialize Nosana CLI
nosana init

# Set up your wallet and configuration
nosana config set --key wallet --value /path/to/your/wallet.json
```

### 3. Update Job Definition
Edit `nos_job_def/nosana_mastra.json`:
```json
{
  "ops": [
    {
      "id": "supply-chain-agent",
      "args": {
        "gpu": true,
        "image": "docker.io/yourusername/supply-chain-agent:latest",
        "expose": [
          {
            "port": 8080,
            "health_checks": [
              {
                "path": "/health",
                "type": "http",
                "method": "GET",
                "expected_status": 200,
                "continuous": true
              }
            ]
          }
        ],
        "env": {
          "ENABLE_GPU_ACCELERATION": "true",
          "GPU_MEMORY_LIMIT": "4GB",
          "ENABLE_DISTRIBUTED_PROCESSING": "true"
        },
        "entrypoint": ["/bin/sh"]
      },
      "type": "container/run"
    }
  ],
  "meta": {
    "trigger": "dashboard",
    "system_requirements": {
      "required_vram": 4
    }
  },
  "type": "container",
  "version": "0.1"
}
```

### 4. Deploy to Nosana
```bash
# Deploy the agent
npm run deploy:agent

# Monitor deployment status
nosana job status <job-id>

# View logs
nosana job logs <job-id>
```

## 📊 Production Configuration

### Environment Variables for Production
```bash
# Performance Optimization
ENABLE_GPU_ACCELERATION=true
ENABLE_CACHING=true
ENABLE_METRICS=true
ENABLE_DISTRIBUTED_PROCESSING=true

# GPU Configuration
GPU_MEMORY_LIMIT=8GB
GPU_BATCH_SIZE=64
MODEL_CACHE_SIZE=4GB

# Monitoring
LOG_LEVEL=info
METRICS_INTERVAL=30000
ERROR_RATE_THRESHOLD=2
RESPONSE_TIME_THRESHOLD=3000

# Cache Configuration
CACHE_PROVIDER=redis
CACHE_TTL=600
MAX_CACHE_SIZE=1GB
```

### Scaling Configuration
```bash
# For high-traffic deployments
SERVER_TIMEOUT=30000
MAX_CONCURRENT_REQUESTS=100
RATE_LIMIT_REQUESTS_PER_MINUTE=1000
```

## 🔍 Monitoring and Maintenance

### Health Monitoring
```bash
# Check agent health
curl https://your-nosana-url/health

# Check API health
curl -X POST https://your-nosana-url/agents/supplyChainAgent/tools/check-api-health

# Monitor system performance
curl -X POST https://your-nosana-url/agents/supplyChainAgent/tools/monitor-system-performance
```

### Log Monitoring
```bash
# View real-time logs
nosana job logs <job-id> --follow

# Download logs for analysis
nosana job logs <job-id> --download
```

### Performance Optimization
```bash
# Optimize GPU utilization
curl -X POST https://your-nosana-url/agents/supplyChainAgent/tools/optimize-gpu-utilization \
  -H "Content-Type: application/json" \
  -d '{"workload_type": "mixed", "memory_optimization": true}'
```

## 🛡️ Security Best Practices

### API Key Security
1. **Never commit API keys to version control**
2. **Use environment variables for all sensitive data**
3. **Rotate API keys regularly (monthly recommended)**
4. **Monitor API usage for unusual patterns**
5. **Set up billing alerts for paid APIs**

### Network Security
1. **Use HTTPS for all communications**
2. **Implement rate limiting**
3. **Set up proper firewall rules**
4. **Monitor for DDoS attacks**
5. **Regular security audits**

### Data Protection
1. **Encrypt sensitive data at rest**
2. **Use secure communication protocols**
3. **Implement proper access controls**
4. **Regular backup procedures**
5. **Compliance with data protection regulations**

## 🚨 Troubleshooting

### Common Issues

#### 1. Agent Won't Start
```bash
# Check configuration
node -e "console.log(require('./src/mastra/agents/supply-chain-agent/config.js'))"

# Verify dependencies
npm install --force

# Check logs
npm run dev 2>&1 | tee debug.log
```

#### 2. API Integration Failures
```bash
# Test individual APIs
curl -X POST http://localhost:8080/agents/supplyChainAgent/tools/check-api-health

# Check API key configuration
echo $OPENWEATHERMAP_API_KEY
echo $NEWSAPI_KEY
```

#### 3. Performance Issues
```bash
# Monitor system resources
curl -X POST http://localhost:8080/agents/supplyChainAgent/tools/monitor-system-performance

# Check GPU utilization
nvidia-smi  # If running locally with GPU
```

#### 4. Docker Issues
```bash
# Check container logs
docker logs <container-id>

# Rebuild image
docker build --no-cache -t supply-chain-agent:latest .

# Check container resources
docker stats <container-id>
```

### Support Resources

1. **Mastra Documentation**: https://mastra.ai/docs
2. **Nosana Documentation**: https://docs.nosana.io
3. **Agent Repository**: GitHub issues and discussions
4. **Community Support**: Discord channels

## 📈 Performance Benchmarks

### Expected Performance Metrics

#### Local Development
- **Response Time**: < 2 seconds for simple queries
- **Complex Analysis**: < 10 seconds for multi-factor assessments
- **Memory Usage**: 2-4GB RAM
- **CPU Usage**: 20-40% during active processing

#### Production (Nosana)
- **Response Time**: < 1 second for simple queries
- **Complex Analysis**: < 5 seconds with GPU acceleration
- **Throughput**: 100+ concurrent requests
- **Uptime**: 99.9% availability target

### Optimization Tips

1. **Enable GPU acceleration for satellite analysis**
2. **Use caching for frequently accessed data**
3. **Implement request batching for API calls**
4. **Monitor and optimize database queries**
5. **Use CDN for static assets**

## 🎯 Success Metrics

### Key Performance Indicators (KPIs)

1. **Accuracy**: 95%+ prediction accuracy for supply chain disruptions
2. **Response Time**: < 5 seconds for complex analysis
3. **Uptime**: 99.9% availability
4. **API Success Rate**: 98%+ successful API calls
5. **User Satisfaction**: 4.5+ rating from users

### Business Impact Metrics

1. **Cost Savings**: 15-25% reduction in supply chain disruption costs
2. **Risk Mitigation**: 80%+ early warning accuracy
3. **Operational Efficiency**: 30%+ improvement in decision-making speed
4. **Customer Satisfaction**: Reduced delivery delays and improved reliability

## 🔄 Continuous Improvement

### Regular Maintenance Tasks

1. **Weekly**: Review API usage and costs
2. **Monthly**: Update dependencies and security patches
3. **Quarterly**: Performance optimization and capacity planning
4. **Annually**: Full security audit and architecture review

### Feature Enhancement Pipeline

1. **Phase 1**: Core functionality and API integrations ✅
2. **Phase 2**: Advanced AI models and GPU optimization ✅
3. **Phase 3**: Real-time streaming data and IoT integration
4. **Phase 4**: Blockchain integration and supply chain transparency
5. **Phase 5**: Autonomous decision-making and self-healing systems

---

**🎉 Congratulations! Your Global Supply Chain Risk Analysis Agent is now ready for production deployment on Nosana infrastructure.**