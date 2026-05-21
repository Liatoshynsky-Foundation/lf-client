'use client';

import { Box } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useCallback, useMemo } from 'react';
import { z } from 'zod';

import { CustomTabs } from '~/ds-components/tabs/Tabs';

import { ROUTES } from '../../constants/routes';
import EventsTab from '../../events-tab/EventsTab';
import { styles } from './MediaCenter.styles';
import { TipTapDoc } from '~/types/types/tiptap.types';

import EmptyState from '~/shared/components/design-system/all-components/empty-state/EmptyState';
import MediaList from '~/shared/components/design-system/all-components/media-list/MediaList';
import { eventListItemSchema } from '~/validators/events.schema';
import { Localize } from '~/validators/localization';
import { mediaMentionListItemSchema } from '~/validators/mediaMention.schema';
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
  crop?: { x: number; y: number; width: number; height: number } | null;
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
type MediaMentionItem = z.infer<typeof mediaMentionListItemSchema>;
type EventItem = Localize<z.infer<typeof eventListItemSchema>>;

interface MediaCenterProps {
  readonly newsData: LocalizedNewsItem[];
  readonly mediaMentionsData: MediaMentionItem[];
  readonly eventsData: EventItem[];
}

function MediaCenter({ newsData, mediaMentionsData, eventsData }: Readonly<MediaCenterProps>) {
  const t = useTranslations('media.emptyState');
  const router = useRouter();
  const searchParams = useSearchParams();

  const activeTab = useMemo(() => {
    return searchParams.get('tab') ?? 'news';
  }, [searchParams]);

  const handleTabChange = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set('tab', value);
      router.replace(`${ROUTES.NEWS}?${params.toString()}`, { scroll: false });
    },
    [router, searchParams]
  );

  return (
    <Box data-testid="MediaCenter" sx={styles.mediaContainer}>
      <Box sx={styles.tabsBox}>
        <CustomTabs
          dataTestId="MediaTabsContainer"
          aria-label="Категорії медіа"
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
      </Box>

      {activeTab === 'news' &&
        (newsData.length > 0 ? (
          <MediaList dataTestId={activeTab[0].toUpperCase()} mediaData={newsData} variant="news" />
        ) : (
          <EmptyState dataTestId="EmptyState-news" title={t('news.title')} description={t('news.description')} />
        ))}

      {activeTab === 'events' && (
        <>
          {eventsData?.length > 0 ? (
            <EventsTab eventsData={eventsData} />
          ) : (
            <EmptyState
              dataTestId="EmptyState-events"
              title={t('events.title')}
              description={t('events.description')}
            />
          )}
        </>
      )}

      {activeTab === 'press' &&
        (mediaMentionsData.length > 0 ? (
          <MediaList
            dataTestId={activeTab[0].toUpperCase()}
            mediaData={mediaMentionsData as newsPressCardItem[]}
            variant="press"
          />
        ) : (
          <EmptyState dataTestId="EmptyState-press" title={t('press.title')} description={t('press.description')} />
        ))}
    </Box>
  );
}

export default MediaCenter;
