import { createTool } from "@mastra/core/tools";
import { z } from "zod";

// Types for API responses
interface ShippingData {
  vessel_name: string;
  imo: string;
  current_port: string;
  destination: string;
  eta: string;
  cargo_type: string;
  delay_hours: number;
  risk_level: string;
}

interface WeatherRisk {
  location: string;
  weather_condition: string;
  wind_speed: number;
  visibility: number;
  risk_level: string;
  impact_description: string;
}

interface NewsEvent {
  title: string;
  summary: string;
  location: string;
  impact_level: string;
  categories: string[];
  published_date: string;
}

interface PortStatus {
  port_name: string;
  country: string;
  congestion_level: string;
  average_wait_time: number;
  operational_status: string;
  recent_incidents: string[];
}

// Shipping Data Tool - Monitors vessel movements and delays
export const shippingDataTool = createTool({
  id: "get-shipping-data",
  description: "Fetch real-time shipping data including vessel positions, delays, and cargo information",
  inputSchema: z.object({
    region: z.string().describe("Geographic region or trade route (e.g., 'Pacific', 'Atlantic', 'Suez Canal')"),
    vessel_type: z.string().optional().describe("Type of vessel to filter (e.g., 'container', 'bulk', 'tanker')"),
  }),
  outputSchema: z.object({
    vessels: z.array(z.object({
      vessel_name: z.string(),
      imo: z.string(),
      current_port: z.string(),
      destination: z.string(),
      eta: z.string(),
      cargo_type: z.string(),
      delay_hours: z.number(),
      risk_level: z.string(),
    })),
    total_vessels: z.number(),
    average_delay: z.number(),
    region_risk_level: z.string(),
  }),
  execute: async ({ context }) => {
    return await getShippingData(context.region, context.vessel_type);
  },
});

// Weather Risk Tool - Analyzes weather conditions affecting shipping routes
export const weatherRiskTool = createTool({
  id: "analyze-weather-risks",
  description: "Analyze weather conditions and their potential impact on supply chain operations",
  inputSchema: z.object({
    locations: z.array(z.string()).describe("List of key locations to monitor (ports, shipping routes, etc.)"),
    forecast_days: z.number().optional().default(7).describe("Number of days to forecast"),
  }),
  outputSchema: z.object({
    weather_risks: z.array(z.object({
      location: z.string(),
      weather_condition: z.string(),
      wind_speed: z.number(),
      visibility: z.number(),
      risk_level: z.string(),
      impact_description: z.string(),
    })),
    overall_weather_risk: z.string(),
    alerts: z.array(z.string()),
  }),
  execute: async ({ context }) => {
    return await analyzeWeatherRisks(context.locations, context.forecast_days);
  },
});

// News Analysis Tool - Processes news feeds for supply chain relevant events
export const newsAnalysisTool = createTool({
  id: "analyze-supply-chain-news",
  description: "Analyze recent news for events that could impact global supply chains",
  inputSchema: z.object({
    keywords: z.array(z.string()).describe("Keywords to search for (e.g., 'strike', 'port closure', 'trade war')"),
    time_range: z.string().optional().default("24h").describe("Time range for news search (e.g., '24h', '7d', '30d')"),
    regions: z.array(z.string()).optional().describe("Specific regions to focus on"),
  }),
  outputSchema: z.object({
    news_events: z.array(z.object({
      title: z.string(),
      summary: z.string(),
      location: z.string(),
      impact_level: z.string(),
      categories: z.array(z.string()),
      published_date: z.string(),
    })),
    risk_summary: z.string(),
    urgent_alerts: z.array(z.string()),
  }),
  execute: async ({ context }) => {
    return await analyzeSupplyChainNews(context.keywords, context.time_range, context.regions);
  },
});

// Port Status Tool - Monitors major ports for congestion and operational issues
export const portStatusTool = createTool({
  id: "get-port-status",
  description: "Get current operational status and congestion levels of major global ports",
  inputSchema: z.object({
    ports: z.array(z.string()).describe("List of port names or codes to monitor"),
    include_incidents: z.boolean().optional().default(true).describe("Include recent incidents and disruptions"),
  }),
  outputSchema: z.object({
    port_statuses: z.array(z.object({
      port_name: z.string(),
      country: z.string(),
      congestion_level: z.string(),
      average_wait_time: z.number(),
      operational_status: z.string(),
      recent_incidents: z.array(z.string()),
    })),
    global_port_risk: z.string(),
    bottlenecks: z.array(z.string()),
  }),
  execute: async ({ context }) => {
    return await getPortStatus(context.ports, context.include_incidents);
  },
});

