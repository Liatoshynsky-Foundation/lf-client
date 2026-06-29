import PolicySection from '../policy-section/PolicySection';
import type { CookiesProps } from '~/types/page/privacy-policy.types';

export default function Cookies({ data }: Readonly<CookiesProps>) {
  const { title, description, list, note } = data;
  return (
    <PolicySection title={title} description={description} list={list} note={note} dataTestId="PrivacyPolicy-cookies" />
  );
}
