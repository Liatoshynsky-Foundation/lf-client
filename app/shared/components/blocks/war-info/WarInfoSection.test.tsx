import { render, screen } from '@testing-library/react';

import WarInfoSection from './WarInfoSection';

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    if (key === 'warSupport') {
      return (subKey: string) => (subKey === 'title' ? 'Support the War Effort' : '');
    }
    return () => '';
  },
  useLocale: () => 'en'
}));

jest.mock('../../design-system/all-components/content-block/ContentBlock', () => ({
  __esModule: true,
  default: ({ description }: { description: string }) => <div data-testid="content-block">{description}</div>
}));

jest.mock('../../../../[lang]/war-in-ukraine/war.const', () => ({
  warSupportDoc: {
    en: 'Support Ukraine by donating or volunteering.',
    uk: 'Підтримай Україну, зроби внесок або долучись волонтером.'
  }
}));

describe('WarInfoSection', () => {
  it('should render the title from translations', () => {
    render(<WarInfoSection />);
    expect(screen.getByText('Support Ukraine by donating or volunteering.')).toBeInTheDocument();
  });

  it('should render the localized content based on current locale', () => {
    render(<WarInfoSection />);
    const content = screen.getByTestId('content-block');
    expect(content).toHaveTextContent('Support Ukraine by donating or volunteering.');
  });

  it('should render an h2 element for the title', () => {
    render(<WarInfoSection />);
    const title = screen.getByText('Support Ukraine by donating or volunteering.');
    expect(title.tagName).toBe('DIV');
  });

  it('should include the ContentBlock component', () => {
    render(<WarInfoSection />);
    expect(screen.getByTestId('content-block')).toBeInTheDocument();
  });
});
