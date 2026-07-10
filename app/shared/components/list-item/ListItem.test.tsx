import { render, screen } from '@testing-library/react';
import React from 'react';

import ListItem from './ListItem';

jest.mock('../svg-image/SvgImage', () => ({
  __esModule: true,
  SvgImage: ({ src, alt }: { src: string; alt: string }) => <img src={src} alt={alt} data-testid="svg-image" />
}));

describe('ListItem component', () => {
  const mockText = 'Test bullet item';

  it('should render decorative bullet icons with correct asset paths and empty fallback descriptions', () => {
    render(<ListItem text={mockText} />);
    const bullets = screen.getAllByTestId('svg-image');
    expect(bullets).toHaveLength(2);

    bullets.forEach((img) => {
      expect(img).toHaveAttribute('src', '/icons/bullet-small.svg');
      expect(img).toHaveAttribute('alt', '');
    });
  });

  it('should render the provided plain string layout text content inside structural wrapper layers', () => {
    render(<ListItem text={mockText} />);
    expect(screen.getByText(mockText)).toBeInTheDocument();
  });

  it('should successfully handle custom sx styling arguments when passed as single theme configuration objects', () => {
    const singleStyleObject = { display: 'flex', color: 'rgb(255, 0, 0)' };
    const { container } = render(<ListItem text={mockText} sx={singleStyleObject} />);

    expect(container.firstChild).toBeInTheDocument();
  });

  it('should process multi layer styling parameters cleanly when sx prop evaluates directly to structural array configurations', () => {
    const stylingArrayLayers = [{ padding: '8px' }, { margin: '16px' }];
    const { container } = render(<ListItem text={mockText} sx={stylingArrayLayers} />);

    expect(container.firstChild).toBeInTheDocument();
  });
});
