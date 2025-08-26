import { Locale } from 'next-intl';
import { z } from 'zod';

import { translatedFieldSchema } from '~/validators/constants';
import { TipTapContentSchema } from '~/validators/pagesSchemas/tiptap.schema';

const IntroSectionBlockSchema = z.object({
  title: translatedFieldSchema,
  trustAndSecurity: z.object({ uk: TipTapContentSchema, en: TipTapContentSchema }),
  agreement: z.object({ uk: TipTapContentSchema, en: TipTapContentSchema })
});

const CollectedDataBlockSchema = z.object({
  title: translatedFieldSchema,
  description: z.object({ uk: TipTapContentSchema, en: TipTapContentSchema }),
  list: z.array(z.object({ uk: TipTapContentSchema, en: TipTapContentSchema }))
});

const CookiesBlockSchema = z.object({
  title: translatedFieldSchema,
  description: z.object({ uk: TipTapContentSchema, en: TipTapContentSchema }),
  list: z.array(z.object({ uk: TipTapContentSchema, en: TipTapContentSchema })),
  note: z.object({ uk: TipTapContentSchema, en: TipTapContentSchema })
});

const GoogleAuthBlockSchema = z.object({
  title: translatedFieldSchema,
  description: z.object({ uk: TipTapContentSchema, en: TipTapContentSchema }),
  list: z.array(z.object({ uk: TipTapContentSchema, en: TipTapContentSchema })),
  note: z.object({ uk: TipTapContentSchema, en: TipTapContentSchema })
});

const SocialNetworksBlockSchema = z.object({
  title: translatedFieldSchema,
  description: z.object({ uk: TipTapContentSchema, en: TipTapContentSchema })
});

const TargetedAdsBlockSchema = z.object({
  title: translatedFieldSchema,
  description: z.object({ uk: TipTapContentSchema, en: TipTapContentSchema })
});

const NewsletterSubscriptionBlockSchema = z.object({
  title: translatedFieldSchema,
  description: z.object({ uk: TipTapContentSchema, en: TipTapContentSchema })
});

const DataRetentionBlockSchema = z.object({
  title: translatedFieldSchema,
  description: z.object({ uk: TipTapContentSchema, en: TipTapContentSchema })
});

const UserRightsBlockSchema = z.object({
  title: translatedFieldSchema,
  description: z.object({ uk: TipTapContentSchema, en: TipTapContentSchema }),
  list: z.array(z.object({ uk: TipTapContentSchema, en: TipTapContentSchema })),
  note: z.object({ uk: TipTapContentSchema, en: TipTapContentSchema })
});

const ContactUsBlockSchema = z.object({
  title: translatedFieldSchema,
  description: z.object({ uk: TipTapContentSchema, en: TipTapContentSchema })
});

const PrivacyPolicyBlock = z.object({
  IntroSection: IntroSectionBlockSchema,
  CollectedData: CollectedDataBlockSchema,
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
  status: z.enum(['draft', 'published']),
  blocks: PrivacyPolicyBlock,
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  _id: z.any().optional()
});

export const createLocalizedPrivacyPolicyPageSchema = (locale: Locale) =>
  PrivacyPolicyPageSchema.transform((page) => {
    const { blocks } = page;
    return {
      slug: page.slug,
      title: page.title[locale],
      status: page.status,
      blocks: {
        IntroSection: {
          title: blocks.IntroSection.title[locale],
          trustAndSecurity: blocks.IntroSection.trustAndSecurity[locale],
          agreement: blocks.IntroSection.agreement[locale]
        },
        CollectedData: {
          title: blocks.CollectedData.title[locale],
          description: blocks.CollectedData.description[locale],
          list: blocks.CollectedData.list.map((item) => item[locale])
        },
        Cookies: {
          title: blocks.Cookies.title[locale],
          description: blocks.Cookies.description[locale],
          list: blocks.Cookies.list.map((item) => item[locale]),
          note: blocks.Cookies.note[locale]
        },
        GoogleAuth: {
          title: blocks.GoogleAuth.title[locale],
          description: blocks.GoogleAuth.description[locale],
          list: blocks.GoogleAuth.list.map((item) => item[locale]),
          note: blocks.GoogleAuth.note[locale]
        },
        SocialNetworks: {
          title: blocks.SocialNetworks.title[locale],
          description: blocks.SocialNetworks.description[locale]
        },
        TargetedAds: {
          title: blocks.TargetedAds.title[locale],
          description: blocks.TargetedAds.description[locale]
        },
        NewsletterSubscription: {
          title: blocks.NewsletterSubscription.title[locale],
          description: blocks.NewsletterSubscription.description[locale]
        },
        DataRetention: {
          title: blocks.DataRetention.title[locale],
          description: blocks.DataRetention.description[locale]
        },
        UserRights: {
          title: blocks.UserRights.title[locale],
          description: blocks.UserRights.description[locale],
          list: blocks.UserRights.list.map((item) => item[locale]),
          note: blocks.UserRights.note[locale]
        },
        ContactUs: {
          title: blocks.DataRetention.title[locale],
          description: blocks.DataRetention.description[locale]
        }
      }
    };
  });
