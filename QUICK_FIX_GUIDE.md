# Quick Fix Guide - Ollama Connection Error

## Problem
Error: `Cannot connect to API: connect ECONNREFUSED 127.0.0.1:11434`

This means Ollama (local LLM server) is not running.

## Solution Options

### Option 1: Install and Start Ollama (Recommended)

#### Step 1: Install Ollama
```bash
# Download and install Ollama
curl -fsSL https://ollama.com/install.sh | sh
```

#### Step 2: Start Ollama Service
```bash
# Start Ollama in background
ollama serve &

# Or start in foreground (new terminal)
ollama serve
```

#### Step 3: Download the Model
```bash
# Download Qwen2.5:1.5b model
ollama pull qwen2.5:1.5b
```

#### Step 4: Test Ollama
```bash
# Test if Ollama is working
curl http://localhost:11434/api/generate -d '{
  "model": "qwen2.5:1.5b",
  "prompt": "Hello, how are you?",
  "stream": false
}'
```

#### Step 5: Start Your Agent
```bash
cd agent-challenge
npm run dev
```

### Option 2: Use OpenAI GPT-4 (Temporary Fix)

If you want to test immediately while Ollama installs:

#### Step 1: Get OpenAI API Key
- Visit: https://platform.openai.com/api-keys
- Create an API key

#### Step 2: Update Configuration
```bash
# Add to .env file
echo "OPENAI_API_KEY=your_openai_key_here" >> .env
echo "USE_OPENAI=true" >> .env
```

#### Step 3: Update Model Configuration
Edit `src/mastra/config.ts` to use OpenAI temporarily.

### Option 3: Quick Docker Solution

#### Run Ollama in Docker
```bash
# Start Ollama in Docker
docker run -d -v ollama:/root/.ollama -p 11434:11434 --name ollama ollama/ollama

# Pull the model
docker exec -it ollama ollama pull qwen2.5:1.5b

# Test connection
curl http://localhost:11434/api/generate -d '{
  "model": "qwen2.5:1.5b",
  "prompt": "Hello",
  "stream": false
}'
```

## Quick Status Check Commands

### Check if Ollama is Running
```bash
# Check if Ollama process is running
ps aux | grep ollama

# Check if port 11434 is open
netstat -tlnp | grep 11434

# Test API endpoint
curl http://localhost:11434/api/tags
```

### Check Agent Status
```bash
cd agent-challenge

# Check if agent can connect
npm run dev

# Test API integration
node test-api-integration.js
```

## Troubleshooting

### If Ollama Won't Start
```bash
# Kill any existing Ollama processes
pkill ollama

# Start fresh
ollama serve

# In another terminal, pull model
ollama pull qwen2.5:1.5b
```

### If Port 11434 is Busy
```bash
# Find what's using the port
sudo lsof -i :11434

# Kill the process if needed
sudo kill -9 <process_id>

# Start Ollama again
ollama serve
```

### If Model Download Fails
```bash
# Try different model sizes
ollama pull qwen2.5:0.5b  # Smaller, faster
ollama pull qwen2.5:3b    # Medium size
ollama pull qwen2.5:7b    # Larger, better quality
```

## Expected Output When Working

### Ollama Status Check
```bash
$ curl http://localhost:11434/api/tags
{"models":[{"name":"qwen2.5:1.5b","modified_at":"2024-01-01T00:00:00Z","size":934000000}]}
```

### Agent Startup
```bash
$ npm run dev
🔧 Supply Chain Agent Configuration
==================================================
✅ All required API keys are configured
📊 Configuration Summary:
   - GPU Acceleration: Enabled
   - Caching: Enabled
   - Monitoring: Enabled
   - Log Level: info
==================================================
ModelName: qwen2.5:1.5b
baseURL: http://127.0.0.1:11434/api
Server running on http://localhost:8080
```

## Quick Test Once Fixed

Once Ollama is running, test your agent:

```bash
# Start the agent
npm run dev

# In browser, go to: http://localhost:8080
# Or test with curl:
curl -X POST http://localhost:8080/agents/supplyChainAgent/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "What supply chain disruptions are in the news today?"}'
```

## Need Immediate Testing?

If you need to test the agent immediately while fixing Ollama:

1. **Use the API testing script** (works with real APIs):
```bash
node test-api-integration.js
```

2. **Or temporarily switch to OpenAI** for instant results.

The agent will work perfectly once Ollama is running!