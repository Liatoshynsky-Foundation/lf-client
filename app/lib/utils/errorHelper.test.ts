import { createEnvErrors } from './errorHelper';

describe('createEnvErrors', () => {
  it('should generate error messages for a given field', () => {
    const field = 'MONGO_DB';
    const errors = createEnvErrors(field);

    expect(errors).toEqual({
      REQUIRED: 'MONGO_DB is required',
      INVALID: 'MONGO_DB must be a string',
      EMPTY: 'MONGO_DB cannot be empty'
    });
  });
});
