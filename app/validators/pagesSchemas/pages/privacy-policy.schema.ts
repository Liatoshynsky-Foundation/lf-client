import { z } from 'zod';

import { PageStatus } from '~/types/enums/common.enums';

import { mongoObjectIdSchema, translatedFieldSchema, translatedTipTapSchema } from '~/validators/constants';
import { TipTapDocSchema } from '~/validators/pagesSchemas/tiptap.schema';

const HiddenBlockSchema = z.object({
  hidden: z.boolean().optional()
});

const hideableBlock = <T extends z.ZodRawShape>(shape: T) => HiddenBlockSchema.extend(shape);

const IntroSectionBlockSchema = z.object({
  trustAndSecurity: z.object({ uk: TipTapDocSchema, en: TipTapDocSchema }),
  agreement: z.object({ uk: TipTapDocSchema, en: TipTapDocSchema })
});

const DataWeCollectBlockSchema = hideableBlock({
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
  note: z.object({ uk: TipTapDocSchema, en: TipTapDocSchema })
});

const DataUsageBlockSchema = hideableBlock({
  title: translatedTipTapSchema,
  description: z.object({ uk: TipTapDocSchema, en: TipTapDocSchema }),
  list: z.array(z.object({ uk: TipTapDocSchema, en: TipTapDocSchema }))
});

const CookiesBlockSchema = hideableBlock({
  title: translatedTipTapSchema,
  description: z.object({ uk: TipTapDocSchema, en: TipTapDocSchema }),
  list: z.array(z.object({ uk: TipTapDocSchema, en: TipTapDocSchema })),
  note: z.object({ uk: TipTapDocSchema, en: TipTapDocSchema })
});

const GoogleAuthBlockSchema = hideableBlock({
  title: translatedFieldSchema,
  description: z.object({ uk: TipTapDocSchema, en: TipTapDocSchema }),
  list: z.array(z.object({ uk: TipTapDocSchema, en: TipTapDocSchema })),
  note: z.object({ uk: TipTapDocSchema, en: TipTapDocSchema })
});

const SocialNetworksBlockSchema = hideableBlock({
  title: translatedFieldSchema,
  description: z.object({ uk: TipTapDocSchema, en: TipTapDocSchema })
});

const TargetedAdsBlockSchema = hideableBlock({
  title: translatedFieldSchema,
  description: z.object({ uk: TipTapDocSchema, en: TipTapDocSchema })
});

const NewsletterSubscriptionBlockSchema = hideableBlock({
  title: translatedFieldSchema,
  description: z.object({ uk: TipTapDocSchema, en: TipTapDocSchema })
});

const DataRetentionBlockSchema = hideableBlock({
  title: translatedTipTapSchema,
  description: z.object({ uk: TipTapDocSchema, en: TipTapDocSchema })
});

const UserRightsBlockSchema = hideableBlock({
  title: translatedTipTapSchema,
  description: z.object({ uk: TipTapDocSchema, en: TipTapDocSchema }),
  list: z.array(z.object({ uk: TipTapDocSchema, en: TipTapDocSchema })),
  note: z.object({ uk: TipTapDocSchema, en: TipTapDocSchema })
});

const ContactUsBlockSchema = hideableBlock({
  title: translatedTipTapSchema,
  description: z.object({ uk: TipTapDocSchema, en: TipTapDocSchema })
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
