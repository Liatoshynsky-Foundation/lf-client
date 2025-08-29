import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import DonationForm from './DonationForm';

jest.mock('../../design-system/all-components/button/Button', () => {
  const MockButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, ...props }) => (
    <button {...props}>{children}</button>
  );

  return {
    __esModule: true,
    default: MockButton
  };
});
describe('donation form', () => {
  beforeAll(() => {
    class ResizeObserver {
      observe() {}
      unobserve() {}
      disconnect() {}
    }
    (global as any).ResizeObserver = ResizeObserver;
  });
  beforeEach(() => {
    render(<DonationForm />);
  });
  it('should render default donation form', () => {
    expect(screen.getByText('ШВИДКО ЗАДОНАТИТИ:')).toBeInTheDocument();
    expect(screen.getByDisplayValue('0')).toBeInTheDocument();
    expect(screen.getByText('Разовий внесок')).toBeInTheDocument();
  });

  it('should switch to subscription', () => {
    fireEvent.click(screen.getByText('Підписка'));
    expect(screen.getByText('ПІДПИСАТИСЯ:')).toBeInTheDocument();
    expect(screen.getByText('Підписатися')).toBeInTheDocument();
  });

  it('should add suggest sum to input', () => {
    fireEvent.click(screen.getByText('+200'));
    expect(screen.getByDisplayValue('200')).toBeInTheDocument();
    fireEvent.click(screen.getByText('+500'));
    expect(screen.getByDisplayValue('700')).toBeInTheDocument();
  });

  it('should show entered value', () => {
    const input = screen.getByDisplayValue('0');
    fireEvent.change(input, {
      target: { value: '100' }
    });
    expect(screen.getByDisplayValue('100')).toBeInTheDocument();
    fireEvent.change(input, {
      target: { value: '' }
    });
    expect(screen.getByDisplayValue('')).toBeInTheDocument();
  });

  it('should switch currency', () => {
    fireEvent.click(screen.getByText('+200'));
    expect(screen.getByDisplayValue('200')).toBeInTheDocument();
    fireEvent.mouseDown(screen.getByRole('combobox'));
    fireEvent.click(screen.getByText('USD'));
    expect(screen.getByDisplayValue('0')).toBeInTheDocument();
  });
});
