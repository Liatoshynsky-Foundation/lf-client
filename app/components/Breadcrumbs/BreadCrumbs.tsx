'use client';
import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import { usePathname } from 'next/navigation';
import { Box } from '@mui/material';
import { BreadCrumbsStyles } from './BreadCrumbs.styles';
import CustomLink from '../Link/Link';
import HouseSvg from '../../../public/house.svg';

export default function CustomBreadcrumbs() {
    const pathname = usePathname();
    const pathSegments = pathname
        .split('/')
        .filter((s) => s !== '' && s !== 'en' && s !== 'uk');
    const breadcrumbs = pathSegments.map((segment, index) => {
        const href = '/' + pathSegments.slice(0, index + 1).join('/');
        const isLast = index === pathSegments.length - 1;

        return isLast ? (
            <Box>
            <Typography key={href} sx={BreadCrumbsStyles.typography} >
                {segment}
            </Typography>
            </Box>
        ) : (
            <Box>
                <CustomLink key={href} path={href}>
                    {segment}
                </CustomLink>
            </Box >
        );
    });

    return (
        <Box >
            <Breadcrumbs aria-label="breadcrumb" separator="›">
            <Box sx={{'&hover': {
                textDecoration: 'underline'
            }}}>
             <CustomLink path='/' endSVG={HouseSvg} startSVG={HouseSvg}>
                    Home page
                </CustomLink>
                </Box>
                {breadcrumbs}
            </Breadcrumbs>
        </Box>
    );
}