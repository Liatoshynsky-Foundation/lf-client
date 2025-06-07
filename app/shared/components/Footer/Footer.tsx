import { Box } from '@mui/material';
import { getTranslations } from 'next-intl/server';
import React from 'react';

import FooterContactInfo from '~/components/Footer/FooterContactInfo/FooterContactInfo';
import FooterCopyrights from '~/components/Footer/FooterCopyrights/FooterCopyrights';

import { contacts, sections, SocialMedia } from './Footer.consts';
import FooterSocialMedia from './footer-social-media/FooterSocialMedia';
import FooterContactAndSupport from './FooterContactAndSupport/FooterContactAndSupport';
import FooterNavigation from './FooterNavigation/FooterNavigation';

export default async function Footer() {
  const t = await getTranslations('footer');

  const footerData = {
    text: t('copyright'),
    links: [
      { label: t('linkPrivacy'), href: '/privacy' },
      { label: t('linkTerms'), href: '/terms' },
      { label: t('linkMedia'), href: '/media' }
    ]
  };

  const donationButtonData = {
    text: t('donationButton'),
    link: '/donate'
  };

  const contactUsButtonData = {
    text: t('contactUsButton'),
    link: '/contact-us'
  };

  return (
    <Box component="footer">
      <FooterNavigation sections={sections} />
      <FooterContactInfo contacts={contacts} />
      <FooterContactAndSupport contactUs={contactUsButtonData} donation={donationButtonData} />
      <FooterSocialMedia media={SocialMedia} />
      <FooterCopyrights text={footerData.text} links={footerData.links} />
    </Box>
  );
}
