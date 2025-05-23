'use client';
import React, { FC, useState } from 'react';
import Image from 'next/image';
import { Box, Typography, Link, IconButton } from '@mui/material';
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
    const [emailCopied, setEmailCopied] = useState(false);

    const handleEmailCopy = () => {
        if (emailCopied) return;

        navigator.clipboard.writeText(contacts.email);
        alert('Email copied to clipboard');
        setEmailCopied(true);
        setTimeout(() => {
            setEmailCopied(false);
        }, 2000);
    };

    return (
        <Box sx={styles.container}>
            <Typography sx={styles.title}>{contacts.title}</Typography>
            <Typography sx={styles.text}>{contacts.address}</Typography>
            <Typography sx={styles.text}>{contacts.phone}</Typography>
            <Box sx={styles.emailContainer}>
                <Link sx={styles.email} href={`mailto:${contacts.email}`}>
                    {contacts.email}
                </Link>
                <IconButton onClick={handleEmailCopy} sx={styles.copy}>
                    {emailCopied ? (
                        <Image src="/check-icon.svg" alt="Copied" width={styles.iconSize} height={styles.iconSize} />
                    ) : (
                        <Image src="/copy-icon.svg" alt="Copy" width={styles.iconSize} height={styles.iconSize} />
                    )}
                </IconButton>
            </Box>
        </Box>
    );
};

export default FooterContactInfo;