import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';

import ResearchPage from './page';

jest.mock('next-intl/server', () => ({
  setRequestLocale: jest.fn()
}));

jest.mock('~/services/pages-data/resolvePageData', () => ({
  resolvePageData: jest.fn()
}));

jest.mock('../[...unknown-route]/page-not-found/PageNotFound', () => ({
  __esModule: true,
  PageNotFound: () => <div>Page not found</div>
}));

jest.mock('~/components/research-and-scientific-work/ResearchAndScientificWork', () => {
  const Mock = (props: any) =>
    React.createElement('div', { 'data-testid': 'mock-hero' }, props?.data ? 'Hero Section' : 'No Hero');
  Mock.displayName = 'MockResearchAndScientificWork';
  return { __esModule: true, default: Mock };
});

jest.mock('~/components/tables/WorksTable/WorkTableSection', () => {
  const MockWorkTable = () => React.createElement('div', { 'data-testid': 'mock-work-table' }, 'Work Table Section');
  MockWorkTable.displayName = 'MockWorkTable';
  return { __esModule: true, WorkTableSection: MockWorkTable };
});

describe('Research Page', () => {
  const { resolvePageData } = jest.requireMock('~/services/pages-data/resolvePageData') as {
    resolvePageData: jest.Mock;
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render all components when data is successfully fetched', async () => {
    resolvePageData.mockResolvedValueOnce({
      blocks: {
        HeroSection: { title: 'Some hero data' }
      }
    });

    const element = await ResearchPage({ params: Promise.resolve({ lang: 'uk' }) } as any);
    render(element);

    expect(await screen.findByText('Hero Section')).toBeInTheDocument();
    expect(await screen.findByText('Work Table Section')).toBeInTheDocument();

    expect(resolvePageData).toHaveBeenCalledWith('research', 'uk');
  });

  it('should render only the table when hero section data is missing', async () => {
    resolvePageData.mockResolvedValueOnce({
      blocks: {}
    });

    const element = await ResearchPage({ params: Promise.resolve({ lang: 'en' }) } as any);
    render(element);

    expect(screen.queryByText('Hero Section')).not.toBeInTheDocument();
    expect(await screen.findByText('Work Table Section')).toBeInTheDocument();

    expect(resolvePageData).toHaveBeenCalledWith('research', 'en');
  });
  it('should render PageNotFound when page is missing', async () => {
    resolvePageData.mockResolvedValueOnce(null);

    const element = await ResearchPage({ params: Promise.resolve({ lang: 'en' }) } as any);
    render(element);

    expect(await screen.findByText(/Page not found/i)).toBeInTheDocument();
    expect(resolvePageData).toHaveBeenCalledWith('research', 'en');
  });
});
