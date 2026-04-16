import { render } from '@testing-library/react';
import React from 'react';

jest.mock('mongoose', () => ({
  Schema: class {},
  model: jest.fn(),
  models: {},
  connect: jest.fn()
}));
jest.mock('@azure/storage-blob', () => ({}));
jest.mock('@azure/core-rest-pipeline', () => ({}));
jest.mock('~/services/upload/upload', () => ({ createAzureStorageService: jest.fn() }));

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

jest.mock(
  '~/layouts/main-layout/MainLayout',
  () =>
    function MockLayout({ children }: any) {
      return <div data-testid="layout">{children}</div>;
    }
);
jest.mock('~/shared/components/blocks/home-page-hero/animation', () => ({
  IntroAnimation: function MockAnim({ children }: any) {
    return <div data-testid="anim">{children}</div>;
  }
}));

jest.mock('~/di/container', () => ({
  createRequestContainer: jest.fn(() => ({ resolve: jest.fn() })),
  container: { resolve: jest.fn() }
}));
jest.mock('~/services/pages-data/resolvePageData', () => ({
  resolvePageData: jest.fn().mockResolvedValue('MOCK_RESULT')
}));
jest.mock('~/types/types/result', () => ({
  isError: jest.fn().mockReturnValue(false),
  UnwrapResult: jest.fn().mockReturnValue({
    blocks: { LiatoshynskyOffice: {} }
  })
}));

jest.mock('next-intl/server', () => ({
  getTranslations: jest.fn().mockResolvedValue((key: string) => key),
  setRequestLocale: jest.fn()
}));
jest.mock('~/utils/isProductionMode', () => ({
  isProductionMode: jest.fn().mockReturnValue(false)
}));

import Home from './page';

describe('Home Main Page', () => {
  it('should render the home page without crashing', async () => {
    const mockParams = Promise.resolve({ lang: 'uk' as any });

    const ResolvedPage = await Home({ params: mockParams });

    const { container } = render(ResolvedPage);

    expect(container).toBeTruthy();
  });
});
