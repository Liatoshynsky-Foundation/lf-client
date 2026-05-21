import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const AZURE_SAS_URL = process.env.AZURE_SAS_URL;
const azureHostname = AZURE_SAS_URL ? new URL(AZURE_SAS_URL).hostname : null;

const STORAGE_BASE_URL = process.env.STORAGE_BASE_URL;
const storageHostname = STORAGE_BASE_URL ? new URL(STORAGE_BASE_URL).hostname : null;

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      ...(azureHostname ? [{ protocol: 'https' as const, hostname: azureHostname, port: '', pathname: '/**' }] : []),
      ...(storageHostname
        ? [{ protocol: 'https' as const, hostname: storageHostname, port: '', pathname: '/**' }]
        : []),
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
