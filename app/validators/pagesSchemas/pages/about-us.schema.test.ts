import { Locale } from 'next-intl';

import { createAboutUsPageSchema } from './about-us.schema';
import { PageStatus } from '~/types/enums/common.enums';

import { createFilledTipTapDoc, emptyTipTapDoc } from '~/validators/__fixtures__/tiptap.fixtures';

describe('createAboutUsPageSchema', () => {
  const filledTipTap = createFilledTipTapDoc('Required text');
  const requiredLocalizedTipTap = { uk: filledTipTap, en: filledTipTap };
  const image = {
    src: '/team.jpg',
    alt: { uk: emptyTipTapDoc, en: emptyTipTapDoc },
    caption: null
  };

  const createPayload = ({
    memberName = { uk: createFilledTipTapDoc('Олександра'), en: emptyTipTapDoc },
    memberDescription = { uk: emptyTipTapDoc, en: emptyTipTapDoc },
    introTitle = requiredLocalizedTipTap
  } = {}) => ({
    _id: '507f1f77bcf86cd799439011',
    pageType: 'AboutUsPage' as const,
    slug: 'about-us',
    title: { uk: 'Про нас', en: 'About us' },
    status: PageStatus.Published,
    blocksOrder: [
      'IntroSection',
      'FoundationInfo',
      'OurMission',
      'OurGoals',
      'LiatoshynskyOffice',
      'WhatWeDo',
      'FoundationFounders'
    ],
    blocks: {
      IntroSection: {
        title: introTitle,
        image,
        quote: {
          text: requiredLocalizedTipTap,
          source: requiredLocalizedTipTap
        }
      },
      FoundationInfo: {
        ourOrganisation: requiredLocalizedTipTap,
        ourName: requiredLocalizedTipTap,
        ourBelief: requiredLocalizedTipTap,
        image
      },
      OurMission: {
        title: requiredLocalizedTipTap,
        smallImage: image,
        bigImage: image,
        list: [requiredLocalizedTipTap]
      },
      OurGoals: {
        title: requiredLocalizedTipTap,
        goals: [{ title: requiredLocalizedTipTap, description: requiredLocalizedTipTap }]
      },
      LiatoshynskyOffice: {
        quote: {
          text: requiredLocalizedTipTap,
          source: requiredLocalizedTipTap
        }
      },
      WhatWeDo: {
        title: requiredLocalizedTipTap,
        items: [{ title: requiredLocalizedTipTap, description: requiredLocalizedTipTap }]
      },
      FoundationFounders: {
        titleText: requiredLocalizedTipTap,
        listTitle: requiredLocalizedTipTap,
        members: [
          {
            photo: image,
            name: memberName,
            description: memberDescription
          }
        ]
      }
    }
  });

  it('accepts empty TipTap name, description and alt for team members on the active locale', () => {
    const schema = createAboutUsPageSchema('en' as Locale);
    const payload = createPayload();

    expect(() => schema.parse(payload)).not.toThrow();
  });

  it('rejects empty TipTap on required fields for the active locale', () => {
    const schema = createAboutUsPageSchema('en' as Locale);
    const payload = createPayload({
      introTitle: { uk: filledTipTap, en: emptyTipTapDoc }
    });

    expect(() => schema.parse(payload)).toThrow(/Missing en translation/);
  });
});
