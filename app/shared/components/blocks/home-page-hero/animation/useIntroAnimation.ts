import { useEffect, useState } from 'react';

export type AnimationStage = 'splash' | 'shape-shift' | 'expansion' | 'reveal' | 'complete';

interface UseIntroAnimationReturn {
  stage: AnimationStage;
  currentFrame: number;
  isAnimationComplete: boolean;
}

interface UseIntroAnimationConfig {
  splashDuration?: number; // Duration to show initial logo
  frameInterval?: number; // Time between shape-shift frames
  totalFrames?: number; // Total number of shape-shift animation frames
  expansionDuration?: number; // Duration of expansion animation
}

const DEFAULT_CONFIG: Required<UseIntroAnimationConfig> = {
  splashDuration: 1000, // 1 second
  frameInterval: 150, // 150ms per frame
  totalFrames: 8, // 8 animation frames
  expansionDuration: 1200 // 1.2 seconds
};

export const useIntroAnimation = (config: UseIntroAnimationConfig = {}): UseIntroAnimationReturn => {
  const [stage, setStage] = useState<AnimationStage>('splash');
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);

  const { splashDuration, frameInterval, totalFrames, expansionDuration } = { ...DEFAULT_CONFIG, ...config };

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (stage === 'splash') {
      // Stage 1: Show splash screen
      timer = setTimeout(() => {
        setStage('shape-shift');
        setCurrentFrame(0);
      }, splashDuration);
    } else if (stage === 'shape-shift') {
      // Stage 2: Shape-shifting animation
      if (currentFrame < totalFrames) {
        timer = setTimeout(() => {
          setCurrentFrame((prev) => prev + 1);
        }, frameInterval);
      } else {
        // All frames shown, return to logo and move to expansion
        timer = setTimeout(() => {
          setStage('expansion');
        }, frameInterval);
      }
    } else if (stage === 'expansion') {
      // Stage 3: Expansion animation
      timer = setTimeout(() => {
        setStage('reveal');
      }, expansionDuration);
    } else if (stage === 'reveal') {
      // Stage 4: Content reveal
      timer = setTimeout(() => {
        setStage('complete');
        setIsAnimationComplete(true);
      }, 800); // Short delay for reveal animation
    }

    return () => clearTimeout(timer);
  }, [stage, currentFrame, splashDuration, frameInterval, totalFrames, expansionDuration]);

  return {
    stage,
    currentFrame,
    isAnimationComplete
  };
};
