import PolicySection from '../policy-section/PolicySection';
import type { GoogleAuthProps } from '~/types/page/privacy-policy.types';

export default function GoogleAuth({ data }: Readonly<GoogleAuthProps>) {
  const { title, description, list, note } = data;
  return (
    <PolicySection
      title={title}
      description={description}
      list={list}
      note={note}
      dataTestId="PrivacyPolicy-googleAuth"
    />
  );
}
