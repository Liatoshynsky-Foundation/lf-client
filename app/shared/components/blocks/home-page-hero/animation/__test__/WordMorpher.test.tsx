import { act, render, screen } from '@testing-library/react';
import React from 'react';

type TransformCallback = (latest: number) => string;

interface MotionValueMock {
  get: () => number;
  set: (v: number) => void;
  onChange: () => () => void;
}

jest.mock('flubber', () => ({
  interpolateAll: jest.fn().mockImplementation(() => (t: number) => `MOCK-PATH-${t}`),
  splitPathString: jest.fn().mockImplementation((p: string) => [p])
}));

jest.mock('framer-motion', () => {
  return {
    useMotionValue: (initial: number): MotionValueMock => ({
      get: () => initial,
      set: jest.fn(),
      onChange: () => () => undefined
    }),
    useTransform: (value: MotionValueMock, transformer: TransformCallback) => {
      return transformer(4.5);
    },
    animate: jest.fn().mockImplementation(() => ({
      stop: jest.fn()
    })),
    motion: {
      path: ({ d, 'data-testid': testId }: { d: string; 'data-testid'?: string }) => <path d={d} data-testid={testId} />
    }
  };
});

jest.mock('../logoSVGPaths', () => {
  return {
    __esModule: true,
    default: [
      ['M0 0', 'M10 10'],
      ['M5 5', 'M15 15'],
      ['M0 0', ''],
      ['M2 2', 'M12 12'],
      ['M3 3', 'M13 13']
    ],
    wordOnePaths: ['M0 0'],
    wordTwoPaths: ['M0 0'],
    wordThreePaths: ['M0 0']
  };
});

import { WordMorpher } from '../WordMorpher';

describe('WordMorpher', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
    document.body.style.overflow = '';
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should manipulate body style and execute loop sequence until execution callback', () => {
    const mockOnComplete = jest.fn();

    render(<WordMorpher onComplete={mockOnComplete} testID="custom-morpher" />);

    expect(screen.getByTestId('custom-morpher')).toBeInTheDocument();
    expect(document.body.style.overflow).toBe('hidden');

    act(() => {
      jest.advanceTimersByTime(150);
    });

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    act(() => {
      jest.advanceTimersByTime(800 * 5);
    });

    act(() => {
      jest.advanceTimersByTime(400);
    });

    expect(document.body.style.overflow).toBe('');
    expect(mockOnComplete).toHaveBeenCalledTimes(1);
  });

  it('should complete processing even without onComplete hook provided', () => {
    render(<WordMorpher testID="no-callback-morpher" />);

    expect(screen.getByTestId('no-callback-morpher')).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(1000 + 800 * 5 + 400);
    });

    expect(document.body.style.overflow).toBe('');
  });

  it('should catch builder failures gracefully and output fallback static path information', () => {
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => undefined);

    const flubberMock = jest.requireMock('flubber');
    flubberMock.splitPathString.mockImplementationOnce(() => {
      throw new Error('Flubber Parsing Error');
    });

    render(<WordMorpher testID="failure-morpher" />);

    expect(screen.getByTestId('failure-morpher')).toBeInTheDocument();
    expect(consoleWarnSpy).toHaveBeenCalled();

    consoleWarnSpy.mockRestore();
  });
});
