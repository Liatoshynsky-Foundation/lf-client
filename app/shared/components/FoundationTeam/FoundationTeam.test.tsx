import { render, screen } from '@testing-library/react';

import FoundationTeam from './FoundationTeam';

describe('FoundationTeam', () => {
  it('should render logo', () => {
    render(<FoundationTeam />);
    const logos = screen.getAllByAltText('logo');
    expect(logos.length).toBeGreaterThan(0);
    expect(logos[0]).toBeInTheDocument();
  });

  it('should render person card', () => {
    render(<FoundationTeam />);
    expect(screen.getByText('Тетяна Гомон')).toBeInTheDocument();
    expect(screen.getByText(/Спадкоємиця композитора/)).toBeInTheDocument();
  });
});
