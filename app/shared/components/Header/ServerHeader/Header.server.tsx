import { getLocale } from 'next-intl/server';

import HeaderClient from '../Header';

import { createRequestContainer } from '~/di/container';

export const revalidate = 3600;

export default async function HeaderServer() {
  const locale = await getLocale();
  const container = createRequestContainer();
  const headerService = container.resolve('headerService');
  const headerData = await headerService.getHeaderData(locale);
  const { contacts, socialLinks } = await createRequestContainer().resolve('footerService').getFooterData(locale);

  return <HeaderClient headerData={headerData} contacts={contacts} socialLinks={socialLinks} />;
}
