import { createTheme, ThemeProvider } from '@mui/material/styles';
import { render, screen, waitFor } from '@testing-library/react';

import Archive from './page';

const theme = createTheme();

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key
}));

const setParam = jest.fn();
const debouncedSetParam = jest.fn();
const resetFilters = jest.fn();

jest.mock('~/shared/hooks/use-table-filters/useTableFilters', () => ({
  useTableFilters: () => ({
    params: {
      search: ''
    },
    setParam,
    debouncedSetParam,
    resetFilters
  })
}));

jest.mock('~/layouts/main-layout/MainLayout', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <div data-testid="MainLayout">{children}</div>
}));

jest.mock('./ArchiveHeader/ArchiveHeader', () => ({
  __esModule: true,
  default: ({ onSearch }: { onSearch: (query: string) => void }) => (
    <div data-testid="ArchiveHeader">
      <button data-testid="trigger-search" onClick={() => onSearch('test')}>
        Search
      </button>
    </div>
  )
}));

jest.mock('./FundCard/FundCard', () => ({
  __esModule: true,
  default: ({ id, number, title }: { id: number; number: string; title: string }) => (
    <div data-testid={`FundCard-${id}`}>
      <div data-testid={`FundCard-${id}-number`}>{number}</div>
      <div data-testid={`FundCard-${id}-title`}>{title}</div>
    </div>
  )
}));

globalThis.fetch = jest.fn();

describe('Archive Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (globalThis.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({
        success: true,
        data: [
          { id: 1, number: 'Fund 1', title: 'Audio Records' },
          { id: 2, number: 'Fund 2', title: 'Personal Documents' },
          { id: 3, number: 'Fund 3', title: 'Letters' }
        ]
      })
    });
  });

  it('should render without crashing', async () => {
    renderWithTheme(<Archive />);

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });

    expect(screen.getByTestId('ArchivePage')).toBeInTheDocument();
  });

  it('should display loading state initially', () => {
    renderWithTheme(<Archive />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should render ArchiveHeader after loading', async () => {
    renderWithTheme(<Archive />);

    await waitFor(() => {
      expect(screen.getByTestId('ArchiveHeader')).toBeInTheDocument();
    });
  });

  it('should render funds grid after loading', async () => {
    renderWithTheme(<Archive />);

    await waitFor(() => {
      expect(screen.getByTestId('ArchivePage-fundsGrid')).toBeInTheDocument();
    });
  });

  it('should load and display fund cards', async () => {
    renderWithTheme(<Archive />);

    await waitFor(() => {
      expect(screen.getByTestId('FundCard-1')).toBeInTheDocument();
      expect(screen.getByTestId('FundCard-2')).toBeInTheDocument();
      expect(screen.getByTestId('FundCard-3')).toBeInTheDocument();
    });
  });

  it('should display fund data correctly', async () => {
    renderWithTheme(<Archive />);

    await waitFor(() => {
      expect(screen.getByText('Fund 1')).toBeInTheDocument();
      expect(screen.getByText('Audio Records')).toBeInTheDocument();
    });
  });

  it('should call API to fetch funds', async () => {
    renderWithTheme(<Archive />);

    await waitFor(() => {
      expect(globalThis.fetch).toHaveBeenCalledWith('/api/funds');
    });
  });

  it('should call setParam when search is triggered', async () => {
    renderWithTheme(<Archive />);

    await waitFor(() => {
      expect(screen.getByTestId('trigger-search')).toBeInTheDocument();
    });

    screen.getByTestId('trigger-search').click();

    expect(setParam).toHaveBeenCalledWith('search', 'test');
  });
});
