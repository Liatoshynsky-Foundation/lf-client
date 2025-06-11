import { render, screen } from '@testing-library/react';

import FoundationFounders from './FoundationFounders';

jest.mock('next-intl/server', () => ({
  getTranslations: jest.fn().mockImplementation(async (namespace) => {
    const translations: Record<string, string> = {
      'foundation.foundationWasCreated': 'Фундація Лятошинського, заснована',
      'foundation.foundationWasCreatedDescription':
        'у 2023 році Тетяною Гомон, Іриною Туковою та Павлом Піміновим, об’єднує фахівців у сфері музикознавства, виконавського мистецтва, музичного менеджменту та цифрових проєктів.',
      'foundation.foundationTeam': 'Команда Фундації Лятошинського'
    };
    return (key: string) => translations[`${namespace}.${key}`] || key;
  })
}));

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

describe('FoundationFounders', () => {
  beforeEach(async () => {
    render(await FoundationFounders());
  });

  it('should render title', () => {
    expect(screen.getByText(/Фундація Лятошинського, заснована/i)).toBeInTheDocument();
  });

  it('should render description', () => {
    expect(screen.getByText(/у 2023 році Тетяною Гомон,/i)).toBeInTheDocument();
  });

  it('should render team title', () => {
    expect(screen.getByText(/Команда Фундації Лятошинського/i)).toBeInTheDocument();
  });
});
