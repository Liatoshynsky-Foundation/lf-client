import { render, screen } from '@testing-library/react';
import { Locale } from 'next-intl';
import React from 'react';

import NewsSection from './NewsSection';
import { TipTapDoc } from '~/types/types/tiptap.types';

import { createRequestContainer } from '~/di/container';
import { ROUTES } from '~/shared/components/constants/routes';

// Mock dependencies
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
  ContentSlider: function MockContentSlider({ cards }: { cards: unknown[] }) {
    return <div data-testid="content-slider">Slider with {cards.length} cards</div>;
  }
}));

jest.mock('~/ds-components/empty-state/EmptyState', () => {
  return function MockEmptyState({
    title,
    description,
    dataTestId
  }: {
    title: string;
    description: string;
    dataTestId: string;
  }) {
    return (
      <div data-testid={dataTestId}>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    );
  };
});

jest.mock('~/lib/utils/parseIsoDate', () => ({
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  formatIsoDateToDdMmYy: jest.fn((date: string) => '15.01.25')
}));

const mockTipTapContent: TipTapDoc = {
  type: 'doc' as TipTapDoc['type'],
  content: [
    {
      type: 'paragraph' as NonNullable<TipTapDoc['content']>[number]['type'],
      content: [
        {
          type: 'text' as NonNullable<
            NonNullable<
              Extract<NonNullable<TipTapDoc['content']>[number], { type: 'paragraph' | 'heading' }>['content']
            >[number]
          >['type'],
          text: 'Test content'
        }
      ]
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
  locale: 'uk' as Locale
};

describe('NewsSection Component', () => {
  const mockedCreateContainer = jest.mocked(createRequestContainer);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const setupMockContainer = (mockData: unknown) => {
    mockedCreateContainer.mockReturnValue({
      resolve: jest.fn().mockReturnValue({
        getAllPublishedNews: jest.fn().mockResolvedValue(mockData)
      })
    } as unknown as ReturnType<typeof createRequestContainer>);
  };

  it('should render title correctly', async () => {
    setupMockContainer([
      {
        _id: '1',
        publishedAt: new Date('2025-01-15'),
        title: 'Test News',
        description: 'Test Description',
        coverImage: { src: '/test.jpg' },
        slug: 'test-news'
      }
    ]);

    const Component = await NewsSection(mockProps);
    render(Component as React.ReactElement);

    expect(screen.getByText('Новини Фундації')).toBeInTheDocument();
  });

  it('should render ButtonContentBlock and ContentSlider when news exist', async () => {
    setupMockContainer([
      {
        _id: '1',
        publishedAt: new Date('2025-01-15'),
        title: 'Test News',
        description: 'Test Description',
        coverImage: { src: '/test.jpg' },
        slug: 'test-news'
      }
    ]);

    const Component = await NewsSection(mockProps);
    render(Component as React.ReactElement);

    expect(screen.getByTestId('button-content-block')).toBeInTheDocument();
    expect(screen.getByTestId('content-slider')).toBeInTheDocument();
  });

  it('should render EmptyState when no news are available', async () => {
    setupMockContainer([]);

    const Component = await NewsSection(mockProps);
    render(Component as React.ReactElement);

    expect(screen.getByText('Новини Фундації')).toBeInTheDocument();
    expect(screen.getByTestId('EmptyState-news')).toBeInTheDocument();
    expect(screen.getByText('Новин не знайдено')).toBeInTheDocument();
  });

  it('should format news data correctly for ContentSlider', async () => {
    const mockNews = [
      {
        _id: '1',
        publishedAt: new Date('2025-01-15'),
        title: 'News 1',
        description: 'Description 1',
        coverImage: { src: '/news1.jpg' },
        slug: 'news-1'
      },
      {
        _id: '2',
        publishedAt: new Date('2025-01-16'),
        title: 'News 2',
        description: 'Description 2',
        coverImage: { src: '/news2.jpg' },
        slug: 'news-2'
      }
    ];

    setupMockContainer(mockNews);

    const Component = await NewsSection(mockProps);
    render(Component as React.ReactElement);

    expect(screen.getByText('Slider with 2 cards')).toBeInTheDocument();
  });
});
