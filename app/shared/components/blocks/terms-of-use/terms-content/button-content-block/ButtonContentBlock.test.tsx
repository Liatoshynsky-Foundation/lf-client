// ButtonContentBlock.test.tsx
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import ButtonContentBlock from './ButtonContentBlock';
import { TipTapNodeTypes } from '~/types/enums/common.enums';
import { TipTapDoc } from '~/types/types/common.types';

jest.mock('~/shared/components/design-system/all-components/content-block/ContentBlock', () => ({
  __esModule: true,
  default: ({ description }: { description: TipTapDoc }) => (
    <div data-testid="content-block">{JSON.stringify(description)}</div>
  )
}));

jest.mock('~/shared/components/design-system/all-components/button/Button', () => ({
  __esModule: true,
  default: ({ children, color }: { children: React.ReactNode; color: string }) => (
    <button data-testid="button" data-color={color}>
      {children}
    </button>
  )
}));

jest.mock('~/shared/components/colored-svg/ColoredSvg', () => ({
  __esModule: true,
  Svg: ({ alt }: { alt: string }) => <span data-testid="svg-icon">{alt}</span>
}));

describe('ButtonContentBlock', () => {
  const mockContent: TipTapDoc = {
    type: TipTapNodeTypes.doc,
    content: [{ type: TipTapNodeTypes.paragraph, content: [{ type: TipTapNodeTypes.text, text: 'Hello world' }] }]
  };

  it('should render a button with text', () => {
    render(<ButtonContentBlock buttonText="Click me" content={mockContent} />);
    expect(screen.getByTestId('button')).toBeInTheDocument();
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('should render the icon inside the button', () => {
    render(<ButtonContentBlock buttonText="Click me" content={mockContent} />);
    expect(screen.getByTestId('svg-icon')).toHaveTextContent('icon');
  });

  it('should pass the correct color to the button', () => {
    render(<ButtonContentBlock buttonText="Colored btn" buttonColor="secondary" content={mockContent} />);
    expect(screen.getByTestId('button')).toHaveAttribute('data-color', 'secondary');
  });

  it('should render the ContentBlock with the passed content', () => {
    render(<ButtonContentBlock buttonText="With content" content={mockContent} />);
    expect(screen.getByTestId('content-block')).toHaveTextContent('Hello world');
  });
});
