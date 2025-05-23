'use client';
import React, { FC } from 'react';
import { Box, Typography, Link } from '@mui/material';
import { styles } from './FooterContactInfo.styles';

interface FooterContactInfoProps {
    contacts: {
        title: string;
        phone: string;
        email: string;
    };
}

const FooterContactInfo: FC<FooterContactInfoProps> = ({ contacts }) => {
    return (
        <Box sx={styles.container}>
            <Typography sx={styles.title}>{contacts.title}</Typography>
            <Box>
                <Box sx={styles.linkContainer}>
                    <Typography sx={styles.weakText}>Телефон: </Typography>
                    <Link sx={styles.link} href={`tel:${contacts.phone}`}>
                        {contacts.phone}
                    </Link>
                </Box>
                <Box sx={styles.linkContainer}>
                    <Typography sx={styles.weakText}>Email: </Typography>
                    <Link sx={styles.link} href={`mailto:${contacts.email}`}>
                        {contacts.email}
                    </Link>
                </Box>
            </Box>
        </Box>
    );
};

export default FooterContactInfo;