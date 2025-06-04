'use client';

import { CacheProvider } from '@emotion/react';
import createEmotionCache from '~/lib/utils/createEmotionCache';
import { useState } from 'react';

interface EmotionProviderProps {
  children: React.ReactNode;
}

const EmotionProvider: React.FC<EmotionProviderProps> = ({ children }) => {
  const [emotionCache] = useState(() => createEmotionCache());

  return <CacheProvider value={emotionCache}>{children}</CacheProvider>;
};

export default EmotionProvider;
