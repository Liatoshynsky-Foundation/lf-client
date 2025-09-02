export type currencyType = 'uah' | 'usd' | 'eur' | 'gbp';
interface ICurrencyDetails {
  receiver: string;
  edrpou: number;
  bank: string;
  iban: string;
}

export const currencyList = ['uah', 'usd', 'eur', 'gbp'];

export const paymentFields: { label: string; key: keyof ICurrencyDetails; isIban?: boolean }[] = [
  { label: 'Отримувач:', key: 'receiver' },
  { label: 'ЄДРПОУ:', key: 'edrpou' },
  { label: 'Банк:', key: 'bank' },
  { label: 'IBAN:', key: 'iban', isIban: true }
];

export const paymentDetails: Record<currencyType, ICurrencyDetails> = {
  uah: {
    receiver: 'ГО "ФУНДАЦІЯ ЛЯТОШИНСЬКОГО"',
    edrpou: 45111281,
    bank: 'АТ «УКРСИББАНК»',
    iban: 'UA283510050000026003879189233'
  },

  usd: {
    receiver: 'ГО "ФУНДАЦІЯ ЛЯТОШИНСЬКОГО"',
    edrpou: 45111281,
    bank: 'АТ «УКРСИББАНК»',
    iban: 'UA283510050000026003879189233USD'
  },

  eur: {
    receiver: 'ГО "ФУНДАЦІЯ ЛЯТОШИНСЬКОГО"',
    edrpou: 45111281,
    bank: 'АТ «УКРСИББАНК»',
    iban: 'UA283510050000026003879189233EUR'
  },

  gbp: {
    receiver: 'ГО "ФУНДАЦІЯ ЛЯТОШИНСЬКОГО"',
    edrpou: 45111281,
    bank: 'АТ «УКРСИББАНК»',
    iban: 'UA283510050000026003879189233GBP'
  }
};
