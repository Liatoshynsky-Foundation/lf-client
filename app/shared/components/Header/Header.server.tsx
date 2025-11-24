import { getLocale } from 'next-intl/server';

import HeaderClient from './Header.client';

import { createRequestContainer } from '~/di/container';

export const revalidate = 3600;

export default async function HeaderServer() {
  const locale = await getLocale();
  const container = createRequestContainer();
  const headerService = container.resolve('headerService');
  const footerService = container.resolve('footerService');

  const headerData = await headerService.getHeaderData(locale);
  const { contacts, socialLinks } = await footerService.getFooterData(locale);

  return <HeaderClient headerData={headerData} contacts={contacts} socialLinks={socialLinks} />;
}
