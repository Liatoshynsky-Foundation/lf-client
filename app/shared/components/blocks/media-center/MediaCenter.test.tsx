import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';

import MediaCenter from './MediaCenter';

jest.mock('~/shared/components/design-system/all-components/media-list/MediaList', () => {
  return function DummyMediaList({ variant }: { variant: string }) {
    return <div data-testid={`media-list-${variant}`}>List: {variant}</div>;
  };
});

jest.mock('~/shared/components/design-system/all-components/empty-state/EmptyState', () => {
  return function DummyEmptyState({ dataTestId, title, description }: any) {
    return (
      <div data-testid={dataTestId}>
        <div data-testid={`${dataTestId}-title`}>{title}</div>
        {description && <div data-testid={`${dataTestId}-description`}>{description}</div>}
      </div>
    );
  };
});

jest.mock('~/ds-components/tabs/Tabs', () => ({
  CustomTabs: ({ tabs, onTabChange }: any) => (
    <div>
      {tabs.map((tab: any) => (
        <button key={tab.id} onClick={() => onTabChange(tab.id)}>
          {tab.label}
        </button>
      ))}
    </div>
  )
}));

jest.mock('./media.const', () => ({
  mockPressList: [{ _id: '2', publishedAt: '2023-01-02', title: 'Press' }]
}));

const mockNewsData = [
  {
    _id: '1',
    publishedAt: new Date('2023-01-01').toISOString(),
    newsDate: new Date('2023-01-01').toISOString(),
    title: 'Test News',
    description: 'Test Description',
    slug: 'test-news',
    coverImage: {
      src: '/test.jpg',
      alt: 'Test Alt',
      caption: 'Test Caption',
      isTmp: false
    },
    meta: {
      views: 100
    }
  }
];

const mockMediaMentionsData = [
  {
    _id: '1',
    url: 'https://example.com/media-mention',
    title: 'Test Media Mention',
    description: 'Test Media Description',
    slug: 'test-media-mention',
    coverImage: {
      src: '/test-media.jpg',
      alt: 'Test Media Alt'
    },
    publishedAt: new Date('2023-01-01').toISOString(),
    meta: {
      views: 50
    }
  }
];

describe('MediaCenter Component', () => {
  it('should render news list by default', () => {
    render(<MediaCenter newsData={mockNewsData} mediaMentionsData={mockMediaMentionsData} />);
    expect(screen.getByTestId('media-list-news')).toBeInTheDocument();
    expect(screen.queryByTestId('media-list-press')).not.toBeInTheDocument();
  });

  it('should switch to "press" tab and renders press list', async () => {
    render(<MediaCenter newsData={mockNewsData} mediaMentionsData={mockMediaMentionsData} />);
    const pressTab = screen.getByText('Ми у ЗМІ');
    fireEvent.click(pressTab);
    await waitFor(() => {
      expect(screen.queryByTestId('media-list-news')).not.toBeInTheDocument();
      expect(screen.getByTestId('media-list-press')).toBeInTheDocument();
    });
  });

  it('should show empty state when news data is empty', () => {
    render(<MediaCenter newsData={[]} mediaMentionsData={mockMediaMentionsData} />);
    expect(screen.getByTestId('EmptyState-news')).toBeInTheDocument();
    expect(screen.queryByTestId('media-list-news')).not.toBeInTheDocument();
  });

  it('should show empty state when media mentions data is empty', async () => {
    render(<MediaCenter newsData={mockNewsData} mediaMentionsData={[]} />);
    const pressTab = screen.getByText('Ми у ЗМІ');
    fireEvent.click(pressTab);
    await waitFor(() => {
      expect(screen.getByTestId('EmptyState-press')).toBeInTheDocument();
      expect(screen.queryByTestId('media-list-press')).not.toBeInTheDocument();
    });
  });

  it('should show empty state when all data is empty', () => {
    render(<MediaCenter newsData={[]} mediaMentionsData={[]} />);
    expect(screen.getByTestId('EmptyState-news')).toBeInTheDocument();
  });
});
