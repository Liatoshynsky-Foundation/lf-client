import PolicySection from '../policy-section/PolicySection';
import type { DataRetentionProps } from '~/types/page/privacy-policy.types';

export default function DataRetention({ data }: Readonly<DataRetentionProps>) {
  const { title, description } = data;
  return <PolicySection title={title} note={description} dataTestId="PrivacyPolicy-dataRetention" />;
}
