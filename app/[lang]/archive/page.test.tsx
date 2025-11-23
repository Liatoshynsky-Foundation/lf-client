import { createTheme, ThemeProvider } from '@mui/material/styles';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Archive from './page';

const theme = createTheme();

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key
}));

jest.mock('~/layouts/main-layout/MainLayout', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <div data-testid="MainLayout">{children}</div>
}));

jest.mock('./ArchiveHeader/ArchiveHeader', () => ({
  __esModule: true,
  default: ({ onSearch }: { onSearch: (query: string) => void }) => (
    <div data-testid="ArchiveHeader">
      <input data-testid="ArchiveHeader-searchInput" onChange={(e) => onSearch(e.target.value)} />
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

global.fetch = jest.fn();

describe('Archive Page', () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockResolvedValue({
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

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should renders without crashing', async () => {
    renderWithTheme(<Archive />);

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });

    expect(screen.getByTestId('ArchivePage')).toBeInTheDocument();
  });

  it('should displays loading state initially', () => {
    renderWithTheme(<Archive />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should renders ArchiveHeader after loading', async () => {
    renderWithTheme(<Archive />);

    await waitFor(() => {
      expect(screen.getByTestId('ArchiveHeader')).toBeInTheDocument();
    });
  });

  it('should renders funds grid after loading', async () => {
    renderWithTheme(<Archive />);

    await waitFor(() => {
      expect(screen.getByTestId('ArchivePage-fundsGrid')).toBeInTheDocument();
    });
  });

  it('should loads and displays fund cards', async () => {
    renderWithTheme(<Archive />);

    await waitFor(() => {
      expect(screen.getByTestId('FundCard-1')).toBeInTheDocument();
      expect(screen.getByTestId('FundCard-2')).toBeInTheDocument();
      expect(screen.getByTestId('FundCard-3')).toBeInTheDocument();
    });
  });

  it('should displays fund data correctly', async () => {
    renderWithTheme(<Archive />);

    await waitFor(() => {
      expect(screen.getByText('Fund 1')).toBeInTheDocument();
      expect(screen.getByText('Audio Records')).toBeInTheDocument();
    });
  });

  it('should filters funds based on search query', async () => {
    const user = userEvent.setup();
    renderWithTheme(<Archive />);

    await waitFor(() => {
      expect(screen.getByTestId('FundCard-1')).toBeInTheDocument();
    });

    const searchInput = screen.getByTestId('ArchiveHeader-searchInput');
    await user.type(searchInput, 'Audio');

    await waitFor(() => {
      expect(screen.getByTestId('FundCard-1')).toBeInTheDocument();
      expect(screen.queryByTestId('FundCard-2')).not.toBeInTheDocument();
      expect(screen.queryByTestId('FundCard-3')).not.toBeInTheDocument();
    });
  });

  it('should shows all funds when search is cleared', async () => {
    const user = userEvent.setup();
    renderWithTheme(<Archive />);

    await waitFor(() => {
      expect(screen.getByTestId('FundCard-1')).toBeInTheDocument();
    });

    const searchInput = screen.getByTestId('ArchiveHeader-searchInput');
    await user.type(searchInput, 'test');
    await user.clear(searchInput);

    await waitFor(() => {
      expect(screen.getByTestId('FundCard-1')).toBeInTheDocument();
      expect(screen.getByTestId('FundCard-2')).toBeInTheDocument();
      expect(screen.getByTestId('FundCard-3')).toBeInTheDocument();
    });
  });

  it('should search is case-insensitive', async () => {
    const user = userEvent.setup();
    renderWithTheme(<Archive />);

    await waitFor(() => {
      expect(screen.getByTestId('FundCard-1')).toBeInTheDocument();
    });

    const searchInput = screen.getByTestId('ArchiveHeader-searchInput');
    await user.type(searchInput, 'AUDIO');

    await waitFor(() => {
      expect(screen.getByTestId('FundCard-1')).toBeInTheDocument();
    });
  });

  it('should shows no results when search does not match', async () => {
    const user = userEvent.setup();
    renderWithTheme(<Archive />);

    await waitFor(() => {
      expect(screen.getByTestId('FundCard-1')).toBeInTheDocument();
    });

    const searchInput = screen.getByTestId('ArchiveHeader-searchInput');
    await user.type(searchInput, 'NonexistentFund');

    await waitFor(() => {
      expect(screen.queryByTestId('FundCard-1')).not.toBeInTheDocument();
      expect(screen.queryByTestId('FundCard-2')).not.toBeInTheDocument();
      expect(screen.queryByTestId('FundCard-3')).not.toBeInTheDocument();
    });
  });

  it('should calls API to fetch funds', async () => {
    renderWithTheme(<Archive />);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/funds');
    });
  });
});
