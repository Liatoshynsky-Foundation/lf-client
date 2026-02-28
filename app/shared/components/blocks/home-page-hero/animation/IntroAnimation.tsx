'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { FC, ReactNode, useState } from 'react';

import { wordEightPaths } from './logoSVGPaths';
import { WordMorpher } from './WordMorpher';

interface IntroAnimationProps {
  children: ReactNode;
  onComplete?: () => void;
}

export const IntroAnimation: FC<IntroAnimationProps> = ({ children }) => {
  const [showIntro, setShowIntro] = useState(true);
  const [showExpansion, setShowExpansion] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const expansionVariants = {
    initial: {
      width: '300px',
      y: 0
    },
    animate: {
      width: '100vw',
      y: 'calc(50vh - 50%)'
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
      <AnimatePresence onExitComplete={() => setShowExpansion(true)}>
        {showIntro && (
          <div
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
            <WordMorpher onComplete={() => setShowIntro(false)} />
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence
        onExitComplete={() => {
          setShowExpansion(false);
          setShowContent(true);
        }}
      >
        {showExpansion && (
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
              variants={expansionVariants}
              initial="initial"
              animate="animate"
              onAnimationComplete={() => setShowExpansion(false)}
              transition={{
                duration: 1.2,
                ease: [0.25, 0.1, 0.5, 1],
                opacity: { duration: 0.6, ease: 'easeInOut' }
              }}
              style={{
                position: 'relative',
                height: 'auto'
              }}
            >
              <svg
                viewBox="0 0 426 92"
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block'
                }}
              >
                {wordEightPaths.map((el, i) => (
                  <path key={i} d={el} />
                ))}
              </svg>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {(!showIntro || showContent) && (
        <motion.div
          variants={contentVariants}
          initial="hidden"
          animate="visible"
          style={{
            position: 'relative',
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            overflow: 'hidden'
          }}
        >
          {children}
        </motion.div>
      )}
    </>
  );
};
