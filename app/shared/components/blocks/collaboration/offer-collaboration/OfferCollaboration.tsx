import { Box } from '@mui/system';
import { getLocale, getTranslations } from 'next-intl/server';

import { styles } from './OfferCollaboration.styles';

import ContactsInfo from '~/[lang]/contacts/ContactsInfo/ContactsInfo';
import { createRequestContainer } from '~/di/container';
import PaperComponent from '~/shared/components/paper-component/PaperComponent';

export default async function OfferCollaboration() {
  const t = await getTranslations('collaboration.offerCollaboration');
  const locale = await getLocale();
  const { contacts, socialLinks } = await createRequestContainer().resolve('footerService').getFooterData(locale);

  return (
    <Box sx={styles.mainContainer}>
      <PaperComponent sx={styles.paper} />
      <Box sx={styles.container}>
        <ContactsInfo title={t('title')} formTitle={t('formTitle')} contacts={contacts} socialLinks={socialLinks} />
      </Box>
    </Box>
  );
}
