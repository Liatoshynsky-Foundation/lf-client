import { render } from '@testing-library/react';

import UnknownRoutePage from './page';

jest.mock('next/navigation', () => ({
  notFound: jest.fn(() => {
    throw new Error('notFound called');
  })
}));

describe('UnknownRoutePage', () => {
  it('calls notFound()', () => {
    expect(() => render(<UnknownRoutePage />)).toThrow('notFound called');
  });
});
