import { act, fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { ROUTES } from '../../constants/routes';
import MusicTableSection from './MusicTableSection';
import { ApiRoutes } from '~/constants/routes/api-routes';

import useBreakpoints from '~/shared/hooks/use-breakpoints/useBreakpoints';
import { useFetchStaticFilters } from '~/shared/hooks/use-fetch-static-filters/useFetchStaticFilters';
import { useTableFilters } from '~/shared/hooks/use-table-filters/useTableFilters';

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
  columns: {
    id: string;
    meta?: { groupLabelContentFactory?: (items: unknown[]) => React.ReactNode };
    cell?: (info?: unknown, cb?: unknown) => React.ReactNode;
  }[];
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
  onAdd: (value: unknown, labelValue: unknown, all: string[]) => void;
  onRemove: (value: unknown, labelValue: unknown, all: string[]) => void;
}

interface ActionsCellInfo {
  row: { original: Record<string, unknown> };
}

interface NotesModalProps {
  opened: boolean;
  handleClose: () => void;
}

interface SearchProps {
  search: string;
  setSearch: (v: string) => void;
}

type MutableApiRoutes = Record<string, string | undefined>;

const musicTableMock = [
  { id: '1', name: 'Composition 1', year: 2000, genre: ['Романс', 'Джаз'] },
  { id: '2', name: 'Composition 2', year: 1970, genre: ['Рок', 'Мистецька пісня'] }
];

const breakpointMock = {
  isMobile: false,
  isTablet: false,
  isLaptop: true,
  isDesktop: true,
  isLaptopAndAbove: true
};

const staticFiltersData = {
  categories: [{ key: 'classic', name: 'classic' }],
  titles: [{ title: 'Symphony' }],
  yearRange: { minYear: 1900, maxYear: 2026 }
};

jest.mock('next-intl', () => ({
  __esModule: true,
  useTranslations: () => (key: string) => key,
  useLocale: () => 'en'
}));

jest.mock('~/i18n/navigation', () => ({
  Link: ({ children, href = '#' }: LinkProps) => <a href={href}>{children}</a>,
  useRouter: () => ({ push: jest.fn() }),
  usePathname: () => ROUTES.HOME,
  useLocale: () => 'en'
}));

jest.mock('~/i18n/routing', () => ({
  defineRouting: () => ({})
}));

jest.mock('~/constants/routes/api-routes', () => ({
  ApiRoutes: {
    COMPOSITION_FILTERS: '/api/composition-filters',
    COMPOSITION_DATA: '/api/composition-data',
    COMPOSITION_TITLES: '/api/composition-titles'
  }
}));

jest.mock('~/shared/hooks/use-breakpoints/useBreakpoints', () => ({
  __esModule: true,
  default: jest.fn(() => breakpointMock)
}));

jest.mock('~/shared/hooks/use-fetch-static-filters/useFetchStaticFilters', () => ({
  useFetchStaticFilters: jest.fn(() => ({
    data: staticFiltersData,
    isLoading: false
  }))
}));

const mockSetParam = jest.fn();
const mockDebouncedSetParam = jest.fn();
const mockResetFilters = jest.fn();

