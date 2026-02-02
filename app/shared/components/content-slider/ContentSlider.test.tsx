import { render, screen } from '@testing-library/react';
import React from 'react';

// Mock CSS imports
jest.mock('swiper/css', () => ({}));
jest.mock('swiper/css/navigation', () => ({}));

import { ContentSlider } from './ContentSlider';

// Mock Swiper components
jest.mock('swiper/react', () => ({
  Swiper: ({ children }: any) => <div data-testid="swiper">{children}</div>,
  SwiperSlide: ({ children }: any) => <div data-testid="swiper-slide">{children}</div>
}));

jest.mock('swiper/modules', () => ({
  Navigation: {}
}));

jest.mock('~/ds-components/base-card/BaseCard', () => {
  return function MockBaseCard({ title, variant, dataTestId }: any) {
    return (
      <div data-testid={dataTestId || 'base-card'}>
        {title} - {variant}
      </div>
    );
  };
});

jest.mock('~/shared/components/svg-image/SvgImage', () => ({
  SvgImage: ({ alt }: { alt: string }) => <img alt={alt} />
}));

const mockCards = [
  {
    image: '/news1.jpg',
    title: 'News Title 1',
    publicationDate: '15.01.25',
    description: 'Description 1',
    href: '/news/news-1',
    dataTestId: 'news-card-1'
  },
  {
    image: '/news2.jpg',
    title: 'News Title 2',
    publicationDate: '16.01.25',
    description: 'Description 2',
    href: '/news/news-2',
    dataTestId: 'news-card-2'
  },
  {
    image: '/news3.jpg',
    title: 'News Title 3',
    publicationDate: '17.01.25',
    description: 'Description 3',
    href: '/news/news-3',
    dataTestId: 'news-card-3'
  }
];

describe('ContentSlider Component', () => {
  it('should render slider component', () => {
    render(<ContentSlider cards={mockCards} />);

    expect(screen.getByTestId('swiper')).toBeInTheDocument();
  });

  it('should render navigation buttons', () => {
    render(<ContentSlider cards={mockCards} />);

    expect(screen.getByAltText('Previous')).toBeInTheDocument();
    expect(screen.getByAltText('Next')).toBeInTheDocument();
  });

  it('should render all cards', () => {
    render(<ContentSlider cards={mockCards} />);

    expect(screen.getByText('News Title 1 - news')).toBeInTheDocument();
    expect(screen.getByText('News Title 2 - news')).toBeInTheDocument();
    expect(screen.getByText('News Title 3 - news')).toBeInTheDocument();
  });

  it('should render correct number of slides', () => {
    render(<ContentSlider cards={mockCards} />);

    const slides = screen.getAllByTestId('swiper-slide');
    expect(slides).toHaveLength(3);
  });

  it('should use default variant "news" when not specified', () => {
    render(<ContentSlider cards={[mockCards[0]]} />);

    expect(screen.getByText('News Title 1 - news')).toBeInTheDocument();
  });

  it('should use custom variant when provided', () => {
    render(<ContentSlider cards={[mockCards[0]]} variant="press" />);

    expect(screen.getByText('News Title 1 - press')).toBeInTheDocument();
  });

  it('should pass correct props to BaseCard', () => {
    render(<ContentSlider cards={mockCards} />);

    expect(screen.getByTestId('news-card-1')).toBeInTheDocument();
    expect(screen.getByTestId('news-card-2')).toBeInTheDocument();
    expect(screen.getByTestId('news-card-3')).toBeInTheDocument();
  });

  it('should render empty slider when no cards provided', () => {
    render(<ContentSlider cards={[]} />);

    expect(screen.getByTestId('swiper')).toBeInTheDocument();
    expect(screen.queryAllByTestId('swiper-slide')).toHaveLength(0);
  });
});
