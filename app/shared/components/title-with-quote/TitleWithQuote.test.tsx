import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';

import TitleWithQuote from './TitleWithQuote';
import { TipTapNodeTypes } from '~/types/enums/common.enums';

jest.mock('~/components/Quote/Quote', () => {
  const MockQuote = () => <div data-testid="quote" />;
  MockQuote.displayName = 'MockQuote';
  return MockQuote;
});

jest.mock('~/shared/components/tip-tap-content/TipTapContent', () => {
  return function MockTipTapContent({ nodeRenderers }: any) {
    const ParagraphRenderer = nodeRenderers[TipTapNodeTypes.paragraph];
    return <div data-testid="mock-tiptap">{ParagraphRenderer ? ParagraphRenderer('Rendered TipTap Title') : null}</div>;
  };
});

describe('TitleWithQuote Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the correct title', () => {
    render(<TitleWithQuote title="Test title" quoteText="Test quote" sourceText="Letter from Borys Liatoshinsky" />);

    expect(screen.getByText('Test title')).toBeInTheDocument();
    expect(screen.getByTestId('quote')).toBeInTheDocument();
    expect(screen.queryByTestId('mock-tiptap')).not.toBeInTheDocument();
  });

  it('should correctly handle empty values', () => {
    render(<TitleWithQuote />);
    expect(screen.getByTestId('TitleWithQuote-title')).toBeEmptyDOMElement();
  });

  it('should render TipTapContent if data.title is a TipTapDoc object', () => {
    const mockData = {
      title: { type: 'doc', content: [] } as any,
      quoteText: 'Test quote from db',
      sourceText: 'Letter from Borys Liatoshinsky from db'
    };

    render(<TitleWithQuote data={mockData} color="brown" quoteSectionSx={{ mt: 2 }} />);

    expect(screen.getByTestId('mock-tiptap')).toBeInTheDocument();

    expect(screen.getByText('Rendered TipTap Title')).toBeInTheDocument();
  });
});
