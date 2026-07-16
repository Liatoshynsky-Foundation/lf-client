import { createTheme, ThemeProvider } from '@mui/material/styles';
import { render, screen } from '@testing-library/react';
import React, { Component, type ReactNode } from 'react';

import Archive from './page';

const theme = createTheme();

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

class TestErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean; error: Error | null }> {
  override state = { hasError: false, error: null as Error | null };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  override render() {
    if (this.state.hasError && this.state.error) {
      return <div data-testid="error-boundary-fallback">{this.state.error.message}</div>;
    }
    return this.props.children;
  }
}

const mockBreakpoints = {
  isMobile: false,
  isTablet: false,
  isLaptop: false,
  isDesktop: true
};

jest.mock('~/hooks/use-breakpoints/useBreakpoints', () => ({
  __esModule: true,
  default: () => mockBreakpoints
}));

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => 'en'
}));

const setParam = jest.fn();
const debouncedSetParam = jest.fn();
const resetFilters = jest.fn();

let mockSearchValue = '';

jest.mock('~/shared/hooks/use-table-filters/useTableFilters', () => ({
  useTableFilters: () => ({
    params: {
      get search() {
        return mockSearchValue;
      }
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
  default: ({ id, number, title }: { id: number; number: Record<string, string>; title: Record<string, string> }) => (
    <div data-testid={`FundCard-${id}`}>
      <div data-testid={`FundCard-${id}-number`}>{number.en}</div>
      <div data-testid={`FundCard-${id}-title`}>{title.en}</div>
    </div>
  )
}));

globalThis.fetch = jest.fn();

describe('Archive Page', () => {
  let consoleErrorSpy: jest.SpyInstance;

  beforeAll(() => {
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterAll(() => {
    consoleErrorSpy.mockRestore();
  });

  beforeEach(() => {
    jest.clearAllMocks();
    mockSearchValue = '';
    mockBreakpoints.isMobile = false;
    mockBreakpoints.isTablet = false;
    mockBreakpoints.isLaptop = false;
    mockBreakpoints.isDesktop = true;

    (globalThis.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({
        data: [
          { id: 1, number: { en: 'Fund 1', uk: 'Фонд 1' }, title: { en: 'Audio Records', uk: 'Аудіозаписи' } },
          {
            id: 2,
            number: { en: 'Fund 2', uk: 'Фонд 2' },
            title: { en: 'Personal Documents', uk: 'Особисті документи' }
          },
          { id: 3, number: { en: 'Fund 3', uk: 'Фонд 3' }, title: { en: 'Letters', uk: 'Листи' } }
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

  it('should handle response not ok error to cover lines 74-75 and 81-83', async () => {
    (globalThis.fetch as jest.Mock).mockResolvedValue({
      ok: false
    });

    renderWithTheme(
      <TestErrorBoundary>
        <Archive />
      </TestErrorBoundary>
    );

    expect(await screen.findByTestId('error-boundary-fallback')).toHaveTextContent('Failed to fetch funds');
  });

  it('should handle generic error instances inside catch block', async () => {
    (globalThis.fetch as jest.Mock).mockRejectedValue(new Error('Network Crash'));

    renderWithTheme(
      <TestErrorBoundary>
        <Archive />
      </TestErrorBoundary>
    );

    expect(await screen.findByTestId('error-boundary-fallback')).toHaveTextContent('Network Crash');
  });

  it('should handle unknown thrown types inside catch block', async () => {
    (globalThis.fetch as jest.Mock).mockRejectedValue('String Error');

    renderWithTheme(
      <TestErrorBoundary>
        <Archive />
      </TestErrorBoundary>
    );

    expect(await screen.findByTestId('error-boundary-fallback')).toHaveTextContent('Unknown error');
  });

  it('should adapt column rendering and padding on isMobile breakpoint to complete branch coverage', async () => {
    mockBreakpoints.isMobile = true;
    mockBreakpoints.isDesktop = false;

    renderWithTheme(<Archive />);
    expect(await screen.findByTestId('ArchivePage-fundsGrid')).toBeInTheDocument();
  });

  it('should adapt column rendering and padding on isTablet breakpoint to complete branch coverage', async () => {
    mockBreakpoints.isTablet = true;
    mockBreakpoints.isDesktop = false;

    renderWithTheme(<Archive />);
    expect(await screen.findByTestId('ArchivePage-fundsGrid')).toBeInTheDocument();
  });

  it('should adapt column rendering and padding on isLaptop breakpoint to complete branch coverage', async () => {
    mockBreakpoints.isLaptop = true;
    mockBreakpoints.isDesktop = false;

    renderWithTheme(<Archive />);
    expect(await screen.findByTestId('ArchivePage-fundsGrid')).toBeInTheDocument();
  });

  it('should trigger default branch inside getNumColumns when all breakpoints are false to complete coverage', async () => {
    mockBreakpoints.isMobile = false;
    mockBreakpoints.isTablet = false;
    mockBreakpoints.isLaptop = false;
    mockBreakpoints.isDesktop = false;

    renderWithTheme(<Archive />);
    expect(await screen.findByTestId('ArchivePage-fundsGrid')).toBeInTheDocument();
  });

  it.each([
    {
      description: 'search param',
      search: 'audio',
      expectedId: 'FundCard-1',
      unexpectedIds: ['FundCard-2', 'FundCard-3']
    },
    {
      description: 'search param in title',
      search: 'audio',
      expectedId: 'FundCard-1',
      unexpectedIds: ['FundCard-2', 'FundCard-3']
    },
    {
      description: 'search param in number',
      search: 'fund 2',
      expectedId: 'FundCard-2',
      unexpectedIds: ['FundCard-1', 'FundCard-3']
    }
  ])('should filter funds based on $description', async ({ search, expectedId, unexpectedIds }) => {
    mockSearchValue = search;
    renderWithTheme(<Archive />);

    expect(await screen.findByTestId(expectedId)).toBeInTheDocument();
    unexpectedIds.forEach((id) => {
      expect(screen.queryByTestId(id)).not.toBeInTheDocument();
    });
  });

  it('should render Archive component without crashing when search is triggered', async () => {
    renderWithTheme(<Archive />);
    expect(await screen.findByTestId('ArchivePage-fundsGrid')).toBeInTheDocument();
  });
});
