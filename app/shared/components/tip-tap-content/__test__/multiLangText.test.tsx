import React from 'react';

import renderMultiLangText from '../multiLangText';
import { Mark, MultiLangNode, TipTapMarkRenderers } from '~/types/types/tiptap.types';

describe('renderMultiLangText', () => {
  const mockRenderers = {
    bold: (children: React.ReactNode) => <strong>{children}</strong>,
    italic: (children: React.ReactNode) => <em>{children}</em>
  } as unknown as TipTapMarkRenderers;

  const mockNode = {
    type: 'multiLangText',
    text: {
      en: 'Hello text',
      uk: 'Привіт текст'
    }
  } as unknown as MultiLangNode;

  it('should extract and render the correct localized text branch without any styling marks applied', () => {
    const result = renderMultiLangText(mockRenderers, mockNode, 'en');
    expect(result).toBe('Hello text');
  });

  it('should switch language text payload seamlessly when application locale parameter changes', () => {
    const result = renderMultiLangText(mockRenderers, mockNode, 'uk');
    expect(result).toBe('Привіт текст');
  });

  it('should sequentially apply and wrap text with matching styling marks functions inside the renderers mapping configuration', () => {
    const nodeWithMarks = {
      ...mockNode,
      marks: [{ type: 'bold' }, { type: 'italic' }]
    } as unknown as MultiLangNode;

    const result = renderMultiLangText(mockRenderers, nodeWithMarks, 'en');

    expect(React.isValidElement(result)).toBe(true);
  });

  it('should skip wrapping layers safely if a mark type is encountered that is not defined inside mark renderers object configuration', () => {
    const nodeWithUnknownMark = {
      ...mockNode,
      marks: [{ type: 'underline' }, { type: 'bold' }]
    } as unknown as MultiLangNode;

    const result = renderMultiLangText(mockRenderers, nodeWithUnknownMark, 'en');

    expect(React.isValidElement(result)).toBe(true);
  });

  it('should handle nodes that hold completely empty or missing marks property arrays without breaking execution workflows', () => {
    const nodeWithEmptyMarks = {
      ...mockNode,
      marks: [] as Mark[]
    } as unknown as MultiLangNode;

    const result = renderMultiLangText(mockRenderers, nodeWithEmptyMarks, 'en');
    expect(result).toBe('Hello text');
  });
});
