import { Mastra } from "@mastra/core/mastra";
import { PinoLogger } from "@mastra/loggers";
import { weatherAgent } from "./agents/weather-agent/weather-agent"; // This can be deleted later
import { weatherWorkflow } from "./agents/weather-agent/weather-workflow"; // This can be deleted later
import { supplyChainAgent } from "./agents/supply-chain-agent/supply-chain-agent";
import { supplyChainMonitoringWorkflow } from "./agents/supply-chain-agent/supply-chain-workflow";
import { initializeConfiguration } from "./agents/supply-chain-agent/config";

// Initialize configuration on startup
initializeConfiguration();

export const mastra = new Mastra({
	workflows: { weatherWorkflow, supplyChainMonitoringWorkflow },
	agents: { weatherAgent, supplyChainAgent },
	logger: new PinoLogger({
		name: "Mastra",
		level: "info",
	}),
	server: {
		port: 8080,
		timeout: 15000, // Increased timeout for complex operations
	},
});
