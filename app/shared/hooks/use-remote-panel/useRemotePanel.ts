'use client';
import { useMediaQuery, useTheme } from '@mui/material';
import { useState } from 'react';

export type PanelType = 'search' | 'filter' | null;

export const useRemotePanel = () => {
  const [activePanel, setActivePanel] = useState<PanelType>(null);
  const [active, setActive] = useState<boolean>(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const togglePanel = (panel: Exclude<PanelType, null>) => {
    setActivePanel((prev) => (prev === panel ? null : panel));
  };
  const toggle = () => {
    setActive((prev) => !prev);
  };
  const closePanel = () => setActivePanel(null);

  return {
    activePanel,
    isMobile,
    togglePanel,
    closePanel,
    toggle,
    active
  };
};
