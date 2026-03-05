import { TipTapMarkType, TipTapNodeTypes } from '~/types/enums/common.enums';
import { TipTapDoc } from '~/types/types/tiptap.types';

import { getNavigationLink } from '~/lib/utils/navigationHelper';

export const actionsHelpPageData = {
  title: {
    uk: 'Допомогти справами',
    en: 'Help with actions'
  },
  subtitle: {
    type: TipTapNodeTypes.doc,
    content: [
      {
        type: TipTapNodeTypes.paragraph,
        content: [
          {
            type: TipTapNodeTypes.multiLangText,
            text: {
              uk: 'Нам дуже потрібні люди — з вашою експертизою, енергією і дрібкою часу, адже саме ваша участь допомагає українській музиці ставати помітнішою у світі. А що ',
              en: 'We really need people — with your expertise, energy and a bit of time, because it is your participation that helps Ukrainian music become more visible in the world. And the more '
            }
          },
          {
            type: TipTapNodeTypes.multiLangText,
            text: { uk: 'гучніше й впевненіше', en: 'louder and more confident' },
            marks: [{ type: TipTapMarkType.bold }]
          },
          {
            type: TipTapNodeTypes.multiLangText,
            text: {
              uk: ' вона звучить, то більше людей розуміють і підтримують нас — на всіх рівнях.',
              en: ' the louder it sounds, the more people understand and support us — at all levels.'
            }
          }
        ]
      }
    ]
  } as TipTapDoc,
  paperItems: [
    {
      title: { uk: 'Допомога з перекладами', en: 'Help with Translations' },
      description: {
        uk: 'Ми працюємо з архівами, партитурами, документами й записами, щоб відновити й упорядкувати культурну пам’ять.',
        en: 'We work with archives, sheet music, documents and recordings to restore and organize cultural memory.'
      }
    },
    {
      title: { uk: 'Допомога з організацією заходів', en: 'Help with Event Organization' },
      description: {
        uk: 'Якщо вам близька музика та культура — можна долучитись до команди під час концертів, виставок чи лекцій',
        en: 'If you are close to music and culture — you can join the team during concerts, exhibitions or lectures'
      }
    },
    {
      title: { uk: 'Допомога з комунікацією', en: 'Help with Communication' },
      description: {
        uk: 'Допомага з публікаціями, відповідями на повідомлення, аналітикою або візуальним оформленням контенту',
        en: 'Help with publications, responding to messages, analytics or visual design of content'
      }
    }
  ],
  paperButton: {
    text: { uk: 'Запропонувати допомогу', en: 'Propose Help' },
    link: '/'
  }
};

export async function getActionsHelpData() {
  let link = '/';
  try {
    link = await getNavigationLink('/cooperation', 'cooperation');
  } catch (err) {
    console.warn('Could not get navigation link:', err);
  }

  return {
    title: actionsHelpPageData.title,
    subtitle: actionsHelpPageData.subtitle,
    paperItems: actionsHelpPageData.paperItems,
    paperButton: {
      ...actionsHelpPageData.paperButton,
      link
    }
  };
}
