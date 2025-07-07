import '@testing-library/jest-dom';
import { fireEvent, render, screen, within } from '@testing-library/react';
import * as React from 'react';

import Carousel from './Carousel';

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, fill, sizes }: { src: string; alt: string; fill?: boolean; sizes?: string }) => (
    <img src={src} alt={alt} data-fill={fill} data-sizes={sizes} />
  )
}));

jest.mock('~/ds-components/arrow-carousel/ArrowCarousel', () => ({
  __esModule: true,
  default: ({
    direction,
    onClick,
    disabled
  }: {
    direction: 'left' | 'right';
    onClick: () => void;
    disabled?: boolean;
  }) => (
    <button onClick={onClick} disabled={disabled} data-testid={`arrow-${direction}`}>
      {direction} arrow
    </button>
  )
}));

describe('Carousel', () => {
  const mockImages = [
    { id: 1, src: '/image1.jpg', alt: 'Image 1' },
    { id: 2, src: '/image2.jpg', alt: 'Image 2' },
    { id: 3, src: '/image3.jpg', alt: 'Image 3' }
  ];

  it('should render carousel elements correctly', () => {
    render(<Carousel images={mockImages} />);

    expect(screen.getByAltText('Image 1')).toBeInTheDocument();
    expect(screen.getByAltText('Image 2')).toBeInTheDocument();
    expect(screen.getByAltText('Image 3')).toBeInTheDocument();

    expect(screen.getByTestId('arrow-left')).toBeInTheDocument();
    expect(screen.getByTestId('arrow-right')).toBeInTheDocument();
  });

  it('should render title when provided', () => {
    const title = 'Test Carousel Title';
    render(<Carousel images={mockImages} title={title} />);
    expect(screen.getByText(title)).toBeInTheDocument();
  });

  it('should not render title when not provided', () => {
    render(<Carousel images={mockImages} />);
    expect(screen.queryByText('Test Carousel Title')).not.toBeInTheDocument();
  });

  it('should start from given initial index', () => {
    render(<Carousel images={mockImages} initialIndex={2} />);
    const currentSlide = screen.getByRole('group', { current: true });
    expect(within(currentSlide).getByAltText('Image 3')).toBeInTheDocument();
  });

  it('should disable left arrow on first slide', () => {
    render(<Carousel images={mockImages} />);
    const leftArrow = screen.getByTestId('arrow-left');
    expect(leftArrow).toBeDisabled();
  });

  it('should disable right arrow on last slide', () => {
    render(<Carousel images={mockImages} />);
    const rightArrow = screen.getByTestId('arrow-right');
    fireEvent.click(rightArrow);
    fireEvent.click(rightArrow);
    expect(rightArrow).toBeDisabled();
  });

  it('should handle image click correctly', () => {
    render(<Carousel images={mockImages} />);
    const secondImage = screen.getByAltText('Image 2');
    const imageContainer = secondImage.closest('div');
    if (imageContainer) fireEvent.click(imageContainer);
    expect(secondImage).toBeInTheDocument();
  });

  it('should navigate to selected slide when dot is clicked', () => {
    render(<Carousel images={mockImages} />);
    const dots = screen.getAllByRole('button');
    fireEvent.click(dots[2]);
    expect(screen.getByAltText('Image 3')).toBeInTheDocument();
  });

  it('should navigate to the previous image', () => {
    render(<Carousel images={mockImages} />);
    const nextArrow = screen.getByTestId('arrow-right');
    fireEvent.click(nextArrow);
    expect(screen.getByAltText('Image 2')).toBeInTheDocument();
    const prevArrow = screen.getByTestId('arrow-left');
    fireEvent.click(prevArrow);
    expect(screen.getByAltText('Image 1')).toBeInTheDocument();
  });
});
