import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import ArrowCarousel from './ArrowCarousel';

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

jest.mock('~/public/icons/chevron-left.svg', () => ({
  __esModule: true,
  default: () => <svg data-testid="mock-left-svg" />
}));

jest.mock('~/public/icons/chevron-right.svg', () => ({
  __esModule: true,
  default: () => <svg data-testid="mock-right-svg" />
}));

describe('ArrowCarousel', () => {
  const mockOnClick = jest.fn();

  beforeEach(() => {
    mockOnClick.mockClear();
  });

  it('should render left arrow correctly', () => {
    render(<ArrowCarousel direction="left" onClick={mockOnClick} />);

    const button = screen.getByRole('button', { name: 'Previous slide' });
    const svgWrapper = screen.getByLabelText('Previous');

    expect(button).toBeInTheDocument();
    expect(svgWrapper).toBeInTheDocument();

    expect(svgWrapper.querySelector('svg')).toBeInTheDocument();
  });

  it('should render right arrow correctly', () => {
    render(<ArrowCarousel direction="right" onClick={mockOnClick} />);

    const button = screen.getByRole('button', { name: 'Next slide' });
    const svgWrapper = screen.getByLabelText('Next');

    expect(button).toBeInTheDocument();
    expect(svgWrapper).toBeInTheDocument();
    expect(svgWrapper.querySelector('svg')).toBeInTheDocument();
  });

  it('should call onClick when button is clicked', () => {
    render(<ArrowCarousel direction="left" onClick={mockOnClick} />);

    const button = screen.getByRole('button', { name: 'Previous slide' });
    fireEvent.click(button);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('should render disabled state correctly', () => {
    render(<ArrowCarousel direction="left" onClick={mockOnClick} disabled={true} />);

    const button = screen.getByRole('button', { name: 'Previous slide' });

    expect(button).toBeDisabled();
  });
});
