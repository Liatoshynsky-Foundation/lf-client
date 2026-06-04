import { Box, Typography } from '@mui/material';
import { getTranslations } from 'next-intl/server';
import type { ReactNode } from 'react';

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
  backLabel: string;
  backPath: string;
  registrationBlock?: ReactNode;
};

export async function ArticleDetail({
  lang,
  date,
  title,
  blocks,
  backLabel,
  backPath,
  registrationBlock
}: Readonly<ArticleDetailProps>) {
  const t = await getTranslations('common');
  return (
    <MainLayout withLines>
      <Box sx={styles.newsHeader}>
        <CustomLink
          sx={styles.backLink}
          labelSx={styles.backLinkLabel}
          path={`/${lang}${backPath}`}
          startIcon={<SvgImage src="/icons/arrow-left.svg" alt="" width={24} height={24} />}
        >
          {backLabel}
        </CustomLink>
        <Box sx={styles.newsHeaderTopRow}>
          <Typography variant="h1" sx={styles.newsTitle}>
            {title}
          </Typography>
          {date && (
            <Typography variant="body2" color="text.secondary" sx={styles.publicDate}>
              {t('publishedAtLabel')} {date}
            </Typography>
          )}
        </Box>
      </Box>
      {registrationBlock ? (
        <Box sx={styles.bodyRow}>
          <Box sx={styles.registrationColumn}>{registrationBlock}</Box>
          <Box sx={styles.contentColumn}>
            <BlockNoteContent blocks={blocks} />
          </Box>
        </Box>
      ) : (
        <Box sx={styles.container}>
          <BlockNoteContent blocks={blocks} />
        </Box>
      )}
    </MainLayout>
  );
}
