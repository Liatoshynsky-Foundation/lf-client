import type { ContactInfoDTO, FoundationNameDTO, PublicInfoDTO, SupportButtonLinkDTO } from '../dto/foundationInfo.dto';

export interface FoundationInfoRepository {
  getContactInfo(): Promise<ContactInfoDTO>;
  getBrandingInfo(): Promise<FoundationNameDTO>;
  getSupportButtonLink(): Promise<SupportButtonLinkDTO>;
  getPublicInfo(): Promise<PublicInfoDTO>;
}
