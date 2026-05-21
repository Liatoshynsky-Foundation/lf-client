import { render, screen } from '@testing-library/react';
import { JSONContent } from '@tiptap/react';
import React from 'react';

import OurGoals from './OurGoals';
import { TipTapNodeTypes } from '~/types/enums/common.enums';
import { IOurGoals } from '~/types/page/about-us.types';
import { ParagraphNode, TipTapDoc } from '~/types/types/tiptap.types';

type MockTipTapContentProps = {
  data: TipTapDoc;
  nodeRenderers?: Record<string, (children: React.ReactNode, node: ParagraphNode) => React.ReactNode>;
};

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => <img {...props} data-testid="next-image" />
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
      const titleText =
        typeof title === 'string'
          ? title
          : title && typeof title === 'object'
            ? (title as JSONContent)?.content?.[0]?.content?.[0]?.text || 'Mocked Object Title'
            : 'Fallback Title';

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

    const rawText = data?.content?.[0]?.content?.[0]?.text;
    const dummyText: string =
      typeof rawText === 'string'
        ? rawText
        : rawText && typeof rawText === 'object'
          ? (rawText as Record<string, string>).uk || (rawText as Record<string, string>).en || ''
          : 'Fallback Text';

    const dummyNode = data?.content?.[0] as ParagraphNode;

    return (
      <div data-testid="mock-tiptap-content">
        {ParagraphRenderer ? ParagraphRenderer(dummyText, dummyNode) : dummyText}
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

  describe('Standard Rendering Flow', () => {
    beforeEach(() => {
      render(<OurGoals data={testData} />);
    });

    it('should render the section title', () => {
      expect(screen.getByTestId('SectionTitle')).toHaveTextContent(testData.title as string);
    });

    it('should pass target values to the factory layout pipeline and display all headers', () => {
      const titledParagraphs = screen.getAllByTestId('titled-paragraph');
      expect(titledParagraphs).toHaveLength(testData.goals.length);
      expect(titledParagraphs[0]).toHaveAttribute('data-variant', 'goals');

      testData.goals.forEach(({ title }) => {
        expect(screen.getByText(title as string)).toBeInTheDocument();
      });
    });

    it('should display the paragraph description text nodes through the rendering tree', () => {
      testData.goals.forEach(({ description }) => {
        const doc = description as TipTapDoc;
        const text = doc?.content?.[0]?.content?.[0]?.text ?? '';

        const textPrimitive: string = typeof text === 'string' ? text : (text as Record<string, string>).uk || '';

        expect(screen.getByText(textPrimitive)).toBeInTheDocument();
      });
    });

    it('should render the bullet icons with responsive layouts intact', () => {
      const images = screen.getAllByTestId('next-image');
      expect(images).toHaveLength(testData.goals.length);
      expect(images[0]).toHaveAttribute('sizes', '(max-width: 600px) 16px, 24px');
      expect(images[0]).toHaveAttribute('alt', 'bullet icon');
    });
  });

  describe('Edge Cases & Core Data Adjustments', () => {
    it('should safely construct rendering blocks when goal title properties map to an object structure', () => {
      const objectTitleData: IOurGoals = {
        title: 'Title',
        goals: [
          {
            title: makeDescription('Object Title Text'),
            description: makeDescription('Description Text')
          }
        ]
      };

      render(<OurGoals data={objectTitleData} />);
      expect(screen.getByText('Object Title Text')).toBeInTheDocument();
    });

    it('should rely on dynamic transformations if custom descriptions enter the tree as raw strings', () => {
      const stringDescriptionData: IOurGoals = {
        title: 'Title',
        goals: [
          {
            title: 'String Goal Key',
            description: 'This is a raw string description' as unknown as TipTapDoc
          }
        ]
      };

      render(<OurGoals data={stringDescriptionData} />);
      expect(screen.getByText('This is a raw string description')).toBeInTheDocument();
    });

    it('should suppress TipTap markup containers cleanly when description node parameters are missing', () => {
      const emptyDescriptionData: IOurGoals = {
        title: 'Title',
        goals: [{ title: 'Empty Goal', description: null as unknown as TipTapDoc }]
      };

      render(<OurGoals data={emptyDescriptionData} />);
      expect(screen.queryByTestId('mock-tiptap-content')).not.toBeInTheDocument();
    });
  });
});
