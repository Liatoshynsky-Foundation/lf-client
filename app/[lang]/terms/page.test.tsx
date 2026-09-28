import { render, screen } from '@testing-library/react';
import React from 'react';

import Terms, { generateMetadata } from './page';
import * as envUtils from '~/utils/isProductionMode';

jest.mock('~/utils/isProductionMode', () => ({
  isProductionMode: jest.fn()
}));

jest.mock('next-intl/server', () => ({
  getTranslations: jest.fn().mockResolvedValue((key: string) => key),
  setRequestLocale: jest.fn()
}));

jest.mock('~/components/blocks/terms-of-use/TermsOfUse', () => {
  const MockTerms = () => <div data-testid="terms-of-use">Terms of Use Content</div>;
  MockTerms.displayName = 'TermsOfUse';
  return MockTerms;
});

jest.mock('~/layouts/main-layout/MainLayout', () => {
  const MockLayout = ({ children }: { children: React.ReactNode }) => <div>{children}</div>;
  MockLayout.displayName = 'MainLayout';
  return MockLayout;
});

jest.mock('~/components/under-development/UnderDevelopment', () => {
  const MockUnderDev = () => <div data-testid="under-dev">Under Development</div>;
  MockUnderDev.displayName = 'UnderDevelopment';
  return MockUnderDev;
});

jest.mock('~/di/container', () => ({
  createRootContainer: () => ({
    resolve: () => ({
      getFooterData: jest.fn().mockResolvedValue({
        contacts: {
          email: 'lffoundation@gmail.com',
          phone: '+3800000000'
        }
      })
    })
  })
}));

describe('Terms page', () => {
  const mockParams = Promise.resolve({ lang: 'uk' as const });

  beforeEach(() => {
    jest.clearAllMocks();
    (envUtils.isProductionMode as jest.Mock).mockReturnValue(false);
  });

  it('should generate correct metadata', async () => {
    const metadata = await generateMetadata({ params: mockParams });
    expect(metadata).toBeDefined();
    expect(metadata.title).toBe('title');
  });

  it('should render terms of use content when not in production', async () => {
    const jsx = await Terms({ params: mockParams });
    render(jsx);

    expect(screen.getByTestId('terms-of-use')).toBeInTheDocument();
    expect(screen.queryByTestId('under-dev')).not.toBeInTheDocument();
  });

  it('should render UnderDevelopment in production mode', async () => {
    (envUtils.isProductionMode as jest.Mock).mockReturnValue(true);
    const jsx = await Terms({ params: mockParams });
    render(jsx);

    expect(screen.getByTestId('under-dev')).toBeInTheDocument();
    expect(screen.queryByTestId('terms-of-use')).not.toBeInTheDocument();
  });
});
