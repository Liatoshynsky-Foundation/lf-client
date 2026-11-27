'use client';

import { Box, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import React from 'react';

import SectionTitle from '~/components/section-title/SectionTitle';
import { FaqAccordion } from '~/ds-components/faq-accordion/FaqAccordion';

import { ContactLink } from '../../contact-link/ContactLink';
import { renderBold } from '../../rich-text/RichTextComponents';
import type { FaqItemKey } from './FAQ.consts';
import { faqItemKeys } from './FAQ.consts';
import { styles } from './FAQ.styles';
import { CardSafety } from './FAQCardSafety';
import { WaysToDonate } from './FAQWaysToDonate';

import { hasContactValue } from '~/lib/utils/contactValue';
import MailIcon from '~/public/icons/mail.svg';
import PhoneIcon from '~/public/icons/phone.svg';
import { commonSx } from '~/shared/styles/commonSx';

type FaqProps = {
  contacts: {
    phone?: string | null;
    email?: string | null;
  };
};

export const Faq = ({ data }: { readonly data: Readonly<FaqProps> }): React.JSX.Element => {
  const { contacts } = data;
  const hasPhone = hasContactValue(contacts.phone);
  const hasEmail = hasContactValue(contacts.email);

  const t = useTranslations('supportUs.faq');

  const getFaqItemContent = (itemKey: FaqItemKey) => {
    if (itemKey === 'waysToDonate') {
      return <WaysToDonate />;
    }
    if (itemKey === 'cardSafety') {
      return <CardSafety />;
    }
    return t.rich(`items.${itemKey}.content`, { b: renderBold });
  };
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
      {(hasPhone || hasEmail) && (
        <Box sx={styles.contacts}>
          <Typography sx={styles.typography} data-testid="Faq-question">
            {t('subtitle.question')}
          </Typography>
          <Typography sx={styles.typography} data-testid="Faq-answer">
            {t('subtitle.answer')}
          </Typography>
          <Box sx={styles.contactsList}>
            {hasPhone && (
              <Box sx={styles.contactsItem}>
                <ContactLink
                  type="phone"
                  icon={PhoneIcon}
                  value={contacts.phone!}
                  alertMsg={t('phoneCopiedAlert')}
                  dataTestid="Faq-phoneLink"
                />
              </Box>
            )}
            {hasEmail && (
              <Box sx={styles.contactsItem}>
                <ContactLink type="email" icon={MailIcon} value={contacts.email!} dataTestid="Faq-emailLink" />
              </Box>
            )}
          </Box>
        </Box>
      )}
      <Box sx={styles.faq}>
        {faqItemKeys.map((itemKey) => {
          const content = getFaqItemContent(itemKey);
          return <FaqAccordion key={itemKey} title={t(`items.${itemKey}.title`)} content={content} />;
        })}
      </Box>
    </Box>
  );
};

export default Faq;
