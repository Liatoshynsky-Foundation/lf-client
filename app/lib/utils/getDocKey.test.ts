import { getDocKey } from './getDocKey';
import { TipTapNodeTypes } from '~/types/enums/common.enums';
import type { ParagraphNode, TextNode, TipTapDoc } from '~/types/types/common.types';

const makeTextNode = (text: string): TextNode => ({
  type: TipTapNodeTypes.text,
  text
});

const makeParagraph = (text: string): ParagraphNode => ({
  type: TipTapNodeTypes.paragraph,
  content: [makeTextNode(text)]
});

const makeDoc = (text: string): TipTapDoc => ({
  type: TipTapNodeTypes.doc,
  content: [makeParagraph(text)]
});

describe('getDocKey', () => {
  it('returns trimmed text up to 50 chars', () => {
    expect(getDocKey(makeDoc(' Hello '))).toBe('Hello');
  });

  it('returns undefined for empty doc', () => {
    expect(getDocKey(undefined)).toBeUndefined();
    expect(getDocKey({ type: TipTapNodeTypes.doc, content: [] })).toBeUndefined();
  });

  it('slices long text', () => {
    const longText = 'x'.repeat(100);
    expect(getDocKey(makeDoc(longText))).toHaveLength(50);
  });
});
