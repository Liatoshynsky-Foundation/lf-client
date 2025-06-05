import { render, screen } from '@testing-library/react';

import Logo from './Logo';

jest.mock('next/dynamic');

jest.mock('../../../../public/images/logo.svg', () => ({
  __esModule: true,
  default: (props: React.SVGProps<SVGSVGElement>) => (
    <svg role="img" aria-label="Company logo" data-testid="icon-svg" {...props} />
  )
}));

describe('Logo test', () => {
  test('should render Logo component for header', () => {
    render(<Logo />);
    const logo = screen.getByRole('img', { name: 'Company logo' });

    // const logo = screen.getByRole('img');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('width', '96');
    expect(logo).toHaveAttribute('height', '40');
  });

  test('should render Logo component for footer', () => {
    render(<Logo variant="footer" />);
    const logo = screen.getByRole('img');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('width', '127');
    expect(logo).toHaveAttribute('height', '53');
  });
});
