export type Result<T> = { ok: true; value: T } | { ok: false; error: string };

export const UnwrapResult = <T>(r: Result<T>): T => {
  if (!r.ok) {
    throw new Error(r.error);
  }
  return r.value;
};

export const WrapSuccess = <T>(value: T): Result<T> => ({ ok: true, value });
export const WrapError = <T>(err: string): Result<T> => ({ ok: false, error: err });

export const isSuccess = <T>(r: Result<T>): r is { ok: true; value: T } => 'ok' in r && r.ok;
export const isError = <T>(r: Result<T>): r is { ok: false; error: string } => 'ok' in r && !r.ok;
