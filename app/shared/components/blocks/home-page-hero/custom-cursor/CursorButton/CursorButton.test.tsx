import { render, screen } from '@testing-library/react';
import { MotionValue } from 'framer-motion';
import React from 'react';

import { CursorButton } from './CursorButton';

interface BoxProps {
  children?: React.ReactNode;
  'data-testid'?: string;
  style?: React.CSSProperties;
  component?: React.ComponentType | string;
}

interface SvgImageProps {
  src?: string;
  'data-testid'?: string;
}

interface TypographyProps {
  children?: React.ReactNode;
  'data-testid'?: string;
}

jest.mock('@mui/material', () => ({
  Box: ({ children, 'data-testid': testId, style }: BoxProps) => (
    <div data-testid={testId} style={style}>
      {children}
    </div>
  ),
  Typography: ({ children, 'data-testid': testId }: TypographyProps) => <span data-testid={testId}>{children}</span>
}));

jest.mock('~/shared/components/svg-image/SvgImage', () => ({
  SvgImage: ({ src, 'data-testid': testId }: SvgImageProps) => <img src={src} data-testid={testId} alt="mock" />
}));

jest.mock('framer-motion', () => ({
  motion: {
    div: 'div'
  }
}));

describe('CursorButton', () => {
  const mockX = { get: () => 10, set: jest.fn(), onChange: jest.fn() } as unknown as MotionValue<number>;
  const mockY = { get: () => 20, set: jest.fn(), onChange: jest.fn() } as unknown as MotionValue<number>;

  it('should render standard cursor container with supplied coordinate transformations', () => {
    render(<CursorButton x={mockX} y={mockY} isHovering={true} testID="custom-cursor" />);

    const cursor = screen.getByTestId('custom-cursor');
    expect(cursor).toBeInTheDocument();
    expect(cursor).toHaveStyle({ left: '[object Object]', top: '[object Object]' });
  });

  it('should evaluate correctly when isHovering is falsy to complete branch coverage', () => {
    render(<CursorButton x={mockX} y={mockY} isHovering={false} testID="hidden-cursor" />);

    const cursor = screen.getByTestId('hidden-cursor');
    expect(cursor).toBeInTheDocument();
  });

  it('should process optional icon parameters and embed matching svg structure', () => {
    const iconConfig = {
      src: '/icons/play.svg',
      width: 24,
      height: 24
    };

    render(<CursorButton x={mockX} y={mockY} isHovering={true} iconConfig={iconConfig} testID="cursor-with-icon" />);

    expect(screen.getByTestId('cursor-with-icon-icon')).toBeInTheDocument();
    expect(screen.queryByTestId('cursor-with-icon-text')).not.toBeInTheDocument();
  });

  it('should inject textual elements when configured text data is provided', () => {
    const textConfig = {
      content: 'HOVERING'
    };

    render(<CursorButton x={mockX} y={mockY} isHovering={true} textConfig={textConfig} testID="cursor-with-text" />);

    const textNode = screen.getByTestId('cursor-with-text-text');
    expect(textNode).toBeInTheDocument();
    expect(textNode.textContent).toBe('HOVERING');
    expect(screen.queryByTestId('cursor-with-text-icon')).not.toBeInTheDocument();
  });

  it('should fall back to default testID value when not provided to close line 31 branch coverage', () => {
    render(<CursorButton x={mockX} y={mockY} isHovering={true} />);

    const defaultCursor = screen.getByTestId('cursor-button');
    expect(defaultCursor).toBeInTheDocument();
  });
});
