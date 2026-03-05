type Localized<T> = {
  uk: T;
  en: T;
};

type LocalizedString = Localized<string>;

export const heroQuote: LocalizedString = {
  uk: 'Ви дуже добре сприймаєте музику, дуже тонко її відчуваєте, і я переконаний, що під час другого прослуховування ви значно більше почуєте того, що існує «за нотами». Адже, зрештою, ноти — це лише «ноти», майстерність і т. п., але ви ж прекрасно знаєте, що в більшості музичних творів є ще й дещо «за нотами».',
  en: 'You perceive music very well, you feel it very subtly, and I am convinced that during the second listening you will hear much more of what exists "behind the notes". After all, notes are just "notes", skill, etc., but you know very well that in most musical works there is also something "behind the notes".'
};

export const heroQuoteSource: LocalizedString = {
  uk: 'Борис Лятошинський',
  en: 'Borys Liatoshynsky'
};

export const playbackButton = {
  startPlayback: {
    uk: 'Увімкнути музику',
    en: 'Play music'
  } as LocalizedString,
  stopPlayback: {
    uk: 'Зупинити музику',
    en: 'Stop music'
  } as LocalizedString
};
