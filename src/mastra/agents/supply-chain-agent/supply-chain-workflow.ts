import { createWorkflow } from "@mastra/core/workflows";
import { z } from "zod";

// Define the workflow for continuous supply chain monitoring
export const supplyChainMonitoringWorkflow = createWorkflow({
  name: "supply-chain-monitoring",
  triggerSchema: z.object({
    monitoring_interval: z.number().default(3600).describe("Monitoring interval in seconds"),
    regions: z.array(z.string()).default(["Pacific", "Atlantic", "Mediterranean"]).describe("Regions to monitor"),
    critical_ports: z.array(z.string()).default(["Shanghai", "Los Angeles", "Rotterdam", "Singapore"]).describe("Critical ports to monitor"),
    supply_chain_segments: z.array(z.string()).default(["electronics", "automotive", "energy"]).describe("Supply chain segments to analyze"),
  }),
})
;

// Define the workflow execution logic
export const executeSupplyChainMonitoring = async (params: {
  monitoring_interval?: number;
  regions?: string[];
  critical_ports?: string[];
  supply_chain_segments?: string[];
}) => {
  const {
    monitoring_interval = 3600,
    regions = ["Pacific", "Atlantic", "Mediterranean"],
    critical_ports = ["Shanghai", "Los Angeles", "Rotterdam", "Singapore"],
    supply_chain_segments = ["electronics", "automotive", "energy"],
  } = params;

  try {
    // Execute the workflow
    const result = await supplyChainMonitoringWorkflow.execute({
      monitoring_interval,
      regions,
      critical_ports,
      supply_chain_segments,
    });

    return {
      success: true,
      timestamp: new Date().toISOString(),
      monitoring_interval,
      result,
    };
  } catch (error) {
    console.error("Supply chain monitoring workflow failed:", error);
    return {
      success: false,
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};