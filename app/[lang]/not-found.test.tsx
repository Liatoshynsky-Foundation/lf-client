import CustomNotFoundPage from './not-found';

jest.mock('next/navigation', () => ({
  notFound: jest.fn()
}));

describe('CustomNotFoundPage', () => {
  it('should execute correctly to cover all lines', async () => {
    const result = await CustomNotFoundPage();

    expect(result).toBeDefined();
  });
});
