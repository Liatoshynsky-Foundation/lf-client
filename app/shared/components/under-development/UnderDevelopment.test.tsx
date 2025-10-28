import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';

jest.unmock('~/components/under-development/UnderDevelopment');

import UnderDevelopment from './UnderDevelopment';

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      title: 'Сторінка в розробці',
      subtitle: 'Ми працюємо над цією сторінкою',
      button: 'Повернутися на головну'
    };
    return translations[key];
  }
}));

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ href, children }: any) => <a href={href}>{children}</a>
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ alt }: { alt: string }) => <img alt={alt} />
}));

jest.mock('../paper-component/PaperComponent', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <div data-testid="paper">{children}</div>
}));

jest.mock('../design-system/all-components/button/Button', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <button>{children}</button>
}));

describe('UnderDevelopment component', () => {
  it('should render without crashing', () => {
    render(<UnderDevelopment />);
    expect(screen.getByTestId('paper')).toBeInTheDocument();
  });

  it('should render the logo image', () => {
    render(<UnderDevelopment />);
    expect(screen.getByAltText('logo')).toBeInTheDocument();
  });

  it('should display translated title and subtitle', () => {
    render(<UnderDevelopment />);
    expect(screen.getByText('Сторінка в розробці')).toBeInTheDocument();
    expect(screen.getByText('Ми працюємо над цією сторінкою')).toBeInTheDocument();
  });

  it('should render button with translated label', () => {
    render(<UnderDevelopment />);
    const button = screen.getByRole('button', { name: 'Повернутися на головну' });
    expect(button).toBeInTheDocument();
  });

  it('should wrap the button inside a link to "/"', () => {
    render(<UnderDevelopment />);
    const link = screen.getByRole('link', { name: 'Повернутися на головну' });
    expect(link).toHaveAttribute('href', '/');
  });
});
