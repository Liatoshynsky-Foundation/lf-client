import { render, screen } from '@testing-library/react';

import OurGoals from './OurGoals';

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

jest.mock('~/utils/generateSizesAttribute', () => ({
  generateSizesAttribute: jest.fn(() => '(max-width: 600px) 16px, 24px')
}));

const testData = {
  mainTitle: 'Наші цілі',
  goals: [
    {
      title: 'Тест заголовок 1',
      description: 'Тестовий опис 1'
    },
    {
      title: 'Тест заголовок 2',
      description: 'Тестовий опис 2'
    },
    {
      title: 'Тест заголовок 3',
      description: 'Тестовий опис 3'
    },
    {
      title: 'Тест заголовок 4',
      description: 'Тестовий опис 4'
    }
  ]
};
describe('OurGoals component', () => {
  beforeEach(() => {
    render(OurGoals({ data: testData }));
  });

  it('should render the section title', () => {
    expect(screen.getByText('Наші цілі')).toBeInTheDocument();
  });

  it('should render all goal titles', () => {
    testData.goals.forEach((item) => {
      expect(screen.getByText(item.title)).toBeInTheDocument();
    });
  });

  it('should render all goal descriptions', () => {
    testData.goals.forEach((item) => {
      expect(screen.getByText(item.description)).toBeInTheDocument();
    });
  });

  it('should render bullet icons', () => {
    const bulletIcons = screen.getAllByAltText('bullet icon');
    expect(bulletIcons).toHaveLength(4);
  });
});
