import { Box } from '@mui/material';
import React from 'react';
import FooterCopyrights from '~/components/Footer/FooterCopyrights/FooterCopyrights';
import FooterContactInfo from '~/components/Footer/FooterContactInfo/FooterContactInfo';
import { getTranslations } from 'next-intl/server';
import FooterNavigation from './FooterNavigation/FooterNavigation';
import FooterContactAndSupport from './FooterContactAndSupport/FooterContactAndSupport';
import { SocialMediaTypes } from '~/types/enums/common.enums';
import FooterSocialMedia from './footer-social-media/FooterSocialMedia';

export const footerData = {
  text: '© 2025 Liotoshynsky Foundation. Всі права захищені.',
  links: [
    { label: 'Політика конфіденційності', href: '/privacy' },
    { label: 'Умови користування сайтом', href: '/terms' },
    { label: 'Інформація для медіа / партнерів', href: '/media' }
  ]
};

const contacts = {
  title: 'ГРОМАДСЬКА ОРГАНІЗАЦІЯ \n«ФУНДАЦІЯ ЛЯТОШИНСЬКОГО»',
  phone: '067 963 8366',
  email: 'liatoshynsky@gmail.com'
};

export const sections = [
  {
    title: 'БОРИС ЛЯТОШИНСЬКИЙ',
    links: [
      { label: 'Життєпис', href: '/biography' },
      { label: 'Творчість', href: '/creativity' },
      { label: 'Дослідження та наукові роботи', href: '/research' }
    ]
  },
  {
    title: 'ПРО ФУНДАЦІЮ',
    links: [
      { label: 'Про нас', href: '/about-us' },
      { label: 'Новини', href: '/news' },
      { label: 'ЗМІ про нас', href: '/media-about-us' }
    ]
  },
  {
    title: 'СПІВПРАЦЯ',
    links: [
      { label: 'Стати партнером', href: '/become-partner' },
      { label: 'Наші партнери', href: '/partners' }
    ]
  },
  {
    title: 'МУЗЕЙ',
    links: [{ label: 'Кабінет-архів', href: '/museum' }]
  }
];
const SocialMedia = [
  {
    icon: SocialMediaTypes.Instagram,
    href: 'https://www.instagram.com/liatoshynsky_foundation/'
  },
  {
    icon: SocialMediaTypes.Facebook,
    href: 'https://www.facebook.com/LiatoshynskyFoundation/'
  },
  {
    icon: SocialMediaTypes.YouTube,
    href: 'https://www.youtube.com/'
  }
];
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
