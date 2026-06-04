import { render, screen } from '@testing-library/react';
import { notFound } from 'next/navigation';

import type { ArticleDetailProps } from '~/components/blocks/article-detail/ArticleDetail';

import NewsDetailPage, { generateMetadata } from './page';

import { createSeoMeta } from '~/lib/utils/createSeoMeta';
import { formatIsoDateToDdMmYy } from '~/lib/utils/parseIsoDate';

const mockGetNewsBySlug = jest.fn();

let capturedArticleDetailProps: ArticleDetailProps | undefined;
let articleDetailCallCount = 0;

jest.mock('next/navigation', () => ({
  notFound: jest.fn(() => {
    throw new Error('NOT_FOUND');
  })
}));

jest.mock('next-intl/server', () => ({
  setRequestLocale: jest.fn(),
  getLocale: jest.fn(),
  getTranslations: jest.fn().mockResolvedValue((key: string) => key)
}));

jest.mock('~/di/container', () => ({
  createRequestContainer: jest.fn(() => ({
    resolve: jest.fn(() => ({
      getNewsBySlug: mockGetNewsBySlug
    }))
  }))
}));

jest.mock('~/lib/utils/createSeoMeta', () => ({
  createSeoMeta: jest.fn((config) => config)
}));

jest.mock('~/lib/utils/parseIsoDate', () => ({
  formatIsoDateToDdMmYy: jest.fn()
}));

jest.mock('~/components/blocks/article-detail/ArticleDetail', () => ({
  ArticleDetail: (props: ArticleDetailProps) => {
    capturedArticleDetailProps = props;
    articleDetailCallCount += 1;
    return <div data-testid="ArticleDetail" />;
  }
}));

const mockedNotFound = notFound as unknown as jest.Mock;
const mockedCreateSeoMeta = createSeoMeta as unknown as jest.Mock;
const mockedFormatDate = formatIsoDateToDdMmYy as jest.Mock;

const mockNews = {
  title: 'Тестова новина',
  description: 'Опис тестової новини',
  coverImage: { src: 'https://example.com/image.jpg', alt: 'Test' },
  publishedAt: '2024-05-01T00:00:00.000Z',
  content: {
    content: {
      blocks: [
        { id: '1', type: 'paragraph', props: {}, content: [{ type: 'text', text: 'Hello', styles: {} }], children: [] }
      ]
    }
  },
  meta: { views: 42 }
};

describe('generateMetadata', () => {
  beforeEach(() => {
    mockGetNewsBySlug.mockReset();
    mockedCreateSeoMeta.mockClear();
  });

  it('returns full metadata when news is found', async () => {
    mockGetNewsBySlug.mockResolvedValue(mockNews);

    const metadata = await generateMetadata({
      params: Promise.resolve({ lang: 'uk', slug: 'test-slug' })
    });

    expect(mockGetNewsBySlug).toHaveBeenCalledWith('test-slug', 'uk');
    expect(mockedCreateSeoMeta).toHaveBeenCalledWith({
      title: mockNews.title,
      description: mockNews.description,
      url: '/news/test-slug',
      imageUrl: mockNews.coverImage.src,
      locale: 'uk'
    });
    expect(metadata).toEqual(
      expect.objectContaining({
        title: mockNews.title,
        description: mockNews.description
      })
    );
  });

  it('returns fallback metadata when news is not found', async () => {
    mockGetNewsBySlug.mockResolvedValue(null);

    const metadata = await generateMetadata({
      params: Promise.resolve({ lang: 'uk', slug: 'missing-slug' })
    });

    expect(mockGetNewsBySlug).toHaveBeenCalledWith('missing-slug', 'uk');
    expect(mockedCreateSeoMeta).toHaveBeenCalledWith({
      title: 'News not found',
      description: '',
      url: '/news/missing-slug',
      locale: 'uk'
    });
    expect(metadata).toEqual(
      expect.objectContaining({
        title: 'News not found',
        description: ''
      })
    );
  });
});

describe('NewsDetailPage', () => {
  beforeEach(() => {
    mockGetNewsBySlug.mockReset();
    mockedNotFound.mockClear();
    mockedFormatDate.mockReset();
    capturedArticleDetailProps = undefined;
    articleDetailCallCount = 0;

    const { getLocale } = jest.requireMock('next-intl/server');
    (getLocale as jest.Mock).mockResolvedValue('uk');
  });

  it('renders ArticleDetail with correct props when news is found', async () => {
    mockGetNewsBySlug.mockResolvedValue(mockNews);
    mockedFormatDate.mockReturnValue('01.05.24');

    const jsx = await NewsDetailPage({
      params: Promise.resolve({ lang: 'uk', slug: 'test-slug' })
    });

    render(jsx);

    expect(screen.getByTestId('ArticleDetail')).toBeInTheDocument();
    expect(mockedNotFound).not.toHaveBeenCalled();
    expect(articleDetailCallCount).toBe(1);

    const props = capturedArticleDetailProps!;
    expect(props.lang).toBe('uk');
    expect(props.title).toBe(mockNews.title);
    expect(props.date).toBe('01.05.24');
    expect(props.blocks).toEqual(mockNews.content.content.blocks);
  });

  it('calls notFound when news is not found', async () => {
    mockGetNewsBySlug.mockResolvedValue(null);

    await expect(NewsDetailPage({ params: Promise.resolve({ lang: 'uk', slug: 'missing-slug' }) })).rejects.toThrow(
      'NOT_FOUND'
    );

    expect(mockedNotFound).toHaveBeenCalledTimes(1);
    expect(articleDetailCallCount).toBe(0);
  });

  it('passes empty blocks array when content.blocks is missing', async () => {
    mockGetNewsBySlug.mockResolvedValue({ ...mockNews, content: {} });
    mockedFormatDate.mockReturnValue('01.05.24');

    const jsx = await NewsDetailPage({
      params: Promise.resolve({ lang: 'uk', slug: 'test-slug' })
    });

    render(jsx);

    expect(capturedArticleDetailProps!.blocks).toEqual([]);
  });

  it('passes empty string as date when publishedAt is null', async () => {
    mockGetNewsBySlug.mockResolvedValue({ ...mockNews, publishedAt: null });
    mockedFormatDate.mockReturnValue(null);

    const jsx = await NewsDetailPage({
      params: Promise.resolve({ lang: 'uk', slug: 'test-slug' })
    });

    render(jsx);

    expect(capturedArticleDetailProps!.date).toBe('');
    expect(mockedFormatDate).not.toHaveBeenCalled();
  });

  it('uses locale from getLocale for fetching news', async () => {
    const { getLocale } = jest.requireMock('next-intl/server');
    (getLocale as jest.Mock).mockResolvedValue('en');
    mockGetNewsBySlug.mockResolvedValue(mockNews);
    mockedFormatDate.mockReturnValue('01.05.24');

    await NewsDetailPage({
      params: Promise.resolve({ lang: 'uk', slug: 'test-slug' })
    });

    expect(mockGetNewsBySlug).toHaveBeenCalledWith('test-slug', 'en');
  });
});
