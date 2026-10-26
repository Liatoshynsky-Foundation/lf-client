import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { getLocale } from 'next-intl/server';

import News, { generateMetadata } from './page';
import { isError, UnwrapResult } from '~/types/types/result';
import { isProductionMode } from '~/utils/isProductionMode';

import { createRequestContainer } from '~/di/container';
import { getPageMetadata } from '~/lib/utils/getPageMetadata';
import { resolvePageData } from '~/services/pages-data/resolvePageData';

jest.mock('~/di/container', () => ({
  createRequestContainer: jest.fn()
}));

jest.mock('~/utils/isProductionMode', () => ({
  isProductionMode: jest.fn()
}));

jest.mock('next-intl/server', () => ({
  setRequestLocale: jest.fn(),
  getLocale: jest.fn()
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

jest.mock('~/services/pages-data/resolvePageData', () => ({
  resolvePageData: jest.fn()
}));

jest.mock('~/types/types/result', () => ({
  isError: jest.fn(),
  UnwrapResult: jest.fn()
}));

jest.mock('~/lib/utils/getPageMetadata', () => ({
  getPageMetadata: jest.fn()
}));

jest.mock('../[...unknown-route]/page-not-found/PageNotFound', () => ({
  PageNotFound: () => <div data-testid="PageNotFound" />
}));

describe('News page', () => {
  const mockParams = { lang: 'uk' as const };
  const mockPromiseParams = Promise.resolve(mockParams);
  const mockPage = {
    blocks: {
      PublicationsIntro: {
        publicationsIntro: {},
        publicationsOutro: {}
      }
    }
  };

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

    (resolvePageData as jest.Mock).mockResolvedValue({});
    (isError as unknown as jest.Mock).mockReturnValue(false);
    (UnwrapResult as jest.Mock).mockReturnValue(mockPage);

    (getPageMetadata as jest.Mock).mockResolvedValue({
      title: 'News title',
      description: 'News description'
    });

    (isProductionMode as jest.Mock).mockReturnValue(false);
  });

  it('should generate correct metadata', async () => {
    const metadata = await generateMetadata({ params: mockPromiseParams });

    expect(getPageMetadata).toHaveBeenCalledWith(
      mockPromiseParams,
      expect.objectContaining({
        pageTranslationKey: 'meta.pages.news',
        fetchPageMetaData: expect.any(Function)
      })
    );

    expect(metadata).toEqual({
      title: 'News title',
      description: 'News description'
    });
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

    expect(resolvePageData).toHaveBeenCalledWith('news', 'uk');
    expect(mockNewsService.getAllPublishedNews).toHaveBeenCalledWith('uk');
    expect(mockEventService.getAllPublishedEvents).toHaveBeenCalledWith('uk');
    expect(mockMediaMentionService.getAllPublishedMediaMentions).toHaveBeenCalled();
  });

  it('should not render MediaIntroSection when PublicationsIntro block is missing', async () => {
    (UnwrapResult as jest.Mock).mockReturnValue({
      blocks: {}
    });

    const NewsComponent = await News({ params: mockPromiseParams });
    render(NewsComponent);

    expect(screen.queryByTestId('MediaIntroSection')).not.toBeInTheDocument();
    expect(screen.getByTestId('MediaCenter')).toBeInTheDocument();
  });

  it('should render PageNotFound when publications page does not exist', async () => {
    (UnwrapResult as jest.Mock).mockReturnValue(null);

    const NewsComponent = await News({ params: mockPromiseParams });
    render(NewsComponent);

    expect(screen.getByTestId('PageNotFound')).toBeInTheDocument();
    expect(screen.queryByTestId('MainLayout')).not.toBeInTheDocument();
  });
});
