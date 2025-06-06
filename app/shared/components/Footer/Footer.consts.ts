import { SocialMediaTypes } from '~/types/enums/common.enums';

export const footerData = {
  text: '© 2025 Liotoshynsky Foundation. Всі права захищені.',
  links: [
    { label: 'Політика конфіденційності', href: '/privacy' },
    { label: 'Умови користування сайтом', href: '/terms' },
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
