import { render, screen } from '@testing-library/react';

import FoundationTeam from './FoundationTeam';

describe('FoundationTeam', () => {
  beforeEach(() => {
    render(<FoundationTeam title="The Lyatoshynsky Foundation Team" />);
  });

  it('should render title', () => {
    expect(screen.getByText(/The Lyatoshynsky Foundation Team/i));
  });

  it('should render logo', () => {
    const logos = screen.getAllByAltText('logo');
    expect(logos.length).toBeGreaterThan(0);
    expect(logos[0]).toBeInTheDocument();
  });

  it('should render person card', () => {
    expect(screen.getByText('Тетяна Гомон')).toBeInTheDocument();
    expect(screen.getByText(/Спадкоємиця композитора/)).toBeInTheDocument();
  });
});
