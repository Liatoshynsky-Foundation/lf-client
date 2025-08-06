export type adminTypes = 'admin' | 'superadmin';

export type AuthTokenPayload = {
  id: string;
  type: adminTypes;
  refreshJti: string;
};
