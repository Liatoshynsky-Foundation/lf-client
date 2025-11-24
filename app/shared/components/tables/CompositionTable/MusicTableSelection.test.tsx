import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { useFetchStaticFilters } from '~/shared/hooks/use-search/useFetchStaticFilters';

const musicTableMock = [
  { id: '1', name: 'Composition 1', year: 2000, genre: ['Романс', 'Джаз'] },
  { id: '2', name: 'Composition 2', year: 1970, genre: ['Рок', 'Мистецька пісня'] }
];

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key
}));

jest.mock('~/i18n/navigation', () => ({
  Link: ({ children, href }: { children: React.ReactNode; href: string }) => <a href={href}>{children}</a>
}));

let breakpointMock = {
  isMobile: false,
  isTablet: false,
  isLaptop: true,
  isDesktop: true,
  isLaptopAndAbove: true
};

jest.mock('~/shared/hooks/use-breakpoints/useBreakpoints', () => ({
  __esModule: true,
  default: () => breakpointMock
}));

const useSearchMockReturn = {
  data: musicTableMock,
  isLoading: false,
  params: { search: '' },
  updateParams: jest.fn(),
  debouncedUpdateParam: jest.fn(),
  resetParams: jest.fn()
};

jest.mock('~/shared/hooks/use-search/useSearchh', () => ({
  useSearch: () => useSearchMockReturn
}));

const staticFiltersData = {
  genres: [{ name: 'rock' }],
  categories: [{ name: 'classic' }],
  titles: [{ title: 'Symphony' }],
  yearRange: { minYear: 1900, maxYear: 2025 }
};

jest.mock('~/shared/hooks/use-search/useFetchStaticFilters', () => ({
  useFetchStaticFilters: jest.fn()
}));

type RowLike = { id?: string; name?: string; year?: number; genre?: string[] };

type EnhancedTableProps = {
  data?: RowLike[];
  tableName?: string;
  Filters?: React.ReactNode;
  Search?: React.ReactNode;
};

jest.mock('~/shared/components/enhanced-table/EnhancedTable', () => {
  const EnhancedTable = ({ data = [], tableName, Filters, Search }: EnhancedTableProps) => {
    return (
      <div data-testid="enhanced-table">
        {tableName && <div data-testid="table-name">{tableName}</div>}
        {Filters && <div data-testid="filters-prop">{Filters}</div>}
        {Search && <div data-testid="search-prop">{Search}</div>}
        {Array.isArray(data) &&
          data.map((item) => (
            <div key={item.id} data-testid="row">
              <span data-testid="row-name">{item.name}</span>
              {item.year && <span data-testid="row-year">{item.year}</span>}
              {Array.isArray(item.genre) && <div data-testid="row-genres">{item.genre.join(', ')}</div>}
            </div>
          ))}
      </div>
    );
  };

  return { __esModule: true, EnhancedTable };
});

type GetNotesModalProps = {
  opened: boolean;
  handleClose: () => void;
};

jest.mock('~/shared/components/get-notes-modal/GetNotesModal', () => ({
  __esModule: true,
  default: (props: GetNotesModalProps) => (
    <div data-testid="notes-modal">
      <div data-testid="notes-opened">{String(props.opened)}</div>
      <button data-testid="notes-close" onClick={() => props.handleClose()}>
        Close
      </button>
    </div>
  )
}));

jest.mock('~/ds-components/selector/FilterSelect', () => ({
  FilterSelect: ({ label, onAdd, onRemove, defaultValues = [] }: any) => (
    <div data-testid={`FilterSelect-${label}`}>
      <button
        data-testid={`mock-apply-${label}-filter`}
        onClick={() => (label === 'genre' ? onAdd(null, null, ['рок']) : onAdd(null, null, ['класика']))}
      >
        add
      </button>
      <button data-testid={`FilterSelect-${label}-remove`} onClick={() => onRemove(null, null, [])}>
        remove
      </button>
      <span>{defaultValues.join(',')}</span>
    </div>
  )
}));