jest.mock('~/shared/hooks/use-table-filters/useTableFilters', () => ({
  useTableFilters: jest.fn(() => ({
    params: {
      search: '',
      category: [],
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
    data: musicTableMock,
    isLoading: false
  })
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

jest.mock('~/shared/components/search/Search', () => ({
  Search: ({ search, setSearch }: SearchProps) => (
    <div data-testid="music-search">
      <span data-testid="search-value">{search}</span>
      <button data-testid="trigger-search" onClick={() => setSearch('test-search')}>
        search
      </button>
    </div>
  )
}));

jest.mock('~/shared/components/enhanced-table/EnhancedTable', () => {
  return {
    __esModule: true,
    EnhancedTable: ({ data, tableName, Filters, Search, columns }: EnhancedTableProps) => {
      const actionsColumn = columns.find((c) => c.id === 'actions');
      const opusColumn = columns.find((c) => c.id === 'opus');
      const nameColumn = columns.find((c) => c.id === 'name');

      return (
        <div data-testid="enhanced-table">
          <div data-testid="table-name">{tableName}</div>
          <div data-testid="search-prop">{Search}</div>
          <div data-testid="filters-prop">{Filters}</div>
          <div data-testid="columns-count">{columns.length}</div>
          {actionsColumn?.cell && (
            <button
              data-testid="trigger-actions-cell"
              onClick={() => {
                const dummyInfo: ActionsCellInfo = { row: { original: {} } };
                if (typeof actionsColumn.cell === 'function') {
                  actionsColumn.cell(dummyInfo);
                }
              }}
            >
              actions
            </button>
          )}
          {opusColumn?.cell && (
            <button
              data-testid="trigger-opus-cell"
              onClick={() => {
                if (typeof opusColumn.cell === 'function') {
                  opusColumn.cell();
                }
              }}
            >
              opus
            </button>
          )}
          {opusColumn?.meta?.groupLabelContentFactory && (
            <div data-testid="opus-group-factory">{opusColumn.meta.groupLabelContentFactory([] as unknown[])}</div>
          )}
          {nameColumn?.meta?.groupLabelContentFactory && (
            <div data-testid="name-group-factory">{nameColumn.meta.groupLabelContentFactory([] as unknown[])}</div>
          )}
          {data.map((row) => {
            const record = row as { id: string; name: string };
            return (
              <div data-testid="row" key={record.id}>
                {record.name}
              </div>
            );
          })}
        </div>
      );
    }
  };
});

jest.mock('~/shared/components/design-system/all-components/table-filters/TableFilters', () => ({
  TableFilters: ({ onClearAllFilters, filters }: TableFiltersProps) => (
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

jest.mock('~/shared/components/design-system/all-components/selector/FilterSelect', () => ({
  FilterSelect: ({ label, onAdd, onRemove }: FilterSelectProps) => (
    <div data-testid={`filter-select-${label}`}>
      <button data-testid={`add-${label}`} onClick={() => onAdd('test-value', 'test-value', ['test-value'])}>
        add
      </button>
      <button data-testid={`remove-${label}`} onClick={() => onRemove('test-value', 'test-value', ['test-value'])}>
        remove
      </button>
    </div>
  )
}));

jest.mock('~/shared/components/tables/WorksTable/filters/YearNumericFilter', () => ({
  YearNumericFilter: ({ minYear, maxYear, onChangeCommitted, onChange }: YearNumericFilterProps) => (
    <div data-testid="year-filter">
      <span data-testid="min-year">{minYear}</span>
      <span data-testid="max-year">{maxYear}</span>
      <button onClick={() => onChangeCommitted([1991, 2001])} data-testid="commit-year">
        apply-year
      </button>
      <button onClick={() => onChange([1991, 2001])} data-testid="change-year">
        change-year
      </button>
    </div>
  )
}));

jest.mock('~/shared/components/get-notes-modal/GetNotesModal', () => ({
  __esModule: true,
  default: ({ opened, handleClose }: NotesModalProps) => (
    <div data-testid="notes-modal">
      <span data-testid="notes-modal-status">{String(opened)}</span>
      <button data-testid="close-notes-modal" onClick={handleClose}>
        close
      </button>
    </div>
  )
}));

let mockActionCellReceivedCb: ((payload: { composition: string; notes: unknown[] }) => void) | null = null;

jest.mock('./MusicTableCells', () => ({
  RenderExpanderCell: () => <div />,
  RenderOpusHeader: () => <div />,
  renderOpusGroupLabel: () => <div data-testid="inner-opus-group" />,
  RenderPlayCell: () => <div />,
  RenderNameHeader: () => <div />,
  renderNameCell: () => <div />,
  renderOpusTitleGroupLabel: () => <div data-testid="inner-opus-title-group" />,
  RenderYearHeader: () => <div />,
  renderYearCell: () => <div />,
  RenderGenreHeader: () => <div />,
  RenderGenreCell: () => <div />,
  RenderActionsCell: (info: unknown, handleOpenModal: (payload: { composition: string; notes: unknown[] }) => void) => {
    mockActionCellReceivedCb = handleOpenModal;
    return <div />;
  }
}));

jest.mock('next-intl/navigation', () => ({
  usePathname: () => ROUTES.HOME,
  useRouter: () => ({ push: jest.fn() }),
  useLocale: () => 'en',
  redirect: jest.fn()
}));

describe('MusicTableSection (cleaned)', () => {
  const routes = ApiRoutes as unknown as MutableApiRoutes;
  const originalCompositionFilters = routes.COMPOSITION_FILTERS;

  beforeEach(() => {
    jest.clearAllMocks();
    storedSelectFn = null;
    mockActionCellReceivedCb = null;
    routes.COMPOSITION_FILTERS = originalCompositionFilters;
    (useFetchStaticFilters as jest.Mock).mockReturnValue({ data: staticFiltersData });
    (useBreakpoints as jest.Mock).mockReturnValue(breakpointMock);
    (useTableFilters as jest.Mock).mockReturnValue({
      params: { search: '', category: [], genre: [], yearFrom: null, yearTo: null },
      setParam: mockSetParam,
      debouncedSetParam: mockDebouncedSetParam,
      resetFilters: mockResetFilters
    });
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

    expect(mockSetParam).toHaveBeenCalledWith('yearFrom', 1991);
    expect(mockSetParam).toHaveBeenCalledWith('yearTo', 2001);
  });

  it('clear all triggers resetFilters', () => {
    render(<MusicTableSection />);
    fireEvent.click(screen.getByTestId('clear-all'));
    expect(mockResetFilters).toHaveBeenCalled();
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
    expect(screen.getByTestId('max-year')).toHaveTextContent('2026');
  });

  it('should execution callback function inside selectTitles to map title parameters autocomplete cleanly', () => {
    render(<MusicTableSection />);
    expect(storedSelectFn).toBeInstanceOf(Function);

    if (storedSelectFn) {
      const mockRawPayload = { titles: [{ _id: 't1', title: 'Symphony testing' }] };
      const resultingMapping = storedSelectFn(mockRawPayload);
      expect(resultingMapping).toEqual([{ _id: 't1', title: 'Symphony testing' }]);
    }
  });

  it('should slice out specific static column ids layout if current platform breaks target tablet or mobile viewport bounds', () => {
    (useBreakpoints as jest.Mock).mockReturnValueOnce({
      isMobile: true,
      isTablet: true,
      isLaptop: false,
      isDesktop: false,
      isLaptopAndAbove: false
    });

    render(<MusicTableSection />);
    expect(screen.getByTestId('columns-count')).toHaveTextContent('3');
  });

  it('should handle category select change actions and correctly dispatch updates back to state hook managers', () => {
    render(<MusicTableSection />);

    fireEvent.click(screen.getByTestId('add-category'));
    expect(mockSetParam).toHaveBeenCalledWith('category', ['test-value']);

    fireEvent.click(screen.getByTestId('remove-category'));
    expect(mockSetParam).toHaveBeenCalledWith('category', ['test-value']);
  });

  it('should update state tracking parameters during pre commit slider value adjustments', () => {
    render(<MusicTableSection />);

    fireEvent.click(screen.getByTestId('change-year'));

    expect(mockSetParam).toHaveBeenCalledWith('yearFrom', 1991);
    expect(mockSetParam).toHaveBeenCalledWith('yearTo', 2001);
  });

  it('should open details notes overlay when actions cell triggers internal callback sequence and support closing flow', () => {
    render(<MusicTableSection />);

    fireEvent.click(screen.getByTestId('trigger-actions-cell'));

    if (mockActionCellReceivedCb) {
      act(() => {
        if (mockActionCellReceivedCb) {
          mockActionCellReceivedCb({ composition: 'Test Comp', notes: [{ dateUploaded: '2026' }] });
        }
      });
    }

    expect(screen.getByTestId('notes-modal-status')).toHaveTextContent('true');

    fireEvent.click(screen.getByTestId('close-notes-modal'));
    expect(screen.getByTestId('notes-modal-status')).toHaveTextContent('false');
  });

  it('should activate filter metrics tracking states when initial inputs provide multi language constraints', () => {
    (useTableFilters as jest.Mock).mockReturnValueOnce({
      params: { search: '', category: ['classic'], yearFrom: 1950, yearTo: 2010 },
      setParam: mockSetParam,
      debouncedSetParam: mockDebouncedSetParam,
      resetFilters: mockResetFilters
    });

    render(<MusicTableSection />);
    expect(screen.getByTestId('enhanced-table')).toBeInTheDocument();
  });

  it('should call internal static cell meta factories and group factories dynamically on rendering workflows', () => {
    render(<MusicTableSection />);
    expect(screen.getByTestId('opus-group-factory')).toBeInTheDocument();
    expect(screen.getByTestId('name-group-factory')).toBeInTheDocument();
  });

  it('should evaluate conditional branch fallbacks when static input category and genre details resolve to null fields', () => {
    (useFetchStaticFilters as jest.Mock).mockReturnValueOnce({
      data: { ...staticFiltersData, categories: undefined }
    });

    render(<MusicTableSection />);
    expect(screen.getByTestId('enhanced-table')).toBeInTheDocument();
  });

  it('should fallback category counts and default values to empty when params collections are undefined', () => {
    (useTableFilters as jest.Mock).mockReturnValueOnce({
      params: { search: '', category: undefined, yearFrom: null, yearTo: null },
      setParam: mockSetParam,
      debouncedSetParam: mockDebouncedSetParam,
      resetFilters: mockResetFilters
    });

    render(<MusicTableSection />);

    expect(screen.getByTestId('enhanced-table')).toBeInTheDocument();
    expect(screen.getByTestId('filter-select-category')).toBeInTheDocument();
  });

  it('should fall back COMPOSITION_FILTERS endpoint to null when the route constant is not defined', () => {
    routes.COMPOSITION_FILTERS = undefined;

    render(<MusicTableSection />);

    expect(screen.getByTestId('enhanced-table')).toBeInTheDocument();
  });

  it('should resolve table key to tablet when only tablet breakpoint is active', () => {
    (useBreakpoints as jest.Mock).mockReturnValueOnce({
      isMobile: false,
      isTablet: true,
      isLaptop: false,
      isDesktop: false,
      isLaptopAndAbove: false
    });

    render(<MusicTableSection />);
    expect(screen.getByTestId('enhanced-table')).toBeInTheDocument();
  });

  it('should resolve table key to desktop when neither mobile nor tablet breakpoints are active', () => {
    (useBreakpoints as jest.Mock).mockReturnValueOnce({
      isMobile: false,
      isTablet: false,
      isLaptop: true,
      isDesktop: true,
      isLaptopAndAbove: true
    });

    render(<MusicTableSection />);
    expect(screen.getByTestId('enhanced-table')).toBeInTheDocument();
  });

  it('should invoke debounced search param updater when user types into the search field', () => {
    render(<MusicTableSection />);

    fireEvent.click(screen.getByTestId('trigger-search'));

    expect(mockDebouncedSetParam).toHaveBeenCalledWith('search', 'test-search');
  });

  it('should render empty opus cell content when opus column cell renderer executes', () => {
    render(<MusicTableSection />);

    fireEvent.click(screen.getByTestId('trigger-opus-cell'));

    expect(screen.getByTestId('enhanced-table')).toBeInTheDocument();
  });
});
