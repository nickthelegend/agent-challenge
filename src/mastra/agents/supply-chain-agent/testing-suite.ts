import { supplyChainAgent } from "./supply-chain-agent";
import { initializeConfiguration, validateAPIConfiguration } from "./config";

// Comprehensive Testing Suite for Supply Chain Agent

export interface TestResult {
  testName: string;
  status: "PASS" | "FAIL" | "SKIP";
  duration: number;
  details: string;
  error?: string;
}

export interface TestSuite {
  suiteName: string;
  results: TestResult[];
  totalTests: number;
  passedTests: number;
  failedTests: number;
  skippedTests: number;
  totalDuration: number;
}

// Core functionality tests
export async function runCoreToolsTests(): Promise<TestSuite> {
  const results: TestResult[] = [];
  const startTime = Date.now();

  // Test shipping data tool
  results.push(await runTest(
    "Shipping Data Tool",
    async () => {
      const response = await supplyChainAgent.text(
        "Analyze current shipping conditions in the Pacific region for container vessels"
      );
      if (!response || response.length < 50) {
        throw new Error("Response too short or empty");
      }
      return "Successfully retrieved shipping data analysis";
    }
  ));

  // Test weather risk tool
  results.push(await runTest(
    "Weather Risk Tool",
    async () => {
      const response = await supplyChainAgent.text(
        "Assess weather risks for Shanghai, Los Angeles, and Singapore ports for the next 7 days"
      );
      if (!response || !response.toLowerCase().includes("weather")) {
        throw new Error("Weather analysis not found in response");
      }
      return "Successfully analyzed weather risks";
    }
  ));

  // Test news analysis tool
  results.push(await runTest(
    "News Analysis Tool",
    async () => {
      const response = await supplyChainAgent.text(
        "Monitor recent news for supply chain disruptions including strikes and port closures"
      );
      if (!response || response.length < 50) {
        throw new Error("News analysis response insufficient");
      }
      return "Successfully analyzed supply chain news";
    }
  ));

  // Test port status tool
  results.push(await runTest(
    "Port Status Tool",
    async () => {
      const response = await supplyChainAgent.text(
        "Check operational status of Shanghai, Los Angeles, Rotterdam, and Singapore ports"
      );
      if (!response || !response.toLowerCase().includes("port")) {
        throw new Error("Port status not found in response");
      }
      return "Successfully checked port statuses";
    }
  ));

  // Test comprehensive risk assessment
  results.push(await runTest(
    "Risk Assessment Tool",
    async () => {
      const response = await supplyChainAgent.text(
        "Perform comprehensive risk assessment for electronics supply chain in Asia-Pacific region"
      );
      if (!response || !response.toLowerCase().includes("risk")) {
        throw new Error("Risk assessment not found in response");
      }
      return "Successfully performed risk assessment";
    }
  ));

  const endTime = Date.now();
  return compileSuiteResults("Core Tools Tests", results, endTime - startTime);
}

// Advanced tools tests
export async function runAdvancedToolsTests(): Promise<TestSuite> {
  const results: TestResult[] = [];
  const startTime = Date.now();

  // Test satellite analysis
  results.push(await runTest(
    "Satellite Port Analysis",
    async () => {
      const response = await supplyChainAgent.text(
        "Analyze satellite imagery of Shanghai port to detect congestion levels"
      );
      if (!response || response.length < 30) {
        throw new Error("Satellite analysis response insufficient");
      }
      return "Successfully analyzed satellite imagery";
    }
  ));

  // Test commodity price impact
  results.push(await runTest(
    "Commodity Price Impact",
    async () => {
      const response = await supplyChainAgent.text(
        "Analyze how oil and steel price fluctuations affect automotive supply chain costs"
      );
      if (!response || !response.toLowerCase().includes("price")) {
        throw new Error("Price impact analysis not found");
      }
      return "Successfully analyzed commodity price impacts";
    }
  ));

  // Test supplier risk assessment
  results.push(await runTest(
    "Supplier Risk Assessment",
    async () => {
      const response = await supplyChainAgent.text(
        "Assess risks for suppliers in China, Mexico, and Germany for electronics manufacturing"
      );
      if (!response || !response.toLowerCase().includes("supplier")) {
        throw new Error("Supplier risk assessment not found");
      }
      return "Successfully assessed supplier risks";
    }
  ));

  // Test route optimization
  results.push(await runTest(
    "Route Optimization",
    async () => {
      const response = await supplyChainAgent.text(
        "Optimize transportation routes from Shanghai to Los Angeles for electronics cargo prioritizing cost"
      );
      if (!response || !response.toLowerCase().includes("route")) {
        throw new Error("Route optimization not found");
      }
      return "Successfully optimized transportation routes";
    }
  ));

  const endTime = Date.now();
  return compileSuiteResults("Advanced Tools Tests", results, endTime - startTime);
}

