'use client';

import { Box } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import React from 'react';

import animation1 from './animation-1.png';
import animation2 from './animation-2.png';
import animation3 from './animation-3.png';
import animation4 from './animation-4.png';
import animation5 from './animation-5.png';
import animation6 from './animation-6.png';
import animation7 from './animation-7.png';
import animation8 from './animation-8.png';
import logoSvg from './logo.svg';
import { useIntroAnimation } from './useIntroAnimation';

const ANIMATION_FRAMES = [
  animation1,
  animation2,
  animation3,
  animation4,
  animation5,
  animation6,
  animation7,
  animation8
];

interface IntroAnimationProps {
  children: React.ReactNode;
  onComplete?: () => void;
}

export const IntroAnimation: React.FC<IntroAnimationProps> = ({ children, onComplete }) => {
  const { stage, currentFrame, isAnimationComplete } = useIntroAnimation({
    splashDuration: 1000,
    frameInterval: 120,
    totalFrames: ANIMATION_FRAMES.length,
    expansionDuration: 1200
  });

  React.useEffect(() => {
    if (isAnimationComplete && onComplete) {
      onComplete();
    }
  }, [isAnimationComplete, onComplete]);

  const getCurrentImage = () => {
    if (stage === 'splash' || stage === 'expansion' || stage === 'reveal' || stage === 'complete') {
      return logoSvg;
    }

    if (currentFrame < ANIMATION_FRAMES.length) {
      return ANIMATION_FRAMES[currentFrame];
    }

    return logoSvg;
  };

  const currentImage = getCurrentImage();

  const splashVariants = {
    initial: { opacity: 1 },
    exit: { opacity: 0, transition: { duration: 0.3 } }
  };

  const contentVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: 'easeOut' as const
      }
    }
  };

  return (
    <>
      {/* Splash Screen */}
      <AnimatePresence>
        {(stage === 'splash' || stage === 'shape-shift') && (
          <motion.div
            variants={splashVariants}
            initial="initial"
            exit="exit"
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              backgroundColor: '#ffffff',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <motion.div
              style={{
                position: 'relative',
                width: '300px',
                height: '300px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Image
                src={currentImage}
                alt="Logo Animation"
                width={300}
                height={300}
                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'contain'
                }}
                priority
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expansion Stage */}
      <AnimatePresence>
        {stage === 'expansion' && (
          <Box
            sx={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              backgroundColor: '#ffffff',
              zIndex: 9998,
              pointerEvents: 'none'
            }}
          >
            <motion.div
              initial={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                x: '-50%',
                y: '-50%',
                width: '300px'
              }}
              animate={{
                top: 'auto',
                bottom: 0,
                left: '50%',
                x: '-50%',
                y: 0,
                width: '100vw'
              }}
              transition={{
                duration: 1.2,
                ease: [0.43, 0.13, 0.23, 0.96]
              }}
            >
              <Image
                src={currentImage}
                alt="Logo"
                width={300}
                height={300}
                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'contain'
                }}
                priority
              />
            </motion.div>
          </Box>
        )}
      </AnimatePresence>

      {/* Footer Logo (after expansion) */}
      <AnimatePresence>
        {(stage === 'reveal' || stage === 'complete') && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            style={{
              position: 'fixed',
              bottom: 0,
              left: 0,
              width: '100%',
              zIndex: 1,
              pointerEvents: 'none'
            }}
          >
            <Image
              src={logoSvg}
              alt="Logo Footer"
              width={1920}
              height={200}
              style={{
                width: '100%',
                height: 'auto',
                objectFit: 'cover'
              }}
              priority
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content Reveal */}
      <motion.div
        variants={contentVariants}
        initial="hidden"
        animate={stage === 'reveal' || stage === 'complete' ? 'visible' : 'hidden'}
        style={{
          position: 'relative',
          zIndex: 10
        }}
      >
        {children}
      </motion.div>
    </>
  );
};
