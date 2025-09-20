import { Breakpoint } from '@mui/material';
import { ReactNode } from 'react';

import { TipTapMarkType, TipTapNodeTypes } from '~/types/enums/common.enums';

export interface ElementSizes {
  width: Partial<Record<Breakpoint, number>>;
  height: Partial<Record<Breakpoint, number>>;
}

export type ButtonGroupSizeOptions = 'small' | 'big';
export type ButtonGroupPaletteOptions = 'primary' | 'secondary' | 'tertiary';

export type ScrollDirection = 'up' | 'down';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type Breakpoints = {
  isDesktop: boolean;
  isLaptopAndAbove: boolean;
  isLaptop: boolean;
  isTablet: boolean;
  isMobile: boolean;
};

export interface BoldMark {
  type: TipTapMarkType.bold;
}

export interface ItalicMark {
  type: TipTapMarkType.italic;
}

export interface UnderlineMark {
  type: TipTapMarkType.underline;
}

export interface LinkMark {
  type: TipTapMarkType.link;
  attrs?: { href?: string; target?: string; rel?: string; title?: string };
}

export type Mark = BoldMark | ItalicMark | UnderlineMark | LinkMark;

export interface TextNode {
  type: TipTapNodeTypes.text;
  text: string;
  marks?: Mark[];
}

export interface ParagraphNode {
  type: TipTapNodeTypes.paragraph;
  content?: TextNode[];
}

export interface HeadingNode {
  type: TipTapNodeTypes.heading;
  attrs?: { level?: 1 | 2 | 3 | 4 | 5 | 6 };
  content?: TextNode[];
}

export type TipTapElement = HeadingNode | ParagraphNode;

export interface TipTapDoc {
  type: TipTapNodeTypes.doc;
  content: TipTapElement[];
}

export type TipTapNode = TipTapDoc | HeadingNode | ParagraphNode | TextNode;

export interface TipTapNodeRenderers {
  [TipTapNodeTypes.doc]: (children: ReactNode, node: TipTapDoc) => ReactNode;
  [TipTapNodeTypes.heading]: (children: ReactNode, node: HeadingNode) => ReactNode;
  [TipTapNodeTypes.paragraph]: (children: ReactNode, node: ParagraphNode) => ReactNode;
  [TipTapNodeTypes.text]: (node: TextNode) => ReactNode;
}

export interface TipTapMarkRenderers {
  [TipTapMarkType.bold]: (children: ReactNode, mark: BoldMark) => ReactNode;
  [TipTapMarkType.italic]: (children: ReactNode, mark: ItalicMark) => ReactNode;
  [TipTapMarkType.underline]: (children: ReactNode, mark: UnderlineMark) => ReactNode;
  [TipTapMarkType.link]: (children: ReactNode, mark: LinkMark) => ReactNode;
}

export type ButtonData = {
  text: string;
  link: string;
  shortText?: string;
};

export type Currency = 'UAH' | 'USD' | 'EUR' | 'GBP';
export type DonateType = 'donation' | 'subscription';
