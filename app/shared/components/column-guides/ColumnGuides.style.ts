export const styles = {
  containerStyle: {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    zIndex: -2
  },
  gridContainerStyle: (layout: number, gap: number, paddingX: number) => ({
    width: '100vw',
    maxWidth: '1728px',
    mx: 'auto',
    px: `${paddingX}px`,
    display: 'grid',
    gridTemplateColumns: `repeat(${layout}, 1fr)`,
    gap: `${gap}px`,
    pointerEvents: 'none',
    height: '100%'
  }),
  getLineSideStyle: (side: 'left' | 'right', lineColor: string) => ({
    position: 'absolute',
    top: 0,
    bottom: 0,
    [side]: 0,
    backgroundColor: lineColor,
    borderRight: `1px solid ${lineColor}`
  })
};
