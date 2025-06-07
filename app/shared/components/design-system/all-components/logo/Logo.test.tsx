import { render, screen } from '@testing-library/react';
import React from 'react';

import Logo from './Logo';

jest.mock('~/i18n/navigation', () => ({
  Link: ({ href, children }: { href: string; children: React.ReactNode }) => <a href={href}>{children}</a>
}));

jest.mock('next/dynamic');

jest.mock('../../../../public/images/logo.svg', () => ({
  __esModule: true,
  default: (props: React.SVGProps<SVGSVGElement>) => (
    <svg role="img" aria-label="Company logo" data-testid="icon-svg" {...props} />
  )
}));

describe('Logo component', () => {
  it('renders with default variant and wraps in a link', () => {
    render(<Logo />);

    const logo = screen.getByTestId('icon-svg');
    const parent = logo.closest('a');

    expect(logo).toBeInTheDocument();
    expect(parent).toBeInTheDocument();
    expect(parent).toHaveAttribute('href', '/');
  });

  it('renders office variant without link', () => {
    render(<Logo variant="office" />);

    const logo = screen.getByTestId('icon-svg');

    expect(logo).toBeInTheDocument();
    expect(logo.closest('a')).toBeNull();
  });
});
