import { JSONContent } from '@tiptap/react';

import { TipTapDoc } from '~/types/types/tiptap.types';

export interface IImageBlock {
  src: string;
  alt: JSONContent | string;
  generatedSrc: string;
  caption?: JSONContent | string | null;
}

export interface IQuoteBlock {
  text: string;
  source: string;
}

export interface ITipTapQuoteBlock {
  text: string | TipTapDoc;
  source: string | TipTapDoc;
}

export interface IIntroSection {
  title: string | TipTapDoc;
  image: IImageBlock | null;
  quote: ITipTapQuoteBlock | null;
}

export interface IFoundationInfo {
  ourOrganisation: TipTapDoc;
  ourName: TipTapDoc;
  ourBelief: TipTapDoc;
  image: IImageBlock | null;
}

export interface IOurMission {
  title: string | TipTapDoc;
  list: TipTapDoc[];
  smallImage: IImageBlock | null;
  bigImage: IImageBlock | null;
}

export interface IOurGoals {
  title: string | TipTapDoc;
  goals: {
    title: string | TipTapDoc;
    description: string | TipTapDoc;
  }[];
}

export interface ILiatoshynskyOffice {
  quote: ITipTapQuoteBlock | null;
}

export interface IWhatWeDo {
  title: string | TipTapDoc;
  items: {
    title: string | TipTapDoc;
    description: string | TipTapDoc;
  }[];
}

export interface IFoundationFounders {
  titleText: TipTapDoc;
  listTitle: string | TipTapDoc;
  members: {
    photo: IImageBlock;
    name: string | TipTapDoc;
    description: string | TipTapDoc;
  }[];
}
