import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { getLocale, getTranslations, setRequestLocale } from 'next-intl/server';

import News, { generateMetadata } from './page';
import { isProductionMode } from '~/utils/isProductionMode';

import { createRequestContainer } from '~/di/container';

jest.mock('~/di/container', () => ({
  createRequestContainer: jest.fn()
}));

jest.mock('~/utils/isProductionMode', () => ({
  isProductionMode: jest.fn()
}));

jest.mock('next-intl/server', () => ({
  setRequestLocale: jest.fn(),
  getLocale: jest.fn(),
  getTranslations: jest.fn()
}));

jest.mock('~/components/under-development/UnderDevelopment', () => ({
  __esModule: true,
  default: () => <div data-testid="UnderDevelopment" />
}));

jest.mock('~/layouts/main-layout/MainLayout', () => ({
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

describe('News page', () => {
  const mockParams = { lang: 'uk' as const };
  const mockPromiseParams = Promise.resolve(mockParams);

  const mockNewsService = {
    getAllPublishedNews: jest.fn().mockResolvedValue([])
  };

  const mockEventService = {
    getAllPublishedEvents: jest.fn().mockResolvedValue([])
  };

  const mockMediaMentionService = {
    getAllPublishedMediaMentions: jest.fn().mockResolvedValue([])
  };

  const mockContainer = {
    resolve: jest.fn((service: string) => {
      if (service === 'newsService') return mockNewsService;
      if (service === 'eventService') return mockEventService;
      if (service === 'mediaMentionService') return mockMediaMentionService;
      return null;
    })
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (createRequestContainer as jest.Mock).mockReturnValue(mockContainer);
    (getLocale as jest.Mock).mockResolvedValue('uk');
    (getTranslations as jest.Mock).mockResolvedValue((key: string) => key);
  });

  // ВАЖНО: Покрываем строки 17-28 (generateMetadata)
  it('should generate correct metadata', async () => {
    const metadata = await generateMetadata({ params: mockPromiseParams });

    expect(setRequestLocale).toHaveBeenCalledWith('uk');
    expect(getTranslations).toHaveBeenCalledWith('meta.pages.news');
    expect(metadata).toBeDefined();
    expect(metadata.title).toBe('title');
  });

  it('should render UnderDevelopment when production mode is enabled', async () => {
    (isProductionMode as jest.Mock).mockReturnValue(true);

    const NewsComponent = await News({ params: mockPromiseParams });
    render(NewsComponent);

    expect(screen.getByTestId('UnderDevelopment')).toBeInTheDocument();
    expect(screen.queryByTestId('MainLayout')).not.toBeInTheDocument();
  });

  it('should render page content when production mode is disabled', async () => {
    (isProductionMode as jest.Mock).mockReturnValue(false);

    const NewsComponent = await News({ params: mockPromiseParams });
    render(NewsComponent);

    expect(screen.getByTestId('MainLayout')).toBeInTheDocument();
    expect(screen.getByTestId('MediaIntroSection')).toBeInTheDocument();
    expect(screen.getByTestId('MediaCenter')).toBeInTheDocument();

    expect(mockNewsService.getAllPublishedNews).toHaveBeenCalledWith('uk');
    expect(mockMediaMentionService.getAllPublishedMediaMentions).toHaveBeenCalled();
  });
});
