jest.mock('~/utils/isProductionMode', () => ({
  isProductionMode: () => false
}));

jest.mock('~/components/under-development/UnderDevelopment', () => ({
  __esModule: true,
  default: () => null
}));
