import { render } from '@testing-library/react';
import React from 'react';

import CroppedImage from './CroppedImage';

describe('CroppedImage', () => {
  beforeAll(() => {
    global.ResizeObserver = class ResizeObserver {
      observe() {}
      unobserve() {}
      disconnect() {}
    } as unknown as typeof ResizeObserver;
  });

  const rect = { x: 10, y: 10, width: 50, height: 50 };

  it.each([
    ['an object with rect', { rect }],
    ['a CropRect directly', rect]
  ])('renders with crop as %s', (_, crop) => {
    const { container } = render(<CroppedImage src="/test.jpg" alt="Test" crop={crop} />);
    expect(container.querySelector('img')).toBeInTheDocument();
  });
});
