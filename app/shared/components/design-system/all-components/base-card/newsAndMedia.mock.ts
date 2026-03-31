import type { BaseCardProps } from '~/ds-components/base-card/BaseCard';

import { getDynamicRoute } from '~/shared/components/constants/routes';

export const mockNewsCards: Omit<BaseCardProps, 'variant'>[] = [
  {
    image: '/images/placeholder.png',
    title: 'Концерт до 130-річчя Бориса Лятошинського',
    publicationDate: '15.01.25',
    description:
      'Національна філармонія України запрошує на урочистий концерт, присвячений ювілею видатного композитора. У програмі - найкращі твори майстра.',
    href: getDynamicRoute.newsItem('concert-130-anniversary')
  },
  {
    image: '/images/placeholder.png',
    title: 'Презентація нового запису Третьої симфонії',
    publicationDate: '10.01.25',
    description:
      'Фундація представляє цифрову реставрацію історичного запису Третьої симфонії під орудою Натана Рахліна 1951 року.',
    href: getDynamicRoute.newsItem('third-symphony-recording')
  },
  {
    image: '/images/placeholder.png',
    title: 'Відкриття виставки архівних матеріалів',
    publicationDate: '05.01.25',
    description:
      'У Національному музеї літератури відкрилась виставка рідкісних рукописів, листів та фотографій із родинного архіву композитора.',
    href: getDynamicRoute.newsItem('archive-exhibition')
  }
];

export const mockPressCards: Omit<BaseCardProps, 'variant'>[] = [
  {
    image: '/images/placeholder.png',
    title: '«Золотий Обруч»: майже детективна історія',
    publicationDate: '05.05.25',
    description:
      'З чого розпочинається підготовка до виконання будь-якого музичного твору? Відповідь є простою до банальності – треба взяти ноти. Однак, часто у випадках з творами українських композиторів ця банальність перетворюється в справжнє детективне розслідування і кропітку роботу цілої команди різнопрофільних фахівців.',
    href: '#'
  },
  {
    image: '/images/placeholder.png',
    title: 'Радіо Культура: Інтервю з головою Фундації',
    publicationDate: '15.12.24',
    description: 'Тетяна Гомон розповідає про діяльність Фундації та плани на 2025 рік у програмі "Музичний світ".',
    href: '#'
  },
  {
    image: '/images/placeholder.png',
    title: 'Український тиждень: Спадщина майстра',
    publicationDate: '10.12.24',
    description: 'Огляд нових публікацій та досліджень творчості Бориса Лятошинського за останні роки.',
    href: '#'
  }
];
