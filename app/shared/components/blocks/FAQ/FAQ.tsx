'use client';

import { Box, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';

import SectionTitle from '~/components/section-title/SectionTitle';
import { FaqAccordion } from '~/ds-components/faq-accordion/FaqAccordion';

import { ContactLink } from '../../contact-link/ContactLink';
import { styles } from './FAQ.styles';

import MailIcon from '~/public/icons/mail.svg';
import PhoneIcon from '~/public/icons/phone.svg';

type FaqItemProps = {
  title: string;
  content: string;
};

type FaqProps = {
  contacts: {
    phone: string;
    email: string;
  };
  faq: FaqItemProps[];
};

const Faq = ({ data }: { readonly data: Readonly<FaqProps> }) => {
  const { contacts, faq } = data;

  const t = useTranslations('supportUs.faq');

  const faqItems = faq.map((item) => {
    return <FaqAccordion key={item.title} title={item.title} content={item.content} />;
  });

  return (
    <Box sx={styles.gridContainer} data-testid="Faq">
      <SectionTitle
        title={t('title')}
        mb={48}
        gridColumn={{ xs: '2 ', sm: '4 / -1', md: '6 / -1', lg: '5 / -1', xl: '6 / -1' }}
        dataTestId="Faq-titleContainer"
      />
      <Box sx={styles.contacts}>
        <Typography sx={styles.typography} data-testid="Faq-question">
          {t('subtitle.question')}
        </Typography>
        <Typography sx={styles.typography} data-testid="Faq-answer">
          {t('subtitle.answer')}
        </Typography>
        <Box sx={styles.contactsList}>
          <Box sx={styles.contactsItem}>
            <ContactLink
              type="phone"
              icon={PhoneIcon}
              value={contacts.phone}
              alertMsg={t('phoneCopiedAlert')}
              dataTestid="Faq-phoneLink"
            />
          </Box>
          <Box sx={styles.contactsItem}>
            <ContactLink type="email" icon={MailIcon} value={contacts.email} dataTestid="Faq-emailLink" />
          </Box>
        </Box>
      </Box>
      <Box sx={styles.faq}>{faqItems}</Box>
    </Box>
  );
};

export default Faq;
