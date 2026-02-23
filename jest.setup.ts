import { createElement, ReactNode } from 'react';

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

jest.mock('next-intl/navigation', () => ({
  createNavigation: () => ({
    Link: ({ children, href }: { children: ReactNode; href?: string }) => createElement('a', { href }, children),
    redirect: () => undefined,
    usePathname: () => '/',
    useRouter: () => ({}),
    getPathname: () => '/'
  })
}));

jest.mock('next-intl/routing', () => ({
  defineRouting: (config: Record<string, unknown>) => config
}));

jest.mock('next-intl/server', () => ({
  getTranslations: jest.fn().mockResolvedValue((key: string) => key),
  setRequestLocale: jest.fn().mockResolvedValue(() => undefined)
}));
