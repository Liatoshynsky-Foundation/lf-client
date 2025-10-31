import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import ArrowCarousel from './ArrowCarousel';

jest.mock('next/image');

jest.mock('~/ds-components/icon-button/IconButton', () => ({
  IconButton: ({
    children,
    onClick,
    disabled,
    'aria-label': ariaLabel,
    ...props
  }: {
    children: React.ReactNode;
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    'aria-label'?: string;
  }) => (
    <button onClick={onClick} disabled={disabled} aria-label={ariaLabel} {...props}>
      {children}
    </button>
  )
}));

describe('ArrowCarousel', () => {
  const mockOnClick = jest.fn();

  beforeEach(() => {
    mockOnClick.mockClear();
  });

  it('should render left arrow correctly', () => {
    render(<ArrowCarousel direction="left" onClick={mockOnClick} />);

    const button = screen.getByRole('button', { name: 'Previous slide' });
    const image = screen.getByAltText('Previous');

    expect(button).toBeInTheDocument();
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/icons/chevron-left.svg');
  });

  it('should render right arrow correctly', () => {
    render(<ArrowCarousel direction="right" onClick={mockOnClick} />);

    const button = screen.getByRole('button', { name: 'Next slide' });
    const image = screen.getByAltText('Next');

    expect(button).toBeInTheDocument();
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/icons/chevron-right.svg');
  });

  it('should call onClick when button is clicked', () => {
    render(<ArrowCarousel direction="left" onClick={mockOnClick} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('should render disabled state correctly', () => {
    render(<ArrowCarousel direction="left" onClick={mockOnClick} disabled={true} />);

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });
});
