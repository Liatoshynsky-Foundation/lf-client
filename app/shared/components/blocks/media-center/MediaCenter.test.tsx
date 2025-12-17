import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';

import MediaCenter from './MediaCenter';

jest.mock('~/shared/components/design-system/all-components/media-list/MediaList', () => {
  return function DummyMediaList({ variant }: { variant: string }) {
    return <div data-testid={`media-list-${variant}`}>List: {variant}</div>;
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
  mockNewsList: [{ _id: '1', publishedAt: '2023-01-01', title: 'News' }],
  mockPressList: [{ _id: '2', publishedAt: '2023-01-02', title: 'Press' }]
}));

describe('MediaCenter Component', () => {
  it('should render news list by default', () => {
    render(<MediaCenter />);
    expect(screen.getByTestId('media-list-news')).toBeInTheDocument();
    expect(screen.queryByTestId('media-list-press')).not.toBeInTheDocument();
  });

  it('should switch to "press" tab and renders press list', async () => {
    render(<MediaCenter />);
    const pressTab = screen.getByText('Ми у ЗМІ');
    fireEvent.click(pressTab);
    await waitFor(() => {
      expect(screen.queryByTestId('media-list-news')).not.toBeInTheDocument();
      expect(screen.getByTestId('media-list-press')).toBeInTheDocument();
    });
  });
});
