import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Box } from '@mui/material';
import { BreadCrumbsStyles } from './BreadCrumbs.styles';
import CustomLink from '../CustomLink/CustomLink';
import HouseSvg from '../../../../public/icons/house.svg';
import { SvgImage } from '~/shared/components/svg-image/SvgImage';
import BreadcrumbsClient from './BreadcrumbsClient';

const CustomBreadcrumbs: React.FC = () => {
  return (
    <Box>
      <Breadcrumbs aria-label="breadcrumb" separator="›">
        <Box sx={BreadCrumbsStyles.box}>
          <CustomLink path="/" startIcon={<SvgImage src={HouseSvg} alt="" />}>
            Home page
          </CustomLink>
        </Box>
        <BreadcrumbsClient />
      </Breadcrumbs>
    </Box>
  );
};

export default CustomBreadcrumbs;
