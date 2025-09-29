export const containerStyle = {
  position: 'absolute',
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
  zIndex: -2
};

export const lineStyle = {
  position: 'absolute' as const,
  top: 0,
  bottom: 0
};

export const gridContainerStyle = (layout: number, gap: number, paddingX: number) => ({
  width: '100vw',
  maxWidth: '1728px',
  mx: 'auto',
  px: `${paddingX}px`,
  display: 'grid',
  gridTemplateColumns: `repeat(${layout}, 1fr)`,
  gap: `${gap}px`,
  pointerEvents: 'none' as const,
  height: '100%'
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
