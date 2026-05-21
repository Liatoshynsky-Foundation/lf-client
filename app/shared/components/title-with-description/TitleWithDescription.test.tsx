'use client';

import { render, screen } from '@testing-library/react';
import React from 'react';

import TitleWithDescription from './TitleWithDescription';
import { TipTapNodeTypes } from '~/types/enums/common.enums';
import { TipTapDoc, TipTapElement } from '~/types/types/tiptap.types';

type MockTipTapContentProps = {
  data: (TipTapDoc & { id?: string }) | string;
  nodeRenderers?: Record<string, (children: React.ReactNode) => React.ReactNode>;
};

jest.mock('../tip-tap-content/nodes', () => ({
  renderData: jest.fn((input: unknown) => {
    if (typeof input === 'object' && input !== null) return input;
    return {
      type: TipTapNodeTypes.doc,
      id: 'description',
      content: [
        {
          type: TipTapNodeTypes.paragraph,
          content: [{ type: TipTapNodeTypes.text, text: String(input) }]
        }
      ]
    };
  })
}));

jest.mock('../tip-tap-content/TipTapContent', () => ({
  __esModule: true,
  default: ({ data, nodeRenderers }: MockTipTapContentProps) => {
    const ParagraphRenderer = nodeRenderers?.[TipTapNodeTypes.paragraph] || nodeRenderers?.['paragraph'];

    let textSnippet: unknown = '';
    let containerId = 'content';

    if (typeof data === 'string') {
      textSnippet = data;
    } else if (data && typeof data === 'object') {
      if ('id' in data && typeof data.id === 'string') containerId = data.id;
      if ('content' in data) {
        const firstBlock = data.content?.[0];
        if (firstBlock && typeof firstBlock === 'object' && 'content' in firstBlock) {
          const inlineNodes = (firstBlock as TipTapElement).content;
          if (Array.isArray(inlineNodes) && inlineNodes[0] && typeof inlineNodes[0] === 'object') {
            textSnippet = inlineNodes[0].text;
          }
        }
      }
    }

    const dummyText =
      typeof textSnippet === 'object' && textSnippet !== null
        ? (textSnippet as Record<string, string>).uk || (textSnippet as Record<string, string>).en || ''
        : (textSnippet as string) || 'Fallback Content';

    return (
      <div data-testid={`mock-tiptap-${containerId}`}>
        {ParagraphRenderer ? ParagraphRenderer(dummyText) : dummyText}
      </div>
    );
  }
}));

const mockTipTapTitle = {
  type: TipTapNodeTypes.doc,
  id: 'title',
  content: [
    {
      type: TipTapNodeTypes.paragraph,
      content: [{ type: TipTapNodeTypes.text, text: 'TipTap Mocked Title' }]
    }
  ]
} as unknown as TipTapDoc;

const mockTipTapDescription = {
  type: TipTapNodeTypes.doc,
  id: 'description',
  content: [
    {
      type: TipTapNodeTypes.paragraph,
      content: [{ type: TipTapNodeTypes.text, text: 'TipTap Mocked Description' }]
    }
  ]
} as unknown as TipTapDoc;

describe('TitleWithDescription', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Core Primitive/String Variants', () => {
    it('should cleanly render a basic string title and avoid mounting a description', () => {
      render(<TitleWithDescription variant="goals" title="Primitive Test Title" />);

      expect(screen.getByText('Primitive Test Title')).toBeInTheDocument();
      expect(screen.queryByTestId('mock-tiptap-description')).not.toBeInTheDocument();
    });

    it('should mount description pipeline when a string value is supplied', () => {
      render(<TitleWithDescription variant="goals" title="Static Title" description="Injected String Description" />);

      expect(screen.getByText('Static Title')).toBeInTheDocument();

      const descContainer = screen.getByTestId('mock-tiptap-description');
      expect(descContainer).toBeInTheDocument();
      expect(descContainer).toHaveTextContent('Injected String Description');
    });
  });

  describe('TipTap Object Structured Rendering', () => {
    const objectRenderingScenarios = [
      {
        scenario: 'only title is TipTap Doc structure',
        props: { title: mockTipTapTitle, description: undefined },
        expectedTexts: ['TipTap Mocked Title'],
        absentIds: ['mock-tiptap-description']
      },
      {
        scenario: 'both title and description are TipTap Doc structures',
        props: { title: mockTipTapTitle, description: mockTipTapDescription },
        expectedTexts: ['TipTap Mocked Title', 'TipTap Mocked Description'],
        absentIds: []
      }
    ];

    it.each(objectRenderingScenarios)(
      'should render perfectly when $scenario',
      ({ props, expectedTexts, absentIds }) => {
        render(<TitleWithDescription variant="whatWeDo" {...props} />);

        expectedTexts.forEach((text) => {
          expect(screen.getByText(text)).toBeInTheDocument();
        });

        absentIds.forEach((id) => {
          expect(screen.queryByTestId(id)).not.toBeInTheDocument();
        });
      }
    );
  });

  describe('Layout Parameters & Metadata pass-through', () => {
    it('should propagate dataTestId to the container element wrapper safely', () => {
      render(<TitleWithDescription variant="goals" title="Title" dataTestId="CustomTestAnchor" />);

      expect(screen.getByTestId('CustomTestAnchor')).toBeInTheDocument();
    });

    const runtimeVariants = [{ variantName: 'goals' }, { variantName: 'whatWeDo' }] as const;

    it.each(runtimeVariants)(
      'should complete render flow without compilation warnings for variant: $variantName',
      ({ variantName }) => {
        render(<TitleWithDescription variant={variantName} title="Fallback Title" />);
        expect(screen.getByText('Fallback Title')).toBeInTheDocument();
      }
    );
  });
});
