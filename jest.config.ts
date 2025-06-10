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
    '!app/types/**'
  ],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
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
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^~/public/(.*)$': '<rootDir>/public/$1',
    '^~/i18n/(.*)$': '<rootDir>/i18n/$1',
    '^~/utils/(.*)$': '<rootDir>/app/lib/utils/$1',
    '^~/ds-components/(.*)$': '<rootDir>/app/shared/components/design-system/all-components/$1',
    '^~/components/(.*)$': '<rootDir>/app/shared/components/$1',
    '^~/hooks/(.*)$': '<rootDir>/app/shared/hooks/$1',
    '^~/(.*)$': '<rootDir>/app/$1'
  },
  modulePaths: ['<rootDir>/app'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'ts-jest'
  },
  transformIgnorePatterns: ['node_modules/(?!(lodash-es)/)'],
  setupFilesAfterEnv: ['@testing-library/jest-dom']
};

export default createJestConfig(config);
