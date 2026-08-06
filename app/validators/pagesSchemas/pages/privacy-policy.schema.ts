import { z } from 'zod';

import { PageStatus } from '~/types/enums/common.enums';

import { mongoObjectIdSchema, translatedFieldSchema, translatedTipTapSchema } from '~/validators/constants';
import { TipTapDocSchema } from '~/validators/pagesSchemas/tiptap.schema';

const IntroSectionBlockSchema = z.object({
  trustAndSecurity: z.object({ uk: TipTapDocSchema, en: TipTapDocSchema }),
  agreement: z.object({ uk: TipTapDocSchema, en: TipTapDocSchema })
});

const DataWeCollectBlockSchema = z.object({
  title: translatedTipTapSchema,
  description: z.object({ uk: TipTapDocSchema, en: TipTapDocSchema }),
  sections: z.array(
    z.object({
      subtitle: z.object({ uk: TipTapDocSchema, en: TipTapDocSchema }),
      description: z
        .object({
          uk: TipTapDocSchema,
          en: TipTapDocSchema
        })
        .optional(),
      list: z.array(z.object({ uk: TipTapDocSchema, en: TipTapDocSchema }))
    })
  ),
  note: z.object({ uk: TipTapDocSchema, en: TipTapDocSchema }),
  hidden: z.boolean().optional()
});

const DataUsageBlockSchema = z.object({
  title: translatedTipTapSchema,
  description: z.object({ uk: TipTapDocSchema, en: TipTapDocSchema }),
  list: z.array(z.object({ uk: TipTapDocSchema, en: TipTapDocSchema })),
  hidden: z.boolean().optional()
});

const CookiesBlockSchema = z.object({
  title: translatedTipTapSchema,
  description: z.object({ uk: TipTapDocSchema, en: TipTapDocSchema }),
  list: z.array(z.object({ uk: TipTapDocSchema, en: TipTapDocSchema })),
  note: z.object({ uk: TipTapDocSchema, en: TipTapDocSchema }),
  hidden: z.boolean().optional()
});

const GoogleAuthBlockSchema = z.object({
  title: translatedFieldSchema,
  description: z.object({ uk: TipTapDocSchema, en: TipTapDocSchema }),
  list: z.array(z.object({ uk: TipTapDocSchema, en: TipTapDocSchema })),
  note: z.object({ uk: TipTapDocSchema, en: TipTapDocSchema })
});

const SocialNetworksBlockSchema = z.object({
  title: translatedFieldSchema,
  description: z.object({ uk: TipTapDocSchema, en: TipTapDocSchema })
});

const TargetedAdsBlockSchema = z.object({
  title: translatedFieldSchema,
  description: z.object({ uk: TipTapDocSchema, en: TipTapDocSchema })
});

const NewsletterSubscriptionBlockSchema = z.object({
  title: translatedFieldSchema,
  description: z.object({ uk: TipTapDocSchema, en: TipTapDocSchema })
});

const DataRetentionBlockSchema = z.object({
  title: translatedTipTapSchema,
  description: z.object({ uk: TipTapDocSchema, en: TipTapDocSchema }),
  hidden: z.boolean().optional()
});

const UserRightsBlockSchema = z.object({
  title: translatedTipTapSchema,
  description: z.object({ uk: TipTapDocSchema, en: TipTapDocSchema }),
  list: z.array(z.object({ uk: TipTapDocSchema, en: TipTapDocSchema })),
  note: z.object({ uk: TipTapDocSchema, en: TipTapDocSchema }),
  hidden: z.boolean().optional()
});

const ContactUsBlockSchema = z.object({
  title: translatedTipTapSchema,
  description: z.object({ uk: TipTapDocSchema, en: TipTapDocSchema }),
  hidden: z.boolean().optional()
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

export const PrivacyPolicyPageSchema = z.object({
  pageType: z.literal('PrivacyPolicyPage'),
  slug: z.string(),
  title: translatedFieldSchema,
  status: z.nativeEnum(PageStatus),
  blocks: PrivacyPolicyBlock,
  blocksOrder: z.array(z.string()).min(1),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  _id: mongoObjectIdSchema
});
