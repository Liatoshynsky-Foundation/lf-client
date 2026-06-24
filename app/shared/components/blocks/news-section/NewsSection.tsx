import { Box, Typography } from '@mui/material';
import { Locale } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import React from 'react';

import EmptyState from '~/ds-components/empty-state/EmptyState';

import { getDynamicRoute } from '../../constants/routes';
import { styles } from './NewsSection.styles';
import { TipTapDoc } from '~/types/types/tiptap.types';

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
    uk: TipTapDoc;
    en: TipTapDoc;
  };
  buttonText: {
    uk: string;
    en: string;
  };
  buttonLink: string;
  prevLabel: string;
  nextLabel: string;
  locale: Locale;
}

const NewsSection: React.FC<Props> = async ({
  locale,
  title,
  textContent,
  buttonText,
  buttonLink,
  prevLabel,
  nextLabel
}) => {
  const t = await getTranslations('media.emptyState');
  const container = createRequestContainer();
  const newsService = container.resolve('newsService');

  const newsList = await newsService.getAllPublishedNews(locale);

  if (!newsList || newsList.length === 0) {
    return (
      <Box sx={styles.mainContainer}>
        <Typography variant="h1" sx={styles.title}>
          {title[locale]}
        </Typography>
        <EmptyState dataTestId="EmptyState-news" title={t('news.title')} description={t('news.description')} />
      </Box>
    );
  }

  const newsCards = newsList.map((news) => {
    const formattedDate = news.publishedAt ? (formatIsoDateToDdMmYy(news.publishedAt) ?? '') : '';
    const rawSrc = news.coverImage.src;
    const imageSrc = rawSrc.startsWith('http') ? rawSrc : `/api/blob-url?folderName=photos&blobName=${rawSrc}`;

    return {
      image: imageSrc,
      crop: news.coverImage.crop ?? null,
      title: news.title,
      publicationDate: formattedDate,
      description: news.description,
      href: getDynamicRoute.newsItem(news.slug),
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

      <ContentSlider cards={newsCards} variant="news" prevLabel={prevLabel} nextLabel={nextLabel} />
    </Box>
  );
};

export default NewsSection;