// Real API integration tests
export async function runAPIIntegrationTests(): Promise<TestSuite> {
  const results: TestResult[] = [];
  const startTime = Date.now();
  const apiValidation = validateAPIConfiguration();

  // Test real shipping data (if API key available)
  if (process.env.MARINETRAFFIC_API_KEY) {
    results.push(await runTest(
      "Real Shipping Data API",
      async () => {
        const response = await supplyChainAgent.text(
          "Fetch real-time vessel data from MarineTraffic for the Pacific region"
        );
        if (!response || response.length < 30) {
          throw new Error("Real shipping data API response insufficient");
        }
        return "Successfully fetched real shipping data";
      }
    ));
  } else {
    results.push({
      testName: "Real Shipping Data API",
      status: "SKIP",
      duration: 0,
      details: "MarineTraffic API key not configured",
    });
  }

  // Test real weather data (if API key available)
  if (process.env.OPENWEATHERMAP_API_KEY) {
    results.push(await runTest(
      "Real Weather Data API",
      async () => {
        const response = await supplyChainAgent.text(
          "Get real weather data for Shanghai, Los Angeles, and Rotterdam ports"
        );
        if (!response || response.length < 30) {
          throw new Error("Real weather data API response insufficient");
        }
        return "Successfully fetched real weather data";
      }
    ));
  } else {
    results.push({
      testName: "Real Weather Data API",
      status: "SKIP",
      duration: 0,
      details: "OpenWeatherMap API key not configured",
    });
  }

  // Test real news monitoring (if API key available)
  if (process.env.NEWSAPI_KEY) {
    results.push(await runTest(
      "Real News Monitoring API",
      async () => {
        const response = await supplyChainAgent.text(
          "Monitor real news feeds for supply chain disruptions using NewsAPI"
        );
        if (!response || response.length < 30) {
          throw new Error("Real news API response insufficient");
        }
        return "Successfully monitored real news feeds";
      }
    ));
  } else {
    results.push({
      testName: "Real News Monitoring API",
      status: "SKIP",
      duration: 0,
      details: "NewsAPI key not configured",
    });
  }

  const endTime = Date.now();
  return compileSuiteResults("API Integration Tests", results, endTime - startTime);
}

// Monitoring and performance tests
export async function runMonitoringTests(): Promise<TestSuite> {
  const results: TestResult[] = [];
  const startTime = Date.now();

  // Test system performance monitoring
  results.push(await runTest(
    "System Performance Monitor",
    async () => {
      const response = await supplyChainAgent.text(
        "Monitor current system performance including CPU, memory, and API response times"
      );
      if (!response || !response.toLowerCase().includes("performance")) {
        throw new Error("Performance monitoring not found");
      }
      return "Successfully monitored system performance";
    }
  ));

  // Test API health check
  results.push(await runTest(
    "API Health Check",
    async () => {
      const response = await supplyChainAgent.text(
        "Check health status of all integrated APIs and services"
      );
      if (!response || !response.toLowerCase().includes("health")) {
        throw new Error("API health check not found");
      }
      return "Successfully checked API health";
    }
  ));

  // Test data quality assessment
  results.push(await runTest(
    "Data Quality Assessment",
    async () => {
      const response = await supplyChainAgent.text(
        "Assess data quality for shipping, weather, and news data sources"
      );
      if (!response || !response.toLowerCase().includes("quality")) {
        throw new Error("Data quality assessment not found");
      }
      return "Successfully assessed data quality";
    }
  ));

  // Test GPU optimization
  results.push(await runTest(
    "GPU Optimization",
    async () => {
      const response = await supplyChainAgent.text(
        "Optimize GPU utilization for satellite image analysis workload"
      );
      if (!response || !response.toLowerCase().includes("gpu")) {
        throw new Error("GPU optimization not found");
      }
      return "Successfully optimized GPU utilization";
    }
  ));

  const endTime = Date.now();
  return compileSuiteResults("Monitoring Tests", results, endTime - startTime);
}

