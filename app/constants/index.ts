export * from './typography';

export const SEVEN_DAYS_IN_SECONDS = 60 * 60 * 24 * 7;

export const logoSizes = {
  footer: { width: 127, height: 53 },
  header: {
    width: { xs: 72, sm: 96 },
    height: { xs: 30, sm: 40 }
  },
  office: {
    width: { xs: 87, sm: 210, lg: 270 },
    height: { xs: 34, sm: 70, lg: 110 }
  }
};

export const stateNames = ['DISCONNECTED', 'CONNECTED', 'CONNECTING', 'DISCONNECTING'];
export const CONTAINER_NAME = 'materials';
