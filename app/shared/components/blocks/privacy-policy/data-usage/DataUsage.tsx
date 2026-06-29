import PolicySection from '../policy-section/PolicySection';
import type { DataUsageProps } from '~/types/page/privacy-policy.types';

export default function DataUsage({ data }: Readonly<DataUsageProps>) {
  const { title, description, list } = data;
  return <PolicySection title={title} description={description} list={list} dataTestId="PrivacyPolicy-dataUsage" />;
}
