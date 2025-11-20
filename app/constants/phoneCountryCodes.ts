export const PHONE_COUNTRY_CODES: Record<
  string,
  {
    country: string;
    minPhoneLength: number;
    operatorCodeLength: number;
  }
> = {
  '+1': { country: 'United States / Canada', minPhoneLength: 11, operatorCodeLength: 3 },

  '+30': { country: 'Greece', minPhoneLength: 12, operatorCodeLength: 3 },
  '+31': { country: 'Netherlands', minPhoneLength: 11, operatorCodeLength: 2 },
  '+32': { country: 'Belgium', minPhoneLength: 11, operatorCodeLength: 3 },
  '+33': { country: 'France', minPhoneLength: 11, operatorCodeLength: 1 },
  '+34': { country: 'Spain', minPhoneLength: 11, operatorCodeLength: 2 },
  '+39': { country: 'Italy', minPhoneLength: 12, operatorCodeLength: 3 },

  '+351': { country: 'Portugal', minPhoneLength: 12, operatorCodeLength: 2 },
  '+353': { country: 'Ireland', minPhoneLength: 12, operatorCodeLength: 2 },
  '+354': { country: 'Iceland', minPhoneLength: 10, operatorCodeLength: 3 },

  '+370': { country: 'Lithuania', minPhoneLength: 11, operatorCodeLength: 3 },
  '+371': { country: 'Latvia', minPhoneLength: 11, operatorCodeLength: 3 },
  '+372': { country: 'Estonia', minPhoneLength: 11, operatorCodeLength: 4 },

  '+380': { country: 'Ukraine', minPhoneLength: 12, operatorCodeLength: 2 },
  '+420': { country: 'Czech Republic', minPhoneLength: 12, operatorCodeLength: 3 },
  '+421': { country: 'Slovakia', minPhoneLength: 12, operatorCodeLength: 3 },

  '+43': { country: 'Austria', minPhoneLength: 12, operatorCodeLength: 3 },
  '+44': { country: 'United Kingdom', minPhoneLength: 12, operatorCodeLength: 4 },
  '+45': { country: 'Denmark', minPhoneLength: 10, operatorCodeLength: 2 },
  '+46': { country: 'Sweden', minPhoneLength: 11, operatorCodeLength: 2 },
  '+47': { country: 'Norway', minPhoneLength: 10, operatorCodeLength: 4 },
  '+48': { country: 'Poland', minPhoneLength: 11, operatorCodeLength: 3 },
  '+49': { country: 'Germany', minPhoneLength: 13, operatorCodeLength: 3 },

  '+20': { country: 'Egypt', minPhoneLength: 12, operatorCodeLength: 2 },
  '+212': { country: 'Morocco', minPhoneLength: 12, operatorCodeLength: 1 },
  '+213': { country: 'Algeria', minPhoneLength: 12, operatorCodeLength: 1 },
  '+216': { country: 'Tunisia', minPhoneLength: 11, operatorCodeLength: 2 },
  '+218': { country: 'Libya', minPhoneLength: 12, operatorCodeLength: 2 },

  '+90': { country: 'Turkey', minPhoneLength: 12, operatorCodeLength: 3 },
  '+970': { country: 'Palestinian Territories', minPhoneLength: 13, operatorCodeLength: 2 },
  '+971': { country: 'United Arab Emirates', minPhoneLength: 12, operatorCodeLength: 2 },
  '+972': { country: 'Israel', minPhoneLength: 11, operatorCodeLength: 1 },
  '+973': { country: 'Bahrain', minPhoneLength: 11, operatorCodeLength: 4 },
  '+974': { country: 'Qatar', minPhoneLength: 11, operatorCodeLength: 4 },
  '+966': { country: 'Saudi Arabia', minPhoneLength: 12, operatorCodeLength: 3 },
  '+98': { country: 'Iran', minPhoneLength: 12, operatorCodeLength: 3 },

  '+27': { country: 'South Africa', minPhoneLength: 11, operatorCodeLength: 2 },
  '+234': { country: 'Nigeria', minPhoneLength: 13, operatorCodeLength: 3 },
  '+254': { country: 'Kenya', minPhoneLength: 12, operatorCodeLength: 3 },

  '+51': { country: 'Peru', minPhoneLength: 11, operatorCodeLength: 3 },
  '+52': { country: 'Mexico', minPhoneLength: 12, operatorCodeLength: 2 },
  '+54': { country: 'Argentina', minPhoneLength: 13, operatorCodeLength: 1 },
  '+55': { country: 'Brazil', minPhoneLength: 13, operatorCodeLength: 2 },
  '+56': { country: 'Chile', minPhoneLength: 11, operatorCodeLength: 1 },
  '+57': { country: 'Colombia', minPhoneLength: 12, operatorCodeLength: 3 },
  '+58': { country: 'Venezuela', minPhoneLength: 12, operatorCodeLength: 3 },

  '+60': { country: 'Malaysia', minPhoneLength: 11, operatorCodeLength: 2 },
  '+61': { country: 'Australia', minPhoneLength: 11, operatorCodeLength: 3 },
  '+62': { country: 'Indonesia', minPhoneLength: 13, operatorCodeLength: 3 },
  '+63': { country: 'Philippines', minPhoneLength: 12, operatorCodeLength: 3 },
  '+64': { country: 'New Zealand', minPhoneLength: 11, operatorCodeLength: 2 },
  '+65': { country: 'Singapore', minPhoneLength: 10, operatorCodeLength: 4 },
  '+66': { country: 'Thailand', minPhoneLength: 11, operatorCodeLength: 2 },

  '+81': { country: 'Japan', minPhoneLength: 11, operatorCodeLength: 1 },
  '+82': { country: 'South Korea', minPhoneLength: 12, operatorCodeLength: 2 },
  '+84': { country: 'Vietnam', minPhoneLength: 12, operatorCodeLength: 2 },
  '+86': { country: 'China', minPhoneLength: 13, operatorCodeLength: 3 },

  '+91': { country: 'India', minPhoneLength: 12, operatorCodeLength: 5 },
  '+92': { country: 'Pakistan', minPhoneLength: 12, operatorCodeLength: 3 },
  '+93': { country: 'Afghanistan', minPhoneLength: 11, operatorCodeLength: 2 },
  '+94': { country: 'Sri Lanka', minPhoneLength: 11, operatorCodeLength: 2 }
};
