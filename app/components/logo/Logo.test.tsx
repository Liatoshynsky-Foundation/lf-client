import { render, screen } from '@testing-library/react';
import Logo from './Logo';

describe('Logo test', () => {
  test('should render Logo component for header', () => {
    render(<Logo />);
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  test('should render Logo component for footer', () => {
    render(<Logo variant='footer' />);
    expect(screen.getByRole('img')).toBeInTheDocument();
  });
});
