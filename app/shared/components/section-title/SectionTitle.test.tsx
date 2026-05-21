'use client';

import { render, screen } from '@testing-library/react';
import { useLocale } from 'next-intl';
import React from 'react';

import SectionTitle from './SectionTitle';
import { TipTapNodeTypes } from '~/types/enums/common.enums';
import { TipTapDoc, TipTapElement } from '~/types/types/tiptap.types';

type MockTipTapContentProps = {
  data: TipTapDoc | string;
  nodeRenderers?: Record<string, (children: React.ReactNode) => React.ReactNode>;
};

jest.mock('next-intl', () => ({
  useLocale: jest.fn(() => 'en')
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => <img {...props} data-testid="next-image" />
}));

jest.mock('~/lib/utils/generateSizesAttribute', () => ({
  generateSizesAttribute: jest.fn(() => '(max-width: 600px) 16px, 24px')
}));

jest.mock('~/utils/sxToArray', () => ({
  sxToArray: (sx: unknown) => (Array.isArray(sx) ? sx : [sx].filter(Boolean))
}));

jest.mock('~/lib/utils/tiptapHelpers', () => ({
  isTipTapDoc: jest.fn((val) => val && val.type === 'doc'),
  getPlainString: jest.fn((val) => (typeof val === 'string' ? val : val?.en || 'localized-fallback'))
}));

jest.mock('../tip-tap-content/TipTapContent', () => ({
  __esModule: true,
  default: ({ data, nodeRenderers }: MockTipTapContentProps) => {
    const ParagraphRenderer = nodeRenderers?.[TipTapNodeTypes.paragraph] || nodeRenderers?.['paragraph'];

    let textSnippet: unknown = '';
    if (typeof data === 'string') {
      textSnippet = data;
    } else if (data && typeof data === 'object' && 'content' in data) {
      const firstBlock = data.content?.[0];
      if (firstBlock && typeof firstBlock === 'object' && 'content' in firstBlock) {
        const firstInlineNode = (firstBlock as TipTapElement).content;
        if (Array.isArray(firstInlineNode) && firstInlineNode[0] && typeof firstInlineNode[0] === 'object') {
          textSnippet = firstInlineNode[0].text;
        }
      }
    }

    const dummyText =
      typeof textSnippet === 'object' && textSnippet !== null
        ? (textSnippet as Record<string, string>).uk || (textSnippet as Record<string, string>).en || ''
        : (textSnippet as string) || 'Fallback Text';

    return <div data-testid="mock-tiptap-content">{ParagraphRenderer ? ParagraphRenderer(dummyText) : dummyText}</div>;
  }
}));

const mockLocalizedTitle = { uk: 'Тестовий заголовок', en: 'Test English Title' };

const mockTipTapTitle = {
  type: TipTapNodeTypes.doc,
  content: [
    {
      type: TipTapNodeTypes.paragraph,
      content: [{ type: TipTapNodeTypes.text, text: 'TipTap Title Content' }]
    }
  ]
} as unknown as TipTapDoc;

describe('SectionTitle', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useLocale as jest.Mock).mockReturnValue('en');
  });

  describe('Icon Visibility and Content Routing Matrix', () => {
    it('should correctly configure default visibility states and render plain text dictionaries', () => {
      render(<SectionTitle title={mockLocalizedTitle} />);

      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toHaveTextContent('Test English Title');
      expect(screen.queryByTestId('mock-tiptap-content')).not.toBeInTheDocument();

      const icon = screen.getByAltText('ellipse');
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute('sizes', '(max-width: 600px) 16px, 24px');
    });

    it('should cleanly suppress the icon when icon prop is false', () => {
      render(<SectionTitle icon={false} title={mockLocalizedTitle} />);
      expect(screen.queryByAltText('ellipse')).not.toBeInTheDocument();
    });

    it('should alternate pipelines and mount TipTapContent when fed a structured node document', () => {
      render(<SectionTitle title={mockTipTapTitle} />);

      expect(screen.getByTestId('mock-tiptap-content')).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('TipTap Title Content');
    });
  });

  describe('Dynamic TestID Mapping Propagation', () => {
    it.each([
      ['OurGoals', mockLocalizedTitle, 'Test English Title'],
      ['OurMission', mockTipTapTitle, 'TipTap Title Content']
    ])('should match DOM structural suffixes when test ID "%s" is allocated', (testId, titlePayload, expectedText) => {
      render(<SectionTitle title={titlePayload} dataTestId={testId} />);

      expect(screen.getByTestId(testId)).toBeInTheDocument();
      expect(screen.getByTestId(`${testId}-title`)).toHaveTextContent(expectedText);
      expect(screen.getByTestId(`${testId}-icon`)).toBeInTheDocument();
    });
  });
});
