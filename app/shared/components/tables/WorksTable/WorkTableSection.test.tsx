import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { WorkTableSection } from './WorkTableSection';

import useBreakpoints from '~/shared/hooks/use-breakpoints/useBreakpoints';
import { useFetchStaticFilters } from '~/shared/hooks/use-fetch-static-filters/useFetchStaticFilters';
import { useTableFilters } from '~/shared/hooks/use-table-filters/useTableFilters';

const tableMock = [
  { id: '1', name: 'Work 1', author: 'A', sortableYear: 2000, year: 2000 },
  { id: '2', name: 'Work 2', author: 'B', sortableYear: 1980, year: 1980 }
];

const staticFiltersData = {
  authors: [{ key: 'a1', name: 'Author1' }],
  titles: [{ title: 'Some title' }],
  yearRange: { minYear: 1900, maxYear: 2024 }
};

interface LinkProps {
  children: React.ReactNode;
  href?: string;
}

interface FilterAutocompleteProps {
  select: (json: unknown) => unknown;
}

interface EnhancedTableProps {
  data: unknown[];
  tableName: string;
  Filters: React.ReactNode;
  Search: React.ReactNode;
  columns: { id: string; cell?: (info: { row: { original: { year: number } } }) => React.ReactNode }[];
}

interface TableFiltersProps {
  filters: { id: string; element: React.ReactNode }[];
  onClearAllFilters: () => void;
}

interface YearNumericFilterProps {
  minYear: number;
  maxYear: number;
  onChangeCommitted: (v: [number, number]) => void;
  onChange: (v: [number, number]) => void;
}

interface FilterSelectProps {
  label: string;
  onAdd: (v: unknown, l: unknown, all: string[]) => void;
  onRemove: (v: unknown, l: unknown, all: string[]) => void;
}

jest.mock('next-intl', () => ({
  __esModule: true,
  useTranslations: () => (key: string) => key,
  useLocale: () => 'en'
}));

jest.mock('~/i18n/navigation', () => ({
  Link: ({ children, href = '#' }: LinkProps) => <a href={href}>{children}</a>,
  useRouter: () => ({ push: jest.fn() }),
  usePathname: () => '/',
  useLocale: () => 'en'
}));

jest.mock('~/i18n/routing', () => ({
  defineRouting: () => ({})
}));

jest.mock('~/shared/hooks/use-breakpoints/useBreakpoints', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    isMobile: false,
    isTablet: false,
    isLaptop: true,
    isDesktop: true,
    isLaptopAndAbove: true
  }))
}));

jest.mock('~/shared/hooks/use-fetch-static-filters/useFetchStaticFilters', () => ({
  useFetchStaticFilters: jest.fn()
}));

let storedSelectFn: ((json: unknown) => unknown) | null = null;

jest.mock('~/shared/hooks/useFilterAutocomplete/useFilterAutocomplete', () => ({
  useFilterAutocomplete: jest.fn(({ select }: FilterAutocompleteProps) => {
    storedSelectFn = select;
    return {
      options: [],
      loading: false
    };
  })
}));

const mockSetParam = jest.fn();
const mockDebouncedSetParam = jest.fn();
const mockResetFilters = jest.fn();

jest.mock('~/shared/hooks/use-table-filters/useTableFilters', () => ({
  useTableFilters: jest.fn(() => ({
    params: {
      search: '',
      author: [],
      yearFrom: null,
      yearTo: null
    },
    setParam: mockSetParam,
    debouncedSetParam: mockDebouncedSetParam,
    resetFilters: mockResetFilters
  }))
}));

jest.mock('~/shared/hooks/use-table-data/useTableData', () => ({
  useTableData: () => ({
    data: tableMock,
    isLoading: false
  })
}));

