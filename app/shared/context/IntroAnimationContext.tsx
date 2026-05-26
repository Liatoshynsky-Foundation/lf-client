'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

interface IntroAnimationContextType {
  hasSeenIntro: boolean;
  markIntroAsSeen: () => void;
  isInitialized: boolean;
}

const IntroAnimationContext = createContext<IntroAnimationContextType | undefined>(undefined);

export const IntroAnimationProvider = ({ children }: { children: React.ReactNode }) => {
  const [hasSeenIntro, setHasSeenIntro] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const storedValue = sessionStorage.getItem('hasSeenIntro');
    if (storedValue === 'true') {
      setHasSeenIntro(true);
    }
    setIsInitialized(true);
  }, []);

  const markIntroAsSeen = () => {
    setHasSeenIntro(true);
    sessionStorage.setItem('hasSeenIntro', 'true');
  };

  return (
    <IntroAnimationContext.Provider value={{ hasSeenIntro, markIntroAsSeen, isInitialized }}>
      {children}
    </IntroAnimationContext.Provider>
  );
};

export const useIntroAnimation = () => {
  const context = useContext(IntroAnimationContext);
  if (context === undefined) {
    throw new Error('useIntroAnimation must be used within an IntroAnimationProvider');
  }
  return context;
};
