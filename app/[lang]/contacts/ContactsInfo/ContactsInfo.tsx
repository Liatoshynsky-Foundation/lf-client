'use client';
import { Box, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';

import { styles } from './ContactsInfo.styles';

import { ContactLink } from '~/shared/components/contact-link/ContactLink';
import FooterSocialMedia, { LinkIcon } from '~/shared/components/Footer/footer-social-media/FooterSocialMedia';
import ContactForm from '~/shared/components/forms/contact-form/ContactForm';
import PaperComponent from '~/shared/components/paper-component/PaperComponent';
import useBreakpoints from '~/shared/hooks/use-breakpoints/useBreakpoints';

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
  const { isMobile } = useBreakpoints();

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
              <ContactLink
                type="phone"
                label={t('phoneNumber')}
                value={contacts.phone}
                isMobile={isMobile}
                direction="column"
                data-testid="ContactsInfo-phoneLink"
              />
            </Box>
            <Box sx={styles.contacts} data-testid="ContactsInfo-emailSection">
              <ContactLink
                type="email"
                label={t('email')}
                value={contacts.email}
                direction="column"
                data-testid="ContactsInfo-emailLink"
              />
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