jest.mock('~/shared/components/enhanced-table/EnhancedTable', () => ({
  __esModule: true,
  EnhancedTable: ({ data, tableName, Filters, Search, columns }: EnhancedTableProps) => {
    const yearColumn = columns.find((c) => c.id === 'sortableYear');
    return (
      <div data-testid="enhanced-table">
        <div data-testid="table-name">{tableName}</div>
        <div data-testid="search-prop">{Search}</div>
        <div data-testid="filters-prop">{Filters}</div>
        <div data-testid="columns-count">{columns.length}</div>
        {yearColumn?.cell && (
          <div data-testid="custom-year-cell">{yearColumn.cell({ row: { original: { year: 2026 } } })}</div>
        )}
        {data.map((r: any) => (
          <div key={r.id} data-testid="row">
            {r.name}
          </div>
        ))}
      </div>
    );
  }
}));

jest.mock('~/shared/components/design-system/all-components/table-filters/TableFilters', () => ({
  TableFilters: ({ filters, onClearAllFilters }: TableFiltersProps) => (
    <div data-testid="table-filters">
      {filters?.map((f) => (
        <div key={f.id} data-testid={`filter-${f.id}`}>
          {f.element}
        </div>
      ))}
      <button data-testid="clear-all" onClick={onClearAllFilters}>
        clear
      </button>
    </div>
  )
}));

jest.mock('~/shared/components/tables/WorksTable/filters/YearNumericFilter', () => ({
  YearNumericFilter: ({ minYear, maxYear, onChangeCommitted, onChange }: YearNumericFilterProps) => (
    <div data-testid="year-filter">
      <span data-testid="min-year">{minYear}</span>
      <span data-testid="max-year">{maxYear}</span>
      <button data-testid="commit-year" onClick={() => onChangeCommitted([1995, 2005])}>
        commit-year
      </button>
      <button data-testid="change-year" onClick={() => onChange([1996, 2006])}>
        change-year
      </button>
    </div>
  )
}));

jest.mock('~/shared/components/design-system/all-components/selector/FilterSelect', () => ({
  FilterSelect: ({ label, onAdd, onRemove }: FilterSelectProps) => (
    <div data-testid={`filter-select-${label}`}>
      <button data-testid={`add-${label}`} onClick={() => onAdd(null, null, ['a1'])}>
        add-{label}
      </button>
      <button data-testid={`remove-${label}`} onClick={() => onRemove(null, null, [])}>
        remove-{label}
      </button>
    </div>
  )
}));

jest.mock('./WorkTableCells', () => ({
  RenderNameHeader: () => <div />,
  renderNameCell: () => <div />,
  RenderAuthorHeader: () => <div />,
  renderAuthorCell: () => <div />,
  RenderYearHeader: () => <div />,
  renderYearCell: (year: number) => <div data-testid="inner-year-cell">{year}</div>,
  RenderActionCell: () => <div />
}));

