import { render, screen } from '@testing-library/react';
import React from 'react';

import WarCarouselSection from './WarCarouselSection';

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => 'uk'
}));

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

  it('should render default images with correct props when no data is provided', () => {
    render(<WarCarouselSection />);

    const carousel = screen.getByTestId('mock-carousel');

    expect(carousel).toHaveAttribute('data-images-count', '3');
    expect(carousel).toHaveAttribute('data-infinite', 'true');
  });

  it('should render default images with correct alt text', () => {
    render(<WarCarouselSection />);

    expect(screen.getByAltText('Carousel Image 1')).toBeInTheDocument();
    expect(screen.getByAltText('Carousel Image 2')).toBeInTheDocument();
    expect(screen.getByAltText('Carousel Image 3')).toBeInTheDocument();
  });

  it('should have correct default image sources', () => {
    render(<WarCarouselSection />);

    const img1 = screen.getByAltText('Carousel Image 1');
    expect(img1).toHaveAttribute('src', '/photos/war-in-ukraine-carousel-1.png');
  });

  it('should fall back to default images when data.images is an empty array', () => {
    render(<WarCarouselSection data={{ images: [] }} />);

    expect(screen.getByTestId('mock-carousel')).toHaveAttribute('data-images-count', '3');
  });

  it('should render provided images with localized alt/caption objects and a crop rect', () => {
    const data = {
      images: [
        {
          id: 'custom-1',
          src: '/img1.png',
          alt: { uk: 'Custom Image 1', en: 'Custom Image 1' },
          caption: { uk: 'Custom Caption 1', en: 'Custom Caption 1' },
          crop: { rect: { x: 0, y: 0, width: 10, height: 10 } }
        }
      ]
    };

    render(<WarCarouselSection data={data} />);

    const carousel = screen.getByTestId('mock-carousel');
    expect(carousel).toHaveAttribute('data-images-count', '1');
    expect(screen.getByAltText('Custom Image 1')).toBeInTheDocument();
  });

  it('should render provided images with plain string alt/caption and no id or crop', () => {
    const data = {
      images: [
        {
          src: '/img2.png',
          alt: 'Plain alt text'
        }
      ]
    };

    render(<WarCarouselSection data={data} />);

    expect(screen.getByAltText('Plain alt text')).toBeInTheDocument();
  });
});
