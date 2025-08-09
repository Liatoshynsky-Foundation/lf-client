'use client';
import { createContext, useContext } from 'react';

import { useRemotePanel } from '~/hooks/use-remote-panel/useRemotePanel';
type RemotePanelContextType = ReturnType<typeof useRemotePanel> | null;

const PanelContext = createContext<RemotePanelContextType>(null);

export const PanelProvider = ({ children }: { children: React.ReactNode }) => {
  const panel = useRemotePanel();
  return <PanelContext.Provider value={panel}>{children}</PanelContext.Provider>;
};

export const usePanel = () => {
  const ctx = useContext(PanelContext);
  if (!ctx) {
    throw new Error('usePanel must be used within a <PanelProvider>');
  }
  return ctx;
};
