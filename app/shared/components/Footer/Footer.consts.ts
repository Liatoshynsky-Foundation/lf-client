import { SocialMediaTypes } from '~/types/enums/common.enums';

import { ROUTES } from '~/shared/components/constants/routes';

export const footerData = {
  text: '© 2025 Liotoshynsky Foundation. Всі права захищені.',
  links: [
    { label: 'Політика конфіденційності', href: '/privacy' },
    { label: 'Умови користування сайтом', href: ROUTES.TERMS },
    { label: 'Інформація для медіа / партнерів', href: '/media' }
  ]
};

export const contacts = {
  title: 'ГРОМАДСЬКА ОРГАНІЗАЦІЯ \n«ФУНДАЦІЯ ЛЯТОШИНСЬКОГО»',
  phone: '067 963 8366',
  email: 'liatoshynsky@gmail.com'
};

export const sections = [
  {
    title: 'БОРИС ЛЯТОШИНСЬКИЙ',
    links: [
      { label: 'Життєпис', href: ROUTES.BIOGRAPHY },
      { label: 'Творчість', href: ROUTES.ARTISTRY },
      { label: 'Дослідження та наукові роботи', href: ROUTES.RESEARCH }
    ]
  },
  {
    title: 'ПРО ФУНДАЦІЮ',
    links: [
      { label: 'Про нас', href: ROUTES.ABOUT_US },
      { label: 'Новини', href: ROUTES.NEWS },
      { label: 'Ми у ЗМІ', href: '/media-about-us' }
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
    links: [{ label: 'Архів', href: '/museum' }]
  }
];

export const SocialMedia = [
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
