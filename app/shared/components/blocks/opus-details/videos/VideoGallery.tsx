import { Box, Typography } from '@mui/material';

import type { OpusVideo } from '../opusDetails.types';
import VideoCard from './VideoCard';
import { styles } from './VideoGallery.styles';

export type VideoGalleryProps = {
  heading: string;
  videos: OpusVideo[];
  videoTitleFallback: string;
};

const VideoGallery = ({ heading, videos, videoTitleFallback }: Readonly<VideoGalleryProps>) => {
  return (
    <Box sx={styles.root} data-testid="OpusDetails-videos">
      <Box sx={styles.headingRow}>
        <Box sx={styles.accent} aria-hidden>
          <Box sx={styles.noteHead} />
        </Box>

        <Typography component="h2" sx={styles.heading}>
          {heading}
        </Typography>
      </Box>

      <Box sx={styles.grid} data-testid="OpusDetails-videosGrid">
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} titleFallback={videoTitleFallback} />
        ))}
      </Box>
    </Box>
  );
};

export default VideoGallery;
