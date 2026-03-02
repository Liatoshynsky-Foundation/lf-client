/* eslint-disable @typescript-eslint/no-explicit-any */
import { createElement, React, ReactNode } from 'react';
jest.mock('swiper/css', () => ({}));
jest.mock('swiper/css/navigation', () => ({}));
jest.mock('swiper/css/pagination', () => ({}));
jest.mock('swiper/react', () => ({
  Swiper: ({ children }: any) => React.createElement('div', { 'data-testid': 'swiper-mock' }, children),
  SwiperSlide: ({ children }: any) => React.createElement('div', { 'data-testid': 'swiper-slide-mock' }, children)
}));
jest.mock('swiper/modules', () => ({
  Navigation: (props: any) => null,
  Pagination: (props: any) => null,
  Autoplay: (props: any) => null
}));

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
