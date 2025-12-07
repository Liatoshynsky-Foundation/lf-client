import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { WorkTableSection } from './WorkTableSelection';

import { useFetchStaticFilters } from '~/shared/hooks/use-fetch-static-filters/useFetchStaticFilters';

const tableMock = [
  { id: '1', name: 'Work 1', author: 'A', sortableYear: 2000, year: 2000 },
  { id: '2', name: 'Work 2', author: 'B', sortableYear: 1980, year: 1980 }
];

const staticFiltersData = {
  authors: [{ key: 'a1', name: 'Author1' }],
  titles: [{ title: 'Some title' }],
  yearRange: { minYear: 1900, maxYear: 2024 }
};

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key
}));

jest.mock('~/i18n/navigation', () => ({
  Link: ({ children, href = '#' }: any) => <a href={href}>{children}</a>,
  useRouter: () => ({ push: jest.fn() }),
  usePathname: () => '/',
  useLocale: () => 'en'
}));

jest.mock('~/i18n/routing', () => ({
  defineRouting: () => ({})
}));

jest.mock('~/shared/hooks/use-breakpoints/useBreakpoints', () => ({
  __esModule: true,
  default: () => ({
    isMobile: false,
    isTablet: false,
    isLaptop: true,
    isDesktop: true,
    isLaptopAndAbove: true
  })
}));

jest.mock('~/shared/hooks/use-fetch-static-filters/useFetchStaticFilters', () => ({
  useFetchStaticFilters: jest.fn()
}));

const setParam = jest.fn();
const debouncedSetParam = jest.fn();
const resetFilters = jest.fn();

jest.mock('~/shared/hooks/use-table-filters/useTableFilters', () => ({
  useTableFilters: () => ({
    params: {
      search: '',
      author: [],
      yearFrom: null,
      yearTo: null
    },
    setParam,
    debouncedSetParam,
    resetFilters
  })
}));

jest.mock('~/shared/hooks/use-table-data/useTableData', () => ({
  useTableData: () => ({
    data: tableMock,
    isLoading: false
  })
}));

jest.mock('~/shared/components/enhanced-table/EnhancedTable', () => ({
  __esModule: true,
  EnhancedTable: ({ data, tableName, Filters, Search }: any) => {
    const FiltersRendered = typeof Filters === 'function' ? <Filters /> : Filters;
    const SearchRendered = typeof Search === 'function' ? <Search /> : Search;

    return (
      <div data-testid="enhanced-table">
        <div data-testid="table-name">{tableName}</div>
        <div data-testid="search-prop">{SearchRendered}</div>
        <div data-testid="filters-prop">{FiltersRendered}</div>

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
  TableFilters: ({ filters, onClearAllFilters }: any) => (
    <div data-testid="table-filters">
      {filters?.map((f: any) => (
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
  YearNumericFilter: ({
    minYear,
    maxYear,
    onChangeCommitted
  }: {
    minYear: number;
    maxYear: number;
    onChangeCommitted: (v: [number, number]) => void;
  }) => (
    <div data-testid="year-filter">
      <span data-testid="min-year">{minYear}</span>
      <span data-testid="max-year">{maxYear}</span>

      <button data-testid="commit-year" onClick={() => onChangeCommitted([1995, 2005])}>
        commit-year
      </button>
    </div>
  )
}));

jest.mock('~/shared/components/design-system/all-components/selector/FilterSelect', () => ({
  FilterSelect: ({ label, onAdd }: { label: string; onAdd: (v: any, l: any, all: string[]) => void }) => (
    <button data-testid={`add-${label}`} onClick={() => onAdd(null, null, ['a1'])}>
      add-{label}
    </button>
  )
}));

describe('WorkTableSection', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useFetchStaticFilters as jest.Mock).mockReturnValue({
      data: staticFiltersData,
      isLoading: false
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

    expect(setParam).toHaveBeenCalledWith('yearFrom', 1995);
    expect(setParam).toHaveBeenCalledWith('yearTo', 2005);
  });

  it('clear all triggers resetFilters', () => {
    render(<WorkTableSection />);
    fireEvent.click(screen.getByTestId('clear-all'));

    expect(resetFilters).toHaveBeenCalled();
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
});
