import { render, screen, waitFor } from '@testing-library/react';

import WorkTableSection from './WorkTableSelection';

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

describe('WorkTableSection', () => {
  beforeEach(() => {
    jest.resetAllMocks();

    global.fetch = jest
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
      } as Response);
  });

  it('renders correct number of rows', async () => {
    render(<WorkTableSection lang="en" />);
    const rows = await screen.findAllByTestId('row');
    expect(rows.length).toBe(workTableMock.length);
  });

  it('renders pagination button', async () => {
    render(<WorkTableSection lang="en" />);
    expect(await screen.findByLabelText('Go to next page')).toBeInTheDocument();
  });

  it('renders action buttons correctly', async () => {
    render(<WorkTableSection lang="en" />);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Preview' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'Visit' })).toBeInTheDocument();
    });

    const visitLink = screen.getByRole('link', { name: 'Visit' });
    expect(visitLink).toHaveAttribute('href', 'http://example.com/work2');
  });
});
