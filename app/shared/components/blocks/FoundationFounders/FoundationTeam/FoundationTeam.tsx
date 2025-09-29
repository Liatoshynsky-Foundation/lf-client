import { Box, Typography } from '@mui/material';
import React from 'react';

import { styles } from '~/components/blocks/FoundationFounders/FoundationTeam/FoundationTeam.styles';
import { SvgImage } from '~/components/svg-image/SvgImage';
import PersonCard from '~/ds-components/person-card/PersonCard';

import { IImageBlock } from '~/types/page/about-us.types';

interface FoundationTeamProps {
  title: string;
  team: Teammate[];
}

interface Teammate {
  name: string;
  description: string;
  photo: IImageBlock;
}

const FoundationTeam: React.FC<FoundationTeamProps> = ({ title, team }) => {
  const fallback = (
    <Box sx={styles.logo}>
      <SvgImage src="/images/light-logo.svg" width={210} height={78} alt="logo" />
    </Box>
  );

  return (
    <Box sx={styles.container}>
      <Box sx={styles.titleWrapper}>
        <Typography sx={styles.title}>{title}</Typography>
      </Box>
      <Box sx={styles.foundationTeam}>
        {team.map((member, index) => (
          <React.Fragment key={member.name}>
            {index === 0 && fallback}
            <PersonCard name={member.name} description={member.description} imgURL={member.photo.src} />
            {(index + 1) % 2 === 0 && fallback}
          </React.Fragment>
        ))}
      </Box>
    </Box>
  );
};

export default FoundationTeam;
