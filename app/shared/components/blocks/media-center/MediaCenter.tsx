'use client';

import { Box } from '@mui/material';
import { useEffect, useState } from 'react';

import { CustomTabs } from '~/ds-components/tabs/Tabs';

import { mockNewsList, mockPressList } from './media.const';
import { styles } from './MediaCenter.styles';
import { TipTapDoc } from '~/types/types/tiptap.types';

import MediaList from '~/shared/components/design-system/all-components/media-list/MediaList';

const tabs = [
  { id: 'news', label: 'Новини' },
  { id: 'events', label: 'Події' },
  { id: 'press', label: 'Ми у ЗМІ' }
];

type newsCardItemImage = {
  src: string;
};

export type newsPressCardItem = {
  _id: string;
  publishedAt: string;
  title: string;
  description: string;
  content: TipTapDoc;
  coverImage: newsCardItemImage;
};

function MediaCenter() {
  const [selectedTab, setSelectedTab] = useState('news');
  const [press, setPress] = useState<newsPressCardItem[] | null>(null);
  const [news] = useState<newsPressCardItem[]>(() => {
    return [...mockNewsList].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  });

  useEffect(() => {
    if (selectedTab === 'press' && !press) {
      const sortedPress = [...mockPressList].sort(
        (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );
      setPress(sortedPress);
    }
  }, [selectedTab, press]);

  return (
    <Box data-testid="MediaCenter" sx={styles.mediaContainer}>
      <Box sx={styles.tabsBox}>
        <CustomTabs
          dataTestId="MediaTabsContainer"
          aria-label="Категорії медіа"
          tabs={tabs}
          activeTab={selectedTab}
          onTabChange={setSelectedTab}
        />
      </Box>
      {selectedTab === 'news' && (
        <MediaList dataTestId={selectedTab[0].toUpperCase()} mediaData={news} variant="news" />
      )}

      {selectedTab === 'press' && press && (
        <MediaList dataTestId={selectedTab[0].toUpperCase()} mediaData={press} variant="press" />
      )}
    </Box>
  );
}

export default MediaCenter;
