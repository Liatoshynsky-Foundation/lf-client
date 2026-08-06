import { JSONContent } from '@tiptap/react';

import { TipTapDoc } from '~/types/types/tiptap.types';

import type { CropRect } from '~/lib/utils/cropUtils';

export interface IImageBlock {
  src: string;
  alt: JSONContent | string;
  generatedSrc: string;
  caption?: JSONContent | string | null;
  crop?: CropRect | null;
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
  title?: string | TipTapDoc;
  ourOrganisation: TipTapDoc;
  ourName: TipTapDoc;
  ourBelief: TipTapDoc;
  image: IImageBlock | null;
  hidden?: boolean;
}

export interface IOurMission {
  title: string | TipTapDoc;
  list: TipTapDoc[];
  smallImage: IImageBlock | null;
  bigImage: IImageBlock | null;
  hidden?: boolean;
}

export interface IOurGoals {
  title: string | TipTapDoc;
  goals: {
    title: string | TipTapDoc;
    description: string | TipTapDoc;
  }[];
  hidden?: boolean;
}

export interface ILiatoshynskyOffice {
  quote: ITipTapQuoteBlock | null;
  hidden?: boolean;
}

export interface IWhatWeDo {
  title: string | TipTapDoc;
  items: {
    title: string | TipTapDoc;
    description: string | TipTapDoc;
  }[];
  hidden?: boolean;
}

export interface IFoundationFounders {
  titleText: TipTapDoc;
  listTitle: string | TipTapDoc;
  members: {
    photo: IImageBlock;
    name: string | TipTapDoc;
    description: string | TipTapDoc;
  }[];
  hidden?: boolean;
}
