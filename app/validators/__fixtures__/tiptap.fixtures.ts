export const emptyTipTapDoc = { type: 'doc' as const, content: [] };

export const createFilledTipTapDoc = (text: string) => ({
  type: 'doc' as const,
  content: [{ type: 'paragraph' as const, content: [{ type: 'text' as const, text }] }]
});
