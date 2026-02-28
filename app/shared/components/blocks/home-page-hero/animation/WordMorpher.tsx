import { interpolateAll, splitPathString } from 'flubber';
import { animate, motion, MotionValue, useMotionValue, useTransform } from 'framer-motion';
import { FC, useEffect, useRef, useState } from 'react';

import logoMatrix from './logoSVGPaths';

type Interpolator = (t: number) => string;

interface FlubberPathProps {
  progress: MotionValue<number>;
  index: number;
}

interface WordMorpherProps {
  onComplete?: () => void;
}

const buildBridge = (pathIndex: number, stepIndex: number): Interpolator => {
  const currentLogo = logoMatrix[stepIndex];
  const nextLogo = logoMatrix[(stepIndex + 1) % logoMatrix.length];

  const startPath = currentLogo[pathIndex];
  const endPath = nextLogo[pathIndex];

  try {
    const startShapes = splitPathString(startPath);
    const endShapes = splitPathString(endPath);
    return interpolateAll(startShapes, endShapes, {
      maxSegmentLength: 2,
      single: true
    });
  } catch (err) {
    console.error(err);
    return (_t) => startPath;
  }
};

const FlubberPath: FC<FlubberPathProps> = ({ progress, index }) => {
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

  const d = useTransform(progress, (latest) => {
    const stepIndex = Math.min(Math.floor(latest), logoMatrix.length - 1);
    const percentage = latest - stepIndex;

    const interpolator = interpolatorsRef.current[stepIndex] || interpolatorsRef.current[0];
    return interpolator(percentage);
  });

  return <motion.path d={d} fill="#190D03" fillRule="evenodd" clipRule="evenodd" />;
};

export const WordMorpher: FC<WordMorpherProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const progress = useMotionValue(0);

  const onCompleteRef = useRef(onComplete);

  useEffect(() => (onCompleteRef.current = onComplete), [onComplete]);

  useEffect(() => {
    let initialDelayTimer: ReturnType<typeof setTimeout>;
    let autoplayTimer: ReturnType<typeof setInterval>;

    initialDelayTimer = setTimeout(() => {
      autoplayTimer = setInterval(() => {
        setStep((prevStep) => {
          if (prevStep < logoMatrix.length - 1) {
            return prevStep + 1;
          } else {
            clearInterval(autoplayTimer);

            setTimeout(() => {
              if (onCompleteRef.current) onCompleteRef.current();
            }, 400);

            return prevStep;
          }
        });
      }, 800);
    }, 1000);

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
    >
      {Array.from({ length: maxLengthSVG }).map((_, index) => (
        <FlubberPath key={index} index={index} progress={progress} />
      ))}
    </svg>
  );
};
