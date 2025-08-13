import { NodeVisitor } from '~/types/pages';

import { Node as TipTapNode } from '~/validators/page2/tiptap.schema';

export function traverseNode(node: TipTapNode, visitors: NodeVisitor[]): TipTapNode {
  let transformedNode = node;

  for (const visitor of visitors) {
    transformedNode = visitor(transformedNode);
  }

  if (transformedNode.content && Array.isArray(transformedNode.content)) {
    return {
      ...transformedNode,
      content: transformedNode.content.map((childNode) => traverseNode(childNode, visitors))
    };
  }

  return transformedNode;
}

export const urlVisitor: NodeVisitor = (node) => {
  let newAttrs = node.attrs;
  let needsUpdate = false;

  if ((node.type === 'image' || node.type === 'teamMemberItem') && node.attrs?.imageName) {
    newAttrs = {
      ...node.attrs,
      src: `/api/blob-url?folderName=photos&blobName=${node.attrs.imageName}`
    };
    needsUpdate = true;
  }

  return needsUpdate ? { ...node, attrs: newAttrs } : node;
};
