import { redirect } from 'next/navigation';

import { redirectToDisablePreview } from './redirectToDisablePreview';

jest.mock('next/navigation', () => ({
  redirect: jest.fn()
}));

describe('redirectToDisablePreview', () => {
  beforeEach(() => jest.clearAllMocks());

  it('should preserve query parameters except draftId when redirecting', () => {
    redirectToDisablePreview('/uk/news', {
      draftId: 'draft-123',
      page: '2',
      tag: ['music', 'events'],
      unused: undefined
    });

    expect(redirect).toHaveBeenCalledWith(
      '/api/preview/disable?returnTo=%2Fuk%2Fnews%3Fpage%3D2%26tag%3Dmusic%26tag%3Devents'
    );
  });

  it('should redirect without query parameters when only draftId is provided', () => {
    redirectToDisablePreview('/uk/news', { draftId: 'draft-123' });
    expect(redirect).toHaveBeenCalledWith('/api/preview/disable?returnTo=%2Fuk%2Fnews');
  });
});
