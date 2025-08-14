import { Typography, TypographyProps } from '@mui/material';
import React from 'react';

import renderTipTapNode from '~/components/tip-tap-node/renderTipTapNode';

import { ParagraphNode } from '~/types/types/common.types';

interface ParagraphBlockProps extends Omit<TypographyProps, 'children'> {
  node: ParagraphNode;
}

export const Paragraph: React.FC<ParagraphBlockProps> = ({ node, ...props }) => {
  return (
    <Typography variant="body1" component="p" {...props}>
      {node.content && renderTipTapNode(node.content)}
    </Typography>
  );
};
