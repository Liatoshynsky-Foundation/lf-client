import { render, screen } from '@testing-library/react';

import FoundationWasCreated from './FoundationWasCreated';

jest.mock('next-intl/server', () => ({
  getTranslations: jest.fn().mockImplementation(async (namespace) => {
    const translations: Record<string, string> = {
      'foundation.foundationWasCreated': 'Фундація Лятошинського, заснована'
    };
    return (key: string) => translations[`${namespace}.${key}`] || key;
  })
}));

describe('FoundationWasCreated', () => {
  it('should render component correct', async () => {
    render(await FoundationWasCreated());
    const title = await screen.findByText(/фундація лятошинського, заснована/i);
    expect(title).toBeInTheDocument();
  });
});
