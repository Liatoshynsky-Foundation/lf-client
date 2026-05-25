import { TipTapMarkType, TipTapNodeTypes } from '~/types/enums/common.enums';
import { LocalizedString } from '~/types/types/common.types';
import { TipTapDoc } from '~/types/types/tiptap.types';

import {
  boldText,
  boldUnderlineText,
  extractTextFromTipTap,
  getPlainString,
  isTipTapDoc,
  linkText,
  makeDoc,
  normalText
} from '~/lib/utils/tiptapHelpers';

describe('tiptap.utils', () => {
  describe('Text Helpers (normalText, boldText, boldUnderlineText, linkText)', () => {
    test.each([
      {
        fn: () => normalText('hello'),
        expected: { type: TipTapNodeTypes.text, text: 'hello' },
        desc: 'normal text node'
      },
      {
        fn: () => boldText('hello'),
        expected: { type: TipTapNodeTypes.text, text: 'hello', marks: [{ type: TipTapMarkType.bold }] },
        desc: 'bold text node'
      },
      {
        fn: () => boldUnderlineText('hello'),
        expected: {
          type: TipTapNodeTypes.text,
          text: 'hello',
          marks: [{ type: TipTapMarkType.bold }, { type: TipTapMarkType.underline }]
        },
        desc: 'bold+underline text node'
      },
      {
        fn: () => linkText('Click me', 'https://example.com'),
        expected: {
          type: TipTapNodeTypes.text,
          text: 'Click me',
          marks: [
            { type: TipTapMarkType.link, attrs: { href: 'https://example.com' } },
            { type: TipTapMarkType.bold },
            { type: TipTapMarkType.underline }
          ]
        },
        desc: 'bold+underline link text node'
      }
    ])('should create a $desc', ({ fn, expected }) => {
      expect(fn()).toEqual(expected);
    });
  });

  describe('makeDoc', () => {
    it('should wrap nodes into a doc with a paragraph', () => {
      const nodes = [normalText('hi'), boldText('there')];
      expect(makeDoc(nodes)).toEqual<TipTapDoc>({
        type: TipTapNodeTypes.doc,
        content: [
          {
            type: TipTapNodeTypes.paragraph,
            content: [
              { type: TipTapNodeTypes.text, text: 'hi' },
              { type: TipTapNodeTypes.text, text: 'there', marks: [{ type: TipTapMarkType.bold }] }
            ]
          }
        ]
      });
    });
  });

  describe('isTipTapDoc', () => {
    test.each([
      { input: { type: 'doc', content: [] }, expected: true, desc: 'valid TipTapDoc-like object' },
      { input: null, expected: false, desc: 'null' },
      { input: undefined, expected: false, desc: 'undefined' },
      { input: 'string', expected: false, desc: 'primitive string' },
      { input: 123, expected: false, desc: 'primitive number' },
      { input: { content: [] }, expected: false, desc: 'objects missing the "type" property' }
    ])('should return $expected for $desc', ({ input, expected }) => {
      expect(isTipTapDoc(input)).toBe(expected);
    });
  });

  describe('getPlainString', () => {
    const localized: LocalizedString = { uk: 'Привіт', en: 'Hello' };
    const missingUk = { en: 'Hello' } as unknown as LocalizedString;

    test.each([
      { input: 'Standard String', locale: undefined, expected: 'Standard String', desc: 'string directly' },
      {
        input: 'Standard String',
        locale: 'en' as const,
        expected: 'Standard String',
        desc: 'string with explicit locale'
      },
      { input: localized, locale: undefined, expected: 'Привіт', desc: 'default "uk" locale' },
      { input: localized, locale: 'en' as const, expected: 'Hello', desc: 'requested "en" locale' },
      { input: missingUk, locale: 'uk' as const, expected: '', desc: 'empty fallback if locale missing' }
    ])('should return corrected text for $desc', ({ input, locale, expected }) => {
      expect(getPlainString(input, locale)).toBe(expected);
    });
  });

  describe('extractTextFromTipTap', () => {
    const localizedNode = { text: { uk: 'Укр текст', en: 'Eng text' } };
    const missingUkNode = { text: { en: 'Eng text' } };
    const deeplyNestedNode = {
      content: [
        { text: 'Hello ' },
        { content: [{ text: 'nested ' }] },
        { text: { uk: 'world', en: 'WORLD' } },
        { type: 'empty-node-without-text' }
      ]
    };

    test.each([
      { input: null, locale: undefined, expected: '', desc: 'null, undefined, or non-objects' },
      { input: undefined, locale: undefined, expected: '', desc: 'null, undefined, or non-objects' },
      { input: 'not an object', locale: undefined, expected: '', desc: 'null, undefined, or non-objects' },
      {
        input: { text: 'Plain text node' },
        locale: undefined,
        expected: 'Plain text node',
        desc: 'plain text properties'
      },
      { input: localizedNode, locale: undefined, expected: 'Укр текст', desc: 'localized object fallback to uk' },
      { input: localizedNode, locale: 'en' as const, expected: 'Eng text', desc: 'localized object targeting en' },
      { input: missingUkNode, locale: 'uk' as const, expected: '', desc: 'missing locale context' },
      {
        input: deeplyNestedNode,
        locale: 'uk' as const,
        expected: 'Hello nested world',
        desc: 'deeply nested array content (uk)'
      },
      {
        input: deeplyNestedNode,
        locale: 'en' as const,
        expected: 'Hello nested WORLD',
        desc: 'deeply nested array content (en)'
      },
      { input: { type: 'paragraph', marks: [] }, locale: undefined, expected: '', desc: 'objects lacking text fields' }
    ])('should handle $desc', ({ input, locale, expected }) => {
      expect(extractTextFromTipTap(input, locale)).toBe(expected);
    });
  });
});
