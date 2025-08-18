import { setRequestLocale } from 'next-intl/server';

import ContactsInfo from './ContactsInfo/ContactsInfo';
import { Language } from '~/types/types/language';

import { createSeoMeta } from '~/lib/utils/createSeoMeta';

export const metadata = createSeoMeta({
  title: 'Контакти',
  description: 'Надішліть запит і ми сконтактуємо з вами протягом кількох робочих днів',
  url: '/contacts'
});

export default async function Contacts({ params }: Readonly<Language>) {
  const { lang } = await params;
  setRequestLocale(lang);

  return <ContactsInfo />;
}
