export type currencyType = 'uah' | 'usd' | 'eur' | 'gbp' | 'pln';

interface ICurrencyDetails {
  receiver: string;
  edrpou: number;
  bank: string;
  iban: string;
  bankAddress?: string;
  bankSwift?: string;
  intermediaryBankAccountNumber?: string;
  intermediaryBankName?: string;
  intermediaryBankAddress?: string;
  intermediaryBankSwift?: string;
}

export const currencyList: currencyType[] = ['uah', 'usd', 'eur', 'gbp', 'pln'];

type PaymentField = {
  label: string;
  key: keyof ICurrencyDetails;
  isIban?: boolean;
};

export const paymentFields: Record<'uah' | 'other', PaymentField[]> = {
  uah: [
    { label: 'Отримувач:', key: 'receiver' },
    { label: 'ЄДРПОУ:', key: 'edrpou' },
    { label: 'Банк:', key: 'bank' },
    { label: 'IBAN:', key: 'iban', isIban: true }
  ],
  other: [
    { label: 'Legal entity', key: 'receiver' },
    { label: 'Enterprise code:', key: 'edrpou' },
    { label: 'Bank name:', key: 'bank' },
    { label: 'Account number:', key: 'iban', isIban: true },
    { label: 'Intermediary bank:', key: 'intermediaryBankName' },
    { label: 'Intermediary account:', key: 'intermediaryBankAccountNumber' },
    { label: 'Intermediary address:', key: 'intermediaryBankAddress' },
    { label: 'Intermediary SWIFT:', key: 'intermediaryBankSwift' }
  ]
};

export const paymentDetails: Record<currencyType, ICurrencyDetails> = {
  uah: {
    receiver: 'ГО "ФУНДАЦІЯ ЛЯТОШИНСЬКОГО"',
    edrpou: 45111281,
    bank: 'АТ «УКРСИББАНК»',
    iban: 'UA283510050000026003879189233'
  },

  usd: {
    receiver: 'LF',
    edrpou: 45111281,
    bank: 'JOINT STOCK COMPANY "UKRSIBBANK"',
    iban: 'UA383510050000026009879189237',
    bankAddress: 'UKRSIBBANK ANDRIIVSKA STREET 2/12 KYIV, UKRAINE',
    bankSwift: 'KHABUA2K',
    intermediaryBankAccountNumber: '020061151200138',
    intermediaryBankName: 'BNP PARIBAS U.S.A. - New York Branch',
    intermediaryBankAddress: 'New York , USA',
    intermediaryBankSwift: 'BNPAUS3N'
  },

  eur: {
    receiver: 'LF',
    edrpou: 45111281,
    bank: 'JOINT STOCK COMPANY "UKRSIBBANK"',
    iban: 'UA563510050000026008879189238',
    bankAddress: 'UKRSIBBANK ANDRIIVSKA STREET 2/12 KYIV, UKRAINE',
    bankSwift: 'KHABUA2K',
    intermediaryBankAccountNumber: '07205696',
    intermediaryBankName: 'BNP PARIBAS SA',
    intermediaryBankAddress: 'Paris, FRANCE',
    intermediaryBankSwift: 'BNPAFRPP'
  },

  gbp: {
    receiver: 'LF',
    edrpou: 45111281,
    bank: 'JOINT STOCK COMPANY "UKRSIBBANK"',
    iban: 'UA493510050000026009879216490',
    bankAddress: 'UKRSIBBANK ANDRIIVSKA STREET 2/12 KYIV, UKRAINE',
    bankSwift: 'KHABUA2K',
    intermediaryBankAccountNumber: '10947113',
    intermediaryBankName: 'CITIBANK NA',
    intermediaryBankAddress: 'London, GREAT BRITAIN',
    intermediaryBankSwift: 'CITIGB2L'
  },

  pln: {
    receiver: 'LF',
    edrpou: 45111281,
    bank: 'JOINT STOCK COMPANY "UKRSIBBANK"',
    iban: 'UA463510050000026003879293378',
    bankAddress: 'UKRSIBBANK ANDRIIVSKA STREET 2/12 KYIV, UKRAINE',
    bankSwift: 'KHABUA2K',
    intermediaryBankAccountNumber: 'PL63160000030002000021660001',
    intermediaryBankName: 'BNP Paribas Bank Polska SA',
    intermediaryBankAddress: 'Warsaw, POLAND',
    intermediaryBankSwift: 'PPABPLPK'
  }
};
