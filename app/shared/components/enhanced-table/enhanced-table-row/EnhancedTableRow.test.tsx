import { Table, TableBody } from '@mui/material';
import { createEvent, fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import EnhancedTableRow from './EnhancedTableRow';
import { enhancedTableRowStyles as styles } from './EnhancedTableRow.styles';

jest.mock('@tanstack/react-table', () => ({
  ...jest.requireActual('@tanstack/react-table'),
  flexRender: jest.fn((cell) => cell)
}));

describe('EnhancedTableRow', () => {
  const mockRow = {
    id: '1',
    original: { id: '1', name: 'Test Row' },
    getVisibleCells: jest.fn(() => [
      {
        id: 'cell-1',
        column: { id: 'name', columnDef: { cell: 'Test Cell Content' } },
        getContext: () => ({})
      }
    ])
  } as any;

  const mockOnClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderInTable = (ui: React.ReactElement) => {
    return render(
      <Table>
        <TableBody>{ui}</TableBody>
      </Table>
    );
  };

  it('should render cells correctly and access styles (covers styles file)', () => {
    renderInTable(<EnhancedTableRow row={mockRow} />);

    const cell = screen.getByTestId('EnhancedTableRow-mainNoOpus-name');
    expect(cell).toBeInTheDocument();
    expect(screen.getByText('Test Cell Content')).toBeInTheDocument();

    expect(styles.cell).toBeDefined();
  });

  it('should call onClick when row is clicked', () => {
    renderInTable(<EnhancedTableRow row={mockRow} onClick={mockOnClick} />);

    const row = screen.getByTestId('EnhancedTableRow-mainNoOpus');
    fireEvent.click(row);

    expect(mockOnClick).toHaveBeenCalledWith(mockRow.original);
  });

  it('should handle early return in handleRowClick when onClick is missing', () => {
    renderInTable(<EnhancedTableRow row={mockRow} />);
    const row = screen.getByTestId('EnhancedTableRow-mainNoOpus');

    fireEvent.click(row);
    expect(mockOnClick).not.toHaveBeenCalled();
  });

  it('should not call onClick if click target is a button or link', () => {
    renderInTable(<EnhancedTableRow row={mockRow} onClick={mockOnClick} />);

    const row = screen.getByTestId('EnhancedTableRow-mainNoOpus');

    const button = document.createElement('button');
    row.appendChild(button);

    fireEvent.click(button);
    expect(mockOnClick).not.toHaveBeenCalled();

    const link = document.createElement('a');
    row.appendChild(link);

    fireEvent.click(link);
    expect(mockOnClick).not.toHaveBeenCalled();
  });

  it('should handle keyboard events (Enter and Space)', () => {
    renderInTable(<EnhancedTableRow row={mockRow} onClick={mockOnClick} />);
    const row = screen.getByTestId('EnhancedTableRow-mainNoOpus');

    fireEvent.keyDown(row, { key: 'Enter' });
    expect(mockOnClick).toHaveBeenCalledTimes(1);

    fireEvent.keyDown(row, { key: ' ' });
    expect(mockOnClick).toHaveBeenCalledTimes(2);

    fireEvent.keyDown(row, { key: 'Tab' });
    expect(mockOnClick).toHaveBeenCalledTimes(2);
  });

  it('should prevent default behavior for Space and Enter keys (covers preventDefault line)', () => {
    renderInTable(<EnhancedTableRow row={mockRow} onClick={mockOnClick} />);
    const row = screen.getByTestId('EnhancedTableRow-mainNoOpus');

    const keyDownEvent = createEvent.keyDown(row, { key: 'Enter' });

    Object.defineProperty(keyDownEvent, 'preventDefault', { value: jest.fn() });

    fireEvent(row, keyDownEvent);

    expect(keyDownEvent.preventDefault).toHaveBeenCalled();
  });

  it('should set correct interactive attributes based on onClick prop', () => {
    const { rerender } = renderInTable(<EnhancedTableRow row={mockRow} />);
    let row = screen.getByTestId('EnhancedTableRow-mainNoOpus');

    expect(row).not.toHaveAttribute('tabIndex');

    rerender(
      <Table>
        <TableBody>
          <EnhancedTableRow row={mockRow} onClick={mockOnClick} />
        </TableBody>
      </Table>
    );

    row = screen.getByTestId('EnhancedTableRow-mainNoOpus');
    expect(row).toHaveAttribute('tabIndex', '0');
  });
});
