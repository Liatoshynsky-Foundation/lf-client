import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { ComponentType } from 'react';

import TermsIntro from './TermsIntro';

jest.mock('~/public/icons/arrow-down.svg', () => ({
  __esModule: true,
  default: () => <svg data-testid="arrow-icon" />
}));

jest.mock('~/public/images/quote.svg', () => ({
  __esModule: true,
  default: () => <svg data-testid="quote-icon" />
}));

jest.mock('../../colored-svg/ColoredSvg', () => ({
  Svg: ({ Component, alt }: { Component: ComponentType<any>; alt?: string }) => (
    <div data-testid="svg-wrapper">
      <Component />
      {alt}
    </div>
  )
}));

describe('TermsIntro', () => {
  it('should render the main title', () => {
    render(<TermsIntro />);
    expect(screen.getByText(/УмОви KоРисТувАннЯ СайТоМ/i)).toBeInTheDocument();
  });

  it('should render the HTML content', () => {
    render(<TermsIntro />);
    expect(screen.getByText(/Вітаємо на сайті Фундації Лятошинського!/i)).toBeInTheDocument();
  });
});
