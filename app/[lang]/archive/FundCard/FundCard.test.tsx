import { render, screen } from '@testing-library/react';
import { useLocale } from 'next-intl';
import React from 'react';

import FundCard from './FundCard';

jest.mock('next-intl', () => ({
  useLocale: jest.fn(() => 'en')
}));

jest.mock('~/i18n/navigation', () => ({
  Link: ({ href, style, children }: { href: string; style: React.CSSProperties; children: React.ReactNode }) => (
    <a href={href} style={style} data-testid="mock-link">
      {children}
    </a>
  )
}));

jest.mock('~/shared/components/constants/routes', () => ({
  getDynamicRoute: {
    archiveFund: (id: number) => `/archive/fund/${id}`
  }
}));

describe('FundCard', () => {
  const defaultProps = {
    id: 1,
    number: { en: 'Fund 1', uk: 'Фунд 1' },
    title: { en: 'Test Fund Title', uk: 'Тестова назва фонду' }
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useLocale as jest.Mock).mockReturnValue('en');
  });

  it('should renders without crashing and links to the correct archive dynamic route', () => {
    render(<FundCard {...defaultProps} />);

    expect(screen.getByTestId('FundCard')).toBeInTheDocument();
    expect(screen.getByTestId('mock-link')).toHaveAttribute('href', '/archive/fund/1');
  });

  it('should displays fund number correctly', () => {
    render(<FundCard {...defaultProps} />);

    expect(screen.getByText('Fund 1')).toBeInTheDocument();
  });

  it('should displays fund title correctly', () => {
    render(<FundCard {...defaultProps} />);

    expect(screen.getByText('Test Fund Title')).toBeInTheDocument();
  });

  it('should renders with different prop values', () => {
    const customProps = {
      id: 99,
      number: { en: 'Custom Fund', uk: 'Кастомний Фунд' },
      title: { en: 'Custom Title', uk: 'Кастомна Назва' }
    };

    render(<FundCard {...customProps} />);

    expect(screen.getByTestId('FundCard')).toBeInTheDocument();
    expect(screen.getByText('Custom Fund')).toBeInTheDocument();
    expect(screen.getByText('Custom Title')).toBeInTheDocument();
  });

  it('should renders all required elements with correct accessibility labels', () => {
    render(<FundCard {...defaultProps} />);

    expect(screen.getByTestId('FundCard-number')).toBeInTheDocument();
    expect(screen.getByTestId('FundCard-title')).toBeInTheDocument();
    expect(screen.getByTestId('FundCard-line')).toBeInTheDocument();
    expect(screen.getByTestId('FundCard')).toHaveAttribute('aria-label', 'Fund 1: Test Fund Title');
  });

  it('should handles long titles', () => {
    const longTitle = 'Very Long Title That Should Be Displayed Properly';

    render(<FundCard {...defaultProps} title={{ en: longTitle, uk: longTitle }} />);

    expect(screen.getByText(longTitle)).toBeInTheDocument();
  });

  it('should display ukrainian translations correctly when active application locale changes', () => {
    (useLocale as jest.Mock).mockReturnValue('uk');

    render(<FundCard {...defaultProps} />);

    expect(screen.getByText('Фунд 1')).toBeInTheDocument();
    expect(screen.getByText('Тестова назва фонду')).toBeInTheDocument();
    expect(screen.getByTestId('FundCard')).toHaveAttribute('aria-label', 'Фунд 1: Тестова назва фонду');
  });

  it('should handle plain string inputs directly without crashing or throwing errors', () => {
    const plainStringProps = {
      id: 5,
      number: 'Plain Fund 5',
      title: 'Plain Static Title'
    };

    render(<FundCard {...plainStringProps} />);

    expect(screen.getByText('Plain Fund 5')).toBeInTheDocument();
    expect(screen.getByText('Plain Static Title')).toBeInTheDocument();
    expect(screen.getByTestId('FundCard')).toHaveAttribute('aria-label', 'Plain Fund 5: Plain Static Title');
  });
});
