'use client';
import { Box, Link, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';

import { styles } from './ContactsInfo.styles';

import FooterSocialMedia, { LinkIcon } from '~/shared/components/Footer/footer-social-media/FooterSocialMedia';
import ContactForm from '~/shared/components/forms/contact-form/ContactForm';
import PaperComponent from '~/shared/components/paper-component/PaperComponent';

interface IContactInfoProps {
  title?: string;
  formTitle?: string;
  contacts: {
    phone: string;
    email: string;
  };
  socialLinks: LinkIcon[];
}

export default function ContactsInfo({ title, formTitle, contacts, socialLinks }: Readonly<IContactInfoProps>) {
  const t = useTranslations('contactsInfoPage');

  return (
    <Box sx={styles.root}>
      <Box sx={styles.wrapper}>
        <Box sx={styles.contactsInfoWrapper}>
          {title ? (
            <Typography sx={styles.title}>{title}</Typography>
          ) : (
            <Typography sx={styles.titleMain} variant="h2">
              {t('contacts')}
            </Typography>
          )}
          <Box sx={styles.contactsDetails}>
            <Box sx={styles.contacts}>
              <Typography variant="subtitle1">{t('phoneNumber')}:</Typography>
              <Link variant="customSemiBold18">{contacts.phone}</Link>
            </Box>
            <Box sx={styles.contacts}>
              <Typography variant="subtitle1">{t('email')}:</Typography>
              <Link variant="customSemiBold18">{contacts.email}</Link>
            </Box>
          </Box>
          <Box sx={styles.socialMediaWrapper}>
            <Typography variant="subtitle1">{t('socialMedia')}:</Typography>
            <FooterSocialMedia media={socialLinks} />
          </Box>
        </Box>
        <PaperComponent sx={styles.formWrapper}>
          <Typography sx={styles.formTitle} variant="h5">
            {formTitle ?? t('formTitle')}
          </Typography>
          <Typography sx={styles.formSubtitle} variant="subtitle1">
            {t('formSubtitle')}
          </Typography>
          <ContactForm onSubmit={() => {}} />
        </PaperComponent>
      </Box>
    </Box>
  );
}
