import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    // Enables standalone output mode which creates a minimal server for production
    // Useful for Docker deployments as it includes only necessary files
    output: 'standalone',
    images: {
        unoptimized: true, // For static exports, optimization requires a server
    },
    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
    },
};

export default nextConfig;
