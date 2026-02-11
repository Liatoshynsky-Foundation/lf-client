import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import News from './page';

// mocks
jest.mock('~/di/container', () => ({
  createRequestContainer: jest.fn()
}));

jest.mock('~/lib/utils/isProductionMode', () => ({
  isProductionMode: jest.fn()
}));

jest.mock('next-intl/server', () => ({
  setRequestLocale: jest.fn(),
  getLocale: jest.fn(),
  getTranslations: jest.fn()
}));

jest.mock('~/shared/components/under-development/UnderDevelopment', () => ({
  __esModule: true,
  default: () => <div data-testid="UnderDevelopment" />
}));

jest.mock('~/shared/layouts/main-layout/MainLayout', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <div data-testid="MainLayout">{children}</div>
}));

jest.mock('./MediaIntroSection/MediaIntroSection', () => ({
  __esModule: true,
  default: () => <div data-testid="MediaIntroSection" />
}));

jest.mock('~/shared/components/blocks/media-center/MediaCenter', () => ({
  __esModule: true,
  default: () => <div data-testid="MediaCenter" />
}));

import { getLocale } from 'next-intl/server';

import { createRequestContainer } from '~/di/container';
import { isProductionMode } from '~/lib/utils/isProductionMode';

describe('News page', () => {
  const mockParams = { lang: 'uk' as const };

  const mockNewsService = {
    getAllPublishedNews: jest.fn().mockResolvedValue([])
  };

  const mockMediaMentionService = {
    getAllPublishedMediaMentions: jest.fn().mockResolvedValue([])
  };

  const mockContainer = {
    resolve: jest.fn((service: string) => {
      if (service === 'newsService') return mockNewsService;
      if (service === 'mediaMentionService') return mockMediaMentionService;
      return null;
    })
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (createRequestContainer as jest.Mock).mockReturnValue(mockContainer);
    (getLocale as jest.Mock).mockResolvedValue('uk');
  });

  it('should render UnderDevelopment when production mode is enabled', async () => {
    (isProductionMode as jest.Mock).mockReturnValue(true);

    const NewsComponent = await News({ params: Promise.resolve(mockParams) });
    render(NewsComponent);

    expect(screen.getByTestId('UnderDevelopment')).toBeInTheDocument();
    expect(screen.queryByTestId('MainLayout')).not.toBeInTheDocument();
  });

  it('should render MainLayout with MediaIntroSection and MediaCenter when production mode is disabled', async () => {
    (isProductionMode as jest.Mock).mockReturnValue(false);

    const NewsComponent = await News({ params: Promise.resolve(mockParams) });
    render(NewsComponent);

    expect(screen.getByTestId('MainLayout')).toBeInTheDocument();
    expect(screen.getByTestId('MediaIntroSection')).toBeInTheDocument();
    expect(screen.getByTestId('MediaCenter')).toBeInTheDocument();

    expect(screen.queryByTestId('UnderDevelopment')).not.toBeInTheDocument();
  });
});
