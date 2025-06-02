'use client';

import * as React from 'react';
import { usePathname } from 'next/navigation';
import { Box, Typography } from '@mui/material';
import CustomLink from '../CustomLink/CustomLink';
import { BreadCrumbsStyles } from './BreadCrumbs.styles';

const BreadcrumbsClient = () => {
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter((s) => s !== '' && s !== 'en' && s !== 'uk');

  return (
    <>
      {pathSegments.map((segment, index) => {
        const href = '/' + pathSegments.slice(0, index + 1).join('/');
        const isLast = index === pathSegments.length - 1;

        return isLast ? (
          <Box key={href}>
            <Typography sx={BreadCrumbsStyles.typography}>{segment}</Typography>
          </Box>
        ) : (
          <Box key={href}>
            <CustomLink path={href}>{segment}</CustomLink>
          </Box>
        );
      })}
    </>
  );
};

export default BreadcrumbsClient;
