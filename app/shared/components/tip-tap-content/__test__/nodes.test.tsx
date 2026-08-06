import { render, screen } from '@testing-library/react';
import React from 'react';

import { getDoc, getHeading, getMultiLangText, getParagraph, getText, getTitledParagraph, renderData } from '../nodes';
import { TipTapNodeTypes } from '~/types/enums/common.enums';
import {
  HeadingNode,
  MultiLangNode,
  ParagraphNode,
  TextNode,
  TipTapDoc,
  TipTapMarkRenderers
} from '~/types/types/tiptap.types';
import { Variant } from '~/types/types/titleWithDescriptionComponent';

jest.mock('~/components/tip-tap-content/renderText', () => jest.fn(() => <span data-testid="rendered-text" />));
jest.mock('../multiLangText', () => jest.fn(() => <span data-testid="rendered-multilang" />));
jest.mock(
  '../../title-with-description/TitleWithDescription',
  () =>
    function MockTitleDesc() {
      return <div data-testid="title-with-description" />;
    }
);

describe('TipTap Nodes Renderers', () => {
  const mockMarkRenderers = {} as unknown as TipTapMarkRenderers;

  it('should evaluate getDoc function and return pass through children untouched', () => {
    const children = <div data-testid="child" />;
    const mockDocNode = { type: TipTapNodeTypes.doc, content: [] } as unknown as TipTapDoc;
    const result = getDoc(children, mockDocNode);
    expect(result).toBe(children);
  });

  it('should render heading with default h2 tier typography variant when level is completely missing', () => {
    const children = 'Heading Text';
    const mockHeadingNode = { type: TipTapNodeTypes.heading } as unknown as HeadingNode;
    const component = getHeading(children, mockHeadingNode);
    render(component);

    const heading = screen.getByText(children);
    expect(heading).toBeInTheDocument();
    expect(heading.tagName.toLowerCase()).toBe('h2');
  });

  it('should apply specific h4 typography layout tier variants based on attribute configurations', () => {
    const children = 'Heading 4 Text';
    const mockHeadingNode = { type: TipTapNodeTypes.heading, attrs: { level: 4 } } as unknown as HeadingNode;
    const component = getHeading(children, mockHeadingNode);
    render(component);

    const heading = screen.getByText(children);
    expect(heading.tagName.toLowerCase()).toBe('h4');
  });

  it('should return paragraph layout wrapper matching typography body2 specification rules', () => {
    const children = 'Paragraph Content';
    const mockParagraphNode = { type: TipTapNodeTypes.paragraph } as unknown as ParagraphNode;
    const component = getParagraph(children, mockParagraphNode);
    render(component);

    const para = screen.getByText(children);
    expect(para).toBeInTheDocument();
  });

  it('should construct titled paragraph wrapper high order components and inject generated doc payload structures', () => {
    const title = 'Custom Title';
    const dummyNode = { type: TipTapNodeTypes.paragraph, content: [] } as unknown as ParagraphNode;

    const titledParagraphFactory = getTitledParagraph('h1' as unknown as Variant, title);
    const component = titledParagraphFactory(null, dummyNode);
    render(component);

    expect(screen.getByTestId('title-with-description')).toBeInTheDocument();
  });

  it('should bypass internal mapping operations inside renderData and return input object instantly if type matches object format', () => {
    const staticDoc = { type: TipTapNodeTypes.doc, content: [] } as unknown as TipTapDoc;
    const result = renderData(staticDoc);
    expect(result).toBe(staticDoc);
  });

  it('should encapsulate raw plain string arguments inside full standard document node layouts', () => {
    const rawStringInput = 'Simple string text payload';
    const result = renderData(rawStringInput);

    expect(result.type).toBe(TipTapNodeTypes.doc);
    expect(Array.isArray(result.content)).toBe(true);
  });

  it('should wrap external plain text parser core logic handles seamlessly', () => {
    const dummyNode = { type: TipTapNodeTypes.text, text: 'text' } as unknown as TextNode;
    const textRenderer = getText(mockMarkRenderers);
    const component = textRenderer(dummyNode);
    render(component);

    expect(screen.getByTestId('rendered-text')).toBeInTheDocument();
  });

  it('should map localized translations multi language parser workflows directly to component layers', () => {
    const dummyNode = { type: TipTapNodeTypes.multiLangText, text: { en: 'hi' } } as unknown as MultiLangNode;
    const multiLangRenderer = getMultiLangText(mockMarkRenderers, 'en');
    const component = multiLangRenderer(dummyNode);
    render(component);

    expect(screen.getByTestId('rendered-multilang')).toBeInTheDocument();
  });
});
