import type { CellContext } from '@tanstack/react-table';
import { render, screen } from '@testing-library/react';
import React from 'react';

import type { WorkTable } from '~/types/types/enhancedTable';

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key
}));

const mockUseBreakpoints = jest.fn();
jest.mock('~/shared/hooks/use-breakpoints/useBreakpoints', () => ({
  __esModule: true,
  default: () => mockUseBreakpoints()
}));

jest.mock('~/ds-components/button/Button', () => {
  function MockButton({
    children,
    link,
    endIcon
  }: {
    children: React.ReactNode;
    link?: string;
    endIcon?: React.ReactNode;
  }) {
    return link ? (
      <a href={link}>
        {children}
        {endIcon}
      </a>
    ) : (
      <button>
        {children}
        {endIcon}
      </button>
    );
  }
  return { __esModule: true, default: MockButton };
});

jest.mock('public/icons/eye.svg', () => {
  function EyeIconMock() {
    return <span data-testid="eye-icon">eye</span>;
  }
  return EyeIconMock;
});
jest.mock('public/icons/log-out.svg', () => {
  function LogOutIconMock() {
    return <span data-testid="log-out-icon">log-out</span>;
  }
  return LogOutIconMock;
});

import {
  RenderActionCell,
  renderAuthorCell,
  RenderAuthorHeader,
  renderNameCell,
  RenderNameHeader,
  renderYearCell,
  RenderYearHeader
} from './WorkTableCells';

const setDesktop = () =>
  mockUseBreakpoints.mockReturnValue({
    isMobile: false,
    isTablet: false,
    isLaptop: true,
    isDesktop: true,
    isLaptopAndAbove: true
  });

const setTablet = () =>
  mockUseBreakpoints.mockReturnValue({
    isMobile: false,
    isTablet: true,
    isLaptop: false,
    isDesktop: false,
    isLaptopAndAbove: false
  });

const setMobile = () =>
  mockUseBreakpoints.mockReturnValue({
    isMobile: true,
    isTablet: false,
    isLaptop: false,
    isDesktop: false,
    isLaptopAndAbove: false
  });

const createMockCellContext = <T,>(value: T): CellContext<WorkTable, unknown> =>
  ({
    getValue: jest.fn().mockReturnValue(value),
    row: { original: {} as WorkTable }
  }) as unknown as CellContext<WorkTable, unknown>;

const createMockActionCellContext = (original: Partial<WorkTable>): CellContext<WorkTable, unknown> =>
  ({
    getValue: jest.fn(),
    row: { original: original as WorkTable }
  }) as unknown as CellContext<WorkTable, unknown>;

describe('WorkTable Components', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    setDesktop();
  });

  describe('Header Components', () => {
    it('should render name header with correct text', () => {
      render(<RenderNameHeader />);
      expect(screen.getByText('name')).toBeInTheDocument();
    });
    it('should render author header with correct text', () => {
      render(<RenderAuthorHeader />);
      expect(screen.getByText('author')).toBeInTheDocument();
    });
    it('should render year header with correct text', () => {
      render(<RenderYearHeader />);
      expect(screen.getByText('year')).toBeInTheDocument();
    });
  });

  describe('Cell Renderers', () => {
    it('should render name cell with provided value', () => {
      const mockInfo = createMockCellContext('Sample Work Title');
      render(renderNameCell(mockInfo));
      expect(screen.getByText('Sample Work Title')).toBeInTheDocument();
    });
    it('should render author cell with max width', () => {
      const mockInfo = createMockCellContext('John Doe');
      render(renderAuthorCell(mockInfo));
      expect(screen.getByText('John Doe')).toHaveStyle({ maxWidth: '192px' });
    });
    it('should render year cell with value', () => {
      render(renderYearCell('2023'));
      expect(screen.getByText('2023')).toBeInTheDocument();
    });
  });

  describe('RenderActionCell', () => {
    it('should render IconButton (img alt="view") on tablet for preview', () => {
      setTablet();
      const mockInfo = createMockActionCellContext({ isPreview: true });
      render(<RenderActionCell {...mockInfo} />);
      expect(screen.getByAltText('view')).toBeInTheDocument();
      expect(screen.queryByText('view')).not.toBeInTheDocument();
    });

    it('should render IconButton (img alt="view") on mobile for preview', () => {
      setMobile();
      const mockInfo = createMockActionCellContext({ isPreview: true });
      render(<RenderActionCell {...mockInfo} />);
      expect(screen.getByAltText('view')).toBeInTheDocument();
      expect(screen.queryByText('view')).not.toBeInTheDocument();
    });

    it('should render link Button with LogOutIcon on desktop when url exists', () => {
      setDesktop();
      const mockInfo = createMockActionCellContext({ url: 'https://example.com' });
      render(<RenderActionCell {...mockInfo} />);
      const link = screen.getByText('goto').closest('a');
      expect(link).toHaveAttribute('href', 'https://example.com');
      expect(screen.getByTestId('log-out-icon')).toBeInTheDocument();
    });

    it('should render IconButton (img alt="goto") on tablet when url exists', () => {
      setTablet();
      const mockInfo = createMockActionCellContext({ url: 'https://example.com' });
      render(<RenderActionCell {...mockInfo} />);
      expect(screen.getByAltText('goto')).toBeInTheDocument();
      expect(screen.queryByText('goto')).not.toBeInTheDocument();
    });

    it('should render IconButton (img alt="goto") on mobile when url exists', () => {
      setMobile();
      const mockInfo = createMockActionCellContext({ url: 'https://example.com' });
      render(<RenderActionCell {...mockInfo} />);
      expect(screen.getByAltText('goto')).toBeInTheDocument();
      expect(screen.queryByText('goto')).not.toBeInTheDocument();
    });

    it('should render null when neither isPreview nor url is provided', () => {
      const mockInfo = createMockActionCellContext({});
      const { container } = render(<RenderActionCell {...mockInfo} />);
      expect(container.firstChild).toBeNull();
    });
  });
});
