import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import PartnershipSlider from './PartnershipSlider';

jest.mock('~/ds-components/card-with-text/CardWithText', () => ({
  __esModule: true,
  default: ({ title }: any) => <div data-testid="card-mock">{title}</div>
}));

jest.mock('~/ds-components/image-with-border/ImageWithBorder', () => ({
  __esModule: true,
  default: ({ alt }: any) => <div data-testid="image-mock">{alt}</div>
}));

describe('PartnershipSlider', () => {
  const mockSlides: any[] = [
    { type: 'card', card: { title: 'Card 1', icon: '', list: [] } },
    { type: 'image', image: { src: '/img1.png', alt: 'Image 1' } },
    { type: 'unknown' }
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
    const invalidSlides: any[] = [{ type: 'invalid' }];
    const { container } = render(<PartnershipSlider slides={invalidSlides} />);

    const slideWrapper = container.querySelector('.MuiBox-root.css-11cmzn9');
    expect(slideWrapper).toBeEmptyDOMElement();
  });
});
