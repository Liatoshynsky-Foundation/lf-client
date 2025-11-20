import { render, screen } from '@testing-library/react';

import FoundationTeam from './FoundationTeam';

const teamData = [
  {
    name: 'Тетяна Гомон',
    description: 'Спадкоємиця композитора',
    photo: {
      src: '/images/foundation/team/tetyana-gomon.jpg',
      alt: 'Tetyana Homon',
      generatedSrc: 'test-image'
    }
  },
  {
    name: 'Іван Коваленко',
    description: 'Дослідник творчості Лятошинського',
    photo: {
      src: '/images/foundation/team/ivan-kovalenko.jpg',
      alt: 'Tetyana Homon',
      generatedSrc: 'test-image'
    }
  },
  {
    name: 'Марія Петрівна',
    description: 'Куратор проектів фонду',
    photo: {
      src: '/images/foundation/team/maria-petryvna.jpg',
      alt: 'Tetyana Homon',
      generatedSrc: 'test-image'
    }
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
