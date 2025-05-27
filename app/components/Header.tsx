import { Box } from '@mui/material';
import React from 'react';
import dbConnect from '~/db/connect';

export default async function Header() {
  await dbConnect()
  return <Box component="header">Header</Box>;
}
