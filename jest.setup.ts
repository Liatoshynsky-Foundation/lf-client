/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { createElement, ReactNode } from 'react';

import { ROUTES } from '~/shared/components/constants/routes';
jest.mock('swiper/css', () => ({}));
jest.mock('swiper/css/navigation', () => ({}));
jest.mock('swiper/css/pagination', () => ({}));
jest.mock('swiper/react', () => ({
  Swiper: ({ children }: any) => React.createElement('div', { 'data-testid': 'swiper-mock' }, children),
  SwiperSlide: ({ children }: any) => React.createElement('div', { 'data-testid': 'swiper-slide-mock' }, children)
}));
jest.mock('swiper/modules', () => ({
  Navigation: (_props: any) => null,
  Pagination: (_props: any) => null,
  Autoplay: (_props: any) => null
}));

jest.mock('~/middleware/logger/logger', () => ({
  __esModule: true,
  default: {
    error: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
    warning: jest.fn()
  },
  logger: {
    error: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
    warning: jest.fn()
  }
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
    usePathname: () => ROUTES.HOME,
    useRouter: () => ({}),
    getPathname: () => ROUTES.HOME
  })
}));

jest.mock('next-intl/routing', () => ({
  defineRouting: (config: Record<string, unknown>) => config
}));

jest.mock('next-intl/server', () => ({
  getTranslations: jest.fn().mockResolvedValue((key: string) => key),
  setRequestLocale: jest.fn().mockResolvedValue(() => undefined)
}));

jest.mock('mongoose', () => {
  const actualMongoose = jest.requireActual('mongoose');
  return {
    ...actualMongoose,
    connect: jest.fn().mockResolvedValue(true),
    connection: {
      on: jest.fn(),
      once: jest.fn(),
      close: jest.fn().mockResolvedValue(true),
      readyState: 1
    },
    disconnect: jest.fn().mockResolvedValue(true)
  };
});

jest.mock('@azure/storage-blob', () => ({
  BlobServiceClient: {
    fromConnectionString: jest.fn().mockReturnValue({
      getContainerClient: jest.fn().mockReturnValue({
        getBlockBlobClient: jest.fn().mockReturnValue({
          upload: jest.fn().mockResolvedValue({}),
          uploadData: jest.fn().mockResolvedValue({})
        })
      })
    })
  }
}));
