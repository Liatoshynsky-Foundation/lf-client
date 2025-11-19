import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';

const workTableMock = [
  { id: '1', name: 'Work 1', actionType: 'pdf', isPreview: true, url: null },
  { id: '2', name: 'Work 2', actionType: 'url', isPreview: false, url: 'http://example.com/work2' }
];

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key
}));

jest.mock('~/i18n/navigation', () => ({
  Link: ({ children, href }: { children: React.ReactNode; href: string }) => <a href={href}>{children}</a>
}));

const mockUseBreakpoints = jest.fn().mockReturnValue({
  isMobile: false,
  isTablet: false,
  isLaptop: true,
  isDesktop: true,
  isLaptopAndAbove: true
});
jest.mock('~/shared/hooks/use-breakpoints/useBreakpoints', () => ({
  __esModule: true,
  default: () => mockUseBreakpoints()
}));

type RowLike = { id?: string; _id?: string; title?: string; name?: string; isPreview?: boolean; url?: string | null };

type EnhancedTableProps = {
  data?: RowLike[];
  tableName?: string;
  Filters?: React.ReactNode;
};

jest.mock('~/shared/components/enhanced-table/EnhancedTable', () => {
  const EnhancedTable = ({ data = [], tableName, Filters }: EnhancedTableProps) => {
    return (
      <div data-testid="enhanced-table">
        {tableName && <div data-testid="table-name">{tableName}</div>}
        {Filters && <div data-testid="filters-prop">{Filters}</div>}
        {Array.isArray(data) &&
          data.map((item) => (
            <div key={(item._id ?? item.id) as string} data-testid="row">
              {item.title ?? item.name}
              {item.isPreview && <button>Preview</button>}
              {item.url && <a href={item.url}>Visit</a>}
            </div>
          ))}
        <button aria-label="Go to next page">Next</button>
      </div>
    );
  };
  return { __esModule: true, EnhancedTable };
});

jest.mock('~/ds-components/selector/FilterSelect', () => ({
  FilterSelect: ({ label, onAdd, onRemove, defaultValues = [] }: any) => (
    <div data-testid={`FilterSelect-${label}`}>
      <button data-testid={'mock-apply-author-filter'} onClick={() => onAdd(null, null, ['1'])}>
        add
      </button>
      <button data-testid={'mock-clear-filters'} onClick={() => onRemove(null, null, [])}>
        remove
      </button>
      <span>{defaultValues.join(',')}</span>
    </div>
  )
}));

jest.mock('~/shared/components/design-system/all-components/tooltip/Tooltip', () => ({
  __esModule: true,
  default: ({ children }: any) => <>{children}</>
}));

jest.mock('~/public/icons/trash-2.svg', () => ({
  __esModule: true,
  default: () => <svg data-testid="delete-icon" />
}));

import { WorkTableSection } from './WorkTableSelection';

describe('WorkTableSection', () => {
  let originalFetch: typeof fetch;

  beforeEach(() => {
    jest.clearAllMocks();

    originalFetch = globalThis.fetch;

    globalThis.fetch = jest
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => [{ _id: '1', name: 'John', surname: 'Doe' }]
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        json: async () =>
          workTableMock.map((w) => ({
            _id: w.id,
            title: w.name,
            authors: [{ name: 'John', surname: 'Doe' }],
            startYear: 2000,
            endYear: null,
            url: w.url,
            isPreview: w.isPreview
          }))
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        json: async () =>
          workTableMock
            .filter((w) => w.id === '1')
            .map((w) => ({
              _id: w.id,
              title: w.name,
              authors: [{ name: 'John', surname: 'Doe' }],
              startYear: 2000,
              endYear: null,
              url: w.url,
              isPreview: w.isPreview
            }))
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        json: async () =>
          workTableMock.map((w) => ({
            _id: w.id,
            title: w.name,
            authors: [{ name: 'John', surname: 'Doe' }],
            startYear: 2000,
            endYear: null,
            url: w.url,
            isPreview: w.isPreview
          }))
      } as Response) as unknown as typeof fetch;
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  it('should render correct number of rows', async () => {
    render(<WorkTableSection lang="en" />);
    const rows = await screen.findAllByTestId('row');
    expect(rows.length).toBe(workTableMock.length);
  });

  it('should render pagination button', async () => {
    render(<WorkTableSection lang="en" />);
    expect(await screen.findByLabelText('Go to next page')).toBeInTheDocument();
  });

  it('should render table name and filters', async () => {
    render(<WorkTableSection lang="en" />);
    expect(await screen.findByTestId('enhanced-table')).toBeInTheDocument();
    expect(screen.getByTestId('filters-prop')).toBeInTheDocument();
    expect(screen.getByTestId('table-name')).toHaveTextContent('name');
  });

  it('should render action buttons correctly', async () => {
    render(<WorkTableSection lang="en" />);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Preview' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'Visit' })).toBeInTheDocument();
    });

    const visitLink = screen.getByRole('link', { name: 'Visit' });
    expect(visitLink).toHaveAttribute('href', 'http://example.com/work2');
  });

  it('should request filtered data when author filter is applied', async () => {
    render(<WorkTableSection lang="en" />);

    await screen.findAllByTestId('row');

    fireEvent.click(screen.getByTestId('mock-apply-author-filter'));

    await waitFor(() => {
      expect((globalThis.fetch as jest.Mock).mock.calls.length).toBe(3);
    });

    const lastCallArg = (globalThis.fetch as jest.Mock).mock.calls.at(-1)?.[0] as string;
    expect(lastCallArg).toContain('/api/scientific-works');
    expect(lastCallArg).toContain('authorIds=1');

    await waitFor(() => {
      expect(screen.getAllByTestId('row')).toHaveLength(1);
    });
  });

  it('should request unfiltered data after clearing filters', async () => {
    render(<WorkTableSection lang="en" />);

    await screen.findAllByTestId('row');
    fireEvent.click(screen.getByTestId('mock-apply-author-filter'));

    await waitFor(() => {
      expect((globalThis.fetch as jest.Mock).mock.calls.length).toBe(3);
    });

    fireEvent.click(screen.getByTestId('mock-clear-filters'));

    await waitFor(() => {
      expect((globalThis.fetch as jest.Mock).mock.calls.length).toBe(4);
    });

    const lastCallArg = (globalThis.fetch as jest.Mock).mock.calls.at(-1)?.[0] as string;
    expect(lastCallArg).toContain('/api/scientific-works');
    expect(lastCallArg).not.toContain('authorIds=');

    await waitFor(() => {
      expect(screen.getAllByTestId('row')).toHaveLength(workTableMock.length);
    });
  });
});
