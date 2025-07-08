import type { ContactInfoDTO, FoundationNameDTO, PublicInfoDTO, SupportButtonLinkDTO } from '../dto/foundationInfo.dto';

export type FoundationInfoRepository = {
  getContactInfo(): Promise<ContactInfoDTO>;
  getBrandingInfo(): Promise<FoundationNameDTO>;
  getSupportButtonLink(): Promise<SupportButtonLinkDTO>;
  getPublicInfo(): Promise<PublicInfoDTO>;
};
