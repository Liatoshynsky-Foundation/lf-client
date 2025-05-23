'use client';
import React, { FC } from 'react';
import { Box, Typography } from '@mui/material';
import { styles } from './FooterContactInfo.styles';

interface FooterContactInfoProps {
    contacts: {
        title: string;
        address: string;
        phone: string;
        email: string;
    };
}

const FooterContactInfo: FC<FooterContactInfoProps> = ({ contacts }) => {
    const openGoogleMaps = () => {
        const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contacts.address)}`;
        window.open(url, '_blank');
    };

    return (
        <Box sx={styles.container}>
            <Typography sx={styles.title}>{contacts.title}</Typography>
            <Typography
                sx={styles.linkable}
                onClick={openGoogleMaps}
            >
                {contacts.address}
            </Typography>
            <Typography sx={styles.text}>{contacts.phone}</Typography>
            <Typography
                sx={styles.linkable}
                onClick={() => {
                    navigator.clipboard.writeText(contacts.email);
                    alert('Email copied to clipboard');
                }}
            >
                {contacts.email}
            </Typography>
        </Box>
    );
};

export default FooterContactInfo;