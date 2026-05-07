import { render, screen } from '@testing-library/react';
import React from 'react';

import SupportUs, { generateMetadata } from './page';
import { isProductionMode } from '~/utils/isProductionMode';

import { createRootContainer } from '~/di/container';

jest.mock('~/di/container', () => ({
  createRootContainer: jest.fn()
}));
jest.mock('~/utils/isProductionMode', () => ({
  isProductionMode: jest.fn()
}));
jest.mock('~/shared/components/blocks/actions-help/ActionsHelp.consts', () => {
  const { ROUTES } = jest.requireActual('~/shared/components/constants/routes');

  return {
    getActionsHelpData: jest.fn().mockResolvedValue({
      title: 'Допомогти справами',
      subtitle: {},
      paperItems: [],
      paperButton: {
        text: 'Запропонувати допомогу',
        link: ROUTES.COOPERATION
      }
    })
  };
});

jest.mock('~/shared/components/blocks/actions-help/ActionsHelp', () => {
  const MockActionsHelp = () => <div>Actions Help</div>;
  MockActionsHelp.displayName = 'ActionsHelp';
  return MockActionsHelp;
});

jest.mock('~/shared/components/blocks/FAQ/FAQ', () => {
  const MockFAQ = () => <div>FAQ</div>;
  MockFAQ.displayName = 'FAQ';
  return MockFAQ;
});

jest.mock('~/shared/components/blocks/support-foundation/SupportFoundation', () => {
  const MockSupportFoundation = () => <div>Support Foundation</div>;
  MockSupportFoundation.displayName = 'SupportFoundation';
  return MockSupportFoundation;
});

jest.mock('~/shared/layouts/main-layout/MainLayout', () => {
  const MockLayout = ({ children }: { children: React.ReactNode }) => <div>{children}</div>;
  MockLayout.displayName = 'MainLayout';
  return MockLayout;
});

jest.mock('~/components/under-development/UnderDevelopment', () => {
  const MockUnderDev = () => <div data-testid="under-dev">Under Development</div>;
  MockUnderDev.displayName = 'UnderDevelopment';
  return MockUnderDev;
});

describe('SupportUs page', () => {
  const mockLang = 'uk' as const;
  const mockFooterData = {
    contacts: { phone: '+38 067 000 00 00', email: 'test@test.com' }
  };
  const mockProps = {
    params: Promise.resolve({ lang: mockLang })
  };

  beforeEach(() => {
    jest.clearAllMocks();

    (createRootContainer as jest.Mock).mockReturnValue({
      resolve: jest.fn().mockReturnValue({
        getFooterData: jest.fn().mockResolvedValue(mockFooterData)
      })
    });

    (isProductionMode as jest.Mock).mockReturnValue(false);
  });

  it('should generate correct metadata', async () => {
    const metadata = await generateMetadata({ params: mockProps.params });
    expect(metadata).toBeDefined();
    expect(metadata.title).toBe('title');
  });

  it('should render support us page correctly when not in production', async () => {
    const ui = await SupportUs(mockProps);
    render(ui);

    expect(screen.getByText(/Support Foundation/i)).toBeInTheDocument();
    expect(screen.getByText(/Actions Help/i)).toBeInTheDocument();
    expect(screen.getByText(/FAQ/i)).toBeInTheDocument();
  });

  it('should render UnderDevelopment in production mode', async () => {
    (isProductionMode as jest.Mock).mockReturnValue(true);

    const ui = await SupportUs(mockProps);
    render(ui);

    expect(screen.getByTestId('under-dev')).toBeInTheDocument();
    expect(screen.queryByText(/Support Foundation/i)).not.toBeInTheDocument();
  });
});
