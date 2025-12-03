'use client';

import Box from '@mui/material/Box';
import MuiTab from '@mui/material/Tab';
import MuiTabs from '@mui/material/Tabs';
import { SyntheticEvent } from 'react';

import { styles } from './Tabs.styles';

interface TabItem {
  id: string;
  label: React.ReactNode;
}

interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (id: string) => void;
  className?: string;
  dataTestId?: string;
}

export const CustomTabs = ({ tabs, activeTab, onTabChange, className, dataTestId }: TabsProps) => {
  const handleChange = (_: SyntheticEvent, newValue: string) => {
    onTabChange(newValue);
  };

  return (
    <Box data-testid={dataTestId} sx={styles.container}>
      <MuiTabs
        value={activeTab}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons={false}
        allowScrollButtonsMobile
        className={className}
        data-testid={`${dataTestId}-tabs`}
        sx={styles.root}
      >
        {tabs.map((tab) => (
          <MuiTab
            key={tab.id}
            label={tab.label}
            value={tab.id}
            disableRipple
            data-testid={`${dataTestId}-tab-${tab.id}`}
          />
        ))}
      </MuiTabs>
    </Box>
  );
};
