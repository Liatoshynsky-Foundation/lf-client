import { render, screen } from '@testing-library/react';
import React from 'react';

import WarCarouselSection from './WarCarouselSection';

jest.mock('~/shared/components/design-system/all-components/carousel/Carousel', () => ({
  __esModule: true,
  default: ({ images, infiniteLoop }: any) => (
    <div data-testid="mock-carousel" data-images-count={images.length} data-infinite={infiniteLoop}>
      {images.map((img: any) => (
        <img key={img.id} src={img.src} alt={img.alt} />
      ))}
    </div>
  )
}));

describe('WarCarouselSection', () => {
  it('should render the section container', () => {
    const { container } = render(<WarCarouselSection />);

    expect(container.firstChild).toBeInTheDocument();
  });

  it('should render Carousel with correct internal images and props', () => {
    render(<WarCarouselSection />);

    const carousel = screen.getByTestId('mock-carousel');

    expect(carousel).toHaveAttribute('data-images-count', '3');

    expect(carousel).toHaveAttribute('data-infinite', 'true');
  });

  it('should render all images with correct alt text', () => {
    render(<WarCarouselSection />);

    expect(screen.getByAltText('Carousel Image 1')).toBeInTheDocument();
    expect(screen.getByAltText('Carousel Image 2')).toBeInTheDocument();
    expect(screen.getByAltText('Carousel Image 3')).toBeInTheDocument();
  });

  it('should have correct image sources', () => {
    render(<WarCarouselSection />);

    const img1 = screen.getByAltText('Carousel Image 1');
    expect(img1).toHaveAttribute('src', '/images/war-in-ukraine-page/carousel/photo-1.png');
  });
});
