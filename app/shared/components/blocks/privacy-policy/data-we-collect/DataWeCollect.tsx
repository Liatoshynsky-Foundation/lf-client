import PolicySection from '../policy-section/PolicySection';
import type { DataWeCollectProps } from '~/types/page/privacy-policy.types';

export default function DataWeCollect({ data }: Readonly<DataWeCollectProps>) {
  const { title, description, sections, note } = data;
  return (
    <PolicySection
      title={title}
      description={description}
      sections={sections}
      note={note}
      dataTestId="PrivacyPolicy-dataWeCollect"
    />
  );
}
