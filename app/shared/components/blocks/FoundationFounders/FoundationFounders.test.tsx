import { render, screen } from '@testing-library/react';

import FoundationFounders from './FoundationFounders';

jest.mock('./FoundationTeam/FoundationTeam', () => {
  const MockFoundationTeam = ({ title }: { title: string }) => <div data-testid="foundation-team">{title}</div>;
  MockFoundationTeam.displayName = 'MockFoundationTeam';
  return MockFoundationTeam;
});

jest.mock('./FoundationWasCreated/FoundationWasCreated', () => {
  const MockFoundationWasCreated = ({ title, description }: { title: string; description: string }) => (
    <div data-testid="foundation-was-created">
      <p>{title}</p>
      <p>{description}</p>
    </div>
  );
  MockFoundationWasCreated.displayName = 'MockFoundationWasCreated';
  return MockFoundationWasCreated;
});

const testData = {
  title: 'Фундація Лятошинського',
  description: 'у 2023 році Тетяною Гомон, Іриною Туковою',
  members: [
    { name: 'Tetiana Homon', description: 'test', photo: 'test' },
    { name: 'Iryna Tukova', description: 'Co-Founder', photo: 'test' },
    { name: 'Pavlo Piminov', description: 'Co-Founder', photo: 'test' }
  ]
};
describe('FoundationFounders', () => {
  beforeEach(() => {
    render(FoundationFounders({ data: testData }));
  });

  it('should render description', () => {
    expect(screen.getByText(/у 2023 році Тетяною Гомон, Іриною Туковою/i)).toBeInTheDocument();
  });
});
