import { Box, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';

import LanguageSwitcher from '../../../language-switcher/LanguageSwitcher';
import { styles } from './NavContacts.styles';
import { contactsData, LinkIcon } from '~/types/types/common.types';

import MailIcon from '~/public/icons/mail.svg';
import PhoneIcon from '~/public/icons/phone-call.svg';
import { ContactLink } from '~/shared/components/contact-link/ContactLink';
import FooterSocialMedia from '~/shared/components/Footer/footer-social-media/FooterSocialMedia';

interface ContactsSectionProps {
  contacts: contactsData;
  socialLinks: LinkIcon[];
  isMobile: boolean;
}

export const ContactsSection = ({ contacts, socialLinks, isMobile }: ContactsSectionProps) => {
  const t = useTranslations('contactsInfoPage');

  return (
    <>
      {isMobile && <LanguageSwitcher variant="mobile" data-testid="ContactsSection-languageSwitcher" />}

      <Box data-testid="ContactsSection-links" sx={styles.links}>
        <ContactLink
          data-testid="ContactsSection-phoneLink"
          type="phone"
          label={isMobile ? undefined : t('phoneNumber')}
          value={contacts.phone}
          direction={isMobile ? 'row' : 'column'}
          icon={isMobile ? PhoneIcon : null}
        />

        <ContactLink
          data-testid="ContactsSection-emailLink"
          type="email"
          label={isMobile ? undefined : t('email')}
          value={contacts.email}
          direction={isMobile ? 'row' : 'column'}
          icon={isMobile ? MailIcon : null}
        />
      </Box>

      <Box data-testid="ContactsSection-socialMedia" sx={styles.socialMediaBox}>
        <Typography data-testid="ContactsSection-socialMedia-title" sx={styles.mediaTitles}>
          {t('socialMedia')}:
        </Typography>

        <FooterSocialMedia
          data-testid="ContactsSection-socialMedia-list"
          media={socialLinks}
          containerSx={{ gap: { xs: '18px', sm: '14px', md: '16px' } }}
        />
      </Box>
    </>
  );
};
