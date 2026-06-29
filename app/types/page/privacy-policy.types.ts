import { PrivacyPolicyPage } from './pagesBase.type';
import type { TipTapDoc } from '~/types/types/tiptap.types';

export interface IntroSectionProps {
  data: {
    title: string;
    trustAndSecurity?: TipTapDoc;
    agreement?: TipTapDoc;
  };
}

export interface DataWeCollectProps {
  data: PrivacyPolicyPage['blocks']['DataWeCollect'];
}

export interface DataUsageProps {
  data: PrivacyPolicyPage['blocks']['DataUsage'];
}

export interface CookiesProps {
  data: PrivacyPolicyPage['blocks']['Cookies'];
}

export interface GoogleAuthProps {
  data: PrivacyPolicyPage['blocks']['GoogleAuth'];
}

export interface SocialNetworksProps {
  data: PrivacyPolicyPage['blocks']['SocialNetworks'];
}

export interface TargetedAdsProps {
  data: PrivacyPolicyPage['blocks']['TargetedAds'];
}

export interface NewsletterSubscriptionProps {
  data: PrivacyPolicyPage['blocks']['NewsletterSubscription'];
}

export interface DataRetentionProps {
  data: PrivacyPolicyPage['blocks']['DataRetention'];
}

export interface UserRightsProps {
  data: PrivacyPolicyPage['blocks']['UserRights'];
}

export interface ContactUsProps {
  data: PrivacyPolicyPage['blocks']['ContactUs'];
}
