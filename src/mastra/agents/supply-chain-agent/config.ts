import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// API Configuration Interface
export interface APIConfig {
  marineTraffic: {
    apiKey: string;
    baseUrl: string;
    rateLimit: number; // requests per minute
  };
  openWeatherMap: {
    apiKey: string;
    baseUrl: string;
    rateLimit: number;
  };
  newsApi: {
    apiKey: string;
    baseUrl: string;
    rateLimit: number;
  };
  alphaVantage: {
    apiKey: string;
    baseUrl: string;
    rateLimit: number;
  };
  satelliteImagery: {
    apiKey: string;
    provider: 'planet' | 'sentinel' | 'maxar';
    baseUrl: string;
    rateLimit: number;
  };
  tradingEconomics: {
    apiKey: string;
    baseUrl: string;
    rateLimit: number;
  };
}

// Default configuration
export const defaultConfig: APIConfig = {
  marineTraffic: {
    apiKey: process.env.MARINETRAFFIC_API_KEY || '',
    baseUrl: 'https://services.marinetraffic.com/api',
    rateLimit: 60, // 60 requests per minute
  },
  openWeatherMap: {
    apiKey: process.env.OPENWEATHERMAP_API_KEY || '',
    baseUrl: 'https://api.openweathermap.org/data/2.5',
    rateLimit: 1000, // 1000 requests per minute
  },
  newsApi: {
    apiKey: process.env.NEWSAPI_KEY || '',
    baseUrl: 'https://newsapi.org/v2',
    rateLimit: 500, // 500 requests per day for free tier
  },
  alphaVantage: {
    apiKey: process.env.ALPHA_VANTAGE_API_KEY || '',
    baseUrl: 'https://www.alphavantage.co/query',
    rateLimit: 5, // 5 requests per minute for free tier
  },
  satelliteImagery: {
    apiKey: process.env.PLANET_LABS_API_KEY || process.env.SATELLITE_API_KEY || '',
    provider: (process.env.SATELLITE_PROVIDER as 'planet' | 'sentinel' | 'maxar') || 'planet',
    baseUrl: 'https://api.planet.com/data/v1',
    rateLimit: 100, // 100 requests per minute
  },
  tradingEconomics: {
    apiKey: process.env.TRADING_ECONOMICS_API_KEY || '',
    baseUrl: 'https://api.tradingeconomics.com',
    rateLimit: 100, // 100 requests per minute
  },
};

// Validation function to check if required API keys are configured
export function validateAPIConfiguration(): { isValid: boolean; missingKeys: string[]; warnings: string[] } {
  const missingKeys: string[] = [];
  const warnings: string[] = [];

  // Check required API keys
  if (!defaultConfig.marineTraffic.apiKey) {
    missingKeys.push('MARINETRAFFIC_API_KEY');
  }
  
  if (!defaultConfig.openWeatherMap.apiKey) {
    missingKeys.push('OPENWEATHERMAP_API_KEY');
  }
  
  if (!defaultConfig.newsApi.apiKey) {
    missingKeys.push('NEWSAPI_KEY');
  }

  // Optional but recommended API keys
  if (!defaultConfig.alphaVantage.apiKey) {
    warnings.push('ALPHA_VANTAGE_API_KEY not configured - economic data will be simulated');
  }
  
  if (!defaultConfig.satelliteImagery.apiKey) {
    warnings.push('SATELLITE_API_KEY not configured - satellite analysis will be simulated');
  }
  
  if (!defaultConfig.tradingEconomics.apiKey) {
    warnings.push('TRADING_ECONOMICS_API_KEY not configured - some economic indicators will be simulated');
  }

  return {
    isValid: missingKeys.length === 0,
    missingKeys,
    warnings,
  };
}

// Rate limiting configuration
export interface RateLimitConfig {
  windowMs: number; // Time window in milliseconds
  maxRequests: number; // Maximum requests per window
  skipSuccessfulRequests: boolean;
  skipFailedRequests: boolean;
}

export const rateLimitConfigs: Record<string, RateLimitConfig> = {
  marineTraffic: {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 60,
    skipSuccessfulRequests: false,
    skipFailedRequests: true,
  },
  openWeatherMap: {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 1000,
    skipSuccessfulRequests: false,
    skipFailedRequests: true,
  },
  newsApi: {
    windowMs: 24 * 60 * 60 * 1000, // 24 hours
    maxRequests: 500,
    skipSuccessfulRequests: false,
    skipFailedRequests: true,
  },
  alphaVantage: {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 5,
    skipSuccessfulRequests: false,
    skipFailedRequests: true,
  },
};

