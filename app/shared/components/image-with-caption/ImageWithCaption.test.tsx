import { render, screen } from '@testing-library/react';

import ImageWithCaption from '~/components/image-with-caption/ImageWithCaption';

import { ElementSizes } from '~/types/types/common.types';

const sizes: ElementSizes = {
  width: { xs: 300, sm: 600, md: 900 },
  height: { xs: 200, sm: 400, md: 600 }
};

jest.mock('next/image');

describe('ImageWithCaption', () => {
  it('should render image with caption', () => {
    render(<ImageWithCaption src="/test.jpg" alt="Test image" sizes={sizes} caption="Test Caption" />);

    expect(screen.getByAltText('Test image')).toBeInTheDocument();
    expect(screen.getByText('Test Caption')).toBeInTheDocument();
  });

  it('should apply sizes attribute correctly', () => {
    render(<ImageWithCaption src="/test.jpg" alt="Test image" sizes={sizes} caption="Test Caption" />);

    const img = screen.getByAltText('Test image');

    expect(img).toHaveAttribute('sizes');
    expect(img.getAttribute('sizes')).toContain('300px');
  });

  it('should render image with border', () => {
    const border = {
      sizes,
      top: { xs: 20 },
      left: { xs: 30 }
    };

    render(<ImageWithCaption src="/test.jpg" alt="Test image" sizes={sizes} caption="Test Caption" border={border} />);

    const borderBox = screen.getByTestId('img-border');
    expect(borderBox).toBeInTheDocument();
  });
});
