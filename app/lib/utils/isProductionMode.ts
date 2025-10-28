export const isProductionMode = (): boolean => {
  return process.env.NODE_ENV === 'production';
};
