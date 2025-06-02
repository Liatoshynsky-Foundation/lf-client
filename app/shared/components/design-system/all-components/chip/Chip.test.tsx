import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Chip } from './Chip';

describe('Chip component', () => {
  it('should render without crashing', () => {
    render(<Chip label="Test Chip" />);
    expect(screen.getByText('Test Chip')).toBeInTheDocument();
  });

  it('should call onDelete when delete icon is clicked', () => {
    const handleDelete = jest.fn();
    render(<Chip label="Deletable Chip" onDelete={handleDelete} />);

    const deleteIcon = screen.getByTestId('delete-icon');
    fireEvent.click(deleteIcon);

    expect(handleDelete).toHaveBeenCalledTimes(1);
  });

  it('should not call onDelete when chip is disabled', () => {
    const handleDelete = jest.fn();
    render(<Chip label="Disabled Chip" onDelete={handleDelete} disabled />);

    const deleteIcon = screen.queryByTestId('delete-icon');
    if (deleteIcon) fireEvent.click(deleteIcon);

    expect(handleDelete).not.toHaveBeenCalled();
  });

  it('should render with outlined variant', () => {
    render(<Chip label="Outlined Chip" variant="outlined" />);
    const chip = screen.getByText('Outlined Chip');
    expect(chip).toBeInTheDocument();
  });

  it('should render with default filled variant', () => {
    render(<Chip label="Filled Chip" />);
    expect(screen.getByText('Filled Chip')).toBeInTheDocument();
  });
});
