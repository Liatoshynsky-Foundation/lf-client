import { TipTapMarkType, TipTapNodeTypes } from '~/types/enums/common.enums';
import { TipTapDoc } from '~/types/types/tiptap.types';

type ParagraphNode = Extract<TipTapDoc['content'][number], { type: TipTapNodeTypes.paragraph }>;

export type TipTapTextNode = NonNullable<ParagraphNode['content']>[number];

export const makeDoc = (content: TipTapTextNode[]): TipTapDoc => ({
  type: TipTapNodeTypes.doc,
  content: [
    {
      type: TipTapNodeTypes.paragraph,
      content
    }
  ]
});

export const normalText = (text: string): TipTapTextNode =>
  ({
    type: TipTapNodeTypes.text,
    text
  }) as TipTapTextNode;

export const boldText = (text: string): TipTapTextNode =>
  ({
    type: TipTapNodeTypes.text,
    marks: [{ type: TipTapMarkType.bold }],
    text
  }) as TipTapTextNode;

export const boldUnderlineText = (text: string): TipTapTextNode =>
  ({
    type: TipTapNodeTypes.text,
    marks: [{ type: TipTapMarkType.bold }, { type: TipTapMarkType.underline }],
    text
  }) as TipTapTextNode;

export const linkText = (text: string, href: string): TipTapTextNode => ({
  type: TipTapNodeTypes.text,
  text,
  marks: [
    {
      type: TipTapMarkType.link,
      attrs: { href }
    },
    {
      type: TipTapMarkType.bold
    },
    {
      type: TipTapMarkType.underline
    }
  ]
});
