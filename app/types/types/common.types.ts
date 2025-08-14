import { Breakpoint } from '@mui/material';

import { TipTapMarkType, TipTapNodeType } from '~/types/enums/common.enums';

export interface ElementSizes {
  width: Partial<Record<Breakpoint, number>>;
  height: Partial<Record<Breakpoint, number>>;
}

export type ButtonGroupSizeOptions = 'small' | 'big';
export type ButtonGroupPaletteOptions = 'primary' | 'secondary';

export type ScrollDirection = 'up' | 'down';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface BaseMark {
  type: string;
  attrs?: { [key: string]: unknown };
}

export interface BoldMark extends BaseMark {
  type: TipTapMarkType.bold;
}

export interface ItalicMark extends BaseMark {
  type: TipTapMarkType.italic;
}

export interface UnderlineMark extends BaseMark {
  type: TipTapMarkType.underline;
}

export interface LinkMark extends BaseMark {
  type: TipTapMarkType.link;
  attrs: {
    href: string;
    target?: '_blank' | '_self' | '_parent' | '_top';
    rel?: string;
  };
}

export type Mark = BoldMark | ItalicMark | UnderlineMark | LinkMark;

export interface BaseNode {
  type: string;
  attrs?: { [key: string]: never };
  content?: Node[];
  marks?: Mark[];
}

export interface DocumentNode extends BaseNode {
  type: TipTapNodeType.doc;
}

export interface HeadingNode extends BaseNode {
  type: TipTapNodeType.heading;
  level: 1 | 2 | 3 | 4 | 5 | 6;
}

export interface ParagraphNode extends BaseNode {
  type: TipTapNodeType.paragraph;
}

export interface TextNode extends BaseNode {
  type: TipTapNodeType.text;
  text: string;
}

export type Node = DocumentNode | HeadingNode | ParagraphNode | TextNode;

export type TipTapNodeTypes = {
  [TipTapNodeType.doc]: DocumentNode;
  [TipTapNodeType.heading]: HeadingNode;
  [TipTapNodeType.paragraph]: ParagraphNode;
  [TipTapNodeType.text]: TextNode;
};

export type TipTapNodeRenderers = {
  [T in TipTapNodeType]: (node: TipTapNodeTypes[T]) => React.ReactNode;
};

export type TipTapMarkRenderers = {
  [T in TipTapMarkType]: (children: React.ReactNode) => React.ReactNode;
};
