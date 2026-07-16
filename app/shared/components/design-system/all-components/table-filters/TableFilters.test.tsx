import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { TableFilters } from './TableFilters';
import { IconButtonColorVariant, IconButtonVariant } from '~/types/enums/common.enums';

type MockBoxProps = {
  children?: React.ReactNode;
  sx?: Record<string, unknown>;
  [key: string]: unknown;
};

jest.mock('@mui/material', () => ({
  Box: ({ children, sx, ...props }: MockBoxProps) => {
    const inlineStyle =
      sx && typeof sx === 'object'
        ? Object.fromEntries(Object.entries(sx).filter(([key]) => !key.startsWith('&')))
        : undefined;

    return (
      <div data-testid="mui-box" style={inlineStyle} {...props}>
        {children}
      </div>
    );
  }
}));

type MockIconButtonProps = {
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  [key: string]: unknown;
};

jest.mock('~/ds-components/icon-button/IconButton', () => ({
  IconButton: ({ children, onClick, ...props }: MockIconButtonProps) => (
    <button data-testid="icon-btn" onClick={onClick} {...props}>
      {children}
    </button>
  )
}));

type MockTooltipProps = {
  children?: React.ReactNode;
  title?: string;
};

jest.mock('~/shared/components/design-system/all-components/tooltip/Tooltip', () => ({
  __esModule: true,
  default: ({ children, title }: MockTooltipProps) => (
    <div data-testid="tooltip" title={title}>
      {children}
    </div>
  )
}));

jest.mock('~/public/icons/trash-2.svg', () => ({
  __esModule: true,
  default: () => <svg data-testid="delete-icon" />
}));

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key
}));

describe('TableFilters', () => {
  const baseFilters = [
    { id: 'filter1', element: <div data-testid="filter1">Filter1</div>, isActive: true },
    { id: 'filter2', element: <div data-testid="filter2">Filter2</div>, isActive: false }
  ];

  const onClearAllFilters = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render active filters first followed by inactive filters', () => {
    render(<TableFilters filters={baseFilters} isAnyFilterActive={true} onClearAllFilters={onClearAllFilters} />);
    const renderedFilters = screen.getAllByTestId(/^TableFilters-filter-/).map((node) => node.dataset.testid);

    expect(renderedFilters).toEqual(['TableFilters-filter-filter1', 'TableFilters-filter-filter2']);
  });

  it('should keep static filters in their original position while sorting others', () => {
    const filters = [
      { id: 'a', element: <div data-testid="a">A</div>, isActive: false },
      { id: 'static1', element: <div data-testid="static1">Static</div>, isStatic: true },
      { id: 'b', element: <div data-testid="b">B</div>, isActive: true }
    ];

    render(<TableFilters filters={filters} isAnyFilterActive={true} onClearAllFilters={onClearAllFilters} />);

    const renderedOrder = screen.getAllByTestId(/^TableFilters-filter-/).map((node) => node.dataset.testid);

    expect(renderedOrder).toEqual(['TableFilters-filter-b', 'TableFilters-filter-static1', 'TableFilters-filter-a']);
  });

  it('should display the clear button when filters are active and handler is provided', () => {
    render(<TableFilters filters={baseFilters} isAnyFilterActive={true} onClearAllFilters={onClearAllFilters} />);

    expect(screen.getByTestId('TableFilters-clearButton')).toBeInTheDocument();
    expect(screen.getByTestId('delete-icon')).toBeInTheDocument();
  });

  it('should not show the clear button when no filters are active', () => {
    render(<TableFilters filters={baseFilters} isAnyFilterActive={false} onClearAllFilters={onClearAllFilters} />);
    expect(screen.queryByTestId('icon-btn')).not.toBeInTheDocument();
  });

  it('should not show the clear button when onClearAllFilters is not provided', () => {
    render(<TableFilters filters={baseFilters} isAnyFilterActive={true} />);
    expect(screen.queryByTestId('icon-btn')).not.toBeInTheDocument();
  });

  it('should call onClearAllFilters when the clear button is clicked', () => {
    render(<TableFilters filters={baseFilters} isAnyFilterActive={true} onClearAllFilters={onClearAllFilters} />);

    const clearBtn = screen.getByTestId('TableFilters-clearButton');
    fireEvent.click(clearBtn);

    expect(onClearAllFilters).toHaveBeenCalledTimes(1);
  });

  it('should wrap the clear button inside a tooltip with correct title', () => {
    render(<TableFilters filters={baseFilters} isAnyFilterActive={true} onClearAllFilters={onClearAllFilters} />);

    const tooltip = screen.getByTestId('tooltip');
    expect(tooltip).toBeInTheDocument();
    expect(tooltip).toHaveAttribute('title', 'clearAll');
  });

  it('should pass correct enum variants to IconButton', () => {
    render(<TableFilters filters={baseFilters} isAnyFilterActive={true} onClearAllFilters={onClearAllFilters} />);

    const btn = screen.getByTestId('TableFilters-clearButton');

    expect(btn).toHaveAttribute('type', IconButtonVariant.outlined);
    expect(btn).toHaveAttribute('variant', IconButtonColorVariant.Secondary);
  });
});
