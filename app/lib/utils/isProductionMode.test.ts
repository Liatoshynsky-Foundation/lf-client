jest.unmock('~/utils/isProductionMode');

import { isProductionMode } from './isProductionMode';

type MockedProcessEnv = {
  NODE_ENV?: string;
};

describe('isProductionMode', () => {
  const originalNodeEnv = process.env.NODE_ENV;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    if (originalNodeEnv) {
      (process.env as MockedProcessEnv).NODE_ENV = originalNodeEnv;
    } else {
      delete (process.env as MockedProcessEnv).NODE_ENV;
    }
  });

  // it('should return true when NODE_ENV is "production"', () => {
  //   (process.env as MockedProcessEnv).NODE_ENV = 'production';
  //   const result = isProductionMode();
  //   expect(result).toBe(true);
  // });

  it('should return false when NODE_ENV is "development"', () => {
    (process.env as MockedProcessEnv).NODE_ENV = 'development';
    const result = isProductionMode();
    expect(result).toBe(false);
  });

  it('should return false when NODE_ENV is undefined', () => {
    delete (process.env as MockedProcessEnv).NODE_ENV;
    const result = isProductionMode();
    expect(result).toBe(false);
  });
});
