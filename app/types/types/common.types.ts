import { Breakpoint, TypographyProps } from '@mui/material';
import { ReactNode } from 'react';

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
  attrs?: { [key: string]: unknown };
  content?: Node[];
  marks?: Mark[];
}

export interface DocumentNode extends BaseNode {
  type: TipTapNodeType.doc;
}

export interface HeadingNode extends BaseNode {
  type: TipTapNodeType.heading;
  attrs: {
    level: number;
  };
}

export interface ParagraphNode extends BaseNode {
  type: TipTapNodeType.paragraph;
}

export interface TextNode extends BaseNode {
  type: TipTapNodeType.text;
  text: string;
}

export type Node = DocumentNode | HeadingNode | ParagraphNode | TextNode;

export type TipTapNodeRenderers = {
  [TipTapNodeType.doc]: (node: DocumentNode, props: TypographyProps) => ReactNode;
  [TipTapNodeType.heading]: (node: HeadingNode, props: TypographyProps) => ReactNode;
  [TipTapNodeType.paragraph]: (node: ParagraphNode, props: TypographyProps) => ReactNode;
  [TipTapNodeType.text]: (node: TextNode) => ReactNode;
};

export type TipTapMarkRenderers = {
  [TipTapMarkType.bold]: (children: ReactNode, mark: BoldMark) => ReactNode;
  [TipTapMarkType.italic]: (children: ReactNode, mark: ItalicMark) => ReactNode;
  [TipTapMarkType.underline]: (children: ReactNode, mark: UnderlineMark) => ReactNode;
  [TipTapMarkType.link]: (children: ReactNode, mark: LinkMark) => ReactNode;
};
