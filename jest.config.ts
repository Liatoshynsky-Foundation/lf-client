import type { Config } from 'jest';
import nextJest from 'next/jest';

const createJestConfig = nextJest({
  dir: './'
});

const config: Config = {
  bail: 1,
  collectCoverage: true,
  collectCoverageFrom: [
    'app/**/*.{js,jsx,ts,tsx}',
    '!app/**/*.test.{js,jsx,ts,tsx}',
    '!app/**/*.{types,d}.{ts,tsx}',
    '!app/constants/**',
    '!app/types/**',
    '!app/di/**',
    '!app/services/core/**',
    '!app/domain/**',
    '!app/infrastructure/models/**',
    '!app/robots.ts',
    '!app/sitemap.ts', // Exclude test files from coverage
    '!app/**/*.styles.{ts,tsx}',
    '!app/**/index.ts',
    '!app/**/logoSVGPaths.ts',
    '!app/**/*.schema.{ts,tsx}',
    '!app/**/constants.{ts,tsx}'
  ],
  coverageDirectory: 'coverage',
  coverageProvider: 'babel',
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
  coverageReporters: ['text', 'lcov', 'json', 'html'],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^.+\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.svg$': '<rootDir>/__mocks__/svgMock.js',
    '^~/public/(.*)$': '<rootDir>/public/$1',
    '^~/i18n/(.*)$': '<rootDir>/i18n/$1',
    '^~/utils/(.*)$': '<rootDir>/app/lib/utils/$1',
    '^~/ds-components/(.*)$': '<rootDir>/app/shared/components/design-system/all-components/$1',
    '^~/components/(.*)$': '<rootDir>/app/shared/components/$1',
    '^~/layouts/(.*)$': '<rootDir>/app/shared/layouts/$1',
    '^~/hooks/(.*)$': '<rootDir>/app/shared/hooks/$1',
    '^~/(.*)$': '<rootDir>/app/$1'
  },
  modulePaths: ['<rootDir>/app'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/'],
  transformIgnorePatterns: ['node_modules/(?!(next-intl|lodash-es|mongodb|winston-mongodb|bson)/)'],
  setupFilesAfterEnv: ['@testing-library/jest-dom', '<rootDir>/jest.setup.ts']
};

export default createJestConfig(config);
