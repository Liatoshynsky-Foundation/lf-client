'use client';
import { interpolateAll, splitPathString } from 'flubber';
import { animate, motion, MotionValue, useMotionValue, useTransform } from 'framer-motion';
import { FC, useEffect, useRef, useState } from 'react';

import logoMatrix from './logoSVGPaths';

type Interpolator = (t: number) => string;

type FlubberPathProps = {
  progress: MotionValue<number>;
  index: number;
  testID?: string;
};

type WordMorpherProps = {
  onComplete?: () => void;
  testID?: string;
};

const buildBridge = (pathIndex: number, stepIndex: number): Interpolator => {
  const currentLogo = logoMatrix[stepIndex];
  const nextLogo = logoMatrix[(stepIndex + 1) % logoMatrix.length];

  const startPath = currentLogo[pathIndex] || '';
  const endPath = nextLogo[pathIndex] || '';

  try {
    const startShapes = splitPathString(startPath);
    const endShapes = splitPathString(endPath);

    return interpolateAll(startShapes, endShapes, {
      maxSegmentLength: 5,
      single: true
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn(
      //we don't want to spam logger with these warnings, but it's useful to have them in dev console for debugging
      `[WordMorpher] Flubber failed to interpolate path at index ${pathIndex} between step ${stepIndex} and next. Falled back to static path.`,
      error
    );
    return (_t) => startPath;
  }
};

const FlubberPath: FC<FlubberPathProps> = ({ progress, index, testID }) => {
  const interpolatorsRef = useRef<Interpolator[]>([]);

  if (interpolatorsRef.current.length === 0) {
    interpolatorsRef.current[0] = buildBridge(index, 0);
  }

  useEffect(() => {
    let nextToCalculate = 1;

    const idleInterval = setInterval(() => {
      if (nextToCalculate < logoMatrix.length) {
        interpolatorsRef.current[nextToCalculate] = buildBridge(index, nextToCalculate);
        nextToCalculate++;
      } else {
        clearInterval(idleInterval);
      }
    }, 150);

    return () => clearInterval(idleInterval);
  }, [index]);

  const d = useTransform(progress, (latest: number) => {
    const stepIndex = Math.min(Math.floor(latest), logoMatrix.length - 1);
    const percentage = latest - stepIndex;

    const interpolator = interpolatorsRef.current[stepIndex] || interpolatorsRef.current[0];
    return interpolator(percentage);
  });

  return <motion.path d={d} fill="#190D03" fillRule="evenodd" clipRule="evenodd" data-testid={testID} />;
};

export const WordMorpher: FC<WordMorpherProps> = ({ onComplete, testID = 'word-morpher' }) => {
  const [step, setStep] = useState(0);
  const progress = useMotionValue(0);

  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    let autoplayTimer: ReturnType<typeof setInterval>;

    const handleAnimationComplete = () => {
      document.body.style.overflow = '';
      clearInterval(autoplayTimer);
      setTimeout(() => {
        onCompleteRef.current?.();
      }, 400);
    };

    const updateStep = (prevStep: number) => {
      if (prevStep < logoMatrix.length - 1) {
        return prevStep + 1;
      }
      handleAnimationComplete();
      return prevStep;
    };

    const startAnimationLoop = () => {
      autoplayTimer = setInterval(() => {
        setStep(updateStep);
      }, 800);
    };

    const initialDelayTimer = setTimeout(startAnimationLoop, 1000);

    return () => {
      clearTimeout(initialDelayTimer);
      clearInterval(autoplayTimer);
    };
  }, []);

  useEffect(() => {
    const controls = animate(progress, step, {
      duration: 0.5
    });
    return controls.stop;
  }, [step, progress]);

  const maxLengthSVG = Math.max(...logoMatrix.map((logo) => logo.length));

  return (
    <svg
      style={{ position: 'relative' }}
      width="300"
      height="300"
      viewBox="0 0 426 92"
      xmlns="http://www.w3.org/2000/svg"
      data-testid={testID}
    >
      {Array.from({ length: maxLengthSVG }).map((_, index) => (
        <FlubberPath key={index} index={index} progress={progress} testID={`${testID}-path-${index}`} />
      ))}
    </svg>
  );
};
