import { Typography, TypographyProps } from '@mui/material';
import React from 'react';

import renderTipTapNode from '~/components/tip-tap-node/renderTipTapNode';

import { HeadingNode } from '~/types/types/common.types';

interface HeadingProps extends TypographyProps {
  node: HeadingNode;
}

const levelVariantMap: Record<number, TypographyProps['variant']> = {
  1: 'h1',
  2: 'h2',
  3: 'h3',
  4: 'h4',
  5: 'h5',
  6: 'h6'
};

export const Heading: React.FC<HeadingProps> = ({ node, ...props }) => {
  return (
    <Typography variant={levelVariantMap[node.attrs.level]} gutterBottom {...props}>
      {node.content && renderTipTapNode(node.content)}
    </Typography>
  );
};
