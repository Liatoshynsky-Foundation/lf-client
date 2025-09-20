import { render, screen } from '@testing-library/react';
import React from 'react';

import SupportButton from './SupportButton';

const mockData = {
  text: 'Support',
  link: '/support'
};

jest.mock('~/i18n/navigation', () => ({
  Link: ({ href, children }: { href: string; children: React.ReactNode }) => <a href={href}>{children}</a>
}));

describe('SupportButton', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the button with correct label', () => {
    render(<SupportButton data={mockData} />);

    const button = screen.getByRole('button', { name: /support/i });
    expect(button).toBeInTheDocument();

    const icon = screen.queryByAltText(/support button/i);
    expect(icon).not.toBeInTheDocument();
  });
  it('should render icon when mobile view', () => {
    render(<SupportButton data={mockData} isMobile />);

    const icon = screen.getByAltText(/support button/i);
    expect(icon).toBeInTheDocument();

    const button = screen.queryByRole('button', { name: /support/i });
    expect(button).not.toBeInTheDocument();
  });
});
