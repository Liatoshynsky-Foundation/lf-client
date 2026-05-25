import {
  boldText,
  boldUnderlineText,
  extractTextFromTipTap,
  getPlainString,
  isTipTapDoc,
  linkText,
  makeDoc,
  normalText,
  TipTapTextNode
} from './tiptapHelpers';
import { TipTapMarkType, TipTapNodeTypes } from '~/types/enums/common.enums';
import { LocalizedString } from '~/types/types/common.types';
import { Mark, TipTapDoc } from '~/types/types/tiptap.types';

describe('tiptap.utils', () => {
  const createTextNode = (text: string, marks?: Mark[]): TipTapTextNode => ({
    type: TipTapNodeTypes.text,
    text,
    ...(marks && { marks })
  });

  const localizedMock: LocalizedString = { uk: 'Привіт', en: 'Hello' };
  const multiLangNodeMock = { text: { uk: 'Укр текст', en: 'Eng text' } };

  describe('Node Creation Helpers (normal, bold, boldUnderline, link)', () => {
    it('should create expected text nodes with correct markup modifiers', () => {
      expect(normalText('hello')).toEqual(createTextNode('hello'));

      expect(boldText('hello')).toEqual(createTextNode('hello', [{ type: TipTapMarkType.bold }]));

      expect(boldUnderlineText('hello')).toEqual(
        createTextNode('hello', [{ type: TipTapMarkType.bold }, { type: TipTapMarkType.underline }])
      );

      expect(linkText('Click me', 'https://example.com')).toEqual(
        createTextNode('Click me', [
          { type: TipTapMarkType.link, attrs: { href: 'https://example.com' } },
          { type: TipTapMarkType.bold },
          { type: TipTapMarkType.underline }
        ])
      );
    });
  });

  describe('makeDoc', () => {
    it('should wrap nodes into a doc with a paragraph container', () => {
      const doc = makeDoc([normalText('hi'), boldText('there')]);

      const expected: TipTapDoc = {
        type: TipTapNodeTypes.doc,
        content: [
          {
            type: TipTapNodeTypes.paragraph,
            content: [createTextNode('hi'), createTextNode('there', [{ type: TipTapMarkType.bold }])]
          }
        ]
      };
      expect(doc).toEqual(expected);
    });
  });

  describe('isTipTapDoc', () => {
    it.each([
      [true, { type: 'doc', content: [] }, 'valid document-like objects'],
      [false, null, 'null references'],
      [false, undefined, 'undefined references'],
      [false, 'string', 'string primitives'],
      [false, 123, 'number primitives'],
      [false, { content: [] }, 'objects missing a type field']
    ])('should return %s for %s', (expected, input, _description) => {
      expect(isTipTapDoc(input)).toBe(expected);
    });
  });

  describe('getPlainString', () => {
    it('should fall back to raw string or fetch specific language translations', () => {
      expect(getPlainString('Standard String')).toBe('Standard String');
      expect(getPlainString('Standard String', 'en')).toBe('Standard String');

      expect(getPlainString(localizedMock)).toBe('Привіт'); // Defaults to uk
      expect(getPlainString(localizedMock, 'en')).toBe('Hello');

      const partialObj = { en: 'Hello' } as unknown as LocalizedString;
      expect(getPlainString(partialObj, 'uk')).toBe('');
    });
  });

  describe('extractTextFromTipTap', () => {
    it.each([
      ['', null, 'uk', 'null entries'],
      ['', undefined, 'uk', 'undefined entries'],
      ['', 'not an object', 'uk', 'plain non-object primitives'],
      ['', { type: 'p', marks: [] }, 'uk', 'valid nodes without explicit text elements'],
      ['Plain text node', { text: 'Plain text node' }, 'uk', 'flat native text properties']
    ])('should return "%s" for %s', (expected, input, locale, _description) => {
      expect(extractTextFromTipTap(input, locale as 'uk' | 'en')).toBe(expected);
    });

    it('should extract localized configurations based on structural locale requests', () => {
      expect(extractTextFromTipTap(multiLangNodeMock)).toBe('Укр текст'); // Defaults to uk
      expect(extractTextFromTipTap(multiLangNodeMock, 'en')).toBe('Eng text');

      const partialTextNode = { text: { en: 'Eng text' } };
      expect(extractTextFromTipTap(partialTextNode, 'uk')).toBe('');
    });

    it('should recursively crawl and aggregate deep content nodes together', () => {
      const deeplyNestedNode = {
        content: [
          { text: 'Hello ' },
          { content: [{ text: 'nested ' }] },
          { text: { uk: 'world', en: 'WORLD' } },
          { type: 'empty-node-without-text' }
        ]
      };

      expect(extractTextFromTipTap(deeplyNestedNode, 'uk')).toBe('Hello nested world');
      expect(extractTextFromTipTap(deeplyNestedNode, 'en')).toBe('Hello nested WORLD');
    });
  });
});
