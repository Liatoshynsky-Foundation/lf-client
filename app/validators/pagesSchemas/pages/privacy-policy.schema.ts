import { Locale } from 'next-intl';
import { z } from 'zod';

import { pageSeoFields } from './seo.schema';
import { PageStatus } from '~/types/enums/common.enums';

import {
  localizedTipTapDocSchema,
  mongoObjectIdSchema,
  requiredLocalizedTipTapDocSchema,
  requiredTranslatedTipTapSchema,
  translatedFieldSchema
} from '~/validators/constants';

const HiddenBlockSchema = z.object({
  hidden: z.boolean().optional()
});

const hideableBlock = <T extends z.ZodRawShape>(shape: T) => HiddenBlockSchema.extend(shape);

export function createPrivacyPolicyPageSchema(locale: Locale) {
  const requiredTipTap = requiredTranslatedTipTapSchema(locale);
  const requiredTipTapDoc = requiredLocalizedTipTapDocSchema(locale);

  const IntroSectionBlockSchema = z.object({
    trustAndSecurity: requiredTipTapDoc,
    agreement: requiredTipTapDoc
  });

  const DataWeCollectBlockSchema = hideableBlock({
    title: requiredTipTap,
    description: requiredTipTapDoc,
    sections: z.array(
      z.object({
        subtitle: requiredTipTapDoc,
        description: localizedTipTapDocSchema.optional(),
        list: z.array(localizedTipTapDocSchema)
      })
    ),
    note: requiredTipTapDoc
  });

  const DataUsageBlockSchema = hideableBlock({
    title: requiredTipTap,
    description: requiredTipTapDoc,
    list: z.array(localizedTipTapDocSchema)
  });

  const CookiesBlockSchema = hideableBlock({
    title: requiredTipTap,
    description: requiredTipTapDoc,
    list: z.array(localizedTipTapDocSchema),
    note: requiredTipTapDoc
  });

  const GoogleAuthBlockSchema = hideableBlock({
    title: translatedFieldSchema,
    description: requiredTipTapDoc,
    list: z.array(localizedTipTapDocSchema),
    note: requiredTipTapDoc
  });

  const SocialNetworksBlockSchema = hideableBlock({
    title: translatedFieldSchema,
    description: requiredTipTapDoc
  });

  const TargetedAdsBlockSchema = hideableBlock({
    title: translatedFieldSchema,
    description: requiredTipTapDoc
  });

  const NewsletterSubscriptionBlockSchema = hideableBlock({
    title: translatedFieldSchema,
    description: requiredTipTapDoc
  });

  const DataRetentionBlockSchema = hideableBlock({
    title: requiredTipTap,
    description: requiredTipTapDoc
  });

  const UserRightsBlockSchema = hideableBlock({
    title: requiredTipTap,
    description: requiredTipTapDoc,
    list: z.array(localizedTipTapDocSchema),
    note: requiredTipTapDoc
  });

  const ContactUsBlockSchema = hideableBlock({
    title: requiredTipTap,
    description: requiredTipTapDoc
  });

  const PrivacyPolicyBlock = z.object({
    IntroSection: IntroSectionBlockSchema,
    DataWeCollect: DataWeCollectBlockSchema,
    DataUsage: DataUsageBlockSchema,
    Cookies: CookiesBlockSchema,
    GoogleAuth: GoogleAuthBlockSchema,
    SocialNetworks: SocialNetworksBlockSchema,
    TargetedAds: TargetedAdsBlockSchema,
    NewsletterSubscription: NewsletterSubscriptionBlockSchema,
    DataRetention: DataRetentionBlockSchema,
    UserRights: UserRightsBlockSchema,
    ContactUs: ContactUsBlockSchema
  });

  return z.object({
    pageType: z.literal('PrivacyPolicyPage'),
    slug: z.string(),
    title: translatedFieldSchema,
    status: z.nativeEnum(PageStatus),
    blocks: PrivacyPolicyBlock,
    blocksOrder: z.array(z.string()).min(1),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
    _id: mongoObjectIdSchema,
    ...pageSeoFields
  });
}

export const PrivacyPolicyPageSchema = createPrivacyPolicyPageSchema('uk');
