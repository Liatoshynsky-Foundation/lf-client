import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';

import WorkTableSection from './WorkTableSelection';

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key
}));

jest.mock('~/i18n/navigation', () => ({
  Link: ({ children, href }: { children: React.ReactNode; href: string }) => <a href={href}>{children}</a>
}));

jest.mock('~/shared/components/enhanced-table/EnhancedTable', () => {
  return function EnhancedTable({ data, tableName }: any) {
    return (
      <div data-testid="enhanced-table">
        <div data-testid="table-name">{tableName}</div>
        {data.map((item: any) => (
          <div key={item.id} data-testid="row">
            {item.name}
            {item.isPreview && <button>Preview</button>}
            {item.url && <a href={item.url}>Visit</a>}
          </div>
        ))}
        <button aria-label="Go to next page">Next</button>
      </div>
    );
  };
});

jest.mock('./filters/Filters', () => {
  return {
    WorkTableFilters: jest.fn((props) => (
      <div data-testid="work-table-filters">
        <button data-testid="mock-apply-author-filter" onClick={() => props.onAuthorFilterChange(['1'])}>
          Apply Author Filter
        </button>
        <button data-testid="mock-clear-filters" onClick={() => props.onClearAllFilters()}>
          Clear Filters
        </button>
      </div>
    ))
  };
});

// mock useSearch hook used in component
jest.mock('~/shared/hooks/use-search/UseSearch', () => ({
  useSearch: jest.fn()
}));

import { useSearch as mockedUseSearch } from '~/shared/hooks/use-search/UseSearch';
const useSearchMock = mockedUseSearch as jest.MockedFunction<any>;

describe('WorkTableSection', () => {
  const workTableMock = [
    { id: '1', name: 'Work 1', actionType: 'pdf', isPreview: true, url: null },
    { id: '2', name: 'Work 2', actionType: 'url', isPreview: false, url: 'http://example.com/work2' }
  ];

  beforeEach(() => {
    jest.resetAllMocks();

    // first call - authors titles
    useSearchMock.mockImplementationOnce(() => ({
      data: [{ label: 'John Doe', value: '1' }],
      loadingTitles: false
    }));

    // second call - works data
    useSearchMock.mockImplementationOnce(() => ({
      data: workTableMock,
      loadingData: false,
      search: '',
      setSearch: jest.fn()
    }));
  });

  it('should render correct number of rows', async () => {
    render(<WorkTableSection />);
    const rows = await screen.findAllByTestId('row');
    expect(rows.length).toBe(workTableMock.length);
  });

  it('should render pagination button', async () => {
    render(<WorkTableSection />);
    expect(await screen.findByLabelText('Go to next page')).toBeInTheDocument();
  });

  it('should render action buttons correctly', async () => {
    render(<WorkTableSection />);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Preview' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'Visit' })).toBeInTheDocument();
    });

    const visitLink = screen.getByRole('link', { name: 'Visit' });
    expect(visitLink).toHaveAttribute('href', 'http://example.com/work2');
  });
});
