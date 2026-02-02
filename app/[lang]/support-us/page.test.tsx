import { render, screen } from '@testing-library/react';

import SupportUs from './page';

import { createRootContainer } from '~/di/container';

jest.mock('~/di/container', () => ({
  createRootContainer: jest.fn()
}));

jest.mock('~/shared/components/blocks/actions-help/ActionsHelp.consts', () => ({
  getActionsHelpData: jest.fn().mockResolvedValue({
    title: 'Допомогти справами',
    subtitle: {},
    paperItems: [],
    paperButton: {
      text: 'Запропонувати допомогу',
      link: '/cooperation'
    }
  })
}));

jest.mock('~/shared/components/blocks/actions-help/ActionsHelp', () => {
  const MockActionsHelp = () => <div>Actions Help</div>;
  MockActionsHelp.displayName = 'MockActionsHelp';
  return MockActionsHelp;
});

jest.mock('~/shared/components/blocks/FAQ/FAQ', () => {
  const MockFAQ = () => <div>FAQ</div>;
  MockFAQ.displayName = 'MockFAQ';
  return MockFAQ;
});

jest.mock('~/shared/components/blocks/support-foundation/SupportFoundation', () => {
  const MockSupportFoundation = () => <div>Support Foundation</div>;
  MockSupportFoundation.displayName = 'MockSupportFoundation';
  return MockSupportFoundation;
});

describe('SupportUs page', () => {
  const mockLang = 'uk';
  const mockFooterData = {
    contacts: {
      phone: '+38 067 000 00 00',
      email: 'test@test.com'
    }
  };

  const mockProps = {
    params: Promise.resolve({ lang: mockLang as any })
  };

  beforeEach(() => {
    (createRootContainer as jest.Mock).mockReturnValue({
      resolve: jest.fn().mockReturnValue({
        getFooterData: jest.fn().mockResolvedValue(mockFooterData)
      })
    });
  });

  it('should render support us page correctly', async () => {
    render(await SupportUs(mockProps));

    expect(screen.getByText(/Actions Help/i)).toBeInTheDocument();
    expect(screen.getByText(/FAQ/i)).toBeInTheDocument();
  });

  it('should render the SupportFoundation component', async () => {
    render(await SupportUs(mockProps));

    expect(screen.getByText(/Support Foundation/i)).toBeInTheDocument();
  });
});
