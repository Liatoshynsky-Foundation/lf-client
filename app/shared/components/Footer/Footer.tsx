import { Box } from '@mui/material';
import { getLocale, getTranslations } from 'next-intl/server';
import React from 'react';

import LanguageSwitcher from '~/components/design-system/all-components/language-switcher/LanguageSwitcher';
import Logo from '~/components/design-system/all-components/logo/Logo';
import FooterContactInfo from '~/components/Footer/FooterContactInfo/FooterContactInfo';
import FooterCopyrights from '~/components/Footer/FooterCopyrights/FooterCopyrights';
import { SvgImage } from '~/components/svg-image/SvgImage';

import { sections } from './Footer.consts';
import { styles } from './Footer.styles';
import FooterSocialMedia from './footer-social-media/FooterSocialMedia';
import FooterContactAndSupport from './FooterContactAndSupport/FooterContactAndSupport';
import FooterNavigation from './FooterNavigation/FooterNavigation';

import { createRequestContainer } from '~/di/container';

export default async function Footer() {
  const t = await getTranslations('footer');
  const locale = await getLocale();

  const svgImagePath = '/images/footer-img.svg';
  const svgImageSA = '/images/softserve-academy.svg';

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

  const {
    contacts,
    socialLinks
    // contactButtonLink,
    // supportButtonLink,
    // publicInfo,
    // navigation
  } = await createRequestContainer().resolve('footerService').getFooterData(locale);

  return (
    <Box component="footer" sx={styles.footerContainer}>
      <Box sx={styles.skewedTop}></Box>
      <Box sx={styles.footerContent}>
        <Box sx={styles.switcherWrapper}>
          <LanguageSwitcher variant="toggle" />
        </Box>
        <Box sx={styles.logoWrapper}>
          <Logo variant="footer" />
        </Box>
        <Box sx={styles.infoAndNavigationWrapper}>
          <FooterContactInfo contacts={contacts} />
          <FooterNavigation sections={sections} />
        </Box>
        <Box sx={styles.contactAndSupportWrapper}>
          <FooterContactAndSupport contactUs={contactUsButtonData} donation={donationButtonData} />
          <FooterSocialMedia media={socialLinks} />
        </Box>
        <FooterCopyrights text={footerData.text} links={footerData.links} />
      </Box>
      <Box sx={styles.copyrightWrapper}>
        <SvgImage src={svgImageSA} alt="SoftServe Academy" width={270} height={40} />
      </Box>
      <Box sx={styles.svgContainer}>
        <SvgImage src={svgImagePath} alt="Lyatoshynsky Foundation" width={1400} height={165} />
      </Box>
    </Box>
  );
}
