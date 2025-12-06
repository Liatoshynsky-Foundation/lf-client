import { type FooterNavSection, mapFooterNavigation } from './footerNavigationMapper';

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
          { label: 'Contact', href: '/contacts' }
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
          { label: 'News', href: '/news' }
        ]
      }
    ];

    const result = await mapFooterNavigation(sections);

    expect(result[0].links).toEqual([
      { label: 'About', href: '/about' },
      { label: 'News', href: '/news#news' },
      { label: 'Events', href: '/news#events' },
      { label: 'Media About Us', href: '/news#media' }
    ]);
  });

  it('preserves unrelated links', async () => {
    const sections: FooterNavSection[] = [
      {
        title: 'Foundation',
        links: [
          { label: 'About', href: '/about' },
          { label: 'News', href: '/news' }
        ]
      },
      {
        title: 'Misc',
        links: [{ label: 'Archive', href: '/archive' }]
      }
    ];

    const result = await mapFooterNavigation(sections);

    expect(result[1].links).toEqual(sections[1].links);
  });

  it('handles multiple /news links across sections', async () => {
    const sections: FooterNavSection[] = [
      {
        title: 'Foundation',
        links: [{ label: 'News', href: '/news' }]
      },
      {
        title: 'Another',
        links: [{ label: 'News again', href: '/news' }]
      }
    ];

    const result = await mapFooterNavigation(sections);

    expect(result[0].links).toEqual([
      { label: 'News', href: '/news#news' },
      { label: 'Events', href: '/news#events' },
      { label: 'Media About Us', href: '/news#media' }
    ]);

    expect(result[1].links).toEqual([
      { label: 'News', href: '/news#news' },
      { label: 'Events', href: '/news#events' },
      { label: 'Media About Us', href: '/news#media' }
    ]);
  });
});
