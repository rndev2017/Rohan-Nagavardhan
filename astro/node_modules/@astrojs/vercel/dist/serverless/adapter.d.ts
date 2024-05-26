import type { AstroIntegration } from 'astro';
import { type DevImageService, type VercelImageConfig } from '../image/shared.js';
import { type VercelSpeedInsightsConfig } from '../lib/speed-insights.js';
import { type VercelWebAnalyticsConfig } from '../lib/web-analytics.js';
export declare const ASTRO_LOCALS_HEADER = "x-astro-locals";
export declare const VERCEL_EDGE_MIDDLEWARE_FILE = "vercel-edge-middleware";
export interface VercelServerlessConfig {
    /**
     * @deprecated
     */
    analytics?: boolean;
    webAnalytics?: VercelWebAnalyticsConfig;
    speedInsights?: VercelSpeedInsightsConfig;
    includeFiles?: string[];
    excludeFiles?: string[];
    imageService?: boolean;
    imagesConfig?: VercelImageConfig;
    devImageService?: DevImageService;
    edgeMiddleware?: boolean;
    functionPerRoute?: boolean;
}
export default function vercelServerless({ analytics, webAnalytics, speedInsights, includeFiles, excludeFiles, imageService, imagesConfig, devImageService, functionPerRoute, edgeMiddleware, }?: VercelServerlessConfig): AstroIntegration;
