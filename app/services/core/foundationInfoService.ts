import type { FoundationInfoRepository } from '~/domain/repositories/foundationInfo.repository';

export const createFoundationInfoService = (repo: FoundationInfoRepository) => ({
  getContactInfo: () => repo.getContactInfo(),
  getBrandingInfo: () => repo.getBrandingInfo(),
  getSupportButtonLink: () => repo.getSupportButtonLink(),
  getPublicInfo: () => repo.getPublicInfo()
});

export type FoundationInfoService = ReturnType<typeof createFoundationInfoService>;
