import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",

  webpack: (config, { dev }) => {
    if (!dev) {
      config.optimization.splitChunks = {
        chunks: "all",
        cacheGroups: {
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            reuseExistingChunk: true,
          },
          commons: {
            minChunks: 2,
            priority: -5,
            reuseExistingChunk: true,
          },
        },
      };

      config.optimization.concatenateModules = true;
    }

    config.ignoreWarnings = [{ module: /node_modules/ }];
    return config;
  },
};

export default nextConfig;
