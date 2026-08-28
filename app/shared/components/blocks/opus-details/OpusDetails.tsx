import { Box, Typography } from '@mui/material';

import BackLink from '~/components/blocks/archive-case-details/back-link/BackLink';

import Compositions from './compositions/Compositions';
import DescriptionPlaceholder from './description/DescriptionPlaceholder';
import Meta from './meta/Meta';
import { styles } from './OpusDetails.styles';
import type { OpusDetailsProps } from './opusDetails.types';
import VideoGallery from './videos/VideoGallery';

import ContentBlock from '~/shared/components/design-system/all-components/content-block/ContentBlock';

const OpusDetails = ({
  title,
  number,
  creationDate,
  genre,
  movements,
  sheetMusicUrl,
  description,
  compositions,
  videos,
  backHref,
  labels
}: Readonly<OpusDetailsProps>) => {
  return (
    <Box sx={styles.gridContainer} data-testid="OpusDetails">
      <BackLink href={backHref} label={labels.back} dataTestId="OpusDetails-back" />

      <Typography variant="h2" sx={styles.sectionTitle} data-testid="OpusDetails-title">
        {title}
      </Typography>

      <Box sx={styles.contentGrid}>
        <Meta
          number={number}
          creationDate={creationDate}
          genre={genre}
          movements={movements}
          sheetMusicUrl={sheetMusicUrl}
          labels={{
            number: labels.metaNumber,
            date: labels.metaDate,
            genre: labels.metaGenre,
            viewSheetMusic: labels.viewSheetMusic
          }}
        />

        <Box sx={styles.rightColumn}>
          {description ? (
            <ContentBlock
              dataTestId="OpusDetails-description"
              description={description}
              textSx={styles.descriptionText}
            />
          ) : (
            <DescriptionPlaceholder
              title={labels.placeholderTitle}
              subtitle={labels.placeholderSubtitle}
              imageAlt={labels.placeholderImageAlt}
            />
          )}
        </Box>
      </Box>

      {compositions && compositions.length > 0 && (
        <Compositions
          heading={labels.compositionsTitle}
          compositions={compositions}
          viewSheetMusicLabel={labels.viewSheetMusic}
        />
      )}

      {videos && videos.length > 0 && (
        <VideoGallery heading={labels.videosTitle} videos={videos} videoTitleFallback={labels.videoTitleFallback} />
      )}
    </Box>
  );
};

export default OpusDetails;
