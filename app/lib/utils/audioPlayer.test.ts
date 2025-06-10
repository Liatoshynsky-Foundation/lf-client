import { calculateProgress, formatTime } from './audioPlayer';

describe('formatTime', () => {
  it('should format seconds into MM:SS format', () => {
    expect(formatTime(0)).toBe('0:00');
    expect(formatTime(5)).toBe('0:05');
    expect(formatTime(65)).toBe('1:05');
    expect(formatTime(600)).toBe('10:00');
    expect(formatTime(3599)).toBe('59:59');
  });
});

describe('calculateProgress', () => {
  const mockRef = {
    current: {
      getBoundingClientRect: () => ({ left: 100, width: 200 })
    }
  } as React.RefObject<HTMLDivElement>;

  it('should return 0 when ref is null', () => {
    const result = calculateProgress({ clientX: 150 } as MouseEvent, {
      current: null
    });
    expect(result).toBe(0);
  });

  it('should calculate correct progress based on mouse position', () => {
    const event = { clientX: 150 } as MouseEvent;
    const result = calculateProgress(event, mockRef);
    expect(result).toBeCloseTo(0.25);
  });

  it('should clamp the result between 0 and 1', () => {
    const underflow = { clientX: 50 } as MouseEvent;
    const overflow = { clientX: 350 } as MouseEvent;

    expect(calculateProgress(underflow, mockRef)).toBe(0);
    expect(calculateProgress(overflow, mockRef)).toBe(1);
  });
});
