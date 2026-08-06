import { render, screen } from '@testing-library/react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import React from 'react';

import Home, { generateMetadata } from './page';
import { isError, UnwrapResult } from '~/types/types/result';
import { isProductionMode } from '~/utils/isProductionMode';

import { createRequestContainer } from '~/di/container';
import { resolvePageData } from '~/services/pages-data/resolvePageData';

jest.mock('mongoose', () => ({
  Schema: class {},
  model: jest.fn(),
  models: {},
  connect: jest.fn()
}));
jest.mock(
  '~/components/blocks/home-page-hero/HeroSection',
  () =>
    function MockHero() {
      return <div data-testid="hero" />;
    }
);
jest.mock(
  '~/components/foundation-section/FoundationSection',
  () =>
    function MockFoundation() {
      return <div data-testid="foundation" />;
    }
);
jest.mock(
  '~/components/blocks/BiographySection/BiographySection',
  () =>
    function MockBio() {
      return <div data-testid="bio" />;
    }
);
jest.mock(
  '~/components/blocks/artistry-section/ArtistrySection',
  () =>
    function MockArtistry() {
      return <div data-testid="artistry" />;
    }
);
jest.mock(
  '~/components/events-section/EventSection',
  () =>
    function MockEvents() {
      return <div data-testid="events" />;
    }
);

const mockGetAllPublishedEvents = jest.fn();
jest.mock('~/di/container', () => ({
  createRequestContainer: jest.fn(() => ({
    resolve: jest.fn((serviceName: string) => {
      if (serviceName === 'eventService') {
        return {
          getAllPublishedEvents: mockGetAllPublishedEvents
        };
      }
      return {};
    })
  })),
  container: { resolve: jest.fn() }
}));

jest.mock(
  '~/components/blocks/news-section/NewsSection',
  () =>
    function MockNews() {
      return <div data-testid="news" />;
    }
);
jest.mock(
  '~/components/blocks/Liatoshynsky-office/LiatoshynskyOffice',
  () =>
    function MockOffice() {
      return <div data-testid="office" />;
    }
);
jest.mock(
  '~/components/blocks/cooperation-section/CooperationSection',
  () =>
    function MockCoop() {
      return <div data-testid="coop" />;
    }
);
jest.mock(
  '~/components/under-development/UnderDevelopment',
  () =>
    function MockDev() {
      return <div data-testid="dev" />;
    }
);
jest.mock('~/[lang]/[...unknown-route]/page-not-found/PageNotFound', () => ({
  PageNotFound: function MockNotFound() {
    return <div data-testid="not-found" />;
  }
}));
jest.mock('~/lib/utils/errorPageFactory', () => ({
  ErrorPageFactory: jest.fn(() => <div data-testid="error-page" />)
}));

jest.mock(
  '~/layouts/main-layout/MainLayout',
  () =>
    function MockLayout({ children }: { children: React.ReactNode }) {
      return <div data-testid="layout">{children}</div>;
    }
);
jest.mock('~/shared/components/blocks/home-page-hero/animation', () => ({
  IntroAnimation: function MockAnim({ children }: { children: React.ReactNode }) {
    return <div data-testid="anim">{children}</div>;
  }
}));

jest.mock('~/services/pages-data/resolvePageData', () => ({
  resolvePageData: jest.fn()
}));
jest.mock('~/types/types/result', () => ({
  isError: jest.fn(),
  UnwrapResult: jest.fn()
}));

jest.mock('next-intl/server', () => ({
  getTranslations: jest.fn(),
  setRequestLocale: jest.fn()
}));
jest.mock('~/utils/isProductionMode', () => ({
  isProductionMode: jest.fn()
}));
jest.mock('~/utils/createSeoMeta', () => ({
  createSeoMeta: jest.fn((meta) => meta)
}));

describe('Home Main Page', () => {
  const mockParams = Promise.resolve({ lang: 'uk' as const });

  beforeEach(() => {
    jest.clearAllMocks();
    (isProductionMode as unknown as jest.MockedFunction<typeof isProductionMode>).mockReturnValue(false);
    (isError as unknown as jest.MockedFunction<typeof isError>).mockReturnValue(false);
    (UnwrapResult as unknown as jest.MockedFunction<typeof UnwrapResult>).mockReturnValue({ blocks: {} });

    mockGetAllPublishedEvents.mockResolvedValue([]);
  });

  allTests();

  function allTests() {
    it('should generate metadata correctly', async () => {
      const mockT = jest.fn((key: string) => key);
      (getTranslations as jest.Mock).mockResolvedValue(mockT);

      const metadata = await generateMetadata({ params: mockParams });

      expect(setRequestLocale).toHaveBeenCalledWith('uk');
      expect(getTranslations).toHaveBeenCalledWith('meta.pages.home');
      expect(metadata).toEqual({
        title: 'title',
        description: 'description',
        url: '/',
        locale: 'uk'
      });
    });

    it('should render UnderDevelopment in production mode', async () => {
      (isProductionMode as jest.Mock).mockReturnValue(true);

      const ResolvedPage = await Home({ params: mockParams });
      render(ResolvedPage);

      expect(screen.getByTestId('dev')).toBeInTheDocument();
      expect(createRequestContainer).not.toHaveBeenCalled();
    });

    it('should render ErrorPageFactory when data resolution fails', async () => {
      (isError as unknown as jest.MockedFunction<typeof isError>).mockImplementation(() => true);
      (resolvePageData as jest.Mock).mockResolvedValue({ error: 'Failed' });

      const ResolvedPage = await Home({ params: mockParams });
      render(ResolvedPage);

      expect(screen.getByTestId('error-page')).toBeInTheDocument();
    });

    it('should render PageNotFound when page data is missing', async () => {
      (isError as unknown as jest.MockedFunction<typeof isError>).mockImplementation(() => false);
      (UnwrapResult as unknown as jest.MockedFunction<typeof UnwrapResult>).mockReturnValue(null);
      (resolvePageData as jest.Mock).mockResolvedValue({ data: null });

      const ResolvedPage = await Home({ params: mockParams });
      render(ResolvedPage);

      expect(screen.getByTestId('not-found')).toBeInTheDocument();
    });

    it('should render the full home page components layout successfully', async () => {
      const ResolvedPage = await Home({ params: mockParams });
      render(ResolvedPage);

      expect(screen.getByTestId('layout')).toBeInTheDocument();
      expect(screen.getByTestId('anim')).toBeInTheDocument();
      expect(screen.getByTestId('hero')).toBeInTheDocument();
      expect(screen.getByTestId('foundation')).toBeInTheDocument();
      expect(screen.getByTestId('bio')).toBeInTheDocument();
      expect(screen.getByTestId('artistry')).toBeInTheDocument();
      expect(screen.getByTestId('events')).toBeInTheDocument();
      expect(screen.getByTestId('news')).toBeInTheDocument();
    });
  }
});
