import { render, screen } from '@testing-library/react';
import React from 'react';

import { NewsSection } from './NewsSection';

// Mock dependencies
jest.mock('~/di/container', () => ({
  createRequestContainer: jest.fn(() => ({
    resolve: jest.fn(() => ({
      getAllPublishedNews: jest.fn()
    }))
  }))
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

jest.mock('~/lib/utils/parseIsoDate', () => ({
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  formatIsoDateToDdMmYy: jest.fn((date: string) => '15.01.25')
}));

const mockProps = {
  title: {
    uk: 'Новини Фундації',
    en: 'Foundation News'
  },
  textContent: {
    uk: {},
    en: {}
  },
  buttonText: {
    uk: 'Переглянути усі новини',
    en: 'View All News'
  },
  buttonLink: '/news',
  locale: 'uk' as any
};

describe('NewsSection Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  /* eslint-disable */
  it('should render title correctly', async () => {
    const { createRequestContainer } = require('~/di/container');
    createRequestContainer.mockReturnValue({
      resolve: jest.fn(() => ({
        getAllPublishedNews: jest.fn().mockResolvedValue([
          {
            _id: '1',
            publishedAt: new Date('2025-01-15'),
            title: 'Test News',
            description: 'Test Description',
            coverImage: { src: '/test.jpg' },
            slug: 'test-news'
          }
        ])
      }))
    });

    const Component = await NewsSection(mockProps);
    render(Component as React.ReactElement);

    expect(screen.getByText('Новини Фундації')).toBeInTheDocument();
  });

  it('should render ButtonContentBlock and ContentSlider when news exist', async () => {
    const { createRequestContainer } = require('~/di/container');
    createRequestContainer.mockReturnValue({
      resolve: jest.fn(() => ({
        getAllPublishedNews: jest.fn().mockResolvedValue([
          {
            _id: '1',
            publishedAt: new Date('2025-01-15'),
            title: 'Test News',
            description: 'Test Description',
            coverImage: { src: '/test.jpg' },
            slug: 'test-news'
          }
        ])
      }))
    });

    const Component = await NewsSection(mockProps);
    render(Component as React.ReactElement);

    expect(screen.getByTestId('button-content-block')).toBeInTheDocument();
    expect(screen.getByTestId('content-slider')).toBeInTheDocument();
  });

  it('should return null when no news are available', async () => {
    const { createRequestContainer } = require('~/di/container');
    createRequestContainer.mockReturnValue({
      resolve: jest.fn(() => ({
        getAllPublishedNews: jest.fn().mockResolvedValue([])
      }))
    });

    const Component = await NewsSection(mockProps);

    expect(Component).toBeNull();
  });
  /* eslint-disable */

  it('should format news data correctly for ContentSlider', async () => {
    const { createRequestContainer } = require('~/di/container');
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

    createRequestContainer.mockReturnValue({
      resolve: jest.fn(() => ({
        getAllPublishedNews: jest.fn().mockResolvedValue(mockNews)
      }))
    });

    const Component = await NewsSection(mockProps);
    render(Component as React.ReactElement);

    expect(screen.getByText('Slider with 2 cards')).toBeInTheDocument();
  });
});
