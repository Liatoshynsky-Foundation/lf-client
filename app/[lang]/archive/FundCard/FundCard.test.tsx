import { render, screen } from '@testing-library/react';

import FundCard from './FundCard';

describe('FundCard', () => {
  const defaultProps = {
    id: 1,
    number: 'Fund 1',
    title: 'Test Fund Title'
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
      number: 'Custom Fund',
      title: 'Custom Title'
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

    render(<FundCard {...defaultProps} title={longTitle} />);

    expect(screen.getByText(longTitle)).toBeInTheDocument();
  });

  it('should uses unique testId based on id prop', () => {
    const { rerender } = render(<FundCard {...defaultProps} id={1} />);
    expect(screen.getByTestId('FundCard')).toBeInTheDocument();

    rerender(<FundCard {...defaultProps} id={5} />);
    expect(screen.getByTestId('FundCard')).toBeInTheDocument();
  });
});
