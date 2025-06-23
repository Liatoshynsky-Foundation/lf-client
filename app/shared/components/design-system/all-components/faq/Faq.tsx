'use client';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import React, { useState } from 'react';

import { SvgImage } from '~/shared/components/svg-image/SvgImage';

export interface FAQProps {
  title: string;
  content: string;
}

export const FAQ: React.FC<FAQProps> = ({ title, content }) => {
  const [expanded, setExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleToggle = () => {
    setExpanded((prev: boolean) => !prev);
  };

  const handleIconHover = (hovering: boolean) => () => {
    if (!expanded) {
      setIsHovered(hovering);
    }
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
        expandIcon={
          <div
            onMouseEnter={handleIconHover(true)}
            onMouseLeave={handleIconHover(false)}
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <SvgImage src={getIconSrc()} alt="toggle icon" width={28} height={28} />
          </div>
        }
        aria-controls="faq-content"
        id="faq-header"
      >
        <Typography variant="customSemiBold18">{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography variant="customMedium18">{content}</Typography>
      </AccordionDetails>
    </Accordion>
  );
};
