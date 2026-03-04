import { render } from '@testing-library/react';
import { redirect } from 'next/navigation';

import AboutUs from './page';

jest.mock('next/navigation', () => ({
  redirect: jest.fn()
}));

describe('AboutUs Main Page', () => {
  it('should redirect to /about-us on mount', () => {
    render(<AboutUs />);
    expect(redirect).toHaveBeenCalledWith('/about-us');
  });
});