// Complex scenario tests
export async function runComplexScenarioTests(): Promise<TestSuite> {
  const results: TestResult[] = [];
  const startTime = Date.now();

  // Test multi-factor crisis scenario
  results.push(await runTest(
    "Multi-Factor Crisis Scenario",
    async () => {
      const response = await supplyChainAgent.text(
        "Analyze a scenario where there's a port strike in Los Angeles, severe weather in the Pacific, and new trade sanctions on electronics. Provide comprehensive risk assessment and mitigation strategies."
      );
      if (!response || response.length < 200) {
        throw new Error("Complex scenario analysis insufficient");
      }
      return "Successfully analyzed multi-factor crisis scenario";
    },
    15000 // Longer timeout for complex analysis
  ));

  // Test end-to-end supply chain analysis
  results.push(await runTest(
    "End-to-End Supply Chain Analysis",
    async () => {
      const response = await supplyChainAgent.text(
        "Perform complete supply chain analysis for automotive industry from raw materials in South America to manufacturing in Asia to distribution in North America. Include all risk factors, optimization recommendations, and contingency plans."
      );
      if (!response || response.length < 300) {
        throw new Error("End-to-end analysis insufficient");
      }
      return "Successfully performed end-to-end supply chain analysis";
    },
    20000 // Longer timeout for comprehensive analysis
  ));

  // Test real-time decision support
  results.push(await runTest(
    "Real-Time Decision Support",
    async () => {
      const response = await supplyChainAgent.text(
        "A critical shipment of medical supplies is delayed due to port congestion in Singapore. Provide immediate alternative routing options, cost implications, and timeline adjustments. Consider weather, political stability, and infrastructure capacity."
      );
      if (!response || !response.toLowerCase().includes("alternative")) {
        throw new Error("Decision support response insufficient");
      }
      return "Successfully provided real-time decision support";
    },
    10000
  ));

  const endTime = Date.now();
  return compileSuiteResults("Complex Scenario Tests", results, endTime - startTime);
}

// Run all test suites
export async function runAllTests(): Promise<{
  suites: TestSuite[];
  overallSummary: {
    totalSuites: number;
    totalTests: number;
    totalPassed: number;
    totalFailed: number;
    totalSkipped: number;
    totalDuration: number;
    successRate: number;
  };
}> {
  console.log("🧪 Starting Comprehensive Supply Chain Agent Testing");
  console.log("=" .repeat(60));

  // Initialize configuration
  initializeConfiguration();

  const suites: TestSuite[] = [];
  const overallStartTime = Date.now();

  try {
    console.log("\n📦 Running Core Tools Tests...");
    suites.push(await runCoreToolsTests());

    console.log("\n🔬 Running Advanced Tools Tests...");
    suites.push(await runAdvancedToolsTests());

    console.log("\n🌐 Running API Integration Tests...");
    suites.push(await runAPIIntegrationTests());

    console.log("\n📊 Running Monitoring Tests...");
    suites.push(await runMonitoringTests());

    console.log("\n🎯 Running Complex Scenario Tests...");
    suites.push(await runComplexScenarioTests());

  } catch (error) {
    console.error("❌ Test execution failed:", error);
  }

  const overallEndTime = Date.now();
  const overallDuration = overallEndTime - overallStartTime;

  // Calculate overall summary
  const totalTests = suites.reduce((sum, suite) => sum + suite.totalTests, 0);
  const totalPassed = suites.reduce((sum, suite) => sum + suite.passedTests, 0);
  const totalFailed = suites.reduce((sum, suite) => sum + suite.failedTests, 0);
  const totalSkipped = suites.reduce((sum, suite) => sum + suite.skippedTests, 0);
  const successRate = totalTests > 0 ? (totalPassed / totalTests) * 100 : 0;

  const overallSummary = {
    totalSuites: suites.length,
    totalTests,
    totalPassed,
    totalFailed,
    totalSkipped,
    totalDuration: overallDuration,
    successRate,
  };

  // Print results
  printTestResults(suites, overallSummary);

  return { suites, overallSummary };
}

