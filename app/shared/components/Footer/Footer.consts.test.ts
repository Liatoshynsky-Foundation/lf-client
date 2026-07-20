import { SocialMediaTypes } from '~/types/enums/common.enums';

import { ROUTES } from '~/shared/components/constants/routes';
import { contacts, footerData, sections, SocialMedia } from '~/shared/components/Footer/Footer.consts';

describe('footerData', () => {
  it('should export correct structure and values', () => {
    expect(footerData.text).toBe('© 2025 Liotoshynsky Foundation. Всі права захищені.');
    expect(footerData.links).toEqual([
      { label: 'Політика конфіденційності', href: '/privacy' },
      { label: 'Умови користування сайтом', href: ROUTES.TERMS }
    ]);
  });
});

describe('contacts', () => {
  it('should export correct title, phone and email', () => {
    expect(contacts).toEqual({
      title: 'ГРОМАДСЬКА ОРГАНІЗАЦІЯ \n«ФУНДАЦІЯ ЛЯТОШИНСЬКОГО»',
      phone: '067 963 8366',
      email: 'liatoshynsky@gmail.com'
    });
  });
});

describe('sections', () => {
  it('should export correct array of navigation links', () => {
    expect(Array.isArray(sections)).toBe(true);
    expect(sections).toHaveLength(4);

    expect(sections[0]).toEqual({
      title: 'БОРИС ЛЯТОШИНСЬКИЙ',
      links: [
        { label: 'Життєпис', href: ROUTES.BIOGRAPHY },
        { label: 'Творчість', href: ROUTES.ARTISTRY },
        { label: 'Дослідження та наукові роботи', href: ROUTES.RESEARCH }
      ]
    });

    expect(sections[1]).toEqual({
      title: 'ПРО ФУНДАЦІЮ',
      links: [
        { label: 'Про нас', href: ROUTES.ABOUT_US },
        { label: 'Новини', href: ROUTES.NEWS },
        { label: 'Ми у ЗМІ', href: '/media-about-us' }
      ]
    });

    expect(sections[2]).toEqual({
      title: 'СПІВПРАЦЯ',
      links: [
        { label: 'Стати партнером', href: '/become-partner' },
        { label: 'Наші партнери', href: '/partners' }
      ]
    });

    expect(sections[3]).toEqual({
      title: 'МУЗЕЙ',
      links: [{ label: 'Архів', href: '/museum' }]
    });
  });
});

describe('SocialMedia', () => {
  it('should export correct social media links and icons', () => {
    expect(Array.isArray(SocialMedia)).toBe(true);
    expect(SocialMedia).toHaveLength(3);

    expect(SocialMedia[0].icon).toBe(SocialMediaTypes.Instagram);
    expect(typeof SocialMedia[0].href).toBe('string');

    expect(SocialMedia[1].icon).toBe(SocialMediaTypes.Facebook);
    expect(typeof SocialMedia[1].href).toBe('string');

    expect(SocialMedia[2].icon).toBe(SocialMediaTypes.YouTube);
    expect(typeof SocialMedia[2].href).toBe('string');
  });
});