// Risk Assessment Tool - Correlates multiple data sources for comprehensive risk analysis
export const riskAssessmentTool = createTool({
  id: "comprehensive-risk-assessment",
  description: "Perform comprehensive risk assessment by correlating multiple data sources",
  inputSchema: z.object({
    supply_chain_segment: z.string().describe("Specific supply chain segment to analyze (e.g., 'automotive', 'electronics', 'energy')"),
    geographic_focus: z.array(z.string()).describe("Geographic regions of interest"),
    time_horizon: z.string().optional().default("30d").describe("Time horizon for risk assessment"),
  }),
  outputSchema: z.object({
    overall_risk_level: z.string(),
    risk_factors: z.array(z.object({
      factor: z.string(),
      severity: z.string(),
      probability: z.number(),
      impact_description: z.string(),
    })),
    recommendations: z.array(z.string()),
    early_warnings: z.array(z.string()),
    confidence_score: z.number(),
  }),
  execute: async ({ context }) => {
    return await performRiskAssessment(
      context.supply_chain_segment, 
      context.geographic_focus, 
      context.time_horizon
    );
  },
});

// Implementation functions (simulated data for demo - in production these would call real APIs)

async function getShippingData(region: string, vessel_type?: string): Promise<any> {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Simulated shipping data based on region
  const vessels: ShippingData[] = [
    {
      vessel_name: "EVER GIVEN",
      imo: "9811000",
      current_port: "Suez Canal",
      destination: "Rotterdam",
      eta: "2024-01-15T14:00:00Z",
      cargo_type: "Container",
      delay_hours: 12,
      risk_level: "MEDIUM"
    },
    {
      vessel_name: "MSC OSCAR",
      imo: "9729428",
      current_port: "Shanghai",
      destination: "Los Angeles",
      eta: "2024-01-20T08:00:00Z",
      cargo_type: "Container",
      delay_hours: 0,
      risk_level: "LOW"
    },
    {
      vessel_name: "MAERSK ESSEX",
      imo: "9778412",
      current_port: "Singapore",
      destination: "Hamburg",
      eta: "2024-01-18T16:00:00Z",
      cargo_type: "Container",
      delay_hours: 24,
      risk_level: "HIGH"
    }
  ];

  const filteredVessels = vessel_type 
    ? vessels.filter(v => v.cargo_type.toLowerCase().includes(vessel_type.toLowerCase()))
    : vessels;

  const averageDelay = filteredVessels.reduce((sum, v) => sum + v.delay_hours, 0) / filteredVessels.length;
  
  let regionRiskLevel = "LOW";
  if (averageDelay > 20) regionRiskLevel = "HIGH";
  else if (averageDelay > 10) regionRiskLevel = "MEDIUM";

  return {
    vessels: filteredVessels,
    total_vessels: filteredVessels.length,
    average_delay: averageDelay,
    region_risk_level: regionRiskLevel,
  };
}

async function analyzeWeatherRisks(locations: string[], forecast_days: number = 7): Promise<any> {
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const weatherRisks: WeatherRisk[] = locations.map(location => {
    const windSpeed = Math.random() * 50 + 10; // 10-60 knots
    const visibility = Math.random() * 10 + 1; // 1-11 km
    
    let riskLevel = "LOW";
    let condition = "Clear";
    let impact = "Minimal impact on operations";
    
    if (windSpeed > 40 || visibility < 3) {
      riskLevel = "HIGH";
      condition = windSpeed > 40 ? "Severe storms" : "Heavy fog";
      impact = "Significant delays expected, consider route alternatives";
    } else if (windSpeed > 25 || visibility < 5) {
      riskLevel = "MEDIUM";
      condition = windSpeed > 25 ? "Strong winds" : "Reduced visibility";
      impact = "Minor delays possible, monitor conditions";
    }
    
    return {
      location,
      weather_condition: condition,
      wind_speed: Math.round(windSpeed),
      visibility: Math.round(visibility * 10) / 10,
      risk_level: riskLevel,
      impact_description: impact,
    };
  });

  const highRiskCount = weatherRisks.filter(r => r.risk_level === "HIGH").length;
  const overallRisk = highRiskCount > 0 ? "HIGH" : 
                     weatherRisks.filter(r => r.risk_level === "MEDIUM").length > 0 ? "MEDIUM" : "LOW";

  const alerts = weatherRisks
    .filter(r => r.risk_level === "HIGH")
    .map(r => `WEATHER ALERT: ${r.location} - ${r.weather_condition} expected`);

  return {
    weather_risks: weatherRisks,
    overall_weather_risk: overallRisk,
    alerts,
  };
}

async function analyzeSupplyChainNews(keywords: string[], timeRange: string = "24h", regions?: string[]): Promise<any> {
  await new Promise(resolve => setTimeout(resolve, 1200));
  
  const newsEvents: NewsEvent[] = [
    {
      title: "Port Workers Strike Enters Third Day in Los Angeles",
      summary: "Longshoremen continue strike over wage disputes, causing significant container backlog",
      location: "Los Angeles, USA",
      impact_level: "HIGH",
      categories: ["Labor", "Ports", "Disruption"],
      published_date: "2024-01-10T09:00:00Z",
    },
    {
      title: "Suez Canal Traffic Normalized After Weather Delays",
      summary: "Strong winds that caused vessel delays have subsided, normal traffic resuming",
      location: "Suez Canal, Egypt",
      impact_level: "MEDIUM",
      categories: ["Weather", "Shipping", "Recovery"],
      published_date: "2024-01-10T14:30:00Z",
    },
    {
      title: "New Trade Sanctions Announced on Electronics Components",
      summary: "Government announces new restrictions on semiconductor imports affecting tech supply chains",
      location: "Washington DC, USA",
      impact_level: "HIGH",
      categories: ["Trade Policy", "Electronics", "Sanctions"],
      published_date: "2024-01-10T16:45:00Z",
    }
  ];

  const urgentAlerts = newsEvents
    .filter(event => event.impact_level === "HIGH")
    .map(event => `URGENT: ${event.title} - ${event.location}`);

  const riskSummary = `${urgentAlerts.length} high-impact events detected in the last ${timeRange}. Key concerns: labor disputes, trade policy changes.`;

  return {
    news_events: newsEvents,
    risk_summary: riskSummary,
    urgent_alerts: urgentAlerts,
  };
}

