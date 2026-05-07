import { render } from '@testing-library/react';

import UnknownRoutePage, { generateMetadata } from './page';

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

describe('UnknownRoutePage Metadata', () => {
  it('should generate correct metadata', async () => {
    const mockParams = Promise.resolve({ lang: 'uk' });
    const metadata = await generateMetadata({ params: mockParams } as any);

    expect(metadata).toHaveProperty('robots');
    expect(metadata.robots).toEqual({ index: false, follow: false });
  });
});
