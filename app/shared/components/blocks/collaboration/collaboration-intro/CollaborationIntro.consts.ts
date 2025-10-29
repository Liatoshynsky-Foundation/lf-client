import { TipTapNodeTypes } from '~/types/enums/common.enums';
import { TipTapDoc } from '~/types/types/common.types';

export const collaborationIntroPageData = {
  title: 'СпіВпРацЯ',
  subtitle: 'Разом ми можемо більше',
  contentAbove: {
    type: TipTapNodeTypes.doc,
    content: [
      {
        type: TipTapNodeTypes.paragraph,
        content: [
          {
            type: TipTapNodeTypes.text,
            text: 'Ми віримо, що українська класична музика має звучати у світі — від Варшави до Нью-Йорку, Токіо та Абу Дабі. Фундація Лятошинського створена для того, щоб зберігати спадщину Бориса Лятошинського та підтримувати нові імена. І ця місія можлива лише у партнерстві з вами — людьми, які розділяють наші цінності.'
          }
        ]
      }
    ]
  } as TipTapDoc,
  content: {
    type: TipTapNodeTypes.doc,
    content: [
      {
        type: TipTapNodeTypes.paragraph,
        content: [
          {
            type: TipTapNodeTypes.text,
            text: 'Кожен наш партнер стає частиною історії української музики, яка продовжує звучати попри війну.'
          }
        ]
      }
    ]
  } as TipTapDoc
};
