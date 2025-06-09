import { Box } from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import * as React from 'react';

import { BreadCrumbsStyles } from './BreadCrumbs.styles';
import BreadcrumbsClient from './BreadCrumbsClient';

import CustomLink from '~/shared/components/design-system/all-components/link/CustomLink';
import { SvgImage } from '~/shared/components/svg-image/SvgImage';

const CustomBreadcrumbs: React.FC = () => {
  return (
    <Box>
      <Breadcrumbs
        aria-label="breadcrumb"
        separator={<SvgImage src="/icons/chevron-right.svg" alt="chevron-right" width={24} height={24} />}
      >
        <Box sx={BreadCrumbsStyles.box}>
          <CustomLink path="/" startIcon={<SvgImage src="/icons/house.svg" height={24} width={24} alt="" />}>
            Home page
          </CustomLink>
        </Box>
        <BreadcrumbsClient />
      </Breadcrumbs>
    </Box>
  );
};

export default CustomBreadcrumbs;
