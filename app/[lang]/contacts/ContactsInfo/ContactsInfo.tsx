'use client';
import { Box, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import React from 'react';

import OfferCollaborationForm from '~/components/forms/offer-collaboration-form/OfferCollaborationForm';

import { styles } from './ContactsInfo.styles';

import { ContactLink } from '~/shared/components/contact-link/ContactLink';
import FooterSocialMedia, { LinkIcon } from '~/shared/components/Footer/footer-social-media/FooterSocialMedia';

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
            <Typography variant="h1" sx={styles.title} data-testid="ContactsInfo-title">
              {title}
            </Typography>
          ) : (
            <Typography sx={styles.titleMain} variant="h1" data-testid="ContactsInfo-title">
              {t('contacts')}
            </Typography>
          )}
          <Box sx={styles.contactsDetails}>
            <Box sx={styles.contacts} data-testid="ContactsInfo-phoneSection">
              <ContactLink
                type="phone"
                label={t('phoneNumber')}
                value={contacts.phone}
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
        <OfferCollaborationForm
          sx={styles.formWrapper}
          formTitle={formTitle ?? t('formTitle')}
          formSubtitle={t('formSubtitle')}
        />
      </Box>
    </Box>
  );
}
