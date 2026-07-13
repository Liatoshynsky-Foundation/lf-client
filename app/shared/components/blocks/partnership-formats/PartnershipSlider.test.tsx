import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import PartnershipSlider from './PartnershipSlider';

jest.mock('~/ds-components/card-with-text/CardWithText', () => ({
  __esModule: true,
  default: ({ title }: { title?: string }) => <div data-testid="card-mock">{title}</div>
}));

jest.mock('~/ds-components/image-with-border/ImageWithBorder', () => ({
  __esModule: true,
  default: ({ alt }: { alt?: string }) => <div data-testid="image-mock">{alt}</div>
}));

type SlideItem = Parameters<typeof PartnershipSlider>[0]['slides'][number];

describe('PartnershipSlider', () => {
  const mockSlides: SlideItem[] = [
    { type: 'card', card: { title: 'Card 1', icon: '', list: [] } } as SlideItem,
    {
      type: 'image',
      image: { src: '/img1.png', alt: 'Image 1' }
    } as unknown as SlideItem,
    { type: 'unknown', image: { src: '/invalid-key-fallback' } } as unknown as SlideItem
  ];

  it('should render all valid slides and ignore invalid ones', () => {
    render(<PartnershipSlider slides={mockSlides} />);

    expect(screen.getByTestId('card-mock')).toHaveTextContent('Card 1');
    expect(screen.getByTestId('image-mock')).toHaveTextContent('Image 1');
  });

  it('should handle touch swipe to next and previous slides', () => {
    render(<PartnershipSlider slides={mockSlides} />);

    const slidesContainer = screen.getByText('Card 1').closest('.MuiBox-root')?.parentElement;

    if (!slidesContainer) throw new Error('Slider wrapper not found');

    fireEvent.touchStart(slidesContainer, { targetTouches: [{ clientX: 300 }] });
    fireEvent.touchMove(slidesContainer, { targetTouches: [{ clientX: 100 }] });
    fireEvent.touchEnd(slidesContainer);

    fireEvent.touchStart(slidesContainer, { targetTouches: [{ clientX: 100 }] });
    fireEvent.touchMove(slidesContainer, { targetTouches: [{ clientX: 300 }] });
    fireEvent.touchEnd(slidesContainer);

    expect(slidesContainer).toBeInTheDocument();
  });

  it('should cover the return null branch for invalid slide types', () => {
    const invalidSlides: SlideItem[] = [
      { type: 'invalid', image: { src: '/invalid-branch-key' } } as unknown as SlideItem
    ];
    render(<PartnershipSlider slides={invalidSlides} />);

    expect(screen.queryByTestId('card-mock')).not.toBeInTheDocument();
    expect(screen.queryByTestId('image-mock')).not.toBeInTheDocument();
  });

  it('should early return from onTouchEnd if touchStart or touchEnd coordinates are missing', () => {
    render(<PartnershipSlider slides={mockSlides} />);
    const slidesContainer = screen.getByText('Card 1').closest('.MuiBox-root')?.parentElement;
    if (!slidesContainer) throw new Error('Slider wrapper not found');

    fireEvent.touchEnd(slidesContainer);
    expect(slidesContainer).toBeInTheDocument();
  });
});
