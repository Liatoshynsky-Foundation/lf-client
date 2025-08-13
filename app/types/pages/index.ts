import { Doc as TipTapDoc, Node as TipTapNode } from '~/validators/page2/tiptap.schema';

export interface FrontendElement {
  _id?: string;
  elementType: string;
  content: TipTapDoc;
}
export interface FrontendBlock {
  _id?: string;
  elements: FrontendElement[];
}
export interface FrontendPage {
  _id?: string;
  slug: string;
  title: string;
  status: string;
  blocks: FrontendBlock[];
  createdAt?: Date;
  updatedAt?: Date;
}

export type NodeVisitor = (node: TipTapNode) => TipTapNode;
