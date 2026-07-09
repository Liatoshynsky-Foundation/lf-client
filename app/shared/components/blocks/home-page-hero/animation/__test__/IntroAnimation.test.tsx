import { act, render, screen } from '@testing-library/react';
import React from 'react';

import { IntroAnimation } from '../IntroAnimation';

import { useIntroAnimation } from '~/shared/context/IntroAnimationContext';

type GenericProps = {
  children?: React.ReactNode;
  onExitComplete?: () => void;
  onAnimationComplete?: () => void;
  'data-testid'?: string;
  style?: React.CSSProperties;
  testID?: string;
  onComplete?: () => void;
};

type GlobalWithTriggers = typeof globalThis & {
  triggerExpansionAnimationComplete: (() => void) | null;
  triggerWordMorpherComplete: (() => void) | null;
};

const customGlobal = global as unknown as GlobalWithTriggers;

jest.mock('~/shared/components/design-system/all-components/theme/Theme', () => ({
  theme: {
    zIndex: {
      introAnimationBackground: 9999,
      introAnimationExpansion: 10000
    }
  }
}));

const MockMotionDiv = ({ children, 'data-testid': testId, onAnimationComplete, style }: GenericProps) => {
  React.useEffect(() => {
    if (onAnimationComplete) {
      customGlobal.triggerExpansionAnimationComplete = onAnimationComplete;
    }
  }, [onAnimationComplete]);
  return (
    <div data-testid={testId} style={style}>
      {children}
    </div>
  );
};

jest.mock('framer-motion', () => {
  return {
    AnimatePresence: ({ children, onExitComplete }: GenericProps) => {
      const isFirstRender = React.useRef(true);
      const prevChildren = React.useRef(children);

      React.useEffect(() => {
        if (isFirstRender.current) {
          isFirstRender.current = false;
          return;
        }
        if (prevChildren.current && !children && onExitComplete) {
          onExitComplete();
        }
        prevChildren.current = children;
      }, [children, onExitComplete]);

      return <>{children}</>;
    },
    motion: {
      div: MockMotionDiv
    }
  };
});

jest.mock('../WordMorpher', () => ({
  WordMorpher: ({ onComplete, testID }: GenericProps) => {
    React.useEffect(() => {
      if (onComplete) {
        customGlobal.triggerWordMorpherComplete = onComplete;
      }
    }, [onComplete]);
    return <div data-testid={testID} />;
  }
}));

jest.mock('../logoSVGPaths', () => ({
  wordEightPaths: ['M0 0h10v10H0z', 'M20 20h10v10H20z']
}));

jest.mock('~/shared/context/IntroAnimationContext', () => ({
  useIntroAnimation: jest.fn()
}));

describe('IntroAnimation', () => {
  const mockMarkIntroAsSeen = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    customGlobal.triggerWordMorpherComplete = null;
    customGlobal.triggerExpansionAnimationComplete = null;
  });

  it('should render loading overlay when context is not initialized', () => {
    (useIntroAnimation as jest.Mock).mockReturnValue({
      isInitialized: false,
      hasSeenIntro: false,
      markIntroAsSeen: mockMarkIntroAsSeen
    });

    const { container } = render(
      <IntroAnimation>
        <div data-testid="child-content">Content</div>
      </IntroAnimation>
    );

    expect(screen.queryByTestId('child-content')).not.toBeInTheDocument();
    expect(container.firstChild).toHaveStyle({ position: 'fixed', backgroundColor: '#ffffff' });
  });

  it('should immediately render children if intro has already been seen', () => {
    (useIntroAnimation as jest.Mock).mockReturnValue({
      isInitialized: true,
      hasSeenIntro: true,
      markIntroAsSeen: mockMarkIntroAsSeen
    });

    render(
      <IntroAnimation>
        <div data-testid="child-content">Content</div>
      </IntroAnimation>
    );

    expect(screen.getByTestId('child-content')).toBeInTheDocument();
    expect(screen.queryByTestId('intro-animation-overlay')).not.toBeInTheDocument();
  });

  it('should execution animation step sequences from morphing to full content visibility', () => {
    (useIntroAnimation as jest.Mock).mockReturnValue({
      isInitialized: true,
      hasSeenIntro: false,
      markIntroAsSeen: mockMarkIntroAsSeen
    });

    render(
      <IntroAnimation testID="custom-intro">
        <div data-testid="child-content">Content</div>
      </IntroAnimation>
    );

    expect(screen.getByTestId('custom-intro-overlay')).toBeInTheDocument();
    expect(screen.getByTestId('custom-intro-word-morpher')).toBeInTheDocument();

    act(() => {
      if (customGlobal.triggerWordMorpherComplete) {
        customGlobal.triggerWordMorpherComplete();
      }
    });

    expect(screen.queryByTestId('custom-intro-overlay')).not.toBeInTheDocument();
    expect(screen.getByTestId('custom-intro-expansion')).toBeInTheDocument();
    expect(screen.getByTestId('custom-intro-expansion-svg')).toBeInTheDocument();

    act(() => {
      if (customGlobal.triggerExpansionAnimationComplete) {
        customGlobal.triggerExpansionAnimationComplete();
      }
    });

    expect(screen.queryByTestId('custom-intro-expansion')).not.toBeInTheDocument();
    expect(mockMarkIntroAsSeen).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId('child-content')).toBeInTheDocument();
  });
});
