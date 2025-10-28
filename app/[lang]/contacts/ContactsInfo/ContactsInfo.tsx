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
    <Box sx={styles.root} data-testid="ContactsInfo">
      <Box sx={styles.wrapper}>
        <Box sx={styles.contactsInfoWrapper}>
          {title ? (
            <Typography sx={styles.title} data-testid="ContactsInfo-title">
              {title}
            </Typography>
          ) : (
            <Typography sx={styles.titleMain} variant="h2" data-testid="ContactsInfo-title">
              {t('contacts')}
            </Typography>
          )}
          <Box sx={styles.contactsDetails}>
            <Box sx={styles.contacts} data-testid="ContactsInfo-phoneSection">
              <Typography variant="subtitle1" data-testid="ContactsInfo-phoneLabel">
                {t('phoneNumber')}:
              </Typography>
              <Link variant="customSemiBold18" data-testid="ContactsInfo-phoneLink">
                {contacts.phone}
              </Link>
            </Box>
            <Box sx={styles.contacts} data-testid="ContactsInfo-emailSection">
              <Typography variant="subtitle1" data-testid="ContactsInfo-emailLabel">
                {t('email')}:
              </Typography>
              <Link variant="customSemiBold18" data-testid="ContactsInfo-emailLink">
                {contacts.email}
              </Link>
            </Box>
          </Box>
          <Box sx={styles.socialMediaWrapper} data-testid="ContactsInfo-socialMediaSection">
            <Typography variant="subtitle1" data-testid="ContactsInfo-socialMediaLabel">
              {t('socialMedia')}:
            </Typography>
            <FooterSocialMedia media={socialLinks} />
          </Box>
        </Box>
        <PaperComponent sx={styles.formWrapper} data-testid="ContactsInfo-formWrapper">
          <Typography sx={styles.formTitle} variant="h5" data-testid="ContactsInfo-formTitle">
            {formTitle ?? t('formTitle')}
          </Typography>
          <Typography sx={styles.formSubtitle} variant="subtitle1" data-testid="ContactsInfo-formSubtitle">
            {t('formSubtitle')}
          </Typography>
          <ContactForm onSubmit={() => {}} />
        </PaperComponent>
      </Box>
    </Box>
  );
}
