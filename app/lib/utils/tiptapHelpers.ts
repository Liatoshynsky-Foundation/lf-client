import { TipTapMarkType, TipTapNodeTypes } from '~/types/enums/common.enums';
import { LocalizedString } from '~/types/types/common.types';
import { TipTapDoc } from '~/types/types/tiptap.types';

import { RichContent } from '~/shared/components/design-system/all-components/content-block/ContentBlock';

type ParagraphNode = Extract<TipTapDoc['content'][number], { type: TipTapNodeTypes.paragraph }>;

export interface LocalizedTipTap {
  uk: TipTapDoc;
  en: TipTapDoc;
}

export type TipTapTextNode = NonNullable<ParagraphNode['content']>[number];

type GetPlainString = (content: string | LocalizedString, locale?: 'uk' | 'en') => string;

type ExtractTextFromTipTap = (node: unknown, locale?: 'uk' | 'en') => string;

export const isTipTapDoc = (content: unknown): content is TipTapDoc => {
  return typeof content === 'object' && content !== null && 'type' in content;
};

export const getPlainString: GetPlainString = (content, locale = 'uk') => {
  if (typeof content === 'string') {
    return content;
  }
  return content[locale] || '';
};

export const extractTextFromTipTap: ExtractTextFromTipTap = (node, locale = 'uk') => {
  if (typeof node !== 'object' || node === null) return '';

  if ('text' in node) {
    const textVal = node.text;
    if (typeof textVal === 'string') return textVal;

    if (typeof textVal === 'object' && textVal !== null) {
      return (textVal as Record<string, string>)[locale] || '';
    }
  }

  if ('content' in node && Array.isArray(node.content)) {
    return (node as { content: unknown[] }).content.map((child) => extractTextFromTipTap(child, locale)).join('');
  }

  return '';
};

export const makeDoc = (content: TipTapTextNode[]): TipTapDoc => ({
  type: TipTapNodeTypes.doc,
  content: [
    {
      type: TipTapNodeTypes.paragraph,
      content
    }
  ]
});

export const parseTipTapString = (data: RichContent) => {
  let parsedData = data;
  if (typeof data === 'string' && data.startsWith('{"type":"doc"')) {
    try {
      parsedData = JSON.parse(data);
    } catch {
      return data;
    }
  }

  return parsedData;
};

export const createTipTapDocFromText = (text: string): TipTapDoc => ({
  type: TipTapNodeTypes.doc,
  content: text
    ? [
        {
          type: TipTapNodeTypes.paragraph,
          content: [{ type: TipTapNodeTypes.text, text }]
        }
      ]
    : []
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

export const parseDescription = (desc?: string | null): TipTapDoc | string | null => {
  if (!desc || desc.trim().length === 0) return null;
  try {
    return JSON.parse(desc) as TipTapDoc;
  } catch {
    return desc;
  }
};
