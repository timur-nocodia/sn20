/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  reactStrictMode: true,
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['@mui/icons-material', 'lodash', 'luxon', '@headlessui/react', 'recharts'],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  images: {
    unoptimized: false,
    minimumCacheTTL: 60,
  },
  // Global page performance
  poweredByHeader: false,
  compress: true,
  productionBrowserSourceMaps: false,
  webpack: (config) => {
    config.optimization.splitChunks = {
      chunks: 'all',
      minSize: 20000,
      maxSize: 244000,
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name(module, chunks, cacheGroupKey) {
            return `vendor-${chunks[0].name}`;
          },
          chunks: 'all'
        }
      }
    }
    return config
  }
}

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer(nextConfig)
