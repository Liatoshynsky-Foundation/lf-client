export type Responsive<T extends readonly string[]> = Partial<Record<T[number], string>>;

export function isSize(size: string) {
  const sizePattern = /^\d{1,5}(\.\d{1,2})?(px|em|rem|%)$/;
  return sizePattern.test(size);
}

export function isColor(color: string) {
  const wslessColor = color.replace(/\s+/g, '');

  const hexPattern = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
  if (hexPattern.test(wslessColor)) {
    return true;
  }

  const rgbaPattern = /^rgba?\((\d{1,3},){2}\d{1,3}(,0?\.?\d+)?\)$/;
  if (rgbaPattern.test(wslessColor)) {
    const rgbaValues = rgbaPattern.exec(wslessColor);
    if (rgbaValues) {
      const rgbParts = rgbaValues[0]
        .replace(/rgba?\(|\)/g, '')
        .split(',')
        .map(Number);
      return rgbParts.every((value) => value >= 0 && value <= 255);
    }
  }
  return hexPattern.test(color);
}
