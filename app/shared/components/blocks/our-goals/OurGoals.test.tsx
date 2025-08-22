import { render, screen } from '@testing-library/react';

import OurGoals from './OurGoals';
import { TipTapNodeTypes } from '~/types/enums/common.enums';
import { IOurGoals } from '~/types/page/about-us.types';
import { TipTapDoc } from '~/types/types/common.types';

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

const makeDescription = (text: string): TipTapDoc => ({
  type: TipTapNodeTypes.doc,
  content: [
    {
      type: TipTapNodeTypes.paragraph,
      content: [{ type: TipTapNodeTypes.text, text }]
    }
  ]
});

const testData: IOurGoals = {
  title: 'Наші цілі',
  goals: [
    {
      title: 'Comprehend and Reconceptualize:',
      description: makeDescription(
        'We work with archives, scores, documents, and recordings to restore and organize cultural memory.'
      )
    },
    {
      title: 'Preserve Heritage:',
      description: makeDescription(
        'We help contemporary composers, performers, and researchers realize their projects, find partners, audiences, and listeners.'
      )
    },
    {
      title: 'Promote:',
      description: makeDescription(
        'The Foundation not only preserves but also reconceptualizes — through contemporary performance practice, academic research, and dialogues between generations of musicians.'
      )
    }
  ]
};

describe('OurGoals component', () => {
  beforeEach(() => {
    render(OurGoals({ data: testData }));
  });

  it('should render the section title', () => {
    expect(screen.getByText(testData.title)).toBeInTheDocument();
  });

  it('should render all goal titles', () => {
    testData.goals.forEach(({ title }) => {
      expect(screen.getByText(title)).toBeInTheDocument();
    });
  });

  it('should render all goal descriptions', () => {
    testData.goals.forEach(({ description }) => {
      const text =
        description.content.flatMap((node) => node.content ?? []).find((child) => child.type === TipTapNodeTypes.text)
          ?.text ?? '';
      expect(screen.getByText(text)).toBeInTheDocument();
    });
  });

  it('should render bullet icons', () => {
    expect(screen.getAllByAltText('bullet icon')).toHaveLength(testData.goals.length);
  });
});
