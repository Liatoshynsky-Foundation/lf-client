'use client';

import { Box } from '@mui/material';
import { useState } from 'react';

import { CustomTabs } from '~/ds-components/tabs/Tabs';

import { styles } from './MediaCenter.styles';

const tabs = [
  { id: 'news', label: 'Новини' },
  { id: 'events', label: 'Події' },
  { id: 'press', label: 'Ми у ЗМІ' }
];

function MediaCenter() {
  const [selectedTab, setSelectedTab] = useState('news');

  return (
    <Box sx={styles.mediaContainer}>
      <Box sx={styles.tabsBox}>
        <CustomTabs tabs={tabs} activeTab={selectedTab} onTabChange={setSelectedTab} />
      </Box>
    </Box>
  );
}

export default MediaCenter;
