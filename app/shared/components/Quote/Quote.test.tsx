import { render, screen } from '@testing-library/react';
import React from 'react';

import QuoteBlock from './Quote';
import { TipTapNodeTypes } from '~/types/enums/common.enums';
import type { QuoteBlockProps } from '~/types/types/quoteComponent';
import { TipTapDoc } from '~/types/types/tiptap.types';

type MockNodeRenderers = Record<string, (children: React.ReactNode) => React.ReactNode>;

type MockTipTapContentProps = {
  data: TipTapDoc & { id?: string };
  nodeRenderers: MockNodeRenderers;
};

jest.mock('~/public/images/quote.svg', () => ({
  __esModule: true,
  default: () => <svg data-testid="icon-svg" />
}));

jest.mock('../tip-tap-content/TipTapContent', () => ({
  __esModule: true,
  default: ({ nodeRenderers, data }: MockTipTapContentProps) => {
    const ParagraphRenderer = nodeRenderers[TipTapNodeTypes.paragraph] || nodeRenderers['paragraph'];

    return (
      <div data-testid={`mock-tiptap-${data.id || 'default'}`}>
        {ParagraphRenderer ? ParagraphRenderer('Mocked TipTap Content') : 'Fallback'}
      </div>
    );
  }
}));

const defaultProps: QuoteBlockProps = {
  quoteText: 'Test Quote',
  sourceText: 'title, 1 січня 2000, place',
  quoteIconColor: 'black',
  mainTextColor: 'burgundy',
  alignRight: true,
  dataTestId: 'quote-block-wrapper'
};

const mockTipTapQuote = { type: 'doc', id: 'quote', content: [{ type: 'paragraph' }] } as unknown as TipTapDoc;
const mockTipTapSource = { type: 'doc', id: 'source', content: [{ type: 'paragraph' }] } as unknown as TipTapDoc;

const renderQuote = (props: Partial<QuoteBlockProps> = {}) => {
  return render(<QuoteBlock {...defaultProps} {...props} />);
};

describe('QuoteBlock', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('String Rendering', () => {
    it('should render string quote text and source text inside Typography components', () => {
      renderQuote();

      expect(screen.getByTestId('Quote-textContainer--text')).toHaveTextContent('Test Quote');
      expect(screen.getByTestId('Quote-textContainer--source')).toHaveTextContent('title, 1 січня 2000, place');
      expect(screen.queryByTestId(/mock-tiptap/)).not.toBeInTheDocument();
    });

    const alignmentCases = [
      { scenario: 'left', alignRight: false, expectedStyle: 'text-align: left' },
      { scenario: 'right', alignRight: true, expectedStyle: 'text-align: right' }
    ];

    it.each(alignmentCases)(
      'should align text to $scenario (alignRight = $alignRight)',
      ({ alignRight, expectedStyle }) => {
        renderQuote({ alignRight });
        expect(screen.getByTestId('Quote-textContainer--text')).toHaveStyle(expectedStyle);
      }
    );

    it('should render safely when sourceText is omitted', () => {
      renderQuote({ quoteText: 'Цитата без джерела', sourceText: undefined });

      expect(screen.getByText('Цитата без джерела')).toBeInTheDocument();
      expect(screen.queryByTestId('Quote-textContainer--source')).not.toBeInTheDocument();
    });
  });

  describe('TipTap JSON Content Rendering', () => {
    const tiptapCases = [
      {
        scenario: 'quoteText',
        props: { quoteText: mockTipTapQuote, sourceText: undefined },
        expectedIds: ['mock-tiptap-quote', 'Quote-textContainer--text']
      },
      {
        scenario: 'sourceText',
        props: { quoteText: undefined, sourceText: mockTipTapSource },
        expectedIds: ['mock-tiptap-source', 'Quote-textContainer--source']
      },
      {
        scenario: 'both quoteText and sourceText',
        props: { quoteText: mockTipTapQuote, sourceText: mockTipTapSource },
        expectedIds: [
          'mock-tiptap-quote',
          'Quote-textContainer--text',
          'mock-tiptap-source',
          'Quote-textContainer--source'
        ]
      }
    ];

    it.each(tiptapCases)(
      'should correctly render TipTapContent when $scenario is a TipTapDoc',
      ({ props, expectedIds }) => {
        renderQuote(props);

        expectedIds.forEach((id) => {
          const element = screen.getByTestId(id);
          expect(element).toBeInTheDocument();

          if (id.includes('Quote-textContainer')) {
            expect(element).toHaveTextContent('Mocked TipTap Content');
          }
        });
      }
    );
  });

  describe('Container & Structure', () => {
    it('should apply the provided dataTestId to the root container', () => {
      renderQuote({ dataTestId: 'custom-root-id' });
      expect(screen.getByTestId('custom-root-id')).toBeInTheDocument();
    });

    it('should render the quote SVG icon', () => {
      renderQuote();
      expect(screen.getByTestId('icon-svg')).toBeInTheDocument();
    });
  });
});
