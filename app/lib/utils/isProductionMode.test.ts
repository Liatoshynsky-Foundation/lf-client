jest.unmock('~/utils/isProductionMode');

import { isProductionMode } from './isProductionMode';

type MockedProcessEnv = {
  SHOW_MODE?: string;
};

describe('isProductionMode', () => {
  const originalNodeEnv = process.env.SHOW_MODE;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    if (originalNodeEnv) {
      (process.env as MockedProcessEnv).SHOW_MODE = originalNodeEnv;
    } else {
      delete (process.env as MockedProcessEnv).SHOW_MODE;
    }
  });

  it('should return true when NODE_ENV is "production"', () => {
    (process.env as MockedProcessEnv).SHOW_MODE = 'production';
    const result = isProductionMode();
    expect(result).toBe(true);
  });

  it('should return false when NODE_ENV is "development"', () => {
    (process.env as MockedProcessEnv).SHOW_MODE = 'development';
    const result = isProductionMode();
    expect(result).toBe(false);
  });

  it('should return false when NODE_ENV is undefined', () => {
    delete (process.env as MockedProcessEnv).SHOW_MODE;
    const result = isProductionMode();
    expect(result).toBe(false);
  });
});
