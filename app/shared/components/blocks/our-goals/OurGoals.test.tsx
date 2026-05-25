'use client';

import { render, screen } from '@testing-library/react';
import { JSONContent } from '@tiptap/react';
import React from 'react';

import OurGoals from './OurGoals';
import { TipTapNodeTypes } from '~/types/enums/common.enums';
import { IOurGoals } from '~/types/page/about-us.types';
import { ParagraphNode, TipTapDoc } from '~/types/types/tiptap.types';

type MockTipTapContentProps = {
  data: TipTapDoc | string;
  nodeRenderers?: Record<string, (children: React.ReactNode, node: ParagraphNode) => React.ReactNode>;
};

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ fill, ...props }: React.ImgHTMLAttributes<HTMLImageElement> & { fill?: boolean }) => (
    <img {...props} alt="bullet icon" data-filled={fill ? 'true' : undefined} data-testid="next-image" />
  )
}));

jest.mock('~/components/section-title/SectionTitle', () => ({
  __esModule: true,
  default: ({ title }: { title: string | TipTapDoc }) => (
    <h2 data-testid="SectionTitle">{typeof title === 'string' ? title : 'TipTap Title'}</h2>
  )
}));

jest.mock('../../tip-tap-content/nodes', () => ({
  renderData: jest.fn((input: unknown) => {
    if (typeof input === 'object' && input !== null) return input;
    return {
      type: TipTapNodeTypes.doc,
      content: [
        {
          type: TipTapNodeTypes.paragraph,
          content: [{ type: TipTapNodeTypes.text, text: String(input) }]
        }
      ]
    };
  }),
  getTitledParagraph: jest.fn((variant: string, title: unknown) => {
    return function MockTitledParagraph(children: React.ReactNode) {
      let titleText = 'Fallback Title';

      if (typeof title === 'string') {
        titleText = title;
      } else if (title && typeof title === 'object' && 'content' in title) {
        const docObj = title as JSONContent;
        titleText = docObj.content?.[0]?.content?.[0]?.text || 'Mocked Object Title';
      }

      return (
        <div data-testid="titled-paragraph" data-variant={variant}>
          <h3>{titleText}</h3>
          <div>{children}</div>
        </div>
      );
    };
  })
}));

jest.mock('~/components/tip-tap-content/TipTapContent', () => ({
  __esModule: true,
  default: ({ data, nodeRenderers }: MockTipTapContentProps) => {
    const ParagraphRenderer = nodeRenderers?.[TipTapNodeTypes.paragraph] || nodeRenderers?.['paragraph'];

    const isObjectDoc = typeof data === 'object' && data !== null && 'content' in data;
    const dummyNode = isObjectDoc ? (data.content?.[0] as ParagraphNode) : undefined;

    const rawText = typeof data === 'string' ? data : data?.content?.[0]?.content?.[0]?.text;

    const dummyText: string =
      typeof rawText === 'object' && rawText !== null
        ? (rawText as Record<string, string>).uk || (rawText as Record<string, string>).en || ''
        : (rawText as string) || 'Fallback Text';

    return (
      <div data-testid="mock-tiptap-content">
        {ParagraphRenderer && dummyNode ? ParagraphRenderer(dummyText, dummyNode) : dummyText}
      </div>
    );
  }
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
    jest.clearAllMocks();
  });

  describe('Standard Rendering Pipeline Flows', () => {
    it('should mount with correct title configurations, layout structures, and localized elements', () => {
      render(<OurGoals data={testData} />);

      const titleText = typeof testData.title === 'string' ? testData.title : 'Fallback Title';
      expect(screen.getByTestId('SectionTitle')).toHaveTextContent(titleText);

      const titledParagraphs = screen.getAllByTestId('titled-paragraph');
      expect(titledParagraphs).toHaveLength(testData.goals.length);
      expect(titledParagraphs[0]).toHaveAttribute('data-variant', 'goals');

      const images = screen.getAllByTestId('next-image');
      expect(images).toHaveLength(testData.goals.length);
      expect(images[0]).toHaveAttribute('sizes', '(max-width: 600px) 16px, 24px');
      expect(images[0]).toHaveAttribute('alt', 'bullet icon');

      testData.goals.forEach(({ title, description }) => {
        let expectedTitleText = '';
        if (typeof title === 'string') {
          expectedTitleText = title;
        } else if (title && typeof title === 'object' && 'content' in title) {
          const rawTitleText = title.content?.[0]?.content?.[0]?.text || '';
          expectedTitleText =
            typeof rawTitleText === 'string' ? rawTitleText : (rawTitleText as Record<string, string>).uk || '';
        }

        expect(screen.getByText(expectedTitleText)).toBeInTheDocument();

        const doc = description as TipTapDoc;
        const rawDescText = doc?.content?.[0]?.content?.[0]?.text || '';

        const expectedDescriptionText =
          typeof rawDescText === 'string' ? rawDescText : (rawDescText as Record<string, string>).uk || '';

        expect(screen.getByText(expectedDescriptionText)).toBeInTheDocument();
      });
    });
  });

  describe('Hybrid Content Path Routing & Edge Cases', () => {
    it('should cleanly parse titles that enter processing trees inside nested TipTapDoc objects', () => {
      const objectTitleData: IOurGoals = {
        title: 'Title',
        goals: [{ title: makeDescription('Object Title Text'), description: makeDescription('Description Text') }]
      };

      render(<OurGoals data={objectTitleData} />);
      expect(screen.getByText('Object Title Text')).toBeInTheDocument();
    });

    it('should gracefully adapt when description blocks map to raw text string fields', () => {
      const stringDescriptionData: IOurGoals = {
        title: 'Title',
        goals: [{ title: 'String Goal Key', description: 'This is a raw string description' }]
      };

      render(<OurGoals data={stringDescriptionData} />);
      expect(screen.getByText('This is a raw string description')).toBeInTheDocument();
    });

    it('should skip layout assembly chains when description parameters resolve to empty strings', () => {
      const emptyDescriptionData: IOurGoals = {
        title: 'Title',
        goals: [{ title: 'Empty Goal', description: '' }]
      };

      render(<OurGoals data={emptyDescriptionData} />);
      expect(screen.queryByTestId('mock-tiptap-content')).not.toBeInTheDocument();
    });
  });
});
