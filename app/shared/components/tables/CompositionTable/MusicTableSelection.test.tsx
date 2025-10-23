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
  search: '',
  setSearch: jest.fn(),
  data: musicTableMock,
  loadingData: false,
  setFilterParam: jest.fn(),
  debouncedSetFilterParam: jest.fn()
};

jest.mock('~/shared/hooks/use-search/UseSearch', () => ({
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

type MusicTableFiltersProps = {
  onGenresChange: (values: string[]) => void;
  onYearChange: (v: [number, number]) => void;
  onCategoriesChange: (values: string[]) => void;
  onYearChangeCommitted: (v: [number, number]) => void;
  onClearAllFilters: () => void;
  minYear: number;
  maxYear: number;
  isAnyFilterActive: boolean;
};

jest.mock('./filters/MusicTableFilters', () => {
  const MusicTableFilters = (props: MusicTableFiltersProps) => (
    <div data-testid="music-table-filters">
      <span data-testid="min-year">{String(props.minYear)}</span>
      <span data-testid="max-year">{String(props.maxYear)}</span>
      <button data-testid="mock-apply-genre-filter" onClick={() => props.onGenresChange(['рок'])}>
        Apply Genre Filter
      </button>

      <button data-testid="mock-apply-year-filter" onClick={() => props.onYearChange([1990, 2000])}>
        Apply Year Filter
      </button>

      <button data-testid="mock-apply-category-filter" onClick={() => props.onCategoriesChange(['класика'])}>
        Apply Category Filter
      </button>

      <button data-testid="mock-apply-year-committed" onClick={() => props.onYearChangeCommitted([1990, 2000])}>
        Apply Year Committed
      </button>

      <button data-testid="mock-clear-filters" onClick={() => props.onClearAllFilters()}>
        Clear Filters
      </button>
    </div>
  );
  return { __esModule: true, MusicTableFilters };
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

import MusicTableSection from './MusicTableSelection';

describe('MusicTableSection', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useFetchStaticFilters as jest.Mock).mockReturnValue(staticFiltersData);
  });

  it('renders EnhancedTable and search', () => {
    render(<MusicTableSection />);

    expect(screen.getByTestId('enhanced-table')).toBeInTheDocument();

    expect(screen.getByTestId('music-table-filters')).toBeInTheDocument();
  });

  it('correct render EnhancedTable props', () => {
    render(<MusicTableSection />);

    expect(screen.getByTestId('table-name').textContent).toBe('name.composition');
    expect(screen.getByTestId('search-prop')).toBeInTheDocument();
    expect(screen.queryAllByTestId('row').length).toBe(2);
  });

  it('calls debouncedSetFilterParam when applying genre filter', () => {
    render(<MusicTableSection />);
    fireEvent.click(screen.getByTestId('mock-apply-genre-filter'));
    expect(useSearchMockReturn.debouncedSetFilterParam).toHaveBeenCalledWith('genre', ['рок']);
  });

  it('calls debouncedSetFilterParam when applying category filter', () => {
    render(<MusicTableSection />);
    fireEvent.click(screen.getByTestId('mock-apply-category-filter'));
    expect(useSearchMockReturn.debouncedSetFilterParam).toHaveBeenCalledWith('category', ['класика']);
  });

  it('committed year change calls setFilterParam with yearFrom/yearTo', () => {
    render(<MusicTableSection />);
    fireEvent.click(screen.getByTestId('mock-apply-year-committed'));
    expect(useSearchMockReturn.setFilterParam).toHaveBeenCalledWith({ yearFrom: 1990, yearTo: 2000 });
  });

  it('clearAllFilters calls setFilterParam with cleared params', () => {
    render(<MusicTableSection />);
    fireEvent.click(screen.getByTestId('mock-apply-genre-filter'));
    fireEvent.click(screen.getByTestId('mock-apply-category-filter'));
    fireEvent.click(screen.getByTestId('mock-apply-year-filter'));
    fireEvent.click(screen.getByTestId('mock-clear-filters'));
    expect(useSearchMockReturn.setFilterParam).toHaveBeenCalledWith(
      expect.objectContaining({ genre: [], yearFrom: null, yearTo: null })
    );
  });

  it('does not call setFilterParam when no filters are active', () => {
    render(<MusicTableSection />);
    fireEvent.click(screen.getByTestId('mock-clear-filters'));
    expect(useSearchMockReturn.setFilterParam).not.toHaveBeenCalled();
  });

  it('notes modal renders closed by default and close keeps it closed', () => {
    render(<MusicTableSection />);
    expect(screen.getByTestId('notes-opened').textContent).toBe('false');
    fireEvent.click(screen.getByTestId('notes-close'));
    expect(screen.getByTestId('notes-opened').textContent).toBe('false');
  });

  it('adjusts columns for mobile', () => {
    breakpointMock = { isMobile: true, isTablet: true, isLaptop: false, isDesktop: false, isLaptopAndAbove: false };
    render(<MusicTableSection />);
    expect(screen.getByTestId('enhanced-table')).toBeInTheDocument();
  });

  it('uses defaultMinYear/defaultMaxYear when yearRange is missing', () => {
    (useFetchStaticFilters as jest.Mock).mockReturnValueOnce({
      ...staticFiltersData,
      yearRange: undefined
    });

    render(<MusicTableSection />);

    expect(screen.getByTestId('min-year')).toHaveTextContent('1900');
    expect(screen.getByTestId('max-year')).toHaveTextContent('2025');
  });

  it('passes yearRange values from staticFilters into MusicTableFilters (min/max)', () => {
    (useFetchStaticFilters as jest.Mock).mockReturnValueOnce({ data: staticFiltersData });

    render(<MusicTableSection />);

    expect(screen.getByTestId('min-year')).toHaveTextContent(String(staticFiltersData.yearRange.minYear));
    expect(screen.getByTestId('max-year')).toHaveTextContent(String(staticFiltersData.yearRange.maxYear));
  });
});
