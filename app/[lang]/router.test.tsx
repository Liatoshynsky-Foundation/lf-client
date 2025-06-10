import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useRouter } from 'next/router';
import mockRouter from 'next-router-mock';
import { createDynamicRouteParser } from 'next-router-mock/dynamic-routes';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';

import { NextLink } from '~/shared/components/design-system/all-components/link/NextLink';

jest.mock('next/router', () => jest.requireActual('next-router-mock'));
jest.mock('next/navigation', () => jest.requireActual('next-router-mock/navigation'));

mockRouter.useParser(createDynamicRouteParser(['/[lang]', '/biography']));

const ExampleLinkContainer = ({ href = '/' }) => {
  const router = useRouter();
  return (
    <NextLink onClick={() => router.push(href)} href={href}>
      The current route is: {router.asPath}
    </NextLink>
  );
};

describe('next-router-mock', () => {
  it('Custom NextLink can be rendered and has /media-about-us path', () => {
    render(<NextLink href="/media-about-us">Example Link</NextLink>, { wrapper: MemoryRouterProvider });
    fireEvent.click(screen.getByText('Example Link'));
    expect(mockRouter.asPath).toEqual('/media-about-us');
  });
  it('mocks the useRouter hook', () => {
    mockRouter.push('/uk/collaboration');
    render(<ExampleLinkContainer href="/uk/collaboration" />);
    expect(screen.getByRole('link')).toHaveTextContent('The current route is: /uk/collaboration');

    fireEvent.click(screen.getByRole('link'));

    expect(mockRouter).toMatchObject({
      asPath: '/uk/collaboration',
      pathname: '/uk/collaboration'
    });
  });
  it('should parse dynamic routes', () => {
    mockRouter.push('/eng');
    expect(mockRouter).toMatchObject({
      pathname: '/[lang]',
      query: { lang: 'eng' }
    });
  });
  it('next/link tested in asynchronously', async () => {
    render(
      <NextLink href="/eng/biography">
        <a>Example Link</a>
      </NextLink>
    );
    fireEvent.click(screen.getByText('Example Link'));
    await waitFor(() => {
      expect(mockRouter).toMatchObject({
        pathname: '/[lang]',
        query: { lang: 'eng' }
      });
    });
  });
});
