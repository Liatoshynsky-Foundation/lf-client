import { TipTapMarkType, TipTapNodeTypes } from '~/types/enums/common.enums';
import { TipTapDoc } from '~/types/types/common.types';

export const actionsHelpPageData = {
  title: 'Допомогти справами',
  subtitle: {
    type: TipTapNodeTypes.doc,
    content: [
      {
        type: TipTapNodeTypes.paragraph,
        content: [
          { type: TipTapNodeTypes.text, text: 'Допомагати можна не лише донатами — іноді ' },
          { type: TipTapNodeTypes.text, text: 'найцінніша', marks: [{ type: TipTapMarkType.bold }] },
          {
            type: TipTapNodeTypes.text,
            text: ' підтримка — це ваші знання, досвід і час. Навіть кілька годин на місяць можуть стати важливим внеском у розвиток фонду. Долучайтеся до наших ініціатив — '
          },
          { type: TipTapNodeTypes.text, text: 'разом ми зможемо більше.', marks: [{ type: TipTapMarkType.bold }] }
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
    link: '/'
  }
};