// Helper functions
async function runTest(
  testName: string,
  testFunction: () => Promise<string>,
  timeout: number = 5000
): Promise<TestResult> {
  const startTime = Date.now();
  
  try {
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error("Test timeout")), timeout);
    });

    const details = await Promise.race([testFunction(), timeoutPromise]);
    const duration = Date.now() - startTime;

    return {
      testName,
      status: "PASS",
      duration,
      details,
    };
  } catch (error) {
    const duration = Date.now() - startTime;
    return {
      testName,
      status: "FAIL",
      duration,
      details: "Test failed",
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

function compileSuiteResults(suiteName: string, results: TestResult[], totalDuration: number): TestSuite {
  const passedTests = results.filter(r => r.status === "PASS").length;
  const failedTests = results.filter(r => r.status === "FAIL").length;
  const skippedTests = results.filter(r => r.status === "SKIP").length;

  return {
    suiteName,
    results,
    totalTests: results.length,
    passedTests,
    failedTests,
    skippedTests,
    totalDuration,
  };
}

function printTestResults(suites: TestSuite[], overallSummary: any): void {
  console.log("\n" + "=" .repeat(60));
  console.log("🧪 TEST RESULTS SUMMARY");
  console.log("=" .repeat(60));

  // Print suite results
  suites.forEach(suite => {
    const successRate = suite.totalTests > 0 ? (suite.passedTests / suite.totalTests) * 100 : 0;
    const statusIcon = successRate === 100 ? "✅" : successRate >= 80 ? "⚠️" : "❌";
    
    console.log(`\n${statusIcon} ${suite.suiteName}`);
    console.log(`   Tests: ${suite.totalTests} | Passed: ${suite.passedTests} | Failed: ${suite.failedTests} | Skipped: ${suite.skippedTests}`);
    console.log(`   Success Rate: ${successRate.toFixed(1)}% | Duration: ${suite.totalDuration}ms`);

    // Print failed tests
    const failedTests = suite.results.filter(r => r.status === "FAIL");
    if (failedTests.length > 0) {
      console.log("   Failed Tests:");
      failedTests.forEach(test => {
        console.log(`     ❌ ${test.testName}: ${test.error}`);
      });
    }

    // Print skipped tests
    const skippedTests = suite.results.filter(r => r.status === "SKIP");
    if (skippedTests.length > 0) {
      console.log("   Skipped Tests:");
      skippedTests.forEach(test => {
        console.log(`     ⏭️  ${test.testName}: ${test.details}`);
      });
    }
  });

  // Print overall summary
  console.log("\n" + "=" .repeat(60));
  console.log("📊 OVERALL SUMMARY");
  console.log("=" .repeat(60));
  console.log(`Total Test Suites: ${overallSummary.totalSuites}`);
  console.log(`Total Tests: ${overallSummary.totalTests}`);
  console.log(`Passed: ${overallSummary.totalPassed} ✅`);
  console.log(`Failed: ${overallSummary.totalFailed} ❌`);
  console.log(`Skipped: ${overallSummary.totalSkipped} ⏭️`);
  console.log(`Success Rate: ${overallSummary.successRate.toFixed(1)}%`);
  console.log(`Total Duration: ${(overallSummary.totalDuration / 1000).toFixed(2)}s`);

  const overallStatus = overallSummary.successRate === 100 ? "🎉 ALL TESTS PASSED!" :
                       overallSummary.successRate >= 80 ? "⚠️  MOSTLY SUCCESSFUL" :
                       "❌ NEEDS ATTENTION";
  
  console.log(`\nStatus: ${overallStatus}`);
  console.log("=" .repeat(60));
}