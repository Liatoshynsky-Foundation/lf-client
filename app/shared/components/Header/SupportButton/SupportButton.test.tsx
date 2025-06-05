import React from 'react';
import { render, screen } from '@testing-library/react';
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
    render(<SupportButton data={mockData} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the button with correct label', () => {
    const button = screen.getByRole('button', { name: /support/i });
    expect(button).toBeInTheDocument();
  });
});
