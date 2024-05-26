import type { AstroIntegration } from 'astro';
import { type DevImageService, type VercelImageConfig } from '../image/shared.js';
import { type VercelSpeedInsightsConfig } from '../lib/speed-insights.js';
import { type VercelWebAnalyticsConfig } from '../lib/web-analytics.js';
export interface VercelStaticConfig {
    /**
     * @deprecated
     */
    analytics?: boolean;
    webAnalytics?: VercelWebAnalyticsConfig;
    speedInsights?: VercelSpeedInsightsConfig;
    imageService?: boolean;
    imagesConfig?: VercelImageConfig;
    devImageService?: DevImageService;
}
export default function vercelStatic({ analytics, webAnalytics, speedInsights, imageService, imagesConfig, devImageService, }?: VercelStaticConfig): AstroIntegration;
