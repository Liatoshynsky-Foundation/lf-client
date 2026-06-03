import { render, screen } from '@testing-library/react';
import { Locale } from 'next-intl';
import React from 'react';

import NewsSection from './NewsSection';
import { newsSectionData } from './NewsSection.data';
import { TipTapNodeTypes } from '~/types/enums/common.enums';
import { TipTapDoc } from '~/types/types/tiptap.types';

import { createRequestContainer } from '~/di/container';
import { formatIsoDateToDdMmYy } from '~/lib/utils/parseIsoDate';
import { ROUTES } from '~/shared/components/constants/routes';

jest.mock('next-intl/server', () => ({
  getTranslations: jest.fn(() =>
    Promise.resolve((key: string) => {
      const messages: Record<string, string> = {
        'news.title': 'Новин не знайдено',
        'news.description': 'Зайдіть пізніше'
      };
      return messages[key] || key;
    })
  )
}));

jest.mock('~/di/container', () => ({
  createRequestContainer: jest.fn()
}));

jest.mock('~/shared/components/blocks/terms-of-use/terms-content/button-content-block/ButtonContentBlock', () => {
  return function MockButtonContentBlock() {
    return <div data-testid="button-content-block">Button Content Block</div>;
  };
});

jest.mock('~/shared/components/content-slider/ContentSlider', () => ({
  ContentSlider: function MockContentSlider({ cards }: { cards: any[] }) {
    return <div data-testid="content-slider">Slider with {cards.length} cards</div>;
  }
}));

jest.mock('~/ds-components/empty-state/EmptyState', () => {
  return function MockEmptyState({ title, dataTestId }: any) {
    return (
      <div data-testid={dataTestId}>
        <h3>{title}</h3>
      </div>
    );
  };
});

jest.mock('~/lib/utils/parseIsoDate', () => ({
  formatIsoDateToDdMmYy: jest.fn()
}));

const mockTipTapContent: TipTapDoc = {
  type: TipTapNodeTypes.doc,
  content: [
    {
      type: TipTapNodeTypes.paragraph,
      content: [{ type: TipTapNodeTypes.text, text: 'Test' }]
    }
  ]
};

const mockProps = {
  title: {
    uk: 'Новини Фундації',
    en: 'Foundation News'
  },
  textContent: {
    uk: mockTipTapContent,
    en: mockTipTapContent
  },
  buttonText: {
    uk: 'Переглянути усі новини',
    en: 'View All News'
  },
  buttonLink: ROUTES.NEWS,
  prevLabel: 'Попередня новина',
  nextLabel: 'Наступна новина',
  locale: 'uk' as Locale
};

describe('NewsSection Component Full Coverage', () => {
  const mockedCreateContainer = jest.mocked(createRequestContainer);
  const mockedFormatDate = jest.mocked(formatIsoDateToDdMmYy);

  beforeEach(() => {
    jest.clearAllMocks();
    mockedFormatDate.mockReturnValue('15.01.25');
  });

  const setupMockContainer = (mockData: any) => {
    mockedCreateContainer.mockReturnValue({
      resolve: jest.fn().mockReturnValue({
        getAllPublishedNews: jest.fn().mockResolvedValue(mockData)
      })
    } as any);
  };

  const baseNews = {
    _id: '1',
    title: 'News Title',
    description: 'News Description',
    slug: 'news-slug',
    coverImage: { src: '/test-image.jpg' },
    publishedAt: '2025-01-15T00:00:00Z'
  };

  it('should render correctly with REAL data from .data.tsx', async () => {
    setupMockContainer([baseNews]);

    const Component = await NewsSection({
      ...newsSectionData,
      prevLabel: 'Попередня новина',
      nextLabel: 'Наступна новина',
      locale: 'uk'
    });
    render(Component as React.ReactElement);

    expect(screen.getByText(/НоВиНи ФунДаЦІЇ/i)).toBeInTheDocument();
  });

  it('should cover fallback when formatIsoDateToDdMmYy returns null (line 52 coverage)', async () => {
    mockedFormatDate.mockReturnValue(null as any);

    setupMockContainer([{ ...baseNews, _id: 'fallback-id' }]);

    const Component = await NewsSection(mockProps);
    render(Component as React.ReactElement);

    expect(screen.getByTestId('content-slider')).toBeInTheDocument();
  });

  it('should cover branch where publishedAt is missing entirely', async () => {
    setupMockContainer([
      {
        ...baseNews,
        _id: 'no-date',
        publishedAt: null
      }
    ]);

    const Component = await NewsSection(mockProps);
    render(Component as React.ReactElement);

    expect(screen.getByTestId('content-slider')).toBeInTheDocument();
  });

  it('should render EmptyState when no news', async () => {
    setupMockContainer([]);

    const Component = await NewsSection(mockProps);
    render(Component as React.ReactElement);

    expect(screen.getByTestId('EmptyState-news')).toBeInTheDocument();
  });
});
