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

describe('SupportUs page', () => {
  it('should render support us page correctly', async () => {
    render(await SupportUs());

    expect(screen.getByText(/Actions Help/i)).toBeInTheDocument();
    expect(screen.getByText(/FAQ/i)).toBeInTheDocument();
  });
});
