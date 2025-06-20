import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

import { AZURE_BLOB_NET } from '~/constants';
const STORAGE_ACCOUNT = process.env.STORAGE_ACCOUNT;

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: `${STORAGE_ACCOUNT}.${AZURE_BLOB_NET}`,
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
