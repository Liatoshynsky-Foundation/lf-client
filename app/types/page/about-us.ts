import { TipTapContent } from '~/validators/pagesSchemas/tiptap.schema';

type TransformedImage = {
  src: string;
  alt: string;
  caption?: string;
};

export type IntroSectionProps = {
  title: string;
  image: TransformedImage | null;
  quote: {
    text: string;
    source: string;
  } | null;
};

export type FoundationInfoProps = {
  ourOrganisation: TipTapContent;
  ourName: TipTapContent;
  ourBelief: TipTapContent;
  image: TransformedImage | null;
};

export type OurMissionProps = {
  title: string;
  list: TipTapContent[];
  smallImage: TransformedImage | null;
  bigImage: TransformedImage | null;
};

type GoalItem = {
  title: string;
  description: TipTapContent;
};

export type OurGoalsProps = {
  title: string;
  goals: GoalItem[];
};

export type LiatoshynskyOfficeProps = {
  quote: {
    text: string;
    source: string;
  } | null;
};

export type WhatWeDoItem = {
  title: string;
  description: TipTapContent;
};

export type WhatWeDoProps = {
  title: string;
  items: WhatWeDoItem[];
};

type FounderMember = {
  name: string;
  description: string;
  photo: string;
};

export type FoundationFoundersProps = {
  titleText: TipTapContent;
  listTitle: string;
  members: FounderMember[];
};
