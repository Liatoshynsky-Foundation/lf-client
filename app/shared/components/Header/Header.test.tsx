import { render, screen } from '@testing-library/react';

import Header from './Header';
import { SupportButtonDataProps } from '~/types/types/header.type';

jest.mock('~/ds-components/logo/Logo', () => {
  const Logo = () => <div data-testid="logo" />;
  Logo.displayName = 'Logo';
  return Logo;
});
jest.mock('./MiddleContent/MiddleContent', () => {
  const MiddleContent = () => <div data-testid="middle-content" />;
  MiddleContent.displayName = 'Logo';
  return MiddleContent;
});
jest.mock('./RightActionsPanel/RightActionsPanel', () => ({ supportButtonData }: SupportButtonDataProps) => {
  const RightActionsPanel = () => <div data-testid="right-actions">{supportButtonData.text}</div>;
  RightActionsPanel.displayName = 'Logo';
  return RightActionsPanel;
});

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
