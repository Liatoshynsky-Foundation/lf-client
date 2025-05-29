import { render, screen } from '@testing-library/react';
import PersonalCard from './PersonCard';

const person = {
  photo:
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0fsVF1anYNoKb2rvT998PTshQppsUr9Ydhg&s',
  name: 'Тетяна Гомон',
  description:
    'Спадкоємиця композитора, співзасновниця і голова Фундації, піаністка-камералістка і музикознавиця, кандидатка мистецтвознавства',
};

describe('Personal Card', () => {
  beforeEach(() => {
    render(
      <PersonalCard
        photo={person.photo}
        name={person.name}
        description={person.description}
      />,
    );
  });

  test('should display photo', () => {
    expect(screen.getByAltText('Person card photo')).toBeInTheDocument();
  });

  test('should display name', () => {
    expect(screen.getByText(person.name)).toBeInTheDocument();
  });

  test('should display description', () => {
    expect(screen.getByText(person.description)).toBeInTheDocument();
  });

  test('should display logo', () => {
    expect(screen.getByAltText('Logo')).toBeInTheDocument();
  });
});
