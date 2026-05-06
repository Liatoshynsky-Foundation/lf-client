import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const AZURE_SAS_URL = process.env.AZURE_SAS_URL;
const azureHostname = AZURE_SAS_URL ? new URL(AZURE_SAS_URL).hostname : '';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: azureHostname,
        port: '',
        pathname: '/**'
      },
      //dev only! remove in production
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**'
      }
    ]
  },
  output: 'standalone',
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      use: ['@svgr/webpack']
    });
    return config;
  },
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js'
      }
    }
  }
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
