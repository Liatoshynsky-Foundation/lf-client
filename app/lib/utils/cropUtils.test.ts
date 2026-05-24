import { buildCroppedStyle, type CropRect } from './cropUtils';

describe('cropUtils', () => {
  describe('buildCroppedStyle', () => {
    it('should return correct base CSS properties', () => {
      const crop: CropRect = { x: 0, y: 0, width: 100, height: 100 };
      const style = buildCroppedStyle(crop, 500, 500, 100, 100);

      expect(style.position).toBe('absolute');
      expect(style.top).toBe(0);
      expect(style.left).toBe(0);
      expect(style.width).toBe(500);
      expect(style.height).toBe(500);
      expect(style.maxWidth).toBe('none');
      expect(style.transformOrigin).toBe('0 0');
    });

    it('should calculate correct transform for uniform scaling (scaleX === scaleY)', () => {
      const crop: CropRect = { x: 10, y: 10, width: 100, height: 100 };
      const style = buildCroppedStyle(crop, 500, 500, 200, 200);

      expect(style.transform).toBe('translate(-20px, -20px) scale(2)');
    });

    it('should calculate correct transform when scaleY is greater than scaleX', () => {
      const crop: CropRect = { x: 0, y: 50, width: 200, height: 100 };
      const style = buildCroppedStyle(crop, 1000, 1000, 400, 400);

      expect(style.transform).toBe('translate(-200px, -200px) scale(4)');
    });

    it('should calculate correct transform when scaleX is greater than scaleY', () => {
      const crop: CropRect = { x: 50, y: 0, width: 100, height: 200 };
      const style = buildCroppedStyle(crop, 1000, 1000, 400, 400);

      expect(style.transform).toBe('translate(-200px, -200px) scale(4)');
    });
  });
});
