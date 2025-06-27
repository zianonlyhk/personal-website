import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    // Enables standalone output mode which creates a minimal server for production
    // Useful for Docker deployments as it includes only necessary files
    output: 'standalone',
    images: {
        unoptimized: true, // For static exports, optimization requires a server
        formats: ['image/webp', 'image/avif'], // Modern image formats for better performance
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    },
    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
    },
    // Enable compression for better performance
    compress: true,
    // Enable experimental features for better SEO
    experimental: {
        optimizePackageImports: ['react-icons'],
    },
    // Headers for better SEO and security
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff',
                    },
                    {
                        key: 'X-Frame-Options',
                        value: 'DENY',
                    },
                    {
                        key: 'X-XSS-Protection',
                        value: '1; mode=block',
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'origin-when-cross-origin',
                    },
                ],
            },
        ];
    },
};

export default nextConfig;
