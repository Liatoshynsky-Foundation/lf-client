import React from 'react';

import renderText from '../renderText';
import { Mark, TextNode, TipTapMarkRenderers } from '~/types/types/tiptap.types';

describe('renderText', () => {
  const mockRenderers = {
    bold: (children: React.ReactNode) => <strong>{children}</strong>,
    italic: (children: React.ReactNode) => <em>{children}</em>
  } as unknown as TipTapMarkRenderers;

  it('should render plain text content without wraps when marks array is completely missing', () => {
    const rawTextNode = {
      type: 'text',
      text: 'Simple plain text content'
    } as unknown as TextNode;

    const result = renderText(mockRenderers, rawTextNode);
    expect(result).toBe('Simple plain text content');
  });

  it('should sequentially apply style wrapping functions from configuration mapping to text payload content', () => {
    const textNodeWithMarks = {
      type: 'text',
      text: 'Styled content text',
      marks: [{ type: 'bold' }, { type: 'italic' }] as Mark[]
    } as unknown as TextNode;

    const result = renderText(mockRenderers, textNodeWithMarks);
    expect(React.isValidElement(result)).toBe(true);
  });

  it('should skip wrapping logic step safely if mark type mapping resolves to undefined renderer method function', () => {
    const textNodeWithUnknownMarks = {
      type: 'text',
      text: 'Skipped styles text content',
      marks: [{ type: 'underline' }, { type: 'bold' }] as Mark[]
    } as unknown as TextNode;

    const result = renderText(mockRenderers, textNodeWithUnknownMarks);
    expect(React.isValidElement(result)).toBe(true);
  });
});
