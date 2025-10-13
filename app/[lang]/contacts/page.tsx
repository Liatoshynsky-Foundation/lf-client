import { Box } from '@mui/material';
import { getLocale, setRequestLocale } from 'next-intl/server';

import ContactsInfo from './ContactsInfo/ContactsInfo';
import { Language } from '~/types/types/language';

import { createRequestContainer } from '~/di/container';
import { createSeoMeta } from '~/lib/utils/createSeoMeta';

export const metadata = createSeoMeta({
  title: 'Контакти',
  description: 'Надішліть запит і ми сконтактуємо з вами протягом кількох робочих днів',
  url: '/contacts'
});

const styles = {
  container: {
    width: '100%',
    minHeight: 'calc(100vh + (100vw * 0.035))',
    background: '#F2EEE8',
    pt: {
      xs: '70px',
      sm: '82px',
      md: '100px',
      lg: '92px'
    },
    pb: 'calc(100% * 0.035)'
  },
  childrenBox: {
    width: '100%',
    maxWidth: '1728px',
    pt: { xs: '120px', md: '136px', xl: '55px' },
    pb: { xs: '45px', sm: '160px' },
    display: 'grid',
    gridTemplateColumns: {
      xs: 'repeat(4, 1fr)',
      sm: 'repeat(8, 1fr)',
      md: 'repeat(12, 1fr)'
    },
    columnGap: {
      xs: '16px',
      sm: '24px',
      md: '40px'
    },
    px: {
      xs: '24px',
      sm: '56px',
      md: '72px'
    },
    m: '0 auto'
  }
};

export default async function Contacts({ params }: Readonly<Language>) {
  const { lang } = await params;
  setRequestLocale(lang);
  const locale = await getLocale();

  const { contacts, socialLinks } = await createRequestContainer().resolve('footerService').getFooterData(locale);

  return (
    <Box sx={styles.container}>
      <Box sx={styles.childrenBox}>
        <ContactsInfo contacts={contacts} socialLinks={socialLinks} />
      </Box>
    </Box>
  );
}
