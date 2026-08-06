import { render, screen } from '@testing-library/react';
import React from 'react';

import NotesConfirmModal from './NotesConfirmModal';

jest.mock('~/ds-components/button/Button', () => {
  const MockButton = ({
    fullWidth: _fullWidth,
    ...props
  }: React.ComponentProps<'button'> & { fullWidth?: boolean }) => (
    <button data-testid="confirm-btn" {...props}>
      {props.children}
    </button>
  );
  MockButton.displayName = 'MockButton';
  return MockButton;
});

jest.mock('~/ds-components/logo/Logo', () => {
  const MockLogo = (props: { color?: string; variant?: string }) => (
    <div data-testid="logo">
      {props.color}-{props.variant}
    </div>
  );
  MockLogo.displayName = 'MockLogo';
  return MockLogo;
});
jest.mock('~/public/images/signature.svg', () => {
  const MockSignature = () => <svg data-testid="signature" />;
  MockSignature.displayName = 'MockSignature';
  return MockSignature;
});

describe('NotesConfirmModal', () => {
  const title = 'Confirmation Title';
  const subtitle = 'Confirmation Subtitle';
  const btnText = 'Confirm';

  it('should render title, subtitle, logo, signature, and button', () => {
    render(<NotesConfirmModal title={title} subtitle={subtitle} btnText={btnText} />);
    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(subtitle)).toBeInTheDocument();
    expect(screen.getByTestId('logo')).toBeInTheDocument();
    expect(screen.getByTestId('signature')).toBeInTheDocument();
    expect(screen.getByTestId('confirm-btn')).toBeInTheDocument();
    expect(screen.getByTestId('confirm-btn')).toHaveTextContent(btnText);
  });

  it('should pass correct props to Logo', () => {
    render(<NotesConfirmModal title={title} subtitle={subtitle} btnText={btnText} />);
    expect(screen.getByTestId('logo')).toHaveTextContent('#EDE8DF-office');
  });

  it('should render button with correct text', () => {
    render(<NotesConfirmModal title={title} subtitle={subtitle} btnText={btnText} />);
    expect(screen.getByTestId('confirm-btn')).toHaveTextContent(btnText);
  });
});
