export const formatTime = (time: number): string =>
  `${Math.floor(time / 60)}:${String(Math.floor(time % 60)).padStart(2, '0')}`;

export const calculateProgress = (
  e: MouseEvent | React.MouseEvent,
  progressRef: React.RefObject<HTMLDivElement | null>
): number => {
  if (!progressRef.current) return 0;
  const { left, width } = progressRef.current.getBoundingClientRect();
  const pos = e.clientX - left;
  return Math.min(Math.max(pos / width, 0), 1);
};
