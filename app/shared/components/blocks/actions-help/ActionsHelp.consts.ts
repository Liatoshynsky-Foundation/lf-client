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
      title: 'Перекласти',
      description:
        'Знаєте мови? Допоможіть перекласти програмки, статті чи інтерв’ю, щоб про Лятошинського читали й за межами України.'
    },
    {
      title: 'Розповісти',
      description:
        'Можете написати статтю, зробити інтерв’ю чи залучити медіа? Це допоможе українській музиці звучати для ширшої аудиторії.'
    },
    {
      title: 'Зафільмувати',
      description:
        'Знімаєте події чи монтуєте короткі ролики? Ваші навички дуже потрібні для наших соцмереж, афіш і презентацій.'
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
