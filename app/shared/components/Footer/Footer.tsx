import { Box } from '@mui/material';
import { getLocale, getTranslations } from 'next-intl/server';
import React from 'react';

import LanguageSwitcher from '~/components/design-system/all-components/language-switcher/LanguageSwitcher';
import Logo from '~/components/design-system/all-components/logo/Logo';
import FooterContactInfo from '~/components/Footer/FooterContactInfo/FooterContactInfo';
import FooterCopyrights from '~/components/Footer/FooterCopyrights/FooterCopyrights';
import { SvgImage } from '~/components/svg-image/SvgImage';
import OpenTechLogo from '~/ds-components/open-tech-logo/OpenTechLogo';

import { styles } from './Footer.styles';
import FooterSocialMedia from './footer-social-media/FooterSocialMedia';
import FooterContactAndSupport from './FooterContactAndSupport/FooterContactAndSupport';
import FooterNavigation from './FooterNavigation/FooterNavigation';

import { createRequestContainer } from '~/di/container';

export default async function Footer() {
  const t = await getTranslations('footer');
  const locale = await getLocale();

  const svgImagePath = '/images/footer-img.svg';

  const { contacts, socialLinks, supportButtonLink, publicInfo, navigation } = await createRequestContainer()
    .resolve('footerService')
    .getFooterData(locale);

  const contactUsLink = navigation?.[1]?.links?.find(
    (link: { label: string; href: string }) => link.href === '/contacts'
  )?.href;

  return (
    <Box component="footer" sx={styles.footerContainer} id="footer">
      <Box sx={styles.backgroundBox} />

      <Box sx={styles.footerContent}>
        <Box sx={styles.switcherWrapper}>
          <LanguageSwitcher variant="toggle" />
        </Box>

        <Box sx={styles.logoWrapper}>
          <Logo variant="footer" />
        </Box>

        <Box sx={styles.contactInfoWrapper}>
          <FooterContactInfo
            alertMsg={t('phoneCopiedAlert')}
            contacts={contacts}
            labels={{
              phoneLabel: t('phoneLabel')
            }}
          />
        </Box>

        <Box sx={styles.contactAndSupportWrapper}>
          <FooterContactAndSupport
            contact={{
              text: t('contactUsButton'),
              link: contactUsLink
            }}
            donation={{
              text: t('donationButton'),
              shortText: t('donationButtonShort'),
              link: supportButtonLink
            }}
          />
        </Box>

        <Box sx={styles.socialWrapper}>
          <FooterSocialMedia media={socialLinks} />
        </Box>

        <Box sx={styles.navigationWrapper}>
          <FooterNavigation sections={navigation} />
        </Box>

        <Box sx={styles.copyrightWrapper}>
          <FooterCopyrights text={publicInfo.text} links={publicInfo.links} />
        </Box>
      </Box>

      <Box sx={styles.openTechWrapper}>
        <OpenTechLogo label={t('opentechLabel')} />
      </Box>

      <Box sx={styles.svgContainer}>
        <SvgImage src={svgImagePath} alt="Lyatoshynsky Foundation" width={1400} height={165} />
      </Box>
    </Box>
  );
}
