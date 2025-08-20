'use client';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import React, { useState } from 'react';

import { SvgImage } from '~/shared/components/svg-image/SvgImage';

export interface FaqProps {
  title: string;
  content: string;
}

export const Faq: React.FC<FaqProps> = ({ title, content }) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => {
    setExpanded((prev: boolean) => !prev);
  };

  const getIconSrc = () => {
    if (expanded) {
      return '/icons/circle-minus.svg';
    } else {
      return isHovered ? '/icons/circle-plus-black.svg' : '/icons/circle-plus.svg';
    }
  };
  return (
    <Accordion expanded={expanded} onChange={handleToggle} square elevation={0} disableGutters>
      <AccordionSummary
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        expandIcon={<SvgImage src={getIconSrc()} alt="toggle icon" width={28} height={28} />}
        aria-controls="Faq-content"
        id="Faq-header"
      >
        <Typography variant="customSemiBold18">{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography variant="customMedium18">{content}</Typography>
      </AccordionDetails>
    </Accordion>
  );
};
