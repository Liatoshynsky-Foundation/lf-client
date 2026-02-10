'use client';

import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { z } from 'zod';

import { CustomTabs } from '~/ds-components/tabs/Tabs';

import EventsTab from '../../events-tab/EventsTab';
import { EventItemFixture, MOCK_EVENT_ITEMS } from '../event-card/EventItem.fixture';
import { mockPressList } from './media.const';
import { styles } from './MediaCenter.styles';
import { TipTapDoc } from '~/types/types/tiptap.types';

import MediaList from '~/shared/components/design-system/all-components/media-list/MediaList';
import { Localize } from '~/validators/localization';
import { newsListItemSchema } from '~/validators/news.schema';

const tabs = [
  { id: 'news', label: 'Новини' },
  { id: 'events', label: 'Події' },
  { id: 'press', label: 'Ми у ЗМІ' }
];

type newsCardItemImage = {
  src: string;
  alt?: string;
  caption?: string;
  isTmp?: boolean;
};

export type newsPressCardItem = {
  _id?: string;
  publishedAt: string | Date | null;
  title: string;
  description: string;
  content?: TipTapDoc;
  coverImage: newsCardItemImage;
  slug?: string;
  newsDate?: Date | null | string;
  meta?: {
    views: number;
  };
  status?: string;
};

type LocalizedNewsItem = Localize<z.infer<typeof newsListItemSchema>>;

interface MediaCenterProps {
  readonly newsData: LocalizedNewsItem[];
}

function MediaCenter({ newsData }: Readonly<MediaCenterProps>) {
  const [selectedTab, setSelectedTab] = useState('news');
  const [press, setPress] = useState<newsPressCardItem[] | null>(null);
  const [events, setEvents] = useState<EventItemFixture[] | null>(null);

  useEffect(() => {
    if (selectedTab === 'press' && !press) {
      const sortedPress = [...mockPressList].sort(
        (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );
      setPress(sortedPress);
    }
    if (selectedTab === 'events' && !events) {
      setEvents(MOCK_EVENT_ITEMS);
    }
  }, [selectedTab, press, events]);

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
        <MediaList dataTestId={selectedTab[0].toUpperCase()} mediaData={newsData as any} variant="news" />
      )}

      {selectedTab === 'events' && events && <EventsTab eventsData={events} />}

      {selectedTab === 'press' && press && (
        <MediaList dataTestId={selectedTab[0].toUpperCase()} mediaData={press} variant="press" />
      )}
    </Box>
  );
}

export default MediaCenter;
