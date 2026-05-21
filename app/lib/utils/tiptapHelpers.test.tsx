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
import { TipTapDoc } from '~/types/types/tiptap.types';

describe('tiptap.utils', () => {
  describe('normalText', () => {
    it('should create a normal text node', () => {
      const node = normalText('hello');
      expect(node).toEqual<TipTapTextNode>({
        type: TipTapNodeTypes.text,
        text: 'hello'
      });
    });
  });

  describe('boldText', () => {
    it('should create a bold text node', () => {
      const node = boldText('hello');
      expect(node).toEqual<TipTapTextNode>({
        type: TipTapNodeTypes.text,
        text: 'hello',
        marks: [{ type: TipTapMarkType.bold }]
      });
    });
  });

  describe('boldUnderlineText', () => {
    it('should create a bold+underline text node', () => {
      const node = boldUnderlineText('hello');
      expect(node).toEqual<TipTapTextNode>({
        type: TipTapNodeTypes.text,
        text: 'hello',
        marks: [{ type: TipTapMarkType.bold }, { type: TipTapMarkType.underline }]
      });
    });
  });

  describe('linkText', () => {
    it('should create a bold+underline link text node', () => {
      const node = linkText('Click me', 'https://example.com');
      expect(node).toEqual<TipTapTextNode>({
        type: TipTapNodeTypes.text,
        text: 'Click me',
        marks: [
          {
            type: TipTapMarkType.link,
            attrs: { href: 'https://example.com' }
          },
          { type: TipTapMarkType.bold },
          { type: TipTapMarkType.underline }
        ]
      });
    });
  });

  describe('makeDoc', () => {
    it('should wrap nodes into a doc with a paragraph', () => {
      const nodes = [normalText('hi'), boldText('there')];
      const doc = makeDoc(nodes);

      const expected: TipTapDoc = {
        type: TipTapNodeTypes.doc,
        content: [
          {
            type: TipTapNodeTypes.paragraph,
            content: [
              {
                type: TipTapNodeTypes.text,
                text: 'hi'
              },
              {
                type: TipTapNodeTypes.text,
                text: 'there',
                marks: [{ type: TipTapMarkType.bold }]
              }
            ]
          }
        ]
      };

      expect(doc).toEqual(expected);
    });
  });

  describe('isTipTapDoc', () => {
    it('should return true for a valid TipTapDoc-like object', () => {
      expect(isTipTapDoc({ type: 'doc', content: [] })).toBe(true);
    });

    it('should return false for null or undefined', () => {
      expect(isTipTapDoc(null)).toBe(false);
      expect(isTipTapDoc(undefined)).toBe(false);
    });

    it('should return false for primitive values', () => {
      expect(isTipTapDoc('string')).toBe(false);
      expect(isTipTapDoc(123)).toBe(false);
    });

    it('should return false for objects missing the "type" property', () => {
      expect(isTipTapDoc({ content: [] })).toBe(false);
    });
  });

  describe('getPlainString', () => {
    it('should return the string immediately if input is a string', () => {
      expect(getPlainString('Standard String')).toBe('Standard String');
      expect(getPlainString('Standard String', 'en')).toBe('Standard String');
    });

    it('should return the "uk" localized string by default', () => {
      const localized: LocalizedString = { uk: 'Привіт', en: 'Hello' };
      expect(getPlainString(localized)).toBe('Привіт');
    });

    it('should return the specified locale string if requested', () => {
      const localized: LocalizedString = { uk: 'Привіт', en: 'Hello' };
      expect(getPlainString(localized, 'en')).toBe('Hello');
    });

    it('should fallback to an empty string if the requested locale is missing', () => {
      const localized = { en: 'Hello' } as unknown as LocalizedString;
      expect(getPlainString(localized, 'uk')).toBe('');
    });
  });

  describe('extractTextFromTipTap', () => {
    it('should return an empty string for null, undefined, or non-objects', () => {
      expect(extractTextFromTipTap(null)).toBe('');
      expect(extractTextFromTipTap(undefined)).toBe('');
      expect(extractTextFromTipTap('not an object')).toBe('');
    });

    it('should return standard string text directly from the "text" property', () => {
      expect(extractTextFromTipTap({ text: 'Plain text node' })).toBe('Plain text node');
    });

    it('should resolve localized text objects inside the "text" property (default uk)', () => {
      const node = { text: { uk: 'Укр текст', en: 'Eng text' } };
      expect(extractTextFromTipTap(node)).toBe('Укр текст');
    });

    it('should resolve localized text objects inside the "text" property (specific locale)', () => {
      const node = { text: { uk: 'Укр текст', en: 'Eng text' } };
      expect(extractTextFromTipTap(node, 'en')).toBe('Eng text');
    });

    it('should fallback to an empty string if localized text is missing the requested locale', () => {
      const node = { text: { en: 'Eng text' } };
      expect(extractTextFromTipTap(node, 'uk')).toBe('');
    });

    it('should recursively extract and concatenate text from a deeply nested "content" array', () => {
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

    it('should return an empty string if the object is valid but has no text or content array', () => {
      expect(extractTextFromTipTap({ type: 'paragraph', marks: [] })).toBe('');
    });
  });
});
