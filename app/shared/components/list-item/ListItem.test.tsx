import { render, screen } from '@testing-library/react';

import ListItem from './ListItem';

jest.mock('~/shared/components/svg-image/SvgImage', () => ({
  __esModule: true,
  SvgImage: ({ src, alt }: { src: string; alt: string }) => <img src={src} alt={alt} data-testid="svg-image" />
}));

describe('ListItem component', () => {
  const mockText = 'Test bullet item';

  beforeEach(() => {
    render(<ListItem text={mockText} />);
  });

  it('should render decorative bullet icon(s) with correct src', () => {
    const bullets = screen.getAllByTestId('svg-image');
    expect(bullets.length).toBeGreaterThan(0);

    for (const img of bullets) {
      expect(img).toHaveAttribute('src', expect.stringContaining('/icons/bullet-small.svg'));
      expect(img).toHaveAttribute('alt', '');
    }
  });

  it('should render the provided text', () => {
    expect(screen.getByText(mockText)).toBeInTheDocument();
  });
});
