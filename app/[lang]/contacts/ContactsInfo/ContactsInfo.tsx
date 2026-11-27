'use client';
import { Box, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import React from 'react';

import OfferCollaborationForm from '~/components/forms/offer-collaboration-form/OfferCollaborationForm';

import { styles } from './ContactsInfo.styles';

import { hasContactValue } from '~/lib/utils/contactValue';
import { ContactLink } from '~/shared/components/contact-link/ContactLink';
import FooterSocialMedia, { LinkIcon } from '~/shared/components/Footer/footer-social-media/FooterSocialMedia';

interface IContactInfoProps {
  title?: string;
  titleTag?: 'h1' | 'h2';
  description?: string;
  formTitle?: string;
  contacts: {
    phone?: string | null;
    email?: string | null;
  };
  socialLinks: LinkIcon[];
}

export default function ContactsInfo({
  title,
  titleTag = 'h1',
  description,
  formTitle,
  contacts,
  socialLinks
}: Readonly<IContactInfoProps>) {
  const t = useTranslations('contactsInfoPage');
  const hasPhone = hasContactValue(contacts.phone);
  const hasEmail = hasContactValue(contacts.email);

  return (
    <Box sx={styles.root} data-testid="ContactsInfo">
      <Box sx={styles.wrapper}>
        <Box sx={styles.contactsInfoWrapper}>
          {title ? (
            <Typography variant="h1" component={titleTag} sx={styles.title} data-testid="ContactsInfo-title">
              {title}
            </Typography>
          ) : (
            <Typography sx={styles.titleMain} variant="h1" component={titleTag} data-testid="ContactsInfo-title">
              {t('contacts')}
            </Typography>
          )}
          {description && (
            <Typography variant="body1" component="p" sx={styles.description} data-testid="ContactsInfo-description">
              {description}
            </Typography>
          )}
          {(hasPhone || hasEmail) && (
            <Box sx={styles.contactsDetails}>
              {hasPhone && (
                <Box sx={styles.contacts} data-testid="ContactsInfo-phoneSection">
                  <ContactLink
                    type="phone"
                    label={t('phoneNumber')}
                    value={contacts.phone!}
                    direction="column"
                    valueSx={styles.contactLabel}
                    data-testid="ContactsInfo-phoneLink"
                  />
                </Box>
              )}
              {hasEmail && (
                <Box sx={styles.contacts} data-testid="ContactsInfo-emailSection">
                  <ContactLink
                    type="email"
                    label={t('email')}
                    value={contacts.email!}
                    direction="column"
                    valueSx={styles.contactLabel}
                    data-testid="ContactsInfo-emailLink"
                  />
                </Box>
              )}
            </Box>
          )}
          {socialLinks.length > 0 && (
            <Box sx={styles.socialMediaWrapper} data-testid="ContactsInfo-socialMediaSection">
              <Typography variant="subtitle1" component="p" data-testid="ContactsInfo-socialMediaLabel">
                {t('socialMedia')}:
              </Typography>
              <FooterSocialMedia media={socialLinks} />
            </Box>
          )}
        </Box>
        <OfferCollaborationForm
          sx={styles.formWrapper}
          formTitle={formTitle ?? t('formTitle')}
          formSubtitle={t('formSubtitle')}
        />
      </Box>
    </Box>
  );
}