async function getPortStatus(ports: string[], includeIncidents: boolean = true): Promise<any> {
  await new Promise(resolve => setTimeout(resolve, 900));
  
  const portStatuses: PortStatus[] = ports.map(portName => {
    const congestionLevels = ["LOW", "MEDIUM", "HIGH"];
    const operationalStatuses = ["NORMAL", "REDUCED", "DISRUPTED"];
    
    const congestionLevel = congestionLevels[Math.floor(Math.random() * congestionLevels.length)];
    const waitTime = congestionLevel === "HIGH" ? Math.random() * 48 + 24 : 
                    congestionLevel === "MEDIUM" ? Math.random() * 24 + 6 : Math.random() * 6;
    
    const incidents = includeIncidents ? [
      "Equipment maintenance completed",
      "Weather delay cleared",
      "Crane #3 operational after repairs"
    ] : [];

    return {
      port_name: portName,
      country: getCountryForPort(portName),
      congestion_level: congestionLevel,
      average_wait_time: Math.round(waitTime),
      operational_status: congestionLevel === "HIGH" ? "REDUCED" : "NORMAL",
      recent_incidents: incidents,
    };
  });

  const highCongestionPorts = portStatuses.filter(p => p.congestion_level === "HIGH");
  const globalRisk = highCongestionPorts.length > 0 ? "HIGH" : 
                    portStatuses.filter(p => p.congestion_level === "MEDIUM").length > 0 ? "MEDIUM" : "LOW";

  const bottlenecks = highCongestionPorts.map(p => `${p.port_name}: ${p.average_wait_time}h wait time`);

  return {
    port_statuses: portStatuses,
    global_port_risk: globalRisk,
    bottlenecks,
  };
}

async function performRiskAssessment(segment: string, regions: string[], timeHorizon: string): Promise<any> {
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const riskFactors = [
    {
      factor: "Geopolitical Tensions",
      severity: "HIGH",
      probability: 0.7,
      impact_description: "Trade restrictions and sanctions affecting component availability"
    },
    {
      factor: "Weather Disruptions",
      severity: "MEDIUM",
      probability: 0.4,
      impact_description: "Seasonal storms impacting key shipping routes"
    },
    {
      factor: "Labor Disputes",
      severity: "HIGH",
      probability: 0.3,
      impact_description: "Port worker strikes causing container backlogs"
    },
    {
      factor: "Cyber Security Threats",
      severity: "MEDIUM",
      probability: 0.2,
      impact_description: "Potential disruption to logistics management systems"
    }
  ];

  const recommendations = [
    "Diversify supplier base across multiple geographic regions",
    "Increase safety stock for critical components by 20%",
    "Establish alternative shipping routes via Pacific corridors",
    "Implement real-time tracking for high-value shipments",
    "Develop contingency plans for port disruptions"
  ];

  const earlyWarnings = [
    "Monitor labor negotiations at West Coast ports",
    "Track weather patterns in South China Sea",
    "Watch for escalating trade policy announcements"
  ];

  // Calculate overall risk based on probability and severity
  const weightedRisk = riskFactors.reduce((sum, factor) => {
    const severityWeight = factor.severity === "HIGH" ? 3 : factor.severity === "MEDIUM" ? 2 : 1;
    return sum + (factor.probability * severityWeight);
  }, 0) / riskFactors.length;

  let overallRiskLevel = "LOW";
  if (weightedRisk > 2) overallRiskLevel = "HIGH";
  else if (weightedRisk > 1.5) overallRiskLevel = "MEDIUM";

  return {
    overall_risk_level: overallRiskLevel,
    risk_factors: riskFactors,
    recommendations,
    early_warnings: earlyWarnings,
    confidence_score: Math.round((0.75 + Math.random() * 0.2) * 100) / 100, // 0.75-0.95
  };
}

function getCountryForPort(portName: string): string {
  const portCountries: Record<string, string> = {
    "Shanghai": "China",
    "Singapore": "Singapore", 
    "Rotterdam": "Netherlands",
    "Los Angeles": "USA",
    "Hamburg": "Germany",
    "Antwerp": "Belgium",
    "Long Beach": "USA",
    "Qingdao": "China",
    "Busan": "South Korea",
    "Dubai": "UAE"
  };
  return portCountries[portName] || "Unknown";
}