import { Box, Typography } from '@mui/material';
import { Locale } from 'next-intl';
import React from 'react';

import { styles } from './NewsSection.styles';

import { createRequestContainer } from '~/di/container';
import { formatIsoDateToDdMmYy } from '~/lib/utils/parseIsoDate';
import ButtonContentBlock from '~/shared/components/blocks/terms-of-use/terms-content/button-content-block/ButtonContentBlock';
import { ContentSlider } from '~/shared/components/content-slider/ContentSlider';

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

  const newsCards = newsList.map((news) => {
    const formattedDate = news.publishedAt ? (formatIsoDateToDdMmYy(news.publishedAt) ?? '') : '';

    return {
      image: news.coverImage.src,
      title: news.title,
      publicationDate: formattedDate,
      description: news.description,
      href: `/news/${news.slug}`,
      dataTestId: `NewsCard-${news.slug}`
    };
  });

  return (
    <Box sx={styles.mainContainer}>
      <Typography variant="h1" sx={styles.title}>
        {title[locale]}
      </Typography>

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

      <ContentSlider cards={newsCards} variant="news" />
    </Box>
  );
};
