import { Box } from '@mui/material';

import { styles } from './BackLink.styles';

import ArrowLeft from '~/public/icons/arrow-left.svg';
import { Svg } from '~/shared/components/colored-svg/ColoredSvg';
import CustomLink from '~/shared/components/design-system/all-components/link/CustomLink';

export type BackLinkProps = {
  href: string;
  label: string;
  dataTestId?: string;
};

const BackLink = ({ href, label, dataTestId = 'OpusDetails-back' }: Readonly<BackLinkProps>) => {
  return (
    <Box sx={styles.wrapper} data-testid={dataTestId}>
      <CustomLink
        path={href}
        startIcon={<Svg Component={ArrowLeft} alt="" color={'blue.800'} width="20px" height="20px" sx={styles.icon} />}
        sx={styles.link}
        labelSx={styles.label}
      >
        {label}
      </CustomLink>
    </Box>
  );
};

export default BackLink;
