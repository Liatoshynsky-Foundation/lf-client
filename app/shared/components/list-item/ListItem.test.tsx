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

  it('should render the bullet icon with correct alt text and src', () => {
    const bullet = screen.getByTestId('svg-image');
    expect(bullet).toBeInTheDocument();
    expect(bullet).toHaveAttribute('alt', 'bullet');
    expect(bullet).toHaveAttribute('src', '/icons/bullet-small.svg');
  });

  it('should render the provided text', () => {
    expect(screen.getByText(mockText)).toBeInTheDocument();
  });
});
