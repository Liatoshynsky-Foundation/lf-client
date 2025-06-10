import { render, screen } from '@testing-library/react';

import PersonCard from './PersonCard';

const person = {
  imgURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0fsVF1anYNoKb2rvT998PTshQppsUr9Ydhg&s',
  name: 'Тетяна Гомон',
  description:
    'Спадкоємиця композитора, співзасновниця і голова Фундації, піаністка-камералістка і музикознавиця, кандидатка мистецтвознавства'
};

describe('Person Card', () => {
  beforeEach(() => {
    render(<PersonCard imgURL={person.imgURL} name={person.name} description={person.description} />);
  });

  it('should display photo', () => {
    expect(screen.getByAltText(person.name)).toBeInTheDocument();
  });

  it('should display name', () => {
    expect(screen.getByText(person.name)).toBeInTheDocument();
  });

  it('should display description', () => {
    expect(screen.getByText(person.description)).toBeInTheDocument();
  });
});
