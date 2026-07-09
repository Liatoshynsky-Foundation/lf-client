import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { useButtonCursor } from '../useButtonCursor';
import { BoxButton } from './BoxButton';

import useBreakpoints from '~/shared/hooks/use-breakpoints/useBreakpoints';

interface BoxProps {
  children?: React.ReactNode;
  'data-testid'?: string;
  onClick?: () => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLDivElement>) => void;
  onMouseEnter?: () => void;
}

interface CursorButtonProps {
  testID?: string;
  isHovering?: boolean;
}

jest.mock('../../HeroSection.styles', () => ({
  heroSectionStyles: {
    cursorButtonText: {},
    cursorButton: {}
  }
}));

const MockBox = React.forwardRef<HTMLDivElement, BoxProps>(
  ({ children, 'data-testid': testId, onClick, onKeyDown, onMouseEnter }, ref) => (
    <div ref={ref} data-testid={testId} onClick={onClick} onKeyDown={onKeyDown} onMouseEnter={onMouseEnter}>
      {children}
    </div>
  )
);
MockBox.displayName = 'MockBox';

jest.mock('@mui/material', () => ({
  Box: MockBox
}));

jest.mock('../CursorButton/CursorButton', () => ({
  CursorButton: ({ testID, isHovering }: CursorButtonProps) => <div data-testid={testID} data-hovering={isHovering} />
}));

jest.mock('../useButtonCursor', () => ({
  useButtonCursor: jest.fn()
}));

jest.mock('~/shared/hooks/use-breakpoints/useBreakpoints', () => jest.fn());

describe('BoxButton', () => {
  const mockOnClick = jest.fn();
  const mockEventHandlers = {
    onMouseEnter: jest.fn(),
    onMouseLeave: jest.fn(),
    onMouseMove: jest.fn()
  };
  const mockCursorConfig = {
    x: { get: () => 0, set: jest.fn() },
    y: { get: () => 0, set: jest.fn() },
    isHovering: false
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useButtonCursor as jest.Mock).mockReturnValue({
      cursorConfig: mockCursorConfig,
      eventHandlers: mockEventHandlers,
      ref: React.createRef()
    });
    (useBreakpoints as jest.Mock).mockReturnValue({
      isMobile: false
    });
  });

  it('should render main button layout and corresponding cursor overlay on non mobile views', () => {
    render(
      <BoxButton onClick={mockOnClick} cursorContent={{ text: 'Play', iconSrc: 'src' }}>
        <span>Content</span>
      </BoxButton>
    );

    expect(screen.getByTestId('box-button')).toBeInTheDocument();
    expect(screen.getByTestId('box-button-cursor')).toBeInTheDocument();
  });

  it('should prevent custom cursor generation and avoid assigning hover listeners on mobile viewport', () => {
    (useBreakpoints as jest.Mock).mockReturnValue({
      isMobile: true
    });

    render(
      <BoxButton onClick={mockOnClick}>
        <span>Content</span>
      </BoxButton>
    );

    expect(screen.getByTestId('box-button')).toBeInTheDocument();
    expect(screen.queryByTestId('box-button-cursor')).not.toBeInTheDocument();
  });

  it('should accept mouse interaction and execution execution trigger hook', () => {
    render(
      <BoxButton onClick={mockOnClick}>
        <span>Content</span>
      </BoxButton>
    );

    const button = screen.getByTestId('box-button');
    fireEvent.click(button);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('should trigger click callbacks on specific keyboard control down events', () => {
    render(
      <BoxButton onClick={mockOnClick}>
        <span>Content</span>
      </BoxButton>
    );

    const button = screen.getByTestId('box-button');

    fireEvent.keyDown(button, { key: 'Enter' });
    expect(mockOnClick).toHaveBeenCalledTimes(1);

    fireEvent.keyDown(button, { key: ' ' });
    expect(mockOnClick).toHaveBeenCalledTimes(2);

    fireEvent.keyDown(button, { key: 'Escape' });
    expect(mockOnClick).toHaveBeenCalledTimes(2);
  });

  it('should handle undefined callbacks on button triggers cleanly', () => {
    render(
      <BoxButton>
        <span>Content</span>
      </BoxButton>
    );

    const button = screen.getByTestId('box-button');

    expect(() => {
      fireEvent.click(button);
      fireEvent.keyDown(button, { key: 'Enter' });
    }).not.toThrow();
  });
});
