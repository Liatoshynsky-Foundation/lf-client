import { Locale } from 'next-intl';

import type { FoundationInfoRepository } from '~/domain/repositories/foundationInfo.repository';

export const createFoundationInfoService = (repo: FoundationInfoRepository) => ({
  getContactInfo: () => repo.getContactInfo(),
  getBrandingInfo: (locale: Locale) => repo.getBrandingInfo(locale),
  getSupportButtonLink: () => repo.getSupportButtonLink(),
  getPublicInfo: (locale: Locale) => repo.getPublicInfo(locale)
});

export type FoundationInfoService = ReturnType<typeof createFoundationInfoService>;
