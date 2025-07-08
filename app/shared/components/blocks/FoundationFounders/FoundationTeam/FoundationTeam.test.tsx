import { render, screen } from '@testing-library/react';

import FoundationTeam from './FoundationTeam';

const teamData = [
  {
    name: 'Тетяна Гомон',
    description: 'Спадкоємиця композитора',
    photo: '/images/foundation/team/tetyana-gomon.jpg'
  },
  {
    name: 'Іван Коваленко',
    description: 'Дослідник творчості Лятошинського',
    photo: '/images/foundation/team/ivan-kovalenko.jpg'
  },
  {
    name: 'Марія Петрівна',
    description: 'Куратор проектів фонду',
    photo: '/images/foundation/team/maria-petryvna.jpg'
  }
];

describe('FoundationTeam', () => {
  beforeEach(() => {
    render(<FoundationTeam title="The Lyatoshynsky Foundation Team" team={teamData} />);
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
