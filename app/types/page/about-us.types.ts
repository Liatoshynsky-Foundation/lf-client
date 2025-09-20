import { TipTapDoc } from '~/types/types/common.types';

export interface IImageBlock {
  src: string;
  alt: string;
  caption?: string | null;
}

export interface IQuoteBlock {
  text: string;
  source: string;
}

export interface IIntroSection {
  title: string;
  image: IImageBlock | null;
  quote: IQuoteBlock | null;
}

export interface IFoundationInfo {
  ourOrganisation: TipTapDoc;
  ourName: TipTapDoc;
  ourBelief: TipTapDoc;
  image: IImageBlock | null;
}

export interface IOurMission {
  title: string;
  list: TipTapDoc[];
  smallImage: IImageBlock | null;
  bigImage: IImageBlock | null;
}

export interface IOurGoals {
  title: string;
  goals: {
    title: string;
    description: TipTapDoc;
  }[];
}

export interface ILiatoshynskyOffice {
  quote: IQuoteBlock | null;
}

export interface IWhatWeDo {
  title: string;
  items: {
    title: string;
    description: TipTapDoc;
  }[];
}

export interface IFoundationFounders {
  titleText: TipTapDoc;
  listTitle: string;
  members: {
    photo: IImageBlock;
    name: string;
    description: string;
  }[];
}

export interface IAboutUsPage {
  slug: string;
  title: string;
  status: string;
  blocks: {
    IntroSection: IIntroSection;
    FoundationInfo: IFoundationInfo;
    OurMission: IOurMission;
    OurGoals: IOurGoals;
    LiatoshynskyOffice: ILiatoshynskyOffice;
    WhatWeDo: IWhatWeDo;
    FoundationFounders: IFoundationFounders;
  };
}
