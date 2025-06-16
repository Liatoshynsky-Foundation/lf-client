import { render, screen } from '@testing-library/react';

import Header from './Header';

jest.mock('~/ds-components/logo/Logo', () => {
  const Logo = () => <div data-testid="logo" />;
  Logo.displayName = 'Logo';
  return Logo;
});
jest.mock('./MiddleContent/MiddleContent', () => {
  const MiddleContent = () => <div data-testid="middle-content" />;
  MiddleContent.displayName = 'MiddleContent';
  return MiddleContent;
});
jest.mock('./RightActionsPanel/RightActionsPanel', () => {
  const RightActionsPanel = () => <div data-testid="right-actions" />;
  RightActionsPanel.displayName = 'RightActionsPanel';
  return RightActionsPanel;
});

jest.mock('./RightActionsPanel/RightActionsPanel', () => ({
  __esModule: true,
  default: ({ supportButtonData }: { supportButtonData: { text: string; link: string } }) => (
    <div data-testid="right-actions">{supportButtonData.text}</div>
  )
}));

const mockedSupportButtonData = {
  text: 'Support Us',
  link: 'link'
};

describe('Header', () => {
  it('should render header with logo', async () => {
    render(<Header supportButtonData={mockedSupportButtonData} />);

    const logo = screen.getByTestId('logo');
    const middleContent = screen.getByTestId('middle-content');
    const rightPanel = screen.getByTestId('right-actions');

    expect(logo).toBeInTheDocument();
    expect(middleContent).toBeInTheDocument();
    expect(rightPanel.textContent).toContain('Support Us');
  });
});
