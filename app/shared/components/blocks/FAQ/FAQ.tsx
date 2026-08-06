'use client';

import { Box, Typography } from '@mui/material';
import { useLocale, useTranslations } from 'next-intl';
import React from 'react';

import SectionTitle from '~/components/section-title/SectionTitle';
import { FaqAccordion } from '~/ds-components/faq-accordion/FaqAccordion';

import { ContactLink } from '../../contact-link/ContactLink';
import { styles } from './FAQ.styles';

import MailIcon from '~/public/icons/mail.svg';
import PhoneIcon from '~/public/icons/phone.svg';
import { commonSx } from '~/shared/styles/commonSx';

type FaqItemProps = {
  title: {
    en: string;
    uk: string;
  };
  content: {
    en: string;
    uk: string;
  };
};

type FaqProps = {
  contacts: {
    phone: string;
    email: string;
  };
  faq: readonly FaqItemProps[];
};

export const Faq = ({ data }: { readonly data: Readonly<FaqProps> }): React.JSX.Element => {
  const { contacts, faq } = data;

  const t = useTranslations('supportUs.faq');
  const locale = useLocale() as 'en' | 'uk';

  return (
    <Box sx={styles.gridContainer} data-testid="Faq">
      <SectionTitle
        sx={{
          gridTemplateColumns: commonSx.layout.standardGrid.gridTemplateColumns
        }}
        title={t('title')}
        mb={48}
        gridColumn={{ xs: '2/4 ', sm: '4 / -1', md: '6 / -1' }}
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
      <Box sx={styles.faq}>
        {faq.map((item) => (
          <FaqAccordion key={item.title[locale]} title={item.title[locale]} content={item.content[locale]} />
        ))}
      </Box>
    </Box>
  );
};

export default Faq;
