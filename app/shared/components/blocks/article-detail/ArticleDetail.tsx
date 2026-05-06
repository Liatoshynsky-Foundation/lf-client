import { Box, Typography } from '@mui/material';

import CustomLink from '~/ds-components/link/CustomLink';

import { styles } from './ArticleDetails.styles';
import type { BlockNoteBlock } from './BlockNoteContent';
import { BlockNoteContent } from './BlockNoteContent';

import MainLayout from '~/layouts/main-layout/MainLayout';
import { SvgImage } from '~/shared/components/svg-image/SvgImage';

export type ArticleDetailProps = {
  lang: string;
  date?: string;
  title: string;
  blocks: BlockNoteBlock[];
};

export function ArticleDetail({ lang, date, title, blocks }: Readonly<ArticleDetailProps>) {
  return (
    <MainLayout withLines>
      <Box sx={styles.newsHeader}>
        <CustomLink
          sx={styles.backLink}
          labelSx={styles.backLinkLabel}
          path={`/${lang}/news`}
          startIcon={<SvgImage src="/icons/arrow-left.svg" alt="" width={24} height={24} />}
        >
          Повернутись до новин
        </CustomLink>
        <Box sx={styles.newsHeaderTopRow}>
          <Typography variant="h1" sx={styles.newsTitle}>
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={styles.publicDate}>
            Опубліковано: {date}
          </Typography>
        </Box>
      </Box>
      <Box sx={styles.container}>
        <BlockNoteContent blocks={blocks} />
      </Box>
    </MainLayout>
  );
}
