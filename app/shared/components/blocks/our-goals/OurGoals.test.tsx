import { render, screen } from '@testing-library/react';

import OurGoals from './OurGoals';
import { TipTapNodeTypes } from '~/types/enums/common.enums';
import { IOurGoals } from '~/types/types/about-us.types';

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

const testData: IOurGoals = {
  title: 'Наші цілі',
  goals: [
    {
      title: 'Comprehend and Reconceptualize:',
      description: {
        type: TipTapNodeTypes.doc,
        content: [
          {
            type: TipTapNodeTypes.paragraph,
            content: [
              {
                type: TipTapNodeTypes.text,
                text: 'We work with archives, scores, documents, and recordings to restore and organize cultural memory.'
              }
            ]
          }
        ]
      }
    },
    {
      title: 'Preserve Heritage:',
      description: {
        type: TipTapNodeTypes.doc,
        content: [
          {
            type: TipTapNodeTypes.paragraph,
            content: [
              {
                type: TipTapNodeTypes.text,
                text: 'We help contemporary composers, performers, and researchers realize their projects, find partners, audiences, and listeners.'
              }
            ]
          }
        ]
      }
    },
    {
      title: 'Promote:',
      description: {
        type: TipTapNodeTypes.doc,
        content: [
          {
            type: TipTapNodeTypes.paragraph,
            content: [
              {
                type: TipTapNodeTypes.text,
                text: 'The Foundation not only preserves but also reconceptualizes — through contemporary performance practice, academic research, and dialogues between generations of musicians.'
              }
            ]
          }
        ]
      }
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
    expect(
      screen.getByText(
        'We work with archives, scores, documents, and recordings to restore and organize cultural memory.'
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'We help contemporary composers, performers, and researchers realize their projects, find partners, audiences, and listeners.'
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'The Foundation not only preserves but also reconceptualizes — through contemporary performance practice, academic research, and dialogues between generations of musicians.'
      )
    ).toBeInTheDocument();
  });

  it('should render bullet icons', () => {
    const bulletIcons = screen.getAllByAltText('bullet icon');
    expect(bulletIcons).toHaveLength(3);
  });
});
