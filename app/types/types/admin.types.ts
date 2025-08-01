export type adminTypes = 'admin' | 'superadmin';

export type AdminTokenPayload = {
  id: string;
  type: adminTypes;
  refreshJti: string;
};
