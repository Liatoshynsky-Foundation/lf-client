import { Box, SxProps, Theme, Typography } from '@mui/material';
import React from 'react';

import { styles } from '~/components/blocks/FoundationFounders/FoundationTeam/FoundationTeam.styles';
import { SvgImage } from '~/components/svg-image/SvgImage';
import TipTapContent from '~/components/tip-tap-content/TipTapContent';
import PersonCard from '~/ds-components/person-card/PersonCard';

import { TipTapNodeTypes } from '~/types/enums/common.enums';
import { IImageBlock } from '~/types/page/about-us.types';
import { TipTapDoc } from '~/types/types/tiptap.types';

const renderTitle = (sx: SxProps<Theme>) => {
  const Title = (children: React.ReactNode) => <Typography sx={sx}>{children}</Typography>;
  return Title;
};

interface FoundationTeamProps {
  title: string | TipTapDoc;
  team: Teammate[];
  dataTestId?: string;
}

interface Teammate {
  name: string | TipTapDoc;
  description: string | TipTapDoc;
  photo: IImageBlock;
}

const FoundationTeam: React.FC<FoundationTeamProps> = ({ title, team, dataTestId }) => {
  const fallback = (
    <Box sx={styles.logo}>
      <SvgImage src="/images/light-logo.svg" width={210} height={78} alt="logo" />
    </Box>
  );

  return (
    <Box sx={styles.container} data-testid={dataTestId}>
      <Box sx={styles.titleWrapper}>
        {title &&
          (typeof title === 'string' ? (
            <Typography sx={styles.title}>{title}</Typography>
          ) : (
            <TipTapContent
              data={title}
              nodeRenderers={{
                [TipTapNodeTypes.paragraph]: renderTitle(styles.title)
              }}
            />
          ))}
      </Box>
      <Box sx={styles.foundationTeam}>
        {team.map((member, index) => {
          const uniqueKey = `member-${index}`;

          return (
            <React.Fragment key={uniqueKey}>
              {index === 0 && fallback}

              <PersonCard name={member.name} description={member.description} imgURL={member.photo.generatedSrc} />

              {(index + 1) % 2 === 0 && fallback}
            </React.Fragment>
          );
        })}
      </Box>
    </Box>
  );
};

export default FoundationTeam;
