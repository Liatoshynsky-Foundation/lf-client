import { render, screen } from '@testing-library/react';
import React from 'react';

import { PolicyContent } from './PolicyContent';
import { TipTapNodeTypes } from '~/types/enums/common.enums';
import { TipTapDoc, TipTapNodeRenderers } from '~/types/types/tiptap.types';

jest.mock('~/components/tip-tap-content/TipTapContent', () => {
  return {
    __esModule: true,
    default: ({ nodeRenderers }: { data: TipTapDoc; nodeRenderers?: Partial<TipTapNodeRenderers> }) => {
      const Paragraph = nodeRenderers?.paragraph ?? ((children: React.ReactNode) => <p>{children}</p>);

      return (
        <div data-testid="mock-tiptap">
          {Paragraph('Mocked content', { type: TipTapNodeTypes.paragraph, content: [] })}
        </div>
      );
    }
  };
});

describe('PolicyContent', () => {
  it('should render nothing if doc is null', () => {
    const { container } = render(<PolicyContent doc={null as unknown as TipTapDoc} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('should render content inside Typography with paragraphSx styles', () => {
    const fakeDoc: TipTapDoc = { type: TipTapNodeTypes.doc, content: [] };
    render(<PolicyContent doc={fakeDoc} paragraphSx={{ color: 'red' }} />);

    const tiptap = screen.getByTestId('mock-tiptap');
    expect(tiptap).toBeInTheDocument();

    const typography = screen.getByText('Mocked content');
    expect(typography.tagName).toBe('DIV');
    expect(typography).toHaveStyle('color: red');
    expect(typography).toHaveStyle('display: block');
  });

  it('should always set display: block even without paragraphSx', () => {
    const fakeDoc: TipTapDoc = { type: TipTapNodeTypes.doc, content: [] };
    render(<PolicyContent doc={fakeDoc} />);

    const typography = screen.getByText('Mocked content');
    expect(typography).toHaveStyle('display: block');
  });
});
