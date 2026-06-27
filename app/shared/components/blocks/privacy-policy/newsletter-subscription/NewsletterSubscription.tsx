import React from 'react';

import PolicySection from '../policy-section/PolicySection';
import type { PrivacyPolicyPage } from '~/types/page/pagesBase.type';

interface NewsletterSubscriptionProps {
  readonly data: PrivacyPolicyPage['blocks']['NewsletterSubscription'];
}

export default function NewsletterSubscription({ data }: NewsletterSubscriptionProps) {
  const { title, description } = data;
  return <PolicySection title={title} note={description} dataTestId="PrivacyPolicy-newsletter" />;
}
