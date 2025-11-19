import { boldText, boldUnderlineText, linkText, makeDoc, normalText, TipTapTextNode } from './tiptapHelpers';
import { TipTapMarkType, TipTapNodeTypes } from '~/types/enums/common.enums';
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
});
