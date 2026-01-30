import { Box } from '@mui/material';
import { Locale } from 'next-intl';
import React from 'react';

import BaseCard from '~/ds-components/base-card/BaseCard';

import { styles } from './NewsSection.styles';

import { createRequestContainer } from '~/di/container';
import { formatIsoDateToDdMmYy } from '~/lib/utils/parseIsoDate';

interface Props {
  locale: Locale;
}

export const NewsSection: React.FC<Props> = async ({ locale }) => {
  const container = createRequestContainer();
  const newsService = container.resolve('newsService');

  const newsList = await newsService.getAllPublishedNews(locale);

  if (!newsList || newsList.length === 0) {
    return null;
  }

  return (
    <Box sx={styles.mainContainer}>
      {newsList.map((news) => {
        const formattedDate = news.publishedAt
          ? (formatIsoDateToDdMmYy((news.publishedAt as Date).toISOString()) ?? '')
          : '';

        return (
          <Box
            key={news._id.toString()}
            sx={{
              gridColumn: {
                xs: 'span 4',
                sm: 'span 4',
                md: 'span 4'
              }
            }}
          >
            <BaseCard
              image={news.coverImage.src}
              title={news.title}
              publicationDate={formattedDate}
              description={news.description}
              href={`/news/${news.slug}`}
              variant="news"
              dataTestId={`NewsCard-${news.slug}`}
            />
          </Box>
        );
      })}
    </Box>
  );
};
