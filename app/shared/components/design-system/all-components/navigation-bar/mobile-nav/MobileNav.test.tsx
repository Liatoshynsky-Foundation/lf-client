import { render, screen } from '@testing-library/react';

import MobileNav from './MobileNav';

describe('MobileNav', () => {
  it('should render an IconButton with correct size and styles', () => {
    render(<MobileNav />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();

    const img = screen.getByAltText('Menu');
    expect(img).toBeInTheDocument();

    expect(img).toHaveAttribute('src', '/icons/menu-button.svg');
    expect(img).toHaveAttribute('width', '40');
    expect(img).toHaveAttribute('height', '24');
  });
});