jest.mock('~/shared/components/tables/WorksTable/filters/YearNumericFilter', () => ({
  YearNumericFilter: ({ minYear, maxYear, onChangeCommitted }: any) => (
    <div data-testid="YearNumericFilter">
      <span data-testid="min-year">{String(minYear)}</span>
      <span data-testid="max-year">{String(maxYear)}</span>
      <button data-testid="mock-apply-year-committed" onClick={() => onChangeCommitted([1990, 2000])}>
        commit
      </button>
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

import MusicTableSection from './MusicTableSelection';

describe('MusicTableSection', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useFetchStaticFilters as jest.Mock).mockReturnValue(staticFiltersData);
  });

  it('should render EnhancedTable and Search', () => {
    render(<MusicTableSection />);

    expect(screen.getByTestId('enhanced-table')).toBeInTheDocument();

    expect(screen.getByTestId('TableFilters')).toBeInTheDocument();
  });

  it('should correctly render EnhancedTable props', () => {
    render(<MusicTableSection />);

    expect(screen.getByTestId('table-name').textContent).toBe('name.composition');
    expect(screen.getByTestId('search-prop')).toBeInTheDocument();
    expect(screen.queryAllByTestId('row').length).toBe(2);
  });

  it('should call debouncedSetFilterParam when applying genre filter', () => {
    render(<MusicTableSection />);
    fireEvent.click(screen.getByTestId('mock-apply-genre-filter'));
    expect(useSearchMockReturn.debouncedUpdateParam).toHaveBeenCalledWith('genre', ['рок']);
  });

  it('should call debouncedSetFilterParam when applying category filter', () => {
    render(<MusicTableSection />);
    fireEvent.click(screen.getByTestId('mock-apply-category-filter'));
    expect(useSearchMockReturn.debouncedUpdateParam).toHaveBeenCalledWith('category', ['класика']);
  });

  it('should call setFilterParam with yearFrom/yearTo on committed year change', () => {
    render(<MusicTableSection />);
    fireEvent.click(screen.getByTestId('mock-apply-year-committed'));
    expect(useSearchMockReturn.resetParams).toHaveBeenCalled();
  });

  it('should clear all filters by calling setFilterParam with cleared params', () => {
    render(<MusicTableSection />);
    fireEvent.click(screen.getByTestId('mock-apply-genre-filter'));
    fireEvent.click(screen.getByTestId('mock-apply-category-filter'));
    fireEvent.click(screen.getByTestId('mock-apply-year-committed'));

    const clearBtn = screen.getByTestId('TableFilters-clearButton');
    fireEvent.click(clearBtn);

    expect(useSearchMockReturn.resetParams).toHaveBeenCalled();
  });

  it('should not call setFilterParam when no filters are active', () => {
    render(<MusicTableSection />);
    expect(screen.queryByTestId('TableFilters-clearButton')).not.toBeInTheDocument();
    expect(useSearchMockReturn.updateParams).not.toHaveBeenCalled();
    expect(useSearchMockReturn.debouncedUpdateParam).not.toHaveBeenCalled();
    expect(useSearchMockReturn.resetParams).not.toHaveBeenCalled();
  });

  it('should render notes modal closed by default and remain closed after closing', () => {
    render(<MusicTableSection />);
    expect(screen.getByTestId('notes-opened').textContent).toBe('false');
    fireEvent.click(screen.getByTestId('notes-close'));
    expect(screen.getByTestId('notes-opened').textContent).toBe('false');
  });

  it('should adjust columns for mobile', () => {
    breakpointMock = { isMobile: true, isTablet: true, isLaptop: false, isDesktop: false, isLaptopAndAbove: false };
    render(<MusicTableSection />);
    expect(screen.getByTestId('enhanced-table')).toBeInTheDocument();
  });

  it('should use defaultMinYear/defaultMaxYear when yearRange is missing', () => {
    (useFetchStaticFilters as jest.Mock).mockReturnValueOnce({
      ...staticFiltersData,
      yearRange: undefined
    });

    render(<MusicTableSection />);

    expect(screen.getByTestId('min-year')).toHaveTextContent('1900');
    expect(screen.getByTestId('max-year')).toHaveTextContent('2025');
  });

  it('should pass yearRange values from staticFilters', () => {
    (useFetchStaticFilters as jest.Mock).mockReturnValueOnce({ data: staticFiltersData });

    render(<MusicTableSection />);

    expect(screen.getByTestId('min-year')).toHaveTextContent(String(staticFiltersData.yearRange.minYear));
    expect(screen.getByTestId('max-year')).toHaveTextContent(String(staticFiltersData.yearRange.maxYear));
  });
});
