import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import MusicTableSection from './MusicTableSelection';

import { useFetchStaticFilters } from '~/shared/hooks/use-fetch-static-filters/useFetchStaticFilters';

const musicTableMock = [
  { id: '1', name: 'Composition 1', year: 2000, genre: ['Романс', 'Джаз'] },
  { id: '2', name: 'Composition 2', year: 1970, genre: ['Рок', 'Мистецька пісня'] }
];

jest.mock('next-intl', () => ({
  __esModule: true,
  useTranslations: () => (key: string) => key,
  useLocale: () => 'en'
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

const breakpointMock = {
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

const staticFiltersData = {
  categories: [{ key: 'classic', name: 'classic' }],
  genres: [{ key: 'rock', name: 'rock' }],
  titles: [{ title: 'Symphony' }],
  yearRange: { minYear: 1900, maxYear: 2025 }
};

jest.mock('~/shared/hooks/use-fetch-static-filters/useFetchStaticFilters', () => ({
  useFetchStaticFilters: jest.fn(() => ({
    data: {
      categories: [{ key: 'classic', name: 'classic' }],
      genres: [{ key: 'rock', name: 'rock' }],
      titles: [{ title: 'Symphony' }],
      yearRange: { minYear: 1900, maxYear: 2025 }
    },
    isLoading: false
  }))
}));

const setParam = jest.fn();
const debouncedSetParam = jest.fn();
const resetFilters = jest.fn();

jest.mock('~/shared/hooks/use-table-filters/useTableFilters', () => ({
  useTableFilters: () => ({
    params: {
      search: '',
      category: [],
      genre: [],
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
    data: musicTableMock,
    isLoading: false
  })
}));

jest.mock('~/shared/components/enhanced-table/EnhancedTable', () => {
  return {
    __esModule: true,
    EnhancedTable: ({ data, tableName, Filters, Search }: any) => (
      <div data-testid="enhanced-table">
        <div data-testid="table-name">{tableName}</div>
        <div data-testid="search-prop">{Search}</div>
        <div data-testid="filters-prop">{Filters}</div>
        {data.map((r: any) => (
          <div data-testid="row" key={r.id}>
            {r.name}
          </div>
        ))}
      </div>
    )
  };
});

jest.mock('~/shared/components/design-system/all-components/table-filters/TableFilters', () => ({
  TableFilters: ({ onClearAllFilters, filters }: any) => (
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
  YearNumericFilter: ({ minYear, maxYear, onChangeCommitted }: any) => (
    <div data-testid="year-filter">
      <span data-testid="min-year">{minYear}</span>
      <span data-testid="max-year">{maxYear}</span>
      <button onClick={() => onChangeCommitted([1990, 2000])} data-testid="commit-year">
        apply-year
      </button>
    </div>
  )
}));

jest.mock('~/ds-components/selector/FilterSelect', () => ({
  FilterSelect: ({ label, onAdd }: any) => (
    <button data-testid={`add-${label}`} onClick={() => onAdd(null, null, ['test'])}>
      add-{label}
    </button>
  )
}));

jest.mock('~/shared/components/get-notes-modal/GetNotesModal', () => ({
  __esModule: true,
  default: ({ opened }: any) => <div data-testid="notes-open">{String(opened)}</div>
}));

jest.mock('next-intl/navigation', () => ({
  usePathname: () => '/',
  useRouter: () => ({ push: jest.fn() }),
  useLocale: () => 'en',
  redirect: jest.fn()
}));

describe('MusicTableSection (cleaned)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useFetchStaticFilters as jest.Mock).mockReturnValue({ data: staticFiltersData });
  });

  it('renders table + search + filters', () => {
    render(<MusicTableSection />);

    expect(screen.getByTestId('enhanced-table')).toBeInTheDocument();
    expect(screen.getByTestId('search-prop')).toBeInTheDocument();
    expect(screen.getByTestId('filters-prop')).toBeInTheDocument();
  });

  it('renders rows', () => {
    render(<MusicTableSection />);
    expect(screen.getAllByTestId('row').length).toBe(2);
  });

  it('clicking year filter commit triggers setParam twice', () => {
    render(<MusicTableSection />);

    fireEvent.click(screen.getByTestId('commit-year'));

    expect(setParam).toHaveBeenCalledWith('yearFrom', 1990);
    expect(setParam).toHaveBeenCalledWith('yearTo', 2000);
  });

  it('clear all triggers resetFilters', () => {
    render(<MusicTableSection />);
    fireEvent.click(screen.getByTestId('clear-all'));
    expect(resetFilters).toHaveBeenCalled();
  });

  it('year range uses defaults if yearRange missing', () => {
    (useFetchStaticFilters as jest.Mock).mockReturnValueOnce({ data: { ...staticFiltersData, yearRange: undefined } });

    render(<MusicTableSection />);

    expect(screen.getByTestId('min-year')).toHaveTextContent('1900');
    expect(screen.getByTestId('max-year')).toHaveTextContent(String(new Date().getFullYear()));
  });

  it('year range uses provided values', () => {
    render(<MusicTableSection />);
    expect(screen.getByTestId('min-year')).toHaveTextContent('1900');
    expect(screen.getByTestId('max-year')).toHaveTextContent('2025');
  });
});
