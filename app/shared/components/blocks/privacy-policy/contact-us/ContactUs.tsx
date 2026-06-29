import PolicySection from '../policy-section/PolicySection';
import type { ContactUsProps } from '~/types/page/privacy-policy.types';

export default function ContactUs({ data }: Readonly<ContactUsProps>) {
  const { title, description } = data;
  return <PolicySection title={title} description={description} dataTestId="PrivacyPolicy-contactUs" />;
}
