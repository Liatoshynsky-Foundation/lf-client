'use client';
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@mui/material';
import React, { useState } from 'react';

import { SvgImage } from '~/shared/components/svg-image/SvgImage';

export interface FaqAccordionProps {
  title: string;
  content: string;
}

export const FaqAccordion: React.FC<FaqAccordionProps> = ({ title, content }) => {
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => {
    setExpanded((prev: boolean) => !prev);
  };

  return (
    <Accordion expanded={expanded} onChange={handleToggle} square elevation={0} disableGutters>
      <AccordionSummary
        expandIcon={
          <Box className="icon-wrapper" sx={{ position: 'relative', width: 28, height: 28 }}>
            <Box className="default-icon">
              <SvgImage
                src={expanded ? '/icons/circle-minus.svg' : '/icons/circle-plus.svg'}
                alt="toggle icon"
                width={28}
                height={28}
              />
            </Box>

            {!expanded && (
              <Box className="hover-icon" sx={{ position: 'absolute', top: 0, left: 0, display: 'none' }}>
                <SvgImage src="/icons/circle-plus-black.svg" alt="toggle icon" width={28} height={28} />
              </Box>
            )}
          </Box>
        }
        aria-controls="Faq-content"
        id="Faq-header"
        sx={{
          '&:hover .default-icon': {
            display: expanded ? 'block' : 'none'
          },
          '&:hover .hover-icon': {
            display: expanded ? 'none' : 'block'
          }
        }}
      >
        <Typography variant="customSemiBold18">{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography variant="customMedium18">{content}</Typography>
      </AccordionDetails>
    </Accordion>
  );
};
