import { render, screen } from '@testing-library/react';
import React from 'react';

import { ContentSlider } from './ContentSlider';

interface MockBaseSliderProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  getItemKey: (item: T) => string;
  prevLabel: string;
  nextLabel: string;
  onSwiper?: (swiper: unknown) => void;
  onSlideFocus?: (index: number) => void;
}

interface MockBaseCardProps {
  title: string;
  variant: string;
  dataTestId?: string;
}

interface MockSwiperInstance {
  slideTo: jest.Mock;
}

jest.mock('~/shared/components/base-slider', () => ({
  __esModule: true,
  BaseSlider: <T,>({
    items,
    renderItem,
    getItemKey,
    prevLabel,
    nextLabel,
    onSwiper,
    onSlideFocus
  }: MockBaseSliderProps<T>) => {
    React.useEffect(() => {
      const mockSwiperInstance: MockSwiperInstance = {
        slideTo: jest.fn()
      };
      if (onSwiper) {
        onSwiper(mockSwiperInstance);
      }
      if (onSlideFocus) {
        onSlideFocus(1);
      }
    }, [onSwiper, onSlideFocus]);

    return (
      <div data-testid="swiper">
        <button>{prevLabel}</button>
        <button>{nextLabel}</button>
        {items.map((item) => (
          <div key={getItemKey(item)} data-testid="swiper-slide">
            {renderItem(item)}
          </div>
        ))}
      </div>
    );
  }
}));

jest.mock('~/ds-components/base-card/BaseCard', () => {
  return function MockBaseCard({ title, variant, dataTestId }: MockBaseCardProps) {
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
    alt: 'News Title 1',
    title: 'News Title 1',
    publicationDate: '15.01.25',
    description: 'Description 1',
    href: '/news/news-1',
    dataTestId: 'news-card-1'
  },
  {
    image: '/news2.jpg',
    alt: 'News Title 2',
    title: 'News Title 2',
    publicationDate: '16.01.25',
    description: 'Description 2',
    href: '/news/news-2',
    dataTestId: 'news-card-2'
  },
  {
    image: '/news3.jpg',
    alt: 'News Title 3',
    title: 'News Title 3',
    publicationDate: '17.01.25',
    description: 'Description 3',
    href: '/news/news-3',
    dataTestId: 'news-card-3'
  }
];

const labelProps = { prevLabel: 'Previous news item', nextLabel: 'Next news item' };

describe('ContentSlider Component', () => {
  it('should render slider component', () => {
    render(<ContentSlider cards={mockCards} {...labelProps} />);

    expect(screen.getByTestId('swiper')).toBeInTheDocument();
  });

  it('should render navigation buttons', () => {
    render(<ContentSlider cards={mockCards} {...labelProps} />);

    expect(screen.getByRole('button', { name: 'Previous news item' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Next news item' })).toBeInTheDocument();
  });

  it('should render all cards', () => {
    render(<ContentSlider cards={mockCards} {...labelProps} />);

    expect(screen.getByText('News Title 1 - news')).toBeInTheDocument();
    expect(screen.getByText('News Title 2 - news')).toBeInTheDocument();
    expect(screen.getByText('News Title 3 - news')).toBeInTheDocument();
  });

  it('should render correct number of slides', () => {
    render(<ContentSlider cards={mockCards} {...labelProps} />);

    const slides = screen.getAllByTestId('swiper-slide');
    expect(slides).toHaveLength(3);
  });

  it('should use default variant "news" when not specified', () => {
    render(<ContentSlider cards={[mockCards[0]]} {...labelProps} />);

    expect(screen.getByText('News Title 1 - news')).toBeInTheDocument();
  });

  it('should use custom variant when provided', () => {
    render(<ContentSlider cards={[mockCards[0]]} variant="press" {...labelProps} />);

    expect(screen.getByText('News Title 1 - press')).toBeInTheDocument();
  });

  it('should pass correct props to BaseCard', () => {
    render(<ContentSlider cards={mockCards} {...labelProps} />);

    expect(screen.getByTestId('news-card-1')).toBeInTheDocument();
    expect(screen.getByTestId('news-card-2')).toBeInTheDocument();
    expect(screen.getByTestId('news-card-3')).toBeInTheDocument();
  });

  it('should render empty slider when no cards provided', () => {
    render(<ContentSlider cards={[]} {...labelProps} />);

    expect(screen.getByTestId('swiper')).toBeInTheDocument();
    expect(screen.queryAllByTestId('swiper-slide')).toHaveLength(0);
  });
});
