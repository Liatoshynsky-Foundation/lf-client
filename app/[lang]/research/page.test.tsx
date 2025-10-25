import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';

import ResearchPage from './page';

jest.mock('next-intl/server', () => ({
  setRequestLocale: jest.fn()
}));

jest.mock('~/components/research-and-scientific-work/ResearchAndScientificWork', () => {
  const Mock = (props: any) =>
    React.createElement('div', { 'data-testid': 'mock-hero' }, props?.data ? 'Hero Section' : 'No Hero');
  Mock.displayName = 'MockResearchAndScientificWork';
  return { __esModule: true, default: Mock };
});

jest.mock('~/components/tables/WorksTable/WorkTableSelection', () => {
  const MockWorkTable = () => React.createElement('div', { 'data-testid': 'mock-work-table' }, 'Work Table Section');
  MockWorkTable.displayName = 'MockWorkTable';
  return { __esModule: true, WorkTableSection: MockWorkTable };
});

const mockGetPageData = jest.fn();
jest.mock('~/di/container', () => ({
  createRequestContainer: () => ({
    resolve: () => ({
      getPageData: mockGetPageData
    })
  })
}));

describe('Research Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render all components when data is successfully fetched', async () => {
    mockGetPageData.mockResolvedValue({
      blocks: {
        HeroSection: { title: 'Some hero data' }
      }
    });
    const element = await ResearchPage({ params: { lang: 'uk' } } as any);
    render(element);
    expect(await screen.findByText('Hero Section')).toBeInTheDocument();
    expect(await screen.findByText('Work Table Section')).toBeInTheDocument();

    expect(mockGetPageData).toHaveBeenCalledWith('research', 'uk');
  });

  it('should render only the table when hero section data is missing', async () => {
    mockGetPageData.mockResolvedValue({
      blocks: {}
    });
    const element = await ResearchPage({ params: { lang: 'en' } } as any);
    render(element);
    expect(screen.queryByText('Hero Section')).not.toBeInTheDocument();

    expect(await screen.findByText('Work Table Section')).toBeInTheDocument();

    expect(mockGetPageData).toHaveBeenCalledWith('research', 'en');
  });
});
