import { render, screen } from '@testing-library/react';

import OurGoals from './OurGoals';

jest.mock('next-intl/server', () => ({
  getTranslations: jest.fn().mockImplementation(async (namespace) => {
    const translations: Record<string, string> = {
      'home.ourGoals.maintitle': 'Наші цілі',
      'home.ourGoals.titles.title1': 'Тест заголовок 1',
      'home.ourGoals.titles.title2': 'Тест заголовок 2',
      'home.ourGoals.titles.title3': 'Тест заголовок 3',
      'home.ourGoals.titles.title4': 'Тест заголовок 4',
      'home.ourGoals.descriptions.descr1': 'Тестовий опис 1',
      'home.ourGoals.descriptions.descr2': 'Тестовий опис 2',
      'home.ourGoals.descriptions.descr3': 'Тестовий опис 3',
      'home.ourGoals.descriptions.descr4': 'Тестовий опис 4'
    };

    return (key: string) => translations[`${namespace}.${key}`] || key;
  })
}));

jest.mock('~/components/title-with-description/TitleWithDescription', () => ({
  __esModule: true,
  default: ({ variant, title, description }: { variant: string; title: string; description: string }) => (
    <div data-variant={variant}>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  )
}));

jest.mock('~/components/section-title/SectionTitle', () => ({
  __esModule: true,
  default: ({ title }: { title: string }) => <h2>{title}</h2>
}));

jest.mock('~/lib/utils/generateSizesAttribute', () => ({
  generateSizesAttribute: jest.fn(() => '(max-width: 600px) 16px, 24px')
}));

describe('OurGoals component', () => {
  beforeEach(async () => {
    render(await OurGoals());
  });

  it('should render the section title', () => {
    expect(screen.getByText('Наші цілі')).toBeInTheDocument();
  });

  it('should render all goal titles', () => {
    expect(screen.getByText('Тест заголовок 1')).toBeInTheDocument();
    expect(screen.getByText('Тест заголовок 2')).toBeInTheDocument();
    expect(screen.getByText('Тест заголовок 3')).toBeInTheDocument();
    expect(screen.getByText('Тест заголовок 4')).toBeInTheDocument();
  });

  it('should render all goal descriptions', () => {
    expect(screen.getByText('Тестовий опис 1')).toBeInTheDocument();
    expect(screen.getByText('Тестовий опис 2')).toBeInTheDocument();
    expect(screen.getByText('Тестовий опис 3')).toBeInTheDocument();
    expect(screen.getByText('Тестовий опис 4')).toBeInTheDocument();
  });

  it('should render bullet icons', () => {
    const bulletIcons = screen.getAllByAltText('bullet icon');
    expect(bulletIcons).toHaveLength(4);
  });
});
