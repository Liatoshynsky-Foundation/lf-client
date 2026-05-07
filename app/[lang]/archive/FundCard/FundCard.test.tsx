import { render, screen } from '@testing-library/react';

import FundCard from './FundCard';

jest.mock('next-intl', () => ({
  useLocale: jest.fn(() => 'en')
}));

describe('FundCard', () => {
  const defaultProps = {
    id: 1,
    number: { en: 'Fund 1', uk: 'Фунд 1' },
    title: { en: 'Test Fund Title', uk: 'Тестова назва фонду' }
  };

  it('should renders without crashing', () => {
    render(<FundCard {...defaultProps} />);

    expect(screen.getByTestId('FundCard')).toBeInTheDocument();
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

  it('should renders all required elements', () => {
    render(<FundCard {...defaultProps} />);

    expect(screen.getByTestId('FundCard-number')).toBeInTheDocument();
    expect(screen.getByTestId('FundCard-title')).toBeInTheDocument();
    expect(screen.getByTestId('FundCard-line')).toBeInTheDocument();
  });

  it('should handles long titles', () => {
    const longTitle = 'Very Long Title That Should Be Displayed Properly';

    render(<FundCard {...defaultProps} title={{ en: longTitle, uk: longTitle }} />);

    expect(screen.getByText(longTitle)).toBeInTheDocument();
  });
});
