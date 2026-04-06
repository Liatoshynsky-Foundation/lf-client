import { getDynamicRoute, ROUTES } from '../../constants/routes';
import type { EventItemProps } from './EventItem';

export interface EventItemFixture {
  id: string;
  props: EventItemProps;
}

export const MOCK_EVENT_ITEMS: EventItemFixture[] = [
  {
    id: 'liatoshynsky-birthday-2026',
    props: {
      date: {
        startDate: '2026-02-03'
      },
      title: '131 років від дня народження Бориса Лятошинського',
      publishedAt: '2026-01-15T10:00:00.000Z',
      description:
        '3 лютого 2026 року виповнюється 131 рік від дня народження видатного українського композитора Бориса Лятошинського (1895–1968) — фундатора власної композиторської школи та одного з найвпливовіших митців ХХ століття. Фундація Лятошинського запрошує всіх шанувальників української музики до участі в урочистих заходах.',
      image: {
        src: '/news-mock-images/events2.png',
        alt: 'Портрет композитора Бориса Лятошинського'
      },
      href: `/uk${getDynamicRoute.newsItem('liatoshynsky-birthday-131')}`,
      actions: [
        {
          label: 'Детальніше',
          href: `/uk${getDynamicRoute.newsItem('liatoshynsky-birthday-131')}`
        }
      ]
    }
  },
  {
    id: 'foundation-website-launch-2026',
    props: {
      date: {
        startDate: '2026-02-13'
      },
      title: 'Офіційне відкриття сайту Фундації Лятошинського',
      publishedAt: '2026-02-01T12:00:00.000Z',
      description:
        '13 лютого 2026 року відбудеться урочисте відкриття офіційного сайту Фундації Лятошинського — цифрової платформи, присвяченої збереженню та популяризації творчої спадщини видатного українського композитора. На сайті ви знайдете унікальні архівні матеріали, наукові дослідження, аудіозаписи та відомості про майбутні культурні події.',
      image: {
        src: '/news-mock-images/events1.jpg',
        alt: 'Офіційне відкриття сайту Фундації Лятошинського'
      },
      href: `/uk${getDynamicRoute.newsItem('foundation-website-launch')}`,
      actions: [
        {
          label: 'Детальніше',
          href: `/uk${getDynamicRoute.newsItem('foundation-website-launch')}`
        },
        {
          label: 'Відвідати сайт',
          href: ROUTES.HOME
        }
      ]
    }
  }
];
