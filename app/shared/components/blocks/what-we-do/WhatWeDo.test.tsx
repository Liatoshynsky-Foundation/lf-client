import { render, screen } from '@testing-library/react';
import React from 'react';

import WhatWeDo from './WhatWeDo';
import { TipTapNodeTypes } from '~/types/enums/common.enums';
import { IWhatWeDo } from '~/types/page/about-us.types';
import { TipTapDoc } from '~/types/types/tiptap.types';

type MockTipTapContentProps = {
  data: TipTapDoc;
  nodeRenderers?: Record<string, (children: React.ReactNode) => React.ReactNode>;
};

type MockTWDProps = {
  variant: string;
  title: string | TipTapDoc;
  description: string | TipTapDoc;
};

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => <img {...props} data-testid="next-image" />
}));

jest.mock('~/components/section-title/SectionTitle', () => ({
  __esModule: true,
  default: ({ title, dataTestId }: { title: string | TipTapDoc; dataTestId?: string }) => (
    <h2 data-testid={dataTestId || 'SectionTitle'}>{typeof title === 'string' ? title : 'TipTap Title'}</h2>
  )
}));

jest.mock('~/components/title-with-description/TitleWithDescription', () => ({
  __esModule: true,
  default: ({ variant, title, description }: MockTWDProps) => {
    const titleText = typeof title === 'string' ? title : 'Object Title';
    const descText = typeof description === 'string' ? description : 'Object Description';

    return (
      <div data-testid="TitleWithDescription" data-variant={variant}>
        <h3>{titleText}</h3>
        <p>{descText}</p>
      </div>
    );
  }
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

    return <div data-testid="mock-tiptap-content">{ParagraphRenderer ? ParagraphRenderer(dummyText) : dummyText}</div>;
  }
}));

jest.mock('~/utils/generateSizesAttribute', () => ({
  generateSizesAttribute: jest.fn(() => '(max-width: 600px) 16px, 24px')
}));

jest.mock('../../tip-tap-content/nodes', () => ({
  getTitledParagraph: jest.fn((variant: string, title: unknown) => {
    return function MockTitledParagraph(children: React.ReactNode) {
      return (
        <div data-testid="titled-paragraph" data-variant={variant}>
          <h3>{typeof title === 'string' ? title : 'Object Title'}</h3>
          <div>{children}</div>
        </div>
      );
    };
  })
}));

const createDescription = (text: string): TipTapDoc => ({
  type: TipTapNodeTypes.doc,
  content: [
    {
      type: TipTapNodeTypes.paragraph,
      content: [
        {
          type: TipTapNodeTypes.text,
          text
        }
      ]
    }
  ]
});

const testData: IWhatWeDo = {
  title: 'What are we doing?:',
  items: [
    {
      title: 'titlesList.title1',
      description: createDescription('We organize artistic events that bring Lyatoshynsky`s music back to the stage.')
    },
    {
      title: 'titlesList.title2',
      description: createDescription('We conduct master classes, public lectures, residencies, and research programs.')
    }
  ]
};

describe('WhatWeDo component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('TipTap Content Path', () => {
    beforeEach(() => {
      render(<WhatWeDo data={testData} />);
    });

    it('should render the section title using SectionTitle component', () => {
      const titleEl = screen.getByTestId('WhatWeDo-title');
      expect(titleEl).toBeInTheDocument();
      expect(titleEl).toHaveTextContent('What are we doing?:');
    });

    it('should pass description down to TipTapContent and hook up getTitledParagraph renderer', () => {
      const paragraphs = screen.getAllByTestId('titled-paragraph');
      expect(paragraphs).toHaveLength(testData.items.length);
      expect(paragraphs[0]).toHaveAttribute('data-variant', 'whatWeDo');

      expect(screen.getByText('titlesList.title1')).toBeInTheDocument();
      expect(
        screen.getByText('We organize artistic events that bring Lyatoshynsky`s music back to the stage.')
      ).toBeInTheDocument();
    });

    it('should render bullet icons for each row', () => {
      const icons = screen.getAllByTestId('next-image');
      expect(icons).toHaveLength(testData.items.length);
      expect(icons[0]).toHaveAttribute('alt', 'bullet icon');
    });
  });

  describe('Legacy String Content Path', () => {
    it('should fall back to TitleWithDescription if item.description is a string', () => {
      const legacyData: IWhatWeDo = {
        title: 'Legacy Section',
        items: [
          {
            title: 'Legacy Title One',
            description: 'Legacy Plain String Description' as unknown as TipTapDoc
          }
        ]
      };

      render(<WhatWeDo data={legacyData} />);

      expect(screen.queryByTestId('mock-tiptap-content')).not.toBeInTheDocument();
      expect(screen.queryByTestId('titled-paragraph')).not.toBeInTheDocument();

      const fallbackComponent = screen.getByTestId('TitleWithDescription');
      expect(fallbackComponent).toBeInTheDocument();
      expect(fallbackComponent).toHaveAttribute('data-variant', 'whatWeDo');
      expect(screen.getByText('Legacy Title One')).toBeInTheDocument();
      expect(screen.getByText('Legacy Plain String Description')).toBeInTheDocument();
    });
  });
});
