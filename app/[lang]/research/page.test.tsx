import { render, screen } from '@testing-library/react';
import React from 'react';

jest.mock('next-intl/server', () => ({
  setRequestLocale: jest.fn()
}));

jest.mock('~/components/research-and-scientific-work/ResearchAndScientificWork', () => {
  const Mock = (props: any) =>
    React.createElement('div', { 'data-testid': 'mock-hero' }, props?.data ? 'Hero' : 'NoHero');
  Mock.displayName = 'MockResearchAndScientificWork';
  return { __esModule: true, default: Mock };
});

jest.mock('~/components/tables/WorksTable/WorkTableSelection', () => {
  const MockWorkTable = (props: any) =>
    React.createElement(
      'div',
      { 'data-testid': 'mock-work-table' },
      'Work table',
      props?.Filters ? React.createElement('div', { 'data-testid': 'mock-filters' }, 'filters') : null,
      props?.Search ? React.createElement('div', { 'data-testid': 'mock-search' }, 'search') : null
    );
  MockWorkTable.displayName = 'MockWorkTable';
  return { __esModule: true, default: MockWorkTable, WorkTableSection: MockWorkTable };
});

jest.mock('~/di/container', () => ({
  createRequestContainer: () => ({
    resolve: () => ({
      getPageData: jest.fn().mockResolvedValue({
        blocks: {
          HeroSection: {}
        }
      })
    })
  })
}));

describe('Research Page', () => {
  it('should render Research page correctly', async () => {
    await jest.isolateModulesAsync(async () => {
      const { Research } = await import('./page');
      const element = await Research({ params: { lang: 'en' } } as any);
      render(element);

      expect(screen.getByText(/Work table/i)).toBeInTheDocument();
    });
  });
});
