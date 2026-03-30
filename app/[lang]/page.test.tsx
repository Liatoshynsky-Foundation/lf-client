import { render } from '@testing-library/react';
import { redirect } from 'next/navigation';

import AboutUs from './page';

jest.mock('next/navigation', () => ({
  redirect: jest.fn()
}));

describe('AboutUs Main Page', () => {
  it('should redirect to /about-us on mount', async () => {
    const mockParams = Promise.resolve({ lang: 'uk' as const });

    const ResolvedPage = await AboutUs({ params: mockParams });
    render(ResolvedPage);

    expect(redirect).toHaveBeenCalledWith('/about-us');
  });
});
