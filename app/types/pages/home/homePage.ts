type TransformedImage = {
  readonly src: string;
  readonly alt: string;
  readonly caption?: string;
};

export type IntroSectionProps = {
  title: string;
  image: TransformedImage | null;
  quote: {
    readonly mainText: string;
    readonly sourceTitle: string;
  } | null;
};

export type FoundationInfoProps = {
  organisationBoldText: string;
  organisationMainText: string;
  mainText: string;
  textImage: string;
  foundationImage: TransformedImage | null;
};

export type OurMissionProps = {
  title: string;
  listItems: string[];
  smallImage: TransformedImage | null;
  bigImage: TransformedImage | null;
};

type GoalItem = {
  id: string;
  title: string;
  description: string;
};

export type OurGoalsProps = {
  mainTitle: string;
  goals: GoalItem[];
};

export type LiatoshynskyOfficeProps = {
  quote: {
    text: string;
    author: string;
  } | null;
};

export type WhatWeDoItem = {
  id: string;
  title: string;
  description: string;
};

export type WhatWeDoProps = {
  mainTitle: string;
  items: WhatWeDoItem[];
};

type FounderMember = {
  name: string;
  description: string;
  photo: string;
};

export type FoundationFoundersProps = {
  title: string;
  description: string;
  members: FounderMember[];
};
