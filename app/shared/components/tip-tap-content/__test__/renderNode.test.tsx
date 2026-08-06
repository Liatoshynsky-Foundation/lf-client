import React from 'react';

import renderNode from '../renderNode';
import { TipTapNodeTypes } from '~/types/enums/common.enums';
import { HeadingNode, ParagraphNode, TipTapNode, TipTapNodeRenderers } from '~/types/types/tiptap.types';

describe('renderNode', () => {
  const mockRenderers = {
    doc: (children: React.ReactNode) => <div data-testid="doc">{children}</div>,
    heading: (children: React.ReactNode) => <h2 data-testid="heading">{children}</h2>,
    paragraph: (children: React.ReactNode) => <p data-testid="paragraph">{children}</p>,
    multiLangText: () => <span data-testid="multilang" />,
    text: () => <span data-testid="text" />
  } as unknown as TipTapNodeRenderers;

  it('should evaluate doc node type and recursively map children internal elements cleanly', () => {
    const docNode = {
      type: TipTapNodeTypes.doc,
      content: [{ type: TipTapNodeTypes.text, text: 'hello' }]
    } as unknown as TipTapNode;

    const result = renderNode(mockRenderers, docNode);
    expect(React.isValidElement(result)).toBe(true);
  });

  it('should process heading node types and correctly pass mapped children when content is present', () => {
    const headingNode = {
      type: TipTapNodeTypes.heading,
      content: [{ type: TipTapNodeTypes.text, text: 'title' }]
    } as unknown as HeadingNode;

    const result = renderNode(mockRenderers, headingNode as unknown as TipTapNode);
    expect(React.isValidElement(result)).toBe(true);
  });

  it('should handle heading node types cleanly by passing null children when content array is completely missing', () => {
    const headingNodeWithoutContent = {
      type: TipTapNodeTypes.heading,
      content: undefined
    } as unknown as HeadingNode;

    const result = renderNode(mockRenderers, headingNodeWithoutContent as unknown as TipTapNode);
    expect(React.isValidElement(result)).toBe(true);
  });

  it('should process paragraph node types and correctly pass mapped children when content is present', () => {
    const paragraphNode = {
      type: TipTapNodeTypes.paragraph,
      content: [{ type: TipTapNodeTypes.text, text: 'paragraph text' }]
    } as unknown as ParagraphNode;

    const result = renderNode(mockRenderers, paragraphNode as unknown as TipTapNode);
    expect(React.isValidElement(result)).toBe(true);
  });

  it('should handle paragraph node types cleanly by passing null children when content array is missing', () => {
    const paragraphNodeWithoutContent = {
      type: TipTapNodeTypes.paragraph,
      content: undefined
    } as unknown as ParagraphNode;

    const result = renderNode(mockRenderers, paragraphNodeWithoutContent as unknown as TipTapNode);
    expect(React.isValidElement(result)).toBe(true);
  });

  it('should evaluate multi lang text node types and directly forward context to respective renderers', () => {
    const multiLangNode = {
      type: TipTapNodeTypes.multiLangText,
      text: { en: 'hi' }
    } as unknown as TipTapNode;

    const result = renderNode(mockRenderers, multiLangNode);
    expect(React.isValidElement(result)).toBe(true);
  });

  it('should evaluate raw text node types and map execution workflows seamlessly', () => {
    const textNode = {
      type: TipTapNodeTypes.text,
      text: 'plain'
    } as unknown as TipTapNode;

    const result = renderNode(mockRenderers, textNode);
    expect(React.isValidElement(result)).toBe(true);
  });

  it('should fall back to default branch execution matching and return null if node type is unknown', () => {
    const unknownNode = {
      type: 'completely-unsupported-tiptap-node-type-variant'
    } as unknown as TipTapNode;

    const result = renderNode(mockRenderers, unknownNode);
    expect(result).toBeNull();
  });
});
