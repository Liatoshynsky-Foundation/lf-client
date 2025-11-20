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
    Link: ({ children, href }: { children: React.ReactNode; href?: string }) =>
      React.createElement('a', { href }, children),
    redirect: () => undefined,
    usePathname: () => '/',
    useRouter: () => ({}),
    getPathname: () => '/'
  })
}));

jest.mock('next-intl/routing', () => ({
  defineRouting: (config: Record<string, unknown>) => config
}));
