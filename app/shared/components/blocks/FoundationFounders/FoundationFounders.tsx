import { Box } from '@mui/material';
import React from 'react';

import { styles } from '~/components/blocks/FoundationFounders/FoundationFounders.styles';
import FoundationTeam from '~/components/blocks/FoundationFounders/FoundationTeam/FoundationTeam';
import FoundationWasCreated from '~/components/blocks/FoundationFounders/FoundationWasCreated/FoundationWasCreated';
import { ColumnGuides } from '~/components/column-guides/ColumnGuides';

import { IFoundationFounders } from '~/types/types/about-us.types';

const FoundationFounders = ({ data }: { data: IFoundationFounders }) => {
  const { titleText, listTitle, members } = data;

  return (
    <Box sx={styles.container}>
      <ColumnGuides lineColor="rgba(252, 252, 252, 1)" />
      <Box sx={styles.contentContainer}>
        <FoundationWasCreated data={titleText} />
        <FoundationTeam title={listTitle} team={members} />
      </Box>
    </Box>
  );
};

export default FoundationFounders;
