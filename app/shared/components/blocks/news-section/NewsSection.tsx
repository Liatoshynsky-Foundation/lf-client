import { Box } from '@mui/material';
import { Locale } from 'next-intl';
import React from 'react';

import BaseCard from '~/ds-components/base-card/BaseCard';

import { styles } from './NewsSection.styles';

import { createRequestContainer } from '~/di/container';
import { formatIsoDateToDdMmYy } from '~/lib/utils/parseIsoDate';
import ButtonContentBlock from '~/shared/components/blocks/terms-of-use/terms-content/button-content-block/ButtonContentBlock';
import SectionTitle from '~/shared/components/section-title/SectionTitle';

interface Props {
  title: {
    uk: string;
    en: string;
  };
  textContent: {
    uk: any;
    en: any;
  };
  buttonText: {
    uk: string;
    en: string;
  };
  buttonLink: string;
  locale: Locale;
}

export const NewsSection: React.FC<Props> = async ({ locale, title, textContent, buttonText, buttonLink }) => {
  const container = createRequestContainer();
  const newsService = container.resolve('newsService');

  const newsList = await newsService.getAllPublishedNews(locale);

  if (!newsList || newsList.length === 0) {
    return null;
  }

  return (
    <Box sx={styles.mainContainer}>
      <SectionTitle
        icon={true}
        title={title[locale]}
        gridColumn={{ xs: '1/ -1', sm: '4/ -1', md: '6/-1' }}
        sx={{
          mb: { xs: '16px' },
          gap: {
            xs: '16px',
            sm: '24px',
            md: '40px'
          },
          '& h2': {
            textTransform: 'none'
          }
        }}
      />
      <ButtonContentBlock
        content={textContent[locale]}
        buttonText={buttonText[locale]}
        buttonColor="tertiary"
        sx={{ maxWidth: { xs: '246px' }, minWidth: { xs: '246px' } }}
        containerSx={{ mb: { xs: '64px', md: '80px' } }}
        textSx={styles.textStyle}
        textContainerSx={{ marginBottom: { xs: '24px', md: '0px' } }}
        buttonContainerSx={{ justifyContent: { xs: 'flex-start', md: 'flex-end' } }}
        link={buttonLink}
      />
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
