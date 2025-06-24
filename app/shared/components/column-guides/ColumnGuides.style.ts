export const lineStyle = {
  position: 'absolute' as const,
  top: 0,
  bottom: 0
};

export const gridContainerStyle = (layout: number, gap: number, paddingX: number) => ({
  position: 'absolute' as const,
  top: 0,
  bottom: 0,
  left: paddingX,
  right: paddingX,
  display: 'grid',
  gridTemplateColumns: `repeat(${layout}, 1fr)`,
  gap: `${gap}px`,
  pointerEvents: 'none' as const,
  height: '100%',
  zIndex: -2
});

export const columnBoxStyle = {
  position: 'relative' as const
};

export const getLineSideStyle = (side: 'left' | 'right', lineColor: string) => ({
  ...lineStyle,
  [side]: 0,
  backgroundColor: lineColor,
  border: `1px solid ${lineColor}`
});
