import renderTipTapNode from '~/components/tip-tap-node/renderTipTapNode';

import { Node } from '~/types/types/common.types';

interface TipTapNodeProps {
  node: Node;
}

const TipTapNode: React.FC<TipTapNodeProps> = ({ node }) => {
  return renderTipTapNode(node);
};

export default TipTapNode;