// Monitoring configuration
export interface MonitoringConfig {
  enableMetrics: boolean;
  enableLogging: boolean;
  logLevel: 'debug' | 'info' | 'warn' | 'error';
  metricsInterval: number; // in milliseconds
  alertThresholds: {
    errorRate: number; // percentage
    responseTime: number; // milliseconds
    apiFailureRate: number; // percentage
  };
}

export const monitoringConfig: MonitoringConfig = {
  enableMetrics: process.env.ENABLE_METRICS === 'true',
  enableLogging: process.env.ENABLE_LOGGING !== 'false', // default to true
  logLevel: (process.env.LOG_LEVEL as 'debug' | 'info' | 'warn' | 'error') || 'info',
  metricsInterval: parseInt(process.env.METRICS_INTERVAL || '60000'), // 1 minute
  alertThresholds: {
    errorRate: parseFloat(process.env.ERROR_RATE_THRESHOLD || '5'), // 5%
    responseTime: parseInt(process.env.RESPONSE_TIME_THRESHOLD || '5000'), // 5 seconds
    apiFailureRate: parseFloat(process.env.API_FAILURE_RATE_THRESHOLD || '10'), // 10%
  },
};

// Nosana GPU configuration
export interface NosanaConfig {
  enableGpuAcceleration: boolean;
  gpuMemoryLimit: string;
  batchSize: number;
  modelCacheSize: string;
  distributedProcessing: boolean;
}

export const nosanaConfig: NosanaConfig = {
  enableGpuAcceleration: process.env.ENABLE_GPU_ACCELERATION === 'true',
  gpuMemoryLimit: process.env.GPU_MEMORY_LIMIT || '4GB',
  batchSize: parseInt(process.env.GPU_BATCH_SIZE || '32'),
  modelCacheSize: process.env.MODEL_CACHE_SIZE || '2GB',
  distributedProcessing: process.env.ENABLE_DISTRIBUTED_PROCESSING === 'true',
};

// Cache configuration
export interface CacheConfig {
  enableCaching: boolean;
  cacheProvider: 'memory' | 'redis' | 'file';
  cacheTtl: number; // Time to live in seconds
  maxCacheSize: string;
}

export const cacheConfig: CacheConfig = {
  enableCaching: process.env.ENABLE_CACHING !== 'false', // default to true
  cacheProvider: (process.env.CACHE_PROVIDER as 'memory' | 'redis' | 'file') || 'memory',
  cacheTtl: parseInt(process.env.CACHE_TTL || '300'), // 5 minutes
  maxCacheSize: process.env.MAX_CACHE_SIZE || '100MB',
};

// Export all configurations
export const config = {
  api: defaultConfig,
  rateLimit: rateLimitConfigs,
  monitoring: monitoringConfig,
  nosana: nosanaConfig,
  cache: cacheConfig,
};

// Configuration validation on startup
export function initializeConfiguration(): void {
  const validation = validateAPIConfiguration();
  
  console.log('🔧 Supply Chain Agent Configuration');
  console.log('=' .repeat(50));
  
  if (validation.isValid) {
    console.log('✅ All required API keys are configured');
  } else {
    console.log('❌ Missing required API keys:');
    validation.missingKeys.forEach(key => console.log(`   - ${key}`));
    console.log('\n⚠️  Agent will use simulated data for missing APIs');
  }
  
  if (validation.warnings.length > 0) {
    console.log('\n⚠️  Warnings:');
    validation.warnings.forEach(warning => console.log(`   - ${warning}`));
  }
  
  console.log('\n📊 Configuration Summary:');
  console.log(`   - GPU Acceleration: ${nosanaConfig.enableGpuAcceleration ? 'Enabled' : 'Disabled'}`);
  console.log(`   - Caching: ${cacheConfig.enableCaching ? 'Enabled' : 'Disabled'}`);
  console.log(`   - Monitoring: ${monitoringConfig.enableMetrics ? 'Enabled' : 'Disabled'}`);
  console.log(`   - Log Level: ${monitoringConfig.logLevel}`);
  console.log('=' .repeat(50));
}