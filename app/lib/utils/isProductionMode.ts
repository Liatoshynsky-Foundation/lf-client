export const isProductionMode = (): boolean => {
  return process.env.SHOW_MODE === 'production';
};
