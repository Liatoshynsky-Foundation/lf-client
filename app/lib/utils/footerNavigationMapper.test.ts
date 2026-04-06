import { type FooterNavSection, mapFooterNavigation } from './footerNavigationMapper';

import { ROUTES } from '~/shared/components/constants/routes';

jest.mock('next-intl/server', () => ({
  getTranslations: jest.fn().mockResolvedValue((key: string) => {
    const mock: Record<string, string> = {
      news: 'News',
      events: 'Events',
      mediaAboutUs: 'Media About Us'
    };
    return mock[key];
  })
}));

describe('mapFooterNavigation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns sections unchanged if there is no /news link', async () => {
    const sections: FooterNavSection[] = [
      {
        title: 'Section 1',
        links: [
          { label: 'About', href: '/about' },
          { label: 'Contact', href: ROUTES.CONTACTS }
        ]
      }
    ];

    const result = await mapFooterNavigation(sections);

    expect(result).toEqual(sections);
    expect(result).not.toBe(sections);
  });

  it('replaces /news link with tabs', async () => {
    const sections: FooterNavSection[] = [
      {
        title: 'Foundation',
        links: [
          { label: 'About', href: '/about' },
          { label: 'News', href: ROUTES.NEWS }
        ]
      }
    ];

    const result = await mapFooterNavigation(sections);

    expect(result[0].links).toEqual([
      { label: 'About', href: '/about' },
      { label: 'News', href: `${ROUTES.NEWS}#news` },
      { label: 'Events', href: `${ROUTES.NEWS}#events` },
      { label: 'Media About Us', href: `${ROUTES.NEWS}#media` }
    ]);
  });

  it('preserves unrelated links', async () => {
    const sections: FooterNavSection[] = [
      {
        title: 'Foundation',
        links: [
          { label: 'About', href: '/about' },
          { label: 'News', href: ROUTES.NEWS }
        ]
      },
      {
        title: 'Misc',
        links: [{ label: 'Archive', href: ROUTES.ARCHIVE }]
      }
    ];

    const result = await mapFooterNavigation(sections);

    expect(result[1].links).toEqual(sections[1].links);
  });

  it('handles multiple /news links across sections', async () => {
    const sections: FooterNavSection[] = [
      {
        title: 'Foundation',
        links: [{ label: 'News', href: ROUTES.NEWS }]
      },
      {
        title: 'Another',
        links: [{ label: 'News again', href: ROUTES.NEWS }]
      }
    ];

    const result = await mapFooterNavigation(sections);

    expect(result[0].links).toEqual([
      { label: 'News', href: `${ROUTES.NEWS}#news` },
      { label: 'Events', href: `${ROUTES.NEWS}#events` },
      { label: 'Media About Us', href: `${ROUTES.NEWS}#media` }
    ]);

    expect(result[1].links).toEqual([
      { label: 'News', href: `${ROUTES.NEWS}#news` },
      { label: 'Events', href: `${ROUTES.NEWS}#events` },
      { label: 'Media About Us', href: `${ROUTES.NEWS}#media` }
    ]);
  });
});
