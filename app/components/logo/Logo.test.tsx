import { render, screen } from '@testing-library/react';
import Logo from './Logo';

describe('Logo test', () => {
  test('should render Logo component', () => {
    render(<Logo />);
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  test('should render light Logo component', () => {
    render(<Logo light />);
    expect(screen.getByRole('img')).toBeInTheDocument();
  });
});
