import { PrivacyPolicyPageSchema } from './privacy-policy.schema';
import { PageStatus } from '~/types/enums/common.enums';

import { NoIDSchema, NoPageType, NoTime } from '~/validators/constants';
import { LocalizeSchema } from '~/validators/localization';

const AFFECTED_HIDDEN_BLOCKS = ['GoogleAuth', 'SocialNetworks', 'TargetedAds', 'NewsletterSubscription'] as const;

describe('PrivacyPolicyPageSchema regression', () => {
  const createMockPayload = () => {
    const dummyText = { uk: 'текст', en: 'text' };
    const createTipTapDoc = (text: string) => ({
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [{ type: 'text', text }]
        }
      ]
    });
    const dummyTipTap = {
      uk: createTipTapDoc('текст'),
      en: createTipTapDoc('text')
    };

    return {
      _id: '507f1f77bcf86cd799439011',
      pageType: 'PrivacyPolicyPage',
      slug: 'privacy-policy',
      title: dummyText,
      status: PageStatus.Published,
      blocksOrder: [
        'IntroSection',
        'DataWeCollect',
        'DataUsage',
        'Cookies',
        'GoogleAuth',
        'SocialNetworks',
        'TargetedAds',
        'NewsletterSubscription',
        'DataRetention',
        'UserRights',
        'ContactUs'
      ],
      blocks: {
        IntroSection: {
          trustAndSecurity: dummyTipTap,
          agreement: dummyTipTap
        },
        DataWeCollect: {
          title: dummyTipTap,
          description: dummyTipTap,
          sections: [],
          note: dummyTipTap
        },
        DataUsage: {
          title: dummyTipTap,
          description: dummyTipTap,
          list: []
        },
        Cookies: {
          title: dummyTipTap,
          description: dummyTipTap,
          list: [],
          note: dummyTipTap
        },
        GoogleAuth: {
          hidden: true,
          title: dummyText,
          description: dummyTipTap,
          list: [],
          note: dummyTipTap
        },
        SocialNetworks: {
          hidden: true,
          title: dummyText,
          description: dummyTipTap
        },
        TargetedAds: {
          hidden: true,
          title: dummyText,
          description: dummyTipTap
        },
        NewsletterSubscription: {
          hidden: true,
          title: dummyText,
          description: dummyTipTap
        },
        DataRetention: {
          title: dummyTipTap,
          description: dummyTipTap
        },
        UserRights: {
          title: dummyTipTap,
          description: dummyTipTap,
          list: [],
          note: dummyTipTap
        },
        ContactUs: {
          title: dummyTipTap,
          description: dummyTipTap
        }
      }
    };
  };

  it('should preserve the "hidden" visibility flag on toggleable privacy policy blocks', () => {
    const mockPayload = createMockPayload();

    const parsedData = PrivacyPolicyPageSchema.parse(mockPayload);

    AFFECTED_HIDDEN_BLOCKS.forEach((blockId) => {
      expect(parsedData.blocks[blockId].hidden).toBe(true);
    });
  });

  it('should preserve the "hidden" visibility flag after client page data localization', () => {
    const localizedSchema = LocalizeSchema(NoTime(NoIDSchema(NoPageType(PrivacyPolicyPageSchema))), 'uk');

    const parsedData = localizedSchema.parse(createMockPayload());

    AFFECTED_HIDDEN_BLOCKS.forEach((blockId) => {
      expect(parsedData.blocks[blockId].hidden).toBe(true);
    });
  });
});
