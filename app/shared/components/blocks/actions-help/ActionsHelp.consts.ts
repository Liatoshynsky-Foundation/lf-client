import { TipTapMarkType, TipTapNodeTypes } from '~/types/enums/common.enums';
import { TipTapDoc } from '~/types/types/tiptap.types';

import { getNavigationLink } from '~/lib/utils/navigationHelper';

export const actionsHelpPageData = {
  title: 'Допомогти справами',
  subtitle: {
    type: TipTapNodeTypes.doc,
    content: [
      {
        type: TipTapNodeTypes.paragraph,
        content: [
          {
            type: TipTapNodeTypes.text,
            text: 'Нам дуже потрібні люди — з вашою експертизою, енергією і дрібкою часу, адже саме ваша участь допомагає українській музиці ставати помітнішою у світі. А що '
          },
          { type: TipTapNodeTypes.text, text: 'гучніше й впевненіше', marks: [{ type: TipTapMarkType.bold }] },
          {
            type: TipTapNodeTypes.text,
            text: ' вона звучить, то більше людей розуміють і підтримують нас — на всіх рівнях.'
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
    text: 'Запропонувати допомогу',
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
    title: 'Допомогти справами',
    subtitle: actionsHelpPageData.subtitle,
    paperItems: actionsHelpPageData.paperItems,
    paperButton: {
      ...actionsHelpPageData.paperButton,
      link
    }
  };
}
