import { TipTapMarkType, TipTapNodeTypes } from '~/types/enums/common.enums';
import { TipTapDoc } from '~/types/types/tiptap.types';

import { getNavigationLink } from '~/lib/utils/navigationHelper';

export async function getActionsHelpLink(): Promise<string> {
  return await getNavigationLink('/cooperation', 'cooperation');
}

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
      title: 'Допомога з перекладами',
      description:
        'Ми працюємо з архівами, партитурами, документами й записами, щоб відновити й упорядкувати культурну пам’ять.'
    },
    {
      title: 'Допомога з організацією заходів',
      description:
        'Якщо вам близька музика та культура — можна долучитись до команди під час концертів, виставок чи лекцій'
    },
    {
      title: 'Адмініструвати соцмережі',
      description:
        'Допомага з публікаціями, відповідями на повідомлення, аналітикою або візуальним оформленням контенту'
    }
  ],
  paperButton: {
    text: 'Запропонувати допомогу',
    link: await getActionsHelpLink()
  }
};
