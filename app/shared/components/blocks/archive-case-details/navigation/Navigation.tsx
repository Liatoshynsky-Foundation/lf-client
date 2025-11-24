import { Box } from '@mui/material';

import { styles } from './Navigation.styles';
import NavItem from './NavItem';
import type { ArchiveAdjacentCase } from '~/types/page/archive.types';

export type NavigationProps = {
  prevCase?: ArchiveAdjacentCase;
  nextCase?: ArchiveAdjacentCase;
  prevLabel: string;
  nextLabel: string;
};

const Navigation = ({ prevCase, nextCase, prevLabel, nextLabel }: Readonly<NavigationProps>) => {
  if (!prevCase && !nextCase) {
    return null;
  }

  return (
    <Box sx={styles.root} data-testid="ArchiveCaseDetails-navigation">
      {prevCase && <NavItem direction="prev" caseLink={prevCase} label={prevLabel} />}
      {nextCase && <NavItem direction="next" caseLink={nextCase} label={nextLabel} />}
    </Box>
  );
};

export default Navigation;
