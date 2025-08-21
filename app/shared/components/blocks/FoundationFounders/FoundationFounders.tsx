import { Box } from '@mui/material';
import React from 'react';

import { styles } from '~/components/blocks/FoundationFounders/FoundationFounders.styles';
import FoundationTeam from '~/components/blocks/FoundationFounders/FoundationTeam/FoundationTeam';
import FoundationWasCreated from '~/components/blocks/FoundationFounders/FoundationWasCreated/FoundationWasCreated';
import { ColumnGuides } from '~/components/column-guides/ColumnGuides';

const FoundationFounders = ({ data }: { data: any }) => {
  const { title, members, description } = data;

  return (
    <Box sx={styles.container}>
      <ColumnGuides lineColor="rgba(252, 252, 252, 1)" />
      <Box sx={styles.contentContainer}>
        <FoundationWasCreated title={title} description={description} />
        <FoundationTeam title={title} team={members} />
      </Box>
    </Box>
  );
};

export default FoundationFounders;
