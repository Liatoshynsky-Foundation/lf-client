import styled from '@emotion/styled';
import { render, screen } from '@testing-library/react';

import EmotionProvider from './EmotionProvider';

jest.mock('next/navigation', () => ({
  useServerInsertedHTML: jest.fn((callback) => {
    if (typeof callback === 'function') {
      const result = callback();
      if (result) {
        const styleElement = document.createElement('div');
        styleElement.innerHTML = result.props.dangerouslySetInnerHTML.__html;
        document.head.appendChild(styleElement);
      }
    }
  })
}));

const StyledTestComponent = styled.div`
  color: red;
  background-color: blue;
  padding: 10px;
`;

describe('EmotionProvider', () => {
  beforeEach(() => {
    document.head.innerHTML = '';
    jest.clearAllMocks();
  });

  it('should render children correctly', () => {
    render(
      <EmotionProvider>
        <div data-testid="test-child">Test Child</div>
      </EmotionProvider>
    );

    expect(screen.getByTestId('test-child')).toBeInTheDocument();
    expect(screen.getByTestId('test-child')).toHaveTextContent('Test Child');
  });

  it('should provide emotion cache context to children', () => {
    render(
      <EmotionProvider>
        <StyledTestComponent data-testid="styled-component">Styled Content</StyledTestComponent>
      </EmotionProvider>
    );

    const styledElement = screen.getByTestId('styled-component');
    expect(styledElement).toBeInTheDocument();
    expect(styledElement).toHaveTextContent('Styled Content');
  });

  it('should create cache with correct configuration', () => {
    render(
      <EmotionProvider>
        <StyledTestComponent data-testid="styled-component">Test</StyledTestComponent>
      </EmotionProvider>
    );

    const styledElement = screen.getByTestId('styled-component');
    expect(styledElement.className).toMatch(/css-/);
  });

  it('should handle multiple styled components', () => {
    const AnotherStyledComponent = styled.span`
      font-size: 14px;
      margin: 5px;
    `;

    render(
      <EmotionProvider>
        <StyledTestComponent data-testid="styled-1">First</StyledTestComponent>
        <AnotherStyledComponent data-testid="styled-2">Second</AnotherStyledComponent>
      </EmotionProvider>
    );

    expect(screen.getByTestId('styled-1')).toBeInTheDocument();
    expect(screen.getByTestId('styled-2')).toBeInTheDocument();

    expect(screen.getByTestId('styled-1').className).toMatch(/css-/);
    expect(screen.getByTestId('styled-2').className).toMatch(/css-/);
  });

  it('should maintain cache consistency across re-renders', () => {
    const { rerender } = render(
      <EmotionProvider>
        <StyledTestComponent data-testid="styled-component">Initial Content</StyledTestComponent>
      </EmotionProvider>
    );

    const initialClassName = screen.getByTestId('styled-component').className;

    rerender(
      <EmotionProvider>
        <StyledTestComponent data-testid="styled-component">Updated Content</StyledTestComponent>
      </EmotionProvider>
    );

    expect(screen.getByTestId('styled-component').className).toBe(initialClassName);
  });
});
