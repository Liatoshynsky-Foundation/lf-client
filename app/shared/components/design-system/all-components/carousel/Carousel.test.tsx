import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import * as React from 'react';

import Carousel from './Carousel';

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, onError, ...props }: React.ComponentProps<'img'>) => (
    <img src={src} alt={alt} onError={onError} {...props} />
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
    { id: 1, src: '/image1.jpg', alt: 'Image 1', description: 'Test Carousel Title' },
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
    render(<Carousel images={mockImages} />);
    expect(screen.getByTestId('carousel-caption')).toHaveTextContent(title);
  });

  it('should not render title when not provided', () => {
    render(<Carousel images={mockImages} initialIndex={2} />);
    expect(screen.queryByText('Test Carousel Title')).not.toBeInTheDocument();
  });

  it('should start from given initial index', () => {
    render(<Carousel images={mockImages} initialIndex={2} />);
    const activeSlide = screen.getByTestId('carousel-image-2');
    expect(activeSlide).toHaveAttribute('data-active', 'true');
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
    const thirdDot = screen.getByTestId('carousel-dot-2');
    fireEvent.click(thirdDot);
    const thirdSlide = screen.getByTestId('carousel-image-2');
    expect(thirdSlide).toHaveAttribute('data-active', 'true');
    expect(thirdDot).toHaveAttribute('data-active', 'true');
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

  it('should navigate to the next image with swipe', () => {
    render(<Carousel images={mockImages} />);
    const firstImage = screen.getByTestId('carousel-image-0');
    fireEvent.touchStart(firstImage, { targetTouches: [{ clientX: 300, clientY: 0 }] });
    fireEvent.touchMove(firstImage, { targetTouches: [{ clientX: 100, clientY: 0 }] });
    fireEvent.touchEnd(firstImage);
    expect(screen.getByTestId('carousel-image-1')).toHaveAttribute('data-active', 'true');
  });

  it('should not navigate to the next image with small swipe', () => {
    render(<Carousel images={mockImages} />);
    const firstImage = screen.getByTestId('carousel-image-0');
    fireEvent.touchStart(firstImage, { targetTouches: [{ clientX: 300, clientY: 0 }] });
    fireEvent.touchMove(firstImage, { targetTouches: [{ clientX: 280, clientY: 0 }] });
    fireEvent.touchEnd(firstImage);
    expect(screen.getByTestId('carousel-image-1')).toHaveAttribute('data-active', 'false');
  });

  it('should be no infinite loop when it is not enabled', () => {
    render(<Carousel images={mockImages} />);
    const firstImage = screen.getByTestId('carousel-image-0');
    fireEvent.touchStart(firstImage, { targetTouches: [{ clientX: 200, clientY: 0 }] });
    fireEvent.touchMove(firstImage, { targetTouches: [{ clientX: 300, clientY: 0 }] });
    fireEvent.touchEnd(firstImage);
    expect(firstImage).toHaveAttribute('data-active', 'true');
  });

  it('should be infinite loop when it is enabled', () => {
    render(<Carousel images={mockImages} infiniteLoop />);
    const firstImage = screen.getByTestId('carousel-image-0');
    fireEvent.touchStart(firstImage, { targetTouches: [{ clientX: 200, clientY: 0 }] });
    fireEvent.touchMove(firstImage, { targetTouches: [{ clientX: 300, clientY: 0 }] });
    fireEvent.touchEnd(firstImage);
    expect(screen.getByTestId('carousel-image-2')).toHaveAttribute('data-active', 'true');
  });

  it('should navigate to the next image with right arrow key', () => {
    render(<Carousel images={mockImages} />);
    const carousel = screen.getByTestId('carousel');
    fireEvent.keyDown(carousel, { key: 'ArrowRight' });
    expect(screen.getByTestId('carousel-image-1')).toHaveAttribute('data-active', 'true');
  });

  it('should navigate to the previous image with left arrow key', () => {
    render(<Carousel images={mockImages} initialIndex={1} />);
    const carousel = screen.getByTestId('carousel');
    fireEvent.keyDown(carousel, { key: 'ArrowLeft' });
    expect(screen.getByTestId('carousel-image-0')).toHaveAttribute('data-active', 'true');
  });

  it('should remove image slide when image load fails (onError triggered)', () => {
    render(<Carousel images={mockImages} />);

    const firstImage = screen.getByAltText('Image 1');
    fireEvent.error(firstImage);

    expect(screen.queryByAltText('Image 1')).not.toBeInTheDocument();
    expect(screen.getByAltText('Image 2')).toBeInTheDocument();
  });

  it('should adjust activeIndex when the active last slide fails', () => {
    render(<Carousel images={mockImages} initialIndex={2} />);

    const lastImage = screen.getByAltText('Image 3');
    expect(screen.getByTestId('carousel-image-2')).toHaveAttribute('data-active', 'true');

    fireEvent.error(lastImage);

    expect(screen.queryByAltText('Image 3')).not.toBeInTheDocument();
    const newActiveSlide = screen.getByTestId('carousel-image-1');
    expect(newActiveSlide).toHaveAttribute('data-active', 'true');
  });
});
