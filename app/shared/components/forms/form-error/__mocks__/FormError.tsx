import { FormErrorProps } from '../FormError';

export default function FormError({ errorMessage }: Readonly<FormErrorProps>) {
  return (
    <div data-testid="form-error-box">
      <p data-testid="form-error-text">{errorMessage}</p>
    </div>
  );
}
