import { render, screen } from '@testing-library/react';

import SupportUs from './page';

jest.mock('~/components/blocks/actions-help/ActionsHelp', () => {
  const MockActionsHelp = () => <div>Actions Help</div>;
  MockActionsHelp.displayName = 'MockActionsHelp';
  return MockActionsHelp;
});

jest.mock('~/components/blocks/FAQ/FAQ', () => {
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
  it('should render support us page correctly', async () => {
    render(await SupportUs());

    expect(screen.getByText(/Actions Help/i)).toBeInTheDocument();
    expect(screen.getByText(/FAQ/i)).toBeInTheDocument();
  });

  it('should render the SupportFoundation component', async () => {
    render(await SupportUs());

    expect(screen.getByText(/Support Foundation/i)).toBeInTheDocument();
  });
});
