import { createTheme, ThemeProvider } from '@mui/material/styles';
import { render, screen } from '@testing-library/react';

import Archive from './page';

const theme = createTheme();

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

jest.mock('next-intl', () => ({
  useLocale: () => 'uk'
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

  it('should render the page shell', () => {
    renderWithTheme(<Archive />);
    expect(screen.getByTestId('ArchivePage')).toBeInTheDocument();
    expect(screen.getByTestId('ArchiveHeader')).toBeInTheDocument();
  });

  it('should show loader initially and hide it after funds load', async () => {
    renderWithTheme(<Archive />);

    expect(screen.getByTestId('ArchivePage-loader')).toBeInTheDocument();
    expect(screen.getByRole('progressbar')).toBeInTheDocument();

    expect(screen.queryByTestId('ArchivePage-fundsGrid')).not.toBeInTheDocument();

    expect(await screen.findByTestId('ArchivePage-fundsGrid')).toBeInTheDocument();
    expect(screen.queryByTestId('ArchivePage-loader')).not.toBeInTheDocument();
  });

  it('should load and display fund cards', async () => {
    renderWithTheme(<Archive />);

    expect(await screen.findByTestId('FundCard-1')).toBeInTheDocument();
    expect(screen.getByTestId('FundCard-2')).toBeInTheDocument();
    expect(screen.getByTestId('FundCard-3')).toBeInTheDocument();
  });

  it('should call API to fetch funds', async () => {
    renderWithTheme(<Archive />);

    await screen.findByTestId('ArchivePage-fundsGrid');

    expect(globalThis.fetch).toHaveBeenCalledTimes(1);
    expect(globalThis.fetch).toHaveBeenCalledWith('/api/funds');
  });

  it('should call setParam when search is triggered', () => {
    renderWithTheme(<Archive />);

    screen.getByTestId('trigger-search').click();

    expect(setParam).toHaveBeenCalledWith('search', 'test');
  });
});
