import { render, screen } from '@testing-library/react';

import OurGoals from './OurGoals';

const TRANSLATIONS: Record<string, string> = {
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

const EXPECTED_TITLES = Object.values(TRANSLATIONS).filter((value) => value.includes('заголовок'));

const EXPECTED_DESCRIPTIONS = Object.values(TRANSLATIONS).filter((value) => value.includes('опис'));

jest.mock('next-intl/server', () => ({
  getTranslations: jest.fn().mockImplementation(async (namespace) => {
    return (key: string) => TRANSLATIONS[`${namespace}.${key}`] || key;
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
    EXPECTED_TITLES.forEach((title) => {
      expect(screen.getByText(title)).toBeInTheDocument();
    });
  });

  it('should render all goal descriptions', () => {
    EXPECTED_DESCRIPTIONS.forEach((description) => {
      expect(screen.getByText(description)).toBeInTheDocument();
    });
  });

  it('should render bullet icons', () => {
    const bulletIcons = screen.getAllByAltText('bullet icon');
    expect(bulletIcons).toHaveLength(4);
  });
});
