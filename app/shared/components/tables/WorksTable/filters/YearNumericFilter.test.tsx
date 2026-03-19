import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { YearNumericFilter } from './YearNumericFilter';

jest.mock('~/ds-components/dropdown-menu/DropdownMenu', () => ({
  __esModule: true,
  default: ({ open, menuList, onClose }: any) =>
    open ? (
      <div data-testid="dropdown-menu">
        <button onClick={onClose}>Close Menu</button>
        <div data-testid="menu-content">{menuList}</div>
      </div>
    ) : null
}));

jest.mock('~/ds-components/filtering/numeric/NumericFiltering', () => ({
  __esModule: true,
  default: ({ onChange, onChangeCommitted, value, minNumber, maxNumber }: any) => (
    <div data-testid="numeric-filtering">
      <button onClick={() => onChange([2000, 2020])}>Trigger Change</button>
      <button onClick={() => onChangeCommitted([2000, 2020])}>Trigger Commit</button>
      <span data-testid="current-values">{value.join('-')}</span>
      <span data-testid="min-max">
        {minNumber}-{maxNumber}
      </span>
    </div>
  )
}));

describe('YearNumericFilter', () => {
  const mockOnChange = jest.fn();
  const mockOnChangeCommitted = jest.fn();

  const defaultProps = {
    label: 'Select Year',
    value: [1900, 2024] as [number, number],
    onChange: mockOnChange,
    onChangeCommitted: mockOnChangeCommitted,
    minYear: 1800,
    maxYear: 2026
  };

  beforeEach(() => {
    jest.clearAllMocks();

    jest.spyOn(window, 'requestAnimationFrame').mockImplementation((cb: FrameRequestCallback) => {
      cb(0);
      return 0;
    });

    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
      configurable: true,
      value: 250
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render the filter button and label correctly', () => {
    render(<YearNumericFilter {...defaultProps} />);

    expect(screen.getByText('Select Year')).toBeInTheDocument();
    expect(screen.getByAltText('dropdown')).toBeInTheDocument();
  });

  it('should open and close the menu on click (handleToggleMenu)', () => {
    render(<YearNumericFilter {...defaultProps} />);
    const button = screen.getByRole('button', { name: /Select Year/i });

    fireEvent.click(button);
    expect(screen.getByTestId('dropdown-menu')).toBeInTheDocument();
    expect(button).toHaveAttribute('aria-expanded', 'true');

    fireEvent.click(button);
    expect(screen.queryByTestId('dropdown-menu')).not.toBeInTheDocument();
    expect(button).toHaveAttribute('aria-expanded', 'false');
  });

  it('should close menu and restore focus (handleCloseMenu)', () => {
    render(<YearNumericFilter {...defaultProps} />);
    const button = screen.getByRole('button', { name: /Select Year/i });

    button.focus();
    fireEvent.click(button);

    const closeBtn = screen.getByText('Close Menu');
    fireEvent.click(closeBtn);

    expect(screen.queryByTestId('dropdown-menu')).not.toBeInTheDocument();

    expect(button).toHaveFocus();
  });

  it('should pass correct props to NumericFiltering and handle changes', () => {
    render(<YearNumericFilter {...defaultProps} />);
    fireEvent.click(screen.getByRole('button', { name: /Select Year/i }));

    expect(screen.getByTestId('current-values')).toHaveTextContent('1900-2024');
    expect(screen.getByTestId('min-max')).toHaveTextContent('1800-2026');

    fireEvent.click(screen.getByText('Trigger Change'));
    expect(mockOnChange).toHaveBeenCalledWith([2000, 2020]);

    fireEvent.click(screen.getByText('Trigger Commit'));
    expect(mockOnChangeCommitted).toHaveBeenCalledWith([2000, 2020]);
  });

  it('should update numericFilterElement when dependencies change (useMemo coverage)', () => {
    const { rerender } = render(<YearNumericFilter {...defaultProps} />);
    fireEvent.click(screen.getByRole('button', { name: /Select Year/i }));

    expect(screen.getByTestId('current-values')).toHaveTextContent('1900-2024');

    rerender(<YearNumericFilter {...defaultProps} value={[2010, 2015]} minYear={2000} />);

    expect(screen.getByTestId('current-values')).toHaveTextContent('2010-2015');
    expect(screen.getByTestId('min-max')).toHaveTextContent('2000-2026');
  });
});
