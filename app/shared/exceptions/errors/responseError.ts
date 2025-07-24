export type ErrorResponse = {
  code: string;
  message: string;
  details?: unknown;
};

export class ResponseError extends Error {
  public code: string;
  public details?: unknown;

  constructor(error: ErrorResponse) {
    super(error.message);
    this.name = 'ResponseError';
    this.code = error.code;
    this.details = error.details;
  }
}
