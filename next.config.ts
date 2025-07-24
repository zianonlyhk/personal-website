import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    // Enables standalone output mode which creates a minimal server for production
    // Useful for Docker deployments as it includes only necessary files
    output: 'standalone',
    images: {
        unoptimized: false, // Enable image optimization for better performance
        formats: ['image/webp', 'image/avif'], // Modern image formats for better performance
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        dangerouslyAllowSVG: true,
        contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    },
    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
    },
    // Enable compression for better performance
    compress: true,
    // Optimize server response time
    poweredByHeader: false,
    generateEtags: false,
    // Enable experimental features for better performance and SEO
    experimental: {
        optimizePackageImports: ['react-icons', '@fortawesome/react-fontawesome', '@fortawesome/free-solid-svg-icons', '@fortawesome/free-brands-svg-icons'],
        webpackBuildWorker: true,
    },
    // Additional optimizations
    productionBrowserSourceMaps: false,
    // Headers for better performance, SEO and security
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
                    {
                        key: 'X-DNS-Prefetch-Control',
                        value: 'on',
                    },
                ],
            },
            {
                source: '/favicon_mascot.png',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable',
                    },
                ],
            },
            {
                source: '/(.*)\\.(css|js|png|jpg|jpeg|gif|ico|svg|woff|woff2)',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable',
                    },
                ],
            },
        ];
    },
};

export default nextConfig;
