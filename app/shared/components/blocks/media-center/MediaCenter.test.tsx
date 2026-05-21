import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';

import * as mediaData from './media.const';
import MediaCenter from './MediaCenter';

let searchParamsValue = new URLSearchParams('');

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    replace: jest.fn((url: string) => {
      const search = url.includes('?') ? url.split('?')[1] : '';
      searchParamsValue = new URLSearchParams(search || '');
    })
  }),
  useSearchParams: () => searchParamsValue
}));

jest.mock('next-intl', () => ({
  useLocale: () => 'uk',
  useTranslations: () => (key: string) => key
}));

jest.mock('~/shared/components/design-system/all-components/media-list/MediaList', () => {
  return function DummyMediaList({ variant }: { variant: string }) {
    return <div data-testid={`media-list-${variant}`}>List: {variant}</div>;
  };
});

jest.mock('~/shared/components/design-system/all-components/empty-state/EmptyState', () => {
  return function DummyEmptyState({ dataTestId, title }: any) {
    return <div data-testid={dataTestId}>{title}</div>;
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

describe('MediaCenter Component Full Coverage', () => {
  beforeEach(() => {
    searchParamsValue = new URLSearchParams('');
    jest.clearAllMocks();
  });

  it('should render news list by default using real constants', () => {
    render(
      <MediaCenter
        newsData={mediaData.mockNewsList as any}
        mediaMentionsData={mediaData.mockPressList as any}
        eventsData={[]}
      />
    );

    expect(screen.getByTestId('media-list-news')).toBeInTheDocument();
  });

  it('should switch to "press" tab and render press list', async () => {
    const { rerender } = render(
      <MediaCenter
        newsData={mediaData.mockNewsList as any}
        mediaMentionsData={mediaData.mockPressList as any}
        eventsData={[]}
      />
    );

    const pressTab = screen.getByText(/Ми у ЗМІ/i);
    fireEvent.click(pressTab);

    rerender(
      <MediaCenter
        newsData={mediaData.mockNewsList as any}
        mediaMentionsData={mediaData.mockPressList as any}
        eventsData={[]}
      />
    );

    await waitFor(() => {
      expect(screen.getByTestId('media-list-press')).toBeInTheDocument();
    });
  });

  it('should switch to "events" tab and trigger events loading (useEffect coverage)', async () => {
    const { rerender } = render(
      <MediaCenter
        newsData={mediaData.mockNewsList as any}
        mediaMentionsData={mediaData.mockPressList as any}
        eventsData={[]}
      />
    );

    const eventsTab = screen.getByText(/Події/i);
    fireEvent.click(eventsTab);

    searchParamsValue = new URLSearchParams('tab=events');

    rerender(
      <MediaCenter
        newsData={mediaData.mockNewsList as any}
        mediaMentionsData={mediaData.mockPressList as any}
        eventsData={mediaData.mockEventsList as any}
      />
    );

    await waitFor(() => {
      expect(screen.getByText(/131 років від дня народження/i)).toBeInTheDocument();

      expect(screen.getAllByTestId('EventItem-root').length).toBeGreaterThan(0);
    });
  });

  it('should show empty state when news data is empty', () => {
    render(<MediaCenter newsData={[]} mediaMentionsData={mediaData.mockPressList as any} eventsData={[]} />);
    expect(screen.getByTestId('EmptyState-news')).toBeInTheDocument();
  });

  it('should show empty state when media mentions data is empty', async () => {
    const { rerender } = render(
      <MediaCenter newsData={mediaData.mockNewsList as any} mediaMentionsData={[]} eventsData={[]} />
    );

    const pressTab = screen.getByText(/Ми у ЗМІ/i);
    fireEvent.click(pressTab);

    rerender(<MediaCenter newsData={mediaData.mockNewsList as any} mediaMentionsData={[]} eventsData={[]} />);

    await waitFor(() => {
      expect(screen.getByTestId('EmptyState-press')).toBeInTheDocument();
    });
  });

  it('should verify constants content directly (for 100% media.const.ts)', () => {
    expect(mediaData.mediaBigDoc.uk.type).toBe('doc');
    expect(mediaData.mediaSmallDoc.en.type).toBe('doc');
    expect(mediaData.mockNewsList[0].status).toBe('published');
  });
});
