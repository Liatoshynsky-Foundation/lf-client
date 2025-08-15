import { TypographyProps } from '@mui/material';

import renderTipTapNode from '~/components/tip-tap-node/renderTipTapNode';

import { Node } from '~/types/types/common.types';

interface TipTapNodeProps extends TypographyProps {
  node: Node;
}

const TipTapNode: React.FC<TipTapNodeProps> = ({ node, ...props }) => {
  return renderTipTapNode(node, props);
};

export default TipTapNode;
