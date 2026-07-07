import PolicySection from '../policy-section/PolicySection';
import type { NewsletterSubscriptionProps } from '~/types/page/privacy-policy.types';

export default function NewsletterSubscription({ data }: Readonly<NewsletterSubscriptionProps>) {
  const { title, description } = data;
  return <PolicySection title={title} note={description} dataTestId="PrivacyPolicy-newsletter" />;
}
