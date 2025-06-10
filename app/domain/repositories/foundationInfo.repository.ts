import { Locale } from 'next-intl';

import { ContactInfoData, FoundationNameData, PublicInfoData, SupportButtonLinkData } from '../dto/foundationInfo.dto';

export type FoundationInfoRepository = {
  getContactInfo(): Promise<ContactInfoData>;
  getBrandingInfo(locale: Locale): Promise<FoundationNameData>;
  getSupportButtonLink(): Promise<SupportButtonLinkData>;
  getPublicInfo(locale: Locale): Promise<PublicInfoData>;
};
