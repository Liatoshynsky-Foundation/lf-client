import { makeDoc, normalText } from '~/lib/utils/tiptapHelpers';

export const collaborationIntroPageData = {
  uk: {
    title: 'СпіВпРацЯ',
    subtitle: 'Разом ми можемо більше',
    contentAbove: makeDoc([
      normalText(
        'Ми віримо, що українська класична музика має звучати у світі — від Варшави до Нью-Йорку, Токіо та Абу Дабі. Фундація Лятошинського створена для того, щоб зберігати спадщину Бориса Лятошинського та підтримувати нові імена. І ця місія можлива лише у партнерстві з вами — людьми, які розділяють наші цінності.'
      )
    ]),
    content: makeDoc([
      normalText('Кожен наш партнер стає частиною історії української музики, яка продовжує звучати попри війну.')
    ])
  },
  en: {
    title: 'Cooperation',
    subtitle: 'Together we can do more',
    contentAbove: makeDoc([
      normalText(
        'We believe that Ukrainian classical music should be heard around the world — from Warsaw to New York, Tokyo, and Abu Dhabi. The Liatoshynsky Foundation was created to preserve the legacy of Borys Liatoshynsky and to support new names in classical music. This mission is possible only in partnership with people like you — those who share our values.'
      )
    ]),
    content: makeDoc([
      normalText(
        'Each of our partners becomes part of the history of Ukrainian music, which continues to resonate despite the war.'
      )
    ])
  }
};
