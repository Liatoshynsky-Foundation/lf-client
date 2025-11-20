jest.mock('~/utils/isProductionMode', () => ({
  isProductionMode: () => false
}));

jest.mock('~/components/under-development/UnderDevelopment', () => ({
  __esModule: true,
  default: () => null
}));

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
  useFormatter: () => (v: unknown) => v
}));
