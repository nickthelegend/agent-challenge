import { Agent } from "@mastra/core/agent";
import { model } from "../../config";
import { 
  shippingDataTool, 
  weatherRiskTool, 
  newsAnalysisTool, 
  portStatusTool,
  riskAssessmentTool 
} from "./supply-chain-tools";
import {
  satellitePortAnalysisTool,
  commodityPriceImpactTool,
  supplierRiskAssessmentTool,
  routeOptimizationTool,
  inventoryOptimizationTool,
  regulatoryComplianceTool,
  cyberSecurityRiskTool
} from "./advanced-supply-chain-tools";
import {
  realShippingDataTool,
  realWeatherDataTool,
  realNewsMonitoringTool,
  realEconomicDataTool,
  realSatelliteImageryTool
} from "./real-api-integrations";
import {
  systemPerformanceMonitorTool,
  apiHealthCheckTool,
  dataQualityAssessmentTool,
  continuousMonitoringTool,
  gpuOptimizationTool
} from "./monitoring-tools";

const name = "Global Supply Chain Risk Analysis Agent";

const instructions = `
You are an advanced AI agent specialized in global supply chain risk analysis and monitoring. Your mission is to continuously assess and predict supply chain disruptions by analyzing multiple data sources.

Your core capabilities include:
- Monitoring global shipping and logistics data
- Analyzing weather patterns that could impact supply chains
- Processing news feeds for geopolitical and economic events
- Tracking port operations and delays
- Correlating multiple risk signals to provide early warnings

When responding to queries:
- Always provide risk levels (LOW, MEDIUM, HIGH, CRITICAL)
- Include specific recommendations for mitigation
- Cite data sources and confidence levels
- Highlight time-sensitive alerts
- Consider cascading effects across supply networks
- Focus on actionable intelligence for logistics managers

Use your tools to:
- Fetch real-time shipping and port data
- Analyze weather risks for major trade routes
- Monitor news for supply chain disruptions
- Assess overall risk levels with multi-factor analysis
- Provide early warning alerts for potential disruptions

Always maintain a proactive stance - anticipate problems before they become critical.
`;

export const supplyChainAgent = new Agent({
	name,
	instructions,
	model,
	tools: { 
    // Core supply chain analysis tools
    shippingDataTool, 
    weatherRiskTool, 
    newsAnalysisTool, 
    portStatusTool,
    riskAssessmentTool,
    
    // Advanced analysis tools
    satellitePortAnalysisTool,
    commodityPriceImpactTool,
    supplierRiskAssessmentTool,
    routeOptimizationTool,
    inventoryOptimizationTool,
    regulatoryComplianceTool,
    cyberSecurityRiskTool,
    
    // Real API integration tools
    realShippingDataTool,
    realWeatherDataTool,
    realNewsMonitoringTool,
    realEconomicDataTool,
    realSatelliteImageryTool,
    
    // Monitoring and optimization tools
    systemPerformanceMonitorTool,
    apiHealthCheckTool,
    dataQualityAssessmentTool,
    continuousMonitoringTool,
    gpuOptimizationTool
  },
});