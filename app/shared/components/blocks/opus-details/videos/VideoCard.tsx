import { Box, Typography } from '@mui/material';

import type { OpusVideo } from '../opusDetails.types';
import { styles } from './VideoCard.styles';

export type VideoCardProps = {
  video: OpusVideo;
  titleFallback: string;
};

const buildEmbedUrl = (youTubeId: string): string => {
  return `https://www.youtube.com/embed/${youTubeId}`;
};

const VideoCard = ({ video, titleFallback }: Readonly<VideoCardProps>) => {
  const title = video.title ?? titleFallback;
  const caption = video.caption?.trim();

  return (
    <Box sx={styles.card} data-testid={`OpusDetails-video-${video.id}`}>
      <Box sx={styles.root}>
        <Box
          component="iframe"
          sx={styles.iframe}
          src={buildEmbedUrl(video.youTubeId)}
          title={title}
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </Box>
      {caption && (
        <Typography component="p" sx={styles.caption} data-testid={`OpusDetails-video-caption-${video.id}`}>
          {caption}
        </Typography>
      )}
    </Box>
  );
};

export default VideoCard;
