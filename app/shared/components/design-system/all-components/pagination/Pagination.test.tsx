import { PaginationRenderItemParams } from '@mui/material';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import Pagination from './Pagination';

describe('Pagination', () => {
  const defaultProps = {
    page: 1,
    count: 5,
    visiblePages: 3,
    onChange: jest.fn()
  };

  const renderPagination = (props = {}) => render(<Pagination {...defaultProps} {...props} />);

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it('should render page buttons based on count', () => {
    renderPagination();

    expect(screen.getByRole('button', { name: /page 1/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /page 2/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /page 3/i })).toBeInTheDocument();
  });

  it('should call onChange when a page button is clicked', () => {
    renderPagination();

    fireEvent.click(screen.getByRole('button', { name: /page 3/i }));
    expect(defaultProps.onChange).toHaveBeenCalledWith(expect.anything(), 3);
  });

  it('should mark the current page as selected', () => {
    renderPagination({ page: 2 });

    expect(screen.getByRole('button', { name: /page 2/i })).toHaveAttribute('aria-current', 'page');
  });

  it('should not mark non-page items as selected', () => {
    renderPagination();

    const nextButton = screen.getByLabelText('Go to next page');
    const prevButton = screen.getByLabelText('Go to previous page');

    expect(nextButton).not.toHaveAttribute('aria-current', 'true');
    expect(prevButton).not.toHaveAttribute('aria-current', 'true');
  });

  it('should render using custom renderItem when provided', () => {
    const customRenderItem = jest.fn((item: PaginationRenderItemParams) => {
      return <div data-testid={`custom-${item.type}-${item.page ?? 'nav'}`}>Custom</div>;
    });

    renderPagination({ renderItem: customRenderItem });

    expect(customRenderItem).toHaveBeenCalled();
    expect(screen.getByTestId('custom-page-1')).toBeInTheDocument();
  });
});