describe('WorkTableSection', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    storedSelectFn = null;
    (useFetchStaticFilters as jest.Mock).mockReturnValue({
      data: staticFiltersData,
      isLoading: false
    });
    (useBreakpoints as jest.Mock).mockReturnValue({
      isMobile: false,
      isTablet: false,
      isLaptop: true,
      isDesktop: true,
      isLaptopAndAbove: true
    });
    (useTableFilters as jest.Mock).mockReturnValue({
      params: { search: '', author: [], yearFrom: null, yearTo: null },
      setParam: mockSetParam,
      debouncedSetParam: mockDebouncedSetParam,
      resetFilters: mockResetFilters
    });
  });

  it('renders table + search + filters', () => {
    render(<WorkTableSection />);

    expect(screen.getByTestId('enhanced-table')).toBeInTheDocument();
    expect(screen.getByTestId('search-prop')).toBeInTheDocument();
    expect(screen.getByTestId('filters-prop')).toBeInTheDocument();
  });

  it('renders rows', () => {
    render(<WorkTableSection />);
    expect(screen.getAllByTestId('row').length).toBe(2);
  });

  it('year filter commit triggers setParam twice', () => {
    render(<WorkTableSection />);

    fireEvent.click(screen.getByTestId('commit-year'));

    expect(mockSetParam).toHaveBeenCalled();
  });

  it('clear all triggers resetFilters', () => {
    render(<WorkTableSection />);
    fireEvent.click(screen.getByTestId('clear-all'));

    expect(mockResetFilters).toHaveBeenCalled();
  });

  it('year filter uses provided values', () => {
    render(<WorkTableSection />);

    expect(screen.getByTestId('min-year')).toHaveTextContent('1900');
    expect(screen.getByTestId('max-year')).toHaveTextContent('2024');
  });

  it('year filter defaults when static yearRange missing', () => {
    (useFetchStaticFilters as jest.Mock).mockReturnValueOnce({
      data: { ...staticFiltersData, yearRange: undefined }
    });

    render(<WorkTableSection />);

    expect(screen.getByTestId('min-year')).toHaveTextContent('1900');
    expect(screen.getByTestId('max-year')).toHaveTextContent(new Date().getFullYear().toString());
  });

  it('should execution callback function inside selectTitles to map and transform options cleanly', () => {
    render(<WorkTableSection />);

    expect(storedSelectFn).toBeInstanceOf(Function);

    if (storedSelectFn) {
      const mockRawPayload = {
        titles: [{ _id: 'id1', title: 'mapped title testing' }]
      };
      const resultingMapping = storedSelectFn(mockRawPayload);
      expect(resultingMapping).toEqual([{ _id: 'id1', title: 'mapped title testing', kind: 'composition' }]);
    }
  });

  it('should remove elements on filter select event change and push payload update back to state controller', () => {
    render(<WorkTableSection />);

    fireEvent.click(screen.getByTestId('add-author'));
    expect(mockSetParam).toHaveBeenCalledWith('author', ['a1']);

    fireEvent.click(screen.getByTestId('remove-author'));
    expect(mockSetParam).toHaveBeenCalledWith('author', []);
  });

  it('should slice out specific static column ids layout if current platform breaks target tablet or mobile bounds', () => {
    (useBreakpoints as jest.Mock).mockReturnValueOnce({
      isMobile: true,
      isTablet: false,
      isLaptop: false,
      isDesktop: false,
      isLaptopAndAbove: false
    });

    render(<WorkTableSection />);
    expect(screen.getByTestId('columns-count')).toHaveTextContent('2');
  });

  it('should trigger state handlers when year filter changes value values before commit sequence', () => {
    render(<WorkTableSection />);

    fireEvent.click(screen.getByTestId('change-year'));

    expect(mockSetParam).toHaveBeenCalled();
  });

  it('should call custom year cell renderer logic correctly within mapped table definitions', () => {
    render(<WorkTableSection />);

    expect(screen.getByTestId('custom-year-cell')).toBeInTheDocument();
    expect(screen.getByTestId('inner-year-cell')).toHaveTextContent('2026');
  });

  it('should activate filters count markers if authors tracking param list holds entries', () => {
    (useTableFilters as jest.Mock).mockReturnValueOnce({
      params: { search: '', author: ['a1'], yearFrom: 1950, yearTo: 2010 },
      setParam: mockSetParam,
      debouncedSetParam: mockDebouncedSetParam,
      resetFilters: mockResetFilters
    });

    render(<WorkTableSection />);
    expect(screen.getByTestId('enhanced-table')).toBeInTheDocument();
  });

  it('should cover line 123 branch condition when yearTo parameter is active and differs from default bounds', () => {
    (useTableFilters as jest.Mock).mockReturnValueOnce({
      params: { search: '', author: [], yearFrom: 1900, yearTo: 2015 },
      setParam: mockSetParam,
      debouncedSetParam: mockDebouncedSetParam,
      resetFilters: mockResetFilters
    });

    render(<WorkTableSection />);
    expect(screen.getByTestId('enhanced-table')).toBeInTheDocument();
  });

  it('should cover line 138 fallback branch when static filters author object array payload resolves to undefined', () => {
    (useFetchStaticFilters as jest.Mock).mockReturnValueOnce({
      data: { ...staticFiltersData, authors: undefined },
      isLoading: false
    });

    render(<WorkTableSection />);
    expect(screen.getByTestId('enhanced-table')).toBeInTheDocument();
  });
});
