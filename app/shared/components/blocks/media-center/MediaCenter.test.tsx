import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';

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

const mockNewsData = [{ _id: '1', title: 'News', publishedAt: '2023-01-01', coverImage: { src: '' } }];
const mockMediaMentionsData = [{ _id: '1', title: 'Media', publishedAt: '2023-01-01', coverImage: { src: '' } }];

describe('MediaCenter Component', () => {
  beforeEach(() => {
    searchParamsValue = new URLSearchParams('');
    jest.clearAllMocks();
  });

  it('should render news list by default', () => {
    render(<MediaCenter newsData={mockNewsData as any} mediaMentionsData={mockMediaMentionsData as any} />);
    expect(screen.getByTestId('media-list-news')).toBeInTheDocument();
  });

  it('should switch to "press" tab and renders press list', async () => {
    const { rerender } = render(
      <MediaCenter newsData={mockNewsData as any} mediaMentionsData={mockMediaMentionsData as any} />
    );

    const pressTab = screen.getByText('Ми у ЗМІ');
    fireEvent.click(pressTab);

    rerender(<MediaCenter newsData={mockNewsData as any} mediaMentionsData={mockMediaMentionsData as any} />);

    await waitFor(() => {
      expect(screen.getByTestId('media-list-press')).toBeInTheDocument();
      expect(screen.queryByTestId('media-list-news')).not.toBeInTheDocument();
    });
  });

  it('should show empty state when news data is empty', () => {
    render(<MediaCenter newsData={[]} mediaMentionsData={mockMediaMentionsData as any} />);

    expect(screen.getByTestId('EmptyState-news')).toBeInTheDocument();
  });

  it('should show empty state when media mentions data is empty', async () => {
    const { rerender } = render(<MediaCenter newsData={mockNewsData as any} mediaMentionsData={[]} />);

    const pressTab = screen.getByText('Ми у ЗМІ');
    fireEvent.click(pressTab);

    rerender(<MediaCenter newsData={mockNewsData as any} mediaMentionsData={[]} />);

    await waitFor(() => {
      expect(screen.getByTestId('EmptyState-press')).toBeInTheDocument();
    });
  });
});
