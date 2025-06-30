export const hexToRGBA = (hex: string, alpha: number): string => {
  const cleanHex = hex.replace('#', '');
  const intValue = parseInt(cleanHex, 16);
  const r = (intValue >> 16) & 255;
  const g = (intValue >> 8) & 255;
  const b = intValue & 255;

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};
