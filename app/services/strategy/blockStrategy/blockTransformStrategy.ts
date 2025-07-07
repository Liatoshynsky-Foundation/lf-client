import { Locale } from 'next-intl';

import {
  transformFoundationFounders,
  transformFoundationInfo,
  transformIntroSection,
  transformLiatoshynskyOffice,
  transformOurGoals,
  transformOurMission,
  transformWhatWeDo
} from '~/services/strategy/blockStrategy/homePage/transformer';
import { AnyBlock } from '~/validators/page/blocks/anyBlock.schema';

export const blockTransformers: Record<string, (block: AnyBlock, locale: Locale) => any> = {
  IntroSection: transformIntroSection,
  FoundationInfo: transformFoundationInfo,
  OurMission: transformOurMission,
  OurGoals: transformOurGoals,
  LiatoshynskyOffice: transformLiatoshynskyOffice,
  WhatWeDo: transformWhatWeDo,
  FoundationFounders: transformFoundationFounders
};
