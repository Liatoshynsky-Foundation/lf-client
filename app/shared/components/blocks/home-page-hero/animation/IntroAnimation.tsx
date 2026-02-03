'use client';

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
import LogoSvg from './logo.svg';
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
    frameInterval: 180,
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
      return null;
    }

    if (currentFrame < ANIMATION_FRAMES.length) {
      return ANIMATION_FRAMES[currentFrame];
    }

    return null;
  };

  const currentImage = getCurrentImage();

  const splashVariants = {
    initial: { opacity: 1 },
    exit: {
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1] as const // Smooth cubic-bezier easing
      }
    }
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
              key={stage === 'shape-shift' ? currentFrame : 'splash'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.15,
                ease: [0.25, 0.1, 0.25, 1] // Smooth easing for frame transitions
              }}
              style={{
                position: 'relative',
                width: '300px',
                height: '300px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {currentImage ? (
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
              ) : (
                <LogoSvg
                  style={{
                    width: '100%',
                    height: 'auto'
                  }}
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expansion Stage */}
      <AnimatePresence>
        {stage === 'expansion' && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              backgroundColor: '#ffffff',
              zIndex: 9998,
              pointerEvents: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <motion.div
              initial={{
                width: '300px',
                y: 0,
                opacity: 1
              }}
              animate={{
                width: '100vw',
                y: 'calc(50vh - 50%)',
                opacity: 1
              }}
              transition={{
                duration: 1.2,
                ease: [0.25, 0.1, 0.25, 1],
                opacity: { duration: 0.8, ease: 'easeInOut' }
              }}
              style={{
                position: 'relative',
                height: 'auto'
              }}
            >
              {currentImage ? (
                <Image
                  src={currentImage}
                  alt="Logo"
                  width={300}
                  height={300}
                  style={{
                    width: '100%',
                    height: 'auto',
                    objectFit: 'contain',
                    display: 'block'
                  }}
                  priority
                />
              ) : (
                <LogoSvg
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block'
                  }}
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content and Footer in Column Layout */}
      <motion.div
        variants={contentVariants}
        initial="hidden"
        animate={stage === 'reveal' || stage === 'complete' ? 'visible' : 'hidden'}
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          overflow: 'hidden'
        }}
      >
        {/* Content (HeroSection) */}
        {children}

        {/* Footer Logo (after expansion) - below hero */}
        <AnimatePresence>
          {(stage === 'reveal' || stage === 'complete') && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              style={{
                position: 'relative',
                width: '100vw',
                marginLeft: 'calc(-50vw + 50%)',
                marginRight: 'calc(-50vw + 50%)',
                pointerEvents: 'none',
                padding: 0,
                display: 'block'
              }}
            >
              <LogoSvg
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  margin: 0,
                  padding: 0
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};
