import { getDocKey } from './getDocKey';
import { TipTapNodeTypes } from '~/types/enums/common.enums';
import type { ParagraphNode, TextNode, TipTapDoc } from '~/types/types/tiptap.types';

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
  it('should return trimmed text up to 50 chars', () => {
    expect(getDocKey(makeDoc(' Hello '))).toBe('Hello');
  });

  it('should return undefined for empty doc', () => {
    expect(getDocKey()).toBeUndefined();
    expect(getDocKey({ type: TipTapNodeTypes.doc, content: [] })).toBeUndefined();
  });

  it('should slice long text', () => {
    const longText = 'x'.repeat(100);
    expect(getDocKey(makeDoc(longText))).toHaveLength(50);
  });

  it('should resolve text fallback property from plain objects when rich text node array is missing', () => {
    const legacyPlainObject = { text: '  Fallback direct text  ' } as unknown as TipTapDoc;
    expect(getDocKey(legacyPlainObject)).toBe('Fallback direct text');
  });

  it('should return undefined if the text parameter evaluates to non string data types completely', () => {
    const structuralCorruptedObject = { text: 12345 } as unknown as TipTapDoc;
    expect(getDocKey(structuralCorruptedObject)).toBeUndefined();
  });

  it('should return undefined when nested inner structures are missing properties fields', () => {
    const incompleteDoc = {
      type: TipTapNodeTypes.doc,
      content: [{ type: TipTapNodeTypes.paragraph, content: [] }]
    } as unknown as TipTapDoc;
    expect(getDocKey(incompleteDoc)).toBeUndefined();
  });

  it('should fallback to doc.text if content structure exists but text is missing', () => {
    const docWithEmptyContent = {
      content: [{ content: [{ type: TipTapNodeTypes.text, text: undefined as unknown as string }] }],
      text: 'Backup Text'
    } as unknown as TipTapDoc;
    expect(getDocKey(docWithEmptyContent)).toBe('Backup Text');
  });

  it('should return undefined if structure exists but text is missing and fallback text is missing too', () => {
    const docWithNoTextAnywhere = {
      content: [{ content: [{ type: TipTapNodeTypes.text, text: undefined as unknown as string }] }]
    } as unknown as TipTapDoc;
    expect(getDocKey(docWithNoTextAnywhere)).toBeUndefined();
  });
});
