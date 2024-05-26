export type VercelWebAnalyticsConfig = {
    enabled: boolean;
};
export declare function getInjectableWebAnalyticsContent({ mode, }: {
    mode: 'development' | 'production';
}): Promise<string>;
