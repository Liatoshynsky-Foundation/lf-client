import React from 'react';

export const partnershipFormatsData = {
  title: 'Формати партнерства:',
  row1Card1: {
    icon: '/icons/circle-note-1.svg',
    title: 'Технічна підтримка',
    list: ['Звукове обладнання', 'Онлайн-трансляції', 'Логістика подій', 'Оцифрування архівів']
  },
  row1Card2: {
    icon: '/icons/circle-note-2.svg',
    title: 'Інформаційна підтримка',
    list: ['Інтерв’ю та аналітика', 'Музична критика', 'Залучення медіа', 'Переклади матеріалів']
  },
  row1Image: {
    src: '/images/partnership-formats-photo-small.png',
    alt: 'Partnership collaboration',
    width: 400,
    height: 300,
    borderWidth: 2
  },
  row2Image: {
    src: '/images/partnership-formats-photo-large.png',
    alt: 'Team collaboration',
    width: 400,
    height: 300,
    borderWidth: 2
  },
  row2Card1: {
    icon: '/icons/circle-note-3.svg',
    title: 'Спільні проєкти',
    list: ['Концерти та фестивалі', 'Освітні програми', 'Інтеграція у корпоративні події', 'Міжнародні колаборації']
  },
  row2Card2: {
    icon: '/icons/circle-note-4.svg',
    title: 'Фінансова підтримка і меценатство',
    list: ['Разові внески', 'Регулярна підтримка', 'CSR-програми компаній', 'Цільове фінансування проєктів']
  },
  row3Text:
    'Ми цінуємо кожну співпрацю та підтримку — фінансову, інформаційну, експертну чи технічну. І, звісно, відкриті до нових ідей та форматів. Вище — перелік наших пропозицій та потреб, за відгук на які ми завжди щиро вдячні. Напишіть нам, навіть якщо хочете долучитися у форматі, який тут не вказано. Можливості є завжди.',
  row4ButtonText: 'Запропонувати допомогу',
  modalContent: React.createElement(
    'div',
    { style: { padding: '20px' } },
    React.createElement('h2', null, 'Форма заявки на партнерство'),
    // prettier-ignore
    React.createElement('p', null, 'Заповніть форму і ми зв\'яжемося з вами найближчим часом.')
  )
};
