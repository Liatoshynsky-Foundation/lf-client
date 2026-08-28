import { WarInUkrainePageSchema } from './war-in-ukraine.schema';
import { PageStatus } from '~/types/enums/common.enums';

describe('WarInUkrainePageSchema regression', () => {
  it('should preserve the "hidden" visibility flag on blocks', () => {
    const dummyText = { uk: 'текст', en: 'text' };
    const dummyTipTap = {
      uk: { type: 'doc', content: [] },
      en: { type: 'doc', content: [] }
    };

    const mockPayload = {
      _id: '507f1f77bcf86cd799439011',
      pageType: 'WarInUkrainePage',
      slug: 'war-in-ukraine',
      title: dummyText,
      status: PageStatus.Published,
      blocksOrder: ['WarInfo', 'PrincipleOfHope', 'YermolenkoLinks', 'VolunteerDonation'],
      blocks: {
        WarInfo: {
          hidden: true,
          title: dummyText,
          description: dummyTipTap
        },
        PrincipleOfHope: {
          buttonText: dummyText,
          description: dummyTipTap,
          buttons: []
        },
        YermolenkoLinks: {
          buttonText: dummyText,
          description: dummyTipTap,
          buttons: []
        },
        VolunteerDonation: {
          title: dummyText,
          imageSrc: '/placeholder.jpg',
          caption: dummyText,
          paymentMethods: []
        }
      }
    };

    const parsedData = WarInUkrainePageSchema.parse(mockPayload);

    expect(parsedData.blocks.WarInfo.hidden).toBe(true);
  });
});
