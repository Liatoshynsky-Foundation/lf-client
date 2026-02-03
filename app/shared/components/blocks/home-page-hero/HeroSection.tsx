'use client';

import { Box } from '@mui/material';
import React from 'react';

export const HomePageHero: React.FC = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: '200px', // Space for the footer logo
        position: 'relative',
        zIndex: 10
      }}
    >
      <Box
        sx={{
          textAlign: 'center',
          maxWidth: '1200px',
          padding: '0 24px'
        }}
      >
        <Box
          component="h1"
          sx={{
            fontSize: { xs: '2.5rem', md: '4rem', lg: '5rem' },
            fontWeight: 700,
            marginBottom: '2rem',
            lineHeight: 1.2
          }}
        >
          Welcome to Lyatoshynsky Foundation
        </Box>
        <Box
          component="p"
          sx={{
            fontSize: { xs: '1.125rem', md: '1.5rem' },
            lineHeight: 1.6,
            opacity: 0.9
          }}
        >
          Preserving and celebrating the legacy of Ukrainian composer Borys Lyatoshynsky
        </Box>
      </Box>
    </Box>
  );
};
